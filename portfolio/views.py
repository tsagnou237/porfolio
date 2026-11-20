from django.shortcuts import render


PROFILE = {
    "name": "Tsagnou Noupa Steve Varrel",
    "short_name": "Steve Varrel",
    "role": "Développeur Full Stack · Ingénieur en informatique",
    "city": "Yaoundé, Cameroun",
    "age": 24,
    "email": "noupaminette237@gmail.com",
    "phone_display": "+237 693 05 27 97",
    "phone_link": "+237693052797",
    "linkedin": "https://www.linkedin.com/in/steve-varrel-tsagnou-noupa-11066a375",
    "github": "https://github.com/tsagnou237",
}

SKILLS = [
    {"name": "HTML & CSS", "group": "Web"},
    {"name": "JavaScript", "group": "Web"},
    {"name": "Python", "group": "Back-end"},
    {"name": "Django", "group": "Back-end"},
    {"name": "Administration SI", "group": "Systèmes"},
    {"name": "Maintenance informatique", "group": "Systèmes"},
]

PROJECTS = [
    {
        "name": "Toporcin",
        "category": "Projet web",
        "category_en": "Web project",
        "number": "01",
        "description": "Site de présentation et tableau de bord de Toporcin, une application de gestion d’élevage porcin.",
        "description_en": "Toporcin’s public website and dashboard for managing a pig farm.",
        "visual": "toporcin",
        "cover_image": "portfolio/images/toporcin-accueil.webp",
        "secondary_image": "portfolio/images/toporcin-dashboard.webp",
        "image_alt": "Accueil de la plateforme Toporcin",
        "image_label": "Élevage porcin",
        "image_label_en": "Pig farm management",
        "secondary_image_label": "Tableau de bord",
        "secondary_image_label_en": "Dashboard",
        "secondary_image_alt": "Tableau de bord de gestion Toporcin",
        "url": "",
    },
    {
        "name": "Gavicole",
        "category": "Projet web",
        "category_en": "Web project",
        "number": "02",
        "description": "Application web de gestion avicole pour suivre les élevages, la production et les activités quotidiennes.",
        "description_en": "A poultry farm management app for tracking farms, production and daily operations.",
        "visual": "gavicole",
        "cover_image": "portfolio/images/gavicole-accueil.webp",
        "secondary_image": "portfolio/images/gavicole-dashboard-eleveur.webp",
        "tertiary_image": "portfolio/images/gavicole-dashboard-admin.webp",
        "image_alt": "Page d’accueil de l’application Gavicole",
        "image_label": "Gestion avicole",
        "image_label_en": "Poultry farm management",
        "secondary_image_alt": "Tableau de bord de l’éleveur dans Gavicole",
        "secondary_image_label": "Espace éleveur",
        "secondary_image_label_en": "Farmer dashboard",
        "tertiary_image_alt": "Tableau de bord administrateur de Gavicole",
        "tertiary_image_label": "Administration",
        "tertiary_image_label_en": "Admin dashboard",
        "url": "",
    },
]

EXPERIENCES = [
    {
        "eyebrow": "ACTUELLEMENT",
        "title": "Assistant de formation & développeur full stack",
        "title_en": "Training assistant & full stack developer",
        "description": "Accompagnement des apprenants et développement d’applications web.",
        "description_en": "Supporting learners and building web applications.",
    },
    {
        "eyebrow": "MI TEC",
        "title": "Stagiaire académique — développement web",
        "title_en": "Academic intern — web development",
        "description": "Stage académique dans le domaine du développement web.",
        "description_en": "Academic internship in web development.",
    },
    {
        "eyebrow": "VISION PUB",
        "title": "Stagiaire professionnel — conseiller informatique",
        "title_en": "Professional intern — IT advisor",
        "description": "Conseil informatique et accompagnement des utilisateurs.",
        "description_en": "IT advice and user support.",
    },
    {
        "eyebrow": "IAI CAMEROUN",
        "title": "Licence & titre d’ingénieur en informatique",
        "title_en": "Bachelor's degree & engineering qualification in IT",
        "description": "Formation en informatique, spécialité génie logiciel.",
        "description_en": "IT degree, specializing in software engineering.",
    },
]


def home(request):
    return render(
        request,
        "portfolio/home.html",
        {"profile": PROFILE, "skills": SKILLS, "projects": PROJECTS, "experiences": EXPERIENCES},
    )


def projects(request):
    return render(request, "portfolio/projects.html", {"profile": PROFILE, "projects": PROJECTS})
