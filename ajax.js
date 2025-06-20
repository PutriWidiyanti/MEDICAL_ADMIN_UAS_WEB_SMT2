// Data Pasien
function loadDataPasien() {
    fetch('crud_data_pasien.php?action=read')
    .then(res => res.json())
    .then(data => {
        let options = '';
        let rows = '';
        data.forEach(k => {
            rows += `<tr>
            <td>${k.no}</td>
            <td>${k.no_rekam_mdis}</td>
            <td>${k.nama}</td>
            <td>${k.jenis_kelamin}</td>
            <td>${k.tanggal_lahir}</td>
            <td>${k.alamat}</td>
            <td>${k.handphone}</td>
            <td>${k.tanggal_daftar}</td>
            <td>
            <div class="form-button-action">
            <button
            type="button"
            data-bs-toggle="tooltip"
            title=""
            class="btn btn-link btn-primary btn-lg"
            data-original-title="Edit Data Pasien"
            onclick="editDataPasien(${k.pasien_id})"
            >
            <i class="fa fa-edit"></i>
            </button>
            <button
            type="button"
            data-bs-toggle="tooltip"
            title=""
            class="btn btn-link btn-danger"
            data-original-title="Hapus Data Pasien"
            onclick="deleteDataPasien(${k.pasien_id})"
            >
            <i class="fa fa-times"></i>
            </button>
            </div>
            </td>
            </tr>`;
        });
      if ($.fn.DataTable.isDataTable('#add-row')) {
          $('#add-row').DataTable().clear().destroy();
      }
      document.getElementById('data-pasien-list').innerHTML = rows;
      $('#add-row').DataTable({
          pageLength: 5
      });
  });
}

function inputDataPasien() {
    let form = new FormData(document.getElementById('formInputDataPasien'));
    fetch('crud_data_pasien.php?action=create', { method: 'POST', body: form })
    .then(() => {
        
        const modalElement = document.getElementById('inputDataPasien');
        document.getElementById('formInputDataPasien').reset();

        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();

        loadDataPasien();
    });
}

function updateDataPasien() {
    let form = new FormData(document.getElementById('formInputDataPasien'));
    fetch('crud_data_pasien.php?action=update', { method: 'POST', body: form })
        .then(() => {
            loadDataPasien();
            document.getElementById('formInputDataPasien').reset();
        });
}

function editDataPasien(id) {
    fetch(`crud_data_pasien.php?action=getById&pasien_id=${id}`)
    .then(response => response.json())
    .then(data => {
        if (data.status === 'not_found') {
        alert("Data tidak ditemukan");
        return;
      }
      document.getElementById('pasien_id').value = data.pasien_id;
      document.getElementById('nomor_rekam_medis').value = data.no_rekam_mdis;
      document.getElementById('nama_pasien').value = data.nama;
      document.getElementById('jenis_kelamin').value = data.jenis_kelamin;
      document.getElementById('tanggal_lahir').value = data.tanggal_lahir;
      document.getElementById('alamat').value = data.alamat;
      document.getElementById('handphone').value = data.handphone;
      document.getElementById('tanggal_daftar').value = data.tanggal_daftar;

       document.getElementById("submitBtn").onclick = updateDataPasien;

      // Tampilkan modal
      var modal = new bootstrap.Modal(document.getElementById('inputDataPasien'));
      modal.show();
    })
    .catch(error => {
      console.error('Terjadi kesalahan:', error);
    });
}

function openAddModal() {
  document.getElementById("formInputDataPasien").reset(); // kosongkan form
  document.getElementById("modalTitle").innerText = "Input Data Pasien";
  document.getElementById("submitBtn").onclick = inputDataPasien; // fungsi create
  var modal = new bootstrap.Modal(document.getElementById("inputDataPasien"));
  modal.show();
}

function deleteDataPasien(id) {
    if (confirm("Yakin ingin menghapus Data ini?")) {
        let form = new FormData();
        form.append('pasien_id', id);
        fetch('crud_data_pasien.php?action=delete', {
            method: 'POST',
            body: form
        }).then(() => {
            loadDataPasien();
            alert("Data Berhasil dihapus.");
        });
    }
}

//====================================== Data Dokter ===================================================================

function loadDataDokter() {
    fetch('crud_data_dokter.php?action=read')
    .then(res => res.json())
    .then(data => {
        let options = '';
        let rows = '';
        data.forEach(k => {
            rows += `<tr>
            <td>${k.no}</td>
            <td>${k.nama_dokter}</td>
            <td>${k.spesialis}</td>
            <td>${k.jenis_kelamin}</td>
            <td>${k.tanggal_lahir}</td>
            <td>${k.alamat}</td>
            <td>${k.handphone}</td>
            <td>${k.nomor_izin_praktik}</td>
            <td>${k.tanggal_gabung}</td>
            <td>
            <div class="form-button-action">
            <button
            type="button"
            data-bs-toggle="tooltip"
            title=""
            class="btn btn-link btn-primary btn-lg"
            data-original-title="Edit Data Dokter"
            onclick="editDataDokter(${k.dokter_id})"
            >
            <i class="fa fa-edit"></i>
            </button>
            <button
            type="button"
            data-bs-toggle="tooltip"
            title=""
            class="btn btn-link btn-danger"
            data-original-title="Hapus Data Dokter"
            onclick="deleteDataDokter(${k.dokter_id})"
            >
            <i class="fa fa-times"></i>
            </button>
            </div>
            </td>
            </tr>`;
        });
      if ($.fn.DataTable.isDataTable('#add-row')) {
          $('#add-row').DataTable().clear().destroy();
      }
      document.getElementById('data-dokter-list').innerHTML = rows;
      $('#add-row').DataTable({
          pageLength: 5
      });
  });
}

