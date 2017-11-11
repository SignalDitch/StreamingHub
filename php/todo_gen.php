 <?php
$list = file_get_contents('todo.txt');
echo date("F d Y H:i:s.", filectime('todo.txt')) . "$$$<br />" . nl2br($list);
?>