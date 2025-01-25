<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="jquery-3.7.1.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
</head>
<style>
 

 body{
  background-color: #e6e6e6;
    height:100%;
    width: 100%;
    background-image: url('Pictures/1.jpg');
    background-repeat: no-repeat;
    
    background-attachment: fixed;
  background-size: cover;
}

select option{
  font-size: 20px;
}
select {
  font-size: 20px;
}


#maindiv
{

 margin-top:150px;
  height:600px;
  width:100%;
}

#labeldiv
{
 background-color:white;
  height:320px;
  width:26%;
  left:100px;
  position: relative;
  float:left;
}
#fielddiv
{
  margin-right:40px;
  height:500px;
  width:60%;
  position: relative;
  float:right;
  
}
#mainform{
  background-color:white;
  height:400px;
  width:700px;
  position: relative;
  left:30%;
}

</style>

<script>
//function that setting focus on 
    window.onfocus = function() {
      document.getElementById("MPP").focus();
    }

    //submit the form on press enter or scan with barcode reader
    document.onkeydown=function(evt){
        var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
        if(keyCode == 13)
        {
          document.getElementById("mainform").submit();
        }
    }
//function that setting focus on 
    function setfocus(){
      document.getElementById("MPP").focus();
    }
</script>

<body>





<?php
ob_start();
session_name('lakirane');
session_start();
date_default_timezone_set('Europe/Sofia');
require_once ("Classes/PHPExcel.php");
//include("conn/phpconn.php");

//declaration of SESSION vars
if (empty($_SESSION['user'])) {
    $_SESSION['user'] = '';
}
if (empty($_SESSION['operation'])) {
    $_SESSION['operation'] = '';
}
if (empty($_SESSION['orderno'])) {
    $_SESSION['orderno'] = '';
}
if (empty($_SESSION['artno'])) {
    $_SESSION['artno'] = '';
}
if (empty($_SESSION['description'])) {
    $_SESSION['description'] = '';
}
if (empty($_SESSION['quantity'])) {
    $_SESSION['quantity'] = '';
}
if (empty($_SESSION['remeiningquantity'])) {
    $_SESSION['remeiningquantity'] = '';
}

//echo form
echo '
 <div id="maindiv">
 <form action="" id="mainform" style="text-align:center;position:relative; " method="post">
 <h1 style="text-align:center;"> Лакиране</h1>
 <div id="labeldiv">
 <label style="float:right;text-align: right;margin-top:3px; margin-right:40px;">Служител</label> 
 <label style="float:right;margin-top:18px;width:100%;text-align: right; margin-right:40px;">Операция</label> 
 <label style="float:right;margin-top:18px;width:100%;text-align: right; margin-right:40px;">Сериен Номер</label> 
 <label style="float:right;margin-top:20px;width:100%;text-align: right; margin-right:40px;">Поръчка No.</label> 
 <label style="float:right;margin-top:20px;width:100%;text-align: right; margin-right:40px;">М-арт No.</label> 
 <label style="float:right;margin-top:18px;width:100%;text-align: right; margin-right:40px;">Описание</label> 
 <label style="float:right;margin-top:18px;width:100%;text-align: right; margin-right:40px;">Количество</label> 
 <label style="float:right;margin-top:18px;width:100%;text-align: right; margin-right:40px;">Остатъчно количество</label> 
<label style="float:right;margin-top:18px;width:100%;text-align: right; margin-right:40px;">Последно чекирана платка</label> 
 </div>



 <div id="fielddiv">
 

 <select onChange="setfocus()" style="float:left;margin-left:10px;width:102%;" name="user" id="user" >';
