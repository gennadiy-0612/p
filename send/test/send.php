<?php
$headers = 'Content-Type: text/html; charset="utf-8"';
$to = 'tina@stinoy.com.ua';//Куда отправить
$theme = 'Хочу записаться на курс';//Название сообщения
// Сообщение
$name = htmlspecialchars($_POST["name"]);
$phone = htmlspecialchars($_POST["Phone"]);
$email = htmlspecialchars($_POST["email"]);
$text = htmlspecialchars($_POST["message"]);
$message = 'Имя: ' . $name . ', Телефон: ' . $phone. ', Email: ' . $email . ', Текст: ' . $text;

// На случай если какая-то строка письма длиннее 10000 символов мы используем wordwrap()
$message = wordwrap($message, 10000, "\r\n");
// Отправляем

if (mail($to, $theme, $message, $headers)) {
  echo '<h1>Ваше сообщение отправлено</h1>';
  echo '<p>Ваше имя ', $name, '</p>';
  echo '<p>Ваш телефон ', $phone, '</p>';
  echo '<p>Ваш email ', $email, '</p>';
  echo '<p>Текст Вашего сообщения ', $text, '</p>';
} else echo "nothing";
