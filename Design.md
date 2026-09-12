# Design Prompt: DailyMate — Your Personal Finance Buddy

## Product Overview

Design a modern, intuitive, and visually appealing **mobile personal finance management application** called **DailyMate**.

DailyMate is an all-in-one finance buddy that helps users track daily expenses, manage accounts, monitor income and spending, create budgets and goals, handle debts and lending, schedule recurring payments, and maintain warranty records.

The app should feel like a **calm, trustworthy, everyday financial companion**, not a complex accounting or banking application. The experience must be simple enough for a first-time user while being powerful enough for users who want a complete history of their finances.

The core design principle is:

> **“Understand your money today. Plan it for tomorrow.”**

---

## Design Goals

Create a UI that is:

* **Simple and easy to understand**
* **Professional and trustworthy**
* **Appealing for daily use**
* **Clean, modern, and uncluttered**
* **Fast to navigate**
* **Consistent across all modules**
* **Visually informative without overwhelming the user**
* **Designed for mobile-first interaction**
* **Built around interconnected financial data**

Avoid making the app look like a complicated enterprise accounting system. Every feature should feel like part of one unified personal finance ecosystem.

---

# 1. Visual Design System

## Overall Aesthetic

Use a **minimal, modern fintech-inspired design** with a warm, approachable personality.

The interface should combine:

* Clean cards
* Generous spacing
* Rounded corners
* Subtle borders
* Soft shadows used sparingly
* Clear typography hierarchy
* Simple line icons
* Lightweight charts
* Easy-to-read financial figures
* Strong visual distinction between income, expenses, savings, and liabilities

### Recommended Color Palette

Use a professional, calm, and accessible palette:

* **Primary:** Deep Navy / Slate Blue — trust, stability, professionalism
* **Secondary:** Soft Teal or Muted Green — positive financial activity and savings
* **Background:** Very Light Cool Gray or Warm Off-White
* **Surface:** White
* **Primary Text:** Dark Charcoal / Navy
* **Secondary Text:** Muted Gray
* **Income:** Muted Green
* **Expense:** Soft Coral / Muted Red
* **Warning:** Amber
* **Debt / Liability:** Muted Orange or Terracotta
* **Goals / Savings:** Blue or Teal

Do not use overly saturated colors, neon gradients, excessive glassmorphism, or flashy effects.

The app should remain comfortable to view every day and support both **light mode and dark mode**, while prioritizing light mode for the initial design.

### Typography

Use a highly readable modern font such as:

* Inter
* SF Pro
* Manrope
* Plus Jakarta Sans

Use clear typography for:

* Balance amounts
* Expense totals
* Section headings
* Transaction descriptions
* Dates
* Labels
* Supporting information

Financial numbers should be visually prominent but not oversized.

---

# 2. Application Navigation

Use a **mobile-first navigation structure** that makes the most frequently used actions immediately accessible.

## Recommended Bottom Navigation

Create a bottom navigation bar with five primary destinations:

1. **Home**
2. **Transactions**
3. **Budgets**
4. **Goals**
5. **More**

Include a prominent **floating or central “+ Add” action** for quickly recording:

* Expense
* Income
* Transfer
* Debt
* Lending / Borrowing
* Other financial activity

The navigation should make it possible to reach every major feature within a few taps.

### More / Management Hub

The More section should contain clearly grouped modules:

**Money Management**

* Accounts
* Categories / Labels
* Budgets
* Goals

**Planning**

* Scheduled Payments
* Recurring Payments
* Reminders

**People & Liabilities**

* Borrowers & Payees
* Debts

**Assets & Records**

* Warranties

**Insights & Settings**

* Reports
* Export Data
* App Settings
* Backup / Sync
* Security

---

# 3. Core Screen: Home Dashboard

Design the Home screen as the user's **daily financial command center**.

The dashboard should provide a quick understanding of:

* How much money the user has
* What they spent recently
* What income they received
* Upcoming financial obligations
* Budget status
* Goal progress
* Outstanding lending / debt
* Important reminders

## Home Screen Layout

### Header

