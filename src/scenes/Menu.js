class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        let title_config = {
            fontSize: 40,
            align: 'center',
        }

        let menu_config = {
            fontSize: 20,
            align: 'center',
        }

        // title
        this.add.text(game.config.width / 2, game.config.height / 4, "Escape from the Supernova Explosion", title_config).setOrigin(0.5, 0.5)

        // game description and controls
        this.add.text(game.config.width / 2, game.config.height / 2, "You've done evil and created a supernova explosion in a galaxy.", menu_config).setOrigin(0.5, 0.5);
        
        // Add a 'pointerup' event listener to start the game when the canvas is clicked
        this.input.once('pointerup', () => {
            this.scene.start('playScene');
        });
    }
}
