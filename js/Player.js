import V2 from "./v2.js";
import Bullet from "./Bullet.js"
import { drawCircle, drawProgressBar } from "./Graphics.js"

const pressedKeys = new Set();

const controlTable = {
    "w": new V2(0,-1),
    "s": new V2(0,1),
    "a": new V2(-1,0),
    "d": new V2(1,0),
};


export default function Player(x, y){
    this.radius = 30
    this.pos = new V2(x, y);
    this.bullet_delay = 1;
    this.last_bullet_delta = 0;

    this.dmg_get_delay = 0.1;
    this.last_dmg_delta = 0;

    this.max_hp = 100;
    this.hp = 100;
    this.speed = 300;

    this.bullets = Array(0);
}

Player.prototype.render = function(context) {
    drawCircle(context, this.pos, this.radius);
    drawProgressBar(context, this.pos.subXY(this.radius, -this.radius-10), 2 * this.radius, 20, Math.max(this.hp, 0), this.max_hp)

    this.bullets.forEach(bullet => bullet.render(context));
}

Player.prototype.update = function(dt) {
    let vel = new V2(0,0);
    pressedKeys.forEach(element => {
        if(element in controlTable) vel = vel.add(controlTable[element]);
    });
    
    this.last_bullet_delta += dt;
    this.last_dmg_delta += dt;
    this.pos = this.pos.add(vel.scale(dt, this.speed));
    this.bullets.forEach(bullet => bullet.update(dt));
};

Player.prototype.spawnNewBullet = function(mousepos) {
    if (this.last_bullet_delta > this.bullet_delay){
        this.bullets = this.bullets.concat(new Bullet(25, 500, this.pos, mousepos));
        this.last_bullet_delta = 0;
    }
};

Player.prototype.getHit = function (damage) { 
    if (this.last_dmg_delta > this.dmg_get_delay){
        this.hp -= damage;
        this.last_dmg_delta = 0;
    }
}


document.addEventListener("keydown", (event) => {
    pressedKeys.add(event.key);
});

document.addEventListener("keyup", (event) => {
    pressedKeys.delete(event.key);
});