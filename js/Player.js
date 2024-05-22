import V2 from "./v2.js";
import Bullet from "./Bullet.js"
import { drawStrokeCircle, drawProgressBar, drawRect, drawfillRect, drawCircle } from "./Graphics.js"

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
    this.is_face_right = true;
    this.mousepos = new V2(0,0)

    this.dmg_get_delay = 0.1;
    this.last_dmg_delta = 0;

    this.max_hp = 100;
    this.hp = 100;
    this.speed = 300;

    this.bullets = Array(0);
}

Player.prototype.render = function(context) {
    this.drawBody(context);
    
    if (this.hp < 100) drawProgressBar(context, this.pos.subXY(this.radius, -this.radius-10), 2 * this.radius, 20, Math.max(this.hp, 0), this.max_hp)

    this.bullets.forEach(bullet => bullet.render(context));
}

Player.prototype.drawBody = function(context){
    const border = 2 * this.radius;
    const eyeBorder = this.radius / 2;

    drawfillRect(context, this.pos.subXY(this.radius, this.radius), border, border, "#a28f7e");

    var rEyePos, lEyePos;

   
    rEyePos = this.pos.subXY(-border/5, border/5);
    lEyePos = this.pos.subXY(border/5, border/5);

    var dx = rEyePos.sub(this.mousepos).scale(-0.002);
    var dx2 = rEyePos.sub(this.mousepos).scale(-0.005);

    

    // face + eyes
    if (this.hp > 0){
        
            drawCircle(context, rEyePos.add(dx), this.radius/4, "white");
            drawStrokeCircle(context, rEyePos.add(dx), this.radius/4, "black", 1);
            drawCircle(context, lEyePos.add(dx), this.radius/4, "white");
            drawStrokeCircle(context, lEyePos.add(dx), this.radius/4, "black", 1);

            drawCircle(context, rEyePos.add(dx2), this.radius/8, "black");
            drawCircle(context, lEyePos.add(dx2), this.radius/8, "black");
        
    } else {
        context.beginPath();
        context.lineWidth = 3;
        context.moveTo(this.pos.x - border / 3, this.pos.y - border / 4);
        context.lineTo(this.pos.x - border / 3 + eyeBorder, this.pos.y - border / 4 + eyeBorder); 
        context.moveTo(this.pos.x - border / 3 + eyeBorder, this.pos.y - border / 4);
        context.lineTo(this.pos.x - border / 3, this.pos.y - border / 4 + eyeBorder); 

        context.moveTo(this.pos.x, this.pos.y - border / 4);
        context.lineTo(this.pos.x + eyeBorder, this.pos.y - border / 4 + eyeBorder); 
        context.moveTo(this.pos.x + eyeBorder, this.pos.y - border / 4);
        context.lineTo(this.pos.x, this.pos.y - border / 4 + eyeBorder); 
        
        context.stroke();
    }

    // smile
    if (this.hp > 80){
        context.beginPath();
        context.lineWidth = 3;
        context.arc(this.pos.x + dx.x, this.pos.y + dx.y, this.radius - 10, (1 / 4) * Math.PI,  (3 / 4) * Math.PI);
        context.stroke();
    } else if (this.hp > 40){
        context.beginPath();
        context.lineWidth = 3;
        context.moveTo(this.pos.x - border / 4 + dx.x, this.pos.y + border / 4 + dx.y); // Move the pen to (30, 50)
        context.lineTo(this.pos.x + border / 4 + dx.x, this.pos.y + border / 4 + dx.y); // Draw a line to (150, 100)
        context.stroke();
    } else {
        context.beginPath();
        context.lineWidth = 3;
        context.arc(this.pos.x + dx.x, this.pos.y + border / 2  + dx.y, this.radius - 10, (5 / 4) * Math.PI,  (7 / 4) * Math.PI);
        context.stroke();
    }
}

Player.prototype.updateMousePos = function(mousepos){
    this.mousepos = mousepos
}

Player.prototype.update = function(dt) {
    let vel = new V2(0,0);
    this.spawnNewBullet(this.mousepos);
    pressedKeys.forEach(element => {
        if(element in controlTable) vel = vel.add(controlTable[element]);
    });
    
    this.last_bullet_delta += dt;
    this.last_dmg_delta += dt;
    this.last_blink_delta += dt;
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