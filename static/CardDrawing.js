

const CARD_WIDTH = 851;
const CARD_HEIGHT = 609;

function drawSwordBlade(){
    var contextToDrawOn = getCanvasContext();
    contextToDrawOn.fillStyle = getLightColor();
    contextToDrawOn.beginPath();

    contextToDrawOn.moveTo(110, 232);
    contextToDrawOn.lineTo(133, 268);
    contextToDrawOn.lineTo(126, 373);
    contextToDrawOn.lineTo(94, 373);
    contextToDrawOn.lineTo(88, 268);
    contextToDrawOn.lineTo(110, 232);

    contextToDrawOn.closePath();
    contextToDrawOn.fill();
}

function drawSwordCrossguard(){
    var contextToDraw = getCanvasContext();
    contextToDraw.strokeStyle = getLightColor();
    contextToDraw.fillStyle = getLightColor();
    contextToDraw.beginPath();
    contextToDraw.moveTo(74, 370);
    contextToDraw.quadraticCurveTo(74 + ((114-74)/2), 380, 114, 358);
    contextToDraw.quadraticCurveTo(114 + ((145-114)/2), 380, 145, 370);
    contextToDraw.lineTo(140, 389);
    contextToDraw.lineTo(80, 389);
    contextToDraw.lineTo(74, 370);
    contextToDraw.closePath();
    contextToDraw.fill();

}

function drawDamageSpikes(){
    var contextToDrawOn = getCanvasContext();
    contextToDrawOn.fillStyle = getFiligreeColor();
    contextToDrawOn.beginPath();
    //up spike
    contextToDrawOn.moveTo(111, 400);
    contextToDrawOn.lineTo(118, 417);
    contextToDrawOn.lineTo(129, 417);
    //northeast spikes
    contextToDrawOn.lineTo(162, 393);
    contextToDrawOn.lineTo(142, 429);
    contextToDrawOn.lineTo(147, 437);
    contextToDrawOn.lineTo(163, 432); //short tip
    contextToDrawOn.lineTo(153, 448);
    contextToDrawOn.lineTo(157, 454);
    //east spike
    contextToDrawOn.moveTo(157, 454);
    contextToDrawOn.lineTo(191, 464);
    contextToDrawOn.lineTo(157, 473);

    //southeast spikes
    contextToDrawOn.lineTo(153, 481);
    contextToDrawOn.lineTo(164, 497);
    contextToDrawOn.lineTo(147, 490); //short tip
    contextToDrawOn.lineTo(142, 499);
    contextToDrawOn.lineTo(160, 535);
    contextToDrawOn.lineTo(128, 512);

    //south spike
    contextToDrawOn.lineTo(117, 512);
    contextToDrawOn.lineTo(110, 528);
    contextToDrawOn.lineTo(104, 512);

    //southwest spikes
    contextToDrawOn.lineTo(92, 512);
    contextToDrawOn.lineTo(61, 534);
    contextToDrawOn.lineTo(79, 497);
    contextToDrawOn.lineTo(73, 491); 
    contextToDrawOn.lineTo(59, 495); //short tip
    contextToDrawOn.lineTo(68, 481);

    //west spike
    contextToDrawOn.lineTo(64, 474);
    contextToDrawOn.lineTo(32, 464);
    contextToDrawOn.lineTo(64, 453);

    //northwest spikes
    contextToDrawOn.lineTo(67, 447);
    contextToDrawOn.lineTo(59, 432); //short tip
    contextToDrawOn.lineTo(74, 437); 
    contextToDrawOn.lineTo(79, 431); 
    contextToDrawOn.lineTo(62, 393); //long tip
    contextToDrawOn.lineTo(93, 417);
    contextToDrawOn.lineTo(106, 417);

    contextToDrawOn.lineTo(111, 400);

    contextToDrawOn.closePath();
    contextToDrawOn.fill();
}

function drawDamageHex(){
    var contextToDrawOn = getCanvasContext();
    contextToDrawOn.fillStyle = getDarkColor();
    contextToDrawOn.strokeStyle = "black";
    contextToDrawOn.beginPath();
    contextToDrawOn.moveTo(93,  426);
    contextToDrawOn.lineTo(126, 426);
    contextToDrawOn.lineTo(148, 463);
    contextToDrawOn.lineTo(126, 501);
    contextToDrawOn.lineTo(93, 501);
    contextToDrawOn.lineTo(72, 463);
    contextToDrawOn.lineTo(93, 426);
    contextToDrawOn.closePath();
    contextToDrawOn.fill();
}

