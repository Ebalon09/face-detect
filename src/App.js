import React, {useState} from 'react';
import './App.scss';
import VideoDisplay from "./Components/FaceDetection/VideoDisplay";

function App() {
  return (
    <div className="mainWrapper">
      <VideoDisplay />
    </div>
  );
}

export default App;
