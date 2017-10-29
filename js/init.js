function onReady(){
	$('#postcode-button').click(function(evt){
		getMap(evt); 
	});
	$('#postcode-input').bind("enterKey",function(evt){
		getMap(evt);
	});
	$('#location-button').click(function(evt){
		if (navigator.geolocation) {
        	navigator.geolocation.watchPosition(showPos);
			
			$("#postcode-error").html('Loading...');
	    } else {
	        $("#postcode-error").html('Location unavailable');
	    }
	});

	$('#postcode-input').keyup(function(e){
	    if(e.keyCode == 13)
	    {
	        $(this).trigger("enterKey");
	    }
	});
}

function showPos(pos){
	getData(pos.coords.latitude, pos.coords.longitude);
}
onReady();

function getMap(e){
	var postcode = $('#postcode-input').val();
	if(valid_postcode(postcode)){
		$.ajax("https://api.postcodes.io/postcodes/" + postcode.replace(/\s/g,''),{
			success: function(data){
				var userlat = parseFloat(data.result.latitude);
				var userlng = parseFloat(data.result.longitude);
				getData(userlat, userlng);
				$("#postcode-error").html('Loading...');
			},
			error: function(XHR, stat, err){
				console.log(err);
				if(err == "Not Found"){
					$("#postcode-error").html("Postcode not found, please try again.");
				}else{
					$("#postcode-error").html(err);
				}
			}
		})
	}else{
		$("#postcode-error").html("Invalid postcode.");
	}
    e.preventDefault();
}

function valid_postcode(postcode) {
    postcode = postcode.replace(/\s/g, "");
    var regex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})$/i;
    return regex.test(postcode);
}