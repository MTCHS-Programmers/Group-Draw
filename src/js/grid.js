function setupGrid() {
	var coords = window.location.hash.substr(1).split(",");

	canvas.camera.x = parseInt(coords[0]) || 0;
	canvas.camera.y = parseInt(coords[1]) || 0;
	
	setHashValue();
}

function setHashValue() {
	window.location.hash = canvas.camera.x + "," + canvas.camera.y;
}

function updateGrid() {
	if(canvas.mouse.down && canvas.brush.data.meta.type == "drag") {
		canvas.camera.x -= canvas.mouse.x - canvas.mouse.old.x;
		canvas.camera.y -= canvas.mouse.y - canvas.mouse.old.y
		setHashValue();
	}
};

/* this returns a value that allows for canvas drawings with grid coordinates to be drawn on the current window */
function relX() {
	return -canvas.camera.x + (c.width/2);
}

function relY() {
	return -canvas.camera.y + (c.height/2);
}

/* if the current object is in the window frame in any way shape or form, return true. Else return false */
function inFrame(frameData) {
	if(frameData.top < canvas.camera.y + (c.height/2) && frameData.bottom > canvas.camera.y - (c.height/2) && frameData.right > canvas.camera.x - (c.width/2) && frameData.left < canvas.camera.x + (c.width/2)) {
		return true;
	}
	else {
		return false;
	}
}