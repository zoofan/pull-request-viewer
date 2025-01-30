# GitHub Pull Request Viewer

A React application that fetches up to 500 pull requests from a specified **public** GitHub repository, applies client-side filtering (status, date range, “at risk,” etc.), and displays them in a paginated table (20 per page).

## Table of Contents

1. [Overview](#overview)  
2. [Features](#features)  
3. [Requirements](#requirements)  
4. [Getting Started](#getting-started)  
5. [Project Structure](#project-structure)  
6. [Design and Assumptions](#design-and-assumptions)  
   - [Key Assumptions](#key-assumptions)  
   - [Design Decisions](#design-decisions)  
   - [Framework/Libraries Chosen](#frameworklibraries-chosen)  
7. [Running the App](#running-the-app)

---

## Overview

[Try it out here!](https://pull-request-viewer-3yfh.vercel.app/)

Defaults to the facebook/react repo. When entering a new repo to try, please enter the full repo name, ie 'freeCodeCamp/freeCodeCamp'

This project is a **single-page React application** that leverages the **GitHub REST API** to retrieve pull requests from any specified public GitHub repository. Users can filter pull requests by status (Open/Closed/All), date ranges, or whether they’re “at risk” (open PRs older than 7 days). The user can also paginate the results in sets of 20 per page if more than 20 are returned.

---

## Features

1. **Fetch Up to 500 Pull Requests**  
   By making multiple calls (each retrieving 100 PRs), the application collects up to 500 PRs from the chosen repository.

2. **Client-Side Filtering**  
   Users can filter by:  
   - **Status** (`All`, `open`, or `closed`).  
   - **Date range** (opened after / opened before).  
   - **“At Risk”** (open PRs older than 7 days).

3. **Paginated Table**  
   - Displays 20 PRs per page.  
   - Users can navigate to next/previous pages.

4. **Responsive UI**  
   - Uses **Tailwind CSS** for styling and layout responsiveness.  
   - Uses **Radix UI** components (e.g., **Select**, **Checkbox**, **Button**, **Table**) to ensure consistency and accessibility.

5. **Live Search of Repository**  
   - The default repository is `facebook/react`, but users can change that field to load pull requests from any public repo.

---

## Requirements

- **Node.js** (v14+ or v16+ recommended)  
- **npm** or **yarn** package manager  

---

## Getting Started

1. **Clone the repository**  
   ```bash
   git clone https://github.com/YourUsername/github-pr-viewer.git
   cd github-pr-viewer
     ```

2. **Install dependencies**

  ```bash
      npm install
      npm run dev
  ```



4.	**Open your browser and go to http://localhost:3000 (or whichever port is displayed in the terminal).**

Project Structure

## Project Structure

```plaintext
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── FilterBar.tsx
│   │   ├── PullRequestTable.tsx
│   │   └── ...
│   ├── utils/
│   │   └── parseLinkHeader.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
└── README.md
```

## Design and Assumptions

### Key Assumptions

1. **Public Repositories Only**  
   Since we do not pass an authentication token, the GitHub API allows up to **60 requests/hour** for unauthenticated requests. Fetching up to 500 PRs for a single repo fits comfortably within that limit.

2. **At-Risk Definition**  
   A pull request is considered *“at risk”* if:
   - It is **still open** (not closed), and  
   - It was created **more than 7 days ago**.

3. **Sufficient Data**  
   We assume each PR returned by the GitHub API includes `created_at`, `closed_at`, `additions`, `deletions`, `user`, etc., which we need to display or filter.

4. **Client-Side Only**  
   All filtering and pagination beyond the initial fetching is performed on the client. This is acceptable for up to 500 items in memory.

### Design Decisions

1. **Multiple Fetch Calls Upfront**  
   - We chose to fetch up to 5 pages of 100 PRs each, so the user can smoothly filter and paginate **client-side** without hitting the API for every filter change.  
   - This approach simplifies the user experience but means fetching data that might not be used. For truly massive repos, you would handle pagination server-side or implement server-side queries.

2. **Client-Side Pagination**  
   - We store the entire list of up to 500 PRs, then show only **20** results per page.  
   - This is fast enough for typical usage and allows complex in-browser filtering.

3. **Tailwind + Radix UI**  
   - **Tailwind** was selected for utility-first styling and rapid responsive design.  
   - **Radix UI** for accessible and customizable components such as `<Select>`, `<Checkbox>`, `<Button>`, `<Table>`, and theming.

4. **TypeScript**  
   - Provides type safety for the GitHub data structures (e.g., `PullRequest`), which helps prevent runtime errors.

5. **“At Risk” Highlighting**  
   - We highlight “at risk” rows in a **soft yellow** background (`bg-yellow-50`). This choice helps bring attention without overwhelming the user interface.

### Framework/Libraries Chosen

1. **React**  
   - A popular, component-based library that allows fast rendering and an active community. Perfect for building SPAs.

2. **Tailwind CSS**  
   - Utility classes for quick, consistent, and responsive styling. Less overhead than large CSS frameworks.

3. **Radix UI**  
   - A set of unstyled, accessible primitives for building consistent UI components (Select, Checkbox, etc.). We also benefit from built-in accessibility.

4. **Date-FNS**  
   - A lightweight library for parsing, formatting, and manipulating dates (e.g., `format(new Date(pr.created_at), "yyyy-MM-dd")`).

5. **TypeScript**  
   - Enforces type checking and helps maintainable code with fewer runtime bugs.