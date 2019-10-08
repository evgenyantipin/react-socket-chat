import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Head from 'next/head';
import { withRouter } from 'next/router'
import socketIOClient from "socket.io-client";

import Layout from '../components/layout';
import Header from '../components/header';

const socket = socketIOClient('localhost:3001');

const Chat = (props) => {
  const { router } = props;
  const [state, setState] = useState({
    messages:'',
    user: router.query.user,
    stagingMessage:''
  })

  useEffect(()=>{
    socket.on('change name', (name) => {
      setUser(name);
    });   

    receiveMessage();
  }, [])

  // sending sockets
  const sendMessages = () => {
    socket.emit('send message', state.user, state.stagingMessage)
    receiveMessage();  
  }
  
  // adding the function
  const setUser = (user) => {
    setState({ user })
  }

  const setMessages = (msg) => {
    setState({ messages:msg, stagingMessage:'' })
  }

  const inputMessage = (e) => {
    const a = e.target.value;
    setState({ stagingMessage:a })
  }

  const receiveMessage = () => {
    socket.on('receive message', (msg) => {
      console.log('11', msg)
      setMessages(msg);
    });
  }

  return (
    <Layout>
      <Head>
        <title>Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <textarea readOnly value={state.messages}></textarea>
      <b>{state.user}</b>
      <input type="text" value={state.stagingMessage} onChange={(e) => inputMessage(e)} />
      <button onClick={() => sendMessages()}>메세지 전송</button>
    </Layout>
  )
};

export default withRouter(Chat);

Chat.propTypes = {
  router: PropTypes.object,
};