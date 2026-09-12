# DailyMate

DailyMate is a privacy-focused personal finance mobile application designed to help users manage their complete financial life from one place.

The application acts as a personal finance companion for tracking expenses, managing accounts, planning budgets, setting financial goals, organizing payments, and maintaining financial records.

The primary design principle of DailyMate is:

> **The user's financial data belongs to the user and should remain locally under the user's control.**

---

## 1. Project Overview

DailyMate provides an all-in-one financial management experience with interconnected financial entities.

### Core Features

* Expense and income tracking
* Account management
* Transaction history
* Categories and labels
* Budget management
* Financial goals
* Planned and recurring payments
* Payee management
* Borrowers and lenders
* Debt tracking
* Warranty tracking
* Reminders
* Financial records and history
* Optional cloud backup
* Subscription and account management

---

## 2. Technology Stack

| Layer                        | Technology                           |
| ---------------------------- | ------------------------------------ |
| Mobile Application           | React Native                         |
| Application Language         | TypeScript                           |
| Mobile Package / Bundle Name | `com.buildingdots.dailymate`         |
| Backend Framework            | Nest.js                              |
| Local Database               | WatermelonDB                         |
| Backend Database             | Not required for user financial data |
| Authentication Backend       | Nest.js                              |
| Subscription Verification    | Nest.js                              |
| Cloud Backup                 | iCloud or Google Drive               |
| Architecture                 | Local-first / Privacy-first          |
| Data Ownership               | User-controlled                      |

---

## 3. Application Identity

### Application Name

```text
DailyMate
```

### Bundle Identifier

```text
com.buildingdots.dailymate
```

The bundle identifier must remain consistent across the relevant mobile configuration files, including:

* Android application ID
* iOS bundle identifier
* App configuration
* Build configuration
* Push notification configuration, if introduced
* Subscription configuration, if required by the platform

The bundle identifier must not be changed without a deliberate migration and release decision.

---

## 4. Architectural Principles

DailyMate must follow the following architectural principles:

1. **Local-first**
2. **Privacy-first**
3. **Offline-capable**
4. **Domain-driven modular architecture**
5. **Clear separation of concerns**
6. **Minimal backend responsibility**
7. **User-controlled cloud backup**
8. **Strong data integrity**
9. **Secure authentication**
10. **Explicit user consent for cloud operations**

### Local-First Principle

The application must work without an active internet connection for all finance-related functionality.

Users must be able to:

* Add transactions
* Edit transactions
* Delete or archive supported records
* View financial history
* Manage accounts
* Manage budgets
* Manage goals
* View planned payments
* Access locally stored financial records

without requiring a backend request.

Internet access may be required for:

* Sign-up
* Sign-in
* Authentication
* Subscription verification
* Cloud backup
* Cloud restore
* Cloud account connection
* Subscription-related operations

---

## 5. Backend Responsibilities

The backend will be implemented using **Nest.js**.

The backend is intentionally limited in scope.

### Backend Allowed Responsibilities

The Nest.js backend may handle:

* User registration
* User sign-in
* Authentication
* Session management
* Access-token and refresh-token management
* User account management
* Subscription status verification
* Subscription entitlement management
* Account deletion requests
* Authentication-related security events
* Backend health checks
* Application configuration that does not contain private financial data

### Backend Prohibited Responsibilities

The backend must not act as the primary storage location for user financial information.

The backend must not store or process the user's financial records as part of normal application operation.

The following data must not be sent to or stored on the DailyMate backend unless a future, explicitly approved architecture changes this constraint:

* Transactions
* Account balances
* Account names
* Income records
* Expense records
* Budgets
* Goals
* Payees
* Categories created by the user
* Labels
* Debts
* Borrower information
* Lender information
* Planned payments
* Warranty records
* Financial notes
* Financial attachments
* Complete financial history
* Financial reports containing identifiable user data

### Backend Data-Minimization Rule

The backend should store only the minimum information required for:

* Authentication
* User identity
* Subscription verification
* Security
* Account lifecycle management

Any additional backend data requirement must be reviewed before implementation.

---

## 6. Financial Data Storage

All user financial data must be stored locally on the user's device using **WatermelonDB**.

### Local Storage Requirements

WatermelonDB is the primary data source for:

* Transactions
* Accounts
* Categories
* Labels
* Budgets
* Goals
* Planned payments
* Payees
* Reminders
* Debts
* Borrowers
* Lenders
* Warranties
* Financial metadata
* User-generated financial records

### Financial Data Ownership

