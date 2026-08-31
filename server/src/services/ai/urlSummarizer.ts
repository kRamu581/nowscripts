import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import { llmProvider } from './llmProvider';

export const extractAndSummarizeUrl = async (url: string) => {
  let browser;
  try {
    console.log(`[URL Summarizer] Starting URL extraction for: ${url}`);
    
    browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set a reasonable viewport
    await page.setViewport({ width: 1280, height: 800 });
    
    console.log(`[URL Summarizer] Fetching URL...`);
    const response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    const finalUrl = page.url();
    console.log(`[URL Summarizer] Final URL after redirects: ${finalUrl}`);
    
    if (!response) {
      throw new Error("No response from URL");
    }
    
    const status = response.status();
    console.log(`[URL Summarizer] HTTP Status: ${status}`);
    
    const contentType = response.headers()['content-type'] || 'unknown';
    console.log(`[URL Summarizer] Content Type: ${contentType}`);
    
    if (status >= 400) {
      throw new Error(`HTTP Error: ${status}`);
    }
    
    const pageTitle = await page.title();
    console.log(`[URL Summarizer] Page Title: ${pageTitle}`);
    
    // Extract DOM
    const html = await page.content();
    
    const $ = cheerio.load(html);
    
    // Remove navigation/boilerplate
    $('nav, header, footer, aside, .sidebar, .menu, .cookie-banner, .advertisement, [role="navigation"], .navbar, #sidebar').remove();
    
    // Identify main content
    let mainContentHtml = '';
    
    const selectors = ['main', 'article', '.content', '#content', '.main-content', '.lesson-content', '.prose'];
    
    let matchedSelector = '';
    
    for (const selector of selectors) {
      const el = $(selector);
      if (el.length > 0 && el.text().trim().length > 200) {
        mainContentHtml = el.html() || '';
        matchedSelector = selector;
        break;
      }
    }
    
    // Fallback if no container matched
    if (!mainContentHtml) {
      mainContentHtml = $('body').html() || '';
      matchedSelector = 'body (fallback)';
    }
    
    console.log(`[URL Summarizer] Extracted main-content selector: ${matchedSelector}`);
    
    // Convert to markdown
    const turndownService = new TurndownService({ headingStyle: 'atx' });
    const markdown = turndownService.turndown(mainContentHtml).trim();
    
    console.log(`[URL Summarizer] Extracted text length: ${markdown.length}`);
    
    if (markdown.length > 0) {
      console.log(`[URL Summarizer] First 500 chars: \n${markdown.substring(0, 500)}\n...`);
    }
    
    // Validate
    if (markdown.length < 150) {
      throw new Error("Unable to extract the actual article content from this webpage. The page may require JavaScript rendering or may restrict automated access.");
    }
    
    // Call LLM
    console.log(`[URL Summarizer] Sending to LLM for summarization...`);
    const systemPrompt = `You are an expert summarizer.
Your task is to summarize the following extracted webpage content.
You must NEVER invent content based on the URL, page title, website name, or general knowledge.
Summarize ONLY the content actually extracted from that page.
Preserve key technical concepts, lists, and takeaways.
If the content appears to be a list of navigational links with no real article body, state that the content could not be found.`;

    const llmMessages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: `URL: ${finalUrl}\nTitle: ${pageTitle}\n\nContent:\n${markdown}` }
    ];
    
    const aiResponse = await llmProvider.generateChatCompletion(llmMessages as any);
    
    if (!aiResponse.success) {
      throw new Error(`LLM Error: ${aiResponse.error}`);
    }
    
    return {
      success: true,
      summary: aiResponse.content,
      metadata: {
        originalUrl: url,
        finalUrl,
        status,
        pageTitle,
        selector: matchedSelector,
        contentLength: markdown.length,
        isBrowserRendered: true
      }
    };
    
  } catch (error: any) {
    console.error("[URL Summarizer] Extraction failed:", error.message);
    return {
      success: false,
      message: error.message === "Unable to extract the actual article content from this webpage. The page may require JavaScript rendering or may restrict automated access." 
        ? error.message 
        : `Unable to extract the actual article content from this webpage. The page may require JavaScript rendering or may restrict automated access. (Details: ${error.message})`
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
