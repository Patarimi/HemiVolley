function  rectangle(origine, size, draw, Fcolor, Scolor, Lwidth){
	this.p = origine;
	this.s = size;
	this.drawable = typeof draw !== 'undefined' ? draw : true;
	this.fillColor = typeof Fcolor !== 'undefined' ? Fcolor : "white";
	this.strokeColor = typeof Scolor !== 'undefined' ? Scolor : "black";
	this.lineWidth = typeof Lwidth !== 'undefined' ? Lwidth : 2;
	
	this.willCollide = function(mob){		// a verifier, ajout rayon du mobile
		return mob.p.x+mob.rayon > this.p.x && mob.p.x < this.p.x+this.s.x && mob.p.y > this.p.y && mob.p.y < this.p.y+this.s.y;
	}
	this.draw = function(ctx){
		if(this.drawable){
			ctx.beginPath();
			ctx.save();
			ctx.fillStyle = this.fillColor;
			ctx.rect(this.p.x, this.p.y, this.s.x, this.s.y);
			ctx.fill();
			ctx.strokeStyle = this.strokeColor;
			ctx.lineWidth = this.lineWidth;
			ctx.stroke();
			ctx.restore();
		}
	}
}