The user owns their financial data.

DailyMate must not assume that financial data is available on the backend.

The application must be designed so that:

* Financial features operate against the local database.
* The UI reads financial data from local repositories.
* Business logic does not depend on network availability.
* Backend outages do not prevent access to existing local financial records.
* Authentication failure does not automatically delete local financial data.
* Subscription verification failure does not automatically delete local financial data.

### Local Database Rules

All database access must be abstracted behind repositories or data-access services.

UI components must not directly execute WatermelonDB queries.

Recommended flow:

```text
UI
  ↓
Presentation State / ViewModel
  ↓
Application Use Case
  ↓
Domain Repository Interface
  ↓
WatermelonDB Repository Implementation
  ↓
WatermelonDB
```

---

## 7. Cloud Backup and Restore

DailyMate will optionally allow users to back up and restore their financial data using a supported cloud provider.

Supported cloud providers:

1. iCloud
2. Google Drive

Cloud backup is an optional user-controlled feature and is not the primary source of financial data during normal application usage.

### Cloud Backup Principles

* Cloud backup must require explicit user action or explicit user consent.
* Cloud backup must not occur without informing the user.
* The application must clearly communicate what data is being backed up.
* The application must clearly communicate the backup destination.
* The application must provide backup status and error feedback.
* Backup operations must not silently overwrite local data.
* Restore operations must require confirmation.
* Restore operations must clearly explain whether local data will be replaced, merged, or imported.
* The application must protect backup files from unauthorized access.

### iCloud Backup

iCloud backup should be supported for Apple platforms where the required capabilities and entitlements are available.

The implementation must account for:

* iCloud availability
* User's iCloud account status
* Required iCloud entitlements
* Backup file storage
* Restore operations
* Backup versioning
* Conflict handling
* Insufficient storage
* Interrupted uploads
* User cancellation
* Account changes

### Google Drive Backup

Google Drive backup should be supported through the appropriate Google authentication and Drive APIs.

The implementation must account for:

* Google account authorization
* Drive permission scopes
* Token expiration
* Revoked permissions
* Multiple Google accounts
* Backup file versioning
* Interrupted uploads
* Restore operations
* User cancellation
* Insufficient storage
* Account disconnection

### Backup Encryption

Financial backups should be encrypted before being uploaded to iCloud or Google Drive whenever technically feasible.

The design should prefer client-side encryption so that:

* Encryption occurs on the user's device.
* The cloud provider stores encrypted data.
* The backend does not need access to financial records.
* DailyMate cannot read the contents of an encrypted backup without the required encryption key.

Encryption keys must not be stored in plaintext inside the backup file.

The implementation must carefully define:

* Key generation
* Key storage
* Key recovery
* Device migration
* Password changes
* Backup restoration
* Lost-key behavior

If a recovery mechanism is not available, the application must clearly warn users that losing the encryption key may make the backup unrecoverable.

---

## 8. Authentication

Authentication will be managed by the Nest.js backend.

Authentication is separate from local financial data storage.

### Authentication Responsibilities

The authentication system may support:

* Sign-up
* Sign-in
* Sign-out
* Email verification, if required
* Password reset, if required
* Session validation
* Access-token renewal
* Refresh-token rotation
* Account deletion
* Subscription entitlement lookup

### Authentication Rules

* Authentication tokens must be stored securely.
* Tokens must not be stored in plain local database tables.
* Tokens must not be logged.
* Passwords must never be stored in plaintext.
* Authentication errors must not expose sensitive account information.
* Session expiration must be handled gracefully.
* Sign-out must clear authentication credentials securely.
* Sign-out must not automatically delete local financial data.
* Reinstalling the application must not be assumed to recover local financial data unless a backup exists.

### Local Authentication State

The application may cache limited authentication metadata locally, such as:

* Authentication status
* User identifier
* Subscription status cache
* Last successful verification timestamp

Cached authentication metadata must not be treated as a replacement for server-side validation when online verification is required.

---

## 9. Subscription Verification

Subscription verification will be handled through the Nest.js backend.

The backend is responsible for determining whether the user has an active subscription or entitlement.

### Subscription Rules

* Subscription status must be verified through a trusted source.
* The client must not be the sole authority for subscription entitlement.
* Subscription status may be cached locally for offline usability, subject to defined expiration rules.
* The application must define behavior when subscription verification cannot be completed.
* Subscription expiration must not delete local financial data.
* Subscription cancellation must not delete local financial data.
* Subscription-related restrictions must not corrupt or remove existing user records.
* Subscription checks must not transmit financial records.

