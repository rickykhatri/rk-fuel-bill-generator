# Fuel Bill & Cash Memo Generator

A modern, printable Fuel Station Cash & Credit Memo generator crafted with interactive fields, authentic thermal/carbon-copy print aesthetics, customizable dealer logos, live mathematical calculations, and digital signature capabilities.

---

## 🌟 Key Features

- **Interactive In-Place Editing**: Click any field directly on the receipt to edit customer details, vehicle number, date, line items (CNG, Petrol, Diesel, 2T Oil), quantities, rates, and amounts.
- **Authentic Print Styling**:
  - Exact typography pairing with typewriter, handwritten, and ink-stamp styling.
  - Bordered station & dealer details box symmetrically framed by company logos.
  - Authentic Bharat Petroleum (BPCL) and Aavantika Gas Limited (AGL) vector emblems.
  - Click-to-replace or upload custom logos for your own station branding.
  - Centered memo serial number (`No. 343`) and single-line `TIN` number layout.
- **Dynamic Calculation Engine**:
  - Automatic calculation of sub-amounts (`Quantity × Rate`) and total amounts with split Rupee & Paise formatting.
  - Option to toggle automatic calculation on or off for manual adjustments.
- **Signature Pad**:
  - Integrated digital signature pad to draw, sign, or paste customer/dealer signatures.
  - Preset realistic handwritten signature flourishes and stamp modes.
- **Thermal & Letterhead Print Ready**:
  - Optimized CSS `@media print` rules hide UI controls and headers.
  - Precise page sizing ensuring clean, single-page printouts and PDF exports.
- **Container & Cloud Deployment Ready**:
  - Multi-stage `Dockerfile` with lightweight Alpine Nginx server.
  - Automated GitHub Actions workflow (`.github/workflows/deploy.yml`) for instant deployment to GitHub Pages.

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ or 20+ recommended)
- [npm](https://www.npmjs.com/)

### Installation & Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```

Open your browser at `http://localhost:3000` to view the application.

### Production Build

```bash
npm run build
```
Build outputs are compiled into the `dist/` directory.

---

## 🐳 Docker Deployment

You can build and run the application as a lightweight container:

```bash
# Build the Docker image
docker build -t fuel-memo-generator .

# Run the container on port 8080
docker run -d -p 8080:80 --name fuel-memo fuel-memo-generator
```

Access the app in your browser at `http://localhost:8080`.

---

## 🌐 Deploy to GitHub Pages

If your GitHub Pages URL displays a blank page, it is because GitHub Pages is trying to serve raw TypeScript source files (`/src/main.tsx`) directly instead of the compiled production bundle (`dist/`).

### Option 1: Automated Deployment via GitHub Actions (Recommended)
1. Commit and push your files to GitHub (`main` branch).
2. In your repository on GitHub, navigate to **Settings** > **Pages** (in the left sidebar).
3. Under **Build and deployment** > **Source**, switch the dropdown from **Deploy from a branch** to:
   👉 **GitHub Actions**
4. Go to the **Actions** tab at the top of your GitHub repository.
5. Click **Deploy to GitHub Pages** in the left menu, then click **Run workflow** > **Run workflow**.
6. Once the checkmark turns green (takes ~30 seconds), your live site at `https://rickykhatri.github.io/rk-fuel-bill-generator/` will work seamlessly.

### Option 2: 1-Command Deployment via `gh-pages` Branch
If you want GitHub to deploy directly from a branch:
```bash
# Builds dist and pushes compiled output to the gh-pages branch
GITHUB_REPOSITORY="rickykhatri/rk-fuel-bill-generator" npm run build
npm run deploy
```
Then in **Settings** > **Pages**, set **Source** to **Deploy from a branch** and select the branch **`gh-pages`** / `(root)`.

---

## 🖨️ Printing Tips

For the most authentic physical printout:
1. Click the **Print Receipt** button or press `Ctrl + P` / `Cmd + P`.
2. In the print dialog, ensure **"Background graphics"** is checked so borders, ink textures, and logo fills render accurately.
3. Set margins to **Default** or **None**.

---

## 👤 Author & Copyright

**Designed & Developed by Ricky Khatri**  
© 2026 Ricky Khatri. All rights reserved.
