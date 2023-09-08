// const globalColors = {
//   faceColor: '#f4e4d4',
//   borderColor: '#800000',
//   numLineColor: '#000000',
//   handsColor: '#00000',
// };
// localStorage.setItem('globalColors', JSON.stringify(globalColors));

const canvas = document.getElementById('my-canvas');
const saveButton = document.getElementById('saveButton');
const resetButton = document.getElementById('resetButton');

// Store default style to localstorage
if (localStorage.getItem('globalColors') === null) {
  let colors = {};
  localStorage.setItem('globalColors', JSON.stringify(colors));
  setColor('faceColor', document.querySelector('#faceColor').value);
  setColor('borderColor', document.querySelector('#borderColor').value);
  setColor('numLineColor', document.querySelector('#numLineColor').value);
  setColor('handsColor', document.querySelector('#handsColor').value);
}

// Persist last style by storing color values in localstorage
document.querySelector('#faceColor').value = getColor('faceColor');
document.querySelector('#borderColor').value = getColor('borderColor');
document.querySelector('#numLineColor').value = getColor('numLineColor');
document.querySelector('#handsColor').value = getColor('handsColor');

// Get color for a key from localstorage
function getColor(key) {
  let colors = JSON.parse(localStorage.getItem('globalColors'));
  return colors[key];
}

// Set color for a key in localstorage
function setColor(key, value) {
  let colors = JSON.parse(localStorage.getItem('globalColors'));
  colors[key] = value;
  localStorage.setItem('globalColors', JSON.stringify(colors));
}

// Clock canvas
function clock() {
  const now = new Date();
  const ctx = canvas.getContext('2d');

  // Update clock style
  setColor('faceColor', document.querySelector('#faceColor').value);
  setColor('borderColor', document.querySelector('#borderColor').value);
  setColor('numLineColor', document.querySelector('#numLineColor').value);
  setColor('handsColor', document.querySelector('#handsColor').value);

  // Setup canvas
  ctx.save(); // save the default state
  ctx.clearRect(0, 0, 500, 500);
  ctx.translate(250, 250); // Put 0,0 in the middle
  ctx.rotate(-Math.PI / 2); // Rotate clock -90 deg

  // Set default styles
  // ctx.strokeStyle = getColor('handsColor');
  // ctx.fillStyle = globalColors.faceColor;
  ctx.strokeStyle = getColor('handsColor');
  ctx.fillStyle = getColor('faceColor');
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';

  // Draw clock face/border
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 16;
  // ctx.strokeStyle = globalColors.borderColor;
  ctx.strokeStyle = getColor('borderColor');
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  // Draw hour marks
  ctx.save();
  // ctx.strokeStyle = globalColors.numLineColor;
  ctx.strokeStyle = getColor('numLineColor');
  ctx.lineWidth = 5;
  for (let i = 1; i <= 12; i++) {
    ctx.beginPath();

    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();

  // Draw minute marks
  ctx.save();
  for (let i = 0; i < 60; i++) {
    if (i % 5 === 0) {
      ctx.rotate(Math.PI / 30);
      continue;
    }
    ctx.beginPath();
    ctx.strokeStyle = '#aaa';
    ctx.moveTo(115, 0);
    ctx.lineTo(120, 0);
    ctx.rotate(Math.PI / 30);
    ctx.stroke();
  }
  ctx.restore();

  // Get current time
  const hr = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();

  // console.log(`${hr}:${min}:${sec}`);

  // Draw hour hand
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.rotate(
    (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec
  );
  ctx.moveTo(-7, 0);
  ctx.lineTo(60, 0);
  ctx.stroke();
  ctx.restore();

  // Draw minute hand
  ctx.save();
  ctx.beginPath();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.lineWidth = 3;
  ctx.moveTo(-9, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  // Draw second hand
  ctx.save();
  ctx.beginPath();
  ctx.rotate((Math.PI / 30) * sec);
  ctx.lineWidth = 2;
  ctx.moveTo(-10, 0);
  ctx.lineTo(90, 0);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.moveTo(0, 0);
  ctx.lineTo(1, 0);
  ctx.stroke();
  ctx.restore();

  ctx.restore(); // restore default state

  requestAnimationFrame(clock);
}

requestAnimationFrame(clock);

// Initial code used to update clock style
// document
//   .querySelector('#faceColor')
//   .addEventListener(
//     'change',
//     (event) => (globalColors.faceColor = event.target.value)
//   );
// document
//   .querySelector('#borderColor')
//   .addEventListener(
//     'change',
//     (event) => (globalColors.borderColor = event.target.value)
//   );
// document
//   .querySelector('#numLineColor')
//   .addEventListener(
//     'change',
//     (event) => (globalColors.numLineColor = event.target.value)
//   );
// document
//   .querySelector('#handsColor')
//   .addEventListener(
//     'change',
//     (event) => (globalColors.handsColor = event.target.value)
//   );

// Save the time as clock snapshot
saveButton.addEventListener('click', function () {
  const canvasImage = canvas.toDataURL(); // Convert canvas content to a data URL
  const a = document.createElement('a');
  a.href = canvasImage;
  a.download = 'clock.png'; // Specify the image file name
  a.click();
});

// Reset the clock style to default
resetButton.addEventListener('click', function () {
  document.querySelector('#faceColor').value = '#f4e4d4';
  document.querySelector('#borderColor').value = '#800000';
  document.querySelector('#numLineColor').value = '#000000';
  document.querySelector('#handsColor').value = '#000000';
});
