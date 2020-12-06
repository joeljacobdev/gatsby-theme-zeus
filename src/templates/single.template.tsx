import React, { useRef } from "react";
import styled from "@emotion/styled";

import Layout from "@components/layout/Layout";
import MDXRenderer from "@components/mdx/MDX";
import Headings from '@components/headings/Headings';

import mediaqueries from "@styles/media";
import { Template } from "@types";

const Single: Template = ({ pageContext }) => {
  const contentSectionRef = useRef<HTMLElement>(null);
  const { article } = pageContext;
  return (
    <Layout>
      <Heading>{article.title}</Heading>
      <ArticleBody ref={contentSectionRef}>
        <MDXRenderer content={article.body} />
      </ArticleBody>
    </Layout>
  );
};

export default Single;

const ArticleBody = styled.article`
  position: relative;
  padding: 0 0 35px;
  padding-left: 68px;
  transition: background 0.2s linear;

  ${mediaqueries.desktop`
    padding-left: 53px;
  `}

  ${mediaqueries.tablet`
    padding: 35px 0 80px;
  `}

  ${mediaqueries.phablet`
    padding: 60px 0;
  `}
`;

const Heading = styled(Headings.h1)`
  font-size: 48px;
  font-family: ${p => p.theme.fonts.serif};
  margin: 25px 0px;
  font-weight: bold;
  text-align: center;
  line-height: 1.32;

  ${mediaqueries.tablet`
    margin-bottom: 20px;
    font-size: 36px;
  `}

  ${mediaqueries.phablet`
    font-size: 32px;
  `}
`;
