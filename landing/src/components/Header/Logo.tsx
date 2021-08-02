import { Link } from "react-router-dom";
import styled from "styled-components";

import AppLogo from 'shared/src/assets/imgs/header/goldacorn.png';

const LogoContainer = styled.div`
  display: flex;
  border-radius: 48px;
`;

const Logo = () => {
  return (
    <>
      <LogoContainer>
        <Link to="/">
          <img src={AppLogo} alt= "" height={"45px"} width={"49px"} />
        </Link>
      </LogoContainer>
    </>
  );
};

export default Logo;
