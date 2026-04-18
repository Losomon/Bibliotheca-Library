# Contributing to Bibliotheca Library

Thank you for your interest in contributing to **Bibliotheca** — an AI-powered library management and bookstore system built for public libraries in Kenya. Every contribution, no matter the size, makes this project better for librarians, members, and communities.

Please read this guide before opening an issue or submitting a pull request.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Submitting Code](#submitting-code)
- [Development Setup](#development-setup)
- [Branching Strategy](#branching-strategy)
- [Commit Convention](#commit-convention)
- [Code Standards](#code-standards)
- [Pull Request Process](#pull-request-process)
- [What We Need Help With](#what-we-need-help-with)

---

## Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold it. Please report unacceptable behaviour to the maintainer.

---

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Bibliotheca-Library.git
   cd Bibliotheca-Library
   ```
3. **Add the upstream remote:**
   ```bash
   git remote add upstream https://github.com/Losomon/Bibliotheca-Library.git
   ```
4. Follow the [README setup instructions](README.md#getting-started) to get the project running locally.

---

## How to Contribute

### Reporting Bugs

Before filing a bug report, please search [existing issues](https://github.com/Losomon/Bibliotheca-Library/issues) to avoid duplicates.

When filing a bug, use the **Bug Report** issue template and include:

- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behaviour
- Your environment (OS, Node version, browser)
- Screenshots or error logs if applicable

> 🔒 **Security vulnerabilities** must **not** be reported as public issues. See [SECURITY.md](SECURITY.md) instead.

---

### Suggesting Features

We love feature requests! Use the **Feature Request** issue template and describe:

- The problem you're trying to solve
- Your proposed solution
- Any alternatives you've considered
- Which user role benefits (member / librarian / admin)

---

### Submitting Code

Small fixes (typos, docs, obvious bugs) can be submitted directly as a PR.

For larger changes (new features, refactoring, new pages), please **open an issue first** to discuss the approach before writing code. This prevents wasted effort if the direction doesn't fit the project.

---

## Development Setup

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend/library-ai
npm install

# Copy environment files
cp frontend/.env.example frontend/.env.local
cp backend/library-ai/.env.example backend/library-ai/.env.local
# Fill in your Supabase and Grok API keys

# Run both services
# Terminal 1 — backend
cd backend/library-ai && npm run dev   # http://localhost:3001

# Terminal 2 — frontend
cd frontend && npm run dev             # http://localhost:3000
```

Refer to the [README](README.md) for full environment variable documentation.

---

## Branching Strategy

| Branch | Purpose |
|---|---|
| `main` | Stable, production-ready code |
| `1-backend-and-frontend-implementaion` | Active development branch — **target your PRs here** |
| `feature/your-feature` | Your feature branch |
| `fix/your-fix` | Your bug fix branch |

**Always branch off from** `1-backend-and-frontend-implementaion`, not `main`.

```bash
# Sync your fork before starting work
git fetch upstream
git checkout 1-backend-and-frontend-implementaion
git merge upstream/1-backend-and-frontend-implementaion

# Create your branch
git checkout -b feature/reading-history-export
# or
git checkout -b fix/fine-calculation-renewal
```

---

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/). Every commit message must follow this format:

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

### Types

| Type | When to use |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting, whitespace — no logic change |
| `refactor` | Code restructure without feature change |
| `perf` | Performance improvement |
| `test` | Adding or fixing tests |
| `chore` | Build config, tooling, dependencies |
| `ci` | CI/CD changes |

### Scope (optional but helpful)

`admin`, `member`, `librarian`, `ai`, `payments`, `api`, `db`, `auth`, `ui`

### Examples

```bash
git commit -m "feat(member): add reading history export to CSV"
git commit -m "fix(fines): correct daily fine calculation on renewal"
git commit -m "docs(api): add missing /api/borrows endpoint examples"
git commit -m "chore(deps): upgrade Next.js to 15.2"
git commit -m "feat(ai): add book quiz to public chat widget"
git commit -m "fix(auth): redirect to correct dashboard on login by role"
```

---

## Code Standards

Please follow these before submitting:

### TypeScript
- **Strict mode** — `any` is not allowed unless absolutely unavoidable and commented
- All props, function parameters, and return types must be typed
- Use `type` for object shapes, `interface` for component props

### Components
- Keep components **under 200 lines** — extract into sub-components if larger
- Use `shadcn/ui` base components wherever possible before writing custom UI
- All interactive elements need loading and error states

### API Routes
- Every API route **must validate** its request body using **Zod**
- Never write raw SQL in components — all DB access goes through the Supabase client
- Return consistent response shapes: `{ data, error, message }`

### Styling
- Use **Tailwind utility classes** — no custom CSS unless design tokens are genuinely needed
- Follow the existing colour token system (`--gold`, `--ink`, `--rust`, etc.) in `globals.css`
- Dark mode support is required on all new UI

### Before you push

```bash
# Type check — must pass with 0 errors
npm run type-check

# Lint — fix all warnings
npm run lint

# Build — must complete without errors
npm run build
```

---

## Pull Request Process

1. **Fill in the PR template** completely — describe what changed, why, and how to test it
2. **Link the related issue** using `Closes #123` or `Fixes #123` in the description
3. **Target the correct branch:** `1-backend-and-frontend-implementaion`
4. **Keep PRs focused** — one feature or fix per PR. Avoid mixing unrelated changes
5. **Screenshots required** for any UI changes — before and after
6. **All checks must pass** before a review will be given (type-check, lint, build)
7. **At least one maintainer approval** is required to merge
8. **Squash commits** when merging if the branch has noisy intermediate commits

### PR Title Format

Same as commit convention:
```
feat(admin): add bulk overdue notice sending
fix(checkout): resolve M-Pesa webhook race condition
docs: add deployment guide for self-hosted Docker
```

---

## What We Need Help With

Looking for somewhere to start? Here are areas where contributions are especially welcome:

| Area | Examples |
|---|---|
| 🤖 **AI prompts** | Improving system prompts, adding quiz categories, better book card parsing |
| 📱 **Mobile UI** | Responsive fixes, touch interactions, PWA manifest |
| ♿ **Accessibility** | ARIA labels, keyboard navigation, screen reader support |
| 🧪 **Tests** | Unit tests for utility functions, API route tests, Playwright e2e |
| 🌍 **Localisation** | Swahili translations, multi-language support |
| 📖 **Documentation** | Inline code comments, Storybook stories for components |
| 🔐 **Security** | RLS policy audits, input sanitisation, rate limiting |
| 📊 **Analytics** | Better reports, chart components, data exports |

Check the [Issues tab](https://github.com/Losomon/Bibliotheca-Library/issues) for anything tagged `good first issue` or `help wanted`.

---

## Questions?

Open a [Discussion](https://github.com/Losomon/Bibliotheca-Library/discussions) rather than an Issue for general questions. We're happy to help you get oriented.

Thank you for helping build Bibliotheca. 📚
