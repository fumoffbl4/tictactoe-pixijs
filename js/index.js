// ALIASES

let Application = PIXI.Application,
    Container = PIXI.Container,
    Graphics = PIXI.Graphics,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle,
    Texture = PIXI.Texture,
    TilingSprite = PIXI.TilingSprite;

// VARIABLES

let playerOne,
    turnX = true,
    moveCounter = 1,
    score = {
        player1: 0,
        player2: 0
    };

//APPLICATION

const app = new Application({
    backgroundColor: 0x2E2E2E,
});

document.body.appendChild(app.view);

//LOADING SCREEN 

let loadingScreen = new Container();
app.stage.addChild(loadingScreen);

let loadingBg = new PIXI.Sprite(Texture.WHITE);
loadingScreen.addChild(loadingBg);
loadingBg.width = 800;
loadingBg.height = 600;
loadingBg.tint = 0x2E2E2E;


setTimeout(() => {
    loadingScreen.visible = false;
    chooseScene.visible = true;
}, 2000);


// START SCENE

let chooseScene = new Container();
app.stage.addChild(chooseScene);

chooseScene.visible = false;

let style = new TextStyle({
    fontFamily: 'Kombat',
    fontSize: 52,
    fill: 'white',
    stroke: 'grey',
    strokeThickness: 4,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowDistance: 6,
});

let continueButtonStyle = new TextStyle({
    fontFamily: 'Kombat',
    fontSize: 32,
    fill: 'white',
    stroke: 'grey',
    strokeThickness: 4,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowDistance: 6,
});

let chooseText = new Text('Player One!', style);
chooseScene.addChild(chooseText);

chooseText.position.set(280, 170);


let chooseText2 = new Text('CHOOSE YOUR DESTINY!', style);
chooseScene.addChild(chooseText2);

chooseText2.position.set(180, 250);


let chooseX = new TilingSprite(Texture.from('img/x.png'), 100, 100);
chooseScene.addChild(chooseX);

chooseX.scale.set(0.7);
chooseX.position.set(250, 350);
chooseX.interactive = true;
chooseX.on('click', () => {
    playerOne = 'x';
    chooseScene.visible = false;
    gameWrapper.visible = true;
    addCells();
});


let chooseO = new TilingSprite(Texture.from('img/o.png'), 100, 100);
chooseScene.addChild(chooseO);

chooseO.scale.set(0.7);
chooseO.position.set(510, 350);
chooseO.interactive = true;
chooseO.on('click', () => {
    chooseScene.visible = false;
    gameWrapper.visible = true;
    addCells();
});


// MAIN GAME SCENE

let gameWrapper = new Container();
app.stage.addChild(gameWrapper);

gameWrapper.visible = false;


let moveCounterText = new Text('', style);
gameWrapper.addChild(moveCounterText);

moveCounterText.position.set(100, 170);
moveCounterText.text = 'Move:   ' + moveCounter;

let currentTurnText = new Text('Turn:', style);
gameWrapper.addChild(currentTurnText);

currentTurnText.position.set(100, 370);

let turnXImage = new TilingSprite(Texture.from('img/x.png'), 100, 100);
currentTurnText.addChild(turnXImage);

turnXImage.scale.set(.5);
turnXImage.position.set(150, 10);

let turnOImage = new TilingSprite(Texture.from('img/o.png'), 100, 100);
currentTurnText.addChild(turnOImage);

turnOImage.scale.set(.5);
turnOImage.position.set(150, 10);
turnOImage.visible = false;


// GAME FIELD

let gameField = new Container();
gameWrapper.addChild(gameField);

gameField.position.set(400, 150);


let addCells = () => {
    for (let i = 0; i < 9; i++) {
        let cell = new Container();
        gameField.addChild(cell);
        let bg = new TilingSprite(Texture.from('img/bg.png'), 100, 100);
        cell.addChild(bg);

        cell.x = (i % 3) * 100;
        cell.y = Math.floor(i / 3) * 100;

        cell.interactive = true;
        cell.on('click', () => {
            addValue(cell);
        });

    }
    let octothorpe = new Graphics();
    octothorpe.lineStyle(9, 0x000000, 1);
    octothorpe.moveTo(100, 0);
    octothorpe.lineTo(100, 300);
    octothorpe.moveTo(200, 0);
    octothorpe.lineTo(200, 300);
    octothorpe.moveTo(0, 100);
    octothorpe.lineTo(300, 100);
    octothorpe.moveTo(0, 200);
    octothorpe.lineTo(300, 200);

    gameField.addChild(octothorpe);
}


// GAME END SCENE

let gameEndScene = new Container();
app.stage.addChild(gameEndScene);

gameEndScene.visible = false;


let resultText = new Text('', style);
gameEndScene.addChild(resultText);

resultText.position.set(230, 100);


let totalScoreText = new Text('Total score:', style);
gameEndScene.addChild(totalScoreText);

totalScoreText.position.set(280, 200);


