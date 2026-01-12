# Wallet & Investment Flow — Take Home Task

This workspace contains a simple React Native (Expo) TypeScript app implementing a three-screen investment flow.

## Overview

- **State Management:**  
  The app uses a custom `WalletContext` (React Context) to manage global state. This context holds wallet balances, transactions, and investment opportunities. All screens access and update this shared state via hooks (`useWallet`). The `invest` function updates balances and appends transactions locally, ensuring all screens reflect changes instantly.

- **Money Values:**  
  All monetary values are stored as JavaScript numbers. For display, values are formatted using `toLocaleString` with two fixed decimals and the currency symbol (`SAR` or `﷼`). This ensures consistent and readable money formatting across the app. For production, using a dedicated money library or storing values in minor units (e.g., cents) is recommended for accuracy.

- **Mocked API:**  
  The file `src/api/mockedApi.ts` provides mocked data and simulates network delays for a realistic development experience.

## File Structure

- `App.tsx` — App shell with navigation and context provider.
- `src/context/WalletContext.tsx` — Shared state and `invest` logic.
- `src/components/BalanceSummary.tsx` — Reusable balance summary for Home and Wallet screens.
- `src/screens/Home.tsx`, `src/screens/Wallet.tsx`, `src/screens/OpportunityDetails.tsx` — The three main screens.
- `src/theme.ts` — Centralized theme and color palette for a consistent "money" look.

## How State Is Managed

- All screens consume state from `WalletContext`.
- Actions like investing update context state, which automatically updates all screens.
- No prop drilling; state is accessed via hooks.

## How Money Values Are Handled

- Stored as JS numbers.
- Displayed using `toLocaleString` for localization and fixed decimals.
- Currency symbol appended for clarity.

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npx expo start
   ```

## Improvements With More Time

- Use a proper money type (store minor units, add formatting helpers).
- Add unit tests for `invest` and context logic.
- Enhance navigation (back-stack, deep linking).
- Persist data to local storage or backend.
- Improve UI/UX and accessibility.
- Add error handling and loading states for all screens.

---

````# Wallet & Investment Flow — Take Home Task

This workspace contains a simple React Native (Expo) TypeScript app implementing a three-screen investment flow.

## Overview

- **State Management:**
  The app uses a custom `WalletContext` (React Context) to manage global state. This context holds wallet balances, transactions, and investment opportunities. All screens access and update this shared state via hooks (`useWallet`). The `invest` function updates balances and appends transactions locally, ensuring all screens reflect changes instantly.

- **Money Values:**
  All monetary values are stored as JavaScript numbers. For display, values are formatted using `toLocaleString` with two fixed decimals and the currency symbol (`SAR` or `﷼`). This ensures consistent and readable money formatting across the app. For production, using a dedicated money library or storing values in minor units (e.g., cents) is recommended for accuracy.

- **Mocked API:**
  The file `src/api/mockedApi.ts` provides mocked data and simulates network delays for a realistic development experience.

## File Structure

- `App.tsx` — App shell with navigation and context provider.
- `src/context/WalletContext.tsx` — Shared state and `invest` logic.
- `src/components/BalanceSummary.tsx` — Reusable balance summary for Home and Wallet screens.
- `src/screens/Home.tsx`, `src/screens/Wallet.tsx`, `src/screens/OpportunityDetails.tsx` — The three main screens.
- `src/theme.ts` — Centralized theme and color palette for a consistent "money" look.

## How State Is Managed

- All screens consume state from `WalletContext`.
- Actions like investing update context state, which automatically updates all screens.
- No prop drilling; state is accessed via hooks.

## How Money Values Are Handled

- Stored as JS numbers.
- Displayed using `toLocaleString` for localization and fixed decimals.
- Currency symbol appended for clarity.

## How to Run

1. Install dependencies:
   ```bash
   npm install
````

2. Start the app:
   ```bash
   npx expo start
   ```

## Improvements With More Time

- Use a proper money type (store minor units, add formatting helpers).
- Add unit tests for `invest` and context logic.
- Enhance navigation (back-stack, deep linking).
- Persist data to local storage or backend.
- Improve UI/UX and accessibility.
- Add error handling and loading states for all screens.

---
