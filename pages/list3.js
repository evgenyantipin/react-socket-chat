import React, { Component } from "react";
import Head from 'next/head';
import Link from 'next/link'
import socketIOClient from "socket.io-client";
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import Header from '../components/header';

const socket = socketIOClient('localhost:3001');

const theme = {
  fontFamily: "'Helvetica, sans-serif'",
  margin: 0
};

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${props => props.theme.fontFamily};
    margin: ${props => props.theme.margin};
  }
`

class List extends Component {
  constructor() {
    super();
    this.state = {
      messages:'',
      user: '',
      stagingMessage:''
    };
  }

  componentDidMount(){
    socket.on('change name', (name) => {
      this.setUser(name);
    });   
    this.receiveMessage();
  }

  // sending sockets
  sendMessages = () => {
    socket.emit('send message', this.state.user, this.state.stagingMessage)
    this.receiveMessage();  
  }
  
  // adding the function
  setUser = (user) => {
    this.setState({ user })
  }

  setMessages = (msg) => {
    this.setState({ messages:msg, stagingMessage:'' })
  }

  inputMessage = (e) => {
    const a = e.target.value;
    this.setState({ stagingMessage:a })
  }

  receiveMessage = () => {
    socket.on('receive message', (msg) => {
      console.log('11', msg)
      this.setMessages(msg);
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div style={{ textAlign: "center" }}>
          <Head>
            <title>Home</title>
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <Header />
          <Link href="/chat">
            <a>About Us</a>
          </Link>
          <textarea readOnly value={this.state.messages}></textarea>
          <b>{this.state.user}</b>
          <input type="text" value={this.state.stagingMessage} onChange={(e) => this.inputMessage(e)} />
          <button onClick={() => this.sendMessages()}>메세지 전송</button>
        </div>
      </ThemeProvider>
    )
  }
}
export default List;