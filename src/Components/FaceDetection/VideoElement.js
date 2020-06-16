import React, {useEffect} from "react";
import { requestUserMedia, drawBox, createApiCanvas, loadModelsAndStart, clearApiCanvas } from "./Utility";
import * as faceApi from 'face-api.js';

const VideoElement = ({modelPath, boxRefreshRatio}) => {

    const startVideo = () => {
        const video = document.getElementById('video');

        requestUserMedia(video);

        video.addEventListener('play', () => {
            const [canvas, displaySize] = createApiCanvas(video, faceApi)

            document.body.append(canvas)
            faceApi.matchDimensions(canvas, displaySize);

            setInterval(async () => {
                clearApiCanvas(canvas)
                const detections = await faceApi.detectAllFaces(
                    video,
                    new faceApi.TinyFaceDetectorOptions()
                ).withFaceLandmarks().withFaceExpressions().withAgeAndGender();

                drawBox(canvas, faceApi.resizeResults(detections, displaySize), faceApi);
            }, boxRefreshRatio)
        })
    }

    useEffect(() => {
        loadModelsAndStart(modelPath, faceApi).then(() => {
            console.warn("Successfully loaded models. Starting video...");
            startVideo();
        });
    }, [])


    return (
    <div id="videoWrapper" className={"videoWrapper"}>
        <video id="video" width="720" height="560" autoPlay muted />
    </div>
    );
};

export default VideoElement;