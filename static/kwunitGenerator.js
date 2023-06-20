// depends on CardDrawing.js, which must be imported before it in the HTML

(function(){
	$(document).ready(initialize);

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

    	$("#colorReferenceButton").click(() => {
    		$(".referenceSubPanel").hide();
    		$("#colorSchemes").show();
    	});

    	$("#upgradeReferenceButton").click(() => {
    		$(".referenceSubPanel").hide();
    		$("#upgradeReference").show();
    	});

    	$(".referenceSubPanel").hide();

		$("#saveColorButton").click(() => {
			SaveColor();
		})

		$("#loadColorButton").click(() => {
			LoadColor();
		})

		$("#deleteColorButton").click(() => {
			DeleteColor();
		})

		$("#levelupButton").click(() => {
			UnitTools("level_up");
		})

		$("#leveldownButton").click(() => {
			UnitTools("level_down");
		})

		$("#upgradeButton").click(() => {
			UnitTools("upgrade");
		})

		$("#downgradeButton").click(() => {
			UnitTools("downgrade");
		})

    }

	function UpdateUnitCard(){
		var cardContext = getCanvasContext();
		try{
			clearCanvas();
		} catch {
			alert("Failed to clear old card. Contact the programmer.");
		}
		try{
			UpdateBackground(cardContext);
		} catch { console.log("Failed to load background!");}
		drawCanvas(cardContext);
	}

	function UpdateStats(contextToAddTo){
		var atk = PrependPlusIfAbsent($("#atkInput").val());
		UpdateStat(contextToAddTo, "ATK", atk, 220, 290);
		var def = $("#defInput").val();
		UpdateStat(contextToAddTo, "DEF", def, 320, 290);
		var pow = PrependPlusIfAbsent($("#powInput").val());
		UpdateStat(contextToAddTo, "POW", pow, 410, 290);
		var tou = $("#touInput").val();
		UpdateStat(contextToAddTo, "TOU", tou, 510, 290);
		var mor = PrependPlusIfAbsent($("#morInput").val());
		UpdateStat(contextToAddTo, "MOR", mor, 610, 290);
		var com = PrependPlusIfAbsent($("#comInput").val());
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

	function PrependPlusIfAbsent(statNumber){
		startingChar = statNumber.charAt(0);
		if (startingChar != '+' && startingChar != '-') 
			statNumber = '+' + statNumber
		return statNumber;
	}

	function UpdateName(contextToAddTo){
		var nameColor = getDarkColor();
		var unitName = $("#unitNameInput").val();
		var fontSize = $("#nameSizeInput").val();
		contextToAddTo.font = `${fontSize}pt Verdana`;
		contextToAddTo.textAlign = "center";
		contextToAddTo.fillStyle = nameColor;
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
		drawBackgroundColor(contextToAddTo);

		//stats bar
		contextToAddTo.fillStyle = getDarkColor();
		contextToAddTo.fillRect(133, 252, 660, 100);

		//name bar
		drawNameBar();

		//size ball
		drawCircle(contextToAddTo, 723, 118, 73, getFiligreeColor());
		drawCircle(contextToAddTo, 723, 118, 64, getLightColor());

		//size label box
		contextToAddTo.fillStyle = getLightColor();
		contextToAddTo.fillRect(650, 197, 148, 23);

		//big tier box
		contextToAddTo.fillStyle = getFiligreeColor();
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
				UpdateCopymark(contextToAddTo);
			} catch {console.log("WARNING!: failed to update Copymark.");}
			try{
				UpdateBanner(contextToAddTo);
			} catch(error) {console.log("WARNING!: failed to update Banner." + error);}
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
		drawCardOutline(contextToAddTo);
	}

	function UpdateFaction(contextToAddTo){
		var ancestry = $("#unitAncestryInput").val();
		var factionIcon = new Image();
		factionIcon.onload = () => {
			contextToAddTo.drawImage(factionIcon, 166, 81);
		}
		factionIcon.src = `static/img/factions/${ancestry}.png`;
	}

	function UpdateCopymark(contextToAddTo){
		var maker = $("#makerInput").val();
		var copymark = new Image();
		copymark.onload = () => {
			contextToAddTo.drawImage(copymark, 378, 533);
		}
		copymark.src = `static/img/copymarks/${maker}.png`;
	}

	function UpdateBanner(contextToAddTo){
		drawBigBanner(contextToAddTo);
		drawSmallBanner(contextToAddTo);
		drawSwordBlade();
		drawSwordCrossguard();
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
		contextToAddTo.textAlign = "left";
		var TraitX = 220;
		var TraitY = 390;
		for (var i = 1; i <= 4; i++) {
			var trait = $(`#unitTrait${i}Input`).val();
			var fontSize = $(`#traitSizeInput${i}`).val();
			contextToAddTo.font = `${fontSize}pt Verdana`;
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

	function UnitTools(api){
		var unitData = GetUnitData();
		$.ajax("/api/v1/unittools/" + api,{
			data : JSON.stringify(unitData),
			contentType : "application/json",
			type:"POST",
			dataType:"json",
			success: UpdateUnitData,
			error: LevelUpFail
		})
	}

	function GetUnitData(){
		var unitData = {};
		unitData["name"] = $("#unitNameInput").val().trim();
		unitData["ancestry"] = $("#unitAncestryInput").val().trim();
		unitData["attack"] = parseInt($("#atkInput").val());
		unitData["attacks"] = parseInt($("#unitAttacksInput").val());
		unitData["battles"] = 0;
		unitData["command"] = parseInt($("#comInput").val());
		unitData["damage"] = parseInt($("#unitDamageInput").val());
		unitData["defense"] = parseInt($("#defInput").val());
		unitData["description"] = $("#unitDescriptionInput").val().trim();
		unitData["equipment"] = getEquipment();
		unitData["experience"] = getExperience();
		unitData["morale"] = parseInt($("#morInput").val());
		unitData["power"] = parseInt($("#powInput").val());
		unitData["tier"] = $("#unitTierInput").val().trim();
		unitData["toughness"] = parseInt($("#touInput").val());
		unitData["size"] = $("#unitSizeInput").val();
		//traits intentionally left unhandled.
		unitData["traits"] = [];
		unitData["type"] = $("#unitTypeInput").val().trim();
		return unitData;
	}

	function getExperience(){
		experience = $("#unitExperienceInput").val().trim();
		if (experience == "Super-Elite")
			experience = "SUPER_ELITE";
		return experience
	}

	function getEquipment(){
		equipment = $("#unitWeightInput").val().trim();
		if (equipment == "Super-Heavy")
			equipment = "SUPER_HEAVY";
		return equipment
	}

	function UpdateUnitData(data){
		$("#atkInput").val(data["attack"]);
		$("#defInput").val(data["defense"]);
		$("#powInput").val(data["power"]);
		$("#touInput").val(data["toughness"]);
		$("#morInput").val(data["morale"]);
		$("#comInput").val(data["command"]);
		UpdateEquipment(data["equipment"]);
		UpdateExperience(data["experience"]);
		$("#unitAttacksInput").val(data["attacks"]);
		$("#unitDamageInput").val(data["damage"]);
		UpdateUnitCard();
	}

	function UpdateEquipment(equipment){
		console.log("Equipment: " + equipment);
		var equipmentoption = "Light"
		if (equipment == "SUPER_HEAVY")
			equipmentoption = "Super-Heavy";
		else
			equipmentoption = equipment.charAt(0).toUpperCase() + equipment.slice(1).toLowerCase();
		$("#unitWeightInput").val(equipmentoption);
	}

	function UpdateExperience(experience){
		console.log("Experience: " + experience);
		var experienceOption = "Regular"
		if (experience == "SUPER_ELITE")
			experienceOption = "Super-Elite";
		else
		experienceOption = experience.charAt(0).toUpperCase() + experience.slice(1).toLowerCase();
		$("#unitExperienceInput").val(experienceOption);
	}

	function LevelUpFail(){
		alert("Something went wrong. Are you trying to level up Levies, or change experience past the possible range?");
	}

	function SaveColor(){
		var backgroundColor = $("#backgroundColor").val();
		var lightColor = $("#lightColor").val();
		var darkColor = $("#darkColor").val();
		var filigreeColor = $("#filigreeColor").val();
		var schemeName = $("#colorSchemeNameInput").val();
		if (schemeName.trim() == ""){
			console.warn("Did not save color scheme, blank name.");
			return;
		}
		CreateColorSchemeDropdownOption(schemeName, backgroundColor, darkColor, lightColor, filigreeColor);
		CreateColorSchemeTableEntry(schemeName, backgroundColor, darkColor, lightColor, filigreeColor);
		SaveColorToFile(schemeName, backgroundColor, darkColor, lightColor, filigreeColor);
	}

	function LoadColor(){
		var colorName = $("#colorSelect").val();
		console.log("background color: " + colorName);
		var backgroundColor = $("#colorSelect").find(":selected").data("background-color");
		var lightColor = $("#colorSelect").find(":selected").data("light-color");
		var darkColor = $("#colorSelect").find(":selected").data("dark-color");
		var filigreeColor = $("#colorSelect").find(":selected").data("filigree-color");
		console.log("background color: " + backgroundColor);
		$("#backgroundColor").val(backgroundColor);
		$("#darkColor").val(darkColor);
		$("#lightColor").val(lightColor);
		$("#filigreeColor").val(filigreeColor);
	}

	function DeleteColor(){
		var schemeName = $("#colorSelect").val();
		DeleteSelectedColorSchemeDropdownOption()
		DeleteColorSchemeTableEntry(schemeName);
		DeleteColorSchemeFromFile(schemeName);
	}

	function componentToHex(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}
	  
	function rgbToHex(r, g, b) {
		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}

	function CreateColorSchemeDropdownOption(schemeName, backgroundColor, darkColor, lightColor, filigreeColor){
		var option = document.createElement('option');
		option.value = schemeName;
		option.setAttribute("data-background-color", backgroundColor);
		option.setAttribute("data-dark-color", darkColor);
		option.setAttribute("data-light-color", lightColor);
		option.setAttribute("data-filigree-color", filigreeColor);
		option.innerHTML = schemeName;
		document.getElementById("colorSelect").appendChild(option);
	}

	function CreateColorSchemeTableColorLine(name, color){
		var entry = document.createElement('dd');
		entry.class = "colorSchemePreview";
		entry.style.borderLeft = "18px solid " + color;
		entry.innerHTML = name + ": " + color;
		return entry;
	}

	function CreateColorSchemeTableEntry(schemeName, backgroundColor, darkColor, lightColor, filigreeColor){
		var entryName = document.createElement('dt');
		entryName.class = "colorSchemeName";
		entryName.innerHTML = schemeName;
		var table = document.getElementById("colorSchemesTable");
		table.appendChild(entryName);
		table.appendChild(CreateColorSchemeTableColorLine("Backgound Color", backgroundColor));
		table.appendChild(CreateColorSchemeTableColorLine("Dark Color", darkColor));
		table.appendChild(CreateColorSchemeTableColorLine("Light Color", lightColor));
		table.appendChild(CreateColorSchemeTableColorLine("Filigree Color", filigreeColor));
	}

	function SaveColorToFile(schemeName, backgroundColor, darkColor, lightColor, filigreeColor){
		var jsonData = {"name":schemeName,
			"backgroundColor":backgroundColor,
			"lightColor":lightColor,
			"darkColor":darkColor,
			"filigreeColor":filigreeColor
		}
		$.ajax("/api/v1/colors",{
			data : JSON.stringify(jsonData),
			contentType : "application/json",
			type:"POST",
			dataType:"json"
		});
	}

	function DeleteSelectedColorSchemeDropdownOption(){
		document.getElementById("colorSelect").remove(document.getElementById("colorSelect").selectedIndex);
	}

	function DeleteColorSchemeTableEntry(schemeName){
		var rows = document.getElementsByClassName(schemeName + "Preview");
		while (rows.length > 0) {
			rows[0].remove();
		}
	}

	function DeleteColorSchemeFromFile(schemeName){
		var jsonData = {"name":schemeName}
		$.ajax("/api/v1/colors",{
			data : JSON.stringify(jsonData),
			contentType : "application/json",
			type:"DELETE",
			dataType:"json"
		});
	}
	  

})();