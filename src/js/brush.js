/* render a brush when given the brush data */
function renderBrush(data) {
	if(inFrame(data.meta.frame)) {
		ctx.strokeStyle = data.meta.stroke.style;
		ctx.fillStyle = data.meta.fill.style;
		ctx.lineWidth = data.meta.stroke.width;
			
		if(data.meta.type === "stroke") {
			if(data.coords.length >=2) {
				ctx.beginPath();
				ctx.moveTo(relX() + data.coords[0].x, relY() + data.coords[0].y);
		
				for(var i=1; i<data.coords.length; i++) {
					ctx.lineTo(relX() + data.coords[i].x, relY() + data.coords[i].y);
				}

				ctx.stroke();
			}
		}
		else if(data.meta.type === "rect") {
			var width = (data.coords.length == 2 ? data.coords[1].x : canvas.brush.x) - data.coords[0].x;
			var height = (data.coords.length == 2 ? data.coords[1].y : canvas.brush.y) - data.coords[0].y;
			ctx.beginPath();
			ctx.rect(relX() + data.coords[0].x, relY() + data.coords[0].y, width, height);
			if(data.meta.fill.do) {
				ctx.fill()
			}
			else {
				ctx.stroke()
			};
		}
		else if(data.meta.type === "arc") {
			xD = Math.pow((data.coords.length == 2 ? data.coords[1].x : canvas.brush.x) - data.coords[0].x, 2);
			yD = Math.pow((data.coords.length == 2 ? data.coords[1].y : canvas.brush.y) - data.coords[0].y, 2);
			ctx.beginPath();
			ctx.arc(relX() + data.coords[0].x, relY() + data.coords[0].y, Math.sqrt(xD+yD), 0, 2*Math.PI);
			if(data.meta.fill.do) {
				ctx.fill()
			}
			else {
				ctx.stroke()
			};
		}
	}
	else if(data.coords.length == 0) {
		ctx.beginPath();
		ctx.arc(relX() + canvas.brush.x, relY() + canvas.brush.y, canvas.brush.data.meta.stroke.width/2, 0, 2*Math.PI);
		ctx.fill();
	}
}

/* this allows us to know what needs to be tracked in the brush movements */
function trackBrush(event) {
	var push = false;
	if(event == "down" && canvas.brush.track.down) {
		push = true;
	}
	else if(event == "up" && canvas.brush.track.up) {
		push = true;
	}
	else if(event == "move" && canvas.brush.track.move.up && !canvas.mouse.down) {
		push = true;
	}
	else if(event == "move" && canvas.brush.track.move.down && canvas.mouse.down) {
		push = true;
	}
	
	if(push) {
		canvas.brush.data.coords.push({
			"x": canvas.brush.x,
			"y": canvas.brush.y
		});
		
		if(canvas.brush.y < canvas.brush.data.meta.frame.top || isNaN(canvas.brush.data.meta.frame.top)) canvas.brush.data.meta.frame.top = canvas.brush.y;
		if(canvas.brush.y > canvas.brush.data.meta.frame.bottom || isNaN(canvas.brush.data.meta.frame.bottom)) canvas.brush.data.meta.frame.bottom = canvas.brush.y;
		if(canvas.brush.x > canvas.brush.data.meta.frame.right || isNaN(canvas.brush.data.meta.frame.right)) canvas.brush.data.meta.frame.right = canvas.brush.x;
		if(canvas.brush.x < canvas.brush.data.meta.frame.left || isNaN(canvas.brush.data.meta.frame.left)) canvas.brush.data.meta.frame.left = canvas.brush.x;
	}
}

/* when the mouse is lifted, we will check to see if the current brush is ready to be posted */
function releaseBrush() {
	canvas.brush.release.cur++;
	if(canvas.brush.release.cur == canvas.brush.release.max) {		
		$.post("src/php/postBrushData.php", {"data": JSON.stringify(canvas.brush.data), "tempID": canvas.brush.tempID, "canvasID": canvas.canvasID}, function(data) {
			data = JSON.parse(data);
			for(var i=0; i<canvas.temp.length; i++) {
				if(data.tempID == canvas.temp[i].tempID) {
					canvas.temp[i].syncID = data.syncID;
					break;
				}
			}
		});
		/* so remove client lag, we will temporarily put the brush data into a temp object and render it until the brush has been uploaded to the server */
		canvas.temp.push({
			"data": canvas.brush.data,
			"tempID": canvas.brush.tempID,
			"syncID": NaN
		});
		
		/* reset the current brush type as itself */
		setBrush(canvas.brush.data.meta.type);
	}
}

function setBrush(type) {
	if(type == "stroke") {
		canvas.brush.track = {
			"down": false,
			"up": false,
			"move": {
				"up": false,
				"down": true
			}
		};
		
		canvas.brush.release.max = 1;
		
		canvas.brush.data =  {
			"meta": {
				"type": "stroke",
				"stroke": {},
				"fill": {}
			}
		}
	}
	else if(type == "rect") {
		canvas.brush.track = {
			"down": true,
			"up": false,
			"move": {
				"up": false,
				"down": false
			}
		};
		
		canvas.brush.release.max = 2;
		
		canvas.brush.data =  {
			"meta": {
				"type": "rect",
				"stroke": {},
				"fill": {}
			}
		}
	}
	else if(type == "arc") {
		canvas.brush.track = {
			"down": true,
			"up": false,
			"move": {
				"up": false,
				"down": false
			}
		};
		
		canvas.brush.release.max = 2;
		
		canvas.brush.data =  {
			"meta": {
				"type": "arc",
				"stroke": {},
				"fill": {}
			}
		}
	}
	else {
		canvas.brush.track = {
			"down": false,
			"up": false,
			"move": {
				"up": false,
				"down": false
			}
		};
		
		canvas.brush.release.max = -1;
		
		canvas.brush.data =  {
			"meta": {
				"type": "drag",
				"stroke": {},
				"fill": {}
			}
		}
	}
	
	canvas.brush.data.coords = [];
	canvas.brush.release.cur = 0;
	
	/* this is set up using TRBL and allows us to track the frame of a stroke */
	canvas.brush.data.meta.frame = {
		"top": NaN,
		"right": NaN,
		"bottom": NaN,
		"left": NaN
	}
	
	canvas.brush.tempID = canvas.tempID;
	canvas.tempID++;
	
	updateBrush();
}