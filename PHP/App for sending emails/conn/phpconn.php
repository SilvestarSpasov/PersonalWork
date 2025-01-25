



<?php
 $dbServername ="";
 
 $connection=[
  "Database"=>"SET",
  "UID"=>'',
  "PWD"=>'',
  "CharacterSet" => "UTF-8",
  "TrustServerCertificate"=>true
  ];


 $conn=sqlsrv_connect($dbServername,$connection) or die( print_r( sqlsrv_errors(), true) );
  
?>