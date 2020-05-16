function vector(x, y){
	this.x = x;
	this.y = y;
	this.norme = function(){
		return Math.sqrt(Math.pow(this.x, 2)+Math.pow(this.y, 2));
	}
	this.distance = function(bb){
		var c = new vector(this.x-bb.x, this.y-bb.y);
		return c.norme();
	}
	this.add = function(bb, k){
		k = typeof k !== 'undefined' ? k : 1; //impose une valeur par default à k;
		this.x += k*bb.x;
		this.y += k*bb.y;
	}
	this.borne = function(min, max){
		this.x = Math.min(Math.max(this.x, min.x), max.x);
		this.y = Math.min(Math.max(this.y, min.y), max.y);
	}
}