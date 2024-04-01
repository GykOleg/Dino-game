// Дошка

let board;
let boardWidth = 750;
let boardHeight = 500;
let context;

// Динозаврик

let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = boardWidth / 2 - dinoWidth;
let dinoY = boardHeight / 2 - dinoHeight;

let dino = {
    x: dinoX,
    y: dinoY,
    width: dinoWidth,
    height: dinoHeight,
    direction: "right",
    isWalking: false,
    isDuck: false,
    runIndex: 0,
}

let dinoImg = new Image();
let dinoImgLeft = new Image();

let dinoRunImg1 = new Image();
let dinoRunImg2 = new Image();
let dinoRunImg3 = new Image();
let dinoRunImg4 = new Image();

let dinoDuckImg1 = new Image();
let dinoDuckImg2 = new Image();
let dinoDuckImg3 = new Image();
let dinoDuckImg4 = new Image();


dinoImg.src = "./src/dino.png";
dinoImgLeft.src = "./src/dino-left.png";

dinoRunImg1.src = "./src/dino-run1.png";
dinoRunImg2.src = "./src/dino-run2.png";
dinoRunImg3.src = "./src/dino-run1-left.png";
dinoRunImg4.src = "./src/dino-run2-left.png";

dinoDuckImg1.src = "./src/dino-duck1.png";
dinoDuckImg2.src = "./src/dino-duck2.png";
dinoDuckImg3.src = "./src/dino-duck1-left.png";
dinoDuckImg4.src = "./src/dino-duck2-left.png";

let dinoRunRight = [dinoRunImg1, dinoRunImg2];
let dinoRunLeft = [dinoRunImg3, dinoRunImg4];
let dinoDuckRight = [dinoDuckImg1, dinoDuckImg2];
let dinoDuckLeft = [dinoDuckImg3, dinoDuckImg4];


// Запуск гри

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");

    requestAnimationFrame(update);
    document.addEventListener("keydown", moveDino);
    document.addEventListener("keyup", stopDino);
}

// Оновлення дошки

function update () {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, boardHeight);
    
    // Відмальовка динозаврика

    if (dino.isDuck && dino.direction == "right") { // Ходьба пригнувшись і вправо
        context.drawImage(dinoDuckRight[dino.runIndex], dino.x, dino.y, dino.width, dino.height); // Функція яка малює динозавра
    }else if (dino.isDuck && dino.direction == "left") { // Ходьба пригнувшись і вліво
        context.drawImage(dinoDuckLeft[dino.runIndex], dino.x, dino.y, dino.width, dino.height);
    }else if (dino.isWalking && dino.direction == "right") { // Ходьба вправо
        context.drawImage(dinoRunRight[dino.runIndex], dino.x, dino.y, dino.width, dino.height);
    }else if (dino.isWalking && dino.direction == "left") { // Ходьба вліво
        context.drawImage(dinoRunLeft[dino.runIndex], dino.x, dino.y, dino.width, dino.height);
    }else  if (!dino.isWalking && dino.direction == "right") { // Стоїть вправо
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }else { // Стоїть вліво
        context.drawImage(dinoImgLeft, dino.x, dino.y, dino.width, dino.height);
    }
}

// Рухаємо динозаврика

function moveDino(e) {
    dino.runIndex = (dino.runIndex + 1) % 2;
    console.log(dino.height, dino.width)

    switch (e.code) {
        case "ArrowUp": // Рухаємо вверх
            dino.isWalking = true;
            dino.y -= 10;
            break;
        case "ArrowDown": // Рухаємо вниз
            dino.isWalking = true;
            dino.y += 10;
            break;
        case "ArrowLeft": // Рухаємо вліво
            dino.direction = "left";
            dino.isWalking = true;
            dino.x -= 10;
            break;
        case "ArrowRight": // Рухаємо вправо
            dino.direction = "right";
            dino.isWalking = true;
            dino.x += 10;
            break;
        case "ControlLeft": // Динозавр пригинається
            dino.isDuck = !dino.isDuck;
            if (dino.isDuck) {
                dino.width = 118;
                dino.height = 60;
                dino.y += 40;
            }else{
                dino.width = dinoWidth;
                dino.height = dinoHeight;
                dino.y -= 40;
            }
            break;
        default:
            dino.isWalking = false;
            break;
    }
}

function stopDino(e) {
    if(e.type=="keyup"){
        dino.isWalking = false;
    }
}
