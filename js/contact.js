jQuery(function() {

  try{
  /* hide all errors */	
  jQuery('.error').hide();
  
  /* when the submit button is clicked lets do some validation */
  jQuery(".submit_btn").click(function() {
		
		
    jQuery('.error').hide();
	
	/* get the value of the name field, check its not empty, 
	  if it is, show the error for the name field, its the
	  same for all the fields */	
	var name = jQuery("input#name").val();
	if (name == "") {
      jQuery("span#name_error").show();
      jQuery("input#name").focus();
      return false;
    }
    
	var email = jQuery("input#email").val();
	if (email == "") {
      jQuery("span#email_error").show();
      jQuery("input#email").focus();
      return false;
    }
	
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	if(!emailReg.test(email)) {
	  jQuery("span#email_error2").show();
      jQuery("input#email").focus();
      return false;
	}
	
	var msg = jQuery("textarea#msg").val();
	if (msg == "") {
	  jQuery("span#msg_error").show();
	  jQuery("textarea#msg").focus();
	  return false;
    }
		
	/* concatenate all the field data into a string, ready to pass via ajax */
	var dataString = 'name='+ name + '&email=' + email + '&msg=' + msg;
		
	/* include the process.php via ajax  */
	  jQuery.ajax({
      type: "POST",
      url: "../bin/MailHandler.php",
      data: dataString,
      success: function() {
        jQuery('#contactform').html("<div id='message'></div>");
        jQuery('#message').html("<p>Your message has been received!<br />Thank you - I will be in touch soon.</p>")
        .hide()
        .fadeIn(1500, function() {
          jQuery('#message');
        });
      },
	  error: function() {
        jQuery('#contactform').html("<div id='message'></div>");
        jQuery('#message').html("<p>Sorry! An Error ocurred while sending your message! <br />Please try again later.</p>")
        .hide()
        .fadeIn(1500, function() {
          jQuery('#message');
        });
      }
     });
    return false;
	});
  }catch(error){console.log(error); console.log("Message Couldn't Be Sent!");}
});