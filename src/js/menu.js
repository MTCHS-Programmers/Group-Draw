function updateBrush() {
	canvas.brush.data.meta.stroke.style = $("#strokeStyle")[0].value;
	canvas.brush.data.meta.stroke.width = $("#lineWidth")[0].value;
	
	canvas.brush.data.meta.fill.style = $("#fillStyle")[0].value;
	canvas.brush.data.meta.fill.do = $("#do")[0].checked;
}