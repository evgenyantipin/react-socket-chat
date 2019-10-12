const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const port = 3001;
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

let data = [
  {
    id: '최준원 회장님',
    contents:[
      {
        name:'장만월 사장님',
        picture: '/assets/images/1.jpg',
        endedAt:1570454329003,
        messages:[
          {
            user:'장만월 사장님',
            message:'회장님 어디세요?',
            isRead:true
          },
          {
            user:'최준원 회장님',
            message:'식사중입니다.',
            isRead:true
          },
          {
            user:'장만월 사장님',
            message:'언제쯤 오세요?',
            isRead:false
          },
          {
            user:'장만월 사장님',
            message:'얼른 오세요~',
            isRead:false
          }
        ]
      },
      {
        name: '신정근 바텐더',
        picture: '/assets/images/3.jpg',
        endedAt:1570551864061,
        messages:[
          {
            user:'신정근 바텐더',
            message:'회장님',
            isRead:true
          },
          {
            user:'최준원 회장님',
            message:'네?',
            isRead:true
          },
          {
            user:'신정근 바텐더',
            message:'오시는 길에 와인좀 사다주세요!',
            isRead:false
          }
        ]
      },
      {
        name: '이미라 의사',
        picture: '/assets/images/4.jpg',
        endedAt:1570887765818,
        messages:[
          {
            user:'최준원 회장님',
            message:'미라님',
            isRead:true
          },
          {
            user:'이미라 의사',
            message:'네?',
            isRead:true
          },
          {
            user:'이미라 의사',
            message:'말씀하세요!',
            isRead:false
          }
        ]
      },
      {
        name: '구찬성 지배인',
        picture: '/assets/images/6.jpg',
        endedAt:1570531864061,
        messages:[
          {
            user:'최준원 회장님',
            message:'찬성님',
            isRead:true
          },
          {
            user:'구찬성 지배인',
            message:'네?',
            isRead:true
          },
          {
            user:'최준원 회장님',
            message:'휴가 잘보내고 계세요?',
            isRead:true
          }
        ]
      },
      {
        name: '노준석 총지배인',
        picture: '/assets/images/5.jpg',
        endedAt:1570532864061,
        messages:[
          {
            user:'최준원 회장님',
            message:'노준석 총지배인님',
            isRead:true
          },
          {
            user:'노준석 총지배인',
            message:'네?',
            isRead:true
          },
          {
            user:'최준원 회장님',
            message:'건강은 좀 어떠세요?',
            isRead:true
          }
        ]
      }
    ],
  },
  {
    id: '장만월 사장님',
    contents:[
      {
        name:'최준원 회장님',
        picture: '/assets/images/8.jpg',
        endedAt:1570454329003,
        messages:[
          {
            user:'장만월 사장님',
            message:'회장님 어디세요?',
            isRead:true
          },
          {
            user:'최준원 회장님',
            message:'식사중입니다.',
            isRead:true
          },
          {
            user:'장만월 사장님',
            message:'언제쯤 오세요?',
            isRead:true
          },
          {
            user:'장만월 사장님',
            message:'얼른 오세요~',
            isRead:true
          }
        ]
      }
    ]
  },
  {
    id: '신정근 바텐더',
    contents:[
      {
        name:'최준원 회장님',
        picture: '/assets/images/8.jpg',
        endedAt:1570551864061,
        messages:[
          {
            user:'신정근 바텐더',
            message:'회장님',
            isRead:true
          },
          {
            user:'최준원 회장님',
            message:'네?',
            isRead:true
          },
          {
            user:'신정근 바텐더',
            message:'오시는 길에 와인좀 사다주세요!',
            isRead:true
          }
        ]
      }
    ]
  },
  {
    id: '이미라 의사',
    contents:[
      {
        name:'최준원 회장님',
        picture: '/assets/images/8.jpg',
        endedAt:1570887765818,
        messages:[
          {
            user:'최준원 회장님',
            message:'미라님',
            isRead:true
          },
          {
            user:'이미라 의사',
            message:'네?',
            isRead:true
          },
          {
            user:'이미라 의사',
            message:'말씀하세요!',
            isRead:true
          }
        ]
      }
    ]
  },
  {
    id: '구찬성 지배인',
    contents:[
      {
        name:'최준원 회장님',
        picture: '/assets/images/8.jpg',
        endedAt:1570531864061,
        messages:[
          {
            user:'최준원 회장님',
            message:'찬성님',
            isRead:true
          },
          {
            user:'구찬성 지배인',
            message:'네?',
            isRead:true
          },
          {
            user:'최준원 회장님',
            message:'휴가 잘보내고 계세요?',
            isRead:true
          }
        ]
      }
    ]
  },
  {
    id: '노준석 총지배인',
    contents:[
      {
        name:'최준원 회장님',
        picture: '/assets/images/8.jpg',
        endedAt:1570532864061,
        messages:[
          {
            user:'최준원 회장님',
            message:'노준석 총지배인님',
            isRead:true
          },
          {
            user:'노준석 총지배인',
            message:'네?',
            isRead:true
          },
          {
            user:'최준원 회장님',
            message:'건강은 좀 어떠세요?',
            isRead:true
          }
        ]
      }
    ]
  }
];

io.on('connection', socket => {
  console.log('connected!');

  socket.on('send message', (user, target, msg, isPicture) => {
    console.log('send message to: ', user, target, msg)
    const copyData = [...data];
    const newDate = + new Date();

    copyData.forEach(v => {
      if(v.id === user){
        v.contents.forEach(key => {
          if(key.name === target){
            key.endedAt = newDate;
            key.messages.push({
              user: user,
              message: isPicture === true ? '' : msg,
              picture: isPicture === true ? msg : '',
              isRead: true
            })
          }
        });
      } else if (v.id === target) {
        v.contents.forEach(key => {
          if(key.name === user){
            key.endedAt = newDate;
            key.messages.push({
              user: user,
              message: isPicture === true ? '' : msg,
              picture: isPicture === true ? msg : '',
              isRead: false
            })
          }
        });
      }
    })
    console.log('send data copydata', copyData)

    const targetData = copyData.filter(v => v.id === user)[0];
    const targetMessages = targetData ? targetData.contents.filter(value => value.name === target)[0].messages : [];
    io.sockets.emit('receive message', targetMessages);

    const reduceTargetData = copyData.filter(v => v.id === target)[0];
    socket.broadcast.emit('receive data', reduceTargetData);
  })

  socket.on('receive data', (user) => {
    console.log('receive data to: ', user)
    console.log('data', data)
    const newData = data.filter(v => v.id === user)[0];
    io.sockets.to(socket.id).emit('receive data', newData);
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

  socket.on('disconnect', () => {
    console.log('user disconnected!')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))