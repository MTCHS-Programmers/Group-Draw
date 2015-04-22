<?php
	if(query("SELECT * FROM drawCanvas WHERE canvasID=" . $_GET["canvasID"], "projects")["data"]->num_rows == 0) {
		echo "Error: Invalid CanvasID.";
		die;
	}
?>
<!DOCTYPE html>
<html>
	<head>
		<title><?php echo "Main Canvas"; ?></title>
		
		
		<script src="/src/assets/src/js/jquery.js"></script>
		<script src="src/js/setup.js"></script>
		<script src="src/js/events.js"></script>
		<script src="src/js/render.js"></script>
		<script src="src/js/grid.js"></script>
		<script src="src/js/brush.js"></script>
		<script src="src/js/data.js"></script>
		<script src="src/js/menu.js"></script>
		<script>canvas.canvasID=<?php echo $_GET["canvasID"]; ?>;</script>
		
		<link rel="stylesheet" type="text/css" href="src/css/style.css">
	</head>
	
	<body>
		<div id="canvasContainer">
			<canvas id="canvas"></canvas>
		</div>
		
		<div id="menu">
			<input type="button" onclick="javascript: setBrush('drag')" value="Drag" class="menuItem" />
			<input type="button" onclick="javascript: setBrush('stroke')" value="Stroke" class="menuItem" />
			<input type="button" onclick="javascript: setBrush('rect')" value="Rect" class="menuItem" />
			<input type="button" onclick="javascript: setBrush('arc')" value="Arc" class="menuItem" />
			<br />
			StrokeStyle: <input type="color"  value="#000000" id="strokeStyle" class="menuItem" /> <br />
			LineWidth: <input type="range" min="1" max="50" step="1" value="1" id="lineWidth" class="menuItem" /> <br />
			<br />
			FillStyle: <input type="color"  value="#000000" id="fillStyle" class="menuItem" /> <br />
			Fill: <input type="checkbox" id="do" class="menuItem" /> <br />
		</div>
	</body>
</html>