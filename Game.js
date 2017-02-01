(function() {
    "use strict";

    window.addEventListener("load", onInit);

    // game variables
    var stage = null;
    var canvas = null;

    // frame rate of game
    var frameRate = 24;
    // game objects
    var assetManager = null;
    var polarBear = null;
    var platform = null;
    var platformDead = null;
    var platform2 = null;
    var polarDead = null;
    
    // key booleans
    var downKey = false;
    var upKey = false;
    var leftKey = false;
    var rightKey = false;
    
    // ------------------------------------------------------------- private methods
    
    function monitorKeys(){
        
        // console.log("key was pressed " + e.keyCode);
        if (leftKey) {
            polarBear.mover.setDirection(MoverDirection.LEFT);
            polarBear.mover.startMe();
        } else if (rightKey) {
            polarBear.mover.setDirection(MoverDirection.RIGHT);
            polarBear.mover.startMe();
        } else if (upKey) {
            polarBear.mover.setDirection(MoverDirection.UP);
            polarBear.mover.startMe();
        } else if (downKey) {
            polarBear.mover.setDirection(MoverDirection.DOWN);
            polarBear.mover.startMe();
        } else {
            polarBear.mover.stopMe();
        }
    }

    // ------------------------------------------------------------ event handlers
    function onInit() {
        console.log(">> initializing");

        // get reference to canvas
        canvas = document.getElementById("stage");
        // set canvas to as wide/high as the browser window
        canvas.width = 600;
        canvas.height = 600;
        // create stage object
        stage = new createjs.Stage(canvas);

        // construct preloader object to load spritesheet and sound assets
        assetManager = new AssetManager(stage);
        stage.addEventListener("onAllAssetsLoaded", onSetup);
        // load the assets
        assetManager.loadAssets(manifest);
    }

    function onSetup(e) {
        console.log(">> adding sprites to game");
        stage.removeEventListener("onAllAssetsLoaded", onSetup);
        
        downKey = false;
        upKey = false;
        leftKey = false;
        rightKey = false;


        
        
        // construct game object sprites
        platformDead = assetManager.getSprite("polarSprites");
        platformDead.x = 275;
        platformDead.y = 175;
        platformDead.gotoAndPlay("platformDead");
        platformDead.regX = platformDead.getBounds().width/2;
        platformDead.regY = platformDead.getBounds().height/2;
        platformDead.mover = new Mover(platformDead, stage);
        platformDead.mover.setSpeed(2);
        platformDead.mover.startMe();
        stage.addChild(platformDead);
        
        // construct game object sprites
        platform = assetManager.getSprite("polarSprites");
        platform.x = 275;
        platform.y = 275;
        platform.gotoAndPlay("platformAlive");
        platform.regX = platform.getBounds().width/2;
        platform.regY = platform.getBounds().height/2;
        platform.mover = new Mover(platform, stage);
        platform.mover.setSpeed(3);
        platform.mover.startMe();
        stage.addChild(platform);
        
        // construct game object sprites
        platform2 = assetManager.getSprite("polarSprites");
        platform2.x = 275;
        platform2.y = 75;
        platform2.gotoAndPlay("platformAlive");
        platform2.regX = platform2.getBounds().width/2;
        platform2.regY = platform2.getBounds().height/2;
        platform2.mover = new Mover(platform2, stage);
        platform2.mover.setSpeed(4);
        platform2.mover.startMe();
        stage.addChild(platform2);
        
        // construct game object sprites
        polarBear = assetManager.getSprite("polarSprites");
        polarBear.x = 275;
        polarBear.y = 275;
        polarBear.gotoAndStop("polarAlive");
        polarBear.regX = polarBear.getBounds().width/2;
        polarBear.regY = polarBear.getBounds().height/2;
        polarBear.mover = new Mover(polarBear, stage);
        polarBear.mover.setSpeed(4);
        stage.addChild(polarBear);
        
        // construct game object sprites
        polarDead = assetManager.getSprite("polarSprites");
        polarDead.x = 275;
        polarDead.y = 0;
        polarDead.gotoAndPlay("polarDead");
        polarDead.regX = polarDead.getBounds().width/2;
        polarDead.regY = polarDead.getBounds().height/2;
        polarDead.mover = new Mover(polarDead, stage);
        polarDead.mover.setSpeed(1);
        polarDead.mover.startMe();
        stage.addChild(polarDead);

        
        // setup event listeners for keyboard
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);

        // startup the ticker
        createjs.Ticker.setFPS(frameRate);
        createjs.Ticker.addEventListener("tick", onTick);

        console.log(">> game ready");
    }
    
    function onKeyDown(e){
        // console.log("key was pressed " + e.keyCode);
        if (e.keyCode == 37) leftKey = true;
        else if (e.keyCode == 39) rightKey = true;
        else if (e.keyCode == 38) upKey = true;
        else if (e.keyCode == 40) downKey = true;
        

    }
    
    function onKeyUp(e){
        // console.log("key was pressed " + e.keyCode);
        if (e.keyCode == 37) leftKey = false;
        else if (e.keyCode == 39) rightKey = false;
        else if (e.keyCode == 38) upKey = false;
        else if (e.keyCode == 40) downKey = false;

    }

    function onTick(e) {
        // TESTING FPS
        document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();
        
        monitorKeys();

        // game loop code here
        polarBear.mover.update();
        platform.mover.update();
        platformDead.mover.update();
        platform2.mover.update();
        polarDead.mover.update();

        // update the stage!
        stage.update();
    }

})();