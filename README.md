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
2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```
4. **Configure environment variables** (`.env` file)
   ```ini
   DATABASE_USER=postgres
   DATABASE_PASSWORD=userpassword
   POSTGRES_DB=finance_manager
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   SECRET_KEY=userkey
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```
5. **Generate a secure SECRET_KEY**
   ```bash
   openssl rand -hex 32
   ```
   Replace `userkey` in the `.env` file with the generated key.

6. **Start the FastAPI server**
   ```bash
   uvicorn main:app --reload
   ```
7. **API Documentation** (Swagger UI available at)
   ```
   http://127.0.0.1:8000/docs
   ```

---

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

