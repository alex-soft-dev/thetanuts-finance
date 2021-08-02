import React, { useCallback, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import styled from "styled-components";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

import {
  injectedConnector,
  getWalletConnectConnector,
  walletlinkConnector,
} from "../../utils/connectors";

import { ConnectorButtonProps, connectorType } from "./types";
import Indicator from "../Indicator/Indicator";
import {
  BaseButton,
  BaseModalContentColumn,
  Title,
} from "../../designSystem";
import colors from "../../designSystem/colors";
import theme from "../../designSystem/theme";
import useTextAnimation from "../../hooks/useTextAnimation";
import BasicModal from "../Common/BasicModal";
import useConnectWalletModal from "../../hooks/useConnectWalletModal";
import PhantomIcon from "shared/src/assets/imgs/wallet/phantom.svg";
import SlopeIcon from "shared/src/assets/imgs/wallet/slope.svg";
import SolflareIcon from "shared/src/assets/imgs/wallet/solflare.svg";
import SolletExtensionIcon from "shared/src/assets/imgs/wallet/sollet-extension.png";
import SolletIcon from "shared/src/assets/imgs/wallet/sollet.svg";

const ConnectorButton = styled(BaseButton)<ConnectorButtonProps>`
  background-color: ${colors.background.three};
  align-items: center;
  width: 100%;
  display: flex;

  &:hover {
    opacity: ${theme.hover.opacity};
  }

  ${(props) => {
    switch (props.status) {
      case "connected":
        return `
          border: ${theme.border.width} ${theme.border.style} ${colors.green};
        `;
      case "neglected":
        return `
          opacity: 0.24;

          &:hover {
            opacity: 0.24;
          }
        `;
      case "initializing":
        return `
          border: ${theme.border.width} ${theme.border.style} ${colors.green};

          &:hover {
            opacity: 1;
          }
        `;
      default:
        return ``;
    }
  }}
`;

const IndicatorContainer = styled.div`
  margin-left: auto;
`;

const ConnectorButtonText = styled(Title)`
  margin-left: 16px;
  width: 85%
`;


const WalletConnectModal: React.FC = () => {
  const {
    connector,
    activate: activateWeb3,
    library,
    account,
    active,
  } = useWeb3React();
  const [connectingConnector, setConnectingConnector] =
    useState<connectorType>();
  const initializingText = useTextAnimation(Boolean(connectingConnector), {
    texts: [
      "INITIALIZING",
      "INITIALIZING .",
      "INITIALIZING ..",
      "INITIALIZING ...",
    ],
    interval: 250,
  });
  const [show, setShow] = useConnectWalletModal();

  const onClose = useCallback(() => {
    setShow(false);
  }, [setShow]);

  const handleConnect = useCallback(
    async (type: connectorType) => {
      setConnectingConnector(type);

      // Disconnect wallet if currently connected already
      if (active && connector instanceof WalletConnectConnector)
        await connector.close();

      // Connect wallet
      switch (type) {
        case "phantom":
          await activateWeb3(injectedConnector);
          break;
        case "slope":
          await activateWeb3(getWalletConnectConnector());
          break;
        case "solflare":
          await activateWeb3(walletlinkConnector);
      }
      setConnectingConnector(undefined);
    },
    [activateWeb3, connector, active]
  );

  useEffect(() => {
    if (library && account) {
      onClose();
    }
  }, [library, account, onClose]);

  const getConnectorStatus = useCallback(
    (connectorType: connectorType) => {
      // If connected, check if current button is connected
      if (active) {
        switch (connectorType) {
          case "phantom":
            if (connector instanceof InjectedConnector) return "connected";
            break;
          case "slope":
            if (connector instanceof WalletConnectConnector) return "connected";
            break;
          case "solflare":
            if (connector instanceof WalletLinkConnector) return "connected";
        }
      }

      // Check initializing status
      switch (connectingConnector) {
        case undefined:
          return "normal";
        case connectorType:
          return "initializing";
      }
      return "neglected";
    },
    [active, connector, connectingConnector]
  );

  const renderConnectorIcon = useCallback((type: connectorType) => {
    switch (type) {
      case "phantom":
        return <img src={PhantomIcon} height={40} width={40} alt="phantom"/>;
      case "slope":
        return <img src={SlopeIcon} height={40} width={40} alt="slope"/>;
      case "solflare":
        return <img src={SolflareIcon} height={40} width={40} alt="solflare"/>;
      case "sollet":
        return <img src={SolletIcon} height={40} width={40} alt="sollet" />;
      case "sollet_extension":
        return <img src={SolletExtensionIcon} height={40} width={40} alt="sollet_extension" />;
    }
  }, []);

  const renderConnectorButton = useCallback(
    (type: connectorType, title: string) => (
      <ConnectorButton
        role="button"
        onClick={() => handleConnect(type)}
        status={getConnectorStatus(type)}
      >
        
        <ConnectorButtonText>
          {connectingConnector === type ? initializingText : title}
        </ConnectorButtonText>
        {getConnectorStatus(type) === "connected" && (
          <IndicatorContainer>
            <Indicator connected={active} />
          </IndicatorContainer>
        )}
        {renderConnectorIcon(type)}
      </ConnectorButton>
    ),
    [
      active,
      connectingConnector,
      getConnectorStatus,
      initializingText,
      renderConnectorIcon,
      handleConnect,
    ]
  );

  return (
    <BasicModal show={show} onClose={onClose} height={504} maxWidth={500}>
      <>
        <BaseModalContentColumn marginTop={8}>
          <Title>CONNECT WALLET</Title>
        </BaseModalContentColumn>
        <BaseModalContentColumn>
          {renderConnectorButton("phantom", "Phantom")}
        </BaseModalContentColumn>
        <BaseModalContentColumn marginTop={16}>
          {renderConnectorButton("slope", "Slope")}
        </BaseModalContentColumn>
        <BaseModalContentColumn marginTop={16}>
          {renderConnectorButton("solflare", "Solflare")}
        </BaseModalContentColumn>
        <BaseModalContentColumn marginTop={16}>
          {renderConnectorButton("sollet", "Sollet")}
        </BaseModalContentColumn>
        <BaseModalContentColumn marginTop={16}>
          {renderConnectorButton("sollet_extension", "Sollet(Extension)")}
        </BaseModalContentColumn>
      </>
    </BasicModal>
  );
};

export default WalletConnectModal;
