 <?php
$dir    = 'filedrop';
$files = scandir($dir);
echo json_encode($files);
?>