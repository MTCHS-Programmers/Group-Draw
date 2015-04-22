<?php
	require_once($_SERVER['DOCUMENT_ROOT'] . "/src/light.php");
	
	$sql = "SELECT syncID, data FROM drawBrush WHERE canvasID=" . $_GET["canvasID"] . " AND syncID > " . $_GET["syncID"] . ";";
	$strokeData = query($sql, "projects")["rows"];
	echo json_encode($strokeData);
?>