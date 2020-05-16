window.requestAnimFrame = (function(){
	return window.requestAnimationFrame   || // La forme standardisée
	   window.webkitRequestAnimationFrame || // Pour Chrome et Safari
	   window.mozRequestAnimationFrame    || // Pour Firefox
	   window.oRequestAnimationFrame      || // Pour Opera
	   window.msRequestAnimationFrame
})();

function animate(){
	p1.draw();
	p2.draw();
	b.draw();
// la balle touche le sol ou il y a eu plus de trois touches
	if(b.m.p.y > env.jouable.y || p1.nb_touche > 3 || p2.nb_touche > 3){
		env.pause = true;
		if((b.m.p.x > b.max.x/2 && b.m.p.y > env.jouable.y) || p2.nb_touche > 3){
			p1.score++;
			p1.service = true;
			b.m = new mobile(new vector(env.size.x*0.25,  env.jouable.y/2), new vector(0, 0), rayon_ball);
		}else{
			p2.score++;
			p2.service = true;
			b.m = new mobile(new vector(env.size.x*0.75,  env.jouable.y/2), new vector(0, 0), rayon_ball);
		}
		p2.m = new mobile(new vector(env.size.x*0.75, env.jouable.y), new vector(0, 0),	rayon_joueur);
		p1.m = new mobile(new vector(env.size.x*0.25, env.jouable.y), new vector(0, 0),	rayon_joueur);
		env.clearAll();
		env.drawJeu();
		p1.nb_touche = 0;
		p2.nb_touche = 0;
	}	
//un joueur remporte la manche
	if(p1.score == env.score_max || p2.score == env.score_max){
		env.pause = "true";
		if(p1.score == env.score_max)
			p1.service = true;
		else
			p2.service = true;
		env.drawVainqueur();
		p1.score = 0;
		p2.score = 0;
	}
//un joueur a gagné
	if(p1.manche == env.manche_max || p2.manche == env.manche_max){
		env.pause = "true";
		env.drawVainqueurFinal();
		p1.manche = 0;
		p2.manche = 0;
	}
	if(!env.pause)
		window.requestAnimFrame(function() {
			animate()
		});
}

window.onkeydown = function(event) {
	var e = event || window.event;
	var key = e.which || e.keyCode;
	switch(key){
		case 37 :				//fleche de gauche
			if(!env.pause && p2.m.p.x > p2.min.x){
				p2.m.v.x = -v_move;
				p2.service = false;
			}
		break;
		case 39 :				//fleche de droite
			if(!env.pause && p2.m.p.x < p2.max.x){
				p2.m.v.x = v_move;
				p2.service = false;
			}
		break;
		case 81 : case 65 :		//touche q et a
			if(!env.pause && p1.m.p.x > p1.min.x){
				p1.m.v.x = -v_move;
				p1.service = false;
			}
		break;
		case 100 : case 68 :	//touche d et ?
			if(!env.pause && p1.m.p.x < p1.max.x){
				p1.m.v.x = v_move;
				p1.service = false;
			}
		break;
		case 90 : case 116 :	//touche z et w
			if(p1.m.p.y==env.jouable.y)
				p1.m.v.y = -v_saut;
		break;
		case 38 :				//flèche haut
			if(p2.m.p.y==env.jouable.y)
				p2.m.v.y = -v_saut;
		break;
		case 80 :				//touche P
			env.pause = !env.pause;
			if(env.pause){
				env.drawMenuPause();
			}else{
				env.clearAll();
				env.drawJeu();
			}
			animate();
		break;
		case 32 :				//touche espace
			if(env.pause){
				env.pause = false;
				env.clearAll();
				env.drawJeu();
				animate();
			}
		break;
		// default : 			//récuperation de numéro de touche inconnue
			// alert(key);
	}
}
window.onkeyup = function(event) {
	var e = event || window.event;
	var key = e.which || e.keyCode;
	switch(key){
		case 37 :
			if(p2.m.v.x == -v_move)
				p2.m.v.x = 0;
		break;
		case 39 :
			if(p2.m.v.x == v_move)
				p2.m.v.x = 0;
		break;
		case 81 : case 65 :
			if(p1.m.v.x == -v_move)
				p1.m.v.x = 0;
		break;
		case 100 : case 68 :
			if(p1.m.v.x == v_move)
				p1.m.v.x = 0;
		break;
	}
}