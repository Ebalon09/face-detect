

export const loadModelsAndStart = (modelPath, api, startVideo) => {
    Promise.all([
        api.nets.tinyFaceDetector.loadFromUri(modelPath),
        api.nets.faceLandmark68Net.loadFromUri(modelPath),
        api.nets.faceRecognitionNet.loadFromUri(modelPath),
        api.nets.faceExpressionNet.loadFromUri(modelPath),
        api.nets.ssdMobilenetv1.loadFromUri(modelPath),    
    ]).then(() => {
        console.log("Loaded models! Starting video...");
        startVideo();
    })
}

export const requestUserMedia = (targetComponent) => {
    navigator.getUserMedia(
        { video: {} },
        stream => targetComponent.srcObject = stream,
        err => console.error(err)
    );
}

export const drawBox = (canvas, detections, api) => {
    api.draw.drawDetections(canvas, detections);
    api.draw.drawFaceExpressions(canvas, detections);
    api.draw.drawFaceLandmarks(canvas, detections);
}

export const createApiCanvas = (target, api) => {
    

    return [
        api.createCanvasFromMedia(target),
        { 
            width: target.width, 
            height: target.height 
        }
    ]
}

export const clearApiCanvas = (canvas) => {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}