const sharp = require('sharp');
const path = require('path');

async function generateOGImage() {
  try {
    const sourceImage = path.join(__dirname, '..', 'public', 'my.jpg');
    const targetImage = path.join(__dirname, '..', 'public', 'og-image.jpg');

    await sharp(sourceImage)
      .resize(1200, 630, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 85 })
      .toFile(targetImage);

  } catch (error) {
  }
}

generateOGImage();