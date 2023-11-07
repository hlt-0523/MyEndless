class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {

        // load background image
        this.load.image('space_background', './assets/space_background.png');

        // load music
        this.load.audio('background_music', './assets/piano-loop.wav');

        // load animals
        this.load.atlas('UFO_anim', './assets/UFO_anim.png', './assets/UFO_anim.json');
        this.load.atlas('aerolite_anim', './assets/aerolite_anim.png', './assets/aerolite_anim.json');
        this.load.atlas('rock_anim', './assets/rock_anim.png', './assets/rock_anim.json');
        this.load.atlas('spaceship_anim', './assets/spaceship_anim.png', './assets/spaceship_anim.json');
    }

    create() {
        // load background image
        this.space_background = this.add.tileSprite(0, 0, 960, 720, 'space_background').setOrigin(0, 0);

        // create rock animation
        this.anims.create({
            key: 'rock',
            frames: this.anims.generateFrameNames('rock_anim', {prefix: 'rock ', end: 2, suffix: '.'}),
            frameRate: 5,
            repeat: -1
        });
        

        // create aerolite animation
        this.anims.create({
            key: 'aerolite',
            frames: this.anims.generateFrameNames('aerolite_anim', {prefix: 'aerolite ', end: 3, suffix: '.png'}),
            frameRate: 5,
            repeat: -1
        });

        // create spaceship animation
        this.anims.create({
            key: 'spaceship',
            frames: this.anims.generateFrameNames('spaceship_anim', {prefix: 'spaceship ', end: 3, suffix: ''}),
            frameRate: 5,
            repeat: -1
        });

        // create UFO animation
        this.anims.create({
            key: 'UFO',
            frames: this.anims.generateFrameNames('UFO_anim', {prefix: 'UFO', end: 2, suffix: ''}),
            frameRate: 4,
            repeat: -1
        });

        // create UFO sprite
        this.UFO = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'UFO_anim');
        this.UFO.body.onOverlap = true;
        this.UFO.setCollideWorldBounds(true);

        // create rock sprite
        this.rock = this.physics.add.sprite(Phaser.Math.Between(0, 1)? 0 - 42 : game.config.width + 42, Phaser.Math.Between(0 + 64, game.config.height - 64), 'rock_anim');
        this.rock.body.onOverlap = true;
        this.rock.setScale(4);
        this.rock_start_pos = this.rock.x;

        // create aerolite sprite
        this.aerolite = this.physics.add.sprite(Phaser.Math.Between(0, 1)? 0 - 42 : game.config.width + 42, Phaser.Math.Between(0 + 64, game.config.height - 64), 'aerolite_anim');
        this.aerolite.body.onOverlap = true;
        this.aerolite.setScale(3);
        this.aerolite_start_pos = this.aerolite.x;

        // create timer
        this.startTime = this.time.now;
        this.survivalTimeText = this.add.text(16, 16, 'Survival Time: 0', {
            fontSize: '32px',
            fill: '#FFF'
        });

        // indicate once spaceship has spawned 
        this.spaceship_active = false;

        this.UFO.play('UFO');
        this.rock.play('rock');
        this.aerolite.play('aerolite');

        cursor = this.input.keyboard.createCursorKeys();

        this.song = this.sound.add('background_music', {loop: true, volume: 0.3});
        this.song.play();

        // spawn spaceship after 15 seconds
        this.clock = this.time.delayedCall(15000, () => {
            this.spaceship = this.physics.add.sprite(Phaser.Math.Between(0, game.config.width), 0, 'spaceship_anim');
            this.spaceship.body.onOverlap = true;
            this.spaceship.setScale(2);
            this.spaceship_start_pos = this.spaceship.x;
            this.spaceship.play('spaceship');
            this.spaceship_active = true;
        }, null, this);
    }

    update() {
        this.space_background.tilePositionX += 3;

        this.physics.add.overlap(this.UFO, this.aerolite, null, this.aeroliteEnd(this.UFO, this.aerolite), this);
        this.physics.add.overlap(this.UFO, this.rock, null, this.rockEnd(this.UFO, this.rock), this);
        this.physics.overlap(this.UFO, this.aerolite);
        this.physics.overlap(this.UFO, this.rock);

        if (this.spaceship_active) {
          this.physics.add.overlap(this.UFO, this.spaceship, null, this.spaceshipEnd(this.UFO, this.spaceship), this);
          this.physics.overlap(this.UFO, this.spaceship);
          this.spaceship_move_down(this.spaceship, 10);
        }
        this.move_UFO(this.UFO);
        this.aerolite_move(this.aerolite, 8);
        this.rock_move(this.rock, 6);
        
        let survivalTime = Math.floor((this.time.now - this.startTime) / 1000);
        this.survivalTimeText.setText('Survival Time: ' + survivalTime);


    }

    move_UFO(UFO) {
        this.direction = new Phaser.Math.Vector2(0);
        this.velocity = 200;

        if (cursor.left.isDown) {
            this.direction.x = -1;
        }
        if (cursor.right.isDown) {
            this.direction.x = 1;
        }
        if (cursor.up.isDown) {
            this.direction.y = -1;
        }
        if (cursor.down.isDown) {
            this.direction.y = 1;
        }

        this.direction.normalize();
        UFO.setVelocityX(this.direction.x * this.velocity);
        UFO.setVelocityY(this.direction.y * this.velocity);
 
    }

    aerolite_move(predator, speed) {
        if (this.aerolite_start_pos < 0) {
            predator.setFlip(true, false);
            predator.x += speed;
        } else {
            predator.resetFlip()
            predator.x -= speed;
        }

            // reset the position when reached left end of screen
        if (predator.x + predator.width <= 0 || predator.x > game.config.width + predator.width) {
            //predator.x = game.config.width + predator.width * 2;
            predator.x = Phaser.Math.Between(0, 1)? 0 - predator.width : game.config.width + 42;
            predator.y = Phaser.Math.Between(0 + 64, game.config.height - 64);
            this.aerolite_start_pos = predator.x;
        }
     }

    rock_move(predator, speed) {
        if (this.rock_start_pos < 0) {
            predator.setFlip(true, false);
            predator.x += speed;
        } else {
            predator.resetFlip()
            predator.x -= speed;
        }

        // reset the position when reached left end of screen
        if (predator.x + predator.width <= 0 || predator.x > game.config.width + predator.width) {
            predator.x = Phaser.Math.Between(0, 1)? 0 - predator.width : game.config.width + 42;
            predator.y = Phaser.Math.Between(0 + 64, game.config.height - 64);
            this.rock_start_pos = predator.x;
        }
    }

    spaceship_move_down(predator, speed) {
        if (this.spaceship_start_pos < game.config.width / 2) {
            predator.setFlip(true, false);
            predator.x += speed;
            predator.y += speed;
        } else {
            predator.resetFlip()
            predator.x -= speed;
            predator.y += speed;
        }

        // reset the position when reached either ends on the x axis or bottom of screen
        if (predator.x > game.config.width || predator.x + predator.width <= 0 || predator.y >= game.config.height + predator.width) {
            predator.x = Phaser.Math.Between(0, game.config.width);
            predator.y = 0;
            this.spaceship_start_pos = predator.x;
        }
 
    }

    spaceshipEnd(UFO, spaceship) {
        if (UFO.x > spaceship.x - (spaceship.width / 2) - UFO.width &&
        UFO.x < spaceship.x &&
        UFO.y > spaceship.y - UFO.width && 
        UFO.y < spaceship.y + UFO.width) {
                this.song.stop();
                
        }
        let survivalTime = Math.floor((this.time.now - this.startTime) / 1000);
        this.scene.start('spaceship*UFOScene', { survivalTime: survivalTime });
    }

    rockEnd(UFO, rock) {
        if (UFO.x > rock.x - (2 * rock.width) &&
            UFO.x < rock.x - rock.width &&
            UFO.y > rock.y - rock.height && 
            UFO.y < rock.y + (1.5 * rock.height)) {
                this.song.stop();
        }
        let survivalTime = Math.floor((this.time.now - this.startTime) / 1000);
        this.scene.start('Rock*UFOScene', { survivalTime: survivalTime });
    }

    aeroliteEnd(UFO, aerolite) {
        if (UFO.x > aerolite.x - aerolite.width - UFO.width &&
            UFO.x < aerolite.x - aerolite.width &&
            UFO.y > aerolite.y - aerolite.height && 
            UFO.y < aerolite.y + aerolite.height) {
                this.song.stop();
        }
        let survivalTime = Math.floor((this.time.now - this.startTime) / 1000);
        this.scene.start('aerolite*UFOScene', { survivalTime: survivalTime });
    }
}