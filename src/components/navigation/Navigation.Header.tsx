import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import styled from "@emotion/styled";
import { Link, graphql, useStaticQuery } from "gatsby";
import { useColorMode } from "theme-ui";

import Logo from "@components/logo/Logo";
import Menu from "@components/menu/Menu";
import SideMenu from "@components/menu/SideMenu";

import mediaqueries from "@styles/media";
import {
  getWindowDimensions,
  getBreakpointFromTheme,
} from "@utils";
import {toggleSideMenu} from "../../state/actions/menu";

const siteQuery = graphql`
  {
    sitePlugin(name: { eq: "gatsby-theme-zeus" }) {
      pluginOptions {
        rootPath
        basePath
      }
    }
  }
`;

const DarkModeToggle: React.FC<{}> = () => {
  const [colorMode, setColorMode] = useColorMode();
  const isDark = colorMode === `dark`;

  function toggleColorMode(event) {
    event.preventDefault();
    setColorMode(isDark ? `light` : `dark`);
  }

  return (
    <IconWrapper
      isDark={isDark}
      onClick={toggleColorMode}
      data-a11y="false"
      aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
      title={isDark ? "Activate light mode" : "Activate dark mode"}
    >
      <MoonOrSun isDark={isDark} />
      <MoonMask isDark={isDark} />
    </IconWrapper>
  );
};

const NavigationHeader: React.FC<{}> = ({isSideMenuOpened, toggleSideMenu}) => {
  const [showBackArrow, setShowBackArrow] = useState<boolean>(false);
  const [previousPath, setPreviousPath] = useState<string>("/");
  const { sitePlugin } = useStaticQuery(siteQuery);

  const [colorMode] = useColorMode();
  const fill = colorMode === "dark" ? "#fff" : "#000";
  const { rootPath, basePath } = sitePlugin.pluginOptions;

  useEffect(() => {
    const { width } = getWindowDimensions();
    const phablet = getBreakpointFromTheme("phablet");

    const prev = localStorage.getItem("previousPath");
    const previousPathWasHomepage =
      prev === (rootPath || basePath) || (prev && prev.includes("/page/"));
    const currentPathIsHomepage =
      location.pathname === (rootPath || basePath) || location.pathname.includes("/page/");

    setShowBackArrow(
      previousPathWasHomepage && !currentPathIsHomepage && width <= phablet,
    );
    setPreviousPath(prev);
  }, []);

  return (
    <>
      <div>
        <NavContainer>
            <LogoLink
              to={rootPath || basePath}
              data-a11y="false"
              title="Navigate back to the homepage"
              aria-label="Navigate back to the homepage"
            >
              <Logo fill={fill} />
              <Hidden>Navigate back to the homepage</Hidden>
            </LogoLink>
            <NavMenuContainer>
              <Menu />
              <MenuToggle
                className={isSideMenuOpened?"open":""}
                onClick={() => toggleSideMenu(!isSideMenuOpened)}
                data-a11y="false"
                aria-label="Toggle menu"
                title="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </MenuToggle>
              <DarkModeToggle />
            </NavMenuContainer>
        </NavContainer>
        <SideMenu isVisible={isSideMenuOpened}/>
      </div>
    </>
  )
};

const mapStateToProps = ({ isSideMenuOpened }) => ({ isSideMenuOpened });