* Greeting: “Good morning, [Name]”
* Small date indicator
* Profile / settings icon
* Optional notification/reminder icon

### Main Financial Summary Card

Display:

* **Total Balance**
* **Total Income**
* **Total Expenses**
* **Net Cash Flow**

Allow the user to switch between:

* All Accounts
* Cash
* Bank Accounts
* Wallets
* Credit Accounts

Include a small period selector:

* This Month
* Last Month
* This Year
* Custom

### Quick Actions

Provide easily recognizable quick-action buttons:

* **Add Expense**
* **Add Income**
* **Transfer**
* **Add Reminder**

The Add Expense action should be the most prominent because it is likely the most frequently used action.

### Spending Overview

Show a simple chart, such as:

* Weekly spending bar chart
* Monthly income vs. expense comparison
* Spending trend line

Keep charts simple and readable. Avoid dense dashboards.

### Budget Snapshot

Show:

* Total budget used
* Remaining budget
* Top spending category
* Categories approaching their limits

Example:

> Monthly Budget
> ₹18,450 spent of ₹30,000
> ₹11,550 remaining

Include a “View Budgets” action.

### Upcoming Payments

Show the next few scheduled or recurring payments:

* Electricity Bill
* Rent
* Subscription
* Insurance
* Loan EMI

Each item should show:

* Payment name
* Due date
* Amount
* Account used for payment
* Status

### Goals Snapshot

Show 1–3 active goals with progress indicators.

Example:

> Emergency Fund
> ₹35,000 of ₹1,00,000
> 35% completed

### Recent Transactions

Display a clean list of recent transactions with:

* Category icon
* Transaction title
* Date / time
* Account
* Amount
* Income / expense styling

Include “View All Transactions.”

### Outstanding Money

Show a compact summary of:

* Money to receive
* Money to pay
* Outstanding debts
* Overdue items

This section should link directly to Borrowers, Payees, and Debts.

---

# 4. Track Expenses

Design a dedicated **Expense Tracking** experience that makes recording expenses extremely fast.

## Add Expense Screen

Include:

* Amount input with currency
* Expense category
* Transaction label
* Account / payment source
* Date and time
* Notes
* Attach receipt / image
* Location (optional)
* Person involved (optional)
* Mark as recurring (optional)
* Link to budget category (automatic where applicable)

### Smart Interaction

When a user selects a category, automatically suggest:

* Relevant budget
* Common transaction labels
* Recently used account
* Recent merchants / descriptions

The form should minimize unnecessary fields while allowing advanced details through an expandable section.

## Expense History Screen

Provide:

* Search
* Date range filter
* Category filter
* Account filter
* Label filter
* Amount range
* Recurring / one-time filter

Show:

* Daily grouped transactions
* Daily totals
* Monthly total
* Category summaries

Allow users to tap any transaction to open its complete detail page.

---

# 5. Manage Accounts

Design an **Accounts Overview** screen that represents the user's complete financial structure.

## Account Types

Support:

* Bank Accounts
* Cash
* Digital Wallets
* Credit Cards
* Savings Accounts
* Investment Accounts (optional future-ready support)
* Other Accounts

## Accounts Screen

Show account cards with:

* Account name
* Account type
* Current balance
* Last updated
* Account color / icon
* Optional account number masking

Example:

* HDFC Savings — ₹85,400
* Cash Wallet — ₹4,200
* Credit Card — -₹12,500
* Paytm Wallet — ₹1,250

### Account Detail Screen

Show:

* Current balance
* Income associated with account
* Expenses associated with account
* Transfers
* Account transaction history
* Monthly activity chart
* Reconciliation / adjustment option
* Edit account
* Archive account

### Account Interlinking

Every transaction must be linked to an account.

From an account detail page, users should be able to:

* View all account transactions
* Add an expense using that account
* Add income
* Transfer money to another account
* See budgets affected by account activity

---

# 6. Manage Income, Expenses, and Transactions

Create a unified **Transactions** module.

## Transaction Types

Clearly distinguish:

* Expense
* Income
* Transfer
* Refund
* Debt Received
* Debt Payment
* Lending
* Borrowing
* Adjustment

