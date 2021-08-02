import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import {
  BaseLink,
  BaseModalContentColumn,
  BaseText,
} from "../../designSystem";
import theme from "../../designSystem/theme";
import BasicModalDev from "../Common/BasicModalDev";
import useConnectWalletModalDev from "../../hooks/useConnectWalletModalDev";
// import walletModalColor from "../../hooks/useModalColor";

const LearnMoreLink = styled(BaseLink)`
  &:hover {
    opacity: ${theme.hover.opacity};
  }
`;

const LearnMoreText = styled(BaseText)`
  text-decoration: underline;
`;

const LearnMoreArrow = styled(BaseText)`
  text-decoration: none;
  margin-left: 5px;
`;

const WalletConnectModalDev: React.FC = () => {
  
  const [show, setShow] = useConnectWalletModalDev();
  // const [modalColor, ] = walletModalColor();
  // console.log("modalColor: ", modalColor);

  const onClose = useCallback(() => {
    setShow(false);
  }, [setShow]);

  return (
    <BasicModalDev show={show} onClose={onClose} height={904} maxWidth={960} /*backgroundColor={modalColor}*/>
      <>
        <BaseModalContentColumn marginTop={16}>
          <LearnMoreLink
            to="https://ethereum.org/en/wallets/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-100"
          >
            <LearnMoreText>Learn more about wallets</LearnMoreText>
            <LearnMoreArrow>&#8594;</LearnMoreArrow>
          </LearnMoreLink>
        </BaseModalContentColumn>
      </>
    </BasicModalDev>
  );
};

export default WalletConnectModalDev;
