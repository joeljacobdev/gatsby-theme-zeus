import React, { useRef } from "react";
import styled from "@emotion/styled";

import Layout from "@components/Layout";
import MDXRenderer from "@components/MDX";
import Headings from '@components/Headings';

import mediaqueries from "@styles/media";
import ArticleControls from "@sections/article/Article.Controls";

import { Template } from "@types";

const Single: Template = ({ pageContext, location }) => {
  const contentSectionRef = useRef<HTMLElement>(null);
  const { article } = pageContext;
  return (
    <Layout>
      <MobileControls>
        <ArticleControls />
      </MobileControls>
      <Heading>{article.title}</Heading>
      <ArticleBody ref={contentSectionRef}>
        <MDXRenderer content={article.body}>
        </MDXRenderer>
      </ArticleBody>
    </Layout>
  );
};

export default Single;

const MobileControls = styled.div`
  position: relative;
  padding-top: 60px;
  transition: background 0.2s linear;
  text-align: center;

  ${mediaqueries.tablet_up`
    display: none;
  `}
`;

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