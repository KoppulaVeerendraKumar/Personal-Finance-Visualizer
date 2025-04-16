# Personal Finance Visualizer

## Overview
Personal Finance Visualizer is a web application designed to help users track their personal finances efficiently. Built using Next.js, React, shadcn/ui, Recharts, and MongoDB, it provides users with an intuitive interface to manage transactions, categorize expenses, and set monthly budgets.

## Features
- Add, edit, and delete transactions (amount, date, description)
- View a list of transactions
- Monthly expenses bar chart
- Predefined categories for transactions
- Category-wise pie chart
- Dashboard with summary cards displaying total expenses, category breakdown, and recent transactions
- Set monthly category budgets and compare them with actual spending

## Tech Stack Used
- **Frontend**: Next.js, React, shadcn/ui, Recharts
- **Backend**: MongoDB
- **Deployment**: Vercel (Frontend), MongoDB Atlas (Database)

## Installation
### Prerequisites
- Node.js (>= 16)
- MongoDB Atlas account or local MongoDB instance

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/personal-finance-visualizer.git
   cd personal-finance-visualizer
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add the following environment variables:
     ```env
     MONGODB_URI=your_mongodb_connection_string
     NEXT_PUBLIC_API_URL=http://localhost:3000
     ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the application in your browser:
   ```
   http://localhost:3000
   ```


## Usage
- Manage transactions easily with an intuitive interface.
- Categorize expenses and analyze spending with charts.
- Set budgets and track expenses against them.


## Future Improvements
- Authentication system (User login and profiles)
- Export financial data (CSV, PDF)
- AI-based spending insights

## License
This project is open-source under the MIT License.

---

Made with ❤️ by Mohd Qais Ansari

