const gridContainer = document.querySelector('.grid-container')
const whichTurn = document.querySelector('.which-turn')
const GRID_LENGTH = 42
const COL_LENGTH = 7
const ROW_LENGTH = 6
const columns = [[],[],[],[],[],[],[]]


function drawGrid()
{
    for(let i = 0; i < GRID_LENGTH; i++)
    {
        const gridItem = document.createElement('div')
        let index = GRID_LENGTH - i - 1
        gridItem.classList.add('grid-item')
        gridItem.setAttribute('id', index)
        gridItem.innerHTML = gridItem.id
        gridItem.addEventListener('mousedown', handleGridItemClick)
        gridContainer.appendChild(gridItem)
    }
}

function handleGridItemClick(event) {
    const index = parseInt(event.currentTarget.id);
    drawToken(index);
    checkWinner(index);
}

function checkWinner(index)
{
    //check vertical column
    if (checkWinnerVertically(index).length > 3)
    {
        markWinner(checkWinnerVertically(index))
    }
    //check horizontal row
    if (checkWinnerHorizontally(index).length > 3)
    {
        markWinner(checkWinnerHorizontally(index))
    }
    //check diagonally left top to right bottom
    if (checkWinnerDiagonallyFromLeftTop(index).length > 3)
    {
        markWinner(checkWinnerDiagonallyFromLeftTop(index))
    }
    //check diagonally right top to left bottom
    if (checkWinnerDiagonallyFromRightTop(index).length > 3)
    {
        markWinner(checkWinnerDiagonallyFromRightTop(index))
    }
}

function checkWinnerVertically(index)
{
    let currSeq = 0
    let winningTokens = []
    for(let i = 0; i < columns[index % COL_LENGTH].length ; i++)
    {
        let col = index % COL_LENGTH
        let row = i
        if (currSeq === 0)
        {
            if (columns[col][row].style.backgroundColor === columns[index % COL_LENGTH][Math.floor(index / COL_LENGTH)].style.backgroundColor)
            {
                currSeq++
                winningTokens.push(columns[col][row])
            }
        }
        else
        {
            if (columns[col][row].style.backgroundColor === columns[col][row-1].style.backgroundColor &&
                columns[col][row].style.backgroundColor === columns[index % COL_LENGTH][Math.floor(index / COL_LENGTH)].style.backgroundColor)
            {
                currSeq++
                winningTokens.push(columns[col][row])
            }
            else
            {
                currSeq = 0
                winningTokens = []
            }

            if (currSeq === 4)
            {
                return winningTokens
            }
        }
    }
    return winningTokens
}

function checkWinnerHorizontally(index)
{
    let currSeq = 0
    let winningTokens = []
    for(let i = 0; i < COL_LENGTH ; i++)
    {
        let col = i
        let row = Math.floor(index / COL_LENGTH)
        if(!columns[col][row])
        {
            continue
        }
        if (currSeq === 0)
        {
            if (columns[col][row].style.backgroundColor === columns[index % COL_LENGTH][Math.floor(index / COL_LENGTH)].style.backgroundColor)
            {
                currSeq++
                winningTokens.push(columns[col][row])
            }
        }
        else
        {
            if (columns[col][row].style.backgroundColor === columns[col-1][row].style.backgroundColor &&
                columns[col][row].style.backgroundColor === columns[index % COL_LENGTH][Math.floor(index / COL_LENGTH)].style.backgroundColor)
            {
                currSeq++
                winningTokens.push(columns[col][row])
            }
            else
            {
                currSeq = 0
                winningTokens = []
            }

            if (currSeq === 4)
            {
                return winningTokens
            }
        }
    }
    return winningTokens
}

function checkWinnerDiagonallyFromLeftTop(index)
{
    let currSeq = 0
    let winningTokens = []
    for(let i = 0; i < COL_LENGTH ; i++)
    {
        let row = Math.max(Math.floor(index / COL_LENGTH) - index % COL_LENGTH, 0) + i
        let col = Math.max(index % COL_LENGTH - Math.floor(index / COL_LENGTH) , 0) + i
        if(!columns[col][row])
        {
            continue
        }
        if (currSeq === 0)
        {
            if (columns[col][row].style.backgroundColor === columns[index % 7][Math.floor(index / COL_LENGTH)].style.backgroundColor)
            {
                currSeq++
                winningTokens.push(columns[col][row])
            }
        }
        else
        {
            if (columns[col][row].style.backgroundColor === columns[col-1][row-1].style.backgroundColor &&
                columns[col][row].style.backgroundColor === columns[index % COL_LENGTH][Math.floor(index / COL_LENGTH)].style.backgroundColor)
            {
                currSeq++
                winningTokens.push(columns[col][row])
            }
            else/*20 31 42 53 */
            {
                currSeq = 0
                winningTokens = []
            }

            if (currSeq === 4)
            {
                return winningTokens
            }
        }
    }
    return winningTokens
}

