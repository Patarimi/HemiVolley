function player(p0, v0, rayon, context_name){
	this.m = new mobile(p0, v0, rayon);
	this.score = 0;
	this.manche = 0;
	this.nb_touche = 0;
	this.service = false;
	this.canCollide = 0;
	this.name = "Player";
	var ctx_m = document.getElementById(context_name).getContext('2d');
	var preRenduC = document.createElement('canvas');
		preRenduC.width = 2*rayon+2;
		preRenduC.height = rayon+2;
	var preRendu = preRenduC.getContext('2d');
	var preRenduImg;
//http://www.html5rocks.com/en/tutorials/canvas/performance/

	this.bodyColor = "yellow";
	this.eyeColor = "maroon";
	
	if(p0.x > env.size.x/2){		//joueur de droite
		this.dir = -1;
		this.min = new vector(env.filet.p.x+rayon+env.filet.s.x+1, rayon);
		this.max = new vector(env.size.x-rayon, env.jouable.y);				
	} else {						//joueur de gauche
		this.dir = 1;
		this.min = new vector(rayon, rayon);
		this.max = new vector(env.filet.p.x-rayon-1, env.jouable.y);
	}

	this.getNextSpeed = function(){
		var n_v = this.m.getNextSpeed(env.g);
		if(this.m.p.y>=this.max.y && n_v.y > 0){	//joueur au sol
			n_v.y = 0;
		}
		if(this.m.p.x > this.max.x || this.m.p.x < this.min.x){	//joueur à une extremité
			n_v.x = 0;
		}
		return n_v;
	}
	this.getNextPosition = function(){
		this.m.v = this.getNextSpeed(env.g);
		var n_p = this.m.getNextPosition();
		n_p.borne(this.min, this.max);
		return n_p;
	}
	this.preDraw = function(){
		preRendu.strokeStyle = "black";
		preRendu.lineWidth = 2;
//corps
		preRendu.beginPath();
		preRendu.arc(this.m.rayon+1, this.m.rayon+1, this.m.rayon, Math.PI, 0);
		preRendu.lineTo(1, this.m.rayon+1);
		preRendu.fillStyle = this.bodyColor;
		preRendu.fill();
		preRendu.stroke();
//oeil
		preRendu.beginPath();
		preRendu.arc(this.m.rayon+this.dir*0.6*this.m.rayon, this.m.rayon-0.6*this.m.rayon+1, 0.2*this.m.rayon, 2*Math.PI, 0);
		preRendu.fillStyle = "white";
		preRendu.fill();
		preRendu.stroke();
		preRenduImg = preRendu.getImageData(0, 0, preRenduC.width, preRenduC.height);
	}
	var x_min_clear = this.min.x-this.m.rayon-1;
	var x_max_clear = this.max.x-this.min.x+2*this.m.rayon+3;
	var y_max_clear = env.size.y-env.y_sol+2;
	this.draw = function(){
		this.m.p = this.getNextPosition();
		ctx_m.clearRect(x_min_clear, 0, x_max_clear, y_max_clear);
		ctx_m.drawImage(preRenduC, this.m.p.x-this.m.rayon, this.m.p.y-this.m.rayon);
//pupille
		ctx_m.beginPath();
		ctx_m.save();
		var theta = Math.atan((b.m.p.y-this.m.p.y+0.6*this.m.rayon)/(this.m.p.x+this.dir*0.6*this.m.rayon-b.m.p.x));
		theta = (this.m.p.x+this.dir*0.6*this.m.rayon-b.m.p.x>0)?theta:theta+Math.PI;
		ctx_m.translate(this.m.p.x+this.dir*0.6*this.m.rayon, this.m.p.y-0.6*this.m.rayon);
		ctx_m.rotate(-theta);
		ctx_m.arc(-5, 0, 0.1*this.m.rayon, 2*Math.PI, 0);
		ctx_m.fillStyle = "black";
		ctx_m.fill();
		ctx_m.strokeStyle = this.eyeColor;
		ctx_m.lineWidth = 3;
		ctx_m.stroke();
		ctx_m.restore();
//filtre anti-"rebonds"
		if(this.canCollide > 0)
			this.canCollide--;
	}
	this.drawTouche = function(){
//nombre de touche de balle
		ctx_m.clearRect(x_min_clear, y_max_clear, x_max_clear, env.size.y);
		if(this.nb_touche > 0){
			ctx_m.font = "20pt rough_typewriter";
			ctx_m.fillStyle = "white";
			ctx_m.textAlign = "center";
			ctx_m.fillText("touche : "+this.nb_touche, env.jouable.x/2 - this.dir*env.jouable.x/4, env.jouable.y + 30);
		}
	}
	this.willCollide = function(ctx){
		var w = preRenduC.width;
		var h = preRenduC.height;
		var collide = false;
		var ctxImg = ctx.getImageData(this.m.p.x-this.m.rayon, this.m.p.y-this.m.rayon, w, h);
		for(var i=3;i<=w*h;i+=4){
			if(preRenduImg.data[i]!=0){
				if(ctxImg.data[i]!=0){
					this.canCollide = 8;
					collide = true;
					break;
				}
			}
		}
		return collide;
	}
	
}
