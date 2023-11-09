const mataKuliahTekkim = [
  {
    nama: "Ekstraksi & Leaching",
    link: "https://elearning.unsri.ac.id/mod/attendance/view.php?id=140078",
    waktu: "Senin 08:00",
  },
  {
    nama: "Distilasi & Absorbsi",
    link: "https://elearning.unsri.ac.id/mod/attendance/view.php?id=136370",
    waktu: "Senin 09:40",
  },
  {
    nama: "Otk",
    link: "https://elearning.unsri.ac.id/mod/attendance/view.php?id=139988",
    waktu: "Senin 13:00",
  },
  {
    nama: "Membran",
    link: "https://elearning.unsri.ac.id/mod/attendance/view.php?id=136420",
    waktu: "Senin 13:00",
  },
  {
    nama: "OPP",
    link: "https://elearning.unsri.ac.id/mod/attendance/view.php?id=143130",
    waktu: "Selasa 08:00",
  },
  {
    nama: "Nuklir",
    link: "https://elearning.unsri.ac.id/course/view.php?id=5991",
    waktu: "Selasa 13:00",
  },
  {
    nama: "Prak bio",
    link: "https://elearning.unsri.ac.id/calendar/view.php?view=day&time=1692723600",
    waktu: "Rabu 09:40",
  },
  {
    nama: "Nano",
    link: "https://elearning.unsri.ac.id/mod/attendance/view.php?id=136748",
    waktu: "Rabu 14:40",
  },
  {
    nama: "Teknologi Biopros",
    link: "https://elearning.unsri.ac.id/mod/attendance/view.php?id=135180",
    waktu: "Kamis 08:00",
  },
  {
    nama: "Migas",
    link: "https://elearning.unsri.ac.id/mod/attendance/view.php?id=138585",
    waktu: "Jumat 08:00",
  },
  {
    nama: "Testing Absen Mention Member",
    link: "https://elearning.unsri.ac.id/mod/attendance/view.php?id=TESTING",
    waktu: "Kamis 14:10",
  },
];

function getMataKuliahTekkim() {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const dateNow = new Date();
  const dayName = days[dateNow.getDay()];
  let resultMataKuliah = "";
  mataKuliahTekkim.forEach((matkul) => {
    if (matkul.waktu.split(" ")[0] == dayName) {
      resultMataKuliah += `\n\nMata Kuliah: ${matkul.nama}\nWaktu: ${matkul.waktu} WIB`;
    }
  });
  if (resultMataKuliah !== "") {
    return `Jadwal kuliah yang tersedia hari ini:${resultMataKuliah}`;
  }
  return "_Tidak ada jadwal kuliah hari ini untuk Teknik Kimia_";
}

function getLinkAbsenTekkim() {
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
  mataKuliahTekkim.forEach((matkul) => {
    if (matkul.waktu == waktuSekarang) {
      resultMataKuliah += `\n\nMata Kuliah: ${matkul.nama}${
        matkul.kelas ? `\nKelas: ${matkul.kelas}` : ""
      }${matkul.password ? `\nPassword: ${matkul.password}` : ""}\nLink: ${
        matkul.link
      }`;
    }
  });
  if (resultMataKuliah !== "") {
    return `Sekarang ada absen!${resultMataKuliah}`;
  }
  return null;
}

module.exports = {
  getMataKuliahTekkim,
  getLinkAbsenTekkim,
};
