import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import dynamic from 'next/dynamic';
import { HeaderWrap, Title, HeaderPanel, HeaderPanelContents } from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser,  faImage, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { SocketContext } from '../socket-context';

const Header = (props) => {
  const socket = useContext(SocketContext);
  const { user, target } = props;
  const [dynamicPictureWidget, setDynamicPictureWidget] = useState();
  const [pictures] = useState([
    {
      picture:'/assets/images/storage_1.jpg',
      title:'storage_1',
      format:'jpg'
    },
    {
      picture:'/assets/images/storage_2.jpg',
      title:'storage_2',
      format:'jpg'
    },
    {
      picture:'/assets/images/storage_3.jpg',
      title:'storage_3',
      format:'jpg'
    },
    {
      picture:'/assets/images/storage_4.jpg',
      title:'storage_4',
      format:'jpg'
    },
    {
      picture:'/assets/images/storage_5.jpg',
      title:'storage_5',
      format:'jpg'
    },
    {
      picture:'/assets/images/storage_6.jpg',
      title:'storage_6',
      format:'jpg'
    }
  ]);

  const sendPicture = (picture) => {
    socket.emit('send message', user, target, picture, true);
  }

  const loadDynamicPictureWidget = () => {
    const DynamicPictureWidget = dynamic(() => import(`../components/pictureWidget`))
    if(dynamicPictureWidget) setDynamicPictureWidget();
    else setDynamicPictureWidget( <DynamicPictureWidget pictures={pictures} sendPicture={sendPicture} /> );
  }

  return (
    <HeaderWrap>
      <HeaderPanel>
          {
            target 
            ? 
            <Link href={`/list?user=${user}&target=${target}&read=true`} as='/list'>
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
          <Title>{target || `${user}의 채팅`}</Title>
        </HeaderPanelContents>
        <HeaderPanelContents onClick={()=>{target && loadDynamicPictureWidget()}} style={{cursor:'pointer'}}>
          {
            target ? <FontAwesomeIcon icon={faImage} color={dynamicPictureWidget? 'white' : '#442884'} style={{width:'1.5em'}} /> : <FontAwesomeIcon icon={faUser} style={{width:'1em'}} />
          }
        </HeaderPanelContents>
      </HeaderPanel>
      {dynamicPictureWidget}
    </HeaderWrap>
  )
}

export default Header;

Header.propTypes = {
  user: PropTypes.string,
  target: PropTypes.string,
};