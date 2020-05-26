ctx = document.getElementById('decors').getContext('2d');
if(!ctx.roundRect){
	ctx.roundRect = function(x, y, width, height, radius){
		radius = typeof radius !== "undefined" ? radius : 5;
		
		ctx.beginPath();
		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + width - radius, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		ctx.lineTo(x + width, y + height - radius);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		ctx.lineTo(x + radius, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		ctx.lineTo(x, y + radius);
		ctx.quadraticCurveTo(x, y, x + radius, y);
	};
}

if(!ctx.drawScore){
	ctx.drawScore = function (posx, posy, score, score_max, r_score, margin, color, dir){
		r_score = typeof r_score !== "undefined" ? r_score : 12;
		margin = typeof margin !== "undefined" ? margin : r_score;
		color = typeof color !== "undefined" ? color : "red";
		
		var length_tot = score_max*2.5*r_score+2*margin;
		ctx.roundRect(posx, posy, length_tot, 2*r_score+2*margin);
		ctx.stroke();
		ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
		ctx.fill();
		var grad_pt = ctx.createLinearGradient(posx, 0, posx+length_tot, 0);
		grad_pt.addColorStop(1-dir, "black");
		grad_pt.addColorStop(0.5, color);
		grad_pt.addColorStop(dir, "gray");
		ctx.save();
		ctx.fillStyle = grad_pt;
		for(var i=1; i <= score_max; i++){
			ctx.beginPath();
			ctx.arc(posx+margin+i*2.5*r_score-r_score, posy+r_score+margin, r_score, 2*Math.PI, 0);
			if(dir == 0 && i<=score || dir == 1 && i > score_max-score){
				ctx.fill();
			}
			ctx.stroke();
		}
		ctx.restore();
	};
}

if(!ctx.drawText){
	ctx.drawText = function (text, posx, posy, font, textAlign){
		ctx.save();
		ctx.font = font;
		ctx.textAlign = typeof textAlign !== "undefined" ? textAlign : 'center';
		ctx.fillStyle = "black";
		ctx.fillText(text, posx, posy);
		ctx.save();
	};
}