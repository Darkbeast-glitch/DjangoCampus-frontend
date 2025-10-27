# Contributing to DjangoCampus-frontend

Thank you for your interest in contributing to DjangoCampus-frontend!  
We welcome all contributions that help improve our community-driven platform and make it easier for developers, students, and educators to learn and collaborate.

Please follow this guide to help us maintain a positive and productive environment.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [How to Contribute](#how-to-contribute)
5. [Code Style Guidelines](#code-style-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Issue Guidelines](#issue-guidelines)
8. [Additional Resources](#additional-resources)

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/Darkbeast-glitch/DjangoCampus-frontend.git
cd DjangoCampus-frontend
```

### Install dependencies

```bash
npm install
# or if using pnpm
pnpm install
```

### Run the project

```bash
npm run dev
# or pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## Tech Stack

- **Frontend**: Next.js, TypeScript, React
- **Styling**: Tailwind CSS, DaisyUI
- **State Management**: React Context / Hooks
- **Analytics**: Google Analytics
- **Deployment**: Vercel

---

## Project Structure

```
DjangoCampus-frontend/
│
├─ app/                  # Main application components
├─ components/           # Reusable React components
├─ lib/                  # Helper functions and utilities
├─ services/             # API calls and services
├─ styles/               # Tailwind CSS and global styles
├─ types/                # TypeScript type definitions
├─ public/               # Public assets (images, fonts)
├─ README.md             # Project overview and instructions
├─ LICENSE               # MIT License
└─ CONTRIBUTING.md       # This contribution guide
```

---

## How to Contribute

You can contribute in several ways:

1. **Code Contributions** – Fix bugs, add features, improve UI/UX.
2. **Documentation** – Improve README, guides, tutorials, and examples.
3. **Issue Triage** – Help review, label, and clarify existing issues.
4. **Feature Requests** – Suggest enhancements or improvements.

### Steps to contribute:

1. Fork the repository.
2. Create a new branch from `main`:

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes.
4. Add and commit your changes:

```bash
git add .
git commit -m "Brief description of your change"
```

5. Push your branch to your fork:

```bash
git push origin feature/your-feature-name
```

6. Open a Pull Request (PR) to the `main` branch of the original repository.

---

## Code Style Guidelines

- Use **TypeScript** and follow consistent typing practices.
- Use **Tailwind CSS** utility classes for styling.
- Keep **components modular and reusable**.
- Follow proper **naming conventions** for variables and files.
- Write **clear commit messages** in present tense.

---

## Pull Request Process

1. Ensure your PR targets the `main` branch.
2. Provide a **clear title and description**.
3. Reference any relevant issues using `#issue-number`.
4. Ensure all tests pass (if applicable).
5. Maintain proper formatting and coding style.
6. Wait for review and respond to any requested changes.

---

## Issue Guidelines

- Check existing issues before opening a new one.
- Provide **detailed descriptions**, including steps to reproduce bugs.
- Use proper **labels** when reporting (bug, enhancement, question).
- Be respectful and collaborative in discussions.

---

## Additional Resources

- Visit [DjangoCampus website](https://djangocampus.tech) for more information.
- Join our community to **ask questions, get help, and network**.
- For any questions about contributing, contact the maintainer via GitHub.

---

Thank you for helping make DjangoCampus-frontend better for everyone!
