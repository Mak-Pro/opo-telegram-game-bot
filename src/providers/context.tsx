"use client";
import React, { createContext, useState, useEffect } from "react";
import {
  TonConnectButton,
  useTonAddress,
  useTonWallet,
  useTonConnectModal,
  useTonConnectUI,
  SendTransactionRequest,
  useIsConnectionRestored,
} from "@tonconnect/ui-react";

const AppContext = createContext({
  balance: 0,
  startBalance: (val: number): void => {},
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [balance, setBalance] = useState(0);
  const wallet = useTonWallet();
  const userFriendlyAddress = useTonAddress();

  const startBalance = (val: number) => {
    setBalance(val);
  };

  useEffect(() => {
    if (wallet) {
      fetch(
        `${process.env.NEXT_PUBLIC_TESTNET_TON_API}/wallet?address=${userFriendlyAddress}`
      )
        .then((res) => res.json())
        .then((data) => {
          startBalance(+(data.balance / 100000000).toFixed(2));
        })
        .catch((err) => console.log(err));
    } else {
      startBalance(0);
    }
  }, [userFriendlyAddress]);

  return (
    <AppContext.Provider value={{ balance, startBalance }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
