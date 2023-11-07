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
            this.direction.x = -1;
        } else if (cursor.right.isDown) {
            this.direction.x = 1;
        } else if (cursor.up.isDown) {
            this.direction.y = -1;
        } else if (cursor.down.isDown) {
            this.direction.y = 1;
        }
        this.direction.normalize();
        this.setVelocityX(this.direction.x * this.velocity);
        this.setVelocityY(this.direction.y * this.velocity);

    }

}