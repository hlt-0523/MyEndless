/** 
    Name: Lingtian
    Title: Space Bastard
    Approximate Hours To Complete: 50+?(I forgot)
 */

let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    scene: [Menu, Play, aerolite_Fks_UFO, rock_Fks_UFO, spaceship_Fks_UFO]
}

let game = new Phaser.Game(config);

let cursor;