import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Head from 'next/head';
import { withRouter } from 'next/router'
import socketIOClient from "socket.io-client";

import Layout from '../components/layout';
import Header from '../components/header';
import ChatRoomWidget from '../components/chatRoomWidget';

const socket = socketIOClient('localhost:3001');

const List = (props) => {
  const { router } = props;
  const [state, setState] = useState({
    user: router.query.user || 'admin'
  })

  const receiveData = () => {
    console.log('현재 유저', state.user)
    socket.emit('receive data', state.user);  

    socket.on('receive data', (data) => {
      console.log('receive data', data)
      setState({ 
        ...state,
        data 
      })
    }); 
  }

  useEffect(() => {
    receiveData()

    return () => {
      socket.off('receive data');
    }
  }, [state.user]);

  return (
    <Layout>
      <Head>
        <title>채팅</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name="description" content="React Socket.io Chatting application"/>
        <meta name="keywords" content="react,socket.io,chatting,javascript" />
      </Head>
      <Header />
      <main>{state.data && <ChatRoomWidget user={state.user} data={state.data} />}</main>
    </Layout>
  )
};

export default withRouter(List);

List.propTypes = {
  router: PropTypes.object,
};