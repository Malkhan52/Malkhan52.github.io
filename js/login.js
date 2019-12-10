$(document).ready(function() {
	$("#userData").hide();
	$("#login").click(function() {
		var email = $("#email").val();
		if (email == '') {
			$("#message").html("<p class='error'><b>Plseas fill complete form!</b></p>");
		}else {
			$.getJSON('array.json', function(data){
				// console.log(data);
				flag = false;
				$.each(data, function(key, val){
					if (val.email == email) {
						$("#name").html(val.name);
						$("#email").html(val.email);
						$("#comment").html(val.comment);
						flag = true;
						$("#loginForm").hide();
						$("#userData").show();
						// console.log("Logged In");
					}
				});
				if (!flag){
						$("#message").html("<p class='error'><b>Invailid login credential!!</b></p>");
						// console.log("Invailid!");
					}
			});
		}
	});
});