import V2 from "./v2.js";
import { drawCircle } from "./Graphics.js"

export default function Enemy(speed, WHeight, WWeight) {
    this.radius = 30
    this.enemySpeed = speed;

    const center = new V2(WHeight, WWeight)

    const spawnRaduis = center.size() / 2 + this.radius;
    let xd = Math.random() * 3 * spawnRaduis - spawnRaduis;
    let yd = Math.sqrt(spawnRaduis * spawnRaduis - xd * xd) * (Math.random() * 2- 1);

    this.pos = new V2(xd, yd);
    console.log(this.pos);
};
Enemy.prototype.update = function(dt, player_pos){
    this.pos = this.pos.add(player_pos.sub(this.pos).setLen(this.enemySpeed).scale(dt));
};
Enemy.prototype.render = function(context){
    drawCircle(context, this.pos, this.radius, 'red');
};