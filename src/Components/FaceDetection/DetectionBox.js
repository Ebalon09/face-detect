import React from "react";

const DetectionBox = ({ box }) => {

  return (
    <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
    />
  );
};

export default DetectionBox;