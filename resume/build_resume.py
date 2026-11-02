"""Generate the one-page downloadable resume. Run: python resume/build_resume.py."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    HRFlowable, KeepTogether, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "Jerwin_Quijano_Resume.pdf"

normal = ParagraphStyle("normal", fontName="Helvetica", fontSize=9.5, leading=12.1, spaceAfter=0)
bold = ParagraphStyle("bold", parent=normal, fontName="Helvetica-Bold")
section_style = ParagraphStyle("section", parent=bold, fontSize=10.8, leading=13)
center = ParagraphStyle("center", parent=normal, alignment=TA_CENTER)
name = ParagraphStyle("name", parent=center, fontName="Helvetica-Bold", fontSize=17, leading=20)
small = ParagraphStyle("small", parent=normal, fontSize=9.1, leading=11.5)
bullet_style = ParagraphStyle("bullet", parent=normal, leftIndent=12, firstLineIndent=-9, spaceAfter=3)


def p(text, style=normal):
    return Paragraph(text, style)


def heading(text):
    return [Spacer(1, 9), p(text, section_style), Spacer(1, 2), HRFlowable(width="100%", thickness=.55, color=colors.black), Spacer(1, 9)]


def row(left, right):
    table = Table([[p(left), p(right)]], colWidths=[366, 150], hAlign="LEFT")
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ("ALIGN", (1, 0), (1, 0), "RIGHT"),
    ]))
    return table


def bullet(text):
    return p("&#8226; " + text, bullet_style)


story = [
    p("JERWIN NICO H. QUIJANO", name),
    p("Freelance Full-Stack Developer | React, Python &amp; PostgreSQL", center),
    p('Philippines | 09917604723 | <link href="mailto:jerwinquijano19@gmail.com">jerwinquijano19@gmail.com</link>', center),
    p('<link href="https://github.com/jico19">github.com/jico19</link> | <link href="https://jico-dev.vercel.app">jico-dev.vercel.app</link>', center),
]

story += heading("PROFESSIONAL SUMMARY")
story += [p("Freelance full-stack developer based in the Philippines, building client tools and web applications since 2024 with React, Python, and PostgreSQL. Currently developing a US healthcare operations platform and FarmPass, a livestock transport permit capstone project. Open to junior full-stack opportunities.")]

story += heading("EDUCATION")
story += [p("DALUBHASAAN NG LUNGSOD NG LUCENA", bold),
          row("Bachelor of Science in Information Technology", "2023-Present"),
          p("Expected graduation: June 2027")]

story += heading("WORK EXPERIENCE")
story += [p("ST BUSINESS CONSULTING - US CLIENT", bold),
          row("Freelance Full-Stack Developer", "August 2026-Present"),
          p("React, FastAPI, PostgreSQL, Supabase", small), Spacer(1, 6),
          bullet("Building an ongoing healthcare operations platform for Florida, Indiana, and Georgia, handling frontend and backend implementation."),
          bullet("Implemented caregiver onboarding, credential tracking, client intake, service agreements, care plans, authorizations, and scheduling workflows."),
          bullet("Implemented state-scoped authorization and data-access boundaries to restrict access to authorized records."),
          bullet("Built audit logging, electronic signatures, and data-retention workflows; organized backend components into modular application features."),
          Spacer(1, 6), p("INDEPENDENT CLIENT PROJECTS", bold),
          row("Freelance Developer", "2024-Present"),
          bullet("Building paid client tools and web applications, working from project requirements through implementation.")]

story += heading("PROJECTS")
story += [p("FARMPASS - LIVESTOCK TRANSPORT PERMIT SYSTEM", bold),
          row("Full-Stack Developer | Capstone project", "January 2026-Present"),
          p("Sariaya Municipal Agricultural Office"),
          p("React, Django REST Framework, PostgreSQL, MapLibre", small),
          p("Preparing for final defense in November 2026.", small), Spacer(1, 5),
          bullet("Built the React frontend and Django REST Framework/PostgreSQL API for livestock transport applications and role-specific review."),
          bullet("Implemented guarded approval transitions with audit records and OCR-assisted document review with a manual fallback."),
          bullet("Built UUID-based QR permit verification, checkpoint logging, and barangay survey maps.")]

story += heading("TECHNICAL SKILLS")
story += [p("<b>Languages:</b> Python, JavaScript, HTML, CSS"),
          p("<b>Backend:</b> Django, Django REST Framework, FastAPI, REST APIs, JWT authentication"),
          p("<b>Frontend:</b> React 19, Vite, Tailwind CSS"),
          p("<b>Databases and Integrations:</b> PostgreSQL, Supabase, PayMongo API"),
          p("<b>Tools and Workflow:</b> Git, GitHub, automated testing, technical documentation, AI coding assistants")]

doc = SimpleDocTemplate(str(OUTPUT), pagesize=letter, leftMargin=48, rightMargin=48,
                        topMargin=40, bottomMargin=39, title="Jerwin Nico H. Quijano Resume",
                        author="Jerwin Nico H. Quijano")
doc.build(story)
print(OUTPUT)
