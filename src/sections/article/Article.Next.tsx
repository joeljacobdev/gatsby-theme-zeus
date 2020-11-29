import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { Link } from "gatsby";

import Headings from "@components/headings/Headings";

import mediaqueries from "@styles/media";

import { IArticle } from "@types";

interface ArticlesNextProps {
  articles: IArticle[]
}

const ArticlesNext: React.FC<ArticlesNextProps> = ({ articles }) => {
  if (!articles) return null;
  const numberOfArticles = articles.length;
  return (
    <Grid numberOfArticles={numberOfArticles}>
      <GridItem article={articles[0]} />
      <GridItem article={articles[1]} />
    </Grid>
  );
};

export default ArticlesNext;

interface GridItemProps {
  article: IArticle;
  narrow?: boolean;
}

const GridItem: React.FC<GridItemProps> = ({ article }) => {
  if (!article) return null;

  return (
    <ArticleLink
      to={article.slug}
      data-a11y="false"
    >
      <Item>
        <Title dark>
          {article.title}
        </Title>
        <Excerpt>{article.excerpt}</Excerpt>
        <MetaData>
          {article.date} · {article.timeToRead} min read
        </MetaData>{" "}
      </Item>
    </ArticleLink>
  );
};

const limitToTwoLines = css`
  text-overflow: ellipsis;
  overflow-wrap: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;

  ${mediaqueries.phablet`
    -webkit-line-clamp: 3;
  `}
`;
const Grid = styled.div<{ numberOfArticles: number }>`
  position: relative;
  display: grid;
  ${p => {
    if (p.numberOfArticles === 1) {
      return `
      grid-template-columns: 1fr;
      grid-template-rows: 1
    `;
    } else {
      return `
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 2;
      `;
    }
  }}
  column-gap: 20px;
  margin: 0 auto;
  padding: 5px;
  max-width: ${p => (p.numberOfArticles === 1 ? "680px" : "100%")};

  ${mediaqueries.desktop`
    grid-template-columns: 1fr 1fr;
  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
  `}
`;

const Item = styled.div`
  position: relative;

  ${mediaqueries.tablet`
    margin-bottom: 10px;
  `}

  @media (max-width: 540px) {
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    background: ${p => p.theme.colors.card};
  }
`;

const Title = styled(Headings.h3)`
  font-size: 22px;
  line-height: 1.4;
  margin-bottom: 10px;
  color: ${p => p.theme.colors.primary};
  font-family: ${p => p.theme.fonts.serif};
  transition: color 0.3s ease-in-out;
  ${limitToTwoLines};

  ${mediaqueries.tablet`
    margin-bottom: 15px;
  `}
  ${mediaqueries.phablet`
    padding: 30px 20px 0;
    margin-bottom: 10px;
    -webkit-line-clamp: 3;
  `}
`;

const Excerpt = styled.p`
  ${limitToTwoLines};
  font-size: 16px;
  margin-bottom: 10px;
  color: ${p => p.theme.colors.grey};

  ${mediaqueries.desktop`
    display: -webkit-box;
  `}

  ${mediaqueries.tablet`
    margin-bottom: 15px;
  `}

  ${mediaqueries.phablet`
    max-width: 100%;
    padding:  0 20px;
    margin-bottom: 20px;
    -webkit-line-clamp: 3;
  `}
`;

const MetaData = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${p => p.theme.colors.grey};
  opacity: 0.33;

  ${mediaqueries.phablet`
    max-width: 100%;
    padding:  0 20px 30px;
  `}
`;

const ArticleLink = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  transition: transform 0.33s var(--ease-out-quart);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  &:hover h2,
  &:focus h2 {
    color: ${p => p.theme.colors.accent};
  }

  &[data-a11y="true"]:focus::after {
    content: "";
    position: absolute;
    left: -2%;
    top: -2%;
    width: 104%;
    height: 104%;
    border: 3px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
  }

  ${mediaqueries.phablet`

    &:active {
      transform: scale(0.97) translateY(3px);
    }
  `}
`;
