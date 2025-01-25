let var1 = '', var2 = '', operation = '';
document.getElementById("Screen").textContent = 0;




 


function SubmitDigit(arg1) {
 
    if (operation == '') {
        if (var1.length < 16) {
            var1 = var1 + arg1;
           
        }
  
        document.getElementById("Screen").textContent = var1 + "\r\n" + operation + "\r\n" + var2;

    } else {
        if (var2.length < 16) {
            var2 = var2 + arg1;
        }
        document.getElementById("Screen").textContent =var1 + "\r\n" + operation + "\r\n" + var2;
    }
}


function SubmitOperation(arg1) {

    if (var2 == '' && var1 == '') {
        var1 = '0'
        operation = arg1;
        document.getElementById("Screen").textContent = var1 + "\r\n" + operation;

    } else if (var2 == '' && var1 != '') {
        operation = arg1;
        document.getElementById("Screen").textContent = var1 + "\r\n" + operation;
    } else if (var2 != '') {

        Calc(var1, var2, operation);
        var2 = '';
        operation = arg1;
        document.getElementById("Screen").textContent = var1 + "\r\n" + operation + "\r\n" + var2;
    }
}


function Calc(arg1, arg2, arg3) {
    if (arg3 == '-') {
        var1 = parseFloat(arg1) - parseFloat(arg2);

    } else if (arg3 == '+') {
        var1 = parseFloat(arg1) + parseFloat(arg2);

    } else if (arg3 == '*') {
        var1 = parseFloat(arg1) * parseFloat(arg2);

    } else if (arg3 == '/') {
        if (parseFloat(arg2) == 0) {
            var1 = 'error, cant devide by 0';
        } else {
            var1 = parseFloat(arg1) / parseFloat(arg2);
        }
    }

    var1=String(var1);
    if (var1.length>23){
        document.getElementById("Screen").style.fontSize="2.2vmin";
    } else{
        document.getElementById("Screen").style.fontSize="3.6vmin";
    }
}

function SubmitPow() {
    if (var2 == '') {
        var1 = Decimal.pow(var1,2);
        document.getElementById("Screen").textContent = var1;
    } else if (var2 != '') {
        var1 = Decimal.pow(var2,2);
        document.getElementById("Screen").textContent = var1;
    }
    operation = '';
    var2 = '';
    var1=String(var1);
 
    if (var1.length>23){
        document.getElementById("Screen").style.fontSize="2.2vmin";
    } else{
        document.getElementById("Screen").style.fontSize="3.6vmin";
    }
}

function SubmitSqrt() {
    if (var2 == '') {
        var1 = Decimal.sqrt(var1);
        document.getElementById("Screen").textContent = var1;
    } else if (var2 != '') {
        var1 = Decimal.sqrt(var2);
        document.getElementById("Screen").textContent = var1;
    }
    operation = '';
    var2 = '';
   
    var1=String(var1);
    if (var1.length>23){
        document.getElementById("Screen").style.fontSize="2.2vmin";
    } else{
        document.getElementById("Screen").style.fontSize="3.6vmin";
    }
}



function SubmitClear() {
    var1 = '';
    var2 = '';
    operation = '';
    document.getElementById("Screen").textContent = '0';
}

function SubmitEql() {
    if (var1 != '' && operation != '' && var2 != '') {
        Calc(var1, var2, operation);
        var2 = '';
        operation = '';
        document.getElementById("Screen").textContent = var1;
    }
}


function SubmitClearLastDig() {
    if (operation == '' && var1.length > 0) {
        var1 = var1.substring(0, var1.length - 1);
        document.getElementById("Screen").textContent = var1;
    } else if (operation != '' && var2.length > 0) {
        var2 = var2.substring(0, var2.length - 1);
        document.getElementById("Screen").textContent = var1 + "\r\n" + operation + "\r\n" + var2;
    }
}



function SubmitDecimal() {
    if (operation == '' && !var1.includes('.')) {
        if (var1 == '') {
            var1 = '0.'
        } else {
            var1 = var1 + '.';
        }

        document.getElementById("Screen").textContent = var1;
    } else if (operation != '' && !var2.includes('.')) {
        if (var2 == '') {
            var2 = '0.'
        } else {
            var2 = var2 + '.';
        }

        document.getElementById("Screen").textContent = var1 + "\r\n" + operation + "\r\n" + var2;
    }
}
/* function Convert1000(str){
    let str2='';
while (str.length>3){
    str2=','+str.substring(str.length-3,str.length)+str2;
    str=str.substring(0,str.length-3);
    
 }
if (str.length>0){
    str2=str+str2;
    
}else{
    str2=str2.substring(0,1);
    

}
return str2;
} */
