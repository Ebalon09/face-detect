import React, {useEffect} from "react";
import * as faceapi from 'face-api.js';

const VideoElement = ({  }) => {
    const modelPath = '/models'

    const startVideo = () => {
        const video = document.getElementById('video');
        navigator.getUserMedia(
            { video: {} },
            stream => video.srcObject = stream,
            err => console.error(err)
        );

        video.addEventListener('play', () => {
            const canvas = faceapi.createCanvasFromMedia(video)
            const displaySize = { width: video.width, height: video.height }

            document.body.append(canvas)
            faceapi.matchDimensions(canvas, displaySize);

            setInterval(async () => {
                const detections = await faceapi.detectAllFaces(
                    video,
                    new faceapi.TinyFaceDetectorOptions()
                ).withFaceLandmarks().withFaceExpressions();
                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
                faceapi.draw.drawDetections(canvas, resizedDetections)
                faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
                faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
            }, 100)
        })
    }

    const loadModels = () => {
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(modelPath),
            faceapi.nets.faceLandmark68Net.loadFromUri(modelPath),
            faceapi.nets.faceRecognitionNet.loadFromUri(modelPath),
            faceapi.nets.faceExpressionNet.loadFromUri(modelPath),
            faceapi.nets.ssdMobilenetv1.loadFromUri(modelPath),    
        ])
        .then(startVideo())
    }

    useEffect(() => {
        loadModels();
    }, [])


    return (
    <div id="videoWrapper" className={"videoWrapper"}>
        <video id="video" width="720" height="560" autoPlay muted />
    </div>
    );
};

export default VideoElement;