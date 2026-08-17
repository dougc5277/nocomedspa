# NoCo MedSpa & IV Therapy — Static Website

Modern, lightweight, physician-monitored medical spa website converted from WordPress. Built with semantic HTML5, modern vanilla CSS design tokens, and modular vanilla JavaScript. Zero build steps, zero runtime dependencies, blazingly fast load times, and ready to deploy immediately to **Cloudflare Pages** or **GitHub Pages**.

---

## 📁 Project Structure

```
.
├── index.html                   # Homepage / Open House / Clinic Showcase
├── emsculpt-neo.html            # EMSCULPT neo Body Contouring & HIFEM+
├── cosmetic-botox.html          # Cosmetic Botox Services & Safety Info
├── weight-loss.html             # Doctor-Supervised GLP-1 & Semaglutide Weight Loss
├── iv-therapy.html              # IV Vitamin Therapy & Myers' Cocktail
├── treatments.html              # Full Menu of Services & 25% Off Promotions
├── contact.html                 # Contact Form, Phone Numbers & Google Map
├── 404.html                     # Custom 404 Error Page
├── css/
│   └── styles.css               # Luxury MedSpa Design System & Responsive Tokens
├── js/
│   └── main.js                  # Navigation, Interactive Dialogs, Quiz & Alerts
├── assets/
│   └── images/                  # High-Resolution Brand Graphics & Media
├── _headers                     # Cloudflare Pages Caching & Security Headers
├── _redirects                   # Cloudflare Pages 301 Legacy SEO Redirects
└── .github/
    └── workflows/
        └── deploy.yml           # GitHub Actions Automated Pages Deployer
```

---

## 🚀 Deployment Guide

### Option 1: Deploy to Cloudflare Pages (Recommended for Speed & Custom Domains)

1. **Create a GitHub Repo**:
   ```bash
   cd /Users/doug/.gemini/antigravity/scratch/nocomedspa
   git init
   git add .
   git commit -m "Initial commit: Static NoCo MedSpa website"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**:
   - Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
   - Navigate to **Workers & Pages** &rarr; **Create application** &rarr; **Pages** &rarr; **Connect to Git**.
   - Select your repository.
   - **Build Settings**:
     - Framework preset: `None`
     - Build command: *(leave empty)*
     - Build output directory: `.` *(or root directory)*
   - Click **Save and Deploy**.

3. **Configure Custom Domain**:
   - In Cloudflare Pages project settings, click **Custom Domains**.
   - Add `nocomedspa.com` (or your staging domain) and follow Cloudflare's 1-click DNS configuration.

---

### Option 2: Deploy to GitHub Pages (100% Free Built-in Hosting)

1. Push the code to a GitHub repository as shown above.
2. In your GitHub repository, go to **Settings** &rarr; **Pages**.
3. Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.
4. The included `.github/workflows/deploy.yml` will automatically build and publish your site at `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`.

---

## 💻 Local Testing & Development

Run any standard local web server inside this directory:

### Using Python:
```bash
python3 -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

### Using Node / npx:
```bash
npx serve .
```

---

## 🌟 Key Features

- **Blazingly Fast**: Zero bloat, ~0.1s load times compared to heavy WordPress themes.
- **Mobile-First Responsive**: Custom drawer navigation, fluid layouts, and mobile quick-call actions.
- **Interactive Booking Modals**: Native `<dialog>` modal with backdrop click dismiss and appointment intake forms.
- **3-Minute Weight Loss Quiz**: Interactive pre-qualification tool for GLP-1 patients.
- **Preserved SEO & 301 Redirects**: All legacy WordPress URLs automatically redirect cleanly to their corresponding pages.
- **Self-Contained Media Assets**: All logos, photos, and diagrams are stored locally in `assets/images/`, so you can safely sunset the old WordPress hosting.
