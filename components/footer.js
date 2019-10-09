import React from 'react';
import PropTypes from 'prop-types';
import { FooterWrap, FooterInput, FooterSendButton } from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = (props) => {
  const { sendMessages, inputMessage, stagingMessage } = props;

  return (
    <FooterWrap>
      <FooterInput type="text" maxLength="35" placeholder="메세지를 입력하세요." value={stagingMessage} onChange={(e) => inputMessage(e)} />
      <FooterSendButton onClick={() => sendMessages()}>
        <FontAwesomeIcon icon={faEnvelope} style={{width:'2em'}} />
      </FooterSendButton>
    </FooterWrap>
  )
};

export default Footer;

Footer.propTypes = {
  sendMessages: PropTypes.func.isRequired,
  inputMessage: PropTypes.func.isRequired,
  stagingMessage: PropTypes.string,
};