## Transactions Screen

Include:

* All Transactions
* Expenses
* Income
* Transfers
* Pending / Scheduled

Each transaction should show:

* Type icon
* Description
* Category
* Label
* Account
* Date
* Amount
* Related person, if applicable

### Transaction Detail Screen

Show a complete financial record:

* Amount
* Transaction type
* Category
* Label
* Account
* Date and time
* Notes
* Attachments
* Linked budget
* Linked goal, if applicable
* Linked borrower / payee, if applicable
* Recurrence details
* Edit / Delete / Duplicate actions

The transaction detail page should act as a **central linking point** to related financial entities.

---

# 7. Manage Transaction Labels

Design a **Labels Management** screen that helps users organize transactions beyond basic categories.

Examples:

* Office
* Family
* Travel
* Personal
* Business
* Medical
* Festival
* Reimbursement
* Tax Deductible
* Subscription

## Labels Screen

Show:

* Label name
* Color / icon
* Number of transactions
* Total amount associated
* Last used date

Actions:

* Create label
* Edit label
* Delete / archive label
* View all linked transactions

### Label Detail Screen

Display:

* Total spending under the label
* Income associated with the label
* Spending trend
* All linked transactions
* Date and account filters

Labels should work across expenses and income, not just expenses.

---

# 8. Manage Budgets

Design a **Budgets** module that makes budgeting understandable and actionable.

## Budget Overview Screen

Show:

* Monthly budget summary
* Total allocated
* Total spent
* Remaining amount
* Percentage used
* Over-budget categories
* Upcoming budget periods

Use progress bars and simple visual indicators.

### Budget Cards

Each budget card should show:

* Budget name
* Period
* Allocated amount
* Spent amount
* Remaining amount
* Progress bar
* Status

Example:

> Food & Dining
> ₹8,000 budget
> ₹5,600 spent
> ₹2,400 remaining

### Create Budget Screen

Fields:

* Budget name
* Category or label
* Amount
* Period
* Start date
* End date
* Recurrence
* Account scope (optional)
* Alert threshold
* Notes

### Budget Detail Screen

Show:

* Budget progress
* Spending trend
* Linked transactions
* Daily / weekly / monthly breakdown
* Remaining amount
* Budget alerts
* Edit budget

### Interlinking

When an expense is recorded:

* It should automatically contribute to the relevant budget.
* The budget progress should update immediately.
* The transaction should show its linked budget.
* Users should be able to navigate from a budget to all contributing transactions.

---

# 9. Manage Goals

Design a **Goals** module for financial targets and savings plans.

## Goal Types

Examples:

* Emergency Fund
* Vacation
* New Car
* Home Purchase
* Education
* Festival Shopping
* Debt Repayment
* Custom Goal

## Goals Overview Screen

Show goal cards with:

* Goal name
* Target amount
* Current saved amount
* Progress percentage
* Target date
* Amount remaining
* Monthly contribution suggestion

### Create Goal Screen

Fields:

* Goal name
* Goal type
* Target amount
* Current amount
* Target date
* Linked account
* Recurring contribution
* Priority
* Notes

### Goal Detail Screen

Show:

* Large progress visualization
* Current amount
* Target amount
* Remaining amount
* Target date
* Contribution history
* Linked account
* Upcoming contributions
* Related transactions
* Edit goal

### Interlinking

Goals should connect to:

* Accounts
* Income
* Transfers
* Budgets
* Scheduled payments

For example, users should be able to move money from an account toward a goal and see that contribution reflected in both the account history and goal progress.

---

# 10. Future and Recurring Payments

Design a **Scheduled Payments & Reminders** module.

This should handle both one-time future payments and recurring financial obligations.

## Payment Types

* Rent
* Utility Bills
* Subscriptions
* Insurance
* Loan EMI
* School Fees
* Salaries
* Memberships
* Custom Payments

## Upcoming Payments Screen

Show:

* Calendar / timeline view
* Upcoming payment cards
* Due date
* Amount
* Payee
* Linked account
* Recurrence
* Reminder status
* Payment status

