//Create variables here
var dog,dogImg;
var happyDog,happyDogImg;
var database;
var foodS,foodStock;
var feed,addfood;
var lastFed,fedTime;
var MilkImg;

function preload()
{
	//load images here
  dogImg=loadImage("images/dogImg.png");
  happyDogImg=loadImage("images/dogImg1.png");

}

function setup() {
  database = firebase.database();

	createCanvas(1000,500);
  
  foodObj=new Food();
  
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(850,250,50,50);
  dog.addImage(dogImg);
  dog.scale=0.3;

  feed = createButton("Feed The Dog");
  feed.position(950,65);
  feed.mousePressed(feedDog);
  
  addfood = createButton("Add Food");
  addfood.position(850,65);
  addfood.mousePressed(addFoods);

}


function draw() {  
 background(46,139,87);

  foodObj.display();

fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
 lastFed=data.val();
})

textSize(15);

 fill("white");

 if(lastFed>=12){
 text("Last Feed: "+ lastFed%12 + "PM", 150,30);
 }
 else if(lastFed==0){
   text("Last Feed: 12 AM",150,30);
 }
 else{
  text("Last Feed: "+ lastFed + "AM", 150,30);
 }


 drawSprites();

}

function readStock(data){
 foodS=data.val();
 foodObj.updateFoodStock(foodS);
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
 else {
  x=x-1;
  }
 database.ref('/').update({
    food:x
  })
}

function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
  
}