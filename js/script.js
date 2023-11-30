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

        // Dichiarazione della costante per il numero di bombe da visualizzare all'interno dell'array
        const bombsToShow = 16;

        const bombs = generateBombsList(bombsToShow);
        console.log(bombs);

        let points = 0; 
        let gameOver = false;

        // Definire un ciclo for per la realizzazione delle celle da 1 a 100
        for (let i=0; i<totalCells; i++) {
            // Creazione della singola cella
            let square = createCell(i+1, cellsPerSide);
            // Al click la cella cambierà di colore e la console emette il numero della cella
            square.addEventListener('click', function(){
                // Verifica se l'utente ha perso
                if(!gameOver){
                    if(!bombs.includes(i)){
                        this.classList.add('clicked');
                        points++;
    
                        document.getElementById('score').innerText = `Il tuo punteggio è pari a ${points}`;
                    }
                    else {
                        this.classList.add('clicked-bombs');
                        document.getElementById('gameOver').innerText = 'Hai perso';
                        grid.innerText = '';
                    }
                }


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

// Funzione che genera un numero casualmente. Se il numero non è presente lo inserisce all'interno dell'array, altrimenti ne genera un altro
function generateRandomNumbers (arrayBombs){
    let checkNumber = false;

    let randomInt;
    while (!checkNumber) {
        randomInt = Math.floor(Math.random() * 100 + 1);
        if(!arrayBombs.includes(randomInt)){
            checkNumber = true;
        }
    }
    return randomInt;
}

// Definizione della funzione che genera le singole bombe
function generateBombsList (numberOfBombs){
    let bombs = [];
    // Inserire all'interno dell'array 'bombs' un numero casuale
    for (let i=0 ; i < numberOfBombs ; i++){
        let bombNum = generateRandomNumbers(bombs);
        bombs.push(bombNum);
    }
    return bombs;
}



