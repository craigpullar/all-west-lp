<?php


   // $to = "craigmichaelpullar@gmail.com"; // <– replace with your address here
   // $subject = "Test mail";
   // $message = "Hello! This is a simple test email message.";
   // $from = "mailer@allwest.recsite.com";
   // $headers = "From:" . $from;
   // mail($to,$subject,$message,$headers);
   // echo "Mail Sent.";

ini_set("SMTP", "smtp.com");
ini_set("sendmail_from", "notifications@allwest.recsite.com");

   $to = "David.Cole@coachusa.com"; // <– REPLACE WITH COACH USA ADDRESS
   $subject = "Inquiry from " . $_POST['name'];
   $message = $_POST['message'];
   $message .= "\r\n\r\n";
   $message .= "From " . $_POST['name'];
   $message .= "\r\n\r\n";
   $message .= "At " . $_POST['email'];
   $from = "notifications@allwest.recsite.com";
   $headers = "From:" . $from;
   if(!mail($to,$subject,$message,$headers)){
   	return false;
   }
   return true;
   ?>