"use strict";
let Game = (function () {
    // variable declarations
    let canvas = document.getElementsByTagName('canvas')[0];
    let stage;
    let assets;
    let backButton;
    let rollButton;
    let nextButton;
    let resetButton;
    let startButton;
    let startOverButton;
    let leftDiceLabel;
    let rightDiceLabel;
    let diceBackground;
    let leftDice;
    let rightDice;
    let dieOne = 0;
    let dieTwo = 0;
    let dieThree = 0;
    let dieFour = 0;
    let dieFive = 0;
    let dieSix = 0;
    let diceSound = createjs.Sound;
    let clickSound = createjs.Sound;
    let assetManifest = [
        { id: "1", src: "./Assets/images/1.png" },
        { id: "2", src: "./Assets/images/2.png" },
        { id: "3", src: "./Assets/images/3.png" },
        { id: "4", src: "./Assets/images/4.png" },
        { id: "5", src: "./Assets/images/5.png" },
        { id: "6", src: "./Assets/images/6.png" },
        { id: "backButton", src: "./Assets/images/backButton.png" },
        { id: "background", src: "./Assets/images/background.png" },
        { id: "blank", src: "./Assets/images/blank.png" },
        { id: "button", src: "./Assets/images/button.png" },
        { id: "nextButton", src: "./Assets/images/nextButton.png" },
        { id: "placeholder", src: "./Assets/images/placeholder.png" },
        { id: "resetButton", src: "./Assets/images/resetButton.png" },
        { id: "rollButton", src: "./Assets/images/rollButton.png" },
        { id: "startButton", src: "./Assets/images/startButton.png" },
        { id: "startOverButton", src: "./Assets/images/startOverButton.png" },
        { id: "diceSound", src: "./Assets/sounds/dice.wav" },
        { id: "clickSound", src: "./Assets/sound/click.wav" }
    ];
    function Preload() {
        console.log(`%c Preload Function`, "color: grey; font-size: 14px; font-weight: bold;");
        assets = new createjs.LoadQueue(); // asset container 
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }
    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start() {
        console.log(`%c Start Function`, "color: grey; font-size: 14px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = Config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        Config.Game.ASSETS = assets;
        Config.Globals.AssetManifest = assets; // make a reference to the assets in the global config
        Main();
    }
    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
    function Update() {
        stage.update();
    }
    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function rollDice() {
        var diceRoll = [" ", " "];
        var outCome = [0, 0];
        for (var roll = 0; roll < 2; roll++) {
            outCome[roll] = Math.floor((Math.random() * 6) + 1);
            switch (outCome[roll]) {
                case (outCome[roll], 1, 1):
                    diceRoll[roll] = "1",
                        dieOne++;
                    break;
                case (outCome[roll], 2, 2):
                    diceRoll[roll] = "2";
                    dieTwo++;
                    break;
                case (outCome[roll], 3, 3):
                    diceRoll[roll] = "3";
                    dieThree++;
                    break;
                case (outCome[roll], 4, 4):
                    diceRoll[roll] = "4";
                    dieFour++;
                    break;
                case (outCome[roll], 5, 5):
                    diceRoll[roll] = "5";
                    dieFive++;
                    break;
                case (outCome[roll], 6, 6):
                    diceRoll[roll] = "6";
                    dieSix++;
                    break;
            }
        }
        return diceRoll;
    }
    function buildInterface() {
        diceBackground = new Core.GameObject("background", Config.Game.CENTER_X, Config.Game.CENTER_Y, true);
        stage.addChild(diceBackground);
        //buttons
        backButton = new UIObjects.Button("backButton", Config.Game.CENTER_X, Config.Game.CENTER_Y + 200, true);
        stage.addChild(backButton);
        rollButton = new UIObjects.Button("rollButton", Config.Game.CENTER_X, Config.Game.CENTER_Y + 120, true);
        stage.addChild(rollButton);
        nextButton = new UIObjects.Button("nextButton", Config.Game.CENTER_X + 230, Config.Game.CENTER_Y + 200, true);
        stage.addChild(nextButton);
        resetButton = new UIObjects.Button("resetButton", Config.Game.CENTER_X - 230, Config.Game.CENTER_Y - 200, true);
        stage.addChild(resetButton);
        startButton = new UIObjects.Button("startButton", Config.Game.CENTER_X + 230, Config.Game.CENTER_Y - 200, true);
        stage.addChild(startButton);
        startOverButton = new UIObjects.Button("startOverButton", Config.Game.CENTER_X - 230, Config.Game.CENTER_Y + 200, true);
        stage.addChild(startOverButton);
        //labels
        leftDiceLabel = new UIObjects.Label("Left Die", "16px", "Tahoma", "#999999", Config.Game.CENTER_X - 150, Config.Game.CENTER_Y + 60, true);
        stage.addChild(leftDiceLabel);
        rightDiceLabel = new UIObjects.Label("Right Die", "16px", "Tahoma", "#999999", Config.Game.CENTER_X + 150, Config.Game.CENTER_Y + 60, true);
        stage.addChild(rightDiceLabel);
        //objects
        leftDice = new Core.GameObject("blank", Config.Game.CENTER_X - 150, Config.Game.CENTER_Y - 50, true);
        stage.addChild(leftDice);
        rightDice = new Core.GameObject("blank", Config.Game.CENTER_X + 150, Config.Game.CENTER_Y - 50, true);
        stage.addChild(rightDice);
    }
    function interfaceLogic() {
        rollButton.on("click", () => {
            let dice = rollDice();
            diceSound.play();
            leftDice.image = assets.getResult(dice[0]);
            leftDiceLabel.setText(dice[0]);
            rightDice.image = assets.getResult(dice[1]);
            rightDiceLabel.setText(dice[1]);
        });
        backButton.on("click", () => {
            clickSound.play();
            console.log("backButton Button Clicked");
        });
        nextButton.on("click", () => {
            clickSound.play();
            console.log("nextButton Button Clicked");
        });
        resetButton.on("reset", () => {
            clickSound.play();
            console.log("resetButton Button Clicked");
        });
        startButton.on("click", () => {
            clickSound.play();
            console.log("startButton Button Clicked");
        });
        startOverButton.on("click", () => {
            clickSound.play();
            console.log("startOverButton Button Clicked");
        });
    }
    function Main() {
        console.log(`%c Main Function`, "color: grey; font-size: 14px; font-weight: bold;");
        buildInterface();
        interfaceLogic();
    }
    window.addEventListener('load', Preload);
})();
//# sourceMappingURL=game.js.map