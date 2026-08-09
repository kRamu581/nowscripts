import React from 'react';
import Markdown from 'markdown-to-jsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Clock, BookOpen, Settings, Target, Calendar, User, MessageSquare, Edit2, MoreVertical, ExternalLink } from 'lucide-react';
import { LessonData } from '../../utils/markdownParser';

import { getModuleTheme } from '../../utils/themeUtils';

import { H1, H2, H3 } from './HeadingRenderer';
import { UL, OL, LI } from './Lists';
import { Table, TableHead, TableRow, TableHeader, TableCell } from './TableRenderer';
import { CodeBlock } from './CodeBlock';
import { Callout } from './Callout';
import { ExpandableImage } from './ExpandableImage';
import { FieldInfoCard, SUPPORTED_FIELD_LABELS } from './FieldInfoCard';

import './MarkdownStyles.css';

interface MarkdownRendererProps {
  content: string;
  lessonData?: LessonData;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, lessonData, className }) => {
  
  const theme = lessonData ? getModuleTheme(lessonData.category) : null;

  // Format date helper if needed
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className || ''}`}>
      
      {/* Premium Header if lessonData is provided */}
      {lessonData && theme && (
        <div className="mb-6 px-4 sm:px-0">
          <h1 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#0f2c4c] mb-1 leading-tight tracking-tight font-sans">
            {lessonData.title}
          </h1>
          <p className="text-[14px] text-[#64748b] font-sans m-0">
            Last Updated : {lessonData.lastUpdated ? formatDate(lessonData.lastUpdated) : "7 Aug, 2026"}
          </p>
        </div>
      )}

      {/* Markdown Content Card */}
      <div className="bg-white rounded-[16px] border border-gray-200 shadow-sm p-5 sm:px-6 sm:py-8 md:px-6 md:py-10 markdown-body">
        <Markdown
        options={{
          forceBlock: true,
          wrapper: React.Fragment,
          overrides: {
            h1: { component: H1 },
            h2: { component: H2 },
            h3: { component: H3 },
            p: { 
              component: ({ children, ...props }: any) => {
                const childrenArray = React.Children.toArray(children);
                const fields: any[] = [];
                let isFieldInfoCard = false;
                let currentField: any = null;
                let isValid = true;
                let currentValues: React.ReactNode[] = [];

                const extractText = (node: any): string => {
                  if (typeof node === 'string') return node;
                  if (Array.isArray(node)) return node.map(extractText).join('');
                  if (React.isValidElement(node) && (node.props as any).children) {
                    return extractText((node.props as any).children);
                  }
                  return '';
                };

                const finishCurrentField = () => {
                  if (currentField) {
                    // Clean up trailing/leading newlines from string values
                    const cleanedValues = currentValues.map((v, i) => {
                      if (typeof v === 'string') {
                        let str = v;
                        if (i === 0) str = str.replace(/^\s+/, '');
                        if (i === currentValues.length - 1) str = str.replace(/\s+$/, '');
                        return str;
                      }
                      return v;
                    }).filter(v => v !== '');

                    currentField.value = cleanedValues.length === 1 && typeof cleanedValues[0] === 'string'
                      ? cleanedValues[0]
                      : cleanedValues;
                    fields.push(currentField);
                    currentField = null;
                    currentValues = [];
                  }
                };

                for (let i = 0; i < childrenArray.length; i++) {
                  const child = childrenArray[i];

                  // Ignore standalone <br/> tags when accumulating or checking validity
                  if (React.isValidElement(child) && child.type === 'br') {
                    if (currentField) {
                      // We could add a space or a br, but typically we can just ignore it 
                      // or push it. Let's push it so multi-line values work.
                      currentValues.push(child);
                    }
                    continue;
                  }

                  if (React.isValidElement(child) && child.type === 'strong') {
                    const strongText = extractText(child).trim();
                    let isLabel = false;
                    for (const label of SUPPORTED_FIELD_LABELS) {
                      if (strongText === `${label}:` || strongText === label) {
                        finishCurrentField();
                        currentField = { label };
                        isLabel = true;
                        isFieldInfoCard = true;
                        break;
                      }
                    }
                    if (isLabel) continue;
                  }

                  if (currentField) {
                    currentValues.push(child);
                  } else {
                    if (typeof child === 'string' && child.trim() === '') {
                      continue;
                    }
                    isValid = false;
                    break;
                  }
                }

                finishCurrentField();

                if (isFieldInfoCard && isValid && fields.length > 0) {
                  return <FieldInfoCard fields={fields} />;
                }

                return (
                  <p className="text-[17px] leading-[1.8] mb-5 text-[#1e293b]" {...props}>
                    {children}
                  </p>
                );
              } 
            },
            ul: { component: UL },
            ol: { component: OL },
            li: { component: LI },
            blockquote: { 
              component: (props: any) => <Callout theme={theme} {...props} /> 
            },
            pre: {
              component: ({ children, ...props }: any) => {
                // If the pre contains a code block, CodeBlock component handles the extraction
                // markdown-to-jsx passes the <code> as children.
                const codeChild = React.Children.toArray(children)[0];
                if (React.isValidElement(codeChild) && codeChild.type === 'code') {
                  return <CodeBlock className={codeChild.props.className} {...codeChild.props} />;
                }
                return <pre {...props}>{children}</pre>;
              }
            },
            table: { component: Table },
            thead: { component: TableHead },
            tr: { component: TableRow },
            th: { component: TableHeader },
            td: { component: TableCell },
            img: { component: ExpandableImage },
            a: {
              component: ({ children, ...props }: any) => (
                <a 
                  style={{ color: '#2563eb', textDecoration: 'underline', textUnderlineOffset: '4px', fontWeight: 500, display: 'inline' }}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  {...props}
                >
                  {children}
                  <ExternalLink style={{ width: '14px', height: '14px', display: 'inline', marginBottom: '2px', marginLeft: '4px' }} />
                </a>
              )
            }
          }
        }}
      >
        {content}
      </Markdown>
      </div>
    </div>
  );
};
