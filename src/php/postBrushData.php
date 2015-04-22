<?php
	require_once($_SERVER['DOCUMENT_ROOT'] . "/src/light.php");
	
	/*
	
	$strokeID = query($sql, "projects")["insert_id"];
	
	echo JSON_encode(array(
		strokeID => $strokeID,
		tempID => $_POST["tempID"]
	));
	*/
	
	$sql = "INSERT INTO `drawBrush`(`canvasID`, `data`) VALUES (" . $_POST["canvasID"] . ",'" . $_POST["data"] . "');";
	$syncID = query($sql, "projects")["insert_id"];
	echo JSON_encode(array(
		syncID => $syncID,
		tempID => $_POST["tempID"]
	));
?>