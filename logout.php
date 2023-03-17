<?php
session_start();
session_unset();
session_destroy();
header('Location: index.php');
exit;
?>
<button type="submit">Entrar</button>