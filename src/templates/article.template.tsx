import React, {useRef, useState, useEffect} from "react";
import styled from "@emotion/styled";
import throttle from "lodash/throttle";
import {graphql, useStaticQuery} from "gatsby";

import Layout from "@components/layout/Layout";
import MDXRenderer from "@components/mdx/MDX";
import Progress from "@components/progress/Progress";
import Section from "@components/section/Section";
import Subscription from "@components/subscription/Subscription";
import Comment from "@components/comment/Comment";

import mediaqueries from "@styles/media";
import {debounce} from "@utils";

import ArticleAside from "@sections/article/Article.Aside";
import ArticleHero from "@sections/article/Article.Hero";
import ArticlesNext from "@sections/article/Article.Next";
import ArticleSEO from "@sections/article/Article.SEO";

import {Template} from "@types";

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            name
          }
        }
      }
    }
  }
`;

const Article: Template = ({pageContext, location}) => {
  const contentSectionRef = useRef<HTMLElement>(null);

  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [contentHeight, setContentHeight] = useState<number>(0);

  const results = useStaticQuery(siteQuery);
  const name = results.allSite.edges[0].node.siteMetadata.name;

  const {article, authors, mailchimp, next} = pageContext;

  useEffect(() => {
    const calculateBodySize = throttle(() => {
      const contentSection = contentSectionRef.current;

      if (!contentSection) return;

      /**
       * If we haven't checked the content's height before,
       * we want to add listeners to the content area's
       * imagery to recheck when it's loaded
       */
      if (!hasCalculated) {
        const debouncedCalculation = debounce(calculateBodySize);
        const $imgs = contentSection.querySelectorAll("img");

        $imgs.forEach($img => {
          // If the image hasn't finished loading then add a listener
          if (!$img.complete) $img.onload = debouncedCalculation;
        });

        // Prevent rerun of the listener attachment
        setHasCalculated(true);
      }

      // Set the height and offset of the content area
      setContentHeight(contentSection.getBoundingClientRect().height);
    }, 20);

    calculateBodySize();
    window.addEventListener("resize", calculateBodySize);

    return () => window.removeEventListener("resize", calculateBodySize);
  }, []);

  const disqusConfig = {
    identifier: article.slug, title: article.title
  };

  return (
    <Layout>
      <ArticleSEO article={article} authors={authors} location={location}/>
      <ArticleHero article={article} authors={authors}/>
      <ArticleAside contentHeight={contentHeight}>
        <Progress contentHeight={contentHeight}/>
      </ArticleAside>
      <ArticleBody ref={contentSectionRef}>
        <MDXRenderer content={article.body}/>
      </ArticleBody>
      {mailchimp && article.subscription && <Subscription/>}
      {next.length > 0 && (
        <NextArticle narrow>
          <FooterNext>More articles from {name}</FooterNext>
          <ArticlesNext articles={next}/>
          <FooterSpacer/>
        </NextArticle>
      )}
      <Comment config={disqusConfig}/>
    </Layout>
  );
};

export default Article;

const ArticleBody = styled.article`
  position: relative;
  padding: 70px 0 35px 68px;
  transition: background 0.2s linear;

  ${mediaqueries.desktop`
    padding-left: 53px;
  `}

  ${mediaqueries.tablet`
    padding: 60px 0 50px;
  `}

  ${mediaqueries.phablet`
    padding: 50px 0;
  `}
`;

const NextArticle = styled(Section)`
  display: block;
`;

const FooterNext = styled.h3`
  position: relative;
  opacity: 0.25;
  margin-bottom: 35px;
  font-weight: 400;
  color: ${p => p.theme.colors.primary};

  ${mediaqueries.tablet`
    margin-bottom: 30px;
  `}

  &::after {
    content: '';
    position: absolute;
    background: ${p => p.theme.colors.grey};
    width: ${(910 / 1140) * 100}%;
    height: 1px;
    right: 0;
    top: 11px;

    ${mediaqueries.tablet`
      width: ${(600 / 1140) * 100}%;
    `}

    ${mediaqueries.phablet`
      width: ${(400 / 1140) * 100}%;
    `}

    ${mediaqueries.phone`
      width: 90px
    `}
  }
`;

const FooterSpacer = styled.div`
  margin-bottom: 65px;

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `}
`;
