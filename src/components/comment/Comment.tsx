import React, {useEffect, useState} from "react";
import {Disqus} from "gatsby-plugin-disqus";
import Section from "@components/section/Section";
import styled from "@emotion/styled";


const Comment = ({config}) => {
  const [isLoaded, setLoading] = useState(false);
  useEffect(() => {
    if (window && !window.document.getElementById('dsq-embed-scr')
      && process.env.GATSBY_DISQUS_NAME) {
      const target = window.document.getElementById('comment__container');
      const options = {
        root: null,
        rootMargin: '0% 0% 100% 0%',
        threshold: 0
      }
      const observer = new IntersectionObserver(function (entries, observer) {
        if (entries && entries[0] && entries[0].isIntersecting) {
          observer.unobserve(target);
          setLoading(true);
        }
      }, options);
      observer.observe(target);
    }
  }, []);
  return <>{process.env.GATSBY_DISQUS_NAME &&
  <CommentContainer id="comment__container">
    {isLoaded
      ? <Disqus config={config}/>
      : <p>Loading Comment...</p>
    }
  </CommentContainer>
  }</>;
}

const CommentContainer = styled(Section)`
  display: block;
`;

export default Comment;
