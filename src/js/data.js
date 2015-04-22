function getBrushData() {
	$.get("src/php/getBrushData.php", {"syncID": canvas.syncID, "canvasID": canvas.canvasID}, function(data) {
		data = JSON.parse(data);
		if(data.length >= 1) {
			for(var i=0; i<data.length; i++) {
				canvas.sync.push({
					"syncID": data[i].syncID,
					"data": JSON.parse(data[i].data)
				});
				
				/* remove any temp brushes that were saved to the client and just synced to the server */
				for(var j=0; j<canvas.temp.length; j++) {
					if(canvas.temp[j].syncID == data[i].syncID) {
						canvas.temp.splice(j, 1);
						break;
					}
				}
				
				canvas.syncID = parseInt(data[i].syncID);
			}
			
			render();
		}
		
		setTimeout(function() {getBrushData();}, 500);
	});
}