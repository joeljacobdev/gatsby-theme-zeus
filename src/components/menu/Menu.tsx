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
            {results.allMenuItem.nodes.map(function(menu) {
                return <MenuItem key={menu.id} menu={menu} />
            })}
        </MenuItemsWrapper>
    )
};

const MenuItemsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    ${mediaqueries.tablet`
        display: none;
    `}
`
export default Menu;
