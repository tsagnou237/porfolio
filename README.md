# Portfolio — Steve Varrel

Portfolio personnel construit avec Django et Tailwind CSS.

## Lancer en local

```powershell
python -m pip install -r requirements.txt
python manage.py runserver
```

Pour reconstruire le CSS après une modification, installe les dépendances Node puis lance `npm run css:build`.

## Déploiement Render

Le fichier `render.yaml` configure le service web Render à partir de la branche `main`. Dans Render, crée une **New Blueprint Instance**, connecte le dépôt `tsagnou237/porfolio`, puis applique le Blueprint. Render installe les dépendances, collecte les fichiers statiques, applique les migrations et démarre Gunicorn. La clé Django de production est générée automatiquement.

Pour un domaine personnalisé, ajoute le nom d’hôte dans `DJANGO_ALLOWED_HOSTS` et son origine HTTPS dans `DJANGO_CSRF_TRUSTED_ORIGINS`.
