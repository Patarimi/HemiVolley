var size_env = new vector (1000, 500);
var rayon_joueur = 50;
var rayon_ball = 17;
var gravite = 2/55;		//2/75
var v_saut = 25; 		//20
var v_move = 7;

var env = new universe(size_env, gravite);
env.score_max = parseInt(document.getElementById("SetNumber").value);
env.manche_max = parseInt(document.getElementById("MancheNumber").value);
var p1 = new player(new vector(size_env.x*0.25, env.jouable.y),	new vector(0, 0),rayon_joueur,"player");
p1.name = document.getElementById("name1").value
p1.bodyColor = document.getElementById("color1").value
p1.eyeColor = "green"
p1.preDraw();
p1.service = true;
var p2 = new player(new vector(size_env.x*0.75, env.jouable.y),	new vector(0, 0),rayon_joueur,"player");
p2.name = document.getElementById("name2").value
p2.bodyColor = document.getElementById("color2").value
p2.eyeColor = "blue";
p2.preDraw();
var b = new ball(new vector(p1.m.p.x,  env.jouable.y/2),new vector(0, 0),rayon_ball,"ball");
b.preDrawVect();


function init(){
	env.drawJeu();
	env.drawStart();
	animate();
}