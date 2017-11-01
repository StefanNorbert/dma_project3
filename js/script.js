const cells = document.querySelectorAll('.elements');
var cellsArray = [[],[],[],[]];

/*============================== Helper functions =======================================*/

function fakeContent(){
    //cells[0].textContent = 2;
    //cells[1].textContent = 2;
    //cells[2].textContent = 2;
    //cells[3].textContent = 2;
    //cells[4].textContent = 2;
    //cells[5].textContent = 2;
    //cells[6].textContent = 2;
    //cells[7].textContent = 2;
    //cells[8].textContent = 4;
    //cells[9].textContent = 4;
    //cells[10].textContent = 4;
    //cells[11].textContent = 4;
    //cells[12].textContent = 4;
    //cells[13].textContent = 4;
    //cells[14].textContent = 4;
    //cells[15].textContent = 4;
    //cellsArray[0][0].textContent = 4;
    //cellsArray[0][1].textContent = 2;
    //cellsArray[0][2].textContent = 16;
    //cellsArray[0][3].textContent = 8;
    //cellsArray[1][0].textContent = 32;
    //cellsArray[1][1].textContent = 1024;
    //cellsArray[1][2].textContent = 2;
    //cellsArray[1][3].textContent = 2;
    //cellsArray[2][0].textContent = 64;
    //cellsArray[2][1].textContent = 1024;
    //cellsArray[2][2].textContent = 2;
    //cellsArray[2][3].textContent = 128;
    //cellsArray[3][0].textContent = 2;
    //cellsArray[3][1].textContent = 256;
    //cellsArray[3][2].textContent = 2;
    //cellsArray[3][3].textContent = 2;
}

//noinspection JSUnusedLocalSymbols
function emptyAllCells(){
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            cellsArray[i][j].textContent = '';
        }
    }
    //or loop through cells NodeList
}

//noinspection JSUnusedLocalSymbols
function getIndexOfNode(arr, node) {
    //in a two dimensional array
    for (var i = 0; i < arr.length; i++) {
        var index = arr[i].indexOf(node);
        if (index > -1) {
            console.log('found: ', node, arr[i][index]);
            return [i, index];
        }
    }
}

/*============================== Game functions =======================================*/
function startGame(){
    multidimensional();
    fakeContent(); //for testing
    newNumber();
    startListeners();
}

function multidimensional(){
//Creating a multidimendional version of cells cellsArray
    let pointer = 0;
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            cellsArray[i][j] = cells[pointer];
            pointer++;
        }
    }
}

function startListeners(){
    $(document).keydown(function(e) {
        let changes = false;
        switch(e.which) {
            case 37:
                console.log('Left pressed');
                changes = leftPressed();
                break;
            case 38:
                console.log('Up pressed');
                changes = upPressed();
                break;
            case 39:
                console.log('Right pressed');
                changes = rightPressed();
                break;
            case 40:
                console.log('Down pressed');
                changes = downPressed();
                break;
        }
        if(changes){
            setTimeout(newNumber, 500);
        }
    });
}

function newNumber(){
    let emptyCells = Array.from(cells).filter(cell => cell.textContent === '');
    const rNum = Math.floor(Math.random()*emptyCells.length);
    emptyCells[rNum].textContent = Math.random()>0.8 ? 4 : 2;
    if(emptyCells.length === 1){
        let gameOver = !movesLeft();
        if(gameOver){
            console.log("Game Over!");
        }
    }
}

function movesLeft(){
    for(let y=0; y<3; y++){
        for(let x=0; x<=3; x++){
            if(x<3){
                console.log('comparing: ', cellsArray[y][x], cellsArray[y][x+1]);
                if(cellsArray[y][x].textContent === cellsArray[y][x+1].textContent){
                    return true;
                }
                console.log('comparing: ', cellsArray[y][x], cellsArray[y+1][x]);
                if(cellsArray[y][x].textContent === cellsArray[y+1][x].textContent){
                    return true;
                }
            } else {
                console.log('comparing: ', cellsArray[y][x], cellsArray[y+1][x]);
                if(cellsArray[y][x].textContent === cellsArray[y+1][x].textContent){
                    return true;
                }
            }
        }
    }
    return false;
}

