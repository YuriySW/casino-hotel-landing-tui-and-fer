<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /write.html');
    exit;
}

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

if ($name === '' || $email === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: /write.html');
    exit;
}

header('Location: /thanks.html');
exit;
