import React from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarChannel from "./SidebarChannel";
import { useState, useEffect } from "react";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CallIcon from "@material-ui/icons/Call";
import { Avatar } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import { logout, selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "./firebase";

export default function Sidebar() {
  const [randomId, setRandomId] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  const Logout = () => {
    auth.signOut().then(dispatch(logout()));
  };

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((item) => ({
          id: item.id,
          data: item.data(),
        }))
      );
    });
  }, []);

  const addChannel = () => {
    const channel = prompt("Enter a channel name");
    if (channel.length === 0) {
      return false;
    }
    db.collection("channels").add({
      name: channel,
    });
  };

  useEffect(() => {
    setRandomId(Math.floor(Math.random() * 8999 + 1000));
  }, []);
  //console.log(randomId);

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <h2>Discord Chat</h2>
        <ExpandMoreIcon></ExpandMoreIcon>
      </div>
      <div className="sidebar-channels">
        <div className="sidebar-header">
          <div className="sidebar-header-stuff">
            <ExpandMoreIcon></ExpandMoreIcon>
            <h4>Text Channels</h4>
          </div>
          <AddIcon className="add-channel" onClick={addChannel}></AddIcon>
        </div>
        <div className="sidebar-list">
          {channels.map(({ id, data: { name } }) => {
            return (
              <SidebarChannel key={id} channel={name} id={id}></SidebarChannel>
            );
          })}
        </div>
      </div>
      <div className="sidebar-voice">
        <SignalCellularAltIcon
          className="voice"
          fontSize="large"
        ></SignalCellularAltIcon>
        <div className="sidebar-voice-info">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar-voice-icons">
          <InfoOutlinedIcon></InfoOutlinedIcon>
          <CallIcon></CallIcon>
        </div>
      </div>
      <div className="sidebar-profile">
        <Avatar
          onClick={Logout}
          src={user.profilePic}
          className="avatar-profile"
        ></Avatar>
        <div className="profileInfo">
          <h3>{user.name}</h3>
          <p>
            This is my id: <span>{`#${randomId}`}</span>
          </p>
        </div>
        <div className="profile-icons">
          <MicIcon></MicIcon>
          <HeadsetIcon></HeadsetIcon>
          <SettingsIcon></SettingsIcon>
        </div>
      </div>
    </div>
  );
}
