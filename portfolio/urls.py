from django.urls import path

from . import views

app_name = "portfolio"

urlpatterns = [
    path("", views.home, name="home"),
    path("projets/", views.projects, name="projects"),
    path("contact/", views.contact, name="contact"),
    path("blog/", views.blog, name="blog"),
    path("blog/<slug:slug>/", views.article, name="article"),
]
