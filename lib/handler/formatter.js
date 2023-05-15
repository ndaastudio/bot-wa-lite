function formatTimes(times) {
  let menit = Math.floor(parseInt(times) / 60);
  let detikSisa = parseInt(times) % 60;

  let waktu =
    (menit >= 60 ? Math.floor(menit / 60) + " jam " : "") +
    (menit % 60 > 0 ? (menit % 60) + " menit " : "") +
    (detikSisa > 0 ? detikSisa + " detik" : "");

  return waktu;
}

function formatNumbers(numbers) {
  numbers = parseInt(numbers);
  return numbers.toLocaleString("id-ID");
}

module.exports = { formatTimes, formatNumbers };
