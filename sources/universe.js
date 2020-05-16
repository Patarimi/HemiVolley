// creer un array d'objet immobile (rectangle) et un array d'objet mobile (balle et player)
function universe(size, g){
	var r_score = 12;
	this.score_max = 6;
	this.manche_max = 3;
	this.g = g;
	this.size = size;
	this.y_sol = 50;
	this.jouable = new vector(size.x, size.y - this.y_sol);
	this.filet = new rectangle(new vector(this.jouable.x/2-8, this.jouable.y-145),new vector(16, 150));
	this.pause = true;
	this.ctx_t = document.getElementById('terrain').getContext('2d');
	
	this.drawJeu = function(){
		this.ctx_t.lineWidth = 2;
		this.ctx_t.strokeStyle = "black";
		
//ciel
		var grad_ciel = this.ctx_t.createRadialGradient(0, 0, 25, 5, 5, 150);
		grad_ciel.addColorStop(0, 'yellow');
		grad_ciel.addColorStop(0.2, 'white');
		grad_ciel.addColorStop(1, "deepskyblue");
		this.ctx_t.fillStyle = grad_ciel;
		this.ctx_t.fillRect(0, 0, this.jouable.x, this.jouable.y);
//sol
		var image_sol = new Image();
		image_sol.onload = function(){
			for(var i=0; i<= 19; i++){
				env.ctx_t.drawImage(image_sol, i*50, env.jouable.y-1);
			}
			//filet
			env.filet.draw(env.ctx_t);
		};
		image_sol.src = "images/grass.png";
//score joueur 1
		this.ctx_t.drawScore(40, 20, p1.score, this.score_max, r_score, 5, "green", 0);

//score joueur 2
		var posx = this.size.x-40-(this.score_max+1)*2.5*r_score;
		this.ctx_t.drawScore(posx, 20, p2.score, this.score_max, r_score, 5, "blue", 1);

//manche
		this.ctx_t.roundRect(env.size.x/2-100, 12, 200, 85, 10);
		this.ctx_t.fillStyle = "maroon"
		this.ctx_t.fill();
		this.ctx_t.lineWidth = 4;
		this.ctx_t.stroke();
		this.ctx_t.font = "60pt Fluid LCD";
		this.ctx_t.textAlign = 'center';
		this.ctx_t.fillStyle = "red";
		this.ctx_t.lineWidth = 1;
		this.ctx_t.strokeStyle = "lightcoral"
		this.ctx_t.fillText(p1.manche+"  "+p2.manche, env.size.x/2, 80);
		this.ctx_t.strokeText(p1.manche+"  "+p2.manche, env.size.x/2, 80);
	}
	this.drawStart = function(){
		this.ctx_t.drawText("Hemi Volley", this.size.x/2, this.size.y/2-40, "80pt Sketch Coursive");
		this.ctx_t.drawText("Appuyer sur P pour commencer", this.size.x/2, this.size.y/2+20, "20pt rough_typewriter");
		this.ctx_t.drawText("une nouvelle partie", this.size.x/2, this.size.y/2+40, "20pt rough_typewriter");		
	}
	this.drawMenuPause = function(){
		this.ctx_t.drawText("Hemi Volley", this.size.x/2, this.size.y/2-40, "80pt Sketch Coursive");
		this.ctx_t.drawText("Jeu en pause", this.size.x/2, this.size.y/2+20, "20pt rough_typewriter");
		this.ctx_t.drawText("Appuyer sur P pour continuer", this.size.x/2, this.size.y/2+40, "20pt rough_typewriter");
	}
	this.drawVainqueur = function(){
		if(p1.score == this.score_max){
			var Vainqueur = "Player 1";
			p1.manche++;
		}else{
			var Vainqueur = "Player 2";
			p2.manche++;
		}
		if(p1.manche < this.manche_max && p2.manche < this.manche_max){
			this.drawJeu();
			this.ctx_t.drawText(Vainqueur+" remporte la manche !", this.size.x/2, this.size.y/2-40, "30pt rough_typewriter");
			this.ctx_t.drawText("Appuyer sur P pour lancer", this.size.x/2, this.size.y/2, "30pt rough_typewriter");
			this.ctx_t.drawText("la prochaine manche", this.size.x/2, this.size.y/2+40, "30pt rough_typewriter");
		}
	}
	this.drawVainqueurFinal = function(){
		if(p1.manche == this.manche_max){
			var Vainqueur = "Player1";
		}else{
			var Vainqueur = "Player2";
		}
		this.clearAll();
		this.drawJeu();
		this.ctx_t.font = "30pt rough_typewriter";
		this.ctx_t.fillStyle = "black";
		this.ctx_t.fillText(Vainqueur+" remporte la partie !", this.size.x/2, this.size.y/2);
		this.ctx_t.fillText("C'est à peine étonnant...", this.size.x/2, this.size.y/2+40);
	}
	this.clearAll = function(){
		this.ctx_t.clearRect(0, 0, this.size.x, this.size.y);
	}
}