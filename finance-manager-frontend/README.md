# Personal Finance Manager - Front End

## Overview
This project is the front-end portion of the Personal Finance Manager application. Built with Angular and Angular Material, it delivers a responsive and modular user interface to manage your personal finances. The application features a fixed header with logout functionality, a togglable side navigation, and various modules such as Analytics, Dashboard, Transactions, and Authentication.

## Prerequisites
- [Node.js](https://nodejs.org/en/) (v14 or higher recommended)
- [Angular CLI](https://angular.io/cli)

## Installation
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
Navigate to the project directory:
bash
Copy
Edit
cd <project-directory>
Install dependencies:
bash
Copy
Edit
npm install
Running the Application
To serve the application locally, run:

bash
Copy
Edit
ng serve
Then, open your browser and navigate to http://localhost:4200.

Project Folder Structure
pgsql
Copy
Edit
src
│   index.html
│   main.ts
│   styles.scss
│
├── app
│   │   app.component.html
│   │   app.component.scss
│   │   app.component.spec.ts
│   │   app.component.ts
│   │   app.config.ts
│   │   app.module.ts
│   │   app.routes.ts
│   │
│   ├── analytics
│   │       analytics-routing.module.ts
│   │       analytics.module.ts
│   │   └── analytics
│   │           analytics.component.html
│   │           analytics.component.scss
│   │           analytics.component.spec.ts
│   │           analytics.component.ts
│   │
│   ├── auth
│   │       auth-routing.module.ts
│   │       auth.module.ts
│   │   ├── login
│   │   │       login.component.html
│   │   │       login.component.scss
│   │   │       login.component.spec.ts
│   │   │       login.component.ts
│   │   ├── logout
│   │   │       logout.component.html
│   │   │       logout.component.scss
│   │   │       logout.component.ts
│   │   └── profile
│   │           profile.component.html
│   │           profile.component.scss
│   │           profile.component.spec.ts
│   │           profile.component.ts
│   │
│   ├── core
│   │       core.module.ts
│   │   ├── guards
│   │   │       auth.guard.spec.ts
│   │   │       auth.guard.ts
│   │   ├── interceptors
│   │   │       auth.interceptor.spec.ts
│   │   │       auth.interceptor.ts
│   │   └── services
│   │           auth.service.spec.ts
│   │           auth.service.ts
│   │
│   ├── dashboard
│   │       dashboard-routing.module.ts
│   │       dashboard.module.ts
│   │   └── dashboard
│   │           dashboard.component.html
│   │           dashboard.component.scss
│   │           dashboard.component.spec.ts
│   │           dashboard.component.ts
│   │
│   ├── shared
│   │   └── components
│   │       └── header
│   │               header.component.html
│   │               header.component.scss
│   │               header.component.ts
│   │
│   └── transactions
│           transactions-routing.module.ts
│           transactions.module.ts
│       ├── services
│       │       transaction.service.spec.ts
│       │       transaction.service.ts
│       ├── transaction-dialog
│       │       transaction-dialog.component.html
│       │       transaction-dialog.component.scss
│       │       transaction-dialog.component.spec.ts
│       │       transaction-dialog.component.ts
│       └── transaction-list
│               transaction-list.component.html
│               transaction-list.component.scss
│               transaction-list.component.spec.ts
│               transaction-list.component.ts
│
└── environments
        environment.ts
Project Status
Completed
UI Framework & Layout:
Responsive Angular front end using Angular Material.
Fixed header with logout button positioned on the right.
Togglable side navigation (sidenav) integrated with auto-collapse on selection.
Modules & Features:
Authentication module (Login, Logout, Profile).
Analytics module featuring interactive charts using ngx-charts.
Dashboard and Transactions modules with modular lazy-loaded routing.
Design:
Modern look with Azure Blue prebuilt theme.
Loader indicator during navigation.
Basic form validations and error handling.
Pending / To-Do
Backend Integration:
Connect authentication and data services to backend APIs.
UI/UX Enhancements:
Improve form validations and user feedback.
Enhance styling and theming based on user feedback.
Testing:
Increase unit tests and end-to-end test coverage.
Accessibility:
Enhance keyboard navigation and screen reader support.
Future MVP Scope
Additional Features:
Phone number-based login and multi-factor authentication.
Enhanced financial analytics, including more detailed reporting and interactive dashboards.
Integration with external banking APIs for automatic transaction imports.
User Experience:
Personalized dashboards with customizable widgets.
Advanced state management (e.g., NgRx) for optimized performance.
Deployment & Scalability:
Setup continuous integration and deployment pipelines.
Optimize application performance for production use.

