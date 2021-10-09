let jsonData;
let continueAnimating = true;
let currentFrameID = 0;
$(document).ready(() => {
    window.scrollTo(0, screen.height / 2 - 350);
    const canvas = $("canvas");
    const context = canvas[0].getContext("2d");
    context.lineCap = "round";
    context.lineWidth = 30;
    context.strokeStyle = "#fff";

    canvas.on("mousedown", startDrawing);
    canvas.on("touchstart", startDrawing);
    canvas.on("mousemove", drawLine);
    canvas.on("touchmove", drawLine);
    canvas.on("touchend", stopDrawing);
    canvas.on("mouseup", stopDrawing);
    canvas.on("mouseout", stopDrawing);

    jQuery(".clear").on("click", () => {
        context.clearRect(0, 0, canvas.width(), canvas.height());
    });

    jQuery(".predict").on("click", () => {
        convertCanvasToJSON(canvas);

        fetchPrediction(jsonData);
    });
});

let x = 0,
    y = 0;
let isMouseDown = false;
const stopDrawing = () => {
    isMouseDown = false;
};
const startDrawing = (event) => {
    isMouseDown = true;
    var touches = event.touches || [];
    var touch = touches[0] || {};
    [x, y] = [event.offsetX, event.offsetY];
    const canvas = $(event.target);
    if (!jQuery.isEmptyObject(touch)) {
        x = touch.pageX - canvas[0].offsetLeft;
        y = touch.pageY - canvas[0].offsetTop;
    }
};

const drawLine = (event) => {
    var touches = event.touches || [];
    var touch = touches[0] || {};
    if (isMouseDown) {
        const canvas = $(event.target);
        const context = canvas[0].getContext("2d");
        let newX = event.offsetX;
        let newY = event.offsetY;
        if (!jQuery.isEmptyObject(touch)) {
            newX = touch.pageX - canvas[0].offsetLeft;
            newY = touch.pageY - canvas[0].offsetTop;
        }

        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(newX, newY);
        context.stroke();
        x = newX;
        y = newY;
    }
};

const convertCanvasToJSON = (canvas) => {
    const context = canvas[0].getContext("2d");

    let canvasWidth = canvas.width();
    let canvasHeight = canvas.height();
    var imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
    data = imageData.data;

    var oneChannelData = [];
    for (var i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        oneChannelData.push(avg);
    }

    var serverData = [];
    for (var i = 0; i < canvasWidth; i++) {
        rowData = [];
        for (var j = canvasWidth * i; j < i * canvasWidth + canvasWidth; j++) {
            rowData.push(oneChannelData[j]);
        }

        serverData.push(rowData);
    }

    jsonData = JSON.stringify(serverData);
};

const fetchPrediction = (jsonData) => {
    $.ajax({
        url: "/fapi/predict",
        type: "post",
        data: jsonData,
        beforeSend: () => {
            continueAnimating = true;
            animatePrediction(jQuery("#prediction"));
        },
        success: (response) => {
            continueAnimating = false;
            window.cancelAnimationFrame(currentFrameID);

            let prediction = response.prediction;
            jQuery("#prediction").html(prediction);
            let confidence = response.confidence;
            jQuery.each(jQuery(".conf-score"), function (index, elem) {
                let percentage = (confidence[index] * 100).toPrecision(8);
                jQuery(elem).animate(
                    {
                        width: 3 + percentage * 1.3 + "px",
                    },
                    300
                );
            });
        },
    });
};

function animatePrediction(obj) {
    const step = () => {
        obj.html(randomIntFromInterval(0, 9));
        if (continueAnimating) {
            currentFrameID = window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
