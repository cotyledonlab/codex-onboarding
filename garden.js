const canvas = document.getElementById('sand');
const ctx = canvas.getContext('2d');

function smoothSand() {
  ctx.fillStyle = '#f5e6b3';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

smoothSand();

let raking = false;
let last = null;

canvas.addEventListener('mousedown', (e) => {
  raking = true;
  last = { x: e.offsetX, y: e.offsetY };
});

function stopRaking() {
  raking = false;
  last = null;
}

canvas.addEventListener('mouseup', stopRaking);
canvas.addEventListener('mouseleave', stopRaking);

document.getElementById('reset').addEventListener('click', smoothSand);

canvas.addEventListener('mousemove', (e) => {
  if (!raking) return;
  const current = { x: e.offsetX, y: e.offsetY };
  drawRake(last, current);
  last = current;
});

function drawRake(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const perpX = -dy / len;
  const perpY = dx / len;
  ctx.strokeStyle = '#c2b280';
  ctx.lineWidth = 1;
  ctx.lineCap = 'round';
  const spacing = 5;
  const teeth = 5;
  for (let t = -(teeth - 1) / 2; t <= (teeth - 1) / 2; t++) {
    const offsetX = perpX * spacing * t;
    const offsetY = perpY * spacing * t;
    ctx.beginPath();
    ctx.moveTo(a.x + offsetX, a.y + offsetY);
    ctx.lineTo(b.x + offsetX, b.y + offsetY);
    ctx.stroke();
  }
}
