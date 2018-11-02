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

var ghostOne = {
    x: 7,
    y: 1,
    htmlCode: '<div id="ghostOne" style="margin: 15px;"></div>',
}

var ghostTwo = {
    x: 10,
    y: 5,
    htmlCode: '<div id="ghostTwo" style="margin: 15px;"></div>',
}

var ghostThree = {
    x: 4,
    y: 14,
    htmlCode: '<div id="ghostThree" style="margin: 15px;"></div>',
}

var ghostFour = {
    x: 11,
    y: 12,
    htmlCode: '<div id="ghostFour" style="margin: 15px;"></div>',
}



var myGrid = document.querySelector('.grid');

console.log(myGrid)

function displayGrid () {
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
            }else{
                output +="<div class='empty coords"+i+"-"+j+"'></div>";
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

//Delete Ghost 
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
    ghostMove(ghostOne);
    ghostMove(ghostTwo);
    ghostMove(ghostThree);
    ghostMove(ghostFour);
    console.log(ghostOne)
}, 400);



function drawPacman(){
    // add pacman to the current cell
    $('.coords' +  pacman.row + '-' + pacman.col).html(pacman.htmlCode);
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


function gameOver(oneGhost){
    if((pacman.row == oneGhost.y) && (pacman.col == oneGhost.x)){
        $('#gameover').removeClass('hidden');
        // alert("You lost!");
        setTimeout(function () {
            location.reload();
        },5000);
    }
}


displayGrid()
$('.coords' +  pacman.row + '-' + pacman.col).html(pacman.htmlCode);
displayGhost(ghostOne);

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
            $('#pacman').css('transform', 'rotate(90deg)');
            deletePacman();
            pacman.row += 1;
            drawPacman();
            // document.querySelector('div#pacman').style.transform = 'rotate(90deg)';
            
            break;

    }

    console.log(grid[pacman.row][pacman.col])
    console.log(document.querySelector('.coords' + pacman.row + '-' + pacman.col))


//DISPLAY SCORE
function displayScore(){
    document.getElementById('score').innerHTML = score;
    // $('#score').html(score);
}

//SCORING POINTS "FOOD"
if(grid[pacman.row][pacman.col] == 1){
    grid[pacman.row][pacman.col] = 4;
    score+=2;
    displayGrid();
    displayScore();
}
//SCORING CHERRIES "REWARDS"
if(grid[pacman.row][pacman.col] == 2){
    grid[pacman.row][pacman.col] = 7;
    score+=10;
    displayGrid();
    displayScore();
}


drawPacman()
gameOver(ghostOne);
gameOver(ghostTwo);
gameOver(ghostThree);
gameOver(ghostFour);
displayGhost(ghostOne);   
displayGhost(ghostTwo);   
displayGhost(ghostThree);   
displayGhost(ghostFour);   
}


var score = 0;


 

