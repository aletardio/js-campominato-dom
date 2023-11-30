document.getElementById('generate-button').addEventListener('click', function(){
    createNewGame();
})

// Funzione che mi genera la griglia in base al livello di difficoltà selezionato
function createNewGame() {
    document.getElementById('grid').innerHTML = '';

    let levelSelector = document.getElementById('difficulty');
    let level = parseInt(levelSelector.value);

    let cellsNumber; 
    let cellsPerSide;

    // Determinazione delle caselle per livello
    switch(level) {
        case 1: 
            cellsNumber = 100; 
            cellsPerSide = 10; 
            break;

        case 2: 
            cellsNumber = 81; 
            cellsPerSide = 9; 
            break;

        case 3: 
            cellsNumber = 49; 
            cellsPerSide = 7; 
            break;
        default: 
            cellsNumber = 100; 
            cellsPerSide = 10;
    }

    // Radice quadrata
    // cellsPerSide = Math.sqrt(cellsNumber);

    createPlayGround(cellsNumber, cellsPerSide);
}

function createPlayGround(totalCells, cellsPerSide) {

        // Ottiene il riferimento al contenitore della griglia
        const grid = document.getElementById('grid');
        // Definire un ciclo for per la realizzazione delle celle da 1 a 100
        for (let i=0; i<totalCells; i++) {
            // Creazione della singola cella
            let square = createCell(i+1, cellsPerSide);
            // Al click la cella cambierà di colore e la console emette il numero della cella
            square.addEventListener('click', function(){
                this.classList.toggle('clicked');
                console.log(this.innerText);
            })
            // Appendo la cella alla griglia
            grid.appendChild(square);
        }
}


// Funzione che permette di creare la singola casella della griglia
function createCell (num, numPerSide) {

    
    const element = document.createElement('div');
    element.classList.add('square');
    
    let sideLenght = `calc(50vw / ${numPerSide})`;
    const grid = document.getElementById('grid');
    grid.style.width = numPerSide * sideLenght;
    grid.style.height = numPerSide * sideLenght;


    element.style.width = sideLenght;
    element.style.height = sideLenght;

    const span = document.createElement('span');
    span.innerText = num; 

    element. appendChild(span);
    
    
    return element;

}