function unite(y, x, dirrection){
    if(dirrection === 'down'){
        let yl = y-1;
        while(yl>=0){
            if(cellsArray[yl][x].textContent){
                if(cellsArray[yl][x].textContent === cellsArray[y][x].textContent){
                    cellsArray[y][x].textContent *= 2;
                    cellsArray[yl][x].textContent = '';
                    if(cellsArray[y][x].textContent == 2048) {
                        console.log('You win!');
                    }
                    //found/moreToDo
                    return [true, false];
                } else {
                    return [false, true];
                }
            }
            yl--;
        }
        return [false, false];
    }
    if(dirrection === 'up'){
        let yl = y+1;
        while(yl<=3){
            if(cellsArray[yl][x].textContent){
                if(cellsArray[yl][x].textContent === cellsArray[y][x].textContent){
                    cellsArray[y][x].textContent *= 2;
                    cellsArray[yl][x].textContent = '';
                    //found/moreToDo
                    return [true, false];
                } else {
                    return [false, true];
                }
            }
            yl++;
        }
        return [false, false];
    }
    if(dirrection === 'left'){
        let xl = x+1;
        while(xl<=3){
            if(cellsArray[y][xl].textContent){
                if(cellsArray[y][xl].textContent === cellsArray[y][x].textContent){
                    cellsArray[y][x].textContent *= 2;
                    cellsArray[y][xl].textContent = '';
                    //found/moreToDo
                    return [true, false];
                } else {
                    return [false, true];
                }
            }
            xl++;
        }
        return [false, false];
    }
    if(dirrection === 'right'){
        let xl = x-1;
        while(xl>=0){
            if(cellsArray[y][xl].textContent){
                if(cellsArray[y][xl].textContent === cellsArray[y][x].textContent){
                    cellsArray[y][x].textContent *= 2;
                    cellsArray[y][xl].textContent = '';
                    //found/moreToDo
                    return [true, false];
                } else {
                    return [false, true];
                }
            }
            xl--;
        }
        return [false, false];
    }
}

function move(y, x, dirrection){
    if(dirrection === 'down'){
        let yl = y-1;
        while(yl>=0){
            if(cellsArray[yl][x].textContent){
                cellsArray[y][x].textContent = cellsArray[yl][x].textContent;
                cellsArray[yl][x].textContent = '';
                return true;
            }
            yl--;
        }
        return false;
    }
    if(dirrection === 'up'){
        let yl = y+1;
        while(yl<=3){
            if(cellsArray[yl][x].textContent){
                cellsArray[y][x].textContent = cellsArray[yl][x].textContent;
                cellsArray[yl][x].textContent = '';
                return true;
            }
            yl++;
        }
        return false;
    }
    if(dirrection === 'left'){
        let xl = x+1;
        while(xl<=3){
            if(cellsArray[y][xl].textContent){
                cellsArray[y][x].textContent = cellsArray[y][xl].textContent;
                cellsArray[y][xl].textContent = '';
                return true;
            }
            xl++;
        }
        return false;
    }
    if(dirrection === 'right'){
        let xl = x-1;
        while(xl>=0){
            if(cellsArray[y][xl].textContent){
                cellsArray[y][x].textContent = cellsArray[y][xl].textContent;
                cellsArray[y][xl].textContent = '';
                return true;
            }
            xl--;
        }
        return false;
    }
}

function downPressed(){
    //debugger;
    let changes = false;
    for(let x=0; x<=3; x++){
        let y = 3;
        let found = false;
        let moreToDo = false;
        do {
            if(cellsArray[y][x].textContent){
                [found, moreToDo] = unite(y, x, 'down');
                console.log(`united = ${found} / more to do = ${moreToDo} `);
                y--;
            } else {
                found = move(y, x, 'down');
                console.log('moved: ',found);
            }
            if(!changes && found){
                console.log('Changes changed');
                changes = true;
            }
        } while ((found || moreToDo) && y>0);
    }
    return changes;
}

function upPressed(){
    let changes = false;
    for(let x=0; x<=3; x++){
        let y = 0;
        let found = false;
        let moreToDo = false;
        do {
            if(cellsArray[y][x].textContent){
                [found, moreToDo] = unite(y, x, 'up');
                console.log(`united = ${found} / more to do = ${moreToDo} `);
                y++;
            } else {
                found = move(y, x, 'up');
                console.log('moved: ',found);
            }
        if(!changes && found){
            console.log('Changes changed');
            changes = true;
        }
        } while ((found || moreToDo) && y<3);
    }
    return changes;
}

function leftPressed(){
    let changes = false;
    for(let y=0; y<=3; y++){
        let x = 0;
        let found = false;
        let moreToDo = false;
        do {
            if(cellsArray[y][x].textContent){
                [found, moreToDo] = unite(y, x, 'left');
                console.log(`united = ${found} / more to do = ${moreToDo} `);
                x++;
            } else {
                found = move(y, x, 'left');
                console.log('moved: ',found);
            }
        if(!changes && found){
            console.log('Changes changed');
            changes = true;
        }
        } while ((found || moreToDo) && x<3);
    }
    return changes;
}

function rightPressed(){
    let changes = false;
    for(let y=0; y<=3; y++){
        let x = 3;
        let found = false;
        let moreToDo = false;
        do {
            if(cellsArray[y][x].textContent){
                [found, moreToDo] = unite(y, x, 'right');
                console.log(`united = ${found} / more to do = ${moreToDo} `);
                x--;
            } else {
                found = move(y, x, 'right');
                console.log('moved: ',found);
            }
        if(!changes && found){
            console.log('Changes changed');
            changes = true;
        }
        } while ((found || moreToDo) && x>0);
    }
    return changes;
}

//$('#start_game').click(startGame);
startGame();






