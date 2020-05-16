function  mobile(v_p0, v_v0, v_rayon){
	this.v = v_v0;		//vitesse instantanée
	this.p = v_p0;		//position instantanée
	this.rayon = v_rayon;		//rayon du mobile
	
	this.getNextPosition = function(){
		return new vector(this.p.x + this.v.x, this.p.y + this.v.y);
	}
	this.setNextPosition = function(){
		this.p.add(this.v);
	}
	this.getNextSpeed = function(gravite){
		return new vector(this.v.x, this.v.y + this.rayon*gravite);
	}
}