tempID = 0;
canvas = {
	/* mouse data */
	"mouse": {
		"x": NaN,
		"y": NaN,
		"down": false,
		"old": {
			"x": NaN,
			"y": NaN
		}
	},
	
	/* the camera window location relative to the center of the screen */
	"camera": {
		"x": NaN,
		"y": NaN
	},
	
	/* current brush data */
	"brush": {
		"x": NaN,
		"y": NaN,
		"track": {
			"down": false,
			"up": false,
			"move": {
				"up": false,
				"down": false
			}
		},
		"release": {
			"cur": 0,
			"max": -1
		},
		"data": {
			"meta": {
				"type": "drag",
				"stroke": {
					"style": "#000000",
					"width": 0
				},
				"fill": {
					"style": "#000000",
					"do": false
				},
				"frame": {
					"top": NaN,
					"right": NaN,
					"bottom": NaN,
					"left": NaN
				}
			},
			
			"coords": []
		}
	},
	
	"temp": [],
	"tempID": 0,
	
	"sync": [],
	"syncID": 0,
	
	"canvasID": NaN
}
$(document).ready(function() {
	/* canvas values */
	c = $("#canvas")[0];
	ctx = c.getContext("2d");
	c.width = window.innerWidth - 50;
	c.height = window.innerHeight;
	
	setupGrid(); /* grid.js */
	getBrushData(); /* data.js */
});