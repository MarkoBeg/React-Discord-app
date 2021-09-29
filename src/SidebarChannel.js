import React from "react";
import "./SidebarChannel.css";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "./features/appSlice";

export default function SidebarChannel({ id, channel }) {
  const dispatch = useDispatch();

  return (
    <div
      className="sidebarChannel"
      id={id}
      onClick={() =>
        dispatch(
          setChannelInfo({
            channelId: id,
            channelName: channel,
          })
        )
      }
    >
      <h4>
        <span className="sidebarAddChannels">#</span>
        {channel}
      </h4>
    </div>
  );
}
