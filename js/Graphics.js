const drawCircle = (context, center, radius, color = "green") => {
    context.beginPath();
    context.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
};

const drawStrokeCircle = (context, center, radius, color = "green", width=2) => {
    context.beginPath();
    context.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    context.lineWidth = width;
    context.fillStyle = color;
    context.stroke();
};

const drawRect = (context, startPos, width, height, color = "green") => {
    context.beginPath();
    context.lineWidth = "5";
    context.strokeStyle = color;
    context.rect(startPos.x, startPos.y, width, height);
    context.stroke();
};

const drawfillRect = (context, startPos, width, height, color = "green") => {
    context.beginPath();
    context.fillStyle = color;
    context.fillRect(startPos.x, startPos.y, width, height);
};

const drawProgressBar = (context, start_pos, width, height, current=0, max=100, color_progress="green", color_bg="black") => {
    context.beginPath();
    context.fillStyle = color_bg;
    context.fillRect(start_pos.x, start_pos.y, width, height);

    context.fillStyle = color_progress;
    context.fillRect(start_pos.x, start_pos.y, width * (current / max), height);
};

const drawRectangle = (context, startpoint, size, rotation, color="green", angle=60) => { // angle, rotation in degreece
    rotation = rotation / 180;
    angle = angle / 180;
    const pointA = startpoint;
    const pointB = new V2(pointA.x + size * Math.sin(rotation - angle), pointA.y + size * Math.cos(rotation - angle))
    const pointC = new V2(pointA.x + size * Math.sin(rotation + angle), pointA.y + size * Math.cos(rotation + angle))

    var path=new Path2D();
    path.moveTo(pointA.x, pointA.y);
    path.lineTo(pointB.x, pointB.y);
    path.lineTo(pointC.x, pointC.y);
    context.fill(path);
}

export {drawCircle, drawRectangle, drawProgressBar, drawStrokeCircle, drawRect, drawfillRect}