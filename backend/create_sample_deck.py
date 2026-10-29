"""Generates a clean sample startup pitch deck PDF for testing."""
from pathlib import Path
import pymupdf as fitz

def generate_sample_deck(output_path: str = "sample_pitch_deck.pdf"):
    doc = fitz.open()

    slides = [
        {
            "title": "Northstar AI - Predictive Customer Success for Enterprise SaaS",
            "content": (
                "Slide 1: Title & Overview\n"
                "Company: Northstar AI Inc.\n"
                "Founders: Alex Vance (CEO, ex-Salesforce VP), Dr. Maya Lin (CTO, Stanford AI PhD)\n"
                "Vision: Eliminate unexpected enterprise churn with real-time customer behavior analytics.\n"
                "Fundraising: Raising $2.5M Seed Round."
            )
        },
        {
            "title": "Problem: Silent Churn in B2B SaaS Costs $40B Annually",
            "content": (
                "Slide 2: The Problem\n"
                "Enterprise software companies lose 12-18% of revenue to net churn every year.\n"
                "Current CS solutions (Gainsight, Totango) are retrospective health-score surveys, not real-time telemetry.\n"
                "By the time a customer is flagged 'red', their renewal decision was made 90 days earlier."
            )
        },
        {
            "title": "Solution: Real-time Predictive Churn Telemetry Engine",
            "content": (
                "Slide 3: Our Solution\n"
                "Northstar connects directly to customer data warehouses (Snowflake, BigQuery, ClickHouse).\n"
                "Our proprietary transformer models detect subtle drops in feature engagement, query frequency, and user seat usage.\n"
                "Identifies accounts at risk 120 days before renewal with 88% predictive precision."
            )
        },
        {
            "title": "Market Opportunity: $14B Addressable Market",
            "content": (
                "Slide 4: Market Size\n"
                "TAM: $14.2B Global Enterprise Customer Success & Churn Prevention Software.\n"
                "SAM: $4.5B Mid-Market & Enterprise B2B SaaS companies ($10M-$250M ARR).\n"
                "SOM: $450M initial focus on AI, DevOps, and Data Infrastructure software vendors."
            )
        },
        {
            "title": "Traction: Strong Early Validation & Revenue Growth",
            "content": (
                "Slide 5: Traction & Metrics\n"
                "ARR: $420k ARR from 14 pilot enterprise customers.\n"
                "Net Revenue Retention: 114% across early cohorts.\n"
                "ACV: $30k average annual contract value.\n"
                "Pipeline: $1.2M qualified pipeline in active evaluations."
            )
        },
        {
            "title": "Business Model & Go-to-Market",
            "content": (
                "Slide 6: Business Model\n"
                "Pricing: Annual subscription based on tracked ARR tiers ($24k-$75k/year).\n"
                "GTM: Direct founder-led sales transitioning to VP Sales hire.\n"
                "Sales Cycle: 45 days average from proof of concept to signature."
            )
        },
        {
            "title": "Competition: The Unfair Moat",
            "content": (
                "Slide 7: Competitive Landscape\n"
                "Legacy: Gainsight, ChurnZero (manual rule engines, difficult 6-month deployments).\n"
                "Northstar Moat: Zero-code warehouse-native connectors, deployed in 2 hours.\n"
                "Proprietary predictive weights trained across 50M anonymized session events."
            )
        },
        {
            "title": "The Ask: $2.5M Seed Round",
            "content": (
                "Slide 8: The Ask & Use of Funds\n"
                "Raising $2.5M Seed on a priced equity round.\n"
                "Use of Funds: 50% Engineering & ML, 35% GTM & Account Executives, 15% Ops/Compliance (SOC2).\n"
                "Milestones: Reach $2.0M ARR within 18 months and achieve Series A readiness."
            )
        }
    ]

    for slide in slides:
        page = doc.new_page(width=720, height=405) # Standard 16:9 widescreen
        # Header
        page.insert_text((40, 50), slide["title"], fontsize=16, fontname="helv", color=(0.1, 0.2, 0.48))
        # Divider line
        page.draw_line((40, 65), (680, 65), color=(0.7, 0.75, 0.85), width=1)
        # Content
        page.insert_textbox(
            fitz.Rect(40, 80, 680, 360),
            slide["content"],
            fontsize=13,
            fontname="helv",
            color=(0.15, 0.15, 0.2)
        )

    doc.save(output_path)
    doc.close()
    print(f"Sample pitch deck generated at: {output_path}")

if __name__ == "__main__":
    generate_sample_deck()
