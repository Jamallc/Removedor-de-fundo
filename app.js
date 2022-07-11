let tolerance = document.getElementById("range").value;
let referenceColor = { r: 255, g: 255, b: 255 };
const canvas = document.getElementById('canvas');
const image = new Image();

function handleRange() {
  tolerance = document.getElementById("range").value;
  const rangelabel = document.getElementById("rangeLabel")
  rangelabel.innerText = tolerance
  drawImage()
}

function drawImage() {
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = "white"
  ctx.drawImage(image, 0, 0);
  processImage(ctx);
}

function processImage(context) {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  referenceColor = { r: data[0], g: data[1], b: data[2] };
  console.log("🚀 ~ file: app.js ~ line 26 ~ processImage ~ referenceColor", referenceColor)

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const color = { r, g, b }

    if (distance(color, referenceColor) < tolerance) {
      data[i + 3] = 0;
    }
  }
  context.putImageData(imageData, 0, 0);
}

function distance(color, reference) {
  const diff = {
    r: reference.r - color.r,
    g: reference.g - color.g,
    b: reference.b - color.b
  };
  const module = Math.sqrt(
    (diff.r * diff.r) +
    (diff.g * diff.g) +
    (diff.b * diff.b)
  );
  return module;
}

function download(url) {
  var link = document.createElement('a');
  link.download = 'filename.png';
  link.href = document.getElementById('canvas').toDataURL()
  link.click();
};

function getBase64(file) {
  if (file !== undefined) {
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = function () {
      image.src = reader.result;
      image.onload = drawImage;
    };
    reader.onerror = function (error) {
      console.error("Error: ", error);
    };
  }

}