function inputDataDokter() {
    let form = new FormData(document.getElementById('formInputDataDokter'));
    fetch('crud_data_dokter.php?action=create', { method: 'POST', body: form })
    .then(() => {
        
        const modalElement = document.getElementById('inputDataDokter');
        document.getElementById('formInputDataDokter').reset();

        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();

        loadDataDokter();
    });
}

function updateDataDokter() {
    let form = new FormData(document.getElementById('formInputDataDokter'));
    fetch('crud_data_dokter.php?action=update', { method: 'POST', body: form })
        .then(() => {
            loadDataDokter();
            document.getElementById('formInputDataDokter').reset();
        });
}

function editDataDokter(id) {
    fetch(`crud_data_dokter.php?action=getById&dokter_id=${id}`)
    .then(response => response.json())
    .then(data => {
        if (data.status === 'not_found') {
        alert("Data tidak ditemukan");
        return;
      }
      document.getElementById('dokter_id').value = data.dokter_id;
      document.getElementById('nama_dokter').value = data.nama_dokter;
      document.getElementById('spesialis').value = data.spesialis;
      document.getElementById('jenis_kelamin').value = data.jenis_kelamin;
      document.getElementById('tanggal_lahir').value = data.tanggal_lahir;
      document.getElementById('alamat').value = data.alamat;
      document.getElementById('handphone').value = data.handphone;
      document.getElementById('nomor_izin_praktik').value = data.nomor_izin_praktik;
      document.getElementById('tanggal_gabung').value = data.tanggal_gabung;

       document.getElementById("submitBtn").onclick = updateDataDokter;

      // Tampilkan modal
      var modal = new bootstrap.Modal(document.getElementById('inputDataDokter'));
      modal.show();
    })
    .catch(error => {
      console.error('Terjadi kesalahan:', error);
    });
}

function openAddModalDokter() {
  document.getElementById("formInputDataDokter").reset(); // kosongkan form
  document.getElementById("modalTitle").innerText = "Input Data Dokter";
  document.getElementById("submitBtn").onclick = inputDataDokter; // fungsi create
  var modal = new bootstrap.Modal(document.getElementById("inputDataDokter"));
  modal.show();
}

function deleteDataDokter(id) {
    if (confirm("Yakin ingin menghapus Data ini?")) {
        let form = new FormData();
        form.append('dokter_id', id);
        fetch('crud_data_dokter.php?action=delete', {
            method: 'POST',
            body: form
        }).then(() => {
            loadDataDokter();
            alert("Data Berhasil dihapus.");
        });
    }
}

//========================== Data Kunjungan ========================================================
function loadDataKunjungan() {
    fetch('crud_data_kunjungan.php?action=read')
    .then(res => res.json())
    .then(data => {
        let options = '';
        let rows = '';
        data.forEach(k => {
            rows += `<tr>
            <td>${k.no}</td>
            <td>${k.nama}</td>
            <td>${k.tanggal_kunjungan}</td>
            <td>${k.keluhan}</td>
            <td>${k.nama_dokter}</td>
            <td>${k.catatan}</td>
            <td>
            <div class="form-button-action">
            <button
            type="button"
            data-bs-toggle="tooltip"
            title=""
            class="btn btn-link btn-primary btn-lg"
            data-original-title="Edit Data Kunjungan"
            onclick="editDataKunjungan(${k.kunjungan_id})"
            >
            <i class="fa fa-edit"></i>
            </button>
            <button
            type="button"
            data-bs-toggle="tooltip"
            title=""
            class="btn btn-link btn-danger"
            data-original-title="Hapus Data Kunjungan"
            onclick="deleteDataKunjungan(${k.kunjungan_id})"
            >
            <i class="fa fa-times"></i>
            </button>
            </div>
            </td>
            </tr>`;
        });
      if ($.fn.DataTable.isDataTable('#add-row')) {
          $('#add-row').DataTable().clear().destroy();
      }
      document.getElementById('data-kunjungan-list').innerHTML = rows;
      $('#add-row').DataTable({
          pageLength: 5
      });
  });
}

function inputDataKunjungan() {
    let form = new FormData(document.getElementById('formInputDataKunjungan'));
    fetch('crud_data_kunjungan.php?action=create', { method: 'POST', body: form })
    .then(() => {
        
        const modalElement = document.getElementById('inputDataKunjungan');
        document.getElementById('formInputDataKunjungan').reset();

        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();

        loadDataKunjungan();
    });
}

