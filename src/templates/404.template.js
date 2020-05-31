import React from "react";
import styled from "@emotion/styled";

const NotFoundContainer = () => {
  return (
      	<NotFoundWrapper>
            <NotFound>
                <NotFound404>
                    <h1>404</h1>
                    <h2>Page not found</h2>
                </NotFound404>
                <a href="/">Homepage</a>
            </NotFound>
	    </NotFoundWrapper>
  )
};

export default NotFoundContainer;

const NotFoundWrapper = styled.div`
    position: relative;
    height: 100vh;
    background: ${p => p.theme.colors.gradient};
`
const NotFound404 = styled.div`
    position: relative;
    height: 180px;
    margin-bottom: 20px;
    z-index: -1;
`
const NotFound = styled.div`
    max-width: 767px;
    width: 100%;
    line-height: 1.4;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
    &:hover {
        color: #8400ff;
    } 
    a {
        font-family: 'Montserrat', sans-serif;
        display: inline-block;
        text-transform: uppercase;
        color: #ff005a;
        text-decoration: none;
        border: 2px solid;
        background: transparent;
        padding: 10px 40px;
        font-size: 14px;
        font-weight: 700;
        -webkit-transition: 0.2s all;
        transition: 0.2s all;
    }
    h2 {
        font-family: 'Montserrat', sans-serif;
        position: absolute;
        left: 0;
        right: 0;
        top: 110px;
        font-size: 42px;
        font-weight: 700;
        color: "#8400ff";
        text-transform: uppercase;
        text-shadow: 0px 2px 0px #8400ff;
        letter-spacing: 13px;
        margin: 0;
    }
    h1 {
        font-family: 'Montserrat', sans-serif;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50% , -50%);
            -ms-transform: translate(-50% , -50%);
                transform: translate(-50% , -50%);
        font-size: 224px;
        font-weight: 900;
        margin-top: 0px;
        margin-bottom: 0px;
        margin-left: -12px;
        color: #030005;
        text-transform: uppercase;
        text-shadow: -1px -1px 0px #8400ff, 1px 1px 0px #ff005a;
        letter-spacing: -20px;
    }
`;