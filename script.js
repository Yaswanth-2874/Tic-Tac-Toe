let turn="X";
let gameover = false;
let resetsound = new Audio("resetsound.mp3");
let tap=new Audio("tap.mp3");
let gg=new Audio("gg.mp3");
let clear=new Audio("clear.mp3");
let xscore=0,yscore=0;

function ChangeTurn(){
    return turn==="X"?"O":"X";
}

function CheckWin(){
    let text=document.getElementsByClassName("boxtext");

    let wins=[
        [0,1,2,1,2,0],
        [3,4,5,1,7,0],
        [6,7,8,1,12,0],
        [0,3,6,-4,7,90],
        [1,4,7,1,7,90],
        [2,5,8,6,7,90],
        [0,4,8,1,7,45],
        [2,4,6,1,7,135]
    ];

    wins.forEach(e =>{
        if((text[e[0]].innerText == text[e[1]].innerText && text[e[0]].innerText == text[e[2]].innerText && text[e[0]].innerText != "")){
        document.getElementsByClassName("info")[0].innerText=text[e[0]].innerText +" is the winner";
        if((text[e[0]].innerText=="X") && !gameover)
        xscore++;
        else if((text[e[0]].innerText=="O") && !gameover)
        yscore++;
        gameover = true;
        document.querySelector(".line").style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;
        document.querySelector(".line").style.width = "13vw";
        gg.play();
        
        }
    })

}

function displayScore(){
    document.getElementsByClassName("scores")[0].innerHTML=`X score : ${xscore}<br> Y score : ${yscore}`;
}

let boxes = document.getElementsByClassName("box");
let count=0;

Array.from(boxes).forEach(element =>{
    let boxtext=element.querySelector(".boxtext");
    element.addEventListener("click",()=>{
        if(boxtext.innerText == '' && !gameover){
        boxtext.innerText=turn
        turn=ChangeTurn()
        count++;
        tap.play();
        }
        CheckWin()
        if(count==9 && !gameover){
            gameover=true;
            document.getElementsByClassName("info")[0].innerText="Game resulted in a draw.";
            xscore+=0.5;
            yscore+=0.5;
        }
        if(!gameover)
        document.getElementsByClassName("info")[0].innerText=turn+"'s turn";
        displayScore();


        reset.addEventListener("click",()=>{
           let text= document.getElementsByClassName("boxtext");
           Array.from(text).forEach(element =>{
            element.innerText="";
           })
           count=0;
           gameover=false;
           document.querySelector(".info").innerText="Game restarted. X's turn";
           turn="X"
           resetsound.play();
           document.querySelector(".line").style.width = "0vw";
        })

        resetscore.addEventListener("click",()=>{
            xscore=0;
            yscore=0;
            displayScore();
            clear.play();
        })
    })
})