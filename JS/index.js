
// teku6 izbor ot menuto za stoinost
let currentdigit = 0;
// generiraniq re6en pyzel sudoku
let generatedarr =[];
// masiv s izbranite proizvolno lipsva6i poleta ot re6eniq pyzel
let arrremuvedblocks=[];
// popylneniq pyzel
let solvedarr=[];
//
let i,j,n,k,x,y;
//masiv s vuzmojni cifri za vsqko pole
let avdigits=[];
//
//let gamestarted=false;
//status za zavy6vane
let finished=false;
let gamestarted=false;
//opciq za cvqt
let nextdigitscolor="black";
let arrbackgroundcolor=[3,4,5,12,13,14,21,22,23,27,28,29,33,34,35,36,37,38,42,43,44,45,46,47,51,52,53,57,58,59,66,67,68,75,76,77];

let language="BG";

//opciq darkmode
let darkmode=false;//=document.getElementById("darkmode").checked;
//
//sekundi
let time=0;

// chas,minuti,sekundi v int
let h,m,s;
// chas,minuti,sekundi v string
let hh,mm,ss;
//
let backgroundcolordigitsdarkmode="rgb(179, 143, 0)";
let backgroundcolordigitsnodarkmode="rgb(255, 255, 153)";
let backgroundcolortilesdarkmode="rgb(51, 51, 50)";
let backgroundcolortilesnodarkmode="rgb(230, 230, 230)";

let timerr;


initializeBoard();
function initializeBoard(){
   
 

     //syzdavane na borda na pyzela


        for( i = 0; i<10; i++){
        
            let tile=document.createElement("div");
            tile.id="0"+i.toString();
            tile.classList.add("tile");    
            document.getElementById("board").append(tile);

            if(darkmode){
               
              
                if (arrbackgroundcolor.includes(i)) {
                 tile.style.backgroundColor=backgroundcolortilesdarkmode;
                 } else{
                    tile.style.backgroundColor="black";   
                 }   
             }else{

                 if (arrbackgroundcolor.includes(i)) {
                     tile.style.backgroundColor=backgroundcolortilesnodarkmode;
                     } else{
                     tile.style.backgroundColor="white";   
                     } 
                
             }
        }

        for( i = 10; i<81; i++){
        
                let tile=document.createElement("div");
                tile.id=i.toString()
                tile.classList.add("tile");      
                document.getElementById("board").append(tile);
                if(darkmode){
               
              
                    if (arrbackgroundcolor.includes(i)) {
                     tile.style.backgroundColor=backgroundcolortilesdarkmode;
                     } else{
                        tile.style.backgroundColor="black";   
                     }   
                 }else{
    
                     if (arrbackgroundcolor.includes(i)) {
                         tile.style.backgroundColor=backgroundcolortilesnodarkmode;
                         } else{
                         tile.style.backgroundColor="white";   
                         } 
                    
                 }
        }

         //syzdavane na menuto za cifra na poplyvane
        for (n=0 ; n<=9;n++){
            let digit=document.createElement("div");
            digit.id=n;

            if (n==0){
                digit.textContent = "C" ;
                digit.style.backgroundColor=backgroundcolordigitsnodarkmode;
            }else{
                digit.textContent = n ;
            }
            digit.classList.add("digit");
            document.getElementById("digits").append(digit);

        }

        
        const digits= document.querySelectorAll(".digit");
        digits.forEach(digit => digit.addEventListener("click", digitClicked));

        const tiles= document.querySelectorAll(".tile");
        tiles.forEach(tile => tile.addEventListener("click", tileClicked));
        
}



 //funkciq pri klik menu za cifra
 function digitClicked(){
   
    let prevdigit = document.getElementById(currentdigit.toString());
    if(darkmode){ 
    prevdigit.style.backgroundColor="black";
    prevdigit.style.color="white";
    prevdigit.style.borderColor="white";
    }else{
        prevdigit.style.backgroundColor="white";
        prevdigit.style.color="black";
        prevdigit.style.borderColor="black";
    }
    
    
   
    if(darkmode){ 
        this.style.backgroundColor=backgroundcolordigitsdarkmode;
        this.style.color="white";
        this.style.borderColor="white";
        }else{
            this.style.backgroundColor=backgroundcolordigitsnodarkmode;
            this.style.color="black";
            this.style.borderColor="black";
        }

        currentdigit=parseInt(this.getAttribute("id"));
}



