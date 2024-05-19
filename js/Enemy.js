import V2 from "./v2.js";
import { drawCircle } from "./Graphics.js"

export default function Enemy(speed) {
    this.pos = new V2(Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000));
    this.radius = 30
    this.enemySpeed = speed;
};
Enemy.prototype.update = function(dt, player_pos){
    this.pos = this.pos.add(player_pos.sub(this.pos).setLen(this.enemySpeed).scale(dt));
};
Enemy.prototype.render = function(context){
    drawCircle(context, this.pos, this.radius, 'red');
};