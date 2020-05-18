import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Link, navigate, graphql, useStaticQuery } from "gatsby";

import mediaqueries from "@styles/media"

import MenuItem from "./MenuItem";

const siteQuery = graphql`
{
    site {
      siteMetadata {
        menuItems {
          name
          slug
          identifier
        }
      }
    }
  }
`;

const Menu: React.FC<{}> = () => {
    const results = useStaticQuery(siteQuery);
    return(
        <MenuItemsWrapper>
            <MenuItems menus={results.site.siteMetadata.menuItems} />
        </MenuItemsWrapper>
    )
};

const MenuItems: React.FC<{}> = ({ menus }) => {
    return menus.map(function(menu) {
        return <MenuItem menu={menu} />
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