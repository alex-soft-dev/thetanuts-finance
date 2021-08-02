import React from "react";
import {
  VaultList,
  VaultOptions,
  VaultVersion,
} from "../../constants/constants";
import { Assets } from "../../store/types";

export const ProductList = [
  "yield",
  "volatility",
  "principalProtection",
  "capitalAccumulation",
] as const;

export type ProductType = typeof ProductList[number];

export interface DynamicMarginProps {
  empty: number;
}

export interface ProductTabProps {
  selected: boolean;
  type: ProductType;
}

export interface HeaderScrollIndicatorProps {
  direction: "left" | "right";
  show: boolean;
}

export interface ProductCatalogueProps {
  variant: "landing" | "webapp";
  onVaultPress: (vault: VaultOptions, vaultVersion: VaultVersion) => void;
}

export type DesktopViewType = "grid" | "gallery";

export const VaultStrategyList = [
  "Covered Call",
  "Put Selling",
] as const;
export type VaultStrategy = typeof VaultStrategyList[number];

export const VaultSortByList = [
  "Sort By",
  // "NEWEST FIRST",
  // "OLDEST FIRST",
  "Yield: High to Low",
  "Yield: Low to High",
  "All Yield"
] as const;
export type VaultSortBy = typeof VaultSortByList[number];
export const VaultSortByFilterOptions: Array<
  VaultSortBy | { display: string; value: VaultSortBy }
> = VaultSortByList.map((item) => item
  // item === VaultSortByList[0]
  //   ? {
  //       display: "DEFAULT",
  //       value: item,
  //     }
  //   : item
);

export const VaultStrategyByList = [
  "Strategy",
  "Covered Call",
  "Put Selling",
  "All Strategies",
] as const;
export type VaultStrategyBy = typeof VaultStrategyByList[number];
export const VaultStrategyByFilterOptions: Array<
VaultStrategyBy | { display: string; value: VaultStrategyBy }
> = VaultStrategyByList.map((item) => item
  // item === VaultStrategyByList[0]
  //   ? {
  //       display: "DEFAULT",
  //       value: item,
  //     }
  //   : item
);

export const VaultReleaseOrder: VaultOptions[] = VaultList;

export interface VaultSetFilterProps {
  setFilterStrategies: React.Dispatch<React.SetStateAction<VaultStrategy[]>>;
  setFilterAssets: React.Dispatch<React.SetStateAction<Assets[]>>;
}

export interface VaultFilterProps extends VaultSetFilterProps {
  filterStrategies: VaultStrategy[];
  filterAssets: Assets[];
  sort: VaultSortBy;
  setSort: React.Dispatch<React.SetStateAction<VaultSortBy>>;
  strategy: VaultStrategyBy;
  setStrategy: React.Dispatch<React.SetStateAction<VaultStrategyBy>>;
}

export type VaultsDisplayVersion = {
  [vault in VaultOptions]: VaultVersion;
};

export type UserSelectedVaultsVersion = Partial<VaultsDisplayVersion>;

export type VaultsDisplayVersionProps = {
  vaultsDisplayVersion: VaultsDisplayVersion;
  setVaultDisplayVersion: (
    vaultOption: VaultOptions,
    vaultVersion: VaultVersion
  ) => void;
};

export interface NavItemProps {
  isSelected: boolean;
}