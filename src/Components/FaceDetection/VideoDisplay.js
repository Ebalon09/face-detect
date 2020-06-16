import React from "react";
import DetectionBox from "./DetectionBox";
import VideoElement from '../VideoElement/VideoElement'

const VideoDisplay = ({ DetectionBoxCoordinates }) => {

  return (
    <div className="center">
      <div className="displayWrapper">
        <VideoElement />
      </div>
    </div>
  );
};
export default VideoDisplay;