### Offline Subscription Behavior

The product team must explicitly define which features remain available when:

* The user is offline.
* The subscription status cannot be refreshed.
* The subscription has expired.
* The user has signed out.
* The backend is temporarily unavailable.

Existing local financial data should remain accessible unless a clearly documented product requirement states otherwise.

---

## 10. WatermelonDB Data Architecture

WatermelonDB will serve as the local persistence layer.

### Recommended Database Structure

```text
src/
├── app/
│   ├── navigation/
│   ├── providers/
│   ├── configuration/
│   └── bootstrap/
│
├── core/
│   ├── database/
│   ├── authentication/
│   ├── security/
│   ├── errors/
│   ├── logging/
│   ├── networking/
│   └── storage/
│
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utilities/
│   ├── constants/
│   └── types/
│
└── features/
    ├── authentication/
    ├── accounts/
    ├── categories/
    ├── labels/
    ├── transactions/
    ├── budgets/
    ├── goals/
    ├── planned-payments/
    ├── payees/
    ├── reminders/
    ├── debts/
    ├── warranties/
    ├── user-preferences/
    └── ai-control/
```

### Feature Module Structure

Each feature should follow a consistent structure:

```text
feature-name/
├── domain/
│   ├── entities/
│   ├── value-objects/
│   ├── repositories/
│   ├── services/
│   └── errors/
│
├── application/
│   ├── use-cases/
│   ├── dto/
│   ├── validators/
│   └── mappers/
│
├── data/
│   ├── models/
│   ├── repositories/
│   ├── datasources/
│   └── mappers/
│
├── presentation/
│   ├── screens/
│   ├── components/
│   ├── hooks/
│   ├── state/
│   └── validators/
│
└── tests/
```

### Database Access Rules

* Database models belong to the data layer.
* Domain entities must not depend directly on WatermelonDB.
* WatermelonDB decorators and model APIs must not leak into the domain layer.
* Database writes must be performed through controlled repository methods.
* Related records must be updated atomically where required.
* Database migrations must be versioned.
* Destructive migrations require explicit review.
* Database schema changes must include migration tests.
* Database queries must be optimized for mobile performance.

---

## 11. Financial Data Integrity

Financial data must be treated as high-integrity data.

### Monetary Values

Money must not be represented using JavaScript floating-point arithmetic for financial calculations.

Use integer minor units wherever possible.

Example:

```text
₹125.50 → 12550 paise
$10.25  → 1025 cents
```

Each monetary value must include or be associated with:

* Amount in minor units
* Currency code
* Sign or transaction direction
* Relevant precision rules

Currency codes should follow ISO 4217 where applicable.

### Date and Time

* Store timestamps in a consistent format.
* Store absolute event timestamps in UTC where appropriate.
* Preserve the user's intended local date for date-based financial records.
* Recurring payments must account for time zones.
* Reports must clearly distinguish transaction date from creation date.
* Date calculations must not rely on device locale alone.

### Transaction Integrity

Transactions must be validated before persistence.

A transaction should not be saved if required references are invalid, such as:

* Missing account
* Invalid transaction type
* Invalid amount
* Invalid currency
* Invalid category reference
* Invalid date
* Invalid transfer relationship

Related operations must be atomic.

For example, creating a transfer between two accounts must not update only one side of the transfer.

---

## 12. Privacy Requirements

DailyMate must follow privacy-by-design principles.

### Privacy Rules

* Financial data must remain local by default.
* Financial data must not be sent to the backend for authentication or subscription checks.
* Financial data must not be included in analytics events.
* Financial data must not be included in crash reports.
* Financial data must not be included in debug logs.
* Sensitive user information must not be exposed in notifications.
* Third-party SDKs must be reviewed before integration.
* Analytics and tracking must be minimized.
* Cloud backup must be optional and transparent.
* Users must be able to disconnect cloud providers.
* Users must be informed about data deletion consequences.

### Logging Restrictions

Logs must not contain:

* Transaction amounts
* Account balances
* Account names
* Payee names
* Financial notes
* Bank details
* Authentication tokens
* Passwords
* Backup encryption keys
* Subscription tokens
* Personal financial records

Use opaque identifiers and safe diagnostic metadata instead.

---

## 13. Offline and Synchronization Rules

DailyMate is not a conventional backend-synchronized finance application.

The local database is the source of truth for financial data.

### Offline Requirements

All core financial operations must support offline execution, including:

