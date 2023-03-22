(function(){
	$(document).ready(initialize);
	const CARD_WIDTH = 851;
	const CARD_HEIGHT = 609;

    function initialize(){
    	$("#updateUnitButton").click(UpdateUnitCard);

    	$("#traitReferenceButton").click(() => {
    		$(".referenceSubPanel").hide();
    		$("#unitTraitsReference").show();
    	});

    	$("#leviesReferenceButton").click(() => {
    		$(".referenceSubPanel").hide();
    		$("#leviesReference").show();
    	});

    	$("#infantryReferenceButton").click(() => {
    		$(".referenceSubPanel").hide();
    		$("#infantryReference").show();
    	});

    	$("#artilleryReferenceButton").click(() => {
    		$(".referenceSubPanel").hide();
    		$("#artilleryReference").show();
    	});

    	$("#cavalryReferenceButton").click(() => {
    		$(".referenceSubPanel").hide();
    		$("#cavalryReference").show();
    	});

    	$("#ancestryReferenceButton").click(() => {
    		$(".referenceSubPanel").hide();
    		$("#ancestryReference").show();
    	});

    	$(".referenceSubPanel").hide();
    }

	function UpdateUnitCard(){
		var cardContext = getCanvasContext();
		try{
			clearCanvas();
		} catch {
			alert("Failed to clear old card. Contact the programmer.");
		}
		//try{
			UpdateBackground(cardContext);
		//} catch { console.log("Failed to load background!");}
		drawCanvas(cardContext);
	}

	function UpdateStats(contextToAddTo){
		var atk = $("#atkInput").val();
		UpdateStat(contextToAddTo, "ATK", atk, 220, 290);
		var def = $("#defInput").val();
		UpdateStat(contextToAddTo, "DEF", def, 320, 290);
		var pow = $("#powInput").val();
		UpdateStat(contextToAddTo, "POW", pow, 410, 290);
		var tou = $("#touInput").val();
		UpdateStat(contextToAddTo, "TOU", tou, 510, 290);
		var mor = $("#morInput").val();
		UpdateStat(contextToAddTo, "MOR", mor, 610, 290);
		var com = $("#comInput").val();
		UpdateStat(contextToAddTo, "COM", com, 720, 290);
	}

	function UpdateStat(contextToAddStatTo, statName, statNumber, x, y){
		contextToAddStatTo.fillStyle = getLightColor();
		contextToAddStatTo.textAlign = "center";
		contextToAddStatTo.font = "24pt Verdana";
		contextToAddStatTo.fillText(statName, x, y);
		contextToAddStatTo.font = "36pt Verdana";
		contextToAddStatTo.fillText(statNumber, x, y + 55);
	}

	function UpdateName(contextToAddTo){
		var nameColor = getDarkColor();
		var unitName = $("#unitNameInput").val();
		var fontSize = $("#nameSizeInput").val();
		contextToAddTo.font = `${fontSize}pt Verdana`;
		contextToAddTo.textAlign = "center";
		contextToAddTo.fillStyle = getDarkColor();
		contextToAddTo.fillText(unitName, 430, 146);
	}

	function UpdateType(contextToAddTo){
		var unitType = $("#unitTypeInput").val();
		var unitWeight = $("#unitWeightInput").val();
		var unitExperience = $("#unitExperienceInput").val();
		var unitAncestry = $("#unitAncestryInput").val();
		var unitTypeBlurb = `${unitExperience}, ${unitWeight}, ${unitAncestry}, ${unitType}`;
		var unitTypeColor = getDarkColor();
		contextToAddTo.font = "18pt Verdana";
		contextToAddTo.textAlign = "left";
		contextToAddTo.fillStyle = unitTypeColor;

		contextToAddTo.fillText(unitTypeBlurb, 182, 240);
	}

	function UpdateBackground(contextToAddTo){
		var backgroundColor = getBackgroundColor();
		contextToAddTo.fillStyle = backgroundColor;
		contextToAddTo.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

		//stats bar
		contextToAddTo.fillStyle = getDarkColor();
		contextToAddTo.fillRect(133, 252, 660, 100);

		//name bar
		contextToAddTo.fillStyle = getLightColor();
		contextToAddTo.fillRect(163, 74, 481, 78);

		//size ball
		drawCircle(contextToAddTo, 723, 118, 73, getFillagreeColor());
		drawCircle(contextToAddTo, 723, 118, 64, getLightColor());

		//size label box
		contextToAddTo.fillStyle = getLightColor();
		contextToAddTo.fillRect(650, 197, 148, 23);

		//big tier box
		contextToAddTo.fillStyle = getFillagreeColor();
		contextToAddTo.fillRect(658, 383, 136, 157);

		//tier ball
		drawCircle(contextToAddTo, 725, 454, 51, getDarkColor());

		//tier label box
		contextToAddTo.fillStyle = getLightColor();
		contextToAddTo.fillRect(666, 515, 121, 25);

		//copymark background
		contextToAddTo.fillStyle = getDarkColor();
		contextToAddTo.fillRect(376, 533, 90, 41);

		var backgroundImg = new Image();
		backgroundImg.onload = () => {
			contextToAddTo.fillStyle = getBackgroundColor();
			try{
				UpdateName(contextToAddTo);
			} catch {console.log("WARNING!: failed to update Name.");}
			try{
				UpdateType(contextToAddTo);
			} catch {console.log("WARNING!: failed to update Type.");}
			try{
				UpdateStats(contextToAddTo);
			} catch {console.log("WARNING!: failed to update Stats.");}
			try{
				UpdateFaction(contextToAddTo);
			} catch {console.log("WARNING!: failed to update Faction.");}
			try{
				UpdateBanner(contextToAddTo);
			} catch {console.log("WARNING!: failed to update Banner.");}
			try{
				UpdateTier(contextToAddTo);
			} catch {console.log("WARNING!: failed to update Tier.");}
			try{
				UpdateTraits(contextToAddTo);
			} catch {console.log("WARNING!: failed to update Traits.");}
			try{
				UpdateSize(contextToAddTo);
			} catch {console.log("WARNING!: failed to update Size.");}
			contextToAddTo.drawImage(backgroundImg, 0, 0);
			contextToAddTo.globalCompositeOperation = "source-over";
			try{
				UpdateAttacks(contextToAddTo);
			} catch {console.log("WARNING!: failed to update Attacks.");}
		}
		backgroundImg.src = "static/img/Blank unit card background.png";
	}

	function UpdateFaction(contextToAddTo){
		var ancestry = $("#unitAncestryInput").val();
		var factionIcon = new Image();
		factionIcon.onload = () => {
			contextToAddTo.drawImage(factionIcon, 166, 81);
		}
		factionIcon.src = `static/img/factions/${ancestry}.png`;
	}

	function UpdateBanner(contextToAddTo){
		drawBigBanner(contextToAddTo);
		drawSmallBanner(contextToAddTo);
		drawSwordBlade();
		var bannerIcon = new Image();
		bannerIcon.onload = () => {
			contextToAddTo.drawImage(bannerIcon, 68, 58);
		}
		var type = $("#unitTypeInput").val();
		bannerIcon.src = `static/img/banners/${type} Icon.png`;
	}

	function UpdateTier(contextToAddTo){
		var unitTier = $("#unitTierInput").val();
		contextToAddTo.font = "72pt Verdana";
		contextToAddTo.textAlign = "center";

		//size number
		contextToAddTo.fillStyle = getLightColor();
		contextToAddTo.fillText(unitTier, 725, 490);

		contextToAddTo.font = "24px Verdana";
		contextToAddTo.fillStyle = "black";
		contextToAddTo.fillText("Tier", 725, 537);
	}

	function UpdateTraits(contextToAddTo){
		contextToAddTo.fillStyle = getDarkColor();
		contextToAddTo.font = "32px Verdana";
		contextToAddTo.textAlign = "left";
		var TraitX = 220;
		var TraitY = 390;
		for (var i = 1; i <= 4; i++) {
			var trait = $(`#unitTrait${i}Input`).val();
			contextToAddTo.fillText(trait, TraitX, TraitY + ((i - 1) * 40));
		}
	}

	function UpdateSize(contextToAddTo){
		var size = $("#unitSizeInput").val();
		contextToAddTo.font = "84pt Verdana";
		contextToAddTo.textAlign = "center"
		contextToAddTo.fillStyle = getDarkColor();
		contextToAddTo.fillText(size, 720, 160);
		contextToAddTo.font = "20px Verdana";
		contextToAddTo.fillStyle = "black"
		contextToAddTo.fillText("Size", 720, 218);
	}

	function UpdateAttacks(contextToAddTo){
		contextToAddTo.textAlign = "center";
		contextToAddTo.font = "54pt Verdana";
		contextToAddTo.fillStyle = getDarkColor();

		var attacks = $("#unitAttacksInput").val();
		contextToAddTo.fillText(attacks, 110, 345);
		drawDamageSpikes();
		drawDamageHex();
		contextToAddTo.fillStyle = getLightColor();
		var damage = $("#unitDamageInput").val();
		contextToAddTo.fillText(damage, 110, 490);
	}

	function getCanvasContext(){
		var unitCanvas = document.getElementById("unitCanvas");
		return unitCanvas.getContext("2d");
	}

	function drawCanvas(contextToDraw){
		var canvasTag = document.getElementById("unitCanvas");
		contextToDraw.drawImage(canvasTag, CARD_WIDTH, CARD_HEIGHT);
	}

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

	function drawDamageSpikes(){
		var contextToDrawOn = getCanvasContext();
		contextToDrawOn.fillStyle = getFillagreeColor();
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

	function drawBigBanner(contextToAddTo){
		contextToAddTo.fillStyle = getFillagreeColor();
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

	function drawCircle(contextToAddTo, centerX, centerY, radius, color){
		contextToAddTo.fillStyle = color;
		contextToAddTo.strokeStyle = color;
		contextToAddTo.beginPath();
		contextToAddTo.arc(centerX, centerY, radius, 0, 2 * Math.PI);
		contextToAddTo.stroke();
		contextToAddTo.closePath();
		contextToAddTo.fill();
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

	function getFillagreeColor(){
		return $("#fillagreeColor").val();
	}

})();