$(document).ready(function() {
	/* canvas resize event */
	$(window).resize(function() {
		c.width = window.innerWidth;
		c.height = window.innerHeight;
		
		render();
	});

	$(c).mousedown(function(event) {
		canvas.mouse.down = true;
		canvas.mouse.x = event.pageX - $(c).offset().left + 25;
		canvas.mouse.y = event.pageY - $(c).offset().top;
		
		canvas.brush.x = canvas.camera.x + (canvas.mouse.x - (window.innerWidth/2));
		canvas.brush.y = canvas.camera.y + (canvas.mouse.y - (window.innerHeight/2));
		
		trackBrush("down"); /* brush.js */
	}).mouseup(function(event) {
		canvas.mouse.down = false;
		canvas.mouse.x = event.pageX - $(c).offset().left + 25;
		canvas.mouse.y = event.pageY - $(c).offset().top;
		
		canvas.brush.x = canvas.camera.x + (canvas.mouse.x - (window.innerWidth/2));
		canvas.brush.y = canvas.camera.y + (canvas.mouse.y - (window.innerHeight/2));
		
		releaseBrush(); /* brush.js*/
		trackBrush("up"); /* brush.js */
	}).mousemove(function(event) {
		canvas.mouse.old.x = canvas.mouse.x;
		canvas.mouse.old.y = canvas.mouse.y;
		
		canvas.mouse.x = event.pageX - $(c).offset().left + 25;
		canvas.mouse.y = event.pageY - $(c).offset().top;
		
		canvas.brush.x = canvas.camera.x + (canvas.mouse.x - (window.innerWidth/2));
		canvas.brush.y = canvas.camera.y + (canvas.mouse.y - (window.innerHeight/2));
		
		trackBrush("move"); /* brush.js */
		
		render();
	});
	
	/* menu item events */
	$(".menuItem").change(function() {
		updateBrush();
	});
});