if (!empty($_SESSION['user']) && ($_SESSION['user']) == "Operator 1") {
    echo '<option style="" selected value="Operator 1">Operator 1</option>';
} else {
    echo '<option style="" value="Operator">Operator 1</option>';
}
if (!empty($_SESSION['user']) && ($_SESSION['user']) == "Operator 2") {
    echo '<option style="" selected  value="Operator 2">Operator 2</option>';
} else {
    echo '<option style="" value="Operator 2">Operator 2</option>';
}
if (!empty($_SESSION['user']) && ($_SESSION['user']) == "Operator 3") {
    echo '<option style="" selected value="Operator 3">Operator 3</option>';
} else {
    echo '<option style="" value="Operator 3">Operator 3</option>';
}
if (!empty($_SESSION['user']) && ($_SESSION['user']) == "Operator 4") {
    echo '<option style="" selected value="Operator 4">Operator 4</option>';
} else {
    echo '<option style="" value="Operator 4">Operator 4</option>';
}
if (!empty($_SESSION['user']) && ($_SESSION['user']) == "Operator 5") {
    echo ' <option style="" selected value="Operator 5">Operator 5</option>';
} else {
    echo ' <option style="" value="Operator 5">Operator 5</option>';
}
if (!empty($_SESSION['user']) && ($_SESSION['user']) == "Operator 6") {
    echo ' <option style="" selected value="Operator 6">Operator 6</option>';
} else {
    echo ' <option style="" value="Operator 6">Operator 6</option>';
}
echo '
 </select>
 <select onChange="setfocus()" style="float:left;margin-left:10px;margin-top:8px; width:102%;font-size: 20px;" name="operation" id="operation" >';
if (!empty($_SESSION['operation']) && ($_SESSION['operation']) == "Машино лакиране") {
    echo '<option style="" selected value="Машино лакиране">Машино лакиране</option>';
} else {
    echo '<option style="" value="Машино лакиране">Машино лакиране</option>';
}
if (!empty($_SESSION['operation']) && ($_SESSION['operation']) == "Контрол") {
    echo '  <option style="" selected value="Контрол">Контрол</option>';
} else {
    echo '  <option style="" value="Контрол">Контрол</option>';
}
echo '
 </select>';
echo '<input type="text"  style="float:left;margin-left:10px;margin-top:8px; width:100%;font-size: 20px;" id="MPP" name="MPP"  autocomplete="off"   autofocus >';
if (!empty($_SESSION['orderno'])) {
    echo '<input type="text"  style="float:left;margin-left:10px;margin-top:8px; width:100%;font-size: 20px;"   autocomplete="off" readonly value="' . $_SESSION['orderno'] . '">';
} else {
    echo '<input type="text"  style="float:left;margin-left:10px;margin-top:8px; width:100%;font-size: 20px;"   autocomplete="off" readonly >';
}
if (!empty($_SESSION['artno'])) {
    echo '<input type="text"  style="float:left;margin-left:10px;margin-top:8px; width:100%;font-size: 20px;"   autocomplete="off" readonly value="' . $_SESSION['artno'] . '">';
} else {
    echo '<input type="text"  style="float:left;margin-left:10px;margin-top:8px; width:100%;font-size: 20px;"   autocomplete="off" readonly >';
}
if (!empty($_SESSION['description'])) {
    echo '<input type="text"  style="float:left;margin-left:10px;margin-top:8px; width:100%;font-size: 20px;"   autocomplete="off" readonly value="' . $_SESSION['description'] . '">';
} else {
    echo '<input type="text"  style="float:left;margin-left:10px;margin-top:8px; width:100%;font-size: 20px;"   autocomplete="off" readonly >';
}
if (!empty($_SESSION['quantity'])) {
    echo '<input type="text"  style="float:left;margin-left:10px;margin-top:8px; width:100%;font-size: 20px;"   autocomplete="off" readonly value="' . $_SESSION['quantity'] . '">';
} else {
    echo '<input type="text"  style="float:left;margin-left:10px;margin-top:8px; width:100%;font-size: 20px;"  autocomplete="off" readonly >';
}
if (!empty($_SESSION['remeiningquantity'])) {
    echo '<input type="text"  style="float:left;margin-left:10px;margin-top:8px; width:100%;font-size: 20px;"   autocomplete="off" readonly value="' . $_SESSION['remeiningquantity'] . '">';
} else {
    echo '<input type="text"  style="float:left;margin-left:10px;margin-top:8px; width:100%;font-size: 20px;"   autocomplete="off" readonly >';
}
if (!empty($_SESSION['MPP'])) {
    echo '<input type="text"  style="float:left;margin-left:10px;margin-top:8px; width:100%;font-size: 20px;"  autocomplete="off" readonly   value="' . $_SESSION['MPP'] . '">';
} else {
    echo '<input type="text"  style="float:left;margin-left:10px;margin-top:8px; width:100%;font-size: 20px;"   autocomplete="off"  readonly  >';
}
echo '<button type="submit"  style="float:left;margin-left:10px;margin-top:8px; width:130px;font-size: 20px;opacity:0;" name="sub" value="click" >Отчети</button>
 </div>';

 // show scheme of the item
