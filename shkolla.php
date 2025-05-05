<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "projekte_shkencore";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Lidhja me databazën dështoi: " . $e->getMessage());
}
?>
<?php
require_once 'config/database.php';
require_once 'includes/header.php';

$query = "SELECT * FROM projekte ORDER BY data_krijimit DESC";
$projekte = $pdo->query($query)->fetchAll(PDO::FETCH_ASSOC);
?>

<div class="container">
    <h1>Projektet Shkencore</h1>
    
    <div class="projects-grid">
        <?php foreach ($projekte as $projekti): ?>
        <div class="project-card">
            <div class="project-image">
                <img src="<?= htmlspecialchars($projekti['foto']) ?>" alt="<?= htmlspecialchars($projekti['titulli']) ?>">
            </div>
            <div class="project-content">
                <h3><?= htmlspecialchars($projekti['titulli']) ?></h3>
                <div class="project-meta">
                    <span><?= htmlspecialchars($projekti['kategoria']) ?></span>
                </div>
                <p><?= substr(htmlspecialchars($projekti['pershkrimi']), 0, 150) ?>...</p>
                <a href="project.php?id=<?= $projekti['id'] ?>" class="btn">Shiko Më Shumë</a>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
</div>

<?php require_once 'includes/footer.php'; ?>

<?php
require_once 'config/database.php';

if (!isset($_GET['id'])) {
    header("Location: index.php");
    exit;
}

$id = $_GET['id'];
$query = "SELECT * FROM projekte WHERE id = ?";
$stmt = $pdo->prepare($query);
$stmt->execute([$id]);
$projekti = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$projekti) {
    header("Location: index.php");
    exit;
}
?>

<!-- HTML për shfaqjen e detajuar të projektit -->
<div class="project-details">
    <h2><?= htmlspecialchars($projekti['titulli']) ?></h2>
    <div class="project-tech">
        <?php 
        $teknologjite = explode(',', $projekti['teknologjite']);
        foreach ($teknologjite as $tech): 
        ?>
            <span class="tech-tag"><?= trim($tech) ?></span>
        <?php endforeach; ?>
    </div>
    
    <div class="code-container">
        <pre><code><?= htmlspecialchars($projekti['kodi']) ?></code></pre>
    </div>
</div>
<?php
session_start();
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    $query = "SELECT * FROM perdoruesit WHERE email = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    if ($user && password_verify($password, $user['fjalekalimi'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_role'] = $user['roli'];
        header("Location: dashboard.php");
        exit;
    } else {
        $error = "Email ose fjalëkalim i gabuar";
    }
}
?>

<!-- Forma e Login -->
<?php
session_start();
require_once '../config/database.php';

if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin') {
    header("Location: login.php");
    exit;
}

// Logjika për CRUD operacione
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['shto_projektin'])) {
        // Logjika për shtimin e projektit
    } elseif (isset($_POST['modifiko_projektin'])) {
        // Logjika për modifikimin
    }
}

// Marrja e projekteve për shfaqje
$projekte = $pdo->query("SELECT * FROM projekte")->fetchAll();
?>

<!-- Paneli i Adminit -->
<div class="admin-panel">
    <h2>Menaxhimi i Projekteve</h2>
    
    <!-- Forma për shtimin e projektit -->
    <form method="POST" enctype="multipart/form-data">
        <input type="text" name="titulli" placeholder="Titulli i Projektit" required>
        <textarea name="pershkrimi" placeholder="Përshkrimi" required></textarea>
        <input type="text" name="kategoria" placeholder="Kategoria" required>
        <input type="text" name="teknologjite" placeholder="Teknologjitë (ndarë me presje)" required>
        <textarea name="kodi" placeholder="Kodi i Projektit" required></textarea>
        <input type="file" name="foto" accept="image/*">
        <button type="submit" name="shto_projektin">Shto Projektin</button>
    </form>
    
    <!-- Lista e projekteve për editim -->
    <div class="project-list">
        <?php foreach ($projekte as $projekti): ?>
        <div class="project-item">
            <form method="POST">
                <input type="hidden" name="id" value="<?= $projekti['id'] ?>">
                <input type="text" name="titulli" value="<?= htmlspecialchars($projekti['titulli']) ?>">
                <!-- Fusha të tjera -->
                <button type="submit" name="modifiko_projektin">Ruaj Ndryshimet</button>
                <button type="submit" name="fshij_projektin">Fshij</button>
            </form>
        </div>
        <?php endforeach; ?>
    </div>
</div>
<?php
function sanitizeInput($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}

function uploadImage($file) {
    $targetDir = "public/images/";
    $targetFile = $targetDir . basename($file["name"]);
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
    
    // Kontrollo nëse file është imazh
    $check = getimagesize($file["tmp_name"]);
    if ($check === false) {
        return false;
    }
    
    // Kontrollo madhësinë e file
    if ($file["size"] > 500000) {
        return false;
    }
    
    // Lejo formatet e caktuara
    if (!in_array($imageFileType, ["jpg", "png", "jpeg", "gif"])) {
        return false;
    }
    
    if (move_uploaded_file($file["tmp_name"], $targetFile)) {
        return $targetFile;
    }
    return false;
}
?>