//Create variables here
var dog,dogIm,happyDogIm 
var database 
var foodS,foodStock
var fedTime, lastFed
var foodObj
var feed;
var food;
function preload()
{
  //load images here
  dogIm = loadImage("images/dogImg.png")
  happyDogIm = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500,500);
  dog = createSprite(500-100,500-100)
  dog.addImage(dogIm)
  dog.scale = 0.1
  database = firebase.database()
  foodObj = new Food()

  feed = createButton("feed the dog")
  feed.position(650,95)
  feed.mousePressed(feedDog)
  addFood = createButton("add Food")
  addFood.position(750,95)
  addFood.mousePressed(addFoods)
  
}


function draw() {  
  background(46,139,87)
  foodStock = database.ref('Food')
  foodStock.on("value",readStock);
  lastFed = database.ref('feedTime')
  lastFed.on("value",(data)=>{
    lastFed = data.val()

  })
  
  
  foodObj.display()
  fill(255,255,254)
  textSize(15)
  if(lastFed>=12){
    text("last Feed : "+ lastFed%12+" PM",350,30)
  }else if(lastFed===0){
    text("last Fed : 12 AM",350,30)
  }else{
    text("last Fed : "+ lastFed + "AM",350,30)
  }

  

  drawSprites();
  fill("black")
  textSize(20)
  //text("Note:Press Up arrow to feed your pet",100,100)
  text("food left "+foodS,190,50)
  text("last fed "+ lastFed,100,100)
}
  /*/if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogIm)
  }*/
  function readStock(data){
    foodS = data.val()
    foodObj.updateFoodStock(foodS);
  }
  function writeStock(x){

    if(x<=0){
      x=0;
    }else{
      x=x-1
    }
    database.ref('/').update({
      Food:x
    })
  }
  
  //add styles here


function feedDog(){
  dog.addImage(happyDogIm);
  //foodObj.foodStock--;
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    feedTime : hour() 
  })
  

}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}



