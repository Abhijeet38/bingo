window.onload = function() {
    var container = document.getElementById('grid-container');
    var gridItems = document.getElementsByClassName('grid-item');
    var count = 1;
    var grid = Array(5).fill().map(() => Array(5).fill(false));
    var visited = Array(5).fill().map(() => Array(5).fill(false));

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

    //create grid: 1 to 25
    for (var i = 1; i <= 25; i++) {
        var div = document.createElement('div');
        div.className = 'grid-item';
        div.dataset.row = Math.floor((i - 1) / 5);
        div.dataset.col = (i - 1) % 5;
        container.appendChild(div);
    }

    container.addEventListener('click', function(event) {
        if(event.target.className === 'grid-item') {
            var row = event.target.dataset.row;
            var col = event.target.dataset.col;
            let isGameOver = false;
            if(event.target.textContent === "") {
                event.target.textContent = count++;
                grid[row][col] = true;
            } 
            if(count > 26) {
                event.target.style.textDecoration = "line-through";
                event.target.style.backgroundColor = "red";
                visited[row][col] = true;
                let bingoCount = checkBINGO(visited);
                for(let i=0;i<Math.min(5,bingoCount);i++){
                    gridItems[i].style.backgroundColor="yellow";
                    gridItems[i].style.textDecoration = "line-through";
                }
                if (bingoCount>=5){isGameOver=true;}
            }
            if(isGameOver){
                alert("Game-Over");
            }
            if(count == 26) count=27;
        }
        
    });

};