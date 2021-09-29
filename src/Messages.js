import React from "react";
import "./Messages.css";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

export default function Messages({ timestamp, message, name }) {
  const user = useSelector(selectUser);

  return (
    <div className="messages">
      <Avatar src={user.profilePic}></Avatar>
      <div className="message-info">
        <h4>
          {user.name}

          <span className="message-timestamp">
            {new Date(timestamp?.toDate()).toUTCString()}
          </span>
        </h4>
        <span className="message-email">{name}</span>

        <p>{message}</p>
      </div>
    </div>
  );
}
