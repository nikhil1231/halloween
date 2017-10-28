var userlat = "";
var userlng = "";

$(document).ready(function(){
	var postcode = "se21 8ae";

	$.ajax("http://api.postcodes.io/postcodes/" + postcode.replace(/\s/g,''),{
		success: function(data){
			console.log(data);
		},
		error: function(err){
			console.log(err);
		}
	})
})