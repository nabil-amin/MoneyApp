# Wallet & Investment Flow — Take Home Task

This workspace contains a simple React Native (Expo) TypeScript app implementing the requested three-screen investment flow.

Key points

- State management: `WalletContext` (React Context) holds balances, transactions and opportunities. The `invest` function updates balances and appends transactions locally.
- Money values: All numbers are kept as JavaScript numbers and displayed using `toLocaleString` with two fixed decimals and `SAR` appended. For production, a dedicated money library (or storing minor units) is recommended.
- Mocked API: `src/api/mockedApi.ts` provides mocked data and simulated network delays.

Files

- `App.tsx` — app shell with simple internal navigation.
- `src/context/WalletContext.tsx` — shared state, `invest` logic.
- `src/components/BalanceSummary.tsx` — reusable balance summary used on Home and Wallet.
- `src/screens/*` — the three screens (Home, Wallet, OpportunityDetails).

To run

1. Ensure dependencies are installed (this repo is an Expo project).
2. Run:

```bash
npm install
npx expo start
```

What I'd improve with more time

- Use a proper money type (store cents) and a formatting helper.
- Add unit tests around `invest` logic.
- Add navigation with `react-navigation` for back-stack and deep linking.
- Persist data to local storage or a lightweight backend.
