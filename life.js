var fps = 3;
var yearsCounter = 0;
var pole = initRandomPole(50);
var context = document.getElementById('life').getContext('2d');
context.fillStyle = "rgb(200,0,0)";
drawNextFrap(context,10);
game();
  
function game(){
  var oldpole = pole;
  changeGeneration();
  yearsCounter++;
  if(yearsCounter % 10 == 0 && isEnd(oldpole)){
    return;
  }
  drawNextFrap(context,10);
  setTimeout(function() {
    window.requestAnimationFrame(game);
  }, 1000 / fps);
};

function drawNextFrap(context,chunkSize){
    for(var x =0; x<pole.length; x++) {
        for(var y=0;y<pole[x].length;y++) {
            drawCell(x,y,pole[x][y],context,chunkSize);
        }
    }
}

function drawCell(a,b,value,context,chunkSize){
    if( value ){
        context.fillRect(a*chunkSize,b*chunkSize,chunkSize,chunkSize);
    } else {
        context.clearRect(a*chunkSize,b*chunkSize,chunkSize,chunkSize);
    }
}

function initRandomPole (size){
    var pole = new Array(size);
    for (var i = 0; i < size; i++) {
      pole[i] = new Array(size);
      for (var j = 0; j < size; j++) {
        pole[i][j] = Math.random()<.5;
      }
    }
    return pole;
}

function changeGeneration () {
  var size = pole.length;
    var newPole = new Array(size);
    for (var i = 0; i < size; i++) {
        newPole[i] = new Array(size);
        for (var j = 0; j < size; j++) {
            newPole[i][j] = getNexGenCell(pole[i][j],i,j);
        }
    }
    pole = newPole;
}

function getNexGenCell(cell,x,y) {
    var neighborsCount = getNeighborsCount(x,y);
    return (!cell && neighborsCount==3) || cell && (neighborsCount==2 || neighborsCount==3);
}

function getNeighborsCount(a, b){
    var count = 0;
    var steps = [-1, 0, 1];
    var length = pole.length;

    for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
            var stepX = steps[x];
            var stepY = steps[y];
            if(stepX===0 && stepY===0){
                continue;
            }
            if((0<=a+stepX&&a+stepX<length) && (0<=b+stepY&&b+stepY<length) && pole[a+stepX][b+stepY]){
                count++;
            }
        }
    }
    return count;
}

function isEnd(old){
    return old.every(function(arr, arrnumber) {
             return arr.every(function(element, index) {
                  return element === pole[arrnumber][index];
              });
          });
}