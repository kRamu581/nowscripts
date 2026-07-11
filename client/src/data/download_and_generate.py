import re
import json
import urllib.request
import os

table_data = """
1 | International Student Services & Visa Compliance Management | Legal Service Delivery | Legal & Immigration
2 | Citizen Services Portal for Local Government – Permit & Complaint Management | CSM, Government Digital Services | Government / Public Sector
3 | Refugee & Immigrant Services Navigation & Case Management Platform | CSM, Service Portal | Nonprofit / Government / Social Services
4 | K-12 School Partnership & Educational Outreach Program Management | Service Portal, Flow Designer | Community Service
5 | Volunteer Management & Community Engagement Platform for Nonprofits | Service Portal, Flow Designer | Community Service
6 | Faculty & Staff Leave Management & HR Case Resolution System | HR Service Delivery (HRSD) | Human Resources
7 | Patient Care Coordination & Clinical Workflow Automation | App Engine Studio | Healthcare
8 | Data Privacy & FERPA Compliance Request Management | Integrated Risk Management (IRM) | Legal & Privacy
9 | Omnichannel Store Operations & Customer Complaint Resolution | CSM | Retail
10 | Clinical Trial Site Management & Regulatory Deviation Tracking | App Engine Studio | Life Sciences
11 | Student On-Campus Employment Onboarding & Management Portal | HRSD & Employee Experience | Human Resources
12 | Retail Banking Customer Onboarding & KYC Compliance Management | CSM | Finance
13 | Forest Operations Management & Sustainable Harvest Planning | App Engine Studio | Timberlands
14 | Election Administration & Polling Station Operations Management | App Engine Studio | Elections
15 | National Census Data Collection & Field Enumerator Management | App Engine Studio | Population & Census
16 | Live Event & Concert Operations Management Platform | App Engine Studio | Concert Management
17 | Hospital-Wide Biomedical Asset Management & Equipment Lifecycle | ITAM/CMDB + App Engine Studio | Hospital Management
18 | Performing Arts Theatre Operations & Production Management System | App Engine Studio | Theatre Management
19 | Shopping Mall Operations, Tenant Services & Visitor Experience Management | CSM | Shopping Center
20 | Cybersecurity Incident Response & Vulnerability Management Platform | Security Operations (SecOps) | Cybersecurity
21 | Consumer Electronics Warranty Claim & Repair Lifecycle Management | CSM | Mobile Warranty
22 | Dark Store Operations & Last-Mile Delivery Issue Resolution Platform | CSM | Quick Commerce
23 | Oilfield Asset Integrity & HSE Incident Management Platform | App Engine Studio | Oil & Natural Resources
24 | Environmental Regulatory Compliance & Pollution Incident Response | App Engine Studio | Environment
25 | University IT Helpdesk Modernization & Student Tech Support | IT Service Management | Education/Technology
26 | Pharmacovigilance & Adverse Drug Reaction Case Management | App Engine Studio | Life Sciences
27 | Insurance Claims Processing & Fraud Investigation Management | CSM | Finance
28 | Public Health Disease Surveillance & Outbreak Response Management | App Engine Studio | Healthcare
29 | Supermarket & Hypermarket Store Operations & Food Safety Management | App Engine Studio | Shopping Center
30 | Mining Operations – Contractor Safety & Production Performance Management | App Engine Studio | Oil & Natural Resources
31 | Airport Infrastructure Maintenance & Airside Operations Safety Management | App Engine Studio | Airport Maintenance
32 | Urban Traffic Incident Management & Public Transport Operations Coordination | App Engine Studio | Transport & Traffic Mgmt
33 | End-to-End Food Supply Chain Traceability, Quality & Recall Management | App Engine Studio | Food Supply Chain
34 | Luxury Hotel Operations Management, Guest Services & Facilities Maintenance | App Engine Studio | Hotel Management
35 | National School Meals Programme – Supply, Quality & Nutrition Compliance Management | App Engine Studio | Food Supply Chain
"""

# 1. Parse Table Data
projects = []
for line in table_data.strip().split('\n'):
    parts = [p.strip() for p in line.split('|')]
    if len(parts) >= 4:
        projects.append({
            'title': parts[1],
            'module': parts[2],
            'industry': parts[3]
        })

# 2. Parse OCR Text for details
with open('ocr_text.txt', 'r', encoding='utf-8') as f:
    ocr_text = f.read()
pages = ocr_text.split('===PAGE_BREAK===')