Use clear status labels:

* Upcoming
* Due Today
* Due Soon
* Overdue
* Paid
* Skipped

### Create Scheduled Payment Screen

Fields:

* Payment title
* Amount
* Payee
* Category
* Label
* Account
* First payment date
* Recurrence: One-time / Weekly / Monthly / Yearly / Custom
* Reminder timing
* End date / number of occurrences
* Notes
* Attachment

### Payment Detail Screen

Show:

* Payment history
* Next due date
* Previous payments
* Linked transactions
* Linked account
* Reminder settings
* Skip / mark as paid
* Edit recurrence

### Interlinking

When a scheduled payment is marked as paid:

* It should optionally create a transaction.
* The transaction should link back to the scheduled payment.
* The account balance should update.
* The relevant budget should update.
* The payment history should record the completion.

---

# 11. Manage Borrowers and Payees

Design a **People & Money Owed** module to track money exchanged with individuals or organizations.

Use clear terminology:

* **Borrowers:** People who owe money to the user.
* **Payees / Lenders:** People or entities to whom the user owes money or makes payments.

The UI should avoid confusion between a person receiving a normal payment and someone involved in a debt.

## People Overview Screen

Show:

* Person / organization name
* Type: Borrower, Payee, Lender, or Mixed
* Amount to receive
* Amount to pay
* Last transaction
* Status

### Person Detail Screen

Show:

* Contact name
* Total amount to receive
* Total amount to pay
* Net outstanding amount
* Transaction history
* Lending / borrowing records
* Payment reminders
* Notes
* Contact details (optional)

### Add Lending / Borrowing Screen

Fields:

* Person
* Amount
* Type: Lent / Borrowed
* Date
* Due date
* Interest (optional)
* Account involved
* Notes
* Attachment
* Reminder

### Interlinking

A lending or borrowing record should connect to:

* The person
* The account
* The transaction
* The debt record, if applicable
* Payment reminders

---

# 12. Manage Debts

Design a dedicated **Debt Management** module for structured liabilities and repayment tracking.

## Debt Types

* Personal Loan
* Credit Card Debt
* Home Loan
* Vehicle Loan
* Education Loan
* Business Loan
* Informal Debt
* Other

## Debt Overview Screen

Show:

* Total outstanding debt
* Total monthly repayment
* Upcoming payment
* Interest summary
* Debt-free progress
* Individual debt cards

### Debt Card

Display:

* Debt name
* Outstanding balance
* Original amount
* Monthly payment
* Interest rate (if applicable)
* Next due date
* Progress toward repayment

### Debt Detail Screen

Show:

* Outstanding amount
* Original principal
* Interest rate
* Repayment schedule
* Total paid
* Principal paid
* Interest paid
* Payment history
* Next payment
* Linked account
* Linked reminders
* Notes

### Add Debt Screen

Fields:

* Debt name
* Creditor
* Debt type
* Original amount
* Current outstanding amount
* Interest rate
* Start date
* Due date
* Repayment frequency
* Installment amount
* Linked account
* Reminder settings

### Interlinking

Debt payments should:

* Create or link to transactions
* Update the outstanding balance
* Update the linked account
* Appear in upcoming payments
* Contribute to debt-related goals, if configured
* Be visible in the complete financial history

---

# 13. Manage Warranties

Design a **Warranty Vault** module that helps users store and track product warranties.

This feature should feel integrated into the finance application because warranties are connected to purchases, receipts, and household asset management.

## Warranty Overview Screen

Show:

* Product name
* Brand
* Purchase date
* Warranty expiry date
* Days remaining
* Warranty status
* Linked receipt
* Product category

Use status indicators:

* Active
* Expiring Soon
* Expired
* Claim in Progress

### Add Warranty Screen

Fields:

* Product name
* Brand
* Model number
* Serial number
* Purchase date
* Purchase price
* Warranty duration
* Warranty expiry date
* Seller / store
* Receipt attachment
* Invoice number
* Notes
* Reminder before expiry

### Warranty Detail Screen

Show:

