var grid = [
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0],
[0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0],
[0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
[0, 1, 0, 1, 1, 0, 1, 2, 0, 1, 1, 0, 1, 0],
[0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0],
[0, 1, 1, 2, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0],
[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
[0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0],
[0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
[0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0],
[0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 2, 0, 1, 0],
[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]


var pacman = {
    row: 1,
    col: 1,
    htmlCode: '<div id="pacman" style="margin: 15px;"></div>',
}

var ghost1 = {
    x: 7,
    y: 1,
    htmlCode: '<div id="ghost" style="margin: 15px;"></div>',
}

var myGrid = document.querySelector('.grid');

console.log(myGrid)

function drawGrid () {
    var output = '';
    for (var i=0; i < grid.length; i++){

        output += "\n<div class='row'>\n"

        for(var j=0; j < grid[i].length; j++) {
            if (grid[i][j] == 0) {
                output += "<div class='wall'></div>";
            }else if(grid[i][j] == 1) {
                output +="<div class='food empty coords"+i+"-"+j+"'></div>";
            }else if(grid[i][j] == 2) {
                output +="<div class='reward coords"+i+"-"+j+"'></div>";
            }
            
        }
        output += "\n</div>"

    }
    myGrid.innerHTML = output; 

}

// GHOSTS -----------------
function displayGhost(oneGhost){
    $('.coords' + oneGhost.y + '-' + oneGhost.x).html(oneGhost.htmlCode);
}

function deleteGhost (oneGhost) {
    $('.coords' + oneGhost.y + '-' + oneGhost.x).html('');
}






//GHOST MOVEMENT
function getRandom() {
    var random = Math.floor(Math.random() * 4)+1;
    return random;
}

var currentDirection = 1;

function ghostMove(oneGhost){
    currentDirection = getRandom();
    
//Left Right New Direction
    // if(
    //     //If it's going right or left and up or down is available
    //     ((currentDirection == 1 || currentDirection == 2) && (grid[ghost.y+1][ghost.x]==9 || grid[ghost.y+1][ghost.x]==10 || grid[ghost.y+1][ghost.x]==11 || grid[ghost.y+1][ghost.x]==12 || grid[ghost.y-1][ghost.x]==9 || grid[ghost.y-1][ghost.x]==10 || grid[ghost.y-1][ghost.x]==11 || grid[ghost.y-1][ghost.x]==12))
    //     ||
    //     //Or if it's going up or down and left or right is available
    //     ((currentDirection == 3 || currentDirection == 4) && (grid[ghost.y][ghost.x+1]==9 || grid[ghost.y][ghost.x+1]==10 || grid[ghost.y][ghost.x+1]==11 || grid[ghost.y][ghost.x+1]==12 || grid[ghost.y][ghost.x-1]==9 || grid[ghost.y][ghost.x-1]==10 || grid[ghost.y][ghost.x-1]==11 || grid[ghost.y][ghost.x-1]==12))
    // ){
    //     //Check to make sure it won't change direction to it's current direction
    //     // while(newDirection == currentDirection){
    //     //     newDirection = getRandom();
    //     // }
    //     //Change direction to a new direction
    //     currentDirection = newDirection;
    // }
    
    deleteGhost(oneGhost);

    if(currentDirection ==  1 && grid[oneGhost.y][oneGhost.x-1] != 0){
        oneGhost.x --;
       console.log("move left", grid[oneGhost.y][oneGhost.x-1])
    }else if(currentDirection == 2 && grid[oneGhost.y][oneGhost.x+1] != 0){
       console.log("move right", grid[oneGhost.y][oneGhost.x+1])
        oneGhost.x ++;
    }else if(currentDirection == 3 && grid[oneGhost.y-1][oneGhost.x] != 0 ){
       console.log("move up", grid[oneGhost.y-1][oneGhost.x])
        oneGhost.y --;
    }else if(currentDirection == 4 && grid[oneGhost.y+1][oneGhost.x] != 0){
       console.log("move down", grid[oneGhost.y+1][oneGhost.x])
        oneGhost.y ++;
    }
   displayGhost(oneGhost);   
}

setInterval(function() {
    ghostMove(ghost1);
    console.log(ghost1)
}, 2000);



function drawPacman(){
    // add pacman to the current cell
    $('.coords' +  pacman.row + '-' + pacman.col).html(pacman.htmlCode);
    // document.getElementById('pacman').style.left = pacman.x*20+"px";
    // document.getElementById('pacman').style.top = pacman.y*20+"px";
}

function deletePacman(){
    // remove pacman from current cell
    $('.coords' +  pacman.row + '-' + pacman.col).html('');
}

function deleteFood(){
    // removess food 
    if($('.coords'+pacman.row+'-'+pacman.col).hasClass('food')){
        $('.coords'+pacman.row+'-'+pacman.col).removeClass('food')
    }
}

function deleteReward(){
    // removes cherries
    if($('.coords'+pacman.row+'-'+pacman.col).hasClass('reward')){
        $('.coords'+pacman.row+'-'+pacman.col).removeClass('reward')
    }
}

drawGrid()
$('.coords' +  pacman.row + '-' + pacman.col).html(pacman.htmlCode);
displayGhost(ghost1);

// PACMAN MOVEMENT
document.onkeydown = function(event){
    switch(event.keyCode){
        case 37: // left arrow
            event.preventDefault()
        if (grid[pacman.row][pacman.col-1] === 0){
            return
        }
            deleteReward();
            deleteFood();
            deletePacman();
            pacman.col -= 1;
            drawPacman();
            break;
            // if ((grid[pacman.row][pacman.col] 
                

        case 38: // up arrow
            event.preventDefault()
            if (grid[pacman.row - 1][pacman.col] === 0){
                return
            }
            deleteReward();
            deleteFood();
            deletePacman();
            pacman.row -= 1;
            drawPacman();
            break;

        case 39: // right arrow
            event.preventDefault()
            if (grid[pacman.row][pacman.col+1] === 0){
                return
            }
            deleteReward();
            deleteFood();
            deletePacman();
            pacman.col += 1;
            drawPacman();
            break;

        case 40: // down arrow
            event.preventDefault()
            if (grid[pacman.row + 1][pacman.col] === 0){
                return
            }
            deleteFood();
            deleteReward();
            deletePacman();
            pacman.row += 1;
            drawPacman();
            break;

    }

    console.log(grid[pacman.row][pacman.col])
    console.log(document.querySelector('.coords' + pacman.row + '-' + pacman.col))
}



 

