import React, { RefAttributes, useState } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { HTMLMotionProps } from "framer-motion";

import { BaseModal, BaseModalHeader, SecondaryText, Title } from "../../designSystem";
import theme from "../../designSystem/theme";
import colors from "../../designSystem/colors";
import MenuButton from "./MenuButton";
import { ETHLogo } from "../../assets/icons/erc20Assets";
import WarningIcon from "shared/src/assets/imgs/main/warning.png";
import ContactIcon from "shared/src/assets/imgs/main/contact.png";
import SoldIcon from "shared/src/assets/imgs/main/sold.png";
import MintIcon from "shared/src/assets/imgs/main/mint.png";
import CapBar from "../Deposit/CapBar";
import Table from 'react-bootstrap/Table'

const StyledModal = styled(BaseModal)<{
  height: number;
  maxWidth: number;
  theme?: string;
}>`
  .modal-dialog {
    width: 95vw;
    max-width: ${(props) => props.maxWidth}px;
    margin-left: auto;
    margin-right: auto;
  }

  .modal-content {
    transition: min-height 0.25s;
    min-height: ${(props) => props.height}px;
    width: 100%;
    overflow: hidden;
    background-color: #252629;
    border: 1px solid #4857b9;

    ${(props) =>
      props.theme
        ? `
            background-color: ${props.theme}0A;
          `
        : ``}}
  }
`;

const BackButton = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 48px;
  z-index: 2;

  & > i {
    color: #ffffff;
  }
`;

const CloseButton = styled.div<{ theme?: string }>`
  position: absolute;
  top: 4px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: ${theme.border.width} ${theme.border.style}
    ${(props) => (props.theme ? `${colors.primaryText}0A` : `${colors.border}`)};
  border-radius: 48px;
  color: ${colors.text};
  z-index: 2;
`;

const CardPartUp = styled.div`
  display: flex;
`;

const CardInfoPanel = styled.div`
  width: 50%;
  // height: 50%;
  margin: 10px;
  margin-left: 20px;
`;

const CardHeader = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #5D5D5D;
  margin-bottom: 5px;
  justify-content: space-between;
`;

const CurrentPrice = styled.div`
  display: grid;
  text-align: right;
`;

const CardPrice = styled.div`
  margin-top: 10px;
  border-top: 1px solid #5D5D5D;
`;

const CardPriceInner = styled.div`
  margin-top: 5px;
  display: flex;
`;

const CommonPart = styled.div`
  display: grid;
  width: 25%;
`;

const CurrentYield = styled.div`
  display: grid;
  width: 50%;
  margin-left: 10px;
`;

const CardDesc = styled.div`
  display: grid;
  margin: auto;
  border-top: 1px solid #5D5D5D;
  width: 96%;
`;

const CardDescTitle = styled(Title)`
  margin-top: 10px;
`;

const DepositPanel = styled.div`
  padding: 20px;
  width: 50%;
`;

const DepositInner = styled.div`
  // padding: 20px;
  // margin-right: 20px;
  // width: 50%;
  background: #32343A;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

const DepoDiv = styled.div<{
  marginTop?: number;
}>`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.marginTop}px;
`;

const DepoHead = styled.div`
  display: flex;
  text-align: center;
`;

const DepoFoot = styled(DepoDiv)`
  height: 25px;
`;

const HeadDeposit = styled.div<{
  colorActive: boolean;
  borderRadius: string;
}>`
  width: 50%;
  background-color: ${(props) => props.colorActive ? `#32343A` : `#474A53`};
  border-radius: ${(props) => props.borderRadius};
  padding: 10px 0px;
  cursor: pointer;
`;

const CardTable = styled.div`
  height: 50%;
`;

const TablePart = styled(Table)`
  color: #FFFFFF;
  box-shadow: 0 0 5px 0px #121111;
  margin-top: 10px;
  background: #23272B;
  tr {
    th {
      border: none;
    }
    td {
      border: none; 
      padding: 0.3em 0.75em;
    }
    border-style: none;
    &:hover {
      opacity: 0.8;
    }
    &:nth-child(even) {
      background-color: rgba(71, 74, 83, 0.2);
    }
  }
`;

const ViewAllBtn = styled.button`
  border-radius: 5px; 
  margin: auto;
  color: white;
  background: none;
  border: 1px solid #5D5D5D;
  padding: 0px 60px 4px 60px;
`;

const YieldText = styled(SecondaryText)`
    text-align: right;
`;

const ColumnIn = styled.div`
  display: flex;
  flex-direction: column;
