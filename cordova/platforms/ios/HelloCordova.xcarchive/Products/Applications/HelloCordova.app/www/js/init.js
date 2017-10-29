var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        onReady();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {

    }
};

app.initialize();

// function listDir(path){
//   window.resolveLocalFileSystemURL(path,
//     function (fileSystem) {
//       var reader = fileSystem.createReader();
//       reader.readEntries(
//         function (entries) {
//           console.log(entries);
//         },
//         function (err) {
//           console.log(err);
//         }
//       );
//     }, function (err) {
//       console.log(err);
//     }
//   );
// }



// onReady();

function onReady(){
	$('#postcode-button').click(function(evt){
		getMap(evt); 
	});
	$('#postcode-input').bind("enterKey",function(e){
		getMap(evt);
	});
	$('#postcode-input').keyup(function(e){
	    if(e.keyCode == 13)
	    {
	        $(this).trigger("enterKey");
	    }
	});
}

function getMap(e){
	var postcode = $('#postcode-input').val();
	if(valid_postcode(postcode)){
		$.ajax("https://api.postcodes.io/postcodes/" + postcode.replace(/\s/g,''),{
			success: function(data){
				var userlat = parseFloat(data.result.latitude);
				var userlng = parseFloat(data.result.longitude);
				getData(userlat, userlng);
				$("#postcode-error").html('');
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