* Creating transactions
* Editing supported transactions
* Viewing transaction history
* Managing accounts
* Managing categories
* Managing labels
* Managing budgets
* Managing goals
* Managing planned payments
* Managing payees
* Viewing reminders
* Viewing debts and warranties

### No Automatic Backend Synchronization

The application must not automatically synchronize financial records with the Nest.js backend.

Cloud backup and restore are separate operations from authentication.

### Cloud Backup Is Not Live Sync

iCloud and Google Drive should initially be treated as backup and restore destinations, not real-time multi-device synchronization systems.

The product must not imply that changes made on one device will automatically appear on another device unless multi-device synchronization is explicitly implemented.

---

## 14. Cloud Restore and Conflict Handling

Restore behavior must be explicitly defined before implementation.

Possible restore modes include:

1. Replace local data
2. Merge backup with local data
3. Import selected records
4. Restore into a new local database

The first implementation should prefer a safe, predictable restore flow.

### Restore Requirements

* Display the backup creation date.
* Display the backup application/schema version.
* Validate backup integrity before import.
* Validate backup format compatibility.
* Create a local safety backup before replacement.
* Require user confirmation before destructive restore operations.
* Prevent partial restore operations.
* Roll back failed restore operations where possible.
* Clearly communicate restore completion or failure.

---

## 15. Security Requirements

### Mobile Application

The mobile application must:

* Use secure credential storage.
* Protect authentication tokens.
* Avoid hardcoded secrets.
* Avoid storing encryption keys in source code.
* Validate all user input.
* Protect sensitive screens where appropriate.
* Avoid exposing financial data through logs.
* Handle app backgrounding securely where required.
* Use secure network communication for backend requests.

### Nest.js Backend

The backend must:

* Use HTTPS in production.
* Validate request payloads.
* Apply authentication guards.
* Apply authorization checks.
* Rate-limit authentication endpoints.
* Protect against brute-force attacks.
* Hash passwords using a modern password-hashing algorithm.
* Rotate and revoke sessions when appropriate.
* Avoid exposing internal errors.
* Validate subscription provider responses.
* Keep secrets in environment configuration or a secure secret manager.
* Never log authentication credentials or tokens.

---

## 16. Feature Boundaries

The application must maintain clear ownership for each domain.

| Feature          | Responsibility                                                  |
| ---------------- | --------------------------------------------------------------- |
| Authentication   | Sign-up, sign-in, session state, authentication status          |
| Accounts         | Financial account records and account balances                  |
| Categories       | Expense and income categorization                               |
| Labels           | Flexible transaction labels                                     |
| Transactions     | Income, expenses, transfers, adjustments, and financial history |
| Budgets          | Spending limits, periods, and budget progress                   |
| Goals            | Savings targets, milestones, and goal progress                  |
| Planned Payments | Future, scheduled, and recurring payment definitions            |
| Payees           | People, businesses, borrowers, and payment recipients           |
| Reminders        | User notifications and scheduled reminders                      |
| Debts            | Borrowed and lent money records                                 |
| Warranties       | Product purchase and warranty information                       |
| User Preferences | User-specific application settings                              |
| AI Control       | Permission-controlled AI access to local data                   |
| Cloud Backup     | Backup, restore, encryption, and provider integration           |
| Subscription     | Subscription entitlement and access status                      |

---

## 17. AI Integration Constraints

If AI functionality is introduced, it must follow strict privacy and permission rules.

### AI Default Behavior

AI must not automatically receive unrestricted access to the user's financial database.

AI access must be:

* Explicitly permissioned
* Feature-scoped
* Read-only by default
* Auditable
* Revocable
* Limited to the minimum required data

### AI Prohibited Behavior

AI must not:

* Send financial data to external services without user consent.
* Modify financial records without confirmation.
* Delete financial records without confirmation.
* Transfer money.
* Initiate payments.
* Change account balances directly.
* Change subscription status.
* Access authentication tokens.
* Access cloud credentials.
* Access encryption keys.

### AI Mutation Rule

Any AI-requested data mutation must follow this flow:

```text
User Request
  ↓
AI Intent Detection
  ↓
Permission Validation
  ↓
Action Preview
  ↓
User Confirmation
  ↓
Validated Application Use Case
  ↓
Local Database Transaction
  ↓
Audit Event
```

---

## 18. Testing Requirements

The project must include testing at multiple levels.

### Unit Tests

Unit tests should cover:

* Domain entities
* Value objects
* Money calculations
* Budget calculations
* Goal calculations
* Recurrence calculations
* Transaction validation
* Account balance calculations
* Subscription state handling
* Backup validation
* Encryption metadata handling

