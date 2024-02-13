
function createPlayer(name, marker){
    let score = 0;

    function setScore(){
        score++; 
    }

    function getScore(){
        return score;
    }

    return {name, marker, setScore, getScore}
}

const gameBoard = (function(){
    
    const board = [
    
     ['','',''],
     ['','',''],
     ['','','']
    
    ];
/**/ 
    

    function displayBoard(){
        const displayBoard = document.querySelector("#board");
        const board = gameBoard.board;

        let counter = -1;
        let counterRow = -1;
        for(arr of board){
            counterRow++;

            let row = document.createElement("div");
            row.classList.add("row");
            row.dataset.index = counterRow;
            
            
            for(let i = 0; i < arr.length; i++){
                counter++;
                let div = document.createElement("div"); 
                div.classList.add("box");
                div.classList.add("free");
                div.dataset.index = counter;
                row.appendChild(div);
            }
            counter=-1;
            displayBoard.appendChild(row);
           
        }
    };

    return {board, displayBoard};
})();

const handleGame = (function(){
    board = gameBoard.board;

    function checkRowWinner(marker){
        let counter = 0; 
        let i = 0; 
        let j = 0; 
        
        while(i < 3){
            let arr = board[i];
   
            if(arr[j] == marker ){
            counter++; 
            j++;
            if(j > 2){
                break
            }
        }else{
            counter = 0; 
            j = 0;
            i++;

        }
    }

        let isWinner = (counter == 3) ? true : false;

        return isWinner;
    }

    function checkColumnWinner(marker) {
        let counter = 0; 
        let currentArr = 0;
        let checker = 0; 

        let arr = [];
        while(currentArr < 3){
            if(counter > 3 || checker > 3){
                break;
               }
            arr = board[currentArr];
            if((arr[checker]) == marker){
                currentArr++;
                counter++;      
            }else{
                counter = 0;
                checker++;   
            }
        }
        let isWinner = (counter == 3) ? true : false;

        return isWinner;
    }
    
    function checkDiagonalWinner(marker){
        let counter = 0; 
        let i = 0;
        let j = 0; 
        let isWinner = false;
        if (board[0][0] == marker && board[2][2] == marker && board[1][1]==marker) {
            isWinner = true;
        }else if(board[0][2] == marker && board[2][0] == marker && board[1][1]==marker){
            isWinner = true;
        }
        
        return isWinner;

    }



    function setBox(marker, index, pos, box){
        
/*         board[index][pos] = marker;
        box.textContent = marker; */
        
        if(box !== null){                
            board[index][pos] = marker;
            if (box.classList.contains("free")) {
                box.classList.remove("free");
                box.textContent = marker;
            }
        }
    }

    function checkWinner(marker){
        let checkRow = checkRowWinner(marker);
        let checkColumn = checkColumnWinner(marker);
        let checkDiagonal = checkDiagonalWinner(marker);

        if(checkRow == true || checkColumn == true|| checkDiagonal == true){
            return true;
        }else{
            return false;
        }
   
    };

    function movePc(player) {

        const boxes = document.querySelectorAll(".box");
        let i = Math.floor(Math.random() * 3);
        let j = Math.floor(Math.random() * 3);
        let boxTarget = "";
        boxes.forEach(box =>{
            let pos = Number(box.dataset.index);
            let index = Number(box.parentElement.dataset.index);
            

            if(i == pos && j == index && box.classList.contains("free")){
                console.log("index: " + index)
                boxTarget = box;
            }else{
                /* - Acá está el tema, tengo que asegurarme que me devuelva un box libre - */
                boxTarget = document.querySelector(".free");
                let pos = Number(boxTarget.dataset.index);
                let index = Number(boxTarget.parentElement.dataset.index); 

                i = index; 
                j = pos;
            }       
        });
        


        if(board[i][j] == ""){
            setBox(player.marker, i, j, boxTarget);
        }else if(!boxTarget.classList.contains("free")){
            return;
        }else if(boxTarget === null){
            return;
        }else{
            movePc(player);
        }
        console.log(i); 
        console.log(j);
        console.log(board); 
        console.log(boxTarget)
    }
    
    
    function gameStart(playerOne, playerPc){
        let boxes = document.querySelectorAll(".box");
    
        boxes.forEach(box => {
            box.addEventListener('click', ()=>{
                if(box.classList.contains("free")){
                    let pos = Number(box.dataset.index);
                    let index = Number(box.parentElement.dataset.index);
                    if(gameBoard.board[index][pos] == ""){
                        setBox(playerOne.marker, index, pos, box);
                    }
                    movePc(playerPc);

                   let isWinnerPlayer = checkWinner(playerOne.marker);
                   let isWinnerPc = checkWinner(playerPc.marker);
                   console.log(isWinnerPc)
                    if (isWinnerPlayer == true) {
                        gameOver(playerOne); 
                        
                        
                    }else if (isWinnerPc == true){
                        gameOver(playerPc); 
                                            
                    }
                }        
            });
        });
        
    }

    function reset(){
        const boxes = document.querySelectorAll(".box");


        console.log(reset)
        const modal = document.querySelector('#modal-winner');
        boxes.forEach(box =>{
            
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    setBox("", i, j, box);
                    if(!box.classList.contains("free")){
                        box.textContent= ""; 
                        box.classList.add("free");
                    } 
                }
                
            }     
        });
        modal.style.display = "none";
    }

    function gameOver(player){
        
        const modal = document.querySelector('#modal-winner');
        const content = document.querySelector('.content');
        const btnReset = document.createElement('button');
        btnReset.id = "reset";
        btnReset.innerText = "Reset";

        console.log("the game is over");
        let winner = document.createElement("h2"); 
        let score = document.createElement("div"); 

        player.setScore();
        winner.textContent = `Congrats: ${player.name}`;
        score.textContent = `Score: ${player.getScore()}`;
        
        
        content.appendChild(winner);
        content.appendChild(score);
        content.appendChild(btnReset);
        modal.style.display="flex"; 



        btnReset.addEventListener('click', ()=>{
            content.textContent = "";
            winner.textContent = ""; 
            score.textContent = "";
            /* content.appendChild(btnReset); */
            
            reset();
        });
    }
    
    





    return {gameStart, gameOver}

})();



const game = (function(){
    document.addEventListener('DOMContentLoaded', ()=>{
        const modalStart = document.querySelector(".start-game");
        modalStart.classList.add("starting")

        const start = document.querySelector("#start-game");
        start.addEventListener("click", ()=>{
            const formSetGame = document.querySelector(".set-game");

            modalStart.classList.remove("starting"); 
            const name = document.querySelector(".input-name").value; 
            const marker = document.querySelector("#marker").value;

            const pcMarker = (marker == 'X') ? "O" : "X";    

            const playerOne = createPlayer(name, marker);
            const playerPc = createPlayer('pc', pcMarker);
             /*cada vez que se inicia el juego, inicializamos el board*/ 
             formSetGame.reset()
         gameBoard.displayBoard();

            (function game(){
                handleGame.gameStart(playerOne, playerPc); 

            })(gameBoard, handleGame)
        });

    });

})();