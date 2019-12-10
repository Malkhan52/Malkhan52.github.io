$(document).ready(function() {
	function validateEmail(mail) 
		{
		 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
		  {
		    return (true);
		  }
		    return (false);
		}
	function validateName(name){
		var regex = /^[a-zA-Z]*$/;
		if (regex.test(name)) {
			return (true);
		}
		return (false);
	}
	$("#submit").click(function() {
		var name = $("#firstName").val();
		var email = $("#email").val();
		var comment = $("#comment").val();
		if (name == '' || email == '' || comment == '') {
			$("#message").html("<p class='error'><b>Plseas fill complete form!</b></p>");
		}else if(!validateEmail(email)){
			$("#message").html("<p class='error'><b>Email is not in correct format. Try again!</b></p>");
		} else if (!validateName(name)) {
			$("#message").html("<p class='error'><b>Name can not contain numbers or special characters. Try again!</b></p>");
		} else {
		$.post("register.php", {
			name: name,
			email: email,
			comment: comment
		}, function(data) {
			if (data == 'success') {
				$("form")[0].reset();
				$("#message").html("<p class='success'><b>Hurray form is submitted successfully!</b></p>");
			}
			
		});
		}
	});
});