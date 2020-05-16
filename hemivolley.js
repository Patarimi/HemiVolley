var size_env = new vector (1000, 500);
var rayon_joueur = 50;
var rayon_ball = 17;
var gravite = 2/55;		//2/75
var v_saut = 25; 		//20
var v_move = 7;

var env = new universe(size_env, gravite);
var p1 = new player(new vector(size_env.x*0.25, env.jouable.y),	new vector(0, 0),rayon_joueur,"player", "lightgreen", "green");
p1.preDraw();
p1.service = true;
var p2 = new player(new vector(size_env.x*0.75, env.jouable.y),	new vector(0, 0),rayon_joueur,"player", "lightblue", "blue");
p2.preDraw();
var b = new ball(new vector(p1.m.p.x,  env.jouable.y/2),new vector(0, 0),rayon_ball,"ball");
b.preDrawImg();


function init(){
	env.drawJeu();
	env.drawStart();
	animate();
}