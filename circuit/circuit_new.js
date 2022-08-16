function drawSide(ctx, quadrant, lineWidth, x1, y1, x2, y2, x3, y3) {
    const radius = lineWidth * 2;
    /* Setup */
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#FFF";
    ctx.lineWidth = lineWidth;
    /* Start at given (x,y) */
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    /* Draw line to center of circle */
    ctx.lineTo(x2, y2);
    /* Complete stroke */
    ctx.stroke();
    /* Draw circle, fill in middle */
    ctx.beginPath();
    ctx.arc(x3, y3, radius, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
}

var drawing = false;
async function drawCircuit(id) {
    /* Wait for current draw to finish */
    if (drawing) {
        return;
    }
    drawing = true;
    /* Setup */
    var element = document.getElementById(id);
    const ctx = element.getContext("2d");
    const width = parseInt(element.getAttribute("width"));
    const height = parseInt(element.getAttribute("height"));
    const pinsPerSide = 10;
    const delayTime = 750 / (pinsPerSide * 4);
    var lastPosn;
    /* Clear */
    ctx.clearRect(0, 0, width, height);
    /* Center rectangle */
    ctx.fillStyle = "#000";
    // ctx.fillRect(width * 0.40, height * 0.40, width * 0.20, height * 0.20);
    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    // ctx.arc(width * 0.42, height * 0.42, width * 0.006, 0, 2 * Math.PI);
    ctx.fill();
    /* Left side */
    var x2_last = width * 0.41;
    for (var i = height * 0.41; i < height * 0.60; i = i + (height * 0.18 / (pinsPerSide - 1))) {
        await delay(delayTime)
        var x1 = width * 0.41
        var y1 = i;
        if (i > (height * 0.50)) {
            var x2 = scale(Math.random(), 0, 1, x2_last, width * 0.39);
        } else {
            var x2 = scale(Math.random(), 0, 1, width * 0.05, x2_last);
        }
        var y2 = i;
        var x3 = scale(Math.random(), 0, 1, width * 0.05, x1);
        var y3 = scale(Math.random(), 0, 1, 0, height);
        drawSide(ctx, 3, width * 0.01, x1, y1, x2, y2, x3, y3);
        x2_last = x2;
    }
    // /* Bottom side */
    // for (var i = width * 0.41; i < width * 0.60; i = i + (width * 0.18 / (pinsPerSide - 1))) {
    //     await delay(delayTime)
    //     var randX = scale(Math.random(), 0, 1, 0, width);
    //     var randY = scale(Math.random(), 0, 1, height * 0.65, height * 0.95);
    //     drawSide(ctx, 4, height * 0.01, i, height * 0.61, randX, randY);
    // }
    // /* Right side */
    // for (var i = height * 0.60; i > height * 0.41; i = i - (height * 0.18 / (pinsPerSide - 1))) {
    //     await delay(delayTime)
    //     var randX = scale(Math.random(), 0, 1, width * 0.65, width * 0.95);
    //     var randY = scale(Math.random(), 0, 1, 0, height);
    //     drawSide(ctx, 1, height * 0.01, width * 0.61, i, randX, randY);
    // }
    // /* Top side */
    // for (var i = width * 0.60; i > width * 0.41; i = i - (width * 0.18 / (pinsPerSide - 1))) {
    //     await delay(delayTime)
    //     var randX = scale(Math.random(), 0, 1, 0, width);
    //     var randY = scale(Math.random(), 0, 1, height * 0.05, height * 0.35);
    //     drawSide(ctx, 2, height * 0.01, i, height * 0.39, randX, randY);
    // }
    drawing = false;
}

function scale(x, x_min, x_max, y_min, y_max) {
    return (y_max - y_min) * (x - x_min) / (x_max - x_min) + y_min;
}

function delay(milliseconds) {
    /* https://alvarotrigo.com/blog/wait-1-second-javascript/ */
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}
