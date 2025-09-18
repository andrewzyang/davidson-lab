# Davidson Lab Website

A modern, responsive research lab website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Home/About Page**: Overview of the lab, mission statement, and PI information
- **Team Page**: (Currently blank - ready for content)
- **Research Page**: (Currently blank - ready for content)  
- **Contact Form**: Available at the bottom of every page with form validation
- **Responsive Design**: Mobile-first approach with Arial Nova Thin typography

## Setup Instructions

1. **Fix npm permissions** (if needed):
   ```bash
   sudo chown -R $(whoami) ~/.npm
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
davidson-lab/
├── src/
│   ├── app/              # Next.js pages
│   │   ├── page.tsx      # Home/About
│   │   ├── team/         # Team page
│   │   └── research/     # Research page
│   ├── components/       # Reusable components
│   │   └── layout/       # Navbar, Footer, ContactForm
│   └── types/            # TypeScript definitions
├── public/               # Static assets
└── package.json          # Dependencies
```

## Build for Production

```bash
npm run build
npm start
```

## Customization

- Update lab information in `src/app/page.tsx`
- Add team members in `src/app/team/page.tsx`
- Add publications in `src/app/research/page.tsx`
- Modify colors in `tailwind.config.ts`
- Update metadata in `src/app/layout.tsx`