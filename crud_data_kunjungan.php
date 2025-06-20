<?php
include 'koneksi.php';
$action = $_GET['action'];

if ($action == 'read') {
    $no = 1;
    $result = $koneksi->query("SELECT k.kunjungan_id, p.pasien_id, p.nama, k.tanggal_kunjungan, k.keluhan, d.dokter_id, d.nama_dokter, k.catatan FROM kunjungan k INNER JOIN pasien p ON p.pasien_id = k.pasien_id INNER JOIN dokter d ON d.dokter_id = k.dokter_id");
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $row['no'] = $no;
        $data[] = $row;
        $no++;  
    }
    echo json_encode($data);

} elseif ($action == 'create') {
    $nama_pasien = $_POST['nama_pasien'];
    $tanggal_kunjungan = $_POST['tanggal_kunjungan'];
    $keluhan = $_POST['keluhan'];
    $nama_dokter = $_POST['nama_dokter'];
    $catatan = $_POST['catatan'];

    $koneksi->query("INSERT INTO kunjungan (pasien_id, tanggal_kunjungan, keluhan, dokter_id, catatan) VALUES ('$nama_pasien', '$tanggal_kunjungan', '$keluhan', '$nama_dokter', '$catatan')");

} elseif ($action == 'update') {

    $id = $_POST['kunjungan_id'];
    $pasien_id = $_POST['nama_pasien'];
    $tanggal_kunjungan = $_POST['tanggal_kunjungan'];
    $keluhan = $_POST['keluhan'];
    $dokter_id = $_POST['nama_dokter'];
    $catatan = $_POST['catatan'];

    $koneksi->query("UPDATE kunjungan SET pasien_id='$pasien_id', tanggal_kunjungan='$tanggal_kunjungan', keluhan='$keluhan', dokter_id='$dokter_id', catatan='$catatan' WHERE kunjungan_id=$id");

} elseif ($action == 'delete') {

    $id = $_POST['kunjungan_id'];
    $koneksi->query("DELETE FROM kunjungan WHERE kunjungan_id=$id");

} elseif ($action == 'getById') {
    $id = $_GET['kunjungan_id'];

    // Pakai prepared statement agar aman dari SQL Injection
    $stmt = $koneksi->prepare("SELECT * FROM kunjungan WHERE kunjungan_id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    $result = $stmt->get_result();
    $data = $result->fetch_assoc();

    if ($data) {
        echo json_encode($data); //Ini akan dikirim ke AJAX
    } else {
        echo json_encode(['status' => 'not_found']);
    }
} elseif ($action == 'getSelectData') {

    $data = [
    'pasien' => [],
    'dokter' => []
];

// Ambil data pasien
$sqlPasien = "SELECT pasien_id, nama FROM pasien";
$resultPasien = $koneksi->query($sqlPasien);
if ($resultPasien->num_rows > 0) {
    while ($row = $resultPasien->fetch_assoc()) {
        $data['pasien'][] = $row;
    }
}

// Ambil data dokter
$sqlDokter = "SELECT dokter_id, nama_dokter FROM dokter";
$resultDokter = $koneksi->query($sqlDokter);
if ($resultDokter->num_rows > 0) {
    while ($row = $resultDokter->fetch_assoc()) {
        $data['dokter'][] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($data);
}


