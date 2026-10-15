# Maruway Networks website (React + Vite), dark AI theme

Run from the project root (maruway-site):

    npm install react-router-dom @fontsource-variable/geist @fontsource-variable/geist-mono
    npm run dev        # local
    npm run build      # dist/ for upload

Images live in src/assets/img (brand, team, projects, partners). Drop new project photos into
src/assets/img/projects/ using the names in src/data/projects.js; they appear automatically.
Projects without a photo are hidden.

Edit first: src/config/site.js (phone, hours, stats, socials), .env (VITE_FORM_ENDPOINT, VITE_GA_ID).

Verify with management before launch: phone number (two on old site), the 60-minute response terms,
undated statistics, partner logo permission, parent company wording (Famguard vs BARINC),
service scope text. The six demos are labelled simulations with invented sample data.
