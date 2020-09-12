import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticonRounded, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import db from './firebase';
import './Chat.css';

function Chat() {
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      const unsubscribe = db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
        setRoomName(snapshot.data().name);
      });

      return () => {
        unsubscribe();
      }
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();

    console.log(input);
    setInput('');
  };

  return (
    <div className="chat">

      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`}/>
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen at ...</p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>

        </div>
      </div>

      <div className="chat_body">
        <p className={`chat_message ${ true && 'chat_reciever' }`}>
          { !true && <span className="chat_name">Besim Gurbuz</span> }
          Hey Guys!
          <span className="chat_timestamp">3:45 pm</span>
        </p>
      </div>

      <div className="chat_footer">
        <IconButton>
          <InsertEmoticonRounded />
        </IconButton>
        <form>
          <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message"/>
          <button onClick={sendMessage} type="submit">Send a message</button>
        </form>
        <IconButton>
          <Mic />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
