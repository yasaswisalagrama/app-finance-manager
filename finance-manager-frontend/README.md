# Personal Finance Manager - Front End

## Overview
This is the front-end of the Personal Finance Manager application built with Angular and Angular Material. It features:
- A fixed header with a logout button on the right.
- A togglable side navigation that auto-collapses on selection.
- Modules for Analytics, Dashboard, Transactions, and Authentication.
- A modern, responsive design with a loader during navigation.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Angular CLI

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>

2.  Navigate to the project directory:
    ```bash
    cd <project-directory>
3.  Install dependencies:
    ```bash
    npm install

4.  Run the Application:
    ```bash
    ng serve
    Then open your browser at http://localhost:4200.

### Project Structure
1.  src
├── index.html
├── main.ts
├── styles.scss
└── app
    ├── analytics
    │   ├── analytics-routing.module.ts
    │   ├── analytics.module.ts
    │   └── analytics
    │       ├── analytics.component.html
    │       ├── analytics.component.scss
    │       ├── analytics.component.spec.ts
    │       └── analytics.component.ts
    ├── auth
    │   ├── auth-routing.module.ts
    │   ├── auth.module.ts
    │   ├── login
    │   │   ├── login.component.html
    │   │   ├── login.component.scss
    │   │   ├── login.component.spec.ts
    │   │   └── login.component.ts
    │   ├── logout
    │   │   ├── logout.component.html
    │   │   ├── logout.component.scss
    │   │   └── logout.component.ts
    │   └── profile
    │       ├── profile.component.html
    │       ├── profile.component.scss
    │       ├── profile.component.spec.ts
    │       └── profile.component.ts
    ├── core
    │   ├── core.module.ts
    │   ├── guards
    │   │   ├── auth.guard.spec.ts
    │   │   └── auth.guard.ts
    │   ├── interceptors
    │   │   ├── auth.interceptor.spec.ts
    │   │   └── auth.interceptor.ts
    │   └── services
    │       ├── auth.service.spec.ts
    │       └── auth.service.ts
    ├── dashboard
    │   ├── dashboard-routing.module.ts
    │   ├── dashboard.module.ts
    │   └── dashboard
    │       ├── dashboard.component.html
    │       ├── dashboard.component.scss
    │       ├── dashboard.component.spec.ts
    │       └── dashboard.component.ts
    ├── shared
    │   └── components
    │       └── header
    │           ├── header.component.html
    │           ├── header.component.scss
    │           └── header.component.ts
    └── transactions
        ├── transactions-routing.module.ts
        ├── transactions.module.ts
        ├── services
        │   ├── transaction.service.spec.ts
        │   └── transaction.service.ts
        ├── transaction-dialog
        │   ├── transaction-dialog.component.html
        │   ├── transaction-dialog.component.scss
        │   ├── transaction-dialog.component.spec.ts
        │   └── transaction-dialog.component.ts
        └── transaction-list
            ├── transaction-list.component.html
            ├── transaction-list.component.scss
            ├── transaction-list.component.spec.ts
            └── transaction-list.component.ts


