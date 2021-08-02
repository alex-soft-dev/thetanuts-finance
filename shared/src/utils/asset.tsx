import React from "react";
import styled, { StyledComponent } from "styled-components";
import {
  BTCLogo,
  ETHLogo,
  SUSHILogo,
  USDLogo,
  WETHLogo,
} from "../assets/icons/erc20Assets";
import colors from "../designSystem/colors";
import { Assets } from "../store/types";

export const getAssetDisplay = (asset: Assets): string => {
  switch (asset) {
    case "ETH":
      return "ETH";
    default:
      return asset;
  }
};

export const getAssetDecimals = (asset: Assets): number => {
  switch (asset) {
    case "BTC":
      return 8;
    default:
      return 18;
  }
};

export const getDefaultSignificantDecimalsFromAssetDecimals = (
  decimals: number
) => {
  switch (decimals) {
    case 18:
      return 6;
    case 8:
      return 5;
    case 6:
    default:
      return 2;
  }
};

export const getAssetDefaultSignificantDecimals = (asset: Assets): number => {
  return getDefaultSignificantDecimalsFromAssetDecimals(
    getAssetDecimals(asset)
  );
};

export const getAssetColor = (asset: Assets): string => colors.asset[asset];

export const LidoThemedETHLogo = styled(WETHLogo)`
  path {
    fill: ${colors.asset.stETH};
  }
`;

export const getAssetLogo: (asset: Assets) =>
  | StyledComponent<
      React.FC<React.SVGAttributes<SVGElement>>,
      any,
      { backgroundColor?: string },
      never
    >
  | React.FC<React.SVGAttributes<SVGElement>>
  | React.FC<
      React.SVGAttributes<SVGElement> & {
        markerConfig?: {
          height?: number;
          width?: number;
          right?: string;
          bottom?: string;
          border?: string;
        };
      }
    >
  | React.FC<React.SVGAttributes<SVGElement> & { showBackground?: boolean }> = (
  asset
) => {
  switch (asset) {
    case "SUSHI":
      return SUSHILogo;
    // case "USDC":
    //   return USDLogo;
    case "BTC":
      return BTCLogo;
    case "ETH":
      return ETHLogo;
    case "All Asset Types":
      return USDLogo;
  }
};
