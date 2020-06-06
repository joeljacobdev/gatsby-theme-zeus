import React from "react";
import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from "@components/Layout";
import Paginator from "@components/Navigation/Navigation.Paginator";

import ArticlesList from "../sections/articles/Articles.List";

import { Template } from "@types";

const MenuPage: Template = ({ location, pageContext }) => {
  const articles = pageContext.group;

  return (
    <Layout>
      <SEO pathname={location.pathname} />
      <Section narrow>
        <ListWrapper>
        <ArticlesList articles={articles} />
        <ArticlesPaginator show={pageContext.pageCount > 1}>
          <Paginator {...pageContext} />
        </ArticlesPaginator>
        </ListWrapper>
      </Section>
      <ArticlesGradient />
    </Layout>
  );
};

export default MenuPage;

const ListWrapper = styled.div`
  ${mediaqueries.desktop`
    margin-top: 30px;
  `}
`

const ArticlesGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 590px;
  z-index: 0;
  pointer-events: none;
  background: ${p => p.theme.colors.gradient};
  transition: ${p => p.theme.colorModeTransition};
`;

const ArticlesPaginator = styled.div<{ show: boolean }>`
  ${p => p.show && `margin-top: 50px;`}
`;