function updateDataKunjungan() {
    let form = new FormData(document.getElementById('formInputDataKunjungan'));
    fetch('crud_data_kunjungan.php?action=update', { method: 'POST', body: form })
        .then(() => {
            loadDataKunjungan();
            document.getElementById('formInputDataKunjungan').reset();
        });
}

function editDataKunjungan(id) {
    fetch(`crud_data_kunjungan.php?action=getById&kunjungan_id=${id}`)
    .then(response => response.json())
    .then(data => {
        if (data.status === 'not_found') {
        alert("Data tidak ditemukan");
        return;
      }

      loadSelectData(data.pasien_id, data.dokter_id);

      document.getElementById('kunjungan_id').value = data.kunjungan_id;
     // document.getElementById('nama_pasien').value = data.pasien_id;
      document.getElementById('tanggal_kunjungan').value = data.tanggal_kunjungan.split(" ")[0];;
      document.getElementById('keluhan').value = data.keluhan;
      //document.getElementById('nama_dokter').value = data.dokter_id;
      document.getElementById('catatan').value = data.catatan;

       document.getElementById("submitBtn").onclick = updateDataKunjungan;

      // Tampilkan modal
      var modal = new bootstrap.Modal(document.getElementById('inputDataKunjungan'));
      modal.show();
    })
    .catch(error => {
      console.error('Terjadi kesalahan:', error);
    });
}

function loadSelectData(pasien_id, dokter_id) {
  fetch('crud_data_kunjungan.php?action=getSelectData')
    .then(response => response.json())
    .then(data => {
      const pasienSelect = document.getElementById('nama_pasien');
      pasienSelect.innerHTML = '<option value="">-- Nama Pasien --</option>';
      data.pasien.forEach(item => {
        const option = document.createElement('option');
        option.value = item.pasien_id;
        option.textContent = item.nama;

        if (item.pasien_id == pasien_id) {
          option.selected = true;
        }

        pasienSelect.appendChild(option);
      });

      const dokterSelect = document.getElementById('nama_dokter');
      dokterSelect.innerHTML = '<option value="">-- Nama Dokter --</option>';
      data.dokter.forEach(item => {
        const option = document.createElement('option');
        option.value = item.dokter_id;
        option.textContent = item.nama_dokter;

        if (item.dokter_id == dokter_id) {
          option.selected = true;
        }
        dokterSelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error:', error));
}


function openAddModalKunjungan() {
  document.getElementById("formInputDataKunjungan").reset(); // kosongkan form
  document.getElementById("modalTitle").innerText = "Input Data Kunjungan";
  document.getElementById("submitBtn").onclick = inputDataKunjungan; // fungsi create
  loadSelectData(0,0);
  var modal = new bootstrap.Modal(document.getElementById("inputDataKunjungan"));
  modal.show();
}

function deleteDataKunjungan(id) {
    if (confirm("Yakin ingin menghapus Data ini?")) {
        let form = new FormData();
        form.append('kunjungan_id', id);
        fetch('crud_data_kunjungan.php?action=delete', {
            method: 'POST',
            body: form
        }).then(() => {
            loadDataKunjungan();
            alert("Data Berhasil dihapus.");
        });
    }
}

//================================================== Dashboard ================================
function loadCardCategory() {
  fetch('dashboard.php?action=card-category')
    .then(res => res.json())
    .then(data => {
      document.getElementById('countPasien').textContent = data.pasien.toLocaleString();
      document.getElementById('countDokter').textContent = data.dokter.toLocaleString();
      document.getElementById('countKunjungan').textContent = data.kunjungan.toLocaleString();
    })
    .catch(err => console.error('Gagal ambil data:', err));
}

function loadStatistics() {
  const ctx = document.getElementById('statisticsData').getContext('2d');

  fetch('dashboard.php?action=statistics')
    .then(response => response.json())
    .then(data => {
      const statisticsChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Data Pasien",
              borderColor: '#f3545d',
              pointBackgroundColor: 'rgba(243, 84, 93, 0.6)',
              pointRadius: 3,
              backgroundColor: 'rgba(243, 84, 93, 0.4)',
              fill: true,
              borderWidth: 2,
              data: data.pasien
            },
            {
              label: "Data Dokter",
              borderColor: '#fdaf4b',
              pointBackgroundColor: 'rgba(253, 175, 75, 0.6)',
              pointRadius: 3,
              backgroundColor: 'rgba(253, 175, 75, 0.4)',
              fill: true,
              borderWidth: 2,
              data: data.dokter
            },
            {
              label: "Data Kunjungan",
              borderColor: '#177dff',
              pointBackgroundColor: 'rgba(23, 125, 255, 0.6)',
              pointRadius: 3,
              backgroundColor: 'rgba(23, 125, 255, 0.4)',
              fill: true,
              borderWidth: 2,
              data: data.kunjungan
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Statistik Bulanan'
            }
          }
        }
      });
    })
    .catch(error => console.error('Gagal memuat data chart:', error));

}
