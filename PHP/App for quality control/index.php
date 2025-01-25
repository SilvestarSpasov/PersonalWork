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

select option{
  font-size: 20px;
}
select {
  font-size: 20px;
}
</style>


<body>

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

    var x = 1;

    //function that change color if the background to signals an error
    function error(){
      if (x<25){
        document.body.style.background = "#ff0000";
        x++;
      }
      if (x==25){
        document.body.style.background = "#e6e6e6";
        $_SESSION['error']=false;
        exit;
      }   
    }

    var y = 1;
   //function that change color if the background to signals an finished order
    function success(){
      if(y==1){
        y=0;
        document.body.style.background = "#e6e6e6";
      }else
      {
        y=1;  
        document.body.style.background = "#37ff00";
      }
    }

    var z = 1;
    //function that change color if the background to signals an finished order but wrong input after that
    function errorandsuccess(){
      if(z==1){
        z=0;
        document.body.style.background = "#ff0000";
      }else
      {
        z=1;  
       
        document.body.style.background = "#37ff00";
      }
    }

    var xy= 1;

    //function that change color if the background to signals an right item from the order
    function shortsuccess(){
     // $_SESSION['error']=false;
      if (xy<25){
        document.body.style.background = "#37ff00";
        xy++;
      }
      if (xy==25){
        document.body.style.background = "#e6e6e6";
        $_SESSION['shortsuccess']=false;
        exit;
      }
    }

    function setfocus(){
    document.getElementById("MPP").focus();
    }

</script>




<?php
session_name("smd");
session_start();

require_once "Classes/PHPExcel.php";
// include("conn/phpconn.php");

//INIT
if (empty($_SESSION["inputno"])) {
    $_SESSION["inputno"] = "";
}
if (empty($_SESSION["inputnoart"])) {
    $_SESSION["inputnoart"] = "";
}
if (empty($_SESSION["error"])) {
    $_SESSION["error"] = false;
}
if (empty($_SESSION["errorandsuccess"])) {
    $_SESSION["errorandsuccess"] = false;
}
if (empty($_SESSION["success"])) {
    $_SESSION["success"] = false;
}

if (empty($_SESSION["itemlist"])) {
    $_SESSION["itemlist"] = [];
}

if (empty($_SESSION["itemlistsmd"])) {
    $_SESSION["itemlistsmd"] = [];
}

if (empty($_SESSION["shortsuccess"])) {
    $_SESSION["shortsuccess"] = false;
}

if (empty($_SESSION["checkitemlistsmd"])) {
    $_SESSION["checkitemlistsmd"] = [];
}

if (empty($_SESSION["checkitemlistsmd2"])) {
    $_SESSION["checkitemlistsmd2"] = [];
}


$flag=true;
for ($t = 0; $t < count($_SESSION["checkitemlistsmd"]); $t++) {
    if ($_SESSION["checkitemlistsmd"][$t] != "checked") {
       $flag=false;
    }
}

for ($t = 0; $t < count($_SESSION["checkitemlistsmd2"]); $t++) {
    if ($_SESSION["checkitemlistsmd2"][$t] != "checked") {
      $flag=false;
    }
}
if ($flag==true &&(count($_SESSION["checkitemlistsmd"])>0 || count($_SESSION["checkitemlistsmd2"])>0 )){
  $_SESSION["success"] = true;
}else{
  $_SESSION["success"] = false;
}


//read excel file with components
if (
    !empty($_SESSION["inputno"]) &&
    is_dir("dir here/" . $_SESSION["inputno"] . "/")
) {
    $path =
        "dir here/" .
        $_SESSION["inputno"] .
        "/" .
        $_SESSION["inputno"] .
        ".xlsx";
    $reader = PHPExcel_IOFactory::createReaderForFile($path);
    $excel_Obj = $reader->load($path);
    $worksheet = $excel_Obj->getSheet("0");
    $worksheetData = $reader->listWorksheetInfo($path);
    $totalRows = $worksheetData[0]["totalRows"];
    $excel_Obj2 = $reader->load($path);
    $worksheet2 = $excel_Obj2->getSheet("1");
    $worksheetData2 = $reader->listWorksheetInfo($path);
    $totalRows2 = $worksheetData2[1]["totalRows"];
}

//input form

echo '
<form action="" id="test" style="text-align:center;float:left;position:absolute; top:0px;" method="post">
<h1 style="text-align:center;"></h1>
<input type="text"  id="MPP" name="inputno"  autocomplete="off" size="30"  style="opacity:0;" autofocus >
<Button type="submit" style="height:20px;width:90px;opacity:0;" name="sub" value="click" >-> ТУК <-</button>';

