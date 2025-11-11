## Portfolio Website (Static, GitHub Pages)

Fast, stable, and easy-to-maintain static portfolio. Served via GitHub Pages.

### 1) Create the GitHub Pages repo
1. Go to GitHub → New repository
2. Name it exactly: `taosegundo.github.io`
3. Keep it Public
4. Create repository

Then push this folder:
```bash
git init
git add .
git commit -m "Initial portfolio scaffold"
git branch -M main
git remote add origin https://github.com/taosegundo/taosegundo.github.io.git
git push -u origin main
```

### 2) Enable GitHub Pages
GitHub → Repo Settings → Pages:
- Source: Deploy from a branch
- Branch: main / root
- Save

Your site will be available at:
`https://taosegundo.github.io`

### 3) Customize content
- Update site meta in each HTML file `<head>` (title, description, URLs).
- Replace `Your Name`, role, and links in `index.html`, `about.html`, `contact.html`.
- Add a resume pdf to `resume/resume.pdf` (the contact page will auto-show a link when present).
- Add project entries to `data/projects.json` (see format below).
- Add images to `assets/img/` and a favicon at `/favicon.ico` (or `/assets/img/favicon.ico` and update the link).

`data/projects.json` format:
```json
[
  {
    "title": "Project Title",
    "description": "Short description (1–2 lines).",
    "tags": ["TypeScript", "Node"],
    "link": "https://example.com",
    "repo": "https://github.com/yourusername/example",
    "image": "assets/img/project-example.jpg",
    "date": "2024-09"
  }
]
```

### 4) Optional: Analytics (privacy-friendly)
Create an account on Plausible, then add your domain. Uncomment the Plausible script in the HTML `<head>` and replace the domain attribute.

### 5) Sitemap
`sitemap.xml` `<loc>` values are set to `https://taosegundo.github.io`. Update if you change domains later.

### 6) Accessibility & Performance
This template targets 95+ Lighthouse. Keep images optimized (webp/jpg), add `alt`, and respect contrast.


