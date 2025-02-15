# Personal Finance Manager

## Overview
A personal finance management application to track income, expenses, and budgets efficiently. The backend is built with FastAPI, while the frontend is developed using Angular.

## MVP Goal
- User authentication (login/logout) with JWT
- Expense tracking with categories
- Income tracking
- Budget management
- API documentation with Swagger UI
- Database setup without migrations (tables are dropped and recreated on changes)

---

## Backend (FastAPI)
### Tech Stack
- **FastAPI** - Backend framework
- **PostgreSQL** - Database
- **SQLAlchemy** - ORM for database interaction
- **Pydantic** - Data validation
- **OAuth2PasswordBearer** - Authentication

### Setup Instructions
1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd finance-manager-backend
   ```

## Frontend (Angular)
### Tech Stack
- **Angular** - Frontend framework
- **RxJS** - Reactive programming
- **Angular Material** - UI Components
- **NgRx (planned)** - State management

### Setup Instructions
1. **Navigate to frontend directory**
   ```bash
   cd finance-manager-frontend
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the Angular server**
   ```bash
   ng serve
   ```
4. **Access the UI**
   ```
   http://localhost:4200
   ```

---

## Future Enhancements
- Implement phone number authentication
- Add dashboard analytics with charts
- Introduce budget alerts & notifications
- Improve security with role-based access control
- Implement NgRx for state management in Angular

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a Pull Request

## License
This project is licensed under the MIT License.

