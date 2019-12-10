<?php

error_reporting(E_ERROR | E_PARSE);

$data = [];
$arrayData = array();

$data['name'] = $_POST['name'];
$data['email'] = $_POST['email'];
$data['comment'] = $_POST['comment'];
array_push($arrayData, $data);
if (file_get_contents("array.json") == FALSE) {
	file_put_contents("array.json",json_encode($arrayData));
}else{
$fullData = file_get_contents("array.json");
$temp = json_decode($fullData,true);
array_push($temp, $data);
file_put_contents("array.json",json_encode($temp));
}
$fullData = file_get_contents("array.json");
$temp = json_decode($fullData,true);

echo "success";


?>