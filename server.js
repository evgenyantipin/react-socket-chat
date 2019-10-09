const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const port = 3001;
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

let idObj = {};

let data = [
  {
    id: 'admin',
    contents:[
      {
        name:'장만월 사장님',
        picture: '/assets/images/1.jpg',
        endedAt:1570454329003,
        messages:[
          {
            user:'장만월 사장님',
            message:'머해',
            isRead:true
          },
          {
            user:'admin',
            message:'그냥있어요',
            isRead:true
          },
          {
            user:'장만월 사장님',
            message:'머해 두번쨰',
            isRead:false
          },
          {
            user:'장만월 사장님',
            message:'머해 세번째',
            isRead:false
          }
        ]
      },
      {
        name: '신정근 바텐더',
        picture: '/assets/images/2.jpg',
        endedAt:1570551864061,
        messages:[
          {
            user:'신정근 바텐더',
            message:'머해',
            isRead:true
          },
          {
            user:'admin',
            message:'그냥있어요',
            isRead:true
          },
          {
            user:'신정근 바텐더',
            message:'머해 두번쨰',
            isRead:false
          },
          {
            user:'신정근 바텐더',
            message:'머해 세번째',
            isRead:false
          }
        ]
      }
    ],
  },
  {
    id: '장만월 사장님',
    contents:[
      {
        name:'admin',
        picture: '/assets/images/8.jpg',
        endedAt:1570454329003,
        messages:[
          {
            user:'장만월 사장님',
            message:'머해',
            isRead:true
          },
          {
            user:'admin',
            message:'그냥있어요',
            isRead:true
          },
          {
            user:'장만월 사장님',
            message:'머해 두번쨰',
            isRead:true
          },
          {
            user:'장만월 사장님',
            message:'머해 세번째',
            isRead:true
          }
        ]
      }
    ]
  }
];

io.on('connection', socket => {
  console.log('connected!')

  socket.on('disconnect', () => {
    console.log('user disconnected!')
  })

  socket.on('regist id', (user) => {
    console.log('소켓아이디', socket.id);
    console.log('regist id to: ', user)
    idObj[socket.id] = user;
    io.sockets.emit('regist id', idObj);
  });

  socket.on('send message', (user, target, msg) => {
    console.log('send message to: ', user, target, msg)
    const copyData = [...data];

    copyData.forEach(v => {
      if(v.id === user){
        v.contents.forEach(key => {
          if(key.name === target){
            key.messages.push({
              user: user,
              message: msg,
              isRead: true
            })
          }
        });
      } else if (v.id === target) {
        v.contents.forEach(key => {
          if(key.name === user){
            key.messages.push({
              user: user,
              message: msg,
              isRead: false
            })
          }
        });
      }
    })
    console.log('send data copydata', copyData)
    data = copyData;
    // io.sockets.emit('receive message', copyData);
  })

  socket.on('receive data', (user) => {
    console.log('receive data to: ', user)
    const newData = data.filter(v => v.id === user)[0];
    io.sockets.emit('receive data', newData);
  });

  socket.on('receive message', (user, target) => {
    console.log('receive message to: ', user, target)
    const targetData = data.filter(v => v.id === user)[0];
    const targetMessages = targetData ? targetData.contents.filter(value => value.name === target)[0].messages : [];
    io.sockets.emit('receive message', targetMessages);
  });

  socket.on('read message', (user, target) => {
    console.log('read message to: ', user, target)
    const copyData = [...data];
    const userIdx = copyData.findIndex(v => v.id === user);
    if(userIdx !== -1){
      const mappingData = copyData[userIdx].contents.map(key => {
        if(key.name === target){
          key.messages.forEach(value => {
            if(value.user === target) value.isRead = true;
          }) 
        }
        return key
      });
      copyData[userIdx].contents = mappingData;
    }

    data = copyData;
    // io.sockets.emit('read message', copyData);
  });
})

server.listen(port, () => console.log(`Listening on port ${port}`))