### Integration Tests

Integration tests should cover:

* WatermelonDB repositories
* Database migrations
* Transaction atomicity
* Backup export
* Backup import
* Authentication API integration
* Subscription verification
* Cloud provider adapters

### End-to-End Tests

End-to-end tests should cover:

* Sign-up
* Sign-in
* Sign-out
* Creating an account
* Creating a transaction
* Editing a transaction
* Creating a budget
* Creating a goal
* Scheduling a planned payment
* Exporting a backup
* Restoring a backup
* Offline operation
* Subscription verification failure
* Backend unavailability

---

## 19. Environment Configuration

Environment-specific configuration must not be hardcoded.

Examples of configuration values include:

```text
API_BASE_URL
AUTH_CLIENT_ID
GOOGLE_DRIVE_CLIENT_ID
GOOGLE_DRIVE_REDIRECT_URI
SUBSCRIPTION_PROVIDER_CONFIGURATION
SENTRY_DSN
FEATURE_FLAGS
```

Secrets must not be committed to source control.

Use separate configuration for:

* Development
* Testing
* Staging
* Production

The application must not use production credentials in development builds.

---

## 20. Project Constraints Summary

The following constraints are mandatory:

1. The mobile application must be built using React Native.
2. The application bundle identifier is `com.buildingdots.dailymate`.
3. The backend must be built using Nest.js.
4. WatermelonDB must be used for local financial data storage.
5. The backend must only handle sign-up, sign-in, authentication, and subscription verification unless additional responsibilities are explicitly approved.
6. User financial data must not be stored on the backend during normal operation.
7. User financial data must be stored locally on the device.
8. Core financial functionality must work offline.
9. Cloud backup must be optional.
10. iCloud and Google Drive are the supported cloud backup destinations.
11. Cloud backup must not be treated as real-time synchronization unless explicitly implemented.
12. Cloud restore must be validated and user-controlled.
13. Financial data must not be included in analytics, logs, or crash reports.
14. Financial calculations must use safe monetary representations.
15. Authentication credentials and tokens must be stored securely.
16. Subscription expiration must not delete local financial data.
17. AI access to financial data must be permission-controlled.
18. All feature modules must follow clear architectural boundaries.
19. Database changes must use versioned migrations.
20. Destructive data operations must require explicit validation and confirmation.

---

## 21. Initial Development Priorities

Recommended implementation order:

### Phase 1: Foundation

* React Native project setup
* TypeScript configuration
* Bundle identifier configuration
* Application navigation
* Design system
* Error handling
* Logging policy
* Environment configuration
* WatermelonDB setup
* Database migration framework

### Phase 2: Authentication

* Nest.js project setup
* Sign-up
* Sign-in
* Session handling
* Secure token storage
* Sign-out
* Subscription status endpoint

### Phase 3: Core Financial Entities

* Accounts
* Categories
* Labels
* Transactions
* Payees

### Phase 4: Financial Planning

* Budgets
* Goals
* Planned payments
* Reminders

### Phase 5: Extended Records

* Debts
* Borrowers and lenders
* Warranties
* Attachments and financial documents

### Phase 6: Cloud Backup

* Backup export format
* Local encryption
* iCloud integration
* Google Drive integration
* Restore workflow
* Backup validation
* Conflict handling

### Phase 7: AI Control

* AI permission model
* Read-only financial insights
* Tool registry
* Action previews
* User-confirmed mutations
* Audit logging

---

## 22. Definition of Done

A feature is considered complete only when:

* Its domain rules are defined.
* Its database schema is defined.
* Its migrations are implemented.
* Its repository interface is implemented.
* Its local data source is implemented.
* Its application use cases are implemented.
* Its validation rules are implemented.
* Its UI states are implemented.
* Loading, empty, error, and success states are handled.
* Offline behavior is supported.
* Sensitive data is not logged.
* Unit tests are included.
* Integration tests are included where appropriate.
* The feature respects the local-first architecture.
* The feature does not introduce unauthorized backend financial-data storage.
* The feature does not violate the cloud backup constraints.
* Documentation is updated.

---

## 23. Guiding Statement

DailyMate should be developed as a **local-first personal finance application with a minimal authentication backend and optional user-controlled cloud backup**.

The backend verifies identity and subscription access.

The device stores and manages the user's financial life.

Cloud providers are used only when the user chooses to back up or restore their data.

This separation is a foundational architectural constraint and must be preserved throughout development.
