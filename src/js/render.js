function render() {
	ctx.clearRect(0, 0, c.width, c.height);
	
	updateGrid(); /* grid.js */
	
	for(var i=0; i<canvas.sync.length; i++) {
		renderBrush(canvas.sync[i].data);
	}
	
	for(var i=0; i<canvas.temp.length; i++) {
		renderBrush(canvas.temp[i].data);
	}
	
	renderBrush(canvas.brush.data) /* brush.js */
};