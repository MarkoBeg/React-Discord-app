import React from "react";
import "./ChatHeader.css";
import NotificationsIcon from "@material-ui/icons/Notifications";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import HelpRoundedIcon from "@material-ui/icons/HelpRounded";

export default function ChatHeader({ channelName }) {
  return (
    <div className="chatHeader">
      <div className="chatHeader-left">
        <h3>
          <span className="chatHeader-hash">#</span>
          {channelName}
        </h3>
      </div>
      <div className="chatHeader-right">
        <NotificationsIcon></NotificationsIcon>
        <EditOutlinedIcon></EditOutlinedIcon>
        <PeopleAltRoundedIcon></PeopleAltRoundedIcon>

        <div className="chatHeader-search">
          <input type="text" placeholder="Search"></input>
          <SearchRoundedIcon></SearchRoundedIcon>
        </div>
        <SendRoundedIcon></SendRoundedIcon>
        <HelpRoundedIcon></HelpRoundedIcon>
      </div>
    </div>
  );
}
