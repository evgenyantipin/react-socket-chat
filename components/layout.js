import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import PropTypes from 'prop-types';

const theme = {
  fontFamily: "'Helvetica, sans-serif'",
  margin: 0,
  padding: 0,
  color:'black'
};

const GlobalStyle = createGlobalStyle`
  html{
    scroll-behavior: smooth;
  }

  body {
    font-family: ${props => props.theme.fontFamily};
    margin: ${props => props.theme.margin};
    padding: ${props => props.theme.padding};
    color: ${props => props.theme.color};

    p{
      margin:0;
    }

    ul{
      margin:0;
      padding:0;

      li{
        list-style:none;
      }
    }
  }

  @keyframes scale-up {
    0% {
      transform: scale(0.5);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes slide-right {
    0% {
      transform: translateX(-100px);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes slide-left {
    0% {
      transform: translateX(50px);
      opacity:0;
    }
    100% {
      transform: translateX(0);
      opacity:1;
    }
  }
  
  @keyframes fade-in {
    0% {
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }
  
`

const Layout = (props) => {
  const { children } = props;
  return(
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.array,
};