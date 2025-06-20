<?php
include 'koneksi.php';
$action = $_GET['action'];

if ($_GET['action'] === 'card-category') {

    $data = [];

$sqlPasien = "SELECT COUNT(*) as total FROM pasien";
$resultPasien = $koneksi->query($sqlPasien);
    $rowPasien = $resultPasien->fetch_assoc();
    $data['pasien'] = $rowPasien['total'];

    $sqlDokter = "SELECT COUNT(*) as total FROM dokter";
$resultDokter = $koneksi->query($sqlDokter);
    $rowDokter = $resultDokter->fetch_assoc();
    $data['dokter'] = $rowDokter['total'];

    $sqlKunjungan = "SELECT COUNT(*) as total FROM kunjungan";
$resultKunjungan = $koneksi->query($sqlKunjungan);
    $rowKunjungan = $resultKunjungan->fetch_assoc();
    $data['kunjungan'] = $rowKunjungan['total'];    

    echo json_encode($data);
    exit;
} elseif ($_GET['action'] === 'statistics') {
$pasien = array_fill(0, 12, 0);
$dokter = array_fill(0, 12, 0);
$kunjungan = array_fill(0, 12, 0);

$queryPasien = "SELECT MONTH(tanggal_daftar) as bulan, COUNT(*) as total FROM pasien GROUP BY bulan";
$resultPasien = $koneksi->query($queryPasien);
while ($row = $resultPasien->fetch_assoc()) {
    $bulan = (int)$row['bulan'];
if ($bulan >= 1 && $bulan <= 12) {
    $pasien[$bulan - 1] = (int)$row['total'];
}

}

// dokter
$queryDokter = "SELECT MONTH(tanggal_lahir) as bulan, COUNT(*) as total FROM dokter GROUP BY bulan";
$resultDokter = $koneksi->query($queryDokter);
while ($row = $resultDokter->fetch_assoc()) {
    $bulan = (int)$row['bulan'];
    if ($bulan >= 1 && $bulan <= 12) {
        $dokter[$bulan - 1] = (int)$row['total'];
    }
}

// kunjungan
$queryKunjungan = "SELECT MONTH(tanggal_kunjungan) as bulan, COUNT(*) as total FROM kunjungan GROUP BY bulan";
$resultKunjungan = $koneksi->query($queryKunjungan);
while ($row = $resultKunjungan->fetch_assoc()) {
    $bulan = (int)$row['bulan'];
    if ($bulan >= 1 && $bulan <= 12) {
        $kunjungan[$bulan - 1] = (int)$row['total'];
    }
}

header('Content-Type: application/json');
echo json_encode([
    'pasien' => array_values($pasien),
    'dokter' => array_values($dokter),
    'kunjungan' => array_values($kunjungan)
]);
}
