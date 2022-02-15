const canvas = document.querySelector('canvas');
const res = 20; // 10
canvas.width = 1500; //1500
canvas.height = 700; //700
const ctx = canvas.getContext('2d');

const COLS = Math.floor(canvas.width / res);
const ROWS = Math.floor(canvas.height / res);

function make2Darray(cols, rows) {
    return new Array(rows).fill(null)
        .map(() => new Array(cols).fill(null)
            .map(() => Math.floor(Math.random() * 2))
        );

}
function countAlive(grid, r, c) {
    let count = 0;
    for (let dr = -1; dr < 2; dr++) {
        for (let dc = -1; dc < 2; dc++) {
            let row = (r + dr);
            let col = (c + dc);
            if (row === r && col === c) {
                continue;
            }
            if (row < 0 || row >= ROWS || col < 0 || col >= COLS) {
                continue;
            }

            count += (grid[row][col]) ? 1 : 0;
        }
    }
    return count;
}

function staysAlive(count) {
    return (count === 2 || count === 3);
}

function becomesAlive(count) {
    return (count === 3);
}

function update() {
    grid = nextGen(grid);
    render(grid);
    requestAnimationFrame(update);
}
function nextGen(grid) {
    const nextGenGrid = grid.map(arr => [...arr])

    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] === 1) {
                nextGenGrid[r][c] = staysAlive(countAlive(grid, r, c)) ? 1 : 0;
            }
            else if (grid[r][c] === 0) {
                nextGenGrid[r][c] = becomesAlive(countAlive(grid, r, c)) ? 1 : 0;
            }
        }
    }
    return nextGenGrid;
}

function render(grid) {
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            const cell = grid[r][c];
            ctx.beginPath();
            ctx.rect(c * res, r * res, res, res);
            ctx.fillStyle = cell ? 'black' : 'white';
            ctx.fill();
            ctx.stroke();

        }
    }
}




let grid = make2Darray(COLS, ROWS);
requestAnimationFrame(update);
update();
console.log(grid);