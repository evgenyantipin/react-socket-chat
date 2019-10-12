import React, { useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import Head from 'next/head';
import Router, { withRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { SocketContext } from '../socket-context';
import Layout from '../components/layout';

const DynamicHeader = dynamic(() => import('../components/header'))
const DynamicChatRoomWidget = dynamic(() => import('../components/chatRoomWidget'))

const List = (props) => {
  const socket = useContext(SocketContext);
  const { router } = props;
  const [state, setState] = useState({
    user: router.query.user,
    target: router.query.target,
    read: router.query.read ? true : false
  })

  const receiveData = () => {
    socket.emit('receive data', state.user);  

    socket.on('receive data', (data) => {
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
  };

  const readMessages = () => {
    socket.emit('read message', state.user, state.target);
  };

  useEffect(() => {
    receiveData();

    if(state.read){
      readMessages();
    }

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
      <DynamicHeader user={state.user} />
      <main>{state.data && <DynamicChatRoomWidget user={state.user} data={state.data} />}</main>
    </Layout>
  )
};

export default withRouter(List);

List.propTypes = {
  router: PropTypes.object,
};