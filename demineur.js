
let cells =  []

function createGrid(size, gridId){

    
    grid = document.getElementById(gridId)

    let table = document.createElement('table');

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

            td.addEventListener("click", function() {
                checkCell(j, i, size)
            });

            
            
            cells[i][j] = new Cell(j, i, td);

        }
      
    }

    for(let i = 0; i < size  *  2; i++){
        let randomX = Math.floor(Math.random() * size);
        let randomY = Math.floor(Math.random() * size );


        cells[randomX][randomY].bomb = true;
        cells[randomX][randomY].element.innerHTML = "B"
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
                   // cell.element.innerHTML = cell.adjacentsBomb
                }
            }
        }
    }

}
function checkCell(x, y, size){
    
   let cell = cells[y][x] ;

   let listCells = []

   if(cell.bomb == true){
       alert('perdu')

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
    constructor(x, y, element, adjacentsBomb = 0, discovered = false, bomb = false) {
      this.x = x;
      this.y = y;
      this.element = element
      this.adjacentsBomb = adjacentsBomb
      this.discovered = discovered
      this.bomb = bomb
    }
  }