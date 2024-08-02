const MAX_WIDTH = 320;
const MAX_HEIGHT = 180;
const MIME_TYPE = "image/jpeg";
const QUALITY = 0.7;

const html5QrCode = new Html5Qrcode(/* element id */ "reader");
// File based scanning
const qrCodeScannerSection = document.getElementById('qr-code-scanner');
const serialNumberInput = document.getElementById('serial-number-input');
const qrScanningBrewerImg = document.getElementById('qr-scanning-brewer-img');
const defaultBrewerImg = document.getElementById('defalut-brewer-img');

const input = document.getElementById("qr-input-file");
input.addEventListener('change', ev => {
    if (ev.target.files.length == 0) {
        // No file selected, ignore 
        return;
    }
  const file = ev.target.files[0]; // get the file
  const blobURL = URL.createObjectURL(file);
  const img = new Image();
  img.src = blobURL;
  img.onerror = function () {
    URL.revokeObjectURL(this.src);
    // Handle the failure properly
    console.log("Cannot load image");
  };
  img.onload = function () {
    URL.revokeObjectURL(this.src);
    const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
    const canvas = document.createElement("canvas");
    canvas.width = newWidth;
    canvas.height = newHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, newWidth, newHeight);
    canvas.toBlob(
    blob => {
      // Handle the compressed image. es. upload or save in local state
      displayInfo('Original file', file);
      displayInfo('Compressed file', blob);
      const newFile = new File([blob], "compressed_image.png",{type:"image/png", lastModified:new Date().getTime()});
      startScanningFile(newFile);
    },
    MIME_TYPE,
    QUALITY);
    document.getElementById("root").append(canvas);
  };
});

function startScanningFile(imageFile) {
    html5QrCode.scanFile(imageFile, true)
        .then(decodedText => {
            // success, use decodedText
            console.log(decodedText);
            serialNumberInput.value = decodedText;
            qrScanningBrewerImg.style.display = "none";
            qrCodeScannerSection.style.display = "none";
            defaultBrewerImg.style.display = "block";
        })
        .catch(err => {
            // failure, handle it.
            console.log(`Error scanning file. Reason: ${err}`)
        });
}

function calculateSize(img, maxWidth, maxHeight) {
  let width = img.width;
  let height = img.height;

  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > maxWidth) {
      height = Math.round(height * maxWidth / width);
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width = Math.round(width * maxHeight / height);
      height = maxHeight;
    }
  }
  return [width, height];
}

// Utility functions for demo purpose

function displayInfo(label, file) {
  const p = document.createElement('p');
  p.innerText = `${label} - ${readableBytes(file.size)}`;
  document.getElementById('root').append(p);
}

function readableBytes(bytes) {
  const i = Math.floor(Math.log(bytes) / Math.log(1024)),
  sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}