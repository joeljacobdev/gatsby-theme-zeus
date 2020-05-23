import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

// refering to https://github.com/wesbos/Gatsby-Workshop/blob/master/notes/04%20-%20Images.md
const MdxImg: React.FC<{}> = props => {
	const { src, alt } = props
	const name = src.split('/').pop()
  const { allImageSharp } = useStaticQuery(graphql`
    query {
      allImageSharp {
        edges {
          node {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid_withWebp
              originalName
            }
          }
        }
      }
    }
	`);
  const image = allImageSharp.edges.find(
    edge => edge.node.fluid.originalName === name
	);
  if (!image) {
    return null;
	}
	return <Img fluid={image.node.fluid} alt={alt} />;
}

export default MdxImg;