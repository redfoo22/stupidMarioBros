
import Compositor from './compositor.js';

import {loadLevel} from './loaders.js';
import {loadMarioSprite, loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer} from './layers.js';


const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function createSpriteLayer(sprite, pos) {
    return function drawSpriteLayer(context) {
        sprite.draw('idle', context, pos.x, pos.y);
    };
}

Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevel('1-1'), 
])
.then(([marioSprite, backgroundSprites, level]) => {

    const comp = new Compositor();

    const backgroundLayer = createBackgroundLayer(level.backgrounds,backgroundSprites);
    comp.layers.push(backgroundLayer);

    // backgrounds.forEach(background => {
    //     drawBackground(background, context, sprites);
        
    // });

    const pos = {
        x: 64,
        y: 64,
    };

const spriteLayer = createSpriteLayer(marioSprite, pos);
comp.layers.push(spriteLayer);

function update() {
    comp.draw(context)
    pos.x += 2;
    pos.y += 2;
    requestAnimationFrame(update)
    }       
    update();

});