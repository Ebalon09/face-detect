

export const loadModelsAndStart = (modelPath, api) => {
    console.warn("Starting to load models...");
    return Promise.all([
        api.nets.ageGenderNet.loadFromUri(modelPath),
        api.nets.tinyFaceDetector.loadFromUri(modelPath),
        api.nets.faceLandmark68Net.loadFromUri(modelPath),
        api.nets.faceRecognitionNet.loadFromUri(modelPath),
        api.nets.faceExpressionNet.loadFromUri(modelPath),
        api.nets.ssdMobilenetv1.loadFromUri(modelPath),    
    ]);
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

    detections.forEach(detection => {
        const box = detection.detection.box;
        const drawBox = new api.draw.DrawBox(box, { 
            label: Math.round(detection.age) + " year old " + detection.gender 
        })

        drawBox.draw(canvas)
    })
}

export const createApiCanvas = (target, api) => {
    return [
        api.createCanvasFromMedia(target),
        { 
            width: target.width, 
            height: target.height 
        }
    ];
}