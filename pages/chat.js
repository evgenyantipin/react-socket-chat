import React, { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import Head from 'next/head';
import { withRouter } from 'next/router'
import socketIOClient from "socket.io-client";
import { ChatWidgetWrap, ChatWidgetLeft, ChatWidgetRight, ChatWidgetMessageLeft, ChatWidgetMessageRight} from '../components/styled';

import Layout from '../components/layout';
import Header from '../components/header';
import Footer from '../components/footer';

const socket = socketIOClient('localhost:3001');

const Chat = (props) => {
  const { router } = props;
  const [state, setState] = useState({
    user: router.query.user || 'admin',
    target: router.query.target || '장만월 사장님',
    messages:[],
    stagingMessage:''
  });

  const receiveMessage = () => {
    console.log('현재 유저', state.user)
    console.log('현재 타겟', state.target)
    socket.emit('receive message', state.user, state.target);  

    socket.on('receive message', (messages) => {
      console.log('받은 메세지', messages)
      setState({ 
        ...state,
        messages 
      })
    }); 
  };

  useEffect(() => {
    receiveMessage();
    readMessages();

    return () => {
      socket.off('receive message');
    }
  }, [state.user, state.target]);

  // sending sockets
  const readMessages = () => {
    socket.emit('read message', state.user, state.target);
    receiveMessage();  
  };

  const sendMessages = () => {
    socket.emit('send message', state.user, state.stagingMessage)
    receiveMessage();  
  };
  
  // adding the function
  const inputMessage = (e) => {
    setState({
      ...state,
      stagingMessage:e.target.value
    })
  };

  const renderChatMessages = useCallback(() => {
    const { user, messages } = state;

    return(
      <ChatWidgetWrap>
        {messages.map((value,index) => {
          if (user === value.user) {
            return(
              <ChatWidgetRight key={index}>
                <ChatWidgetMessageRight>{value.message}</ChatWidgetMessageRight>
              </ChatWidgetRight>
            )
          } else {
            return(
              <ChatWidgetLeft key={index}>
                <ChatWidgetMessageLeft>{value.message}</ChatWidgetMessageLeft>
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
      <Header user={state.user} target={state.target} />
      {state.messages.length && renderChatMessages()}
      <Footer stagingMessage={state.stagingMessage} sendMessages={sendMessages} inputMessage={inputMessage} />
    </Layout>
  )
};

export default withRouter(Chat);

Chat.propTypes = {
  router: PropTypes.object,
};