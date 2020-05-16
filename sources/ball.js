function ball(p0, v0, rayon, context_name){
	this.m = new mobile(p0, v0, rayon);
	this.min = new vector(rayon, rayon);
	this.max = new vector(env.size.x-rayon, env.jouable.y-rayon);
	this.ctx_b = document.getElementById(context_name).getContext('2d');
	this.E_tot = Math.pow(v0.norme(), 2)/2+this.m.rayon*env.g*(this.max.y-p0.y);
	this.drawVitesse = false;
	this.drawIsVect;
	var preRenduC = document.createElement('canvas');
	preRenduC.width = 2*rayon;
	preRenduC.height = 2*rayon;
	var preRendu = preRenduC.getContext('2d');
	
	this.preDrawVect = function(){
		var rayon = this.m.rayon;
		this.drawIsVect = true;
		preRendu.save();
//on mets l'ombre en place
		preRendu.beginPath();
		preRendu.arc(rayon, rayon, rayon, 2*Math.PI, 0);
		preRendu.fillStyle = "grey";
		preRendu.fill();
		preRendu.clip();
//puis la balle
		preRendu.beginPath();
		preRendu.arc(rayon*0.75, rayon, 0.9*rayon, 2*Math.PI, 0);
		preRendu.fillStyle = "white";
		preRendu.fill();
		preRendu.lineWidth = "1";
		preRendu.stroke();
		preRendu.restore();
//et son contour
		preRendu.beginPath();
		preRendu.arc(rayon, rayon, rayon, 2*Math.PI, 0);
		preRendu.lineWidth = "2";
		preRendu.stroke();
	}
	
	this.preDrawImg = function(){
		this.drawIsVect = false;
		var iball = new Image();
		var rayon = this.m.rayon;
		iball.onload = function(){
			iball_height = 210;
			iball_width = 210;
			preRendu.drawImage(iball, 0, 0, iball_height, iball_width, 0, 0, 2*rayon, 2*rayon);
		}
		iball.src = "images/volley-ball2.png";
	}
	
	this.draw = function(){
		this.m.p = this.getNextPosition();
//on efface tout
		this.ctx_b.save();
		this.ctx_b.clearRect(0, 0, env.size.x, env.size.y);
		this.ctx_b.translate(this.m.p.x, this.m.p.y);
		if(this.drawIsVect){
			this.ctx_b.rotate(Math.atan(this.m.p.y/this.m.p.x));
		}
		this.ctx_b.drawImage(preRenduC, -this.m.rayon, -this.m.rayon);
		this.ctx_b.restore();
		
		if(this.E_tot < this.getEnergy()){
			this.drawHighSpeed(this.getEnergy());
		}
		if(this.drawVitesse){
			this.ctx_b.beginPath();
			this.ctx_b.moveTo(this.m.p.x, this.m.p.y);
			this.ctx_b.lineTo(this.m.p.x+2*this.m.v.x, this.m.p.y+2*this.m.v.y);
			this.ctx_b.lineWidth = 2;
			this.ctx_b.strokeStyle = "green";
			this.ctx_b.stroke();
		}
	}
	
	this.drawHighSpeed = function(E){
		var a = Math.atan(50*(E-this.E_tot)/this.E_tot);
		var pos = 1.2*this.m.rayon;
		this.ctx_b.beginPath();		//tracé de l'hypervitesse !
		this.ctx_b.save();
		this.lineWidth = 5;
		this.ctx_b.translate(this.m.p.x, this.m.p.y);
		this.ctx_b.rotate(Math.atan2(this.m.v.y, this.m.v.x));
		this.ctx_b.arc(0, 0, pos, -a, a);
		this.ctx_b.strokeStyle = "firebrick";
		this.ctx_b.stroke();
		this.ctx_b.restore();
	}
	
	this.getNextSpeed = function(){
		var n_m = new mobile(this.m.getNextPosition(), this.m.getNextSpeed(env.g), this.m.rayon);
//conservation de l'energie totale
		if(this.E_tot < this.getEnergy()){
			n_m.v.y *= 0.9;
			n_m.v.x *= 0.9;
		}
// limites droite et gauche de l'écran
		if(n_m.p.x > this.max.x || n_m.p.x < this.min.x){
			n_m.v.x *= -1;
		}
// gestion du filet
//  3	5	4
//	1	||	2
		var min_filet = new vector (env.filet.p.x, env.filet.p.y);
		var max_filet = new vector (env.filet.p.x+env.filet.s.x, env.filet.p.y+env.filet.s.y);
		if(n_m.p.x+this.m.rayon>min_filet.x && n_m.p.x-this.m.rayon<max_filet.x ){
			if(n_m.p.y > min_filet.y){	//rebonds zones 1 et 2
				n_m.v.x *= -1;
			}else{
				if(n_m.p.y+this.m.rayon > min_filet.y){
					if(n_m.p.x > min_filet.x && n_m.p.x < max_filet.x){	//zone 5
						n_m.v.y*=-1;
					}else{
						if(n_m.p.distance(min_filet) < this.m.rayon)	//zone 3
							n_m.v = this.getRebond(n_m.v, new vector(min_filet.y-this.m.p.y, this.m.p.x-min_filet.x));
						if(n_m.p.distance(new vector(max_filet.x, min_filet.y))< this.m.rayon)	//zone 4
							n_m.v = this.getRebond(n_m.v, new vector(min_filet.y-this.m.p.y, this.m.p.x-max_filet.x));
					}
				}
			}
		}
// contact entre joueur 1 et balle
		if(p1.canCollide <= 0){		//tempo en cas de rebonds limite
			// var n_m_p1 = n_m;
			// n_m_p1.v.add(p1.m.v);
			if(p1.willCollide(n_m)){
				//balle présentement au dessus
				if(p1.m.p.y > this.m.p.y){
					var t = new vector(p1.m.p.y-this.m.p.y,this.m.p.x-p1.m.p.x);
				}else{
					//balle présentement juste en dessous
					if(Math.abs(p1.m.p.x-this.m.p.x) < p1.m.rayon){
						var t = new vector(1, 0);
					}else{
						if(p1.m.p.x < this.m.p.x){
							var t = new vector(p1.m.p.y-this.m.p.y,this.m.p.x-p1.m.rayon-p1.m.p.x);
						}else{
							var t = new vector(p1.m.p.y-this.m.p.y,this.m.p.x+p1.m.rayon-p1.m.p.x);
						}
					}
				}
				n_m.v = this.getRebond(n_m.v, t);
				n_m.v.add(p1.m.v, 2*this.m.rayon/p1.m.rayon);
				if(!p1.service){
					p1.nb_touche++;	
					p2.nb_touche=0;
				}
			}
		}
// contact entre joueur 2 et balle
		if(p2.canCollide <= 0){		//tempo en cas de rebonds limite
			// var n_m_p2 = n_m;
			// n_m_p2.v.add(p2.m.v);
			if(p2.willCollide(n_m)){
				if(p2.m.p.y > this.m.p.y){
					var t = new vector(p2.m.p.y-this.m.p.y,this.m.p.x-p2.m.p.x);
				}else{
					if(Math.abs(p2.m.p.x-this.m.p.x) < p2.m.rayon){
						var t = new vector(1, 0);
					}else{
						if(p2.m.p.x < this.m.p.x){
							var t = new vector(p2.m.p.y-this.m.p.y,this.m.p.x-p2.m.rayon-p2.m.p.x);
						}else{
							var t = new vector(p2.m.p.y-this.m.p.y,this.m.p.x+p2.m.rayon-p2.m.p.x);
						}
					}
				}
				n_m.v = this.getRebond(n_m.v, t);
				n_m.v.add(p2.m.v, 2*this.m.rayon/p2.m.rayon);
				if(!p2.service){
					p2.nb_touche++;
					p1.nb_touche=0;
				}
			}
		}
		return n_m.v;
	}
	this.getNextPosition = function(){
		this.m.v = this.getNextSpeed(env.g);
		var n_p = this.m.getNextPosition();
		if(n_p.x > this.max.x){
			n_p.x = this.max.x + 2*(n_p.x - this.max.x);
		}
		if(n_p.x < this.min.x){
			n_p.x = this.min.x - 2*(n_p.x - this.min.x);
		}
		return n_p;
	}
	this.getRebond = function(vitesse, tangente){
		if(tangente.x == 0)
			return new vector(-vitesse.x, vitesse.y);
		var theta = (tangente.x>0) ? Math.atan(tangente.y/tangente.x) : Math.PI+Math.atan(tangente.y/tangente.x);
		return new vector(vitesse.x*Math.cos(2*theta) + vitesse.y*Math.sin(2*theta), vitesse.x*Math.sin(2*theta) - vitesse.y*Math.cos(2*theta));
	}
	this.getEnergy = function(){
		return Math.pow(this.m.v.norme(), 2)/2+env.g*(this.max.y-this.m.p.y);
	}
}