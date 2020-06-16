import React from "react";
//import VideoElement from '../VideoElement/VideoElement'
import VideoElement from './VideoElement'
import { MODEL_PATH, REFRESH_RATIO } from "../../Constants/Constants";

const VideoDisplay = () => {

  return (
    <div className="center">
      <div className="displayWrapper">
        <VideoElement modelPath={MODEL_PATH} boxRefreshRatio={REFRESH_RATIO} />
      </div>
    </div>
  );
};
export default VideoDisplay;