* Product information
* Purchase amount
* Purchase date
* Warranty period
* Expiry date
* Days remaining
* Receipt / invoice
* Seller details
* Service center information
* Claim history
* Edit / archive warranty

### Interlinking

A warranty should be linkable to:

* The original expense transaction
* The account used for purchase
* The receipt attachment
* The merchant / payee
* A reminder before expiry

Example flow:

> Expense: ₹45,000 Laptop Purchase
> → Linked Warranty
> → Receipt
> → Warranty Expiry Reminder

---

# 14. Complete Interlinking & Unified Data Experience

This is a critical requirement.

The application must not feel like separate modules operating independently. All financial entities should be connected through a consistent data model and navigation experience.

## Required Relationships

### Transaction ↔ Account

Every transaction belongs to an account.

### Transaction ↔ Category / Label

Transactions can have a category and one or more labels.

### Transaction ↔ Budget

Expenses can contribute to a budget.

### Transaction ↔ Goal

Savings contributions or transfers can contribute to goals.

### Transaction ↔ Scheduled Payment

A payment transaction can be generated from or linked to a scheduled payment.

### Transaction ↔ Person

Transactions can be associated with a borrower, payee, lender, or other person.

### Transaction ↔ Debt

Debt repayments should be linked to debt records.

### Transaction ↔ Warranty

A purchase transaction can have a linked warranty record.

### Account ↔ Budget

Users can optionally scope budgets to specific accounts.

### Account ↔ Goal

Goals can be linked to savings accounts or contribution accounts.

### Person ↔ Debt

A debt can be associated with a creditor or borrower.

### Warranty ↔ Reminder

Warranty expiry can generate reminders.

---

## Example Interlinked User Journeys

### Journey 1: Record a Purchase

User adds an expense:

> ₹60,000 — Laptop — Electronics — HDFC Bank

The app should allow the user to:

1. Record the expense.
2. Select or create a category.
3. Link the transaction to a budget.
4. Attach the receipt.
5. Add a warranty.
6. Set a warranty expiry reminder.
7. View the transaction under the account history.
8. See the expense reflected in the budget and dashboard.

### Journey 2: Pay Monthly EMI

1. User creates a debt.
2. User sets a monthly repayment schedule.
3. The payment appears in Upcoming Payments.
4. User receives a reminder.
5. User marks the payment as paid.
6. A transaction is created or linked.
7. Account balance updates.
8. Debt outstanding balance decreases.
9. Payment history is updated.

### Journey 3: Save Toward a Goal

1. User creates a Vacation Goal.
2. User links it to a savings account.
3. User sets a monthly contribution.
4. A scheduled contribution is created.
5. The contribution appears in the account history.
6. Goal progress updates.
7. Dashboard shows updated goal progress.

### Journey 4: Lend Money to a Friend

1. User records ₹5,000 lent to a friend.
2. The amount is deducted from the selected account.
3. A borrower record is created or updated.
4. A due date and reminder are added.
5. The amount appears under Money to Receive.
6. When repaid, the repayment is recorded as income or settlement.
7. The borrower balance is updated.

---

# 15. Search, Filters, and Global Access

Include a **global search** accessible from the main interface.

Users should be able to search for:

* Transactions
* Accounts
* Categories
* Labels
* Budgets
* Goals
* Scheduled payments
* People
* Debts
* Warranties

Examples:

* “Laptop”
* “HDFC”
* “₹5,000”
* “Rahul”
* “Insurance”
* “Expiring warranties”
* “Food expenses”

Search results should show the entity type and allow users to navigate directly to the relevant detail screen.

---

# 16. Reports and Financial Insights

Include a lightweight **Reports / Insights** section.

Provide:

* Income vs. expenses
* Spending by category
* Spending by account
* Spending by label
* Monthly cash flow
* Budget performance
* Net worth overview (optional)
* Debt repayment progress
* Goal contribution history
* Recurring payment summary

Use clear charts and summaries rather than overly technical financial analytics.

Example insights:

> “Your dining expenses are 18% higher than last month.”

> “You have ₹11,550 remaining in your monthly budget.”

