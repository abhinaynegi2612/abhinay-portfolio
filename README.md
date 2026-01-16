# Geetanjali Pandey – Full-Stack Developer Portfolio

A clean, modern, and production-ready portfolio for **Geetanjali Pandey (MCA)**, built with HTML5, CSS3, JavaScript (ES6+), and Bootstrap 5. The site is designed to highlight full-stack development skills.

- **Pages**: Home, About, Projects (all grouped), and Contact.
- **Projects**: Includes case study modals for all three projects.
- **Features**: Responsive design, accessible components, and a working contact form.

---

## 1. Project structure

```text
geetanjali-portfolio/
  index.html
  about.html
  projects.html
  contact.html
  manifest.json
  README.md
  css/
    main.css           # Editable main styles
    main.min.css       # Minified for production (linked in HTML)
    contact-form.css   # Contact form specific styles
  js/
    main.js            # Core interactions (smooth scroll, counters, gallery, etc.)
    main.min.js        # Minified version (linked in HTML)
    contact-form.js    # Contact form validation and Formspree integration
  images/
    favicon-32.png           # Favicon placeholder (replace with real icon)
    favicon-192.png          # PWA icon placeholder
    favicon-512.png          # PWA icon placeholder
    profile-placeholder.webp # Hero/portrait placeholder
    og-image-placeholder.png # Social share image placeholder
    jpsm-hero-placeholder.webp
    jpsm-hero-placeholder@2x.webp
    jpsm-gallery-1.webp
    jpsm-gallery-2.webp
    jpsm-gallery-3.webp
    jpsm-gallery-4.webp
```

> All image files are placeholders. Replace them with your own optimized WebP/PNG files.

---

## 2. Where to edit content

- **Name / tagline / summary**: 
  - `index.html` hero and highlights sections.
  - `about.html` intro and education sections.
- **Contact details** (phone, email, LinkedIn):
  - `index.html` hero + contact section footer.
  - `about.html` footer.
  - `projects.html` and `contact.html` footers and contact sections.
- **LinkedIn URL**:
  - Search for `linkedin.com/in/geetanjali-pandey` in all HTML files and update if needed.
- **Projects**:
  - `projects.html` – JPSM, Enhanced AI Learning Platform, Plag AI App cards and descriptions.
  - `index.html` – featured JPSM block + case-study modal.
- **Formspree endpoint**:
  - In `contact.html` and `js/contact-form.js` search for `https://formspree.io/f/mvgebvjo` and replace with your real Formspree form URL.
  - See "Contact Form Setup" section below for detailed instructions.
- **Services / testimonials / blog placeholders**:
  - `index.html` services, testimonials carousel, and blog/resources section.

---

## 3. Features

- **Accessibility**
  - Semantic HTML, landmarks (`header`, `main`, `footer`).
  - Skip-to-content link.
  - High-contrast colors and focusable controls.
  - ARIA labels on navigation, carousel, and key interactive elements.

- **UI / UX**
  - Mobile-first Bootstrap 5 layout.
  - Smooth scrolling via `data-scroll` attributes.
  - Back-to-top button.
  - Scroll progress bar at top.
  - Shimmer/loading effects for cards.
  - Testimonials carousel using Bootstrap.
  - Gallery lightbox for JPSM images.

- **Grouped Projects Page**
  - All three projects are presented on a single, clean `projects.html` page.
  - Each project has a 'View Details' button that launches a Bootstrap modal with a detailed case study, including responsibilities and tech stack.

- **Production-Ready Contact Form**
  - Fully functional Formspree integration with validation and accessibility.
  - Real-time field validation with helpful error messages.
  - Spam protection via honeypot field.
  - Loading states and clear success/error feedback.
  - Mailto fallback if Formspree fails.
  - Mobile-first responsive design with high contrast and reduced motion support.

---

## Contact Form Setup

The contact form uses Formspree for form submission. Here's how to configure it:

### 1. Create Your Formspree Form
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and get your endpoint URL (e.g., `https://formspree.io/f/your-form-id`)
3. Verify your email address

