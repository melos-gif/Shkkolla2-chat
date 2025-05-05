<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "shmt_lutfi";

$conn = new mysqli($host, $user, $password, $dbname);

$email = $_POST['email'];
$fjalekalimi = $_POST['fjalekalimi'];

$sql = "SELECT * FROM perdoruesit WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user && password_verify($fjalekalimi, $user['fjalekalimi'])) {
    echo "Sukses";
} else {
    echo "Gabim në kredenciale!";
}
?>
