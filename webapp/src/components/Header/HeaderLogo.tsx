import { Link } from "react-router-dom";
import styled from "styled-components";

import AppLogo from "shared/src/assets/imgs/header/goldacorn.png";

const LogoContainer = styled.div`
  display: flex;
  border-radius: 48px;
`;

const HeaderLogo = () => {
  return (
    <>
      <LogoContainer>
        <Link to="/">
          <img src={AppLogo} alt="" width="49px" height="45px"/>
        </Link>
      </LogoContainer>
    </>
  );
};

export default HeaderLogo;
