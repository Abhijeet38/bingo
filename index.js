window.onload = function() {
    var container1 = document.getElementById('grid-container1');
    var container2 = document.getElementById('grid-container2');
    var gridItems1 = document.getElementsByClassName('grid-item1');
    var gridItems2 = document.getElementsByClassName('grid-item2');
    var universal_counter=1;

    var player = player || {
        player1_visited: Array(5).fill().map(() => Array(5).fill(false)),
        player1_count: 1,

        player2_visited: Array(5).fill().map(() => Array(5).fill(false)),
        player2_count: 1,
    }

    function checkBINGO(grid){
        let rowFilled=0,colFilled=0,diagonalFilled=0,diag1=0,diag2=0;
        for(let i=0;i<5;i++){
            let row=0,col=0;
            if(grid[i][i]){diag1++;}
            if(grid[i][4-i]){diag2++;}
            for(let j=0;j<5;j++){
                if (grid[i][j]){row++;}
                if (grid[j][i]){col++;}
            }
            if(row==5){rowFilled++;}
            if(col==5){colFilled++;}
        }
        if(diag1==5){diagonalFilled++;}
        if(diag2==5){diagonalFilled++;}
        return rowFilled+colFilled+diagonalFilled;
    }

    function createGrid(container,playerKey){
        for (var i = 1; i <= 25; i++) {
            var div = document.createElement('div');
            div.className = 'grid-item';
            div.id = playerKey + i;
            div.dataset.row = Math.floor((i - 1) / 5);
            div.dataset.col = (i - 1) % 5;
            container.appendChild(div);
        }
    }

    //create grid:
    createGrid(container1, 'player1');
    createGrid(container2, 'player2');

    function playGame(event, player, playerKey, gridItems, otherPlayerKey, otherPlayerGrid) {
        
        if(event.target.className === 'grid-item') {
            var row = event.target.dataset.row;
            var col = event.target.dataset.col;
            let isGameOver = false;
            let winner = 0;  // 0->no winner yet, 1-> curr_player, 2-> other_player, 3->draw
            if(event.target.textContent === "") {
                event.target.textContent = player[playerKey + '_count']++;
                universal_counter++;
            } 
            if(player[playerKey + '_count'] == 27 && universal_counter == 52 ) {
                event.target.style.textDecoration = "line-through";
                event.target.style.backgroundColor = "red";
                player[playerKey + '_visited'][row][col] = true;
                
                //mark other player's box
                for(let i=1;i<=25;i++){
                    var otherBox = document.getElementById(otherPlayerKey+i);
                    var boxRow = Math.floor((i-1)/5);
                    var boxCol = (i-1)%5;
                    let num = otherBox.textContent;
                    if( num == event.target.textContent){
                        otherBox.style.backgroundColor = "red";
                        otherBox.style.textDecoration = "line-through";
                        player[otherPlayerKey + '_visited'][boxRow][boxCol] = true;
                    }
                }
                //

                let bingoCount1 = checkBINGO(player[playerKey + '_visited']);
                let bingoCount2 = checkBINGO(player[otherPlayerKey + '_visited']);
                for(let i=0;i<Math.min(5,bingoCount1);i++){
                    gridItems[i].style.backgroundColor="yellow";
                    gridItems[i].style.textDecoration = "line-through";
                }
                for(let i=0;i<Math.min(5,bingoCount2);i++){
                    otherPlayerGrid[i].style.backgroundColor="yellow";
                    otherPlayerGrid[i].style.textDecoration = "line-through";
                }
                if (bingoCount1>=5 && bingoCount2>=5){winner=3;isGameOver=true;}
                else if (bingoCount1>=5){winner=1;isGameOver=true;}
                else if (bingoCount2>=5){winner=2;isGameOver=true;}
            }
            if(isGameOver){
                if(winner == 3) {alert("!!!!DRAW!!!!");}
                else if(winner == 1) {alert(`${playerKey} won`);}
                else if(winner == 2) {alert(`${otherPlayerKey} won`);}
            }
            if(player[playerKey + '_count'] == 26) player[playerKey + '_count'] = 27;
            if(universal_counter == 51) universal_counter = 52;
        }
    }
    
    container1.addEventListener('click', function(event){
        playGame(event, player, 'player1', gridItems1, 'player2', gridItems2);
    });

    container2.addEventListener('click', function(event){
        playGame(event, player, 'player2', gridItems2, 'player1', gridItems1);
    });
};