for i, proj in enumerate(projects):
    # Try to find the page that matches the title
    title_words = set([w.lower() for w in proj['title'].split() if len(w) > 3])
    best_page = ""
    best_score = 0
    for page in pages:
        score = sum([1 for w in title_words if w in page.lower()])
        if score > best_score:
            best_score = score
            best_page = page
            
    # Extract from best page
    background = ""
    objective = ""
    elements = []
    
    bg_match = re.search(r'Background:\s*(.*?)\s*Objective:', best_page, re.DOTALL)
    if bg_match: background = bg_match.group(1).strip()
    
    obj_match = re.search(r'Objective:\s*(.*?)\s*Elements to include in Design:', best_page, re.DOTALL)
    if obj_match: objective = obj_match.group(1).strip()
    
    elem_match = re.search(r'Elements to include in Design:\s*(.*?)\n(.*?\n.*?\nLegend:)', best_page, re.DOTALL)
    if not elem_match:
        elem_match = re.search(r'Elements to include in Design:\s*(.*?)\n([^\n]+\n[^\n]+\nLegend:)', best_page, re.DOTALL)
    if not elem_match:
        # Just grab everything after Elements to include in Design
        parts = best_page.split('Elements to include in Design:')
        if len(parts) > 1:
            raw_elements = parts[1].split('Legend:')[0]
            elements = [e.strip() for e in raw_elements.split('•') if len(e.strip()) > 10]
    else:
        elements = [e.strip() for e in elem_match.group(1).split('•') if len(e.strip()) > 10]
        
    proj['background'] = background.replace('\n', ' ')
    proj['objective'] = objective.replace('\n', ' ')
    proj['elements'] = [e.replace('\n', ' ') for e in elements]
    short = proj['objective'].split('.')[0] + '.' if proj['objective'] else proj['title']
    proj['shortDescription'] = short if len(short) < 150 else short[:147] + '...'

# 3. Download Images & Build TS
ts_content = "export type ProjectDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';\n\n"
ts_content += "export interface Project {\n"
ts_content += "  id: string;\n"
ts_content += "  title: string;\n"
ts_content += "  shortDescription: string;\n"
ts_content += "  background: string;\n"
ts_content += "  objective: string;\n"
ts_content += "  elements: string[];\n"
ts_content += "  module: string;\n"
ts_content += "  industry: string;\n"
ts_content += "  difficulty: ProjectDifficulty;\n"
ts_content += "  thumbnailUrl: string;\n"
ts_content += "  heroUrl: string;\n"
ts_content += "  estimatedTime: string;\n"
ts_content += "}\n\n"

ts_content += "export const projectsData: Project[] = [\n"

diffs = ["Intermediate", "Advanced", "Advanced", "Intermediate", "Advanced", "Intermediate", "Advanced", "Beginner", "Advanced", "Intermediate"]

import time

for i, proj in enumerate(projects):
    img_name = f"project_{i+1}.jpg"
    img_path = f"../../public/mockups/{img_name}"
    
    # Prompt for Pollinations AI
    clean_title = urllib.parse.quote(proj['title'])
    prompt = f"{clean_title}+dashboard+UI+design+dribbble+style+high+quality+dark+mode"
    url = f"https://image.pollinations.ai/prompt/{prompt}?width=800&height=600&nologo=true&seed=42"
    
    if not os.path.exists(img_path):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response, open(img_path, 'wb') as out_file:
                out_file.write(response.read())
            print(f"Downloaded {img_name}")
            time.sleep(1) # sleep to prevent 429
        except Exception as e:
            print(f"Failed to download {img_name}: {e}")
            
    ts_content += "  {\n"
    ts_content += f'    id: "project-{i+1}",\n'
    ts_content += f'    title: {json.dumps(proj["title"])},\n'
    ts_content += f'    shortDescription: {json.dumps(proj["shortDescription"])},\n'
    ts_content += f'    background: {json.dumps(proj["background"])},\n'
    ts_content += f'    objective: {json.dumps(proj["objective"])},\n'
    ts_content += f'    elements: {json.dumps(proj["elements"])},\n'
    ts_content += f'    module: {json.dumps(proj["module"])},\n'
    ts_content += f'    industry: {json.dumps(proj["industry"])},\n'
    ts_content += f'    difficulty: "{diffs[i % len(diffs)]}",\n'
    ts_content += f'    thumbnailUrl: "/mockups/{img_name}",\n'
    ts_content += f'    heroUrl: "/mockups/{img_name}",\n'
    ts_content += f'    estimatedTime: "{10 + (i % 6) * 5} Hours"\n'
    ts_content += "  },\n"
    
ts_content += "];\n\n"

modules = set()
for p in projects:
    for m in p['module'].split(','):
        modules.add(m.strip())
        
ts_content += "export const projectTags = [\n"
ts_content += '  "All",\n'
for m in sorted(list(modules)):
    if m and m != "+ App Engine Studio" and m != "Custom application":
        ts_content += f'  "{m}",\n'
ts_content += "];\n"

with open('projectsData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)
