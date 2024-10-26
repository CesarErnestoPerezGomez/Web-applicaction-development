var myGameArea = {
    canvas: document.getElementById("gameCanvas"),
    start: function() {
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

var character = {
    x: 50,
    y: 50,
    width: 30,
    height: 30,
    speedX: 2,
    speedY: 2,
    moveUp: function() { this.y -= this.speedY; },
    moveDown: function() { this.y += this.speedY; },
    moveLeft: function() { this.x -= this.speedX; },
    moveRight: function() { this.x += this.speedX; },
    bounce: function() {

        if (this.x <= 0 || this.x + this.width >= myGameArea.canvas.width) {
            this.speedX = -this.speedX;
        }

        if (this.y <= 0 || this.y + this.height >= myGameArea.canvas.height) {
            this.speedY = -this.speedY;
        }
    },
    update: function() {
        var ctx = myGameArea.context;
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};


myGameArea.start();


function updateGameArea() {
    myGameArea.clear();
    character.bounce(); 
    character.update(); 
}

function moveUp() {
    character.moveUp();
}

function moveDown() {
    character.moveDown();
}

function moveLeft() {
    character.moveLeft();
}

function moveRight() {
    character.moveRight();
}
