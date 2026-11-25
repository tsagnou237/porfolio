from django.http import Http404
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

ARTICLES = [
    {
        "slug": "partir-du-besoin",
        "category": "Méthode",
        "category_en": "Approach",
        "read_time": 4,
        "title": "Un bon outil numérique commence par le terrain",
        "title_en": "A useful digital tool starts with the real world",
        "excerpt": "Avant de parler de fonctionnalités ou de technologie, il faut comprendre les gestes, les contraintes et les personnes concernées.",
        "excerpt_en": "Before discussing features or technology, understand the routines, constraints and people involved.",
        "body": [
            ("Le besoin avant l’interface", "Un projet démarre rarement avec une liste parfaite de fonctionnalités. Il commence par une situation à améliorer : une information difficile à retrouver, une opération répétée ou un suivi qui repose encore sur plusieurs fichiers."),
            ("Observer les usages", "Prendre le temps de comprendre qui utilise l’outil, dans quelles conditions et avec quelles contraintes permet de distinguer le besoin réel de la première solution imaginée. Les échanges et les exemples concrets révèlent souvent les étapes qui méritent vraiment d’être simplifiées."),
            ("Construire par étapes", "Une fois le parcours clarifié, on peut choisir les fonctionnalités prioritaires et les valider progressivement. Cette démarche donne une application plus lisible, plus utile au quotidien et plus facile à faire évoluer."),
        ],
        "body_en": [
            ("Start with the need", "Projects rarely begin with a perfect feature list. They begin with a situation to improve: information that is hard to find, a repeated operation or a workflow spread across several files."),
            ("Understand the way people work", "Taking time to learn who will use a tool, in what conditions and with which constraints helps separate the real need from the first proposed solution. Conversations and concrete examples often reveal which steps should be simplified."),
            ("Build in stages", "Once the journey is clear, priorities can be chosen and validated progressively. The result is an application that is easier to understand, useful in daily work and ready to evolve."),
        ],
    },
    {
        "slug": "clarte-des-parcours",
        "category": "Conception",
        "category_en": "Design",
        "read_time": 3,
        "title": "La clarté d’une application se joue dans ses parcours",
        "title_en": "An application's clarity lives in its user journeys",
        "excerpt": "Une interface agréable ne dépend pas seulement de son apparence : chaque écran doit aider à savoir quoi faire ensuite.",
        "excerpt_en": "A pleasant interface is about more than appearance: each screen should make the next step clear.",
        "body": [
            ("Un écran, une intention", "Lorsqu’une page présente trop d’actions avec la même importance, l’utilisateur doit deviner par où commencer. Donner une place nette à l’action principale réduit cet effort et rend le parcours plus prévisible."),
            ("Des repères cohérents", "Les libellés, les retours après une action et la disposition des informations doivent rester cohérents d’un écran à l’autre. Ces repères aident chacun à se concentrer sur son travail plutôt qu’à réapprendre l’interface."),
            ("La simplicité se vérifie", "On peut tester un parcours en demandant à une personne d’accomplir une tâche précise et en observant où elle hésite. Ces retours concrets permettent d’améliorer le produit avant d’ajouter de nouvelles options."),
        ],
        "body_en": [
            ("Give each screen a purpose", "When a page gives too many actions equal weight, people have to guess where to begin. Making the primary action easy to spot lowers that effort and makes the journey more predictable."),
            ("Keep familiar cues", "Labels, feedback after an action and the placement of information should stay consistent from one screen to another. These cues help people focus on their work instead of relearning the interface."),
            ("Check that it feels simple", "A journey can be tested by asking someone to complete a specific task and noticing where they hesitate. This practical feedback helps improve a product before adding more options."),
        ],
    },
    {
        "slug": "apprendre-en-construisant",
        "category": "Transmission",
        "category_en": "Teaching",
        "read_time": 5,
        "title": "Apprendre le numérique en construisant des choses utiles",
        "title_en": "Learning technology by building useful things",
        "excerpt": "Relier les notions à un projet concret aide à comprendre, à expérimenter et à progresser avec confiance.",
        "excerpt_en": "Connecting concepts to a real project helps people understand, experiment and grow with confidence.",
        "body": [
            ("Passer de la théorie à l’essai", "Une notion devient plus facile à retenir lorsqu’on peut l’utiliser pour résoudre un petit problème. Un exercice concret rend visibles les choix, les erreurs et les progrès qui restent abstraits dans un cours seul."),
            ("Découper pour avancer", "Un projet complet peut sembler intimidant. Le diviser en étapes courtes — décrire le besoin, créer une première page, traiter les données, puis améliorer le résultat — permet d’avancer et de comprendre pourquoi chaque partie existe."),
            ("Partager le chemin", "Expliquer son raisonnement, demander un retour et aider quelqu’un à débloquer une étape font partie de l’apprentissage. Le numérique se transmet aussi par ces échanges et par le droit d’essayer, de corriger et de recommencer."),
        ],
        "body_en": [
            ("Move from theory to practice", "A concept is easier to remember when it helps solve a small problem. A practical exercise makes choices, mistakes and progress visible in ways a lesson alone cannot."),
            ("Break the work into steps", "A complete project can feel daunting. Splitting it into short stages — describe the need, make a first page, handle the data, then improve the result — makes progress manageable and shows why each part exists."),
            ("Share the process", "Explaining your reasoning, asking for feedback and helping someone past a blocker are all part of learning. Technology is also taught through these exchanges and through the freedom to try, correct and try again."),
        ],
    },
]

for post in ARTICLES:
    post["body"] = [
        {"title": section[0], "text": section[1], "title_en": translated[0], "text_en": translated[1]}
        for section, translated in zip(post["body"], post["body_en"])
    ]


def home(request):
    return render(
        request,
        "portfolio/home.html",
        {"profile": PROFILE, "skills": SKILLS, "projects": PROJECTS, "experiences": EXPERIENCES, "articles": ARTICLES},
    )


def projects(request):
    return render(request, "portfolio/projects.html", {"profile": PROFILE, "projects": PROJECTS})


def contact(request):
    return render(request, "portfolio/contact.html", {"profile": PROFILE})


def blog(request):
    return render(request, "portfolio/blog.html", {"profile": PROFILE, "articles": ARTICLES})


def article(request, slug):
    post = next((item for item in ARTICLES if item["slug"] == slug), None)
    if post is None:
        raise Http404("Article introuvable")
    return render(request, "portfolio/article.html", {"profile": PROFILE, "article": post, "articles": ARTICLES})
