"use client";
import { useEffect, useState } from "react";
import { useTelegram } from "@/providers/telegram";
import {
  TonConnectButton,
  useTonAddress,
  useTonWallet,
  useTonConnectModal,
  useTonConnectUI,
  SendTransactionRequest,
  useIsConnectionRestored,
} from "@tonconnect/ui-react";

// tg.isClosingConfirmationEnabled = true;

export const TonInfo = () => {
  const { webApp, user } = useTelegram();
  const [balance, setBalance] = useState(null);

  console.log(user);

  // получить адрес кошелька
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);

  // получить информацию о кошельке
  const wallet = useTonWallet();

  const connectionRestored = useIsConnectionRestored();

  // получить доступ к функциям модального окна
  const { state, open, close } = useTonConnectModal();

  const [tonConnectUI, setOptions] = useTonConnectUI();

  useEffect(() => {
    setOptions({
      //   uiPreferences: {
      //     borderRadius: "m",
      //   },
      buttonRootId: "connect", // родительский блок для кнопки по id
      //   walletsListConfiguration: {
      //     includeWallets: [
      //       {
      //         aboutUrl: "",
      //         appName: "",
      //         name: "Ton Wallet",
      //         bridgeUrl: "",
      //         imageUrl: "",
      //         jsBridgeKey: "",
      //         platforms: ["chrome", "firefox"],
      //         universalLink: "",
      //       },
      //     ],
      //   },
    });
    // tonConnectUI.getWallets().then((res) => console.log(res));
  }, []);

  const testTransaction: SendTransactionRequest = {
    validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec,
    messages: [
      {
        address: userFriendlyAddress,
        amount: "2000000",
      },
    ],
  };

  const handleTransaction = () => {
    if (!wallet) {
      alert("You need to connect your wallet first!");
      return;
    }
    tonConnectUI
      .sendTransaction(testTransaction, {
        notifications: ["success"],
      })
      .then((res) => {
        setTimeout(() => {
          fetch(
            `https://testnet.toncenter.com/api/v3/wallet?address=${userFriendlyAddress}`
          )
            .then((res) => res.json())
            .then((data) => {
              console.log("SET BALLANCE");
              setBalance(data.balance);
            })
            .catch((err) => console.log(err));
        }, 10000);
      })
      .catch((err) => {
        return;
      });
  };

  useEffect(() => {}, [balance]);

  useEffect(() => {
    if (userFriendlyAddress) {
      fetch(
        `https://testnet.toncenter.com/api/v3/wallet?address=${userFriendlyAddress}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data.balance);
          setBalance(data.balance);
        })
        .catch((err) => console.log(err));
    }
  }, [userFriendlyAddress]);

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      {/* <Image src={user?.photo_url} width={40} height={40} alt="user" /> */}
      <div>User-friendly address: {userFriendlyAddress}</div>
      <div>Raw address: {rawAddress}</div>
      <button onClick={open}>Open Wallet Modal</button>
      <button onClick={close}>Close Wallet Modal</button>
      <div id="connect">Connect Wallet</div>
      <button onClick={handleTransaction}>SEND TRANSACTION</button>
      <div>Balance: {balance}</div>
    </div>
  );
};
