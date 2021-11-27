var spaceship, spaceshipImg;
var alien, alienImg, aliensGroup;
var artifacts, artifactsImg, artifactsGroup;
var space, spaceImg;
var gameState = "play";
var score = 0;
var gameOver, gameOverImg;


function preload(){
    spaceshipImg = loadImage("spaceship.png");
    spaceImg = loadImage("space.png");
    artifactsImg = loadImage("spaceartifact.png");
    alienImg = loadImage("alien.png");
    gameOverImg = loadImage("gameover.png");

}

function setup() {
    createCanvas(600, 600);
    space=createSprite(300,300);
    space.addImage(spaceImg);
    space.velocityY = 4;
    space.scale = 5.5;

    spaceship = createSprite(300, 500);
    spaceship.addImage(spaceshipImg);
    spaceship.scale = 0.2;

    aliensGroup = new Group();
    artifactsGroup = new Group();
 
}

function draw() {
    if(gameState == "play"){
        if(space.y > height){
            space.y = height/2;
        }
        
        spaceship.x = World.mouseX;

        if(artifactsGroup.isTouching(spaceship)){
            artifactsGroup.destroyEach();
            score += 1;
        }
        else{
            if(aliensGroup.isTouching(spaceship)){
                gameState = "end";
            }
        }
    }

    if(gameState == "end"){
        spaceship.destroy();
        artifactsGroup.destroyEach();
        aliensGroup.destroyEach();
        space.destroy();
        gameOver = createSprite(300,300);
        gameOver.addImage(gameOverImg);
        gameOver.scale = 0.5;
    }
    spawnAliens();
    spawnArtifacts()
 
    drawSprites();
 
    textSize(20);
    fill("yellow");
    text("Artifacts collected: "+ score,50,30);
}

function spawnAliens(){
    if(frameCount%200 == 0){
        alien = createSprite(Math.round(random(100,559)), -50);
        alien.addImage(alienImg);
        alien.velocityY = 4;
        alien.scale = 0.2;
        alien.lifetime = 600;
        aliensGroup.add(alien);
    }
}

function spawnArtifacts(){
    if(frameCount%300 == 0){
        artifacts = createSprite(Math.round(random(100,559)), -50);
        artifacts.addImage(artifactsImg);
        artifacts.velocityY = 4;
        artifacts.scale = 0.2;
        artifacts.lifetime = 600;
        artifactsGroup.add(artifacts);
    }
}