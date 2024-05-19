import V2 from "./v2.js";
import Enemy from "./Enemy.js"
import Player from "./Player.js"

function Game() {
    this.player = new Player(500, 500);

    this.enemys = Array.from({ length: 10 }, () => new Enemy(100));
};

Game.prototype.render = function(context) {
    this.WHeight = context.canvas.height;
    this.WWeight = context.canvas.width;

    
    this.player.render(context)
    this.enemys.forEach(enemy => enemy.render(context));
};

Game.prototype.update = function(dt) {
    this.player.update(dt);
    this.enemys.forEach(enemy => enemy.update(dt, this.player.pos));

    this.enemys.forEach((enemy, enemy_index) => {
        this.player.bullets.forEach((bullet, bullet_index) => {
            if (this.chekCircleColision(enemy, bullet)){
                delete this.enemys[enemy_index];
                delete this.player.bullets[bullet_index];
            }
        })
        if (this.chekCircleColision(this.player, enemy)){
            this.player.getHit(10);
        }
    }) 
};

Game.prototype.chekCircleColision = function (first_sprite, second_sprite) { 
    return first_sprite.pos.sub(second_sprite.pos).size() <= first_sprite.radius + second_sprite.radius;
};

document.addEventListener("mousedown", (event) => {
    const mousePos = new V2(event.clientX, event.clientY);
    game.player.spawnNewBullet(mousePos);
});

const game = new Game();

(() => {
    const canvas = document.getElementById("game");
    const context = canvas.getContext("2d");

    var start;
    const step = (timeStamp) => {
        const dt = (timeStamp - (start || 0)) * 0.001; 
        start = timeStamp;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        game.update(dt);
        game.render(context);
        
        window.requestAnimationFrame(step);
    };
    
    window.requestAnimationFrame(step);
})();