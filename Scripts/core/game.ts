let Game = (function(){

    // variable declarations
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;

    let assets: createjs.LoadQueue;

    let exampleLabel: UIObjects.Label;
    let exampleButton: UIObjects.Button;    

    let backButton: UIObjects.Button;
    let rollButton: UIObjects.Button;
    let nextButton: UIObjects.Button;
    let resetButton: UIObjects.Button;
    let startButton : UIObjects.Button;
    let startOverButton : UIObjects.Button;
    
    //symbol tallies

    let 1 = 1;
    let 2 = 2;
    let 3 = 3;
    let 4 = 4;
    let 5 = 5;
    let 6 = 6;

    let assetManifest = 
    [
        {id:"1", src:"./Assets/images/1.png"},
        {id:"2", src:"./Assets/images/2.png"},
        {id:"3", src:"./Assets/images/3.png"},
        {id:"4", src:"./Assets/images/4.png"},
        {id:"5", src:"./Assets/images/5.png"},
        {id:"6", src:"./Assets/images/6.png"},
        {id:"backButton", src:"./Assets/images/startButton.png"},
        {id:"background", src:"./Assets/images/background.png"},
        {id:"blank", src:"./Assets/images/blank.png"},
        {id:"button", src:"./Assets/images/button.png"},
        {id:"nextButton", src:"./Assets/images/nextButton.png"},
        {id:"placeholder", src:"./Assets/images/placeholder.png"},
        {id:"resetButton", src:"./Assets/images/resetButton.png"},
        {id:"rollButton", src:"./Assets/images/rollButton.png"},
        {id:"startButton", src:"./Assets/images/startButton.png"},
        {id:"startOverButton", src:"./Assets/images/startOverButton.png"}
    ];

    function Preload():void
    {
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
    function Start():void
    {
        console.log(`%c Start Function`, "color: grey; font-size: 14px; font-weight: bold;");
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
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
    function Update():void
    {
        stage.update();
    }

    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */

    function buildInterface():void
    {
      
        /*
        exampleLabel = new UIObjects.Label("An Example Label", "40px", "Consolas", "#000000", Config.Game.CENTER_X, Config.Game.CENTER_Y, true);
        stage.addChild(exampleLabel);

        exampleButton = new UIObjects.Button("button", Config.Game.CENTER_X, Config.Game.CENTER_Y + 100, true);
        stage.addChild(exampleButton);
        */

        //buttons

        backButton = new UIObjects.Button("Back Button", Config.Game.CENTER_X, Config.Game.CENTER_Y + 100, true);
        stage.addChild(backButton);
        rollButton = new UIObjects.Button("Roll Button", Config.Game.CENTER_X, Config.Game.CENTER_Y + 100, true);
        stage.addChild(rollButton);
        nextButton = new UIObjects.Button("Next Button", Config.Game.CENTER_X, Config.Game.CENTER_Y + 100, true);
        stage.addChild(nextButton);
        resetButton = new UIObjects.Button("Reset Button", Config.Game.CENTER_X, Config.Game.CENTER_Y + 100, true);
        stage.addChild(resetButton);
        startButton = new UIObjects.Button("Start Button", Config.Game.CENTER_X, Config.Game.CENTER_Y + 100, true);
        stage.addChild(startButton);
        startOverButton = new UIObjects.Button("Start Over Button", Config.Game.CENTER_X, Config.Game.CENTER_Y + 100, true);
        stage.addChild(startOverButton);

        //labels






    }

    function interfaceLogic():void
    {
        rollButton.on("click", ()=>{
            console.log("roll button clicked");
        });
    }

    function Main():void
    {
        console.log(`%c Main Function`, "color: grey; font-size: 14px; font-weight: bold;");

        buildInterface();
        interfaceLogic();
    }

    window.addEventListener('load', Preload);


})();