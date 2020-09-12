import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticonRounded, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import db from './firebase';
import './Chat.css';
import { useStateValue } from './StateProvider';

function Chat() {
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();
  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      const unsubscribe = db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
        setRoomName(snapshot.data().name);
      });

      db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => doc.data()));
      });

      return () => {
        unsubscribe();
      }
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setInput('');
  };

  const isReciever = (name) => {
    if (user) {
      return user.displayName === name;
    }
    return false;
  }

  return (
    <div className="chat">

      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/asdfasdf.svg`}/>
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen { new Date(messages[messages.length - 1]?.
            timestamp?.toDate()).toUTCString()}</p>
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
        {messages.map(message => (
          <p className={`chat_message ${isReciever(message.name) && 'chat_reciever'}`}>
            {!isReciever(message.name) && <span className="chat_name">{message.name}</span>}
          {message.message}
          <span className="chat_timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
          </p>
        ))}

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
