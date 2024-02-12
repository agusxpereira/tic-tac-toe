
/*Una iffe se va a usar en una factory function si tenemos que hacer solo una cosa, ejemplo una fabrica de funciones 
para crear operaciones básicas que vamos a necesitar una sola vez 

calculator.add(a, b); 

*/

let  startGame = document.querySelector(".start-game"); 
const setGame = document.querySelector(".set-game");




let createdBoard = (function(){
    let counter = 0;
    let arr =   [[],[],[]]; 

    for(let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++) {
                counter++;
                let square = document.createElement("div");
                square.dataset.indexOf = counter;
                square.className = "free";
                arr[i][j] = square;
                        
        }
                    
                    
    
    }
    
    function checkRow(i){
        let checker = 0;
        for (let j = 0; j < arr.length; j++) {
            const element = array[i][j]; 
            if(element.classList.contains(marker) && nextElement.classList.contains(marker)){
                 checker++;
            } 
        return checker;
    }

    
    let checkWinnerRow = function(marker){
        let checker;
        let i = 0;

        checker = checkRow(i)
            
        if(checker == 3){
            return true;
        }else{
            i++; 
            checkRow = 0;
            checker =  checkRow(i);
        }
                
        }
            
        
    }


    return {arr, checkWinnerRow}

    /* return obj; */

})(); 

console.log(createdBoard)

function createPlayer(name, marker){
    let score = 0; 

    function setScore(){
        score++;
    } 

    function getScore(){
        return score;
    }
    
    function play(arr, marker, pos){
        arr[pos] = marker;
    }

    return {name, marker, play, setScore, getScore}
} 


document.addEventListener('DOMContentLoaded', ()=>{   
    startGame.classList.add("starting");    
});





const btnStart = document.querySelector("#star-game");
     
/* Here the game start, here is all the logic of the game and variables*/
btnStart.addEventListener("click", (e)=>{
     e.preventDefault();
     startGame.classList.remove("starting");
      
    
    let gameData = (function(){
        const namePlayer = document.querySelector(".input-name").value;
        const markerPlayer = document.querySelector("#marker").value;
        
        setGame.reset();
        return { namePlayer, markerPlayer };
    })();
    /*Here the game:*/
    let createGame = (function(){

        const board = document.querySelector("#board");
        let markerPc;
        let reset = document.querySelector("#reset");
    
        let playerOne = createPlayer(gameData.namePlayer, gameData.markerPlayer);
        
        if (gameData.markerPlayer == 'X'){
            markerPc = 'O'; 
        }
        let playerPc = createPlayer("PC", markerPc );
        
        
        /*filling the borad with divs */ 
        let squares = createdBoard.arr;    
        for (const square of squares) {
            for(const div of square){
                console.log(squares)
                board.appendChild(div);
            }
        }
        
        
        let divs = document.querySelectorAll(".free"); 
        divs.forEach(div => {
            div.addEventListener("click", (e)=>{
                if(div.classList.contains("free")){
                    console.log("clicked");
                    div.classList.add("clicked"); 
                    div.textContent = `${playerOne.marker}`;
                }
    
            });
        });
    
    
    
        reset.addEventListener('click', ()=>{
            divs.forEach(div =>{
                if(div.classList.contains("clicked")){
                    div.classList.remove("clicked"); 
                    div.textContent = "";
                }
    
            });
        });
    
    
    
    })(gameData);
         
        
    });

    

//let newGame = createGame();
 
 




