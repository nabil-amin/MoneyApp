import React from "react";
import { WalletProvider } from "./src/context/WalletContext";
import AppNavigation from "./src/Navigation";

export default function App() {
  return (
    <WalletProvider>
      <AppNavigation />
    </WalletProvider>
  );
}
