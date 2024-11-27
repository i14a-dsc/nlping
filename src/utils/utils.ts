export function format(sec: number) {
  function pad(s: number) {
    return (s < 10 ? '0' : '') + s;
  }
  const hours = Math.floor(sec / (60 * 60));
  const minutes = Math.floor((sec % (60 * 60)) / 60);
  const seconds = Math.floor(sec % 60);
  return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}
