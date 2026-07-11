import re
import json

def parse_projects():
    with open('ocr_text.txt', 'r', encoding='utf-8') as f:
        text = f.read()

    projects = []
    
    # Split by PAGE_BREAK
    pages = text.split('===PAGE_BREAK===')
    
    for i, page in enumerate(pages):
        page = page.strip()
        if not page:
            continue
            
        # Extract Background
        background_match = re.search(r'Background:\s*(.*?)\s*Objective:', page, re.DOTALL)
        background = background_match.group(1).strip() if background_match else ""
        
        # Extract Objective
        objective_match = re.search(r'Objective:\s*(.*?)\s*Elements to include in Design:', page, re.DOTALL)
        objective = objective_match.group(1).strip() if objective_match else ""
        
        # Extract Elements
        elements_match = re.search(r'Elements to include in Design:\s*(.*?)\n(.*?\n.*?\nLegend:)', page, re.DOTALL)
        if not elements_match:
            # Maybe the title block is immediately after without newlines
            elements_match = re.search(r'Elements to include in Design:\s*(.*?)\n([^\n]+\n[^\n]+\nLegend:)', page, re.DOTALL)
            
        elements_text = ""
        footer_block = ""
        if elements_match:
            elements_text = elements_match.group(1).strip()
            footer_block = elements_match.group(2).strip()
        else:
            # Fallback
            parts = page.split('Elements to include in Design:')
            if len(parts) > 1:
                remainder = parts[1].strip()
                lines = remainder.split('\n')
                # Find Legend:
                for j, line in enumerate(lines):
                    if 'Legend:' in line:
                        elements_text = '\n'.join(lines[:j-2]).strip()
                        footer_block = '\n'.join(lines[j-2:j]).strip()
                        break

        # Process Elements
        elements = [e.strip() for e in elements_text.split('•') if e.strip()]
        
        # Extract Title, Module, Industry
        title = ""
        module = ""
        industry = ""
        
        if footer_block:
            footer_lines = footer_block.split('\n')
            if len(footer_lines) >= 2:
                title = footer_lines[0].strip()
                tech_ind = footer_lines[1].strip()
                
                # Split tech and industry. We know tech and industry from the prompt table.
                # Actually, we can just grab them from the PDF text. 
                # "Legal Service Delivery Legal & Immigration" -> Tech: "Legal Service Delivery", Ind: "Legal & Immigration"
                # It's hard to split reliably. Let's match against known modules or split by double space if possible.
                # Let's just use the table from the prompt to be safe.
        
        projects.append({
            'id': f'project-{i+1}',
            'title': title,
            'background': background,
            'objective': objective,
            'elements': elements,
            'footer_block': footer_block
        })

    # Hardcode the titles and categories from the table since it's perfectly structured in the user's prompt
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
    
    # Parse table
    table_projects = []
    for line in table_data.strip().split('\\n'):
        parts = [p.strip() for p in line.split('|')]
        if len(parts) >= 4:
            table_projects.append({
                'title': parts[1],
                'module': parts[2],
                'industry': parts[3]
            })

    # Merge table data into projects
    for i, p in enumerate(projects):
        if i < len(table_projects):
            p['title'] = table_projects[i]['title']
            p['module'] = table_projects[i]['module']
            p['industry'] = table_projects[i]['industry']
            # Create a short description from the objective
            short = p['objective'].split('.')[0] + '.'
            p['shortDescription'] = short if len(short) < 150 else short[:147] + '...'
        
    # Build TS file
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
    
    for i, p in enumerate(projects):
        if not p.get('title'):
            continue
            
        img_id = (i % 10) + 1
        
        ind_lower = p.get('industry', '').lower()
        img_name = 'operations_map' # default
        
        if 'healthcare' in ind_lower or 'life sciences' in ind_lower or 'hospital' in ind_lower:
            img_name = 'healthcare_dashboard'
        elif 'government' in ind_lower or 'social' in ind_lower or 'elections' in ind_lower or 'census' in ind_lower:
            img_name = 'government_portal'
        elif 'education' in ind_lower or 'community' in ind_lower or 'university' in ind_lower:
            img_name = 'education_app'
        elif 'retail' in ind_lower or 'shopping' in ind_lower or 'commerce' in ind_lower:
            img_name = 'retail_pos'
        elif 'finance' in ind_lower or 'banking' in ind_lower or 'insurance' in ind_lower:
            img_name = 'finance_dashboard'
        elif 'environment' in ind_lower or 'timberlands' in ind_lower or 'oil' in ind_lower or 'airport' in ind_lower or 'traffic' in ind_lower or 'supply chain' in ind_lower:
            img_name = 'operations_map'
        elif 'cybersecurity' in ind_lower:
            img_name = 'security_ui'
        elif 'legal' in ind_lower:
            img_name = 'legal_document_ui'
        elif 'hotel' in ind_lower or 'concert' in ind_lower or 'theatre' in ind_lower:
            img_name = 'hospitality_app'
        elif 'food' in ind_lower:
            img_name = 'food_delivery_ui'
        else:
            img_name = 'operations_map'
            
        thumb_url = f"/mockups/{img_name}.png"
        hero_url = f"/mockups/{img_name}.png"
        
        diffs = ["Intermediate", "Advanced", "Advanced", "Intermediate", "Advanced", "Intermediate", "Advanced", "Beginner", "Advanced", "Intermediate"]
        
        ts_content += "  {\n"
        ts_content += f'    id: "project-{i+1}",\n'
        ts_content += f'    title: {json.dumps(p.get("title", ""))},\n'
        ts_content += f'    shortDescription: {json.dumps(p.get("shortDescription", ""))},\n'
        ts_content += f'    background: {json.dumps(p.get("background", ""))},\n'
        ts_content += f'    objective: {json.dumps(p.get("objective", ""))},\n'
        ts_content += f'    elements: {json.dumps(p.get("elements", []))},\n'
        ts_content += f'    module: {json.dumps(p.get("module", ""))},\n'
        ts_content += f'    industry: {json.dumps(p.get("industry", ""))},\n'
        ts_content += f'    difficulty: "{diffs[i % len(diffs)]}",\n'
        ts_content += f'    thumbnailUrl: "{thumb_url}",\n'
        ts_content += f'    heroUrl: "{hero_url}",\n'
        ts_content += f'    estimatedTime: "{10 + (i % 6) * 5} Hours"\n'
        ts_content += "  },\n"
        
    ts_content += "];\n\n"
    
    # Extract unique modules and industries for tags
    modules = set()
    for p in table_projects:
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

if __name__ == "__main__":
    parse_projects()
