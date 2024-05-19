export default function V2(x, y) {
    this.x = x;
    this.y = y;
}

V2.prototype.toString = function () {
    return `Vector2d(${this.x};${this.y})`;
};
V2.prototype.add = function (...thats) {
    const res = new V2(this.x, this.y)
    thats.forEach( element => {
        res.x += element.x;
        res.y += element.y;
    });
    return res;
};
V2.prototype.sub = function (...thats) {
    const res = new V2(this.x, this.y)
    thats.forEach( element => {
        res.x -= element.x;
        res.y -= element.y;
    });
    return res;
};
V2.prototype.subXY = function (x, y) {
    return new V2(this.x - x, this.y - y);
};
V2.prototype.scale = function (...s) {
    const res = new V2(this.x, this.y)
    s.forEach( element => {
        res.x *= element;
        res.y *= element;
    });
    return res;
};

V2.prototype.size = function () {
    return Math.sqrt(this.x*this.x + this.y*this.y)
};

V2.prototype.setLen = function (len) {
    const d = len / this.size();
    const res = new V2(this.x, this.y)
    res.x *= d;
    res.y *= d;
    return res;
};

V2.prototype.set = function (x, y) {
    return new V2(x, y)
};
