import styled from "styled-components";
import {
  SecondaryText,
  Title,
} from "shared/lib/designSystem";
import colors from "shared/lib/designSystem/colors";
import theme from "shared/lib/designSystem/theme";
import sizes from "shared/lib/designSystem/sizes";
import PendingActivity from "../Common/PendingActivity";

const PerformanceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  // background: ${colors.background.two};
  border-radius: ${theme.border.radius};
  margin-top: 24px;
`;

const KPIColumn = styled.div`
  width: calc(100% / 4);
  padding: 16px 0px;
  display: flex;
  flex-wrap: wrap;
  border-left: ${theme.border.width} ${theme.border.style} ${colors.border};

  &:first-child {
    border-left: none;
  }

  @media (max-width: ${sizes.md}px) {
    width: 100%;
    border-left: unset;
    border-top: ${theme.border.width} ${theme.border.style} ${colors.border};

    &:first-child {
      border-top: none;
    }
  }
`;

const KPI = styled.div
<{ width: number}>
`
  // display: flex;
  align-items: center;
  width: ${(props) => (props.width)}%;
`;

const KPIText = styled(Title)<{ active: boolean; state?: "green" | "red" }>`
  line-height: 24px;
  font-weight: bold;
  color: ${(props) => {
    if (!props.active) {
      return "rgba(255, 255, 255, 0.4)";
    }

    switch (props.state) {
      case "green":
        return colors.portogreen;
      case "red":
        return colors.red;
      default:
        return colors.primaryText;
    }
  }};
`;

const PendingMain = styled.div`
  position: absolute;
  top: 4px;
  left: 10px;
  display: flex;
  width: 1170px;
  overflow-x: auto;
  &::-webkit-scrollbar-track
  {
    // -webkit-box-shadow: inset 0 0 6px #454A75;
    background-color: #131727;
    mix-blend-mode: multiply;
    opacity: 0.6;
    border-radius: 30px;
  }
  &::-webkit-scrollbar
  {
    height: 8px;
    background-color: #233447;
    border-radius: 30px;
  }
  &::-webkit-scrollbar-thumb
  {
    background: #454A75;
    mix-blend-mode: normal;
    border-radius: 30px;
  }
`;

const PendingBackground = styled.div`
  background: #041528;
  width: 100%;
  height: 100%;
  opacity: 0.2;
  border-radius: 5px;
`;

const PendingArea = styled.div`
  position: relative;
  width: 70%;
`;

const PortfolioPerformance = () => {

  return (
    <PerformanceContainer>
      <KPIColumn>
        <SecondaryText fontSize={18} color={colors.primaryText} className="w-100">
          Balance(USD)
        </SecondaryText>
        <Title fontSize={48}>$ 461,322.38</Title>
        {/* <KPIText active={active}>{renderRBNBalanceText()}</KPIText> */}
        <KPI width={70}>
          <div>
            <SecondaryText fontSize={12} className="w-100">Yield Earned</SecondaryText>
          </div>
          <KPIText fontSize={20}
            active={true
              // active
            }
            state={"green"
              // calculatedKPI.yield === 0
              //   ? undefined
              //   : calculatedKPI.yield > 0
              //   ? "green"
              //   : "red"
            }
          >
            $ 138,396.714
            {/* {renderYieldEarnedText()} */}
          </KPIText>
        </KPI>
        <KPI width={30}>
          <div>
            <SecondaryText fontSize={12} className="w-100">
              ROI
            </SecondaryText>
          </div>
          <KPIText fontSize={20}
            active={true
              // active
            }
            state={"green"
              // calculatedKPI.roi === 0
              //   ? undefined
              //   : calculatedKPI.roi > 0
              //   ? "green"
              //   : "red"
            }
          >
            {/* {renderRoiText()} */}
            +30.00%
          </KPIText>
        </KPI>
      </KPIColumn>
      {/* <div style={{width:'5%'}}></div> */}
      <PendingArea>
        <PendingBackground></PendingBackground>
        <PendingMain>
          <PendingActivity space={true}/> {/* if space is true, margin-right will be 30px. not, 0px. */}
          <PendingActivity space={true}/>
          <PendingActivity space={true}/>
          <PendingActivity space={true}/>
          <PendingActivity space={false}/>
        </PendingMain>
      </PendingArea>
    </PerformanceContainer>
  );
};

export default PortfolioPerformance;