function drawNameBar(){
    var contextToAddTo = getCanvasContext();
    //name bar background
    contextToAddTo.fillStyle = getLightColor();
    contextToAddTo.fillRect(163, 74, 481, 78);
    //crown spikes here
    var spikeX = [351, 383, 423, 462, 494];
    contextToAddTo.fillStyle = getFiligreeColor();


    //crown diamonds
    drawDiamond(351, 52, 68);
    drawDiamond(383, 52, 68);
    drawDiamond(423, 47, 73);
    drawDiamond(462, 52, 68);
    drawDiamond(494, 52, 68);
}

function drawBigBanner(contextToAddTo){
    contextToAddTo.fillStyle = getFiligreeColor();
    contextToAddTo.beginPath();
    contextToAddTo.moveTo(58, 28);
    contextToAddTo.lineTo(164, 28);
    contextToAddTo.lineTo(159, 235);
    contextToAddTo.lineTo(108, 280);
    contextToAddTo.lineTo(63, 235);
    contextToAddTo.lineTo(58, 28);
    contextToAddTo.closePath();
    contextToAddTo.fill();
}

function drawSmallBanner(contextToAddTo){
    contextToAddTo.fillStyle = getDarkColor();
    contextToAddTo.beginPath();
    contextToAddTo.moveTo(71, 60);
    contextToAddTo.lineTo(150, 60);
    contextToAddTo.lineTo(148, 233);
    contextToAddTo.lineTo(109, 262);
    contextToAddTo.lineTo(73, 233);
    contextToAddTo.lineTo(71, 60);
    contextToAddTo.closePath();
    contextToAddTo.fill();
}

function drawBackgroundColor(contextToAddTo){
    contextToAddTo.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
}

function drawCardOutline(contextToAddTo){
    var outlineWidth = 16;
    var cardEdgeOffset = outlineWidth / 2;
    contextToAddTo.strokeStyle = getDarkColor();
    contextToAddTo.lineWidth = outlineWidth;
    contextToAddTo.beginPath();
    contextToAddTo.roundRect(cardEdgeOffset, cardEdgeOffset, CARD_WIDTH - (2 * cardEdgeOffset), CARD_HEIGHT - (2*cardEdgeOffset), outlineWidth);
    contextToAddTo.stroke();
    contextToAddTo.closePath();
}

function drawCircle(contextToAddTo, centerX, centerY, radius, color){
    contextToAddTo.fillStyle = color;
    contextToAddTo.strokeStyle = color;
    contextToAddTo.beginPath();
    contextToAddTo.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    contextToAddTo.fill();
}

function drawDiamond(centerX, centerTop, centerBottom){
    var contextToAddTo = getCanvasContext();
    var radius = (centerBottom - centerTop) / 2;
    contextToAddTo.fillStyle = getLightColor();
    contextToAddTo.beginPath();
    contextToAddTo.moveTo(centerX, centerTop);
    contextToAddTo.lineTo(centerX + radius, centerTop + radius);
    contextToAddTo.lineTo(centerX, centerBottom);
    contextToAddTo.lineTo(centerX - radius, centerTop + radius);
    contextToAddTo.lineTo(centerX, centerTop);
    contextToAddTo.closePath();
    contextToAddTo.fill();
}

function getCanvasContext(){
    var unitCanvas = document.getElementById("unitCanvas");
    return unitCanvas.getContext("2d");
}

function drawCanvas(contextToDraw){
    var canvasTag = document.getElementById("unitCanvas");
    contextToDraw.drawImage(canvasTag, CARD_WIDTH, CARD_HEIGHT);
}

function clearCanvas(){
    getCanvasContext().clearRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
}

function getBackgroundColor(){
    var backgroundColor = $("#backgroundColor").val();
    return backgroundColor;
}

function getDarkColor(){
    var darkColor = $("#darkColor").val();
    return darkColor
}

function getLightColor(){
    return $("#lightColor").val();
}

function getFiligreeColor(){
    return $("#filigreeColor").val();
}