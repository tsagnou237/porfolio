# Portfolio — Steve Varrel

Portfolio personnel construit avec Django et Tailwind CSS.

## Lancer en local

```powershell
python -m pip install -r requirements.txt
python manage.py runserver
```

Pour reconstruire le CSS après une modification, installe les dépendances Node puis lance `npm run css:build`.

## Déploiement KENN HOSTING

Connecter le dépôt GitHub `tsagnou237/porfolio` sur la branche `main`, puis sélectionner Django.

- Installation : `pip install -r requirements.txt`
- Build : `python manage.py collectstatic --noinput && python manage.py migrate --noinput`
- Démarrage : `gunicorn portfolio_site.wsgi:application --bind 0.0.0.0:$PORT`
- Variables requises : `DJANGO_DEBUG=False`, `DJANGO_ALLOWED_HOSTS=.kennhosting.app`, et une clé secrète `DJANGO_SECRET_KEY` marquée comme secret.

Les assets statiques sont servis par WhiteNoise. Le portfolio n’a pas besoin de base de données externe.
