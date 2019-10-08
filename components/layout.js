import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import PropTypes from 'prop-types';

const theme = {
  fontFamily: "'Helvetica, sans-serif'",
  margin: 0
};

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${props => props.theme.fontFamily};
    margin: ${props => props.theme.margin};
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