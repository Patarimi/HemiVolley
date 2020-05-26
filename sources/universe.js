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
	this.ctx_decors = document.getElementById('decors').getContext('2d');	//contenu visible mais pas collisionnable
	this.ctx_objet = document.getElementById('objet').getContext('2d');		//contenu visible et collisionnable
	var ListeComSetJst = ["<NAME> arrache la manche gagnante !"];
	var ListeComSetStd = ["<NAME> remporte la manche"];
	var ListeComSetPft = ["<NAME> réalise une manche parfaite !"];
	
	var ListeComJst = ["C'est juste, mais ça passe", "Victoire sur le fils pour <NAME>"];
	var ListeComStd = ["C'est à peine étonnant...", "Ça va pas être facile de s'en remettre"];
	var ListeComPft = ["Partie parfaite !", "<NAME> écrase son adversaire !"];

	this.drawJeu = function(){
		this.ctx_decors.lineWidth = 2;
		this.ctx_decors.strokeStyle = "black";
		
//ciel
		var grad_ciel = this.ctx_decors.createRadialGradient(0, 0, 25, 5, 5, 150);
		grad_ciel.addColorStop(0, 'yellow');
		grad_ciel.addColorStop(0.2, 'white');
		grad_ciel.addColorStop(1, "deepskyblue");
		this.ctx_decors.fillStyle = grad_ciel;
		this.ctx_decors.fillRect(0, 0, this.jouable.x, this.jouable.y);
//sol
		var image_sol = new Image();
		image_sol.onload = function(){
			for(var i=0; i<= 19; i++){
				env.ctx_objet.drawImage(image_sol, i*50, env.jouable.y-1);
			}
//filet
			env.filet.draw(env.ctx_objet);
		};
		image_sol.src = "images/grass.png";
//score joueur 1
		this.ctx_decors.drawScore(40, 20, p1.score, this.score_max, r_score, 5, "green", 0);

//score joueur 2
		var posx = this.size.x-40-(this.score_max+1)*2.5*r_score;
		this.ctx_decors.drawScore(posx, 20, p2.score, this.score_max, r_score, 5, "blue", 1);

//manche
		this.ctx_decors.roundRect(env.size.x/2-100, 12, 200, 85, 10);
		this.ctx_decors.fillStyle = "maroon";
		this.ctx_decors.fill();
		this.ctx_decors.lineWidth = 4;
		this.ctx_decors.stroke();
		this.ctx_decors.font = "60pt Fluid LCD";
		this.ctx_decors.textAlign = 'center';
		this.ctx_decors.fillStyle = "red";
		this.ctx_decors.lineWidth = 1;
		this.ctx_decors.strokeStyle = "lightcoral";
		this.ctx_decors.fillText(p1.manche+"  "+p2.manche, env.size.x/2, 80);
		this.ctx_decors.strokeText(p1.manche+"  "+p2.manche, env.size.x/2, 80);
	}
	
	var posText = new vector(this.size.x/2, this.size.y/2-90);
	var Interligne = 30;
	var Typo = "20pt rough_typewriter";
	
	this.drawStart = function(){
		this.ctx_decors.font = Typo;
		this.ctx_decors.drawText("Appuyer sur P pour commencer", posText.x, posText.y);
		this.ctx_decors.drawText('une nouvelle partie', posText.x, posText.y+Interligne);		
	}
	this.drawMenuPause = function(){
		this.ctx_decors.font = Typo;
		this.ctx_decors.drawText("Jeu en pause", posText.x, posText.y);
		this.ctx_decors.drawText("Appuyer sur P pour continuer", posText.x, posText.y+Interligne);
	}
	this.drawVainqueur = function(Vainqueur, diff){
		this.ctx_decors.font = Typo;
		this.ctx_decors.fillStyle = "black";
		if(diff <=1){
			i = Math.round((ListeComSetJst.length-1)*Math.random());
			this.ctx_decors.fillText(this.CreaTexteVictoire(ListeComSetJst[i], Vainqueur), posText.x, posText.y);
		}else if(diff == this.manche_max){
			i = Math.round((ListeComSetPft.length-1)*Math.random());
			this.ctx_decors.fillText(this.CreaTexteVictoire(ListeComSetPft[i], Vainqueur), posText.x, posText.y);
		}else{
			i = Math.round((ListeComSetStd.length-1)*Math.random());
			this.ctx_decors.fillText(this.CreaTexteVictoire(ListeComSetStd[i], Vainqueur), posText.x, posText.y);
		}
		this.ctx_decors.drawText("Appuyer sur P pour lancer", posText.x, posText.y+Interligne);
		this.ctx_decors.drawText("la prochaine manche", posText.x, posText.y+2*Interligne);
	}
	this.drawVainqueurFinal = function(Vainqueur, diff){
		this.ctx_decors.font = Typo;
		this.ctx_decors.fillStyle = "black";
		if(diff <=1){
			i = Math.round((ListeComJst.length-1)*Math.random());
			this.ctx_decors.fillText(ListeComJst[i], posText.x, posText.y);
		}else if(diff == this.manche_max){
			i = Math.round((ListeComPft.length-1)*Math.random());
			this.ctx_decors.fillText(ListeComPft[i], posText.x, posText.y);
		}else{
			i = Math.round((ListeComStd.length-1)*Math.random());
			this.ctx_decors.fillText(ListeComStd[i], posText.x, posText.y);
		}
	}
	this.clearAll = function(){
		this.ctx_decors.clearRect(0, 0, this.size.x, this.size.y);
	}
	
	this.CreaTexteVictoire=function(Texte, VainqueurName){
			if(/<NAME>/i.test(Texte)){
				i = Texte.indexOf("<NAME>");
				return Texte.substring(0, i)+VainqueurName+Texte.substring(i+6);
			}else{
				return Texte;
			}
	}
}