//funkciq pri klik na pole ot pyzela
function tileClicked(){

let emptyfields=false;



//proverka dali v poleto moje da se popylva i dali ne e zavyr6en pravilno pyzela i popylva stoinost   
if (arrremuvedblocks.includes(parseInt(this.getAttribute("id")))&& finished==false){
    if (currentdigit==0){
        this.textContent="";
    }else{
        this.textContent=currentdigit;
        this.setAttribute("style", "color:"+ nextdigitscolor+";");
 
    } 

    if(darkmode){
        this.style.borderColor="white";
      
        if (arrbackgroundcolor.includes(parseInt(this.getAttribute("id")))) {
         this.style.backgroundColor=backgroundcolortilesdarkmode;
         } else{
         this.style.backgroundColor="black";   
         }   
     }else{
         this.style.borderColor="black";

         if (arrbackgroundcolor.includes(parseInt(this.getAttribute("id")))) {
             this.style.backgroundColor=backgroundcolortilesnodarkmode;
             } else{
             this.style.backgroundColor="white";   
             } 
        
     }
}


// Proverka za napylno popylnen pyzel
const tiles= document.querySelectorAll(".tile"); 
for(i=0;i<81;i++){
    if (tiles[i].textContent==""){
        emptyfields=true;
        break;
    }
}

//Proverka za pravilno popylnen pyzel
if(emptyfields==false && !finished){
    finished= checkfinished();  
    if(finished==true){
        alert("Пъзела е попълнен правилно :)");
        clearInterval(timerr);
    }else{
        alert("Пъзела не е решен правилно :(");
    }
}





}












//funkciq za vzunaneto na stoinosta za broq na lipsva6tite poleta v pyzela
function passMissingBlocks(){
    const value = document.getElementById('MissingBlocks').value;
    if(value<82 && value>0){
         GenerateSudoku(value);
    }
    else {
        alert('Please enter number betwen 1 and 80');
    }
}


//funckiq koqto popylva poleto na pyzela s stoinosti
function GenerateSudoku(MissingBlocks){
    finished=false;
    gamestarted=true;
    cleartimer();
    timerr= setInterval(starttimer, 1000);
 
    generatedarr=createlevel(arr=[
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
    ]);
  
    arrremuvedblocks= new Array (MissingBlocks)
    
    for(i=0;i<MissingBlocks;i++){
       let numberbuffer=Math.floor(Math.random() * 80)
        while(arrremuvedblocks.includes(numberbuffer)){
            numberbuffer=Math.floor(Math.random() * 80)  
        }
        arrremuvedblocks[i]= numberbuffer;
    }


    const tiles= document.querySelectorAll(".tile"); 
    let index=0;

    //solvedarr=JSON.parse(JSON.stringify(generatedarr));;
    
    for( i=0;i< generatedarr.length;i++){
        for( j=0;j< generatedarr[i].length;j++){

           
            if(darkmode){
            tiles[index].style.color="white";}else{
            tiles[index].style.color="black";}
            if (arrremuvedblocks.includes(index)){
                tiles[index].textContent="";
                
              
              
            }else{
                tiles[index].textContent=generatedarr[i][j];  
             //   solvedarr[i][j]=generatedarr[i][j];
                
            }
            index++;     
        }
    }




}





function RestartLevel(){
    finished=false;
    if(gamestarted==true){
    if (confirm("Искате ли да започне ново време на играта?")) {
        cleartimer();
        timerr= setInterval(starttimer, 1000);
      } else {
       
      }
    }




    const tiles= document.querySelectorAll(".tile"); 
    let index=0;

    //solvedarr=JSON.parse(JSON.stringify(generatedarr));;
    
    for( i=0;i< generatedarr.length;i++){
        for( j=0;j< generatedarr[i].length;j++){

           

            if(darkmode){
                tiles[index].style.color="white";}else{
                tiles[index].style.color="black";}
            if (arrremuvedblocks.includes(index)){
                tiles[index].textContent="";
                
              
              
            }else{
                tiles[index].textContent=generatedarr[i][j];  
             //   solvedarr[i][j]=generatedarr[i][j];
                
            }
            index++;     
        }
    }


}






