<?php
include 'koneksi.php';
$action = $_GET['action'];

if ($action == 'read') {
    $no = 1;
    $result = $koneksi->query("SELECT * FROM pasien");
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $row['no'] = $no;
        $data[] = $row;
        $no++;  
    }
    echo json_encode($data);

} elseif ($action == 'create') {
    $nomor_rekam_medis = $_POST['nomor_rekam_medis'];
    $nama = $_POST['nama_pasien'];
    $jenis_kelamin = $_POST['jenis_kelamin'];
    $tanggal_lahir = $_POST['tanggal_lahir'];
    $alamat = $_POST['alamat'];
    $handphone = $_POST['handphone'];
    $tanggal_daftar = $_POST['tanggal_daftar'];

    $koneksi->query("INSERT INTO pasien (no_rekam_mdis, nama, jenis_kelamin, tanggal_lahir, alamat, handphone, tanggal_daftar) VALUES ('$nomor_rekam_medis', '$nama', '$jenis_kelamin', '$tanggal_lahir', '$alamat', '$handphone', '$tanggal_daftar')");

} elseif ($action == 'update') {

    $id = $_POST['pasien_id'];
    $nomor_rekam_medis = $_POST['nomor_rekam_medis'];
    $nama = $_POST['nama_pasien'];
    $jenis_kelamin = $_POST['jenis_kelamin'];
    $tanggal_lahir = $_POST['tanggal_lahir'];
    $alamat = $_POST['alamat'];
    $handphone = $_POST['handphone'];
    $tanggal_daftar = $_POST['tanggal_daftar'];

    $koneksi->query("UPDATE pasien SET no_rekam_mdis='$nomor_rekam_medis', nama='$nama', jenis_kelamin='$jenis_kelamin', tanggal_lahir='$tanggal_lahir', alamat='$alamat', handphone='$handphone', tanggal_daftar='$tanggal_daftar' WHERE pasien_id=$id");

} elseif ($action == 'delete') {

    $id = $_POST['pasien_id'];
    $koneksi->query("DELETE FROM pasien WHERE pasien_id=$id");

} elseif ($action == 'getById') {
    $id = $_GET['pasien_id'];

    // Pakai prepared statement agar aman dari SQL Injection
    $stmt = $koneksi->prepare("SELECT * FROM pasien WHERE pasien_id = ?");
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
