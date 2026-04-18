# Security Policy

## Supported Versions

Only the latest version of Bibliotheca on the `main` branch receives security updates.

| Version | Supported |
|---|---|
| `main` (latest) | ✅ Active support |
| Older branches | ❌ No security updates |

---

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities as public GitHub Issues.**

Public disclosure before a fix is available puts all users of this project at risk. We take security seriously and will respond promptly to every responsible disclosure.

### How to Report

**Option 1 — GitHub Private Advisory (Preferred)**

Use GitHub's built-in private reporting:

1. Go to the [Security tab](https://github.com/Losomon/Bibliotheca-Library/security) of this repository
2. Click **"Report a vulnerability"**
3. Fill in the advisory form with as much detail as possible
4. Submit — only maintainers can see this

**Option 2 — Email**

If you prefer email, contact the maintainer directly via the email listed on the [GitHub profile](https://github.com/Losomon). Please encrypt sensitive details if possible.

---

## What to Include in Your Report

A good security report helps us reproduce and fix the issue faster. Please include:

- **Description** — what the vulnerability is and where it exists
- **Impact** — what an attacker could do if they exploited it
- **Steps to reproduce** — a clear, step-by-step sequence
- **Proof of concept** — code, screenshots, or a video if available
- **Your environment** — OS, browser, Node version
- **Suggested fix** — if you have one (optional but appreciated)

---

## What Happens After You Report

| Timeline | Action |
|---|---|
| Within **48 hours** | We acknowledge receipt of your report |
| Within **7 days** | We assess severity and confirm whether it's a valid vulnerability |
| Within **30 days** | We aim to release a fix for confirmed vulnerabilities |
| After fix is released | We credit you in the release notes (unless you prefer anonymity) |

We will keep you informed throughout the process. If you don't receive an acknowledgement within 48 hours, please follow up.

---

## Scope

### In scope (please report these)

- Authentication and authorisation bypass (e.g. accessing another member's data)
- SQL injection or RLS bypass in Supabase queries
- Exposed API keys, secrets, or credentials in the codebase
- Cross-site scripting (XSS) in user-facing pages
- Cross-site request forgery (CSRF)
- Insecure direct object references (IDOR) — e.g. accessing any member's fines by ID
- Payment flow vulnerabilities (M-Pesa / Paystack webhook manipulation)
- AI prompt injection that causes harmful behaviour
- Sensitive data exposure in API responses
- Server-side request forgery (SSRF)
- Privilege escalation between roles (member → librarian → admin)

### Out of scope (please do not report these)

- Vulnerabilities in third-party services (Supabase, Vercel, xAI) — report those to the vendor directly
- Self-XSS requiring the attacker to be logged in as themselves
- Clickjacking on pages with no sensitive actions
- Missing security headers that have no demonstrated impact
- Theoretical vulnerabilities with no proof of concept
- Denial of service attacks requiring an unrealistic volume of requests
- Social engineering attacks

---

## Safe Harbour

We consider security research conducted in good faith to be authorised and will not take legal action against you if you:

- Report the vulnerability promptly and responsibly before public disclosure
- Avoid accessing, modifying, or deleting data that is not yours
- Do not perform attacks that degrade service availability (DoS)
- Do not perform actions beyond what is necessary to demonstrate the vulnerability
- Keep vulnerability details confidential until we have released a fix

---

## Security Best Practices for Contributors

If you are contributing code, please follow these guidelines to avoid introducing vulnerabilities:

**Authentication & Authorisation**
- Never trust client-supplied role or user ID values — always derive from the Supabase session server-side
- All API routes must verify the session before performing any action
- Use Supabase RLS policies as the last line of defence, not the only line

**Input Validation**
- Validate all incoming request bodies with **Zod** before processing
- Never construct database queries from raw user input
- Sanitise any user content before rendering it as HTML

**Secrets**
- Never commit API keys, passwords, or secrets to the repository
- All secrets go in `.env.local` — this file is in `.gitignore`
- Use GitHub Secrets for CI/CD workflows

**Dependencies**
- Run `npm audit` before opening a PR
- Do not add dependencies with known critical CVEs
- Keep dependencies up to date — we use Dependabot for automated PRs

**API Security**
- Rate-limit sensitive endpoints (auth, payments, AI chat)
- Validate webhook signatures from M-Pesa and Paystack before processing
- Never log full request bodies that may contain payment details or passwords

---

## Disclosure Policy

Once a fix is released, we will:

1. Publish a GitHub Security Advisory describing the vulnerability (without exploit details until users have had time to update)
2. Credit the reporter in the advisory (with their permission)
3. Tag the release as a security release in the changelog

We follow a **90-day coordinated disclosure** window. If we have not released a fix within 90 days, you are free to disclose publicly.

---

Thank you for helping keep Bibliotheca and its users safe. 🔒