`;

const DepoBtnDiv = styled(DepoDiv)`
  // height: 80px;
  border-bottom: 1px solid #5D5D5D;
  margin-top: 20px;
`;

const DepoBtn = styled.button`
  width: 80%;
  background-color: #34B063;
  border-radius: 5px;
  height: 60px;
  display: flex;
`;

const WithBtn = styled.button`
  width: 60%;
  background-color: #E1A335;
  border: 1px solid #E1A335;
  border-radius: 5px;
  // margin-top: 60px;
  display: flex;
  margin-bottom: 18px;
`;

const DepoCloseBtn = styled.button`
  width: 30%;
  background: none;
  border-radius: 5px;
  border: 2px solid white;
  // height: 60px;
  display: flex;
  margin-bottom: 18px;
  margin-right: 10px;
`;

const DialogInnerText = styled(SecondaryText)<{
  margin: string;
}>`
    margin: ${(props) => props.margin};
`;

const DepoFootDivText = styled(SecondaryText)`
  margin-right: 20px;
`;

const DepoWarningText = styled(SecondaryText)`
  color: #E1A335;
  width: 70%;
  margin-left: 10px;
`;

const DepoShowValuePanel = styled.div`
  width: 60%;
  border-radius: 5px;
  display: flex;
  background-color: white;
  height: 45px;
`;

const DepoShowMaxPanel = styled.div`
  width: 10%;
  border-radius: 5px;
  display: flex;
  border: 1px solid #5D5D5D;
  margin-left: 4px;
`;

const ModalHeader = styled(BaseModalHeader)`
  background: #6C7CE7;
  padding: 0px;
`;

const ModalBody = styled(Modal.Body)`
  padding-top: 0px;
