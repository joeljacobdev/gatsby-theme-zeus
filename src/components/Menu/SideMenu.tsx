import React from "react";
import styled from "@emotion/styled";
import { graphql, useStaticQuery } from "gatsby";

import MenuItem from "./MenuItem";

const siteQuery = graphql`
  {
    allMenuItem {
      nodes {
        name
        id
        slug
        identifier
      }
    }
  }
`;

const SideMenu: React.FC<{isVisible: boolean}> = ({isVisible = false}) => {
  const results = useStaticQuery(siteQuery);
  return(
    isVisible ?
      <SideMenuItemsWrapper>
        <MenuItems menus={results.allMenuItem.nodes} />
      </SideMenuItemsWrapper> :
      null
  )
};

const MenuItems: React.FC<{}> = ({ menus }) => {
  return menus.map(function(menu) {
    return <MenuItem key={menu.id} menu={menu} />
  })
}

const SideMenuItemsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    flex-direction: column;
    align-items: center;
`
export default SideMenu;
