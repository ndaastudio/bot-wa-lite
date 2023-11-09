const mataKuliahTTI = [
  {
    nama: "Metode Penulisan Ilmiah",
    kelas: "A Indralaya",
    link: "https://elearning.unsri.ac.id/mod/attendance/view.php?id=141860",
    waktu: "Senin 13:00",
  },
  {
    nama: "Metode Penulisan Ilmiah",
    kelas: "B Indralaya",
    link: "https://elearning.unsri.ac.id/mod/attendance/view.php?id=141860",
    waktu: "Senin 14:40",
  },
  {
    nama: "Pengolahan Sinyal Digital",
    password: "#PSDv%9IDL1",
    link: "https://elearning.unsri.ac.id/mod/attendance/view.php?id=133916",
    waktu: "Selasa 08:00",
  },
  {
    nama: "Komunikasi Data",
    link: "https://elearning.unsri.ac.id/mod/attendance/view.php?id=143618",
    waktu: "Rabu 10:30",
  },
  {
    nama: "Praktikum Teknik Telekomunikasi Dan Informasi",
    link: "https://elearning.unsri.ac.id/mod/attendance/view.php?id=146540",
    waktu: "Kamis 08:00",
  },
];

function getMataKuliahTTI() {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const dateNow = new Date();
  const dayName = days[dateNow.getDay()];
  let resultMataKuliah = "";
  mataKuliahTTI.forEach((matkul) => {
    if (matkul.waktu.split(" ")[0] == dayName) {
      resultMataKuliah += `\n\nMata Kuliah: ${matkul.nama}\nWaktu: ${matkul.waktu} WIB`;
    }
  });
  if (resultMataKuliah !== "") {
    return `Jadwal kuliah yang tersedia hari ini:${resultMataKuliah}`;
  }
  return "_Tidak ada jadwal kuliah hari ini untuk Teknik Elektro_";
}

function getLinkAbsenTTI() {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const dateNow = new Date();
  const dayName = days[dateNow.getDay()];
  const timeNow = dateNow.toLocaleTimeString("id-ID", {
    timeZone: "Asia/Jakarta",
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  });
  const waktuSekarang = `${dayName} ${timeNow}`.replace(".", ":");
  let resultMataKuliah = "";
  mataKuliahTTI.forEach((matkul) => {
    if (matkul.waktu == waktuSekarang) {
      resultMataKuliah += `\n\nMata Kuliah: ${matkul.nama}${
        matkul.kelas ? `\nKelas: ${matkul.kelas}` : ""
      }${matkul.password ? `\nPassword: ${matkul.password}` : ""}\nLink: ${
        matkul.link
      }`;
    }
  });
  if (resultMataKuliah !== "") {
    return `Sekarang ada absen!${resultMataKuliah}\n\n`;
  }
  return null;
}

module.exports = {
  getMataKuliahTTI,
  getLinkAbsenTTI,
};
