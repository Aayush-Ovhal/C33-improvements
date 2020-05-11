const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot, Ybird;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;
let imgno = 0;
let px;
let py;

var cImg,Bimg,Rimg,BLimg;

function preload() {

    BLImg = loadImage("sprites/bird3.png");
    RImg = loadImage("sprites/bird0.png");
    BImg = loadImage("sprites/bird2.png");
    cImg = loadImage("sprites/bird1.png");

    getBackgroundImg();

}

function setup(){
    var canvas = createCanvas(1200,400);

    engine = Engine.create();
    world = engine.world;

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 350, 300, 140);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    bird2 = new YBird(200,50);
    slingshot = new SlingShot(bird.body,{x:200, y:120});
}

function draw(){
    if(backgroundImg){
        background(backgroundImg);
    };
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50);
    
    Engine.update(engine);
    
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
   
    platform.display();
   
    slingshot.display();
    
    image(cImg,20,300,50,50);
    image(BImg,90,300,50,50);
    image(RImg,160,300,50,50);
    image(BLImg,240,300,50,50);
}

function mouseDragged(){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }

    function mousePressed(){

       let d;
       d = dist(mouseX,mouseY,160,300);
       if(d < 50){
           imgno = 0;
       }

       d = dist(mouseX,mouseY,20,300);
       if(d < 50){
           imgno = 1;
       }

       d = dist(mouseX,mouseY,90,300);
       if(d < 50){
           imgno = 2;
       }

       d = dist(mouseX,mouseY,240,300);
       if(d < 50){
           imgno = 3;
       }

    }

    function keyPressed(){

        if(keyCode === 32){
            bird.trajectory = [];
            Matter.Body.setPosition(bird.body, {x: 200, y: 120});
       
            bird.ChangeImage(imgno);
            slingshot.attach(bird.body);
       }
    }

function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}