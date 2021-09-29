import React from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import CardGiftcardRoundedIcon from "@material-ui/icons/CardGiftcardRounded";
import GifRoundedIcon from "@material-ui/icons/GifRounded";
import EmojiEmotionsRoundedIcon from "@material-ui/icons/EmojiEmotionsRounded";
import Messages from "./Messages";
import { selectChannelName, selectChannelId } from "./features/appSlice";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import firebase from "firebase";

export default function Chat() {
  const user = useSelector(selectUser);
  const channelName = useSelector(selectChannelName);
  const channelId = useSelector(selectChannelId);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId)
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((item) => ({
              id: item.id,
              data: item.data(),
            }))
          )
        );
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("channels").doc(channelId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      email: user.email,
    });

    setInput("");
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName}></ChatHeader>
      <div className="chat-messages">
        {messages.map(({ id, data: { timestamp, message, email } }) => {
          return (
            <Messages
              id={id}
              key={id}
              name={email}
              timestamp={timestamp}
              message={message}
            ></Messages>
          );
        })}
      </div>

      <div className="chat-input">
        <AddCircleRoundedIcon fontSize="large"></AddCircleRoundedIcon>
        <form>
          <input
            type="text"
            placeholder={`Send message #${channelName}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="send-btn"
            onClick={sendMessage}
            disabled={!channelId}
          >
            Send Message
          </button>
        </form>
        <div className="chat-icons">
          <CardGiftcardRoundedIcon></CardGiftcardRoundedIcon>
          <GifRoundedIcon></GifRoundedIcon>
          <EmojiEmotionsRoundedIcon></EmojiEmotionsRoundedIcon>
        </div>
      </div>
    </div>
  );
}