let playerOneText = new Text('Player One', style);
gameEndScene.addChild(playerOneText);

playerOneText.position.set(100, 300);


let playerTwoText = new Text('Player Two', style);
gameEndScene.addChild(playerTwoText);

playerTwoText.position.set(450, 300);


let playerOneScoreText = new Text(score.player1, style);
gameEndScene.addChild(playerOneScoreText);

playerOneScoreText.position.set(200, 400);


let playerTwoScoreText = new Text(score.player2, style);
gameEndScene.addChild(playerTwoScoreText);

playerTwoScoreText.position.set(570, 400);


let continueButton = new Text('CONTINUE', continueButtonStyle);
gameEndScene.addChild(continueButton);

continueButton.position.set(340, 520)
continueButton.interactive = true;
continueButton.on('click', () => {
    chooseScene.visible = true;
    gameEndScene.visible = false;
})


// FUNCTIONS

let addValue = (cell) => {
    if (turnX && !cell.isFilled) {
        let x = new TilingSprite(Texture.from('img/x.png'), 100, 100);
        x.position.x = 10;
        x.position.y = 10;
        cell.addChild(x);
        turnX = !turnX;
        cell.isFilled = true;
        cell.value = 'x';
    };

    if (!turnX && !cell.isFilled) {
        let o = new TilingSprite(Texture.from('img/o.png'), 100, 100);
        o.position.x = 10;
        o.position.y = 10;
        cell.addChild(o);
        turnX = !turnX;
        cell.isFilled = true;
        cell.value = 'o'
    };

    checkWin();
}


let checkWin = () => {
    let items = gameField.children;

    if (items[0].value == 'x' && items[1].value == 'x' && items[2].value == 'x' ||
        items[3].value == 'x' && items[4].value == 'x' && items[5].value == 'x' ||
        items[6].value == 'x' && items[7].value == 'x' && items[8].value == 'x' ||
        items[0].value == 'x' && items[3].value == 'x' && items[6].value == 'x' ||
        items[1].value == 'x' && items[4].value == 'x' && items[7].value == 'x' ||
        items[2].value == 'x' && items[5].value == 'x' && items[8].value == 'x' ||
        items[0].value == 'x' && items[4].value == 'x' && items[8].value == 'x' ||
        items[6].value == 'x' && items[4].value == 'x' && items[2].value == 'x') {
        items.forEach(item => {
            item.interactive = false;
        })
        setTimeout(() => {
            if (playerOne === 'x') {
                showPlayerOneWin();
            } else {
                showPlayerTwoWin();
            }

            clearGameField();
        }, 500);
        return
    }

    if (items[0].value == 'o' && items[1].value == 'o' && items[2].value == 'o' ||
        items[3].value == 'o' && items[4].value == 'o' && items[5].value == 'o' ||
        items[6].value == 'o' && items[7].value == 'o' && items[8].value == 'o' ||
        items[0].value == 'o' && items[3].value == 'o' && items[6].value == 'o' ||
        items[1].value == 'o' && items[4].value == 'o' && items[7].value == 'o' ||
        items[2].value == 'o' && items[5].value == 'o' && items[8].value == 'o' ||
        items[0].value == 'o' && items[4].value == 'o' && items[8].value == 'o' ||
        items[6].value == 'o' && items[4].value == 'o' && items[2].value == 'o') {
        items.forEach(item => {
            item.interactive = false;
        })
        setTimeout(() => {
            if (playerOne === 'x') {
                showPlayerTwoWin();
            } else {
                showPlayerOneWin();
            }

            clearGameField();
        }, 500);
        return;
    }

    changeTurnImage();
    incrementCounter();
    checkTie();
}

let changeTurnImage = () => {
    if (moveCounter < 9) {
        turnXImage.visible = !turnXImage.visible;
        turnOImage.visible = !turnOImage.visible;
    };
}

let incrementCounter = () => {
    if (moveCounter < 9) {
        ++moveCounter;
        moveCounterText.text = 'Move:   ' + moveCounter;
        return;
    };
    ++moveCounter;
}

let checkTie = () => {

    if (moveCounter > 9) {
        setTimeout(() => {
            resultText.text = 'It`s a tie';
            resultText.x = 310;

            clearGameField();
        }, 500);
    }
};

let clearGameField = () => {
    gameField.removeChildren();
    resetGame();
};

let resetGame = () => {
    playerOne = '';
    moveCounter = 1;
    moveCounterText.text = 'Move:   ' + moveCounter;
    turnX = true;
    gameWrapper.visible = false;
    gameEndScene.visible = true;
    turnXImage.visible = true;
    turnOImage.visible = false;

};

let showPlayerOneWin = () => {
    playerOneScoreText.text = ++score.player1;
    resultText.text = 'Player One win!'
    resultText.x = 230;
};

let showPlayerTwoWin = () => {
    playerTwoScoreText.text = ++score.player2;
    resultText.text = 'Player Two win!'
    resultText.x = 230;
};