function starttimer(){
    if (!finished){
    time++;}
   
    h=~~(time/3600);
    m=~~((time-h*3600)/60);
    s=time-(h*3600)-(m*60);
   
    if (h<10){
        hh='0'+h;
    }else{
        hh=h;
    }
    if (m<10){
        mm='0'+m;
    }else{
        mm=m;
    }
    if (s<10){
        ss='0'+s;
    } else{
        ss=s; 
    }

    if (language=='EN'){
        document.getElementById("timer").textContent='Time: '+hh+':'+mm+':'+ss;
    }else if (language=='BG'){
        document.getElementById("timer").textContent='Време: '+hh+':'+mm+':'+ss;
    }
}

function cleartimer(){
    time=0;



if (language=='EN'){
    document.getElementById("timer").textContent='Time: 00:00:00';
}else if (language=='BG'){
    document.getElementById("timer").textContent='Време: 00:00:00';
}
    clearInterval(timerr);
}












































//funciq koqto generira random level na sudoku. parameter1 array 9x9
function createlevel(arr){
    

    //minava prez vsqko pole na masiva
    for( i=0;i<arr.length;i++){
        for( j=0;j<arr[i].length;j++){
            
            //
            //masiv s vsi4ki vyzmojni stoinosti, 0 = empty
                avdigits=[0,1,2,3,4,5,6,7,8,9];
            
               // novi vyzmojni stoinosti sled kato se izpylni funciqta za proverka  checkavailabledigits
                avdigits= checkavailabledigits(arr, avdigits,i,j)
              
             // ostavqm samo vyzmojnite
               avdigits =JSON.parse(JSON.stringify(avdigits.filter(a => a !== 0))) 
                
              //  console.log(avdigits2);


              //proverka dali ima vyzmojni stoinosti v masiva avdigits, ako ima izbiram random stoinost ot masiva avdigits
              //i q popylvam v poleto na masiva arr, ako nqma zapo4vam funkciqta createlevel ot na4alo dokato ne se generira
              // nivo
                if(avdigits.length>0){
                    let x = Math.floor(Math.random() * avdigits.length);
            
                    arr[i][j]= avdigits[x];
                }else {
                    return createlevel(arr=[
                        [0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0],]);
                }
               
         
        }
    }
    
           
    return arr;
}



