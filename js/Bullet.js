import { drawCircle } from "./Graphics.js"

export default function Bullet(size, speed, player_pos, destenation_point){
    this.pos = player_pos
    this.vel = player_pos.sub(destenation_point).setLen(speed);
    this.radius = size / 2;
}
Bullet.prototype.update = function(dt) {
    this.pos = this.pos.sub(this.vel.scale(dt));
}
Bullet.prototype.render = function(context) {
    drawCircle(context, this.pos, this.radius, 'blue'); 
}