if (!empty($_SESSION["inputno"])) {
    echo '

<label style="left:150px;position:relative;";for="art">Машина 1</label> <select  onchange="setfocus();" style="opacity:1;left:150px;position:relative; height:40px;width:100px;" name="pos" id="pos" >';

    echo '<option value=""></option>';

    for ($i = 3; $i <= $totalRows; $i++) {
        $SIDENO = $worksheet->getCell("A" . $i)->getValue();
        $POSITIONNO = $worksheet->getCell("B" . $i)->getValue();

        echo '<option value="' .
            $SIDENO .
            $POSITIONNO .
            '">' .
            $SIDENO .
            $POSITIONNO .
            "</option>";
    }
    echo '
</select>






 <label style="left:150px;position:relative;" for="art">Машина 2</label> <select onchange="setfocus();" style="opacity:1;left:150px;position:relative;height:40px;width:100px;" name="pos2" id="pos2" >';

    echo '<option style=""value=""></option>';

    for ($i = 3; $i <= $totalRows2; $i++) {
        $SIDENO = $worksheet2->getCell("A" . $i)->getValue();
        $POSITIONNO = $worksheet2->getCell("B" . $i)->getValue();

        echo '<option  value="' .
            $SIDENO .
            $POSITIONNO .
            '">' .
            $SIDENO .
            $POSITIONNO .
            "</option>";
    }
    echo '
</select>
';
}
echo '

</form>
';
//

// label
echo '<div id="div1" onclick="setfocus();" style="left:0px;top:45px;height:95%;width:100%;position:absolute;"><p style="text-align:center;top:50px;position:relative; font-size:140px;" >' .
    $_SESSION["inputno"] .
    "</p>";

if ($_SESSION["error"] == false) {
    echo '<p style="text-align:center;top:50px;position:relative; font-size:140px;" >' .
        $_SESSION["inputnoart"] .
        "</p></div>";
} else {
    echo '<p style="text-align:center;top:50px;position:relative; font-size:140px;" >' .
        $_SESSION["inputnoart"] .
        " - ERROR</p></div>";
}

//

// signals
if (
    $_SESSION["shortsuccess"] == true &&
    $_SESSION["success"] == false &&
    $_SESSION["error"] == false
) {
    echo '<script type="text/javascript">',
        " setInterval(shortsuccess, 400);",
        "</script>";
} else if ($_SESSION["success"] == true && $_SESSION["error"] == true) {
    echo '<script type="text/javascript">',
        " setInterval(errorandsuccess, 400);",
        "</script>";
} else if ($_SESSION["error"] == true && $_SESSION["success"] == false) {
    echo '<script type="text/javascript">',
        " setInterval(error, 400);",
        "</script>";
} else if ($_SESSION["success"] == true && $_SESSION["error"] == false) {
    echo '<script type="text/javascript">',
        " setInterval(success, 400);",
        "</script>";
}
//


//SUB

