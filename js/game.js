import V2 from "./v2.js";
import Enemy from "./Enemy.js"
import Player from "./Player.js"

var mouse_pos;

function Game() {
    this.player = new Player(500, 500);
    this.mousePos = new V2(0, 0);

    this.enemy_delay = 1;
    this.last_enemy_delta = 0;

    this.enemys = Array.from({ length: 10 }, () => new Enemy(100, 1000, 1000));
};

Game.prototype.render = function(context) {
    this.WHeight = context.canvas.height;
    this.WWeight = context.canvas.width;

    
    this.player.render(context)
    this.enemys.forEach(enemy => enemy.render(context));
};

Game.prototype.update = function(dt) {
    this.player.update(dt);
    this.player.spawnNewBullet(this.mousePos);
    this.createNewEneemy();
    this.last_enemy_delta += dt;
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

Game.prototype.createNewEneemy = function(){
    if (this.last_enemy_delta > this.enemy_delay){
        console.log(this.WHeight);
        this.enemys = this.enemys.concat(new Enemy(Math.random() * 300, this.WHeight, this.WWeightw));
        this.last_enemy_delta = 0;
    }
}

Game.prototype.updateMousePos = function(mouse_pos) {
    this.mousePos = mouse_pos || new V2(0, 0);
}

Game.prototype.chekCircleColision = function (first_sprite, second_sprite) { 
    return first_sprite.pos.sub(second_sprite.pos).size() <= first_sprite.radius + second_sprite.radius;
};

document.addEventListener("mousemove", event => mouse_pos = new V2(event.clientX, event.clientY));

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
        game.updateMousePos(mouse_pos);
        game.render(context);
        
        window.requestAnimationFrame(step);
    };
    
    window.requestAnimationFrame(step);
})();