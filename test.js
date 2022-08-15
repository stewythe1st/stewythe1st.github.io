async function drawSide(ctx, quadrant, lineWidth, x, y, circleX, circleY) {
    const radius = lineWidth * 2;
    /* Limit position to ensure lines don't go backwards */
    switch (quadrant) {
        case 1:
        case 3:
            circleY = Math.max(y - Math.abs(circleX - x) + radius * 2, circleY);
            circleY = Math.min(y + Math.abs(circleX - x) - radius * 2, circleY);
            break;
        case 2:
        case 4:
            circleX = Math.max(x - Math.abs(circleY - y), circleX);
            circleX = Math.min(x + Math.abs(circleY - y), circleX);
            break;
    }
    /* Setup */
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#FFF";
    ctx.lineWidth = lineWidth;
    /* Start at given (x,y) */
    ctx.beginPath();
    ctx.moveTo(x, y);
    /* Calculate position at which line must turn for diagonal to circle center 
     * and draw line to there */
    switch (quadrant) {
        case 1:
            ctx.lineTo(circleX - Math.abs(circleY - y) - radius, y);
            break;
        case 2:
            ctx.lineTo(x, circleY + Math.abs(circleX - x) - radius);
            break;
        case 3:
            ctx.lineTo(circleX + Math.abs(circleY - y) + radius, y);
            break;
        case 4:
            ctx.lineTo(x, circleY - Math.abs(circleX - x) + radius);
            break;
    }
    /* Draw line to center of circle */
    ctx.lineTo(circleX, circleY);
    /* Complete stroke */
    ctx.stroke();
    /* Draw circle, fill in middle */
    ctx.beginPath();
    ctx.arc(circleX, circleY, radius, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
}

async function drawCircuit(id) {
    /* Setup */
    var element = document.getElementById(id);
    const ctx = element.getContext("2d");
    const width = parseInt(element.getAttribute("width"));
    const height = parseInt(element.getAttribute("height"));
    const pinsPerSide = 10;
    const delayTime = 750 / (pinsPerSide * 4);
    /* Clear */
    ctx.clearRect(0, 0, width, height);
    /* Center rectangle */
    ctx.fillStyle = "#000";
    ctx.fillRect(width * 0.40, height * 0.40, width * 0.20, height * 0.20);
    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.arc(width * 0.42, height * 0.42, width * 0.006, 0, 2 * Math.PI);
    ctx.fill();
    /* Right side */
    for (var i = height * 0.60; i > height * 0.41; i = i - (height * 0.18 / (pinsPerSide - 1))) {
        await delay(delayTime)
        var randX = scale(Math.random(), 0, 1, width * 0.65, width * 0.95);
        var randY = scale(Math.random(), 0, 1, 0, height);
        drawSide(ctx, 1, height * 0.01, width * 0.61, i, randX, randY);
    }
    /* Top side */
    for (var i = width * 0.60; i > width * 0.41; i = i - (width * 0.18 / (pinsPerSide - 1))) {
        await delay(delayTime)
        var randX = scale(Math.random(), 0, 1, 0, width);
        var randY = scale(Math.random(), 0, 1, height * 0.05, height * 0.35);
        drawSide(ctx, 2, height * 0.01, i, height * 0.39, randX, randY);
    }
    /* Left side */
    for (var i = height * 0.41; i < height * 0.60; i = i + (height * 0.18 / (pinsPerSide - 1))) {
        await delay(delayTime)
        var randX = scale(Math.random(), 0, 1, width * 0.05, width * 0.35);
        var randY = scale(Math.random(), 0, 1, 0, height);
        drawSide(ctx, 3, height * 0.01, width * 0.39, i, randX, randY);
    }
    /* Bottom side */
    for (var i = width * 0.41; i < width * 0.60; i = i + (width * 0.18 / (pinsPerSide - 1))) {
        await delay(delayTime)
        var randX = scale(Math.random(), 0, 1, 0, width);
        var randY = scale(Math.random(), 0, 1, height * 0.65, height * 0.95);
        drawSide(ctx, 4, height * 0.01, i, height * 0.61, randX, randY);
    }
}

function scale(x, x_min, x_max, y_min, y_max) {
    return (y_max - y_min) * (x - x_min) / (x_max - x_min) + y_min;
}

function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}
drawCircuit("test-canvas");
