
let cells =  [];
let playing = false;
let size = 0;
let firstClick = true;

function createGrid(gridId){

    let select = document.getElementById("difficulty")
    let difficulty = select.options[select.selectedIndex].value;

    switch (difficulty) {
        case 'easy':
          size = 10;
            break;
        case 'medium':
            size = 20;
            break;
        case 'hard':
            size = 30;
          break;          
        default: 
            size = 10;
      }

    playing = true

    grid = document.getElementById(gridId)

    let table = document.createElement('table');

    grid.innerHTML = "";
    grid.appendChild(table)

    for (let i = 0; i < size; i++){

        let tr = document.createElement('tr'); 
       
        table.appendChild(tr);
        cells[i] = []

        for(let j = 0; j < size; j++){
            let td = document.createElement('td');
            td.setAttribute("id", "case-" + j + "-" + i);
            td.style.backgroundColor = "grey";
            tr.appendChild(td);

            td.addEventListener('mousedown', function(e) {

                let cell = cells[i][j]
                switch (e.button) {
                    case 0:
                        if(playing == true  && cell.flag == false)
                        checkCell(j, i, size)
                      break;
                    default:

                    if(cell.discovered == false) {
                        if(cell.flag == false){
                            cells[i][j].element.innerHTML ="F"
                            cells[i][j].flag = true
                        }
                        else{
                            cells[i][j].element.innerHTML =""
                            cells[i][j].flag = false
                        }
                    }
                }
            }, false);

            
            
            cells[i][j] = new Cell(j, i, td);

        }
      
    }

    for(let i = 0; i < (size * size / 8); i++){
        let randomX = Math.floor(Math.random() * size);
        let randomY = Math.floor(Math.random() * size );


        cells[randomX][randomY].bomb = true;
        
    }

    calculateBomb(size)

}

function calculateBomb(size){

    for (let i = 0; i < size; i++){

        for(let j = 0; j < size; j++){
            aroundCells = getCellsAround(j, i, size)
            let cell = cells[i][j] ;
            for(around of aroundCells){
                if(around.bomb == true){
                    cell.adjacentsBomb++
                }
            }
        }
    }

}
function checkCell(x, y, size){

   if(firstClick){
        firstClick = false;
        startTimer()
   }
    
   let cell = cells[y][x] ;

   if(cell.bomb == true){
       cell.element.innerHTML = "B"
       playing = false;

       showBombs(size);

       return;
   }
   
   let adjacentsCells = getCellsAround(x,y, size)

   cell.element.style.backgroundColor ="white"
   cell.discovered = true
   if(cell.adjacentsBomb > 0)
        cell.element.innerHTML = cell.adjacentsBomb
   console.log(adjacentsCells)
    for (adjCell of adjacentsCells){
        
        if(adjCell.discovered != true && cell.adjacentsBomb == 0  ){
            checkCell(adjCell.x, adjCell.y, size)
        }

    }
}

function getCellsAround(x, y, size){

    let listCells = [];

    for (let rowPos = y > 0 ? -1 : 0; rowPos <= (y < size - 1 ? 1 : 0); rowPos++) {
        for (let colPos = x > 0 ? -1 : 0; colPos <= (x < size - 1 ? 1 : 0); colPos++) {
            xt = x + colPos
            yt = y + rowPos
            if(cells[yt][xt])
                listCells.push(cells[yt][xt])  
        }
    }

    return listCells;
}


class Cell {
    constructor(x, y, element, adjacentsBomb = 0, discovered = false, bomb = false, flag = false) {
      this.x = x;
      this.y = y;
      this.element = element
      this.adjacentsBomb = adjacentsBomb
      this.discovered = discovered
      this.bomb = bomb
      this.flag = flag
    }
  }

function showBombs(size){
    for (let i = 0; i < size; i++){

        for(let j = 0; j < size; j++){
            aroundCells = getCellsAround(j, i, size)
            let cell = cells[i][j] ;
            if(cell.bomb == true){
                cell.element.innerHTML = "B"
            }
        }
    }

}


function startTimer() {
    let counter = 0;

    setInterval(() => {
        let timer = document.getElementById("time")
        counter++;
        timer.innerHTML = counter.toString();
    },1000)
}