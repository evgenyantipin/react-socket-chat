import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import { HeaderWrap, Title, HeaderPanel, HeaderPanelContents } from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser,  faImage, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Header = (props) => {
  const { user, target } = props;

  return (
    <HeaderWrap>
      <HeaderPanel>
          {
            target 
            ? 
            <Link href={`/list?user=${user}`} as='/list'>
              <HeaderPanelContents style={{cursor:'pointer'}}>
                <FontAwesomeIcon icon={faChevronLeft} style={{width:'1em'}} /> 
              </HeaderPanelContents>
            </Link>
            : 
            <Link href='/'>
              <HeaderPanelContents style={{cursor:'pointer'}}>
                <FontAwesomeIcon icon={faHome} style={{width:'1.5em'}} />
              </HeaderPanelContents>
            </Link>
          }
        <HeaderPanelContents>
          <Title>{target || '채팅'}</Title>
        </HeaderPanelContents>
        <HeaderPanelContents>
          {
            target ? <FontAwesomeIcon icon={faImage} style={{width:'1.5em'}} /> : <FontAwesomeIcon icon={faUser} style={{width:'1em'}} />
          }
        </HeaderPanelContents>
      </HeaderPanel>
    </HeaderWrap>
  )
}

export default Header;

Header.propTypes = {
  user: PropTypes.string,
  target: PropTypes.string,
};