import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { graphql, useStaticQuery } from "gatsby";

import mediaqueries from "@styles/media"

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

const Menu: React.FC<{}> = () => {
    const results = useStaticQuery(siteQuery);
    return(
        <MenuItemsWrapper>
            <MenuItems menus={results.allMenuItem.nodes} />
        </MenuItemsWrapper>
    )
};

const MenuItems: React.FC<{}> = ({ menus }) => {
    return menus.map(function(menu) {
        return <MenuItem key={menu.id} menu={menu} />
    })
}

const MenuItemsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;

    ${mediaqueries.tablet`
        flex-direction: column;
        align-items: center;
        margin-bottom: 10px;
    `}
`
export default Menu;