// proverqva za vsi4ki vyzmojni cifri v vsqko pole 
    function checkavailabledigits(arr,avdigits,i,j){
    // proverqva za vyzmojni cifri sprqmo popylnenite v reda
    for(let jj=0;jj<arr[i].length;jj++){
        if(avdigits.includes(arr[i][jj])){
          avdigits[arr[i][jj]]=0;
        }
      }
//proverqva za vyzmojni cifri sprqmo popylnenite v kolonata
      for(let ii=0;ii<arr.length;ii++){
        if( avdigits.includes(arr[ii][j])){
          avdigits[arr[ii][j]]=0;
        }
      }


   //proverqva za vyzmojni cifri sprqmo popylnenite v kutiqta 3x3 na pyzela
    if (i>=0 && i<3 && j>=0 && j<3  ){
          x=0;y=0;
        if( avdigits.includes(arr[x][y])){avdigits[arr[x][y]]=0;}
        if( avdigits.includes(arr[x][y+1])){avdigits[arr[x][y+1]]=0;}
        if( avdigits.includes(arr[x][y+2])){avdigits[arr[x][y+2]]=0;}
        if( avdigits.includes(arr[x+1][y])){avdigits[arr[x+1][y]]=0;}
        if( avdigits.includes(arr[x+1][y+1])){avdigits[arr[x+1][y+1]]=0;}
        if( avdigits.includes(arr[x+1][y+2])){avdigits[arr[x+1][y+2]]=0;}
        if( avdigits.includes(arr[x+2][y])){avdigits[arr[x+2][y]]=0;}
        if( avdigits.includes(arr[x+2][y+1])){avdigits[arr[x+2][y+1]]=0;}
        if( avdigits.includes(arr[x+2][y+2])){avdigits[arr[x+2][y+2]]=0;}
        return  avdigits;
    }

    if (i>=0 && i<3 && j>=3 && j<6  ){
         x=0;y=3;
        if( avdigits.includes(arr[x][y])){avdigits[arr[x][y]]=0;}
        if( avdigits.includes(arr[x][y+1])){avdigits[arr[x][y+1]]=0;}
        if( avdigits.includes(arr[x][y+2])){avdigits[arr[x][y+2]]=0;}
        if( avdigits.includes(arr[x+1][y])){avdigits[arr[x+1][y]]=0;}
        if( avdigits.includes(arr[x+1][y+1])){avdigits[arr[x+1][y+1]]=0;}
        if( avdigits.includes(arr[x+1][y+2])){avdigits[arr[x+1][y+2]]=0;}
        if( avdigits.includes(arr[x+2][y])){avdigits[arr[x+2][y]]=0;}
        if( avdigits.includes(arr[x+2][y+1])){avdigits[arr[x+2][y+1]]=0;}
        if( avdigits.includes(arr[x+2][y+2])){avdigits[arr[x+2][y+2]]=0;}
        return  avdigits;
    }
    if (i>=0 && i<3 && j>=6 && j<9  ){
         x=0;y=6;
        if( avdigits.includes(arr[x][y])){avdigits[arr[x][y]]=0;}
        if( avdigits.includes(arr[x][y+1])){avdigits[arr[x][y+1]]=0;}
        if( avdigits.includes(arr[x][y+2])){avdigits[arr[x][y+2]]=0;}
        if( avdigits.includes(arr[x+1][y])){avdigits[arr[x+1][y]]=0;}
        if( avdigits.includes(arr[x+1][y+1])){avdigits[arr[x+1][y+1]]=0;}
        if( avdigits.includes(arr[x+1][y+2])){avdigits[arr[x+1][y+2]]=0;}
        if( avdigits.includes(arr[x+2][y])){avdigits[arr[x+2][y]]=0;}
        if( avdigits.includes(arr[x+2][y+1])){avdigits[arr[x+2][y+1]]=0;}
        if( avdigits.includes(arr[x+2][y+2])){avdigits[arr[x+2][y+2]]=0;}
        return  avdigits;
    }

    if (i>=3 && i<6 && j>=0 && j<3  ){
         x=3;y=0;
        if( avdigits.includes(arr[x][y])){avdigits[arr[x][y]]=0;}
        if( avdigits.includes(arr[x][y+1])){avdigits[arr[x][y+1]]=0;}
        if( avdigits.includes(arr[x][y+2])){avdigits[arr[x][y+2]]=0;}
        if( avdigits.includes(arr[x+1][y])){avdigits[arr[x+1][y]]=0;}
        if( avdigits.includes(arr[x+1][y+1])){avdigits[arr[x+1][y+1]]=0;}
        if( avdigits.includes(arr[x+1][y+2])){avdigits[arr[x+1][y+2]]=0;}
        if( avdigits.includes(arr[x+2][y])){avdigits[arr[x+2][y]]=0;}
        if( avdigits.includes(arr[x+2][y+1])){avdigits[arr[x+2][y+1]]=0;}
        if( avdigits.includes(arr[x+2][y+2])){avdigits[arr[x+2][y+2]]=0;}
        return  avdigits;
    }

    if (i>=3 && i<6 && j>=3 && j<6  ){
        x=3;y=3;
        if( avdigits.includes(arr[x][y])){avdigits[arr[x][y]]=0;}
        if( avdigits.includes(arr[x][y+1])){avdigits[arr[x][y+1]]=0;}
        if( avdigits.includes(arr[x][y+2])){avdigits[arr[x][y+2]]=0;}
        if( avdigits.includes(arr[x+1][y])){avdigits[arr[x+1][y]]=0;}
        if( avdigits.includes(arr[x+1][y+1])){avdigits[arr[x+1][y+1]]=0;}
        if( avdigits.includes(arr[x+1][y+2])){avdigits[arr[x+1][y+2]]=0;}
        if( avdigits.includes(arr[x+2][y])){avdigits[arr[x+2][y]]=0;}
        if( avdigits.includes(arr[x+2][y+1])){avdigits[arr[x+2][y+1]]=0;}
        if( avdigits.includes(arr[x+2][y+2])){avdigits[arr[x+2][y+2]]=0;}
        return  avdigits;
    }
    if (i>=3 && i<6 && j>=6 && j<9  ){
         x=3;y=6;
        if( avdigits.includes(arr[x][y])){avdigits[arr[x][y]]=0;}
        if( avdigits.includes(arr[x][y+1])){avdigits[arr[x][y+1]]=0;}
        if( avdigits.includes(arr[x][y+2])){avdigits[arr[x][y+2]]=0;}
        if( avdigits.includes(arr[x+1][y])){avdigits[arr[x+1][y]]=0;}
        if( avdigits.includes(arr[x+1][y+1])){avdigits[arr[x+1][y+1]]=0;}
        if( avdigits.includes(arr[x+1][y+2])){avdigits[arr[x+1][y+2]]=0;}
        if( avdigits.includes(arr[x+2][y])){avdigits[arr[x+2][y]]=0;}
        if( avdigits.includes(arr[x+2][y+1])){avdigits[arr[x+2][y+1]]=0;}
        if( avdigits.includes(arr[x+2][y+2])){avdigits[arr[x+2][y+2]]=0;}
        return  avdigits;
    }

    if (i>=6 && i<9 && j>=0 && j<3  ){
         x=6;y=0;
        if( avdigits.includes(arr[x][y])){avdigits[arr[x][y]]=0;}
        if( avdigits.includes(arr[x][y+1])){avdigits[arr[x][y+1]]=0;}
        if( avdigits.includes(arr[x][y+2])){avdigits[arr[x][y+2]]=0;}
        if( avdigits.includes(arr[x+1][y])){avdigits[arr[x+1][y]]=0;}
        if( avdigits.includes(arr[x+1][y+1])){avdigits[arr[x+1][y+1]]=0;}
        if( avdigits.includes(arr[x+1][y+2])){avdigits[arr[x+1][y+2]]=0;}
        if( avdigits.includes(arr[x+2][y])){avdigits[arr[x+2][y]]=0;}
        if( avdigits.includes(arr[x+2][y+1])){avdigits[arr[x+2][y+1]]=0;}
        if( avdigits.includes(arr[x+2][y+2])){avdigits[arr[x+2][y+2]]=0;}
        return  avdigits;
    }

    if (i>=6 && i<9 && j>=3 && j<6  ){
         x=6;y=3;
        if( avdigits.includes(arr[x][y])){avdigits[arr[x][y]]=0;}
        if( avdigits.includes(arr[x][y+1])){avdigits[arr[x][y+1]]=0;}
        if( avdigits.includes(arr[x][y+2])){avdigits[arr[x][y+2]]=0;}
        if( avdigits.includes(arr[x+1][y])){avdigits[arr[x+1][y]]=0;}
        if( avdigits.includes(arr[x+1][y+1])){avdigits[arr[x+1][y+1]]=0;}
        if( avdigits.includes(arr[x+1][y+2])){avdigits[arr[x+1][y+2]]=0;}
        if( avdigits.includes(arr[x+2][y])){avdigits[arr[x+2][y]]=0;}
        if( avdigits.includes(arr[x+2][y+1])){avdigits[arr[x+2][y+1]]=0;}
        if( avdigits.includes(arr[x+2][y+2])){avdigits[arr[x+2][y+2]]=0;}
        return  avdigits;
    }
    if (i>=6 && i<9 && j>=6 && j<9  ){
         x=6;y=6;
        if( avdigits.includes(arr[x][y])){avdigits[arr[x][y]]=0;}
        if( avdigits.includes(arr[x][y+1])){avdigits[arr[x][y+1]]=0;}
        if( avdigits.includes(arr[x][y+2])){avdigits[arr[x][y+2]]=0;}
        if( avdigits.includes(arr[x+1][y])){avdigits[arr[x+1][y]]=0;}
        if( avdigits.includes(arr[x+1][y+1])){avdigits[arr[x+1][y+1]]=0;}
        if( avdigits.includes(arr[x+1][y+2])){avdigits[arr[x+1][y+2]]=0;}
        if( avdigits.includes(arr[x+2][y])){avdigits[arr[x+2][y]]=0;}
        if( avdigits.includes(arr[x+2][y+1])){avdigits[arr[x+2][y+1]]=0;}
        if( avdigits.includes(arr[x+2][y+2])){avdigits[arr[x+2][y+2]]=0;}
        return  avdigits;
    }
}








