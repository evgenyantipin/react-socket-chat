import React from 'react'
import socketIOClient from "socket.io-client";

const socket = socketIOClient('localhost:3001');

export const SocketContext = React.createContext(socket);