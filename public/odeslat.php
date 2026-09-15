<?php
// Příjem kontaktního formuláře z /kontakt/. Běží na Wedosu (PHP), Astro ho jen zkopíruje do dist/.
// Pošle poptávku na info@scandy.cz a přesměruje na děkovací stránku, při chybě zpět na formulář.
declare(strict_types=1);

const PRIJEMCE = 'info@scandy.cz';
// Odesílatel musí být adresa z domény tohoto hostingu, jinak Wedos poštu nepustí ven.
const ODESILATEL = 'info@scandy.cz';
const DEKUJEME = '/dekujeme/';
const CHYBA = '/kontakt/?chyba=1#formular';

function presmerovat(string $kam): never
{
    header('Location: ' . $kam, true, 303);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    presmerovat('/kontakt/');
}

// Past na roboty: pole „web“ je skryté, člověk ho nevyplní. Robotovi předstíráme úspěch.
if (!empty($_POST['web'])) {
    presmerovat(DEKUJEME);
}

// Jednořádková pole: bez zalomení (ochrana hlaviček e-mailu), oříznutá na rozumnou délku.
function radek(string $klic, int $max): string
{
    $hodnota = (string) ($_POST[$klic] ?? '');
    $hodnota = str_replace(["\r", "\n"], ' ', $hodnota);
    return mb_substr(trim($hodnota), 0, $max);
}

$jmeno   = radek('name', 100);
$email   = radek('email', 200);
$telefon = radek('phone', 50);
$varianta = radek('variant', 20);
$zprava  = mb_substr(trim((string) ($_POST['message'] ?? '')), 0, 5000);

if ($jmeno === '' || $zprava === '' || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    presmerovat(CHYBA);
}

$velikosti = [
    ''    => 'ještě neví',
    '40'  => 'TINYHOUSE 40 m²',
    '55'  => 'TINYHOUSE 55 m²',
    'obe' => 'obě, chce porovnat',
];
$velikost = $velikosti[$varianta] ?? $varianta;

$telo = "Nová poptávka z webu scandy.cz\n\n"
    . "Jméno:    {$jmeno}\n"
    . "E-mail:   {$email}\n"
    . "Telefon:  " . ($telefon !== '' ? $telefon : 'neuvedeno') . "\n"
    . "Velikost: {$velikost}\n\n"
    . "Zpráva:\n{$zprava}\n\n"
    . "Odesláno: " . date('j. n. Y H:i') . "\n"
    . "IP:       " . ($_SERVER['REMOTE_ADDR'] ?? '') . "\n";

$hlavicky = [
    'From: ' . mb_encode_mimeheader('Web scandy.cz', 'UTF-8') . ' <' . ODESILATEL . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

$predmet = mb_encode_mimeheader('Poptávka z webu: ' . $jmeno, 'UTF-8');

$odeslano = mail(PRIJEMCE, $predmet, $telo, implode("\r\n", $hlavicky), '-f' . ODESILATEL);

presmerovat($odeslano ? DEKUJEME : CHYBA);
