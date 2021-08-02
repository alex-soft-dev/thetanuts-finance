export interface AccountStatusVariantProps {
  variant: "desktop" | "mobile";
  showInvestButton?: boolean;
}

export interface WalletStatusProps {
  connected: boolean;
}

export type WalletButtonProps = AccountStatusVariantProps & WalletStatusProps;

// export type connectorType = "metamask" | "walletConnect" | "walletLink";
export type connectorType = "phantom" | "slope" | "solflare" | "sollet" | "sollet_extension";

export interface ConnectorButtonProps {
  status: "normal" | "initializing" | "neglected" | "connected";
}

export interface MenuStateProps {
  isMenuOpen: boolean;
}

export interface WalletCopyIconProps {
  state: "visible" | "hiding" | "hidden";
}
