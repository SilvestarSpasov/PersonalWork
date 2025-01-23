// Write JavaScript code here


const elements = document.getElementsByClassName("cloud");
const elem = document.getElementById("container");
elem.innerHTML += '<div class="cloud"><div class="cloudBubble1"></div><div class="cloudBubble2"></div></div> '.repeat(30);
let i;





for(i=0;i<30;i++){
    elements[i].style.top =(Math.random()*70)+'%';
    elements[i].style.left= (Math.random()*101)+'%';
    elements[i].style.transform="scale("+(Math.random()*1+0.1)+")";
    elements[i].style.transition="all linear "+(Math.random()*60+30)+"s";  
}

let x = 0;


setTimeout(()=>{
        for(i=0;i<30;i++){
            elements[i].style.top =(Math.random()*70)+'%';
            elements[i].style.left=(Math.random()*70)+'%';
        }
},0);



setInterval(()=>{
  
    if (x % 2 === 1) {
        for(i=0;i<30;i++){
            elements[i].style.top =(Math.random()*70)+'%';
            elements[i].style.left="100%";
        }
  
    } else {
        if (x % 2 === 0) {
            for(i=0;i<30;i++){
                elements[i].style.left= "-50%";
            }
        }
    }
    x += 1;
},5000);


