# DataScienceGT Landing Page

This is the landing site for DataScienceGT, built with **React + Vite + Tailwind CSS**.

## Pages & Content Management

- **Who We Are**  
  - The content is **hardcoded** inside `src/pages/Home.jsx`.  
  - To change text or layout, edit the JSX directly.

- **What We Do?**  
  - Content is loaded dynamically from a text file.  
  - Edit the file at:
    ```
    public/content/pages/what-we-do/page.txt
    ```
  - Changes will be picked up automatically without touching React code.

- **Testimonials**  
  - Content is also loaded dynamically from a text file.  
  - Edit the file at:
    ```
    public/content/what-others-say/testimonial.txt
    ```
  - The site will render whatever testimonials are defined there.

- **Contact**  
  - Currently static (hardcoded) or minimal — update JSX directly until externalized.

## Tech Stack
- React 18
- Vite
- Tailwind CSS
- React Router DOM

## Development
```bash
npm install
npm run dev
