import React from 'react';
import PropTypes from 'prop-types';
import { FooterWrap, FooterInput, FooterSendButton } from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = (props) => {
  const { sendMessages, debounceMessage, setDebounceMessage } = props;

  return (
    <FooterWrap>
      <FooterInput type="text" 
          maxLength="35" 
          placeholder="메세지를 입력하세요." 
          value={debounceMessage} 
          onChange={({ currentTarget }) => setDebounceMessage(currentTarget.value)} 
          onKeyPress={e => {
            if (e.key === 'Enter') {
              sendMessages(e.target.value)
            }
          }}
      />
      <FooterSendButton onClick={() => sendMessages()}>
        <FontAwesomeIcon icon={faEnvelope} style={{width:'2em'}} />
      </FooterSendButton>
    </FooterWrap>
  )
};

export default Footer;

Footer.propTypes = {
  sendMessages: PropTypes.func.isRequired,
  debounceMessage: PropTypes.string,
  setDebounceMessage: PropTypes.func.isRequired,
};