function checkfinished(){
//syzdavane na nov masiv s golimanata 9x9
solvedarr=JSON.parse(JSON.stringify(generatedarr));
const tiles= document.querySelectorAll(".tile"); 
let index=0;


//vzema vsi4ki stoinosti ot pypleniq pyzel i gi popylva v masiva solvedarr
for( i=0;i<generatedarr.length;i++){
    for( j=0;j<generatedarr[i].length;j++){
      solvedarr[i][j]=parseInt(tiles[index].textContent);
      index++;
}
}





//proverqva vsqko edno pole ot pyzela
  for( i=0;i<solvedarr.length;i++){
    for( j=0;j<solvedarr[i].length;j++){
        let flag=0;


    //proverqva reda na poleto dali ima druga stoinost kato negovata
        for(let jj=0;jj<solvedarr[i].length;jj++){
           if(solvedarr[i][jj]==solvedarr[i][j]){
            flag++;
           }
            
         
          }
        if (flag>1){
            return false;
        }



         flag=0;
     

       // proverka na kolonata na poleto za druga stoinost kato negovata
         for(let ii=0;ii<solvedarr.length;ii++){
            if( solvedarr[ii][j]==solvedarr[i][j]){
                flag++;
            }
          }


        if (flag>1){
            return false;
        }


        flag=0;




        //spored kordinatite na poleto proverqva kutiqta 3x3 v koqto e poleto za druga stoinost kato negovata
        if (i>=0 && i<3 && j>=0 && j<3  ){
             x=0;y=0;
            if( solvedarr[x][y]==solvedarr[i][j]){ flag++;}
            if( solvedarr[x][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x][y+2]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y+2]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y+2]==solvedarr[i][j]){flag++;}
            if (flag>1){
                return false;
            }
        }
    


        if (i>=0 && i<3 && j>=3 && j<6  ){
             x=0;y=3;
           if( solvedarr[x][y]==solvedarr[i][j]){ flag++;}
            if( solvedarr[x][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x][y+2]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y+2]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y+2]==solvedarr[i][j]){flag++;}
            if (flag>1){
                return false;
            }
        }
        if (i>=0 && i<3 && j>=6 && j<9  ){
            x=0;y=6;
            if( solvedarr[x][y]==solvedarr[i][j]){ flag++;}
            if( solvedarr[x][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x][y+2]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y+2]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y+2]==solvedarr[i][j]){flag++;}
            if (flag>1){
                return false;
            }
        }
    
        if (i>=3 && i<6 && j>=0 && j<3  ){
             x=3;y=0;
            if( solvedarr[x][y]==solvedarr[i][j]){ flag++;}
            if( solvedarr[x][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x][y+2]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y+2]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y+2]==solvedarr[i][j]){flag++;}
            if (flag>1){
                return false;
            }
        }
    
        if (i>=3 && i<6 && j>=3 && j<6  ){
            x=3;y=3;
            if( solvedarr[x][y]==solvedarr[i][j]){ flag++;}
            if( solvedarr[x][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x][y+2]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y+2]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y+2]==solvedarr[i][j]){flag++;}
            if (flag>1){
                return false;
            }
        }
        if (i>=3 && i<6 && j>=6 && j<9  ){
             x=3;y=6;
            if( solvedarr[x][y]==solvedarr[i][j]){ flag++;}
            if( solvedarr[x][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x][y+2]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y+2]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y+2]==solvedarr[i][j]){flag++;}
            if (flag>1){
                return false;
            }
        }
    
        if (i>=6 && i<9 && j>=0 && j<3  ){
            x=6;y=0;
            if( solvedarr[x][y]==solvedarr[i][j]){ flag++;}
            if( solvedarr[x][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x][y+2]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y+2]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y+2]==solvedarr[i][j]){flag++;}
            if (flag>1){
                return false;
            }
        }
    
        if (i>=6 && i<9 && j>=3 && j<6  ){
            x=6;y=3;
            if( solvedarr[x][y]==solvedarr[i][j]){ flag++;}
            if( solvedarr[x][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x][y+2]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y+2]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y+2]==solvedarr[i][j]){flag++;}
            if (flag>1){
                return false;
            }
        }
        if (i>=6 && i<9 && j>=6 && j<9  ){
             x=6;y=6;
            if( solvedarr[x][y]==solvedarr[i][j]){ flag++;}
            if( solvedarr[x][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x][y+2]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+1][y+2]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y+1]==solvedarr[i][j]){flag++;}
            if( solvedarr[x+2][y+2]==solvedarr[i][j]){flag++;}
            if (flag>1){
                return false;
            }
        }





    }}
    return true;

}




