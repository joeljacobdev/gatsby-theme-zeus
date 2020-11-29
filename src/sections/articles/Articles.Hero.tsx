import React from 'react';
import styled from '@emotion/styled';

import Section from '@components/section/Section';
import Bio from '@components/bio/Bio';
import mediaqueries from '@styles/media';
import { IAuthor } from '@types';

const ArticlesHero: React.FC<IAuthor> = ({ authors }) => {
  const featuredAuthor = authors.find(author => author.featured);

  if (!featuredAuthor) {
    throw new Error(`
      No featured Author found.
      Please ensure you have at least featured Author.
  `);
  }

  return (
    <Section relative id="Articles__Hero">
      <SubheadingContainer>
        <Bio author={featuredAuthor} />
      </SubheadingContainer>
    </Section>
  );
};

export default ArticlesHero;

const SubheadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  ${mediaqueries.phablet`
    display: none;
  `};
`;
