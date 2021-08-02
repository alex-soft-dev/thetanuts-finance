import React, { useState } from "react";
import styled from "styled-components";

import Logo from "./Logo";
import colors from "shared/lib/designSystem/colors";
import sizes from "../../designSystem/sizes";
import { Title, BaseLink, Button } from "../../designSystem";
import MenuButton from "./MenuButton";
import { NavItemProps, MobileMenuOpenProps } from "./types";
import theme from "../../designSystem/theme";
import MobileOverlayMenu from "shared/lib/components/Common/MobileOverlayMenu";
import LangIcon from "shared/src/assets/imgs/header/lang-icon.png";

const HeaderContainer = styled.div<MobileMenuOpenProps>`
  // height: ${theme.header.height}px;
  height: 100px;
  width: 100%;
  background: #010C1A;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
  
  // Set Font
  font-family: Barlow;
  font-style: normal;
  font-weight: bold;
  
  // border-bottom: 1px solid ${colors.border};

  @media (max-width: ${sizes.md}px) {
    padding: 16px 24px;
    border-bottom: none;
  }

  z-index: ${(props) => (props.isMenuOpen ? 50 : 10)};
  // The backdrop for the menu does not show up if we enable the backdrop-filter
  // for the header nav. To get around that, just set 'none'
  ${(props) => {
    if (props.isMenuOpen) {
      return null;
    }

    return `
      backdrop-filter: blur(40px);
      /**
       * Firefox desktop come with default flag to have backdrop-filter disabled
       * Firefox Android also currently has bug where backdrop-filter is not being applied
       * More info: https://bugzilla.mozilla.org/show_bug.cgi?id=1178765
       **/
      @-moz-document url-prefix() {
        background-color: rgba(0, 0, 0, 0.9);
      }
    `;
  }}
`;

const LogoContainer = styled.div`
  padding-left: 29px;
  z-index: 1000;
  display: flex;

  @media (max-width: ${sizes.md}px) {
    padding-left: 0;
  }
`;

const HeaderAbsoluteContainer = styled.div`
  display: flex;
  width: 70%;
  justify-content: right;

  @media (max-width: ${sizes.md}px) {
    display: none;
  }
`;

const LinksContainer = styled.div`
  display: flex;
`;

const NavItem = styled.div<NavItemProps>`
  display: flex;
  align-items: center;
  padding: 0px 28px;
  height: 100%;
  opacity: ${(props) => (props.isSelected ? "0.48" : "1")};

  &:hover {
    opacity: ${(props) => (props.isSelected ? "1" : theme.hover.opacity)};
  }

  @media (max-width: ${sizes.md}px) {
    padding: 0px 0px 40px 48px;
  }
`;

const NavLinkText = styled(Title)`
  letter-spacing: 1.5px;
  font-size: 22px;
  line-height: 20px;
  font-family: Barlow;
  font-style: normal;
  font-weight: normal;
  text-transform: none;

  @media (max-width: ${sizes.md}px) {
    font-size: 24px;
  }
`;

const SecondaryMobileNavItem = styled.div`
  display: none;

  @media (max-width: ${sizes.md}px) {
    display: flex;
    padding: 0px 0px 24px 48px;
  }
`;

const SecondaryMobileNavLinktext = styled(Title)`
  font-size: 18px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.48);
`;

const MobileOnly = styled.div`
  display: none;

  @media (max-width: ${sizes.md}px) {
    display: flex;
  }
`;

const ButtonText = styled.div`
  width: 150px;
  font-family: Barlow;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  text-align: center;
  text-transform: capitalize;
  color: #000000;
`;

const AppButton = styled(Button)`
  // padding: 4px 10px;  
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 12px;
  border-radius: 50px;
  background: linear-gradient(180deg, #3AFF78 -9.6%, #00E2C5 109.6%);
  border: none;

  &:hover {
    opacity: ${theme.hover.opacity};
  }
`;

const ButtonContainer = styled.div`
  z-index: 0;
  justify-content: right;
  margin-right: 70px;

  @media (max-width: ${sizes.md}px) {
    display: none;
  }
`;

const LogoText = styled.div`
  font-size: 28px;
  // line-height: 38px;
  /* identical to box height */
  color: #F6F3ED;
  margin-left: 7px;
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderLinkItem = (
    title: string,
    to: string,
    isSelected: boolean,
    primary: boolean = true,
    external: boolean = false
  ) => {
    return (
      <BaseLink
        to={to}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
        onClick={onToggleMenu}
      >
        {primary ? (
          <NavItem isSelected={isSelected}>
            <NavLinkText>{title}</NavLinkText>
          </NavItem>
        ) : (
          <SecondaryMobileNavItem>
            <SecondaryMobileNavLinktext>{title}</SecondaryMobileNavLinktext>
          </SecondaryMobileNavItem>
        )}
      </BaseLink>
    );
  };

  return (
    <HeaderContainer
      isMenuOpen={isMenuOpen}
      className="d-flex align-items-center justify-content-between"
    >
      {/* LOGO */}
      <LogoContainer>
        <Logo />
        <LogoText>ThetaNuts</LogoText>
      </LogoContainer>
      {/* LINKS */}
      <HeaderAbsoluteContainer>
        <LinksContainer>
          {renderLinkItem("Community", "https://docs.ribbon.finance", false)}
          {renderLinkItem("Developer", "https://docs.ribbon.finance", false)}
          <img src={LangIcon} alt= "" width="33.42px" height="33.42px" style={{ marginLeft: 23, marginRight: -20 }}/>
          {renderLinkItem("en", "https://docs.ribbon.finance", false)}
        </LinksContainer>
      </HeaderAbsoluteContainer>

      <ButtonContainer>
        <a href="http://localhost:3001">
          <AppButton>
            <ButtonText>Launch App</ButtonText>
          </AppButton>
        </a>
      </ButtonContainer>

      {/* MOBILE MENU */}
      <MobileOnly>
        <MenuButton onToggle={onToggleMenu} isOpen={isMenuOpen} />
        <MobileOverlayMenu
          className="flex-column align-items-center justify-content-center"
          isMenuOpen={isMenuOpen}
          onClick={onToggleMenu}
          boundingDivProps={{
            style: {
              marginRight: "auto",
            },
          }}
          style={{ paddingTop: 40 }}
        >
          {renderLinkItem("START EARNING", "https://app.ribbon.finance", true)}
          {renderLinkItem("FAQs", "/faq", false, false, true)}
          {renderLinkItem(
            "BLOG",
            "https://medium.com/@ribbonfinance",
            false,
            false,
            true
          )}
          {renderLinkItem(
            "SNAPSHOT",
            "https://snapshot.org/#/rbn.eth",
            false,
            false,
            true
          )}
          {renderLinkItem(
            "DISCORD",
            "http://tiny.cc/ribbon-discord",
            false,
            false,
            true
          )}
          {renderLinkItem(
            "TWITTER",
            "https://twitter.com/ribbonfinance",
            false,
            false,
            true
          )}
          {renderLinkItem(
            "GITHUB",
            "https://github.com/ribbon-finance",
            false,
            false,
            true
          )}
          {renderLinkItem("POLICY", "/policy", false, false, true)}
          {renderLinkItem("TERMS", "/terms", false, false, true)}
        </MobileOverlayMenu>
      </MobileOnly>
    </HeaderContainer>
  );
};

export default Header;
