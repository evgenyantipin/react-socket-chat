import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Head from 'next/head';
import Router, { withRouter } from 'next/router'
import dynamic from 'next/dynamic'
import socketIOClient from "socket.io-client";

import Layout from '../components/layout';

const DynamicHeader = dynamic(() => import('../components/header'))
const DynamicChatRoomWidget = dynamic(() => import('../components/chatRoomWidget'))

const socket = socketIOClient('localhost:3001');

const List = (props) => {
  const { router } = props;
  const [state, setState] = useState({
    // user: router.query.user || 'admin'
    user: router.query.user
  })

  const receiveData = () => {
    console.log('현재 유저', state.user)
    socket.emit('receive data', state.user);  

    socket.on('receive data', (data) => {
      console.log('현재 유저22', state.user)
      console.log('receive data', data)
      setState({ 
        ...state,
        data 
      })
    }); 

    if(!state.user){
      Router.push({
        pathname: '/'
      })
    }
  }

  useEffect(() => {
    receiveData();

    return () => {
      socket.off('receive data');
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>채팅</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name="description" content="React Socket.io Chatting application"/>
        <meta name="keywords" content="react,socket.io,chatting,javascript" />
      </Head>
      <DynamicHeader />
      <main>{state.data && <DynamicChatRoomWidget user={state.user} data={state.data} />}</main>
    </Layout>
  )
};

export default withRouter(List);

List.propTypes = {
  router: PropTypes.object,
};