if (isset($_POST["sub"])) {
    if (!empty($_POST["inputno"]))  {
        //INIT
        $pos = $_POST["pos"];
        $pos2 = $_POST["pos2"];
        $inputno = $_POST["inputno"];
        $tablename = 'table name here';
        $tablename2 = 'table name here';

        //check if the input is existing order
        $sql = "SELECT * FROM $tablename WHERE [Lot No_]='$inputno'";
        $result = sqlsrv_query($conn, $sql);
        if ($result == false) {
            die(print_r(sqlsrv_errors(), true));
        }
        if (sqlsrv_has_rows($result) == true) {
            //If the order exist, checks if the dir with the components file exist
            if (
                !is_dir("dir here/" . $inputno . "/")
            ) {
                $_SESSION["inputno"] = "Индекса няма директория";
                $_SESSION["inputnoart"] = "";
                header("Location: index.php");
                exit();
            }

            //$_SESSION['error']=false;
            $_SESSION["inputno"] = $inputno;

            // read the excel file of the order
            $path =
                "dir name here/" .
                $_SESSION["inputno"] .
                "/" .
                $_SESSION["inputno"] .
                ".xlsx";
            $reader = PHPExcel_IOFactory::createReaderForFile($path);

            $excel_Obj = $reader->load($path);
            $worksheet = $excel_Obj->getSheet("0");
            $worksheetData = $reader->listWorksheetInfo($path);
            $totalRows = $worksheetData[0]["totalRows"];

            $excel_Obj2 = $reader->load($path);
            $worksheet2 = $excel_Obj2->getSheet("1");
            $worksheetData2 = $reader->listWorksheetInfo($path);
            $totalRows2 = $worksheetData2[1]["totalRows"];

            //INIT
            $_SESSION["inputnoart"] = "";
            $_SESSION["success"] = false;
            $_SESSION["error"] = false;
            $_SESSION["shortsuccess"] = false;
            $_SESSION["errorandsuccess"] = false;
            $_SESSION["itemlist"] = [];
            $_SESSION["itemlistsmd"] = [];
            $_SESSION["checkitemlistsmd"] = [];
            $_SESSION["checkitemlistsmd2"] = [];
            $i = 0;
            $x = 0;
            $k = 0;

            //Вземане на номер на ПП
            $sql2 =
                "SELECT * FROM $tablename WHERE [Lot No_]='" .
                $_SESSION["inputno"] .
                "'";
            $result2 = sqlsrv_query($conn, $sql2);
            $row2 = sqlsrv_fetch_array($result2);
            $row2orderno = substr(
                $row2["Lot No_"],
                0,
                strpos($row2["Lot No_"], "_")
            );

            // make array with all components of the order from SQL
            $sql3 = "SELECT * FROM $tablename2 WHERE [Prod_ Order No_]='$row2orderno' and [Quantity per]!=0";
            $result3 = sqlsrv_query($conn, $sql3);
            while ($row3 = sqlsrv_fetch_array($result3)) {
                $_SESSION["itemlist"][$i] = $row3["Item No_"];
                $i++;
            }

            // make array with all components of the order from excel on side A. And put them into array 'itemlistsmd' if they not exist there
            for ($i = 3; $i <= $totalRows; $i++) {
                $SIDENO = $worksheet->getCell("A" . $i)->getValue();
                $POSITIONNO = $worksheet->getCell("B" . $i)->getValue();
                $ITEMNO = $worksheet->getCell("D" . $i)->getValue();
                $_SESSION["checkitemlistsmd"][$x] = $SIDENO . $POSITIONNO;
                if (!in_array($ITEMNO, $_SESSION["itemlistsmd"])) {
                    $_SESSION["itemlistsmd"][$k] = $ITEMNO;

                    $k++;
                }
                $x++;
            }

            $x = 0;
            //make array with all components of the order from excel on side B. And put them into array 'itemlistsmd' if they not exist there
            for ($i = 3; $i <= $totalRows2; $i++) {
                $SIDENO = $worksheet2->getCell("A" . $i)->getValue();
                $POSITIONNO = $worksheet2->getCell("B" . $i)->getValue();
                $ITEMNO = $worksheet2->getCell("D" . $i)->getValue();
                $_SESSION["checkitemlistsmd2"][$x] = $SIDENO . $POSITIONNO;
                if (!in_array($ITEMNO, $_SESSION["itemlistsmd"])) {
                    $_SESSION["itemlistsmd"][$k] = $ITEMNO;

                    $k++;
                }
                $x++;
            }

            header("Refresh:0");
            exit();
        } else {
            //checks if pos1 and pos 2 from the form are both selected or not selected 
            if (($pos == "" && $pos2 == "") || ($pos != "" && $pos2 != "")) {
                $_SESSION["inputnoart"] = $inputno;
                $_SESSION["error"] = true;
                header("Location: index.php");
                exit();
            }

            //Checks if the inputed item is from the list with items from the SQL
            if (in_array($inputno, $_SESSION["itemlist"])) {
                //Checks if the inputed item is from the list with items from the excel file (Side A)
                if ($pos != "") {
                    for ($i = 3; $i <= $totalRows; $i++) {
                        $SIDENO = $worksheet->getCell("A" . $i)->getValue();
                        $POSITIONNO = $worksheet->getCell("B" . $i)->getValue();
                        $ITEMNO = $worksheet->getCell("D" . $i)->getValue();
                        if (
                            $pos == $SIDENO . $POSITIONNO &&
                            $ITEMNO != $inputno
                        ) {
                            $_SESSION["inputnoart"] = $inputno;
                            $_SESSION["error"] = true;
                            header("Location: index.php");
                            exit();
                        }
                    }
                }

                ////Checks if the inputed item is from the list with items from the excel file (Side B)
                if ($pos2 != "") {
                    for ($i = 3; $i <= $totalRows2; $i++) {
                        $SIDENO = $worksheet2->getCell("A" . $i)->getValue();
                        $POSITIONNO = $worksheet2
                            ->getCell("B" . $i)
                            ->getValue();
                        $ITEMNO = $worksheet2->getCell("D" . $i)->getValue();

                        if (
                            $pos2 == $SIDENO . $POSITIONNO &&
                            $ITEMNO != $inputno
                        ) {
                            $_SESSION["inputnoart"] = $inputno;
                            $_SESSION["error"] = true;
                            header("Location: index.php");
                            exit();
                        }
                    }
                }

                $_SESSION["inputnoart"] = $inputno;


                 
                // Mark item as checked if exist in to 'itemlistsmd'
                if (in_array($inputno, $_SESSION["itemlistsmd"])) {
                    if ($pos != "") {
                        for (
                            $t = 0;
                            $t < count($_SESSION["checkitemlistsmd"]);
                            $t++
                        ) {
                            if ($_SESSION["checkitemlistsmd"][$t] == $pos) {
                                $_SESSION["checkitemlistsmd"][$t] = "checked";
                            }
                        }
                    }

                    if ($pos2 != "") {
                        for (
                            $t = 0;
                            $t < count($_SESSION["checkitemlistsmd2"]);
                            $t++
                        ) {
                            if ($_SESSION["checkitemlistsmd2"][$t] == $pos2) {
                                $_SESSION["checkitemlistsmd2"][$t] = "checked";
                            }
                        }
                    }
                }

                $_SESSION["shortsuccess"] = true;
                $_SESSION["error"] = false;
                header("Location: index.php");
                exit();
            }

            //--> end of item check
            else {
                $_SESSION["inputnoart"] = $inputno;
                $_SESSION["error"] = true;

                header("Location: index.php");
                exit();
            }
        } //->end of is it not an order
    } //-> end of empty input
} //-> end of sub


?>


</body>

</html>


