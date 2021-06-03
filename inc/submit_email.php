<?php

$email = $_POST['email'];
$subject = $_POST['subject'];
$body = $_POST['body'];

$body .= "<br><br>Email: $email";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

mail("haidous.m@gmail.com", $subject, $body);