`;

const DepoPanel = styled.div<{
  display?: boolean;
}>`
  display: ${(props) => 
    props.display ? `block` : `none`};  
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
`;

const tableData = [
  {id: 1, act_state: "sold", act_ago: 5, contract: "0-WETH 10/15 CALL", contract_ago: 5, quality: "12,961.618", yield: "+42.125259", yield_add: "+$151,227.58"},
  {id: 2, act_state: "minted", act_ago: 5, contract: "0-WETH 10/15 CALL", contract_ago: 5, quality: "12,961.6181334", yield: "-", yield_add: "-"},
  {id: 3, act_state: "sold", act_ago: 5, contract: "0-WETH 10/15 CALL", contract_ago: 5, quality: "12,961.618", yield: "+42.125259", yield_add: "+$151,227.58"},
  {id: 4, act_state: "minted", act_ago: 5, contract: "0-WETH 10/15 CALL", contract_ago: 5, quality: "12,961.6181334", yield: "-", yield_add: "-"},
  {id: 5, act_state: "minted", act_ago: 5, contract: "0-WETH 10/15 CALL", contract_ago: 5, quality: "12,961.6181334", yield: "-", yield_add: "-"},
  {id: 6, act_state: "minted", act_ago: 5, contract: "0-WETH 10/15 CALL", contract_ago: 5, quality: "12,961.6181334", yield: "-", yield_add: "-"},
]

interface BasicModalProps {
  show: boolean;
  height: number;
  maxWidth?: number;
  onClose: () => void;
  closeButton?: boolean;
  backButton?: {
    onClick: () => void;
  };
  children: JSX.Element;
  animationProps?: HTMLMotionProps<"div"> & RefAttributes<HTMLDivElement>;
  headerBackground?: boolean;
  backgroundColor?: string;
  theme?: string;
}

const BasicModalDev: React.FC<BasicModalProps> = ({
  show,
  height,
  maxWidth = 343,
  onClose,
  closeButton = true,
  backButton,
  children,
  animationProps = {},
  headerBackground = true,
  backgroundColor,
  theme,
}) => {
  // Select tab
  const [tabDepo, setTabDepo] = useState(true);
  const [tabWith, setTabWith] = useState(false);
  return (
  <StyledModal
    show={show}
    centered
    height={height}
    maxWidth={maxWidth}
    onHide={onClose}
    backdrop
    theme={theme}
    backgroundColor={backgroundColor}
  >
    {/* <ModalHeader backColor={backgroundColor}> */}
    <ModalHeader>
      {/* Back button */}
      {backButton && (
        <BackButton role="button" onClick={backButton.onClick}>
          <i className="fas fa-arrow-left" />
        </BackButton>
      )}
      <Title fontSize={24} style={{margin: "auto"}}>Covered Calling</Title>
      {/* Close Button */}
      {closeButton && (
        <CloseButton role="button" onClick={onClose}>
          <MenuButton isOpen onToggle={onClose} size={20} color="#FFFFFF" />
        </CloseButton>
      )}
    </ModalHeader>

    <ModalBody>
      <CardPartUp>
        <CardInfoPanel>
          <CardHeader>
            <div>
              <ETHLogo />
              <Title fontSize={20} lineHeight={40} className="w-50 ml-2">
                ETH-C
              </Title>
            </div>
            <CurrentPrice>
              <SecondaryText>
                Current ETH Price
              </SecondaryText>
              <Title fontSize={23}>$3,589.95</Title>
            </CurrentPrice>
          </CardHeader>

          <CapBar
            loading={false}
            current={90}
            cap={100}
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
            color={"#6C7CE7"}
            barConfig={{ height: 4, extraClassNames: "my-2", radius: 2 }}
            asset={"ETH"}
          />

          <CardPrice>
            <CardPriceInner>
              <CommonPart>
                <SecondaryText>Strike Price</SecondaryText>
                <Title fontSize={20}>$4200.00</Title>
              </CommonPart>
              <CurrentYield>
                <SecondaryText>Current Projected Yield</SecondaryText>
                <Title color={"#03F43E"} fontSize={20}>
                  31.24%
                  &nbsp;<SecondaryText color={"#FFFFFF"}>(APY)</SecondaryText>
                </Title>
              </CurrentYield>
              <CommonPart>
                <SecondaryText>APY Expiry</SecondaryText>
                <Title fontSize={20}>1D  4H  12M</Title>
              </CommonPart>
            </CardPriceInner>
          </CardPrice>
          <CardDesc>
            <CardDescTitle fontSize={11}>VAULT STRATEGY</CardDescTitle>
            <SecondaryText fontSize={9} lineHeight={14}>
              The vault earns yield on its ETH deposits by running a weekly automated ETH covered call strategy. 
              The vault reinvests the yield earned back into the strategy, effectively compounding the yields for depositors over time.
            </SecondaryText>
            <CardDescTitle fontSize={11}>WITHDRAWALS</CardDescTitle>
            <SecondaryText fontSize={9} lineHeight={14}>
              The vault allocates 90% of the funds deposited towards its strategy and reserves 10% of the funds deposited for withdrawals. 
              If in any given week the 10% withdrawal limit is reached, withdrawals from the vault will be disabled and depositors will have to wait until the following week in order to withdraw their funds.
              Withdrawing from the vault has a fixed withdrawal fee of 0.5%. This is to encourage longer-term depositors.
            </SecondaryText>
            <CardDescTitle fontSize={11}>RISK</CardDescTitle>
            <SecondaryText fontSize={9} lineHeight={14}>
              The primary risk for running this covered call strategy is that the vault may incur a weekly loss in the case where the call options sold by the vault expire in-the-money 
              (meaning the price of ETH is above the strike price of the call options minted by the vault).
            </SecondaryText>
          </CardDesc>
        </CardInfoPanel>
        <DepositPanel>
          <DepositInner>
            <DepoHead>
              <HeadDeposit colorActive={tabDepo} borderRadius={"10px 0px 0px 0px"} 
                onClick={() => {
                  setTabDepo(true);
                  setTabWith(false);
                }}
              >
                <Title fontSize={15}>DEPOSIT</Title>
              </HeadDeposit>
              <HeadDeposit colorActive={tabWith} borderRadius={"0px 10px 0px 0px"}
                onClick={() => {
                  setTabDepo(false);
                  setTabWith(true);
                }}
              >
                <Title fontSize={15}>WITHDRAW</Title>
              </HeadDeposit>
            </DepoHead>
            <DepoPanel display={tabDepo}>
              <DepoDiv marginTop={20}>
                <Title fontSize={20}>Current Position: 10ETH</Title>
              </DepoDiv>
              <DepoDiv marginTop={30}>
                <DepoShowValuePanel>
                  <DialogInnerText fontSize={20} color={"black"} margin={"auto 5px auto auto"}>233ETH</DialogInnerText>
                </DepoShowValuePanel>
                <DepoShowMaxPanel>
                  <DialogInnerText fontSize={12} margin={"auto"}>max</DialogInnerText>
                </DepoShowMaxPanel>
              </DepoDiv>
              <DepoDiv marginTop={40}>
                <img src={WarningIcon} alt="" width={20} height={20} style={{marginTop: 5}}/>
                <DepoWarningText fontSize={10}>Please spend the time necessary to understand the risks before depositing any funds into this strategy and Curve pools.</DepoWarningText>
              </DepoDiv>
              <DepoBtnDiv marginTop={10}>
                <DepoBtn>
                  <DialogInnerText fontSize={24} margin={"auto"} color={"white"}>Deposit ETH</DialogInnerText>
                </DepoBtn>
              </DepoBtnDiv>
              <DepoFoot marginTop={5}>
                <DepoFootDivText fontSize={15} >Contract:   0x0FAB...467A</DepoFootDivText>
                <img src={ContactIcon} alt="" width={16} height={16} />
              </DepoFoot>
            </DepoPanel>
            <DepoPanel display={tabWith}>
              <DepoDiv marginTop={20}>
                <Title fontSize={20}>Current Position: 10ETH</Title>
              </DepoDiv>
              <DepoDiv marginTop={20}>
                <div style={{borderRadius: 10, width:"80%",  backgroundColor: colors.background.one, padding: 10, display: "flex"}}>
                  <div style={{width: "70%", display: "flex", flexDirection: "column"}}>
                    <SecondaryText fontSize={10} color={colors.products.volatility}>You have a pending withdrawal:</SecondaryText>
                    <Title fontSize={14}>2 ETH</Title>
                    <SecondaryText fontSize={10}>Please return [countdown] to initate withdraw</SecondaryText>
                  </div>
                  <div style={{width: "30%"}}>
                    <PendingCancel color={colors.pending.deposit}>
                      <Title fontSize={10} color={colors.pending.deposit}>Cancel Withdraw</Title>
                    </PendingCancel>
                  </div>
                </div>
              </DepoDiv>
              <DepoDiv marginTop={30}>
                <DepoShowValuePanel>
                  <DialogInnerText fontSize={20} color={"black"} margin={"auto 5px auto auto"}>233ETH</DialogInnerText>
                </DepoShowValuePanel>
                <DepoShowMaxPanel>
                  <DialogInnerText fontSize={12} margin={"auto"}>max</DialogInnerText>
                </DepoShowMaxPanel>
              </DepoDiv>
              <DepoBtnDiv marginTop={10}>
                <DepoCloseBtn>
                  <DialogInnerText fontSize={15} margin={"10px auto"} color={"white"}>Close</DialogInnerText>
                </DepoCloseBtn>
                <WithBtn>
                  <DialogInnerText fontSize={15} margin={"10px auto"} color={"white"}>Withdraw</DialogInnerText>
                </WithBtn>
              </DepoBtnDiv>
              <DepoFoot marginTop={5}>
                <DepoFootDivText fontSize={15} >Contract:   0x0FAB...467A</DepoFootDivText>
                <img src={ContactIcon} alt="" width={16} height={16} />
              </DepoFoot>
            </DepoPanel>
          </DepositInner>
        </DepositPanel>
      </CardPartUp>
      <CardTable>
        <Title fontSize={16}>VAULT ACTIVITIES</Title>
        <TablePart>
          <thead>
            <tr style={{backgroundColor:"#202020"}}>
              <th>Action</th>
              <th>Contact</th>
              <th>Quantity</th>
              <th>Yield</th>
            </tr>
          </thead>
          <tbody>
          {
            tableData.map((result) => (
              <tr>
                <td style={{display:"flex"}}>
                  <div style={{marginRight: 20}}>
                    <img src={result.act_state==="sold" ? SoldIcon : MintIcon} alt="VectorIcon" width={20} height={20}/>
                  </div>
                  <ColumnIn>
                    <Title> {result.act_state} Contracts</Title>
                    <Title fontSize={10} color={"#9E9E9E"}>{result.act_ago} days ago</Title>
                  </ColumnIn>
                </td>
                <td>
                    <ColumnIn>
                      <span>{result.contract}</span>
                      <Title fontSize={10} color={"#9E9E9E"}>{result.contract_ago} days ago</Title>
                    </ColumnIn>
                </td>
                <td>{result.quality}</td>
                <td style={{display:"flex", justifyContent: "end"}}>
                  <ColumnIn>
                    <YieldText color={"#00FF3D"} fontSize={15}>{result.yield}</YieldText>
                    <YieldText fontSize={12}>{result.yield_add}</YieldText>
                  </ColumnIn>
                  <div style={{marginLeft: 20}}><img src={ContactIcon} alt="ContactIcon"/></div>
                </td>
              </tr>
            ))
          }
          </tbody>
        </TablePart>

        <ColumnIn>
          <ViewAllBtn>
            <Title fontSize={10}>View all</Title>
          </ViewAllBtn>
        </ColumnIn>
        
      </CardTable>
    </ModalBody>
  </StyledModal>
)};

export default BasicModalDev;
