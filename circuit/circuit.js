function drawSide(ctx, lineWidth, x, y, circleX, circleY, lastCircleX, lastCircleY) {
    const radius = lineWidth * 2;
    /* Limit position to ensure lines don't go backwards */
    circleY = Math.max(y - Math.abs(circleX - x) + radius * 2, circleY);
    circleY = Math.min(y + Math.abs(circleX - x) - radius * 2, circleY);

    circleX = Math.min(circleX, lastCircleX + (circleY - y) - ((radius + lineWidth) * Math.SQRT2))
    if (circleX < (radius + lineWidth)) {
        circleX = (radius + lineWidth);
        circleY = lastCircleY + ((radius + lineWidth) * 2);
    }
    // if (circleY > y) {
    //     var rand = scale(Math.random(), 0, 1, 0, radius * 2);
    //     circleX = circleX + rand;
    //     circleY = circleY - rand;
    // }
    /* Setup */
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#FFF";
    ctx.lineWidth = lineWidth;
    /* Start at given (x,y) */
    ctx.beginPath();
    ctx.moveTo(x, y);
    /* Calculate position at which line must turn for diagonal to circle center 
     * and draw line to there */
    ctx.lineTo(circleX + Math.abs(circleY - y) + radius, y);
    /* Draw line to center of circle */
    ctx.lineTo(circleX, circleY);
    /* Complete stroke */
    ctx.stroke();
    /* Draw circle, fill in middle */
    ctx.beginPath();
    ctx.arc(circleX, circleY, radius, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
    return [circleX, circleY]
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
    ctx.fillRect(width * 0.40, height * 0.40, width * 0.20, height * 0.20);
    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.arc(width * 0.42, height * 0.42, width * 0.006, 0, 2 * Math.PI);
    ctx.fill();
    /* Left side */
    for (var j = 0; j < 4; j++) {
        lastPosn = [width, 0];
        for (var i = height * 0.41; i < height * 0.60; i = i + (height * 0.18 / (pinsPerSide - 1))) {
            await delay(delayTime)
            var randX = scale(Math.random(), 0, 1, width * 0.05, width * 0.35);
            var randY = scale(Math.random(), 0, 1, 0, i);
            lastPosn = drawSide(ctx, height * 0.01, width * 0.39, i, randX, randY, lastPosn[0], lastPosn[1]);
        }
        rotate(ctx, -Math.PI / 2, width, height)
    }
    drawing = false;
}

function rotate(ctx, angle, width, height) {
    ctx.translate(width * 0.50, height * 0.50)
    ctx.rotate(angle);
    ctx.translate(-width * 0.50, -height * 0.50)
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