function SetColorToBlack(){
    if(darkmode){
    nextdigitscolor="white";
    document.getElementById("colorblack").style.border="2px solid black";}else {
    nextdigitscolor="black";
    document.getElementById("colorblack").style.border="2px solid white";
    }
   
    document.getElementById("colorblack").style.width="40px";
    document.getElementById("colorblack").style.height="40px";
    document.getElementById("colorred").style.borderWidth="0";
    document.getElementById("colorred").style.width="30px";
    document.getElementById("colorred").style.height="30px";
    document.getElementById("colorgreen").style.borderWidth="0";
    document.getElementById("colorgreen").style.width="30px";
    document.getElementById("colorgreen").style.height="30px";
   
}
function SetColorToRed(){
    nextdigitscolor="red";
    document.getElementById("colorred").style.border="2px solid black";
    document.getElementById("colorred").style.width="40px";
    document.getElementById("colorred").style.height="40px";
    document.getElementById("colorblack").style.borderWidth="0";
    document.getElementById("colorblack").style.width="30px";
    document.getElementById("colorblack").style.height="30px";
    document.getElementById("colorgreen").style.borderWidth="0";
    document.getElementById("colorgreen").style.width="30px";
    document.getElementById("colorgreen").style.height="30px";
}
function SetColorToGreen(){
    nextdigitscolor="green";
    document.getElementById("colorgreen").style.border="2px solid black";
    document.getElementById("colorgreen").style.width="40px";
    document.getElementById("colorgreen").style.height="40px";
    document.getElementById("colorblack").style.borderWidth="0";
    document.getElementById("colorblack").style.width="30px";
    document.getElementById("colorblack").style.height="30px";
    document.getElementById("colorred").style.borderWidth="0";
    document.getElementById("colorred").style.width="30px";
    document.getElementById("colorred").style.height="30px";
}



