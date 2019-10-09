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