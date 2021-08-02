import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import { AnimatePresence, motion } from "framer-motion";

import {
  BaseButton,
  Title,
  Subtitle,
  SecondaryText,
} from "../../../designSystem";
import colors from "../../../designSystem/colors";
import sizes from "../../../designSystem/sizes";
import theme from "../../../designSystem/theme";
import CapBar from "../../Deposit/CapBar";
import {
  formatBigNumber,
  formatSignificantDecimals,
  isPracticallyZero,
} from "../../../utils/math";
import useTextAnimation from "../../../hooks/useTextAnimation";
import {
  VaultOptions,
  VaultVersion,
} from "../../../constants/constants";
import { productCopies } from "../productCopies";
import { getAssetDisplay, getAssetLogo } from "../../../utils/asset";
import { getVaultColor } from "../../../utils/vault";
import ModalContentExtra from "../../Common/ModalContentExtra";
import { VaultAccount } from "../../../models/vault";
import YieldComparison from "./YieldComparison";
import { useV2VaultData, useVaultData } from "../../../hooks/web3DataContext";
import { useLatestAPY } from "../../../hooks/useLatestOption";
import useAssetsYield from "../../../hooks/useAssetsYield";
import useConnectWalletModalDev from "../../../hooks/useConnectWalletModalDev";
// import walletModalColor from "../../../hooks/useModalColor";
import { USDLogo } from "../../../assets/icons/erc20Assets";

const { formatUnits } = ethers.utils;

const CardContainer = styled.div`
  perspective: 2000px;
  
`;

const ProductCard = styled(motion.div)<{ color: string }>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background: rgba(27, 25, 26, 0.6);;
  border: 1px ${theme.border.style} ${(props) => props.color};
  border-radius: ${theme.border.radius};
  transition: 0.25s box-shadow ease-out, 0.25s border ease-out;
  width: 290px;
  min-height: 380px;
  position: relative;
  height: 100%;
  padding: 16px;

  @media (max-width: ${sizes.md}px) {
    width: 343px;
  }

  &:hover {
    box-shadow: ${(props) => props.color}66 8px 16px 80px;
    // border: 2px ${theme.border.style} ${(props) => props.color};
  }
`;

const TopContainer = styled.div<{ color: string }>`
  display: flex;
  font-family: Barlow;
  font-style: normal;
  position: relative;
  justify-content: space-between;
  width: calc(100% + 32px);
  margin: -16px;
  margin-bottom: 0;
  border-radius: ${theme.border.radius} ${theme.border.radius} 0px 0px;
  background: ${(props) => props.color}
`;

const TagContainer = styled.div`
  z-index: 1;
  flex: 1;
  display: flex;
  align-self: baseline;
`;

const ProductTag = styled(BaseButton)<{ color: string }>`
  background: ${(props) => props.color}29;
  padding: 8px;
  margin-right: 4px;
  border-radius: ${theme.border.radiusSmall};
`;

const ProductInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  flex: 1;
`;

const ProductAssetLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  width: 56px;
  border-radius: 100px;
  position: relative;

  &:before {
    display: block;
    position: absolute;
    height: 100%;
    width: 100%;
    content: " ";
    border-radius: 100px;
  }
`;

const ProductDescription = styled(SecondaryText)`
  line-height: 1.5;
  font-size: 12px;
  margin-bottom: 20px;
  color: white;
`;

const ShowSettingInfoContainer = styled.div`
  background: #233447;  
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  border-radius: 0 8px 0 0;
  z-index: 1;
  color: white;
  font-size: 12px;
