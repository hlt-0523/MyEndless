class UFO extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {

        super(scene, x, y, texture, frame);
  
        scene.add.existing(this);
        
        this.velocity = 200;
        this.moveSpeed = 4;
    }

    update() {
        console.log('update difsh');
        this.direction = new Phaser.Math.Vector2(0);

        if (cursor.left.isDown) {
            //this.direction.x -= this.moveSpeed;
            this.direction.x = -1;//-this.moveSpeed;
        } else if (cursor.right.isDown) {
            //this.direction.x += this.moveSpeed;
            this.direction.x = 1;//this.moveSpeed;
        } else if (cursor.up.isDown) {
            //this.direction.y -= this.moveSpeed;
            this.direction.y = -1;//-this.moveSpeed;
        } else if (cursor.down.isDown) {
            //this.direction.y += this.moveSpeed;
            this.direction.y = 1;// this.moveSpeed;
        }
        this.direction.normalize();
        this.setVelocityX(this.direction.x * this.velocity);
        this.setVelocityY(this.direction.y * this.velocity);

    }

}