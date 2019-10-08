import React from 'react'
import { Header, Title, HeaderPanel, HeaderPanelContents } from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';


const Nav = () => (
  <Header>
    <HeaderPanel>
      <HeaderPanelContents>
        <FontAwesomeIcon icon={faBars} style={{width:'1em'}} />
      </HeaderPanelContents>
      <HeaderPanelContents>
        <Title>채팅</Title>
      </HeaderPanelContents>
      <HeaderPanelContents>
        <FontAwesomeIcon icon={faUser} style={{width:'1em'}} />
      </HeaderPanelContents>
    </HeaderPanel>
  </Header>
)

export default Nav;
