class aerolite_Fks_UFO extends Phaser.Scene {
    constructor() {
        super("aerolite*UFOScene");
    }

    preload() {
        this.load.image('aerolite_end', './assets/aerolite_end.png');
    }


    create(data) {
        this.aerolite_end = this.add.tileSprite(0, 0, 960, 720, 'aerolite_end').setOrigin(0, 0);
        let end_config = {
            fontSize: 20,
            color: '#1c70c2',
            align: 'center'
        };
        this.add.text(game.config.width / 15, game.config.height / 8, `You died from the aerolite\nClick on the screen to restart, You survived for ${data.survivalTime} seconds`, end_config);
    }
    
        
    update() {
        this.input.on('pointerup', () => {this.scene.start('playScene')});
    }
}