if (!empty($_SESSION['artno']) && file_exists("dir here/" . $_SESSION['artno'] . ".jpg")) {
    copy("dir here/" . $_SESSION['artno'] . ".jpg", "Pictures/" . $_SESSION['artno'] . ".jpg");
    echo '<img src="Pictures/' . $_SESSION['artno'] . '.jpg" alt=" t" style="margin-top:-240px;"width="700" height="500" >';
}
echo '</div>';


//
if (isset($_POST['sub'])) {
    if (!empty($_POST['MPP'])) {
        $_SESSION['MPP'] = $_POST['MPP'];
        $_SESSION['user'] = $_POST['user'];
        $_SESSION['operation'] = $_POST['operation'];
        $MPP = $_POST['MPP'];
       
        $MPP2 = substr($MPP, 4);
        $MPP2pos = strpos($MPP2, "-");
        $MPP2 = substr($MPP, 0, 4) . substr($MPP2, 0, $MPP2pos);
        $tablename = 'tablename here';
        $sql = "SELECT * FROM $tablename WHERE [Lot No_]='$MPP2'";
        $result = sqlsrv_query($conn, $sql);
        if ($result == false) {
            die(print_r(sqlsrv_errors(), true));
        }
        if (sqlsrv_has_rows($result) == true) {
            $row = sqlsrv_fetch_array($result);
            $_SESSION['orderno'] = $row['Order No_'];
            $_SESSION['artno'] = $row['Item No_'];
            $_SESSION['description'] = $row['Description'];
            $_SESSION['quantity'] = round($row['Quantity']);

            //create directory if not exist and make new xlsx file
            if (!is_dir("dir here/" . $MPP2 . "/")) {
                mkdir("dir here/" . $MPP2 . "/");
                copy("dir here/shablon.xlsx", "dir here/" . $MPP2 . "/" . $MPP2 . ".xlsx");
            }
            $path = "dir here/" . $MPP2 . "/" . $MPP2 . ".xlsx";
            $reader = PHPExcel_IOFactory::createReaderForFile($path);
            $excel_Obj = $reader->load($path);
            $worksheet = $excel_Obj->getSheet('0');
            $worksheetData = $reader->listWorksheetInfo($path);
            $totalRows = $worksheetData[0]['totalRows'];
            $phpExcel = new PHPExcel;
            $phpExcel->getProperties()->setTitle("2024");
            $writer = PHPExcel_IOFactory::createWriter($phpExcel, "Excel2007");
            $sheet = $phpExcel->getActiveSheet();
            $sheet->setTitle('My product list');
            $_SESSION['remeiningquantity'] = $_SESSION['quantity'] - $totalRows;
            for ($i = 1;$i <= $totalRows;$i++) {
                $sheet->getCell('A' . $i)->setValue($worksheet->getCell('A' . $i)->getValue());
                $sheet->getCell('B' . $i)->setValue($worksheet->getCell('B' . $i)->getValue());
                $sheet->getCell('C' . $i)->setValue($worksheet->getCell('C' . $i)->getValue());
                $sheet->getCell('D' . $i)->setValue($worksheet->getCell('D' . $i)->getValue());
                $sheet->getCell('E' . $i)->setValue($worksheet->getCell('E' . $i)->getValue());
                $sheet->getCell('F' . $i)->setValue($worksheet->getCell('F' . $i)->getValue());
                $sheet->getCell('G' . $i)->setValue($worksheet->getCell('G' . $i)->getValue());
            }
            $sheet->getCell('A' . $totalRows + 1)->setValue($_SESSION['user']);
            $sheet->getCell('B' . $totalRows + 1)->setValue($_SESSION['operation']);
            $sheet->getCell('C' . $totalRows + 1)->setValue($MPP2);
            $sheet->getCell('D' . $totalRows + 1)->setValue($_SESSION['artno']);
            $sheet->getCell('E' . $totalRows + 1)->setValue($_SESSION['description']);
            $sheet->getCell('F' . $totalRows + 1)->setValue($MPP);
            $sheet->getCell('G' . $totalRows + 1)->setValue(date('H:i:s d.m.Y ', time()));
            $writer->save("dir here/" . $MPP2 . "/" . $MPP2 . ".xlsx");
            header("Refresh:0");
            exit;
        }
    }
}
ob_end_flush();
?>


</body>

</html>


