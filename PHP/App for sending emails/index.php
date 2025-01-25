<!DOCTYPE html>
<html>
<head>
</head>
<style>

#Body{
    background-color: rgb(227, 227, 227);
    height:100%;
    width: 100%;
   
    
}
#form{
        position: absolute;
        left:0px;
        height:500px;
        width:400px;
      
}
#form2{
        position: absolute;
        float:right;
        right:0px;
        height:800px;
        width:1200px;
      
}


.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>

<body>

<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
echo '
<div id="form">
<h1 style="text-align:center;">Send Email</h1>
<form action="" style="text-align:center;" method="post">
<Button type="submit" style="height:20px;width:70px" name="sub" value="Search" >Send</button>
</form>
</div>';
if (isset($_POST['sub'])) {
    $mail = new PHPMailer(true);
    try {
        //Server settings
        //$mail->SMTPDebug  = SMTP::DEBUG_OFF;
        //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP(); //Send using SMTP
        $mail->Host = "yours SMTP server here"; //Set the SMTP server to send through
        $mail->SMTPAuth = true; //Enable SMTP authentication
        $mail->Username = 'yours username here'; //SMTP username
        $mail->Password = 'yurs pasword here'; //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; //Enable implicit TLS encryption
        $mail->Port = 465; //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
        //Recipients
        $mail->setFrom('add a sender here', 'name');
        $mail->addAddress('add a recipient here', 'name'); //Add a recipient
        //$mail->addAddress('ellen@example.com');               //Name is optional
        //$mail->addReplyTo('info@example.com', 'Information');
        // $mail->addCC('cc@example.com');
        // $mail->addBCC('bcc@example.com');
        //Attachments
        // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
        //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name
        //Content
        $mail->isHTML(true); //Set email format to HTML
        $mail->Subject = 'Here is the subject';
        //$mail->AddEmbeddedImage("Image/1.png", "my-attach", "1.png");
        $mail->Body = "your HTML message here";
        $mail->send();
    }
    catch(Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
};
?>

</body>
</html>


