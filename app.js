const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext("2d");
// getContext method 會回傳一個canvas的drawing context
//  drawing canvas可以用來在canvas內畫圈
const unit = 20;
const row = canvas.height / unit // 320/20 = 16
const column = canvas.width / unit // 320/20 = 16

const snake = [] // array 中的每個元素，都是一個物件
// 物件的工作是，儲存每一個蛇的身體的 X, Y座標
snake[0] = {
  x: 80,
  y: 0,
}; 

snake[1] = {
  x: 60,
  y: 0,
};

snake[2] = {
  x: 40,
  y: 0,
};

snake[3] = {
  x: 20,
  y: 0,
};


window.addEventListener("keydown", changeDirection);
let d = "Right";
function changeDirection(e) {
  // console.log(e);
  if (e.key == "ArrowRight" && d != "Left") {
    // console.log("你正在按向右鍵");
    d = "Right";
  } else if (e.key == "ArrowDown" && d != "Up") {
    // console.log("你正在按向下鍵");
    d = "Down";
  } else if (e.key == "ArrowLeft" && d != "Right") {
    // console.log("你正在按向左鍵");
    d = "Left";
  } else if (e.key == "ArrowUp" && d != "Down") {
    console.log(e);
    d = "Up";
  }
  
  
}

function draw () {
  // console.log('正在執行draw...');  

  // 背景全設定為黑色
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 劃出蛇
  for (let i = 0; i < snake.length; i++) {
    if (i == 0){
      ctx.fillStyle = "lightgreen";
    } else {
      ctx.fillStyle = "lightblue";
    } 
    // 外框樣式
    ctx.strokestyle = "white";

    if (snake[i].x >= canvas.width) {
      snake[i].x = 0;
    }
    if (snake[i].y >= canvas.height) {
      snake[i].y = 0;
    }
    if (snake[i].x < 0) {
      snake[i].x = canvas.width - unit;
    }
    if (snake[i].y < 0 ) {
      snake[i].y = canvas.height - unit;
    }

    // 畫長方形 : x, y, width, height 
    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    // 畫外框 : x, y, width, height 
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit); 
  }

  // 以目前 d 變數方向，來決定蛇的下一楨數要放在哪個座標
  let snakeX = snake[0].x; //snake[0]是一個物件，但snake[0].x是個number
  let snakeY = snake[0].y;
  if (d == "Left") {
    snakeX -= unit; 
  } else if (d == "Up") {
    snakeY -= unit;
  } else if (d == "Right") {
    snakeX += unit;
  } else if (d == "Down") {
    snakeY += unit;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  // 確認蛇是否有吃到果實
  snake.pop();
  snake.unshift(newHead);
}

let myGame = setInterval(draw, 100)