<!DOCTYPE html>
<html>
<head>
<script src="jquery-3.7.1.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
</head>
<style>
 

 body{
  background-color: #e6e6e6;
    height:100%;
    width: 100%;
}





</style>


<body>
<script>

$(document).click(function(e) { 
   
    if (e.button == 0) {
      document.getElementById("MPP").focus();
    }
});
</script>



<script>


$('body').on('click','.class',function(){
   
    document.getElementById("MPP").focus();
});




window.onfocus = function() {
  document.getElementById("MPP").focus();
};




    document.onkeydown=function(evt){
        var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
        if(keyCode == 13)
        {
  
          document.getElementById("test").submit();
        }
    }


 
   
 






function setfocus(){

document.getElementById("MPP").focus();
}
</script>




<?php
require_once "Classes/PHPExcel.php";
///include("conn/phpconn.php");
session_name("smd2");
session_start();

if (empty($_SESSION["inputno"])) {
    $_SESSION["inputno"] = "";
}

//form

echo '
<form action="" id="test" style="text-align:center;float:left;position:absolute;opacity:0; top:0px;" method="post">
<h1 style="text-align:center;"></h1>
<input type="text"  id="MPP" name="inputno"  autocomplete="off" size="30"  autofocus >
<Button type="submit" style="height:20px;width:90px" name="sub" value="click" >-> ТУК <-</button>
</form>';

echo '<div id="div1" onclick="setfocus();" style="left:0px;top:45px;height:95%;width:100%;position:absolute;"><p style="text-align:center;top:50px;position:relative; font-size:140px;" >' .
    $_SESSION["inputno"] .
    "</p>";

echo '<p style="text-align:center;top:50px;position:relative; font-size:140px;" >' .
    $_SESSION["inputno"] .
    "</p>";

if (isset($_POST["sub"])) {
    if (!empty($_POST["inputno"]))  else {
        $inputno = $_POST["inputno"];
        $tablename = "table name here";

        $sql = "SELECT * FROM $tablename WHERE [Lot No_]='$inputno'";
        $result = sqlsrv_query($conn, $sql);
        if ($result == false) {
            die(print_r(sqlsrv_errors(), true));
        }
        if (sqlsrv_has_rows($result) == true) {
            $_SESSION["inputno"] = $inputno;

            if (!is_dir("dir here/" . $inputno . "/")) {
                mkdir("dir here/" . $inputno . "/");
                copy("dir here/" . $inputno . "/" . $inputno . ".xlsx");
            }

            header("Refresh:0");
        }
    }
}
?>


</body>

</html>


