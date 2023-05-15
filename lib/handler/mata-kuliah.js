const mataKuliah = [
  {
    nama: "MATEMATIKA TEKNIK",
    link: "https://elearning.unsri.ac.id/mod/attendance/view.php?id=85071",
    waktu: "Senin 08:00",
  },
  {
    nama: "MEDAN ELEKTROMAGNETIK",
    link: "https://elearning.unsri.ac.id/mod/attendance/view.php?id=94187",
    waktu: "Senin 10:30",
  },
  {
    nama: "RANGKAIAN TRANSIEN DAN LAPLACE",
    link: "https://elearning.unsri.ac.id/mod/attendance/view.php?id=101010",
    waktu: "Selasa 08:00",
  },
  {
    nama: "METODE NUMERIK",
    link: "https://elearning.unsri.ac.id/mod/attendance/view.php?id=87419",
    waktu: "Rabu 08:00",
  },
  {
    nama: "DASAR SISTEM KENDALI",
    link: "https://elearning.unsri.ac.id/mod/attendance/view.php?id=94825",
    waktu: "Kamis 08:00",
  },
  {
    nama: "MIKROKONTROLER",
    link: "https://elearning.unsri.ac.id/mod/attendance/view.php?id=103610",
    waktu: "Jumat 08:00",
  },
  {
    nama: "BASIS DATA",
    link: "https://elearning.unsri.ac.id/mod/attendance/view.php?id=93433",
    waktu: "Jumat 08:00",
  },
];

function getMataKuliah() {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const dateNow = new Date();
  const dayName = days[dateNow.getDay()];
  let resultMataKuliah = "";
  mataKuliah.forEach((matkul) => {
    if (matkul.waktu.split(" ")[0] == dayName) {
      resultMataKuliah += `\n\nMata Kuliah: ${matkul.nama}\nWaktu: ${matkul.waktu} WIB`;
    }
  });
  if (resultMataKuliah !== "") {
    return `Jadwal kuliah yang tersedia hari ini:${resultMataKuliah}`;
  }
  return null;
}

function getLinkAbsen() {
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
  mataKuliah.forEach((matkul) => {
    if (matkul.waktu == waktuSekarang) {
      resultMataKuliah += `\n\nMata Kuliah: ${matkul.nama}\nLink: ${matkul.link}`;
    }
  });
  if (resultMataKuliah !== "") {
    return `Sekarang ada absen!${resultMataKuliah}`;
  }
  return null;
}

module.exports = {
  getMataKuliah,
  getLinkAbsen,
};
