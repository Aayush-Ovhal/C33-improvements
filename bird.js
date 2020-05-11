class Bird extends BaseClass {
      constructor(x,y){
        super(x,y,50,50);
         
        // this.image = loadImage("sprites/bird0.png");
        this.smokeImage = loadImage("sprites/smoke.png");
        this.trajectory =[];
        this.visiblity = 255;
        this.images = [];

        for( let j = 0; j < 4; j++){
          this.images[j] = loadImage('sprites/bird' + j + '.png');
          
        }
        
        this.image = random(this.images);
      }
      ChangeImage(imgno)
      {
        //this.image = random(this.images);
        this.image = this.images[imgno];
      }
    
      display() {
          
        super.display();

        if(this.body.velocity.x > 10 && this.body.position.x > 200){
          var position = [this.body.position.x, this.body.position.y];
          this.trajectory.push(position);
        }
       
    
        for(var i=0; i<this.trajectory.length; i++){
          image(this.smokeImage, this.trajectory[i][0], this.trajectory[i][1]);
        }
      }
    }