### 2. Update the Endpoint
Replace the current endpoint in these files:
- `contact.html` (line 48): Update the `action` attribute
- `js/contact-form.js` (line 95): Update the fetch URL

### 3. Test the Form
1. Open `contact.html` in your browser
2. Fill out all fields (minimum 2 chars for name, 10 chars for message)
3. Submit - you should see a success message
4. Check your email for the form submission

### 4. Customization Options
- **Email subject**: Edit the hidden input `_subject` value in `contact.html`
- **Fallback email**: Update `geetanjalipandey776@gmail.com` in `js/contact-form.js`
- **Validation rules**: Modify minimum lengths in `js/contact-form.js`
- **Styling**: Customize `css/contact-form.css` to match your design

### 5. Troubleshooting
- **Form not submitting**: Ensure your Formspree form is activated (check email)
- **Validation errors**: Check browser console for JavaScript errors
- **Styling issues**: Verify `contact-form.css` is loaded after `main.min.css`


---

## 4. Running locally

From inside the `geetanjali-portfolio` folder:

```bash
# Option 1: Python
python -m http.server 8000

# Option 2: Node (using serve)
npx serve .
```

Then open:

- `http://localhost:8000/index.html`

---

## 5. Building / minifying assets

Current repo already includes `main.min.css` and `main.min.js` generated from `main.css` and `main.js`.

If you change styles or scripts:

1. Edit `css/main.css` or `js/main.js`.
2. Re-minify using your preferred tool (examples):

```bash
# CSS (using npx clean-css-cli)
npx clean-css -o css/main.min.css css/main.css

# JS (using npx terser)
npx terser js/main.js -c -m -o js/main.min.js
```

These commands are **optional** and require Node.js.

---

## 6. Deployment

### 6.1 Git repository setup

From `geetanjali-portfolio/`:

```bash
git init
git add .
git commit -m "Initial commit: Geetanjali Pandey portfolio"
```

Create a new GitHub repository (e.g. `geetanjali-portfolio`) and then:

```bash
git remote add origin https://github.com/<your-username>/geetanjali-portfolio.git
git push -u origin main  # or master, depending on your default branch
```

### 6.2 GitHub Pages deployment

1. Push the repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select:
   - Branch: `main` (or `master`).
   - Folder: `/ (root)`.
4. Save. GitHub Pages will build and publish your site.
5. Your URL will look like:
   - `https://<your-username>.github.io/geetanjali-portfolio/`

Ensure all links are relative (already done in the HTML files).

### 6.3 Netlify deployment

**Drag-and-drop**:

1. Zip the contents of `geetanjali-portfolio/`.
2. Go to <https://app.netlify.com/>, create a site.
3. Drag-and-drop the ZIP into the deploy area.

**From Git**:

1. Connect Netlify to your GitHub repo.
2. Build settings:
   - **Build command**: *(leave empty)* (static site).
   - **Publish directory**: `geetanjali-portfolio` (or repository root, if you move files).

Optional `_redirects` are not required for this simple static site.

---

## 7. Performance / Lighthouse notes

- Uses minified CSS/JS (`main.min.css`, `main.min.js`).
- Images are provided as WebP placeholders; replace with optimized WebP/AVIF.
- Uses `loading="lazy"` for non-critical images.
- Minimal external dependencies: Bootstrap 5 and Font Awesome via CDN.
- Consider self-hosting CSS/JS for stricter environments.

---

## 8. Known placeholders

- All `.webp` and favicon `.png` files are placeholders.
- Project links for **Enhanced AI Learning Platform** and **Plag AI App** are placeholders.
- Project source code/demo URLs are placeholders.
- Formspree endpoint must be updated before production.

---

## 10. Release notes

- Final version includes:
  - A complete, multi-page portfolio focused on a 'Full-Stack Developer' profile.
  - A redesigned projects page that groups all projects with detailed modals.
    - All necessary assets and deployment instructions for a production-ready site.
