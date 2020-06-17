import React from "react";
import { Disqus } from "gatsby-plugin-disqus";
import Section from "@components/Section";
import styled from "@emotion/styled";


const Comment = ({ config }) => {
  return <>{process.env.GATSBY_DISQUS_NAME &&  <CommentContainer><Disqus config={config}/></CommentContainer>}</>;
}

const CommentContainer = styled(Section)`
  display: block;
`;

export default  Comment;
