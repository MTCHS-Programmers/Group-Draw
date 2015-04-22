<ul>
	<?php
		$sql = "SELECT * FROM drawCanvas;";
		$roomData = query($sql, "projects");
		foreach($roomData["rows"] as $room) {
			echo "<li><a href=\"?t=1&canvasID=" . $room["canvasID"] . "\">" . $room["name"] . "</a></li>";
		}
	?>
</ul>