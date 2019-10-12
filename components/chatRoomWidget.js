import React from "react";
import Link from 'next/link'
import PropTypes from 'prop-types';
import moment from 'moment';
import { ChatRoomPanel, 
  ChatRoomPanelImg, 
  Title, 
  ChatRoomPanelPreview, 
  ChatRoomPanelTime, 
  ChatRoomPanelBadge, 
  ChatRoomDividerLeft, 
  ChatRoomDividerRight,
  ChatRoomPanelDesc } from './styled';

moment.locale('ko')

const ChatRoomWidget = (props) => {
  const renderChat = () => {
    const { data, user } = props;

    return (
      data.contents.sort((a,b)=>{
        return b.endedAt - a.endedAt;
      }).map((value,index) => {
        const getUnReadCount = value.messages.filter(message => {
          return message.isRead === false;
        });

        const isToday = moment(value.endedAt).diff(+ new Date(), 'days')

        let time = "";
        if(isToday === 0) time = moment(value.endedAt).format('LT');
        else time = moment(value.endedAt).format('ll');
        
        return(
          <Link href={`/chat?user=${user}&target=${value.name}`} as='/chat' key={index}>
            <ChatRoomPanel>
              <ChatRoomDividerLeft>
                <ChatRoomPanelDesc>
                  <ChatRoomPanelImg src={value.picture} />
                </ChatRoomPanelDesc>
                <ChatRoomPanelDesc style={{marginTop:'2vh', marginLeft:'1em', width:'50%'}}>
                  <Title>{value.name}</Title>
                  {getUnReadCount.length 
                    ? 
                    <ChatRoomPanelPreview>
                      {
                        getUnReadCount[getUnReadCount.length - 1].picture
                        ? '사진'
                        : getUnReadCount[getUnReadCount.length - 1].message
                      }
                    </ChatRoomPanelPreview> 
                    :
                    <ChatRoomPanelPreview>
                      {
                        value.messages[value.messages.length - 1].picture 
                        ? '사진'
                        : value.messages[value.messages.length - 1].message
                      }
                    </ChatRoomPanelPreview> 
                  }
                </ChatRoomPanelDesc>
              </ChatRoomDividerLeft>
              <ChatRoomDividerRight>
                <ChatRoomPanelTime>{time}</ChatRoomPanelTime>
                {getUnReadCount.length ? <ChatRoomPanelBadge>{getUnReadCount.length}</ChatRoomPanelBadge> : ''}
              </ChatRoomDividerRight>
            </ChatRoomPanel>
          </Link>
        )
      })
    )
  }

  return(
    <ul>
      {renderChat()}
    </ul>
  )
};

export default ChatRoomWidget;

ChatRoomWidget.propTypes = {
  data: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
};