function checkWinnerDiagonallyFromRightTop(index)
{
    let currSeq = 0
    let winningTokens = []
    for(let i = 0; i < COL_LENGTH ; i++)
    {
        let col = Math.max(Math.floor(index / COL_LENGTH) + index % COL_LENGTH, 0) - i
        let row = Math.max(index % COL_LENGTH - Math.floor(index / COL_LENGTH) , 0) + i
        if(!columns[col][row])//check if its okay to overflow
        {
            continue
        }
        if (currSeq === 0)
        {
            if (columns[col][row].style.backgroundColor === columns[index % COL_LENGTH][Math.floor(index / COL_LENGTH)].style.backgroundColor)
            {
                currSeq++
                winningTokens.push(columns[col][row])
            }
        }
        else
        {
            if (columns[col][row].style.backgroundColor === columns[col+1][row-1].style.backgroundColor &&
                columns[col][row].style.backgroundColor === columns[index % COL_LENGTH][Math.floor(index / COL_LENGTH)].style.backgroundColor)
            {
                currSeq++
                winningTokens.push(columns[col][row])
            }
            else/*20 31 42 53 */
            {
                currSeq = 0
                winningTokens = []
            }

            if (currSeq === 4)
            {
                return winningTokens
            }
        }
    }
    return winningTokens
}

function markWinner(tokens)
{
    //mark winner with green background color
    for(let i = 0; i < tokens.length; i++)
    {
        tokens[i].parentElement.style.backgroundColor = 'rgb(81, 255, 0)'
    }
    //remove all event listeners
    children = gridContainer.children
    for(let i = 0; i < children.length; i++)
    {
        children[i].removeEventListener('mousedown', handleGridItemClick)
    }
    //name the winner
    if (whichTurn.style.backgroundColor === 'red')
    {
        whichTurn.innerHTML = 'Blue is the winner!!!'
        whichTurn.style.backgroundColor = 'blue'
    }
    else
    {
        whichTurn.innerHTML = 'Red is the winner!!!'
        whichTurn.style.backgroundColor = 'red'
    }

    //ask for a new game
    const btn = document.getElementById('new-game-btn')
    btn.removeAttribute('hidden')
    btn.addEventListener('click', function(){location.reload()})
}

function drawToken(i)
{
    if (Math.floor(i / COL_LENGTH) === columns[i % COL_LENGTH].length){
        const token = makeToken()
        columns[i % COL_LENGTH].push(token)
        document.getElementById(i).appendChild(token)
    }
    else{
        errorNotValidPos(i)
    }
    
}

function makeToken()
{
    const token = document.createElement('div')
    token.classList.add('token')

    //change to other players turn
    if (whichTurn.id === 'red')
    {
        token.style.backgroundColor = 'red'
        whichTurn.id = 'blue'
        whichTurn.style.backgroundColor = 'blue'
        whichTurn.innerHTML = 'Blue\'s turn'
    }
    else
    {
        token.style.backgroundColor = 'blue'
        whichTurn.id = 'red'
        whichTurn.style.backgroundColor = 'red'
        whichTurn.innerHTML = 'Red\'s turn'
    }

    return token
}

function errorNotValidPos(i)
{
    const gridItem = document.getElementById(i)
    const errorText = document.getElementById('error-text')
    let numberOfTimes = 3;
    delay = 300;
    //show error in grid item
    for (let i = 0; i < numberOfTimes; i++) {
        setTimeout(function(){errorInGridItem(gridItem)}, delay * i);
    }
    //show error in div item
    for (let i = 0; i < numberOfTimes; i++) {
        setTimeout(function(){errorInDivItem(errorText)}, delay * i);
    }
}

function errorInGridItem(gridItem)
{
    gridItem.style.backgroundColor = 'red'
    setTimeout(function(){gridItem.style.backgroundColor = ''}, 100)
}

function errorInDivItem(divItem)
{
    divItem.style.display = 'block'
    setTimeout(function(){divItem.style.display = 'none'}, 100)
}



function main()
{
    drawGrid()
    //eventListener(mouse click, makeMove)
    //checkWinner()

}

main()