import React from "react";
import styled from "@emotion/styled";

import Section from "@components/section/Section";
import SEO from "@components/seo/SEO";
import Layout from "@components/layout/Layout";
import Paginator from "@components/navigation/Navigation.Paginator";

import AuthorHero from "../sections/author/Author.Hero";
import AuthorArticles from "../sections/author/Author.Articles";

import { Template } from "@types";

const ArticlesPage: Template = ({ location, pageContext }) => {
  const author = pageContext.additionalContext.author;
  const articles = pageContext.group;

  return (
    <Layout>
      <SEO
        pathname={location.pathname}
        title={author.name}
        description={author.bio}
      />
      <Section narrow>
        <AuthorHero author={author} />
        <AuthorArticles articles={articles} />
        <AuthorPaginator>
          <Paginator {...pageContext} />
        </AuthorPaginator>
      </Section>
      <AuthorsGradient />
    </Layout>
  );
}

export default ArticlesPage;

const AuthorsGradient = styled.div`
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

const AuthorPaginator = styled.div`
  text-align: center;
`;
