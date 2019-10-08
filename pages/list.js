import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Head from 'next/head';
import { withRouter } from 'next/router'
import socketIOClient from "socket.io-client";

import Layout from '../components/layout';
import Header from '../components/header';

const socket = socketIOClient('localhost:3001');

const List = (props) => {
  const { router } = props;
  const [state, setState] = useState({
    user: router.query.user
  })

  const receiveData = () => {
    socket.emit('receive data', !state.user && 'admin');

    socket.on('receive data', (data) => {
      console.log(data)
    });   
  }

  useEffect(() => {
    receiveData()
  }, []);

  return (
    <Layout>
      <Head>
        <title>Chatting List</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
    </Layout>
  )
};

export default withRouter(List);

List.propTypes = {
  router: PropTypes.object,
};