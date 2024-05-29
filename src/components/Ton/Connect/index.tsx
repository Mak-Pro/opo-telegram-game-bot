"use client";
import { useState } from "react";
import Image from "next/image";
import {
  useTonConnectUI,
  useTonAddress,
  useTonConnectModal,
} from "@tonconnect/ui-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "@/components";
import styles from "./style.module.scss";

export const Connect = () => {
  const [tonConnectUI] = useTonConnectUI();
  const { state, open, close } = useTonConnectModal();
  const userFriendlyAddress = useTonAddress();
  const [copied, setCopied] = useState(false);

  const handleWalletConnection = async () => {
    if (userFriendlyAddress) {
      await tonConnectUI.disconnect();
      return;
    }
    open();
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className={styles.tonconnect}>
      <div className={styles.tonconnect__info}>
        $1 <sub>in</sub>{" "}
        <Image src="/icons/coin.svg" width={24} height={24} alt="ton" /> TON
      </div>
      {userFriendlyAddress && (
        <CopyToClipboard text={userFriendlyAddress} onCopy={handleCopy}>
          <div className={styles.tonconnect__address}>
            {userFriendlyAddress}
            {copied && (
              <div className={styles.tonconnect__address_note}>
                Address successfully copied!
              </div>
            )}
          </div>
        </CopyToClipboard>
      )}
      <div className={styles.tonconnect__actions}>
        <Button
          onClick={handleWalletConnection}
          className={styles.tonconnect__btn}
        >
          {userFriendlyAddress ? `DISCONNECT TON WALLET` : `CONNECT TON WALLET`}
        </Button>
      </div>
    </div>
  );
};
