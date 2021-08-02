import { Col, Row } from "react-bootstrap";
import styled from "styled-components";

import PortfolioPerformance from "../../components/Portfolio/PortfolioPerformance";
import PortfolioPositions from "../../components/Portfolio/PortfolioPositions";
import PortfolioTransactions from "../../components/Portfolio/PortfolioTransactions";
import { Title } from "shared/lib/designSystem";
import useScreenSize from "shared/lib/hooks/useScreenSize";

const PerformanceTitle = styled(Title)`
  margin-top: 48px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  line-height: 45px;
  font-size: 38px;
`;

const PortoBack = styled.div<{ screenHeight: number }>`
  background: radial-gradient(71.84% 71.84% at 50% 28.16%, #454A75 0%, #000000 100%);
  width: 100%;
  // height: ${(props)=>props.screenHeight}px;
`;

const PortfolioPage = () => {
  const { height: screenHeight } = useScreenSize();
  return (
    <PortoBack screenHeight={screenHeight}>
      {/* <Container> */}
      <div style={{paddingRight: 100, paddingLeft: 100}}>
        <Row>
          <Col className="d-flex flex-wrap">
          {/* <Col> */}
            <PerformanceTitle>Portofolio Summary</PerformanceTitle>
            <PortfolioPerformance />
            <PortfolioPositions />
            <PortfolioTransactions />
          </Col>
        </Row>
      </div>
      {/* </Container> */}
    </PortoBack>
  );
};

export default PortfolioPage;
