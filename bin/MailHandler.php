<?php
	$owner_email = 'pinakidey2006@gmail.com';
	$headers = 'From:' . $_POST["email"];
	$subject = 'A message from www.pinakidey.com by ' . $_POST["name"];
	$messageBody = "";
	
	$messageBody .= '<p>Visitor: ' . $_POST["name"] . '</p>' . "\n";
	$messageBody .= '<br>' . "\n";
	$messageBody .= '<p>Email Address: ' . $_POST['email'] . '</p>' . "\n";
	$messageBody .= '<br>' . "\n";
	$messageBody .= '<p>IP Address: ' . $_SERVER['HTTP_X_FORWARDED_FOR'] . '</p>' . "\n";
	$messageBody .= '<br>' . "\n";
	$messageBody .= '<p>Message: ' . $_POST['msg'] . '</p>' . "\n";
	
	$messageBody = strip_tags($messageBody);
	
	try{
		if(!mail($owner_email, $subject, $messageBody, $headers)){
			throw new Exception('Mail Failed');
		}else{
			echo 'Mail Sent';
		}
	}catch(Exception $e){
		echo $e->getMessage() ."\n";
	}
?>
