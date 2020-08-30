import React from "react";
import styled from "@emotion/styled";
import { useColorMode } from "theme-ui";

import { Link } from 'gatsby';
import mediaqueries from "../../styles/media";


const MenuItem: React.FC<{}> = ({ menu }) => {
    const [colorMode] = useColorMode();
    const isDark = colorMode === `dark`;
    return(
        <ItemWrapper isDark={isDark}>
            <Link
              to={`${menu.slug}`}
              aria-label={`Go to ${menu.name}`}
              title={`Go to ${menu.name}`}
            >
                {menu.name}
            </Link>
        </ItemWrapper>
    )
}

const ItemWrapper = styled.div`
    padding: 2rem;
    display: inline;

    a {
        font-weight: 600;
        font-size: 2.5rem;
        font-family: ${props => props.theme.fonts.sansSerif};
        color: ${props => (props.isDark ? "#fff" : "#000")};

        &:hover {
          color: red;
        }
    }

    ${mediaqueries.tablet`
      padding: 0.25rem 1rem;
    `};
`

export default MenuItem
