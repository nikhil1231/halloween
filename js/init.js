var userlat = "";
var userlng = "";

$(document).ready(function(){
	$('#postcode-button').click(function(){
		var postcode = $('#postcode-input').val();
		if(valid_postcode(postcode)){
			$.ajax("http://api.postcodes.io/postcodes/" + postcode.replace(/\s/g,''),{
				success: function(data){
					userlat = data.result.latitude;
					userlng = data.result.longitude;
				},
				error: function(err){
					console.log(err);
				}
			})
		}else{
			alert("Invalid postcode.")
		}
	})

})

function valid_postcode(postcode) {
    postcode = postcode.replace(/\s/g, "");
    var regex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})$/i;
    return regex.test(postcode);
}