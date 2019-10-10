import React, { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from 'prop-types';
import Head from 'next/head';
import Router, { withRouter } from 'next/router'
import dynamic from 'next/dynamic'
import socketIOClient from "socket.io-client";
import { ChatWidgetWrap, ChatWidgetLeft, ChatWidgetRight, ChatWidgetMessageLeft, ChatWidgetMessageRight, PictureImageLarge} from '../components/styled';
import { useDebounce } from 'react-use';

import Layout from '../components/layout';

const DynamicHeader = dynamic(() => import('../components/header'))
const DynamicFooter = dynamic(() => import('../components/Footer'))

const socket = socketIOClient('localhost:3001');

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

const Chat = (props) => {
  const { router } = props;
  const [state, setState] = useState({
    // user: router.query.user || 'admin',
    // target: router.query.target || '장만월 사장님',
    user: router.query.user,
    target: router.query.target,
    messages:[]
  });
  const [debounceMessage, setDebounceMessage] = useState('');
  const myRef = useRef(null)
  const executeScroll = () => scrollToRef(myRef)

  const receiveMessage = () => {
    console.log('현재 유저', state.user)
    console.log('현재 타겟', state.target)
    socket.emit('receive message', state.user, state.target);  

    socket.on('receive message', (messages) => {
      console.log('현재 유저2', state.user)
      console.log('받은 메세지', messages)
      setState({ 
        ...state,
        messages
      })
      setDebounceMessage('');
      executeScroll();
    }); 

    if(!state.user){
      Router.push({
        pathname: '/'
      })
    }
  };

  useEffect(() => {
    receiveMessage();
    readMessages();

    return () => {
      socket.off('receive message');
    }
  }, []);

  useDebounce(
    () => {
      setDebounceMessage(debounceMessage)
    },
    1000,
    [debounceMessage]
  );

  // sending sockets
  const readMessages = () => {
    socket.emit('read message', state.user, state.target);
  };

  const sendMessages = () => {
    socket.emit('send message', state.user, state.target, debounceMessage, false)
    receiveMessage();  
  };
  
  const renderChatMessages = useCallback(() => {
    const { user, messages } = state;

    return(
      <ChatWidgetWrap>
        {messages.map((value,index) => {
          if (user === value.user) {
            return(
              <ChatWidgetRight key={index}>
                {value.picture 
                  ? 
                  <PictureImageLarge src={value.picture} /> 
                  : 
                  <ChatWidgetMessageRight>{value.message}</ChatWidgetMessageRight>
                }
              </ChatWidgetRight>
            )
          } else {
            return(
              <ChatWidgetLeft key={index}>
                {value.picture 
                  ? 
                  <PictureImageLarge src={value.picture} /> 
                  : 
                  <ChatWidgetMessageLeft>{value.message}</ChatWidgetMessageLeft>
                }
              </ChatWidgetLeft>
            )
          }
          
        })}
      </ChatWidgetWrap>
    )
  }, [state.messages]);

  return (
    <Layout>
      <Head>
        <title>{state.target}과 채팅</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name="description" content="React Socket.io Chatting application"/>
        <meta name="keywords" content="react,socket.io,chatting,javascript" />
      </Head>
      <DynamicHeader user={state.user} target={state.target} />
      {state.messages.length && renderChatMessages()}
      <DynamicFooter debounceMessage={debounceMessage} setDebounceMessage={setDebounceMessage} sendMessages={sendMessages} />
      <div ref={myRef} style={{visibility:'hidden'}}></div>
    </Layout>
  )
};

export default withRouter(Chat);

Chat.propTypes = {
  router: PropTypes.object,
};