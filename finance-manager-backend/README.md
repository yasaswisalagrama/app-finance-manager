# Personal Finance Manager (MVP)

## Folder Structure

The project follows a modular structure for easy management and scalability. Here's an updated overview:

```
finance-manager-backend/
│── app/
│   ├── main.py               # Entry point for FastAPI
│   ├── database.py           # Database connection
│   ├── models.py             # SQLAlchemy models
│   ├── schemas.py            # Pydantic schemas
│   ├── crud.py               # Database operations
│   ├── config.py             # Configuration settings (e.g., environment variables)
│   ├── dependencies.py       # Common dependencies like authentication
│   ├── router.py             # Centralized router for all routes
│   ├── security.py           # Security utilities (e.g., password hashing, JWT handling)
│   ├── routes/
│   │   ├── auth.py           # Authentication routes
│   │   ├── transactions.py   # Expense/Income routes
│   │   ├── users.py          # User profile and management routes
│── .env                      # Environment variables
│── requirements.txt          # Python dependencies
│── README.md                 # Project documentation
```

### **Explanation**:
- **app/**: Contains the core application code (FastAPI app, PostgreSQL interaction, route handling, etc.)
- **main.py**: The entry point for FastAPI where the app is initialized.
- **database.py**: Connects the app to PostgreSQL and handles database interactions.
- **models.py**: Defines the structure of the data (e.g., User, Transaction) as SQLAlchemy models.
- **schemas.py**: Defines Pydantic models to validate data going into and out of the API.
- **crud.py**: Contains the database interaction logic (e.g., creating a user, adding a transaction).
- **config.py**: Manages settings like database URLs and secret keys.
- **dependencies.py**: Common dependencies such as authentication (`get_current_user`).
- **router.py**: Centralized FastAPI router that includes all route modules.
- **security.py**: Handles security-related functionalities like password hashing and JWT token management.
- **routes/**: Contains the routes for the API:
  - **auth.py**: Handles user authentication (Login, Register, Token Generation).
  - **transactions.py**: Handles transaction-related operations (Add/View transactions).
  - **users.py**: Handles user profile retrieval and management.
- **.env**: Stores environment variables (e.g., database URL, secret keys).
- **requirements.txt**: Lists all Python dependencies.
- **README.md**: Provides an overview of the project and its structure.

## **Recent Changes and Updates**:
✅ **Database switched to PostgreSQL** from MongoDB.
✅ **Authentication implemented** using JWT tokens and OAuth2PasswordBearer.
✅ **Centralized router** (`router.py`) now manages all route modules.
✅ **Security improvements**: Password hashing and JWT authentication implemented in `security.py`.
✅ **User management added** in `users.py`.
✅ **Dependencies extracted** into `dependencies.py` for cleaner code.

## Future Enhancements
- **Phone Number Authentication**: Implement login and registration using phone numbers.
- **Recurring Transactions**: Ability to add recurring income or expenses automatically.
- **Data Visualization**: Implementing graphs and charts for spending summaries.
- **Third-party API Integration**: Integrating external financial data from services like banks or stock market APIs.
- **Budgeting Features**: Allow users to set monthly budgets and get alerts when approaching limits.

---
This updated structure ensures a clean, scalable, and maintainable backend for the Personal Finance Manager application. 🚀

