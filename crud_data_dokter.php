<?php
include 'koneksi.php';
$action = $_GET['action'];

if ($action == 'read') {
    $no = 1;
    $result = $koneksi->query("SELECT * FROM dokter");
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $row['no'] = $no;
        $data[] = $row;
        $no++;  
    }
    echo json_encode($data);

} elseif ($action == 'create') {
    $nama_dokter = $_POST['nama_dokter'];
    $spesialis = $_POST['spesialis'];
    $jenis_kelamin = $_POST['jenis_kelamin'];
    $tanggal_lahir = $_POST['tanggal_lahir'];
    $alamat = $_POST['alamat'];
    $handphone = $_POST['handphone'];
    $nomor_izin_praktik = $_POST['nomor_izin_praktik'];
    $tanggal_gabung = $_POST['tanggal_gabung'];

    $koneksi->query("INSERT INTO dokter (nama_dokter, spesialis, nomor_izin_praktik, jenis_kelamin, tanggal_lahir, alamat, handphone, tanggal_gabung ) VALUES ('$nama_dokter', '$spesialis', '$nomor_izin_praktik', '$jenis_kelamin', '$tanggal_lahir', '$alamat', '$handphone', '$tanggal_gabung')");

} elseif ($action == 'update') {

    $id = $_POST['dokter_id'];
    $nama_dokter = $_POST['nama_dokter'];
    $spesialis = $_POST['spesialis'];
    $jenis_kelamin = $_POST['jenis_kelamin'];
    $tanggal_lahir = $_POST['tanggal_lahir'];
    $alamat = $_POST['alamat'];
    $handphone = $_POST['handphone'];
    $nomor_izin_praktik = $_POST['nomor_izin_praktik'];
    $tanggal_gabung = $_POST['tanggal_gabung'];

    $koneksi->query("UPDATE dokter SET nama_dokter='$nama_dokter', spesialis='$spesialis', jenis_kelamin='$jenis_kelamin', tanggal_lahir='$tanggal_lahir', alamat='$alamat', handphone='$handphone', nomor_izin_praktik='$nomor_izin_praktik', tanggal_gabung='$tanggal_gabung' WHERE dokter_id=$id");

} elseif ($action == 'delete') {

    $id = $_POST['dokter_id'];
    $koneksi->query("DELETE FROM dokter WHERE dokter_id=$id");

} elseif ($action == 'getById') {
    $id = $_GET['dokter_id'];

    // Pakai prepared statement agar aman dari SQL Injection
    $stmt = $koneksi->prepare("SELECT * FROM dokter WHERE dokter_id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    $result = $stmt->get_result();
    $data = $result->fetch_assoc();

    if ($data) {
        echo json_encode($data); //Ini akan dikirim ke AJAX
    } else {
        echo json_encode(['status' => 'not_found']);
    }
}