> “Three recurring payments are due this week.”

Insights should be informative, non-judgmental, and easy to understand.

---

# 17. Notifications and Reminders

Design a unified **Notifications / Reminders Center**.

Support reminders for:

* Upcoming payments
* Overdue payments
* Budget thresholds
* Goal contributions
* Debt installments
* Money to receive
* Money to pay
* Warranty expiry
* Custom reminders

Each reminder should link directly to the relevant entity.

Example:

> “Your laptop warranty expires in 15 days.”
> → Open Warranty Detail

> “Your electricity bill of ₹2,400 is due tomorrow.”
> → Open Scheduled Payment

---

# 18. Required UI Screens to Generate

Generate a complete, consistent mobile UI design system and screen set containing at least:

1. Splash / Welcome Screen
2. Onboarding Screens
3. Sign In / Create Account
4. Home Dashboard
5. Add Expense
6. Add Income
7. Add Transfer
8. Transactions List
9. Transaction Detail
10. Accounts Overview
11. Account Detail
12. Add / Edit Account
13. Categories / Labels List
14. Label Detail
15. Budgets Overview
16. Create Budget
17. Budget Detail
18. Goals Overview
19. Create Goal
20. Goal Detail
21. Scheduled Payments Overview
22. Create Scheduled Payment
23. Payment Detail
24. People / Borrowers / Payees Overview
25. Person Detail
26. Add Lending / Borrowing
27. Debts Overview
28. Create Debt
29. Debt Detail
30. Warranties Overview
31. Add Warranty
32. Warranty Detail
33. Notifications / Reminders
34. Reports / Insights
35. Global Search
36. Settings / Profile
37. Empty States
38. Error / Validation States
39. Confirmation Dialogs
40. Delete / Archive Dialogs

---

# 19. UX Requirements

Ensure the design includes:

* Clear primary and secondary actions
* Consistent back navigation
* Persistent bottom navigation where appropriate
* Easy access to Add Expense
* Smart defaults
* Minimal data entry
* Clear confirmation after saving
* Undo where appropriate
* Empty states with useful guidance
* Form validation
* Currency formatting
* Date and time pickers
* Recurrence selectors
* Account selectors
* Category and label selectors
* Searchable dropdowns
* Swipe actions where appropriate
* Pull-to-refresh patterns
* Accessible touch targets
* Readable contrast
* Clear error messages
* Confirmation before destructive actions

---

# 20. Design Deliverables

Generate the following:

### A. High-Fidelity Mobile Screens

Create polished, production-quality mobile screens for the key flows.

### B. Design System

Include:

* Color palette
* Typography
* Buttons
* Cards
* Input fields
* Tabs
* Bottom navigation
* Chips
* Tags
* Progress bars
* Charts
* Icons
* Modals
* Toasts
* Empty states

### C. Navigation Map

Show how all screens connect.

### D. User Flow Diagrams

Demonstrate:

* Add expense → Account → Budget → Transaction History
* Add purchase → Warranty → Reminder
* Create debt → Scheduled Payment → Transaction → Debt Balance
* Create goal → Contribution → Account → Goal Progress
* Lend money → Borrower → Reminder → Repayment

### E. Responsive Design

Prioritize mobile screen sizes such as:

* iPhone 15 / 16
* Android 360–430 px width

The UI should be designed for real-world mobile usage, not desktop dashboards compressed into a phone.

---

# 21. Final Design Direction

The final product should feel like:

* A **personal finance companion**
* A **daily money dashboard**
* A **simple expense tracker**
* A **budget planner**
* A **payment reminder**
* A **debt and lending manager**
* A **personal financial record keeper**
* A **warranty vault**

All combined into one coherent application.

### Important Final Instruction

Do not design each feature as an isolated application.

Create a **single unified product experience** where every transaction, account, budget, goal, payment, person, debt, and warranty can be connected and navigated between naturally.

Prioritize:

> **Clarity → Speed → Trust → Interconnection → Visual Appeal**

The interface should be simple enough for daily use, yet comprehensive enough to become the user's central place for managing personal finances.
