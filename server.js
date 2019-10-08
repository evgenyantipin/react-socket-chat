const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const port = 3001;

const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

const data = [
  {
    id: 'admin',
    messages:[
      {
        name:'장만월 사장님',
        picture: './content/assets/images/1.jpg',
        endedAt:1570526042178,
        message:'머해'
      },
      {
        name: '신정근 바텐더',
        picture: './content/assets/images/2.jpg',
        message:{
          endedAt:1570526043178,
          message:'머해22'
        }
      }
    ],
  },
  { 
    id:'장만월',
    messages:[
      {
        name:'admin',
        picture: './content/assets/images/1.jpg',
        endedAt:1570526042178,
        message:'머해'
      }
    ]
  }
]

// let cnt = 0;

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('connected!')
  console.log('socket ::', socket.id)
  
  // let name = `user${cnt++}`;
  // io.to(socket.id).emit('change name', name);

  socket.on('send message', (name,text) => {
    const msg = `${name}: ${text}`;
    console.log('message Changed to: ', msg)
    io.sockets.emit('receive message', msg)
  })

  socket.on('receive data', (user) => {
    console.log('receive data to: ', user)
    const messages = data.filter(v => v.id === user);
    io.sockets.emit('receive data', messages)
  });
  
  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    console.log('user disconnected!')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))