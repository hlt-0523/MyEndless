class spaceship_Fks_UFO extends Phaser.Scene {
    constructor() {
        super("spaceship*UFOScene");
    }

    preload() {
        this.load.image('spaceship_end', './assets/spaceship_end.png');
    }

    create(data) {
        this.spaceship_end = this.add.tileSprite(0, 0, 960, 720, 'spaceship_end').setOrigin(0, 0);
        let end_config = {
            fontSize: 20,
            color: '#1c70c2',
            align: 'center'
        };

        this.add.text(game.config.width / 15, game.config.height / 8, `You died from the spaceship\nClick on the screen to restart, You survived for ${data.survivalTime} seconds`, end_config);
    }

    update() {
        this.input.on('pointerup', () => {this.scene.start('playScene')});
    }
}