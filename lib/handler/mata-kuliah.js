const mataKuliah = [
  {
    nama: "Metode Penulisan Ilmiah (Kelas A Indralaya)",
    link: "https://elearning.unsri.ac.id/mod/attendance/view.php?id=141860",
    waktu: "Senin 13:00",
  },
  {
    nama: "Metode Penulisan Ilmiah (Kelas B Indralaya)",
    link: "https://elearning.unsri.ac.id/mod/attendance/view.php?id=141860",
    waktu: "Senin 14:40",
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