const mapDispatchToProps = dispatch => ({
  toggleSideMenu: (isSideMenuOpened) => dispatch(toggleSideMenu(isSideMenuOpened)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationHeader);

const BackArrowIconContainer = styled.div`
  transition: 0.2s transform var(--ease-out-quad);
  opacity: 0;
  padding-right: 30px;
  animation: fadein 0.3s linear forwards;

  @keyframes fadein {
    to {
      opacity: 1;
    }
  }

  ${mediaqueries.desktop_medium`
    display: none;
  `}
`;

const NavContainer = styled.div`
  position: relative;
  z-index: 100;
  margin: 0 50px;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;

  @media screen and (min-width: 600px) {
    padding: 20px 0;
  }
`;

const NavMenuContainer = styled.div`
  display: flex;
`;

const LogoLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  left: 0;

  ${mediaqueries.desktop_medium`
    left: 0
  `}

  &[data-a11y="true"]:focus::after {
    content: "";
    position: absolute;
    left: -10%;
    top: -30%;
    width: 120%;
    height: 160%;
    border: 2px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  &:hover {
    ${BackArrowIconContainer} {
      transform: translateX(-3px);
    }
  }
`;

const IconWrapper = styled.button<{ isDark: boolean }>`
  opacity: 0.5;
  position: relative;
  border-radius: 5px;
  width: 40px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  margin: 2.2rem 1rem;

  &:hover {
    opacity: 1;
  }

  &[data-a11y="true"]:focus::after {
    content: "";
    position: absolute;
    left: 0;
    top: -30%;
    width: 100%;
    height: 160%;
    border: 2px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.tablet`
    display: inline-flex;
    margin-left: 10px;

    &:hover {
      opacity: 0.5;
    }
  `}
`;

// This is based off a codepen! Much appreciated to: https://codepen.io/aaroniker/pen/KGpXZo
const MoonOrSun = styled.div<{ isDark: boolean }>`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: ${p => (p.isDark ? "4px" : "2px")} solid
    ${p => p.theme.colors.primary};
  background: ${p => p.theme.colors.primary};
  transform: scale(${p => (p.isDark ? 0.55 : 1)});
  transition: all 0.45s ease;
  overflow: ${p => (p.isDark ? "visible" : "hidden")};

  &::before {
    content: "";
    position: absolute;
    right: -9px;
    top: -9px;
    height: 24px;
    width: 24px;
    border: 2px solid ${p => p.theme.colors.primary};
    border-radius: 50%;
    transform: translate(${p => (p.isDark ? "14px, -14px" : "0, 0")});
    opacity: ${p => (p.isDark ? 0 : 1)};
    transition: transform 0.45s ease;
  }

  &::after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 -23px 0 ${p => p.theme.colors.primary},
      0 23px 0 ${p => p.theme.colors.primary},
      23px 0 0 ${p => p.theme.colors.primary},
      -23px 0 0 ${p => p.theme.colors.primary},
      15px 15px 0 ${p => p.theme.colors.primary},
      -15px 15px 0 ${p => p.theme.colors.primary},
      15px -15px 0 ${p => p.theme.colors.primary},
      -15px -15px 0 ${p => p.theme.colors.primary};
    transform: scale(${p => (p.isDark ? 1 : 0)});
    transition: all 0.35s ease;

    ${p => mediaqueries.tablet`
      transform: scale(${p.isDark ? 0.92 : 0});
    `}
  }
`;

const MoonMask = styled.div<{ isDark: boolean }>`
  position: absolute;
  right: -1px;
  top: -8px;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  border: 0;
  background: ${p => p.theme.colors.background};
  transform: translate(${p => (p.isDark ? "14px, -14px" : "0, 0")});
  opacity: ${p => (p.isDark ? 0 : 1)};
  transition: ${p => p.theme.colorModeTransition}, transform 0.45s ease;
`;

// Based on codepen. https://codepen.io/designcouch/pen/Atyop
const MenuToggle = styled.div`
  width: 50px;
  height: 35px;
  position: relative;
  margin: 20px auto;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
  cursor: pointer;
  display: none;
  ${mediaqueries.tablet`
    display: inline;
  `}

  span {
    display: block;
    position: absolute;
    height: 7px;
    width: 100%;
    background: ${p => p.theme.colors.primary};
    border-radius: 7px;
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: .25s ease-in-out;
    -moz-transition: .25s ease-in-out;
    -o-transition: .25s ease-in-out;
    transition: .25s ease-in-out;
  };

  span:nth-of-type(1) {
    top: 0;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
  }

  span:nth-of-type(2) {
    top: 14px;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
  }

  span:nth-of-type(3) {
    top: 28px;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
  }
  &.open {
    span:nth-of-type(1) {
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      transform: rotate(45deg);
      top: -4px;
      left: 7px;
    }
    span:nth-of-type(2) {
      width: 0%;
      opacity: 0;
    }
    span:nth-of-type(3) {
      -webkit-transform: rotate(-45deg);
      -moz-transform: rotate(-45deg);
      -o-transform: rotate(-45deg);
      transform: rotate(-45deg);
      top: 31px;
      left: 7px;
    }
}
`

const Hidden = styled.span`
  position: absolute;
  display: inline-block;
  opacity: 0;
  width: 0;
  height: 0;
  visibility: hidden;
  overflow: hidden;
`;