`;

interface YieldCardProps {
  vault: VaultOptions;
  vaultVersion: VaultVersion;
  onVaultVersionChange: (version: VaultVersion) => void;
  onVaultPress: (vault: VaultOptions, vaultVersion: VaultVersion) => void;
  vaultAccount?: VaultAccount;
}

const YieldCard: React.FC<YieldCardProps> = ({
  vault,
  vaultVersion,
  onVaultVersionChange,
  onVaultPress,
  vaultAccount,
}) => {
  const {
    status,
    deposits,
    vaultLimit,
    asset,
    displayAsset,
    decimals,
    vaultBalanceInAsset,
  } = useVaultData(vault);
  const {
    data: { totalBalance: v2Deposits, cap: v2VaultLimit },
    loading: v2DataLoading,
  } = useV2VaultData(vault);
  const yieldInfos = useAssetsYield(asset);
  const isLoading = useMemo(() => status === "loading", [status]);
  const [mode, ] = useState<"info" | "yield">("info");
  const color = getVaultColor(vault);

  const [, setShowConnectModalDev] = useConnectWalletModalDev();
  // const [, setModalColor] = walletModalColor();
  const handleButtonClick = useCallback(async () => {
    setShowConnectModalDev(true);
    // setModalColor(color);
  }, [setShowConnectModalDev/*, setModalColor*/]);

  const [totalDepositStr, depositLimitStr] = useMemo(() => {
    switch (vaultVersion) {
      case "v1":
        return [
          parseFloat(
            formatSignificantDecimals(formatUnits(deposits, decimals), 2)
          ),
          parseFloat(
            formatSignificantDecimals(formatUnits(vaultLimit, decimals))
          ),
        ];
      case "v2":
        return [
          parseFloat(
            formatSignificantDecimals(formatUnits(v2Deposits, decimals), 2)
          ),
          parseFloat(
            formatSignificantDecimals(formatUnits(v2VaultLimit, decimals))
          ),
        ];
    }
  }, [decimals, deposits, v2Deposits, v2VaultLimit, vaultLimit, vaultVersion]);

  const latestAPY = useLatestAPY(vault, vaultVersion);

  const loadingText = useTextAnimation(!latestAPY.fetched);
  // temp modified code
  // const perfStr = latestAPY.fetched
  //   ? `${latestAPY.res.toFixed(2)}%`
  //   : loadingText;
  const perfStr = latestAPY.fetched
    ? `${(Math.random() * 100).toFixed(2)}%`
    : loadingText;
  // end temp


  const PositionSuffix = styled.div`
    color: ${(props) => props.color};
    font-weight: bold;
    font-size: 20px;
    margin-left: 4px;
  `;

  const ProductInfoContent = useCallback(() => {
    const Logo = getAssetLogo(displayAsset);
    const UsdcLogo = USDLogo;

    let logo = <Logo />;
    let usdclogo = <UsdcLogo />;

    switch (displayAsset) {
      case "ETH":
        logo = <Logo />;
        break;
    }

    return (
      <>
        <div style={{display: "flex", paddingTop: 7}}>
          <ProductAssetLogoContainer>
            {logo}
            {productCopies[vault].pngusdc ? (
              usdclogo
            ) : (
              <></>
            )}
          </ProductAssetLogoContainer>
          <Title fontSize={22} lineHeight={40} className="w-100 my-2" style={{marginLeft: "0.3em"}}>
            {productCopies[vault].title}
          </Title>
        </div>
        <ProductDescription>
          {productCopies[vault].description}
        </ProductDescription>
        <Title
          color={`${colors.primaryText}`}
          fontSize={14}
          className="w-100"
          style={{fontFamily: "Barlow", fontStyle: "normal"}}
        >
          Current Projected Yield (APY)
        </Title>
        <Title fontSize={24} className="w-100 mt-1 mb-2" color={color}>
          {perfStr}
        </Title>
        <CapBar
          loading={vaultVersion === "v1" ? isLoading : v2DataLoading}
          current={totalDepositStr}
          cap={depositLimitStr}
          copies={{
            current: "Current Deposits",
            cap: "Max Capacity",
          }}
          labelConfig={{
            fontSize: 12,
          }}
          statsConfig={{
            fontSize: 14,
          }}
          color={color}
          barConfig={{ height: 4, extraClassNames: "my-2", radius: 2 }}
          asset={asset}
        />
      </>
    );
  }, [
    asset,
    color,
    depositLimitStr,
    displayAsset,
    isLoading,
    perfStr,
    totalDepositStr,
    v2DataLoading,
    vault,
    vaultVersion,
  ]);

  const modalContentExtra = useMemo(() => {
    if (
      vaultVersion === "v2" &&
      !isPracticallyZero(vaultBalanceInAsset, decimals)
    ) {
      return (
        <div className="d-flex w-100 justify-content-center">
          <SecondaryText fontSize={12} color={colors.primaryText}>
            Funds ready for migration to V2
          </SecondaryText>
        </div>
      );
    }

    return (
      <div className="d-flex align-items-center w-100">
        <SecondaryText fontSize={12} className="mr-auto" style={{color: "white", width: "20px"}}>
          Your Position
        </SecondaryText>
        <Title fontSize={20}>
          {vaultAccount
            ? `${formatBigNumber(
                vaultAccount.totalBalance,
                decimals
              )} ${getAssetDisplay(asset)}`
            : productCopies[vault].posvalue}
        </Title>
        <PositionSuffix color={color}>
          {productCopies[vault].possuffix}
        </PositionSuffix>
      </div>
    );
  }, [asset, decimals, vaultAccount, vaultBalanceInAsset, vaultVersion]);

  return (
    <CardContainer>
      <AnimatePresence exitBeforeEnter initial={false}>
        <ProductCard
          key={mode}
          transition={{
            duration: 0.1,
            type: "keyframes",
            ease: "linear",
          }}
          initial={{
            transform: "rotateY(90deg)",
          }}
          animate={{
            transform: "rotateY(0deg)",
          }}
          exit={{
            transform: "rotateY(-90deg)",
          }}
          onClick={() => 
            handleButtonClick()
            //onVaultPress(vault, vaultVersion)
          }
          role="button"
          color={color}
        >
          <TopContainer color={color}>
            {/* Tags */}
            <TagContainer>
              {/* Product tags */}
              {productCopies[vault].tags.map((tag) => (
                <ProductTag key={tag} color={color}>
                  <Subtitle>{tag}</Subtitle>
                </ProductTag>
              ))}
            </TagContainer>

            {/* Show Setting Info */}
            {productCopies[vault].showsetting !== "" && (
              <ShowSettingInfoContainer>
                {productCopies[vault].showsetting}
              </ShowSettingInfoContainer>
            )}
          </TopContainer>
          <ProductInfo>
            {mode === "yield" && yieldInfos ? (
              <YieldComparison
                vault={vault}
                vaultVersion={vaultVersion}
                yieldInfos={yieldInfos}
              />
            ) : (
              <ProductInfoContent />
            )}
          </ProductInfo>
          <ModalContentExtra >
            {modalContentExtra}
          </ModalContentExtra>
        </ProductCard>
      </AnimatePresence>
    </CardContainer>
  );
};

export default YieldCard;
