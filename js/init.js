$(document).ready(function(){
	$('#postcode-button').click(function(evt){
		getMap(); 
	});
	$('#postcode-input').bind("enterKey",function(e){
		getMap();
	});
	$('#postcode-input').keyup(function(e){
	    if(e.keyCode == 13)
	    {
	        $(this).trigger("enterKey");
	    }
	});
})

function getMap(){
	var postcode = $('#postcode-input').val();
	if(valid_postcode(postcode)){
		$.ajax("https://api.postcodes.io/postcodes/" + postcode.replace(/\s/g,''),{
			success: function(data){
				var userlat = parseFloat(data.result.latitude);
				var userlng = parseFloat(data.result.longitude);
				getData(userlat, userlng);
			},
			error: function(err){
				console.log(err);
			}
		})
	}else{
		alert("Invalid postcode.")
	}
    evt.preventDefault();
}

function valid_postcode(postcode) {
    postcode = postcode.replace(/\s/g, "");
    var regex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})$/i;
    return regex.test(postcode);
}