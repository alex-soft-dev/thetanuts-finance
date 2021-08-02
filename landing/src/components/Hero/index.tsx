import styled from "styled-components";
import {Button } from "../../designSystem";
import { Card, Container } from "react-bootstrap";

import sizes from "../../designSystem/sizes";
import PosePicture from 'shared/src/assets/imgs/landing/PosePicture.png';
import BackEffect from 'shared/src/assets/imgs/landing/Group.svg';

const MainContainer = styled(Container)`
  margin: auto;
  margin-top: 200px;
  // @media (max-width: ${sizes.md}px) {
  //   height: 540px;
  // }
  position: absolute;
  top: 0px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  
  @media (max-width: 1366px) {
    display: ;
    font-size: 24px;
  }
`;

const LeftContent = styled.div`
  // text-align:center;
`;

const CardDownContent = styled.div`
  margin-top: 40.47px;
  margin-right: 100px;
  // font-family: Barlow Semi Condensed;
  font-style: normal;
`;

const CardDownTitle = styled.div`
  font-weight: 500;
  font-size: 45.0339px;
  line-height: 60px;
  color: #0DE8B4;
`;

const CardDownSubContent = styled.div`
  width: 567.12px;
  font-weight: normal;
  font-size: 24.4026px;
  line-height: 29px;

  color: #FFFFFF;
`;

const CardDownButtonMain = styled.div`
  margin-top: 24.68px;
`;

const CardDownButtonText = styled.div`
  font-weight: bold;
  font-size: 27.7503px;
  font-family: Barlow Semi Condensed;
  font-style: normal;
  line-height: 33px;
  /* identical to box height */
  z-index: 10;
  color: #000000;
  text-transform: initial;
`;

const CardDownButton = styled(Button)`
  background: linear-gradient(180deg, #3AFF78 -9.6%, #00E2C5 109.6%);
  border-radius: 98.7147px;
  border-style: none;
`;

const RightContent = styled.div`
  margin-top: -100px;
  @media (max-width: 1366px) {
    // margin-top: 50px;
  }
`;

const CardFrame = styled.div`
  top: 15px;
  position: absolute;
`;

const CardMain = styled(Card)`
  font-family: Open Sans Condensed:300;
  font-style: normal;
  color: #FFFFFF;

  border: 0.493573px solid #FFFF;
  box-sizing: border-box;
  border-radius: 29.6144px;
  background: #575D6B;
  margin-right: 200px;
  opacity: 0.15;

  width: 475px;
  height: 183px;
`;

const CardTitle = styled(Card.Title)`
  font-size: 33px;
  font-weight: 100;
  line-height: 35px;
  margin-left: 33px;
  margin-top: 22px;
  color: white;
`;

const CardText = styled(Card.Text)`
  font-weight: bold;
  font-size: 56px;
  line-height: 65px;
  margin-left: 30px;
  color: white;
`;

const MainContent = styled.div`
  position: relative;
`;

const Effect = styled.img`
  // position: absolute;
  opacity: 0.4;
  margin-top: 45px;
  width: 100%;
  height: 822px;
`;

const Hero = () => {
  return (
    <MainContent>
      <Effect src={BackEffect} />
      <MainContainer fluid>
        <InnerContainer>
          <LeftContent>
            <CardMain />
            <CardFrame>
              <CardTitle>Highest Projected APY</CardTitle>
              <CardText>43.34%</CardText>
            </CardFrame>
            <CardDownContent>
              <CardDownTitle>DECENTRALISED OPTIONS</CardDownTitle>
              <CardDownSubContent>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum</CardDownSubContent>
              <CardDownButtonMain>
                <CardDownButton>
                  <CardDownButtonText>Start earning up to 43.34% APY</CardDownButtonText>
                </CardDownButton>
              </CardDownButtonMain>
            </CardDownContent>
          </LeftContent>
          <RightContent>
            <img src={PosePicture} alt= "" width="610px" height="610px"/>
          </RightContent>
        </InnerContainer>
      </MainContainer>
    </MainContent>
  );
};

export default Hero;
