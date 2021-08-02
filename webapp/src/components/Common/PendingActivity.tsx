import React, { useCallback } from "react";
import styled from "styled-components";
import {
  SecondaryText,
  Title,
} from "shared/lib/designSystem";
import colors from "shared/lib/designSystem/colors";
import useConnectWalletModalDev from "shared/lib/hooks/useConnectWalletModalDev";

const PendingActivity = styled.div
<{
  space?: boolean
}>
`
  margin-right: ${(props) =>
    props.space ? `30px` : `0px`};
`;

const PendingBack1 = styled.div`
  border-radius: 10px;
  color: white;
  background-color: rgba(35, 52, 71, 0.7);
  display: flex;
  margin: 3px 0px;
  width: 330px;
  height: 80px;
  mix-blend-mode: multiply;
  opacity: 0.6;
`;

const PendingBack2 = styled.div`
  border-radius: 10px;
  color: white;
  background-color: rgba(35, 52, 71, 0.7);
  display: flex;
  margin: 6px 0px;
  width: 330px;
  height: 60px;
  mix-blend-mode: multiply;
  opacity: 0.6;
`;

const PendingUnit = styled.div`
  position: absolute;
  top: 0px;
  left: 4px;
  display: flex;
`;

const PendingPart = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 5px;
  width: 220px;
`;

const PendingPartClose = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;

`;

const PendingCancel = styled.div
<{
  color?: string
}>
`
  border-radius: 5px;
  background: none;
  color: ${(props)=>(props.color)};
  padding: 5px 10px; 
  font-size: 10px;
  width: 95px;
  border: 1px solid ${(props)=>(props.color)};
  // #FF7900
`;

const PendingInner = styled.div`
  position: relative;
  cursor: pointer;
`;

interface PendingActivityProps {
  space: boolean
}

const PendingMain: React.FC<PendingActivityProps> = ({
  space,
}) => {
  
  const [, setShowConnectModalDev] = useConnectWalletModalDev();
  const handleButtonClick = useCallback(async () => {
    setShowConnectModalDev(true);
  }, [setShowConnectModalDev]);
  
  return (
  <PendingActivity space={space}>
    <PendingInner 
      onClick={() => 
        handleButtonClick()
      }>
      <PendingBack1 className="pending-mainback"/>
      <PendingUnit>
        <PendingPart>
          <div>
            <Title fontSize={11}>Pending&nbsp;
            <SecondaryText fontSize={11} color={colors.products.volatility}>Withdrawal</SecondaryText>
            </Title>
          </div>
          <div>
            <SecondaryText fontSize={12}>ETH-C: <Title>2ETH</Title></SecondaryText>
          </div>
          <div>
            <SecondaryText fontSize={8}>Please return [countdown] to initate withdraw</SecondaryText>
          </div>
        </PendingPart>
        <PendingPartClose>
          <PendingCancel color={colors.pending.withdraw}>Cancel withdraw</PendingCancel>
        </PendingPartClose>
      </PendingUnit>
    </PendingInner>

    <PendingInner
    onClick={() => 
      handleButtonClick()
    }>
      <PendingBack2 />
      <PendingUnit>
        <PendingPart>
          <div>
            <Title fontSize={11}>Pending&nbsp;
            <SecondaryText fontSize={11} color={colors.pending.deposit}>Deposit</SecondaryText>
            </Title>
          </div>
          <div>
            <SecondaryText fontSize={12}>ETH-C: <Title>2ETH</Title></SecondaryText>
          </div>
        </PendingPart>
        <PendingPartClose>
          <PendingCancel color={colors.pending.deposit}>Cancel Deposit</PendingCancel>
        </PendingPartClose>
      </PendingUnit>
    </PendingInner>
  </PendingActivity>
)};

export default PendingMain;
