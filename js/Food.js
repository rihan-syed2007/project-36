class Food{
  constructor(){
    this.foodStock=0;
    this.image=loadImage("images/Milk.png");
    this.lastFed;
  }
updateFoodStock(foodStock){
  this.foodStock=foodStock;
}

getFedTime(lastFed){
  this.lastFed = lastFed;
}

getFoodStock(){
 return this.foodStock;
}

deductFood(){
  if(this.foodStock > 0){
    this.foodStock = this.foodStock - 1;
  }
 }
 
 display(){
 var x=80,y=100;
 
  imageMode(CENTER);
 
  if(this.foodStock!=0){
    for(var i=0;i<this.foodStock;i++){
      if(i%10==0){
        x=80;
        y=y+50;
      }
      image(this.image,x,y,60,60);
      x=x+30;
    }
  }
 }
}