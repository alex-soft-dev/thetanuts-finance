import React from "react";
import { useGlobalState } from "../store/store";

const useConnectWalletModalDev: () => [
  boolean,
  (u: React.SetStateAction<boolean>) => void
] = () => {
  const [showConnectWalletDev, setShowConnectWalletDev] = useGlobalState(
    "showConnectWalletDev"
  );
  return [showConnectWalletDev, setShowConnectWalletDev];
};

export default useConnectWalletModalDev;