function darkmodefn(){
    if(document.getElementById("darkmode").checked==true){
        darkmode=true;   
    }else{darkmode=false;}


    if(darkmode){

        if(nextdigitscolor=="black" ){
           nextdigitscolor="white";}
              
        
    document.getElementById("colorblack").style.backgroundColor="white";
    document.getElementById("colorblack").style.border="2px solid black";
    document.getElementsByTagName('body')[0].style.backgroundColor="black";
    document.getElementById("Options").style.border="2px solid white";
    document.getElementById("titletext").style.color="white";
    document.getElementById("timer").style.color="white";
    const tiles= document.querySelectorAll(".tile"); 
    
    for(i=0;i<tiles.length;i++){
        if( tiles[i].style.color=="black"){
            tiles[i].style.color="white";
        }
        tiles[i].style.borderColor="white";
        
        if (arrbackgroundcolor.includes(i)) {
        tiles[i].style.backgroundColor=backgroundcolortilesdarkmode;
        } else{
            tiles[i].style.backgroundColor="black";
        }
    }

    const digits= document.querySelectorAll(".digit");
    for(i=0;i<digits.length;i++){
            digits[i].style.color="white";
            digits[i].style.borderColor="white";
            digits[i].style.backgroundColor="black";
    } 
    digits[currentdigit].style.backgroundColor=backgroundcolordigitsdarkmode;


    }
    else{
        if(nextdigitscolor=="white"){
            nextdigitscolor="black";}
    document.getElementById("colorblack").style.backgroundColor="black";
    document.getElementById("colorblack").style.border="2px solid white";
    document.getElementsByTagName('body')[0].style.backgroundColor="white";
    document.getElementById("Options").style.border="2px solid black";
    document.getElementById("titletext").style.color="black";
    document.getElementById("timer").style.color="black";
    const tiles= document.querySelectorAll(".tile"); 
    for(i=0;i<tiles.length;i++){
        if( tiles[i].style.color=="white"){
            tiles[i].style.color="black";}
            
            tiles[i].style.borderColor="black";
          //  tiles[i].style.backgroundColor="white";
          if (arrbackgroundcolor.includes(i)) {
            tiles[i].style.backgroundColor=backgroundcolortilesnodarkmode;
           }   else{
            tiles[i].style.backgroundColor="white";
        }
    }

    const digits= document.querySelectorAll(".digit");
    for(i=0;i<digits.length;i++){
       
            digits[i].style.color="black";
            digits[i].style.borderColor="black";
            digits[i].style.backgroundColor="white";
    }
    digits[currentdigit].style.backgroundColor=backgroundcolordigitsnodarkmode;


    }
   
}



function SetLang(lang){
    language=lang;

    if (language=='BG'){
        document.getElementById("titletext").textContent="Судоку";
        document.getElementById("MissingBlocksLabel").textContent="Изберете брой липсващи полета от пъзела(от 1 до 81):";
        document.getElementById("MissingBlocksButton").value="Нов пъзел";
        document.getElementById("RestartLabel").textContent="Рестартиране на текущия пъзел:";
        document.getElementById("RestartButton").value="Рестарт";
        document.getElementById("OptionsTitle").textContent="Опции";
        document.getElementById("ColorLabel").textContent="Изберете цвят за попълване:";
        document.getElementById("DarkModeLabel").textContent="Тъмен режим:";
        document.getElementById("LanguageMenuLabel").textContent="Изберете език:";
        document.getElementById("BG").style.backgroundColor="rgb(175, 175, 175)";
        document.getElementById("EN").style.backgroundColor="white";
    }else{
        document.getElementById("titletext").textContent="Sudoku";
        document.getElementById("MissingBlocksLabel").textContent="Select number of missing squares from the puzzle(from 1 to 81):";
        document.getElementById("MissingBlocksButton").value="New puzzle";
        document.getElementById("RestartLabel").textContent="Restart the current puzzle:";
        document.getElementById("RestartButton").value="Restart";
        document.getElementById("OptionsTitle").textContent="Options";
        document.getElementById("ColorLabel").textContent="Choose a fill color:";
        document.getElementById("DarkModeLabel").textContent="Dark mode:";
        document.getElementById("LanguageMenuLabel").textContent="Choose language:";
        document.getElementById("EN").style.backgroundColor="rgb(175, 175, 175)";
        document.getElementById("BG").style.backgroundColor="white";
    }



    if(time==0){
        if (language=='EN'){
            document.getElementById("timer").textContent='Time: 00:00:00';
        }else if (language=='BG'){
            document.getElementById("timer").textContent='Време: 00:00:00';
        }
    } else{
        h=~~(time/3600);
        m=~~((time-h*3600)/60);
        s=time-(h*3600)-(m*60);
    
        if (h<10){
            hh='0'+h;
        }else{
            hh=h;
        }
        if (m<10){
            mm='0'+m;
        }else{
            mm=m;
        }
        if (s<10){
            ss='0'+s;
        } else{
            ss=s; 
        }

        if (language=='EN'){
            document.getElementById("timer").textContent='Time: '+hh+':'+mm+':'+ss;
        }else if (language=='BG'){
            document.getElementById("timer").textContent='Време: '+hh+':'+mm+':'+ss;
        }
    }
}