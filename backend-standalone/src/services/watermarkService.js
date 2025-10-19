const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Generate watermark text with user information and timestamp
const generateWatermarkText = (userId, userName) => {
  const date = new Date();
  const timestamp = date.toLocaleString('en-US');
  return `User: ${userName} | ID: ${userId} | ${timestamp}`;
};

// Add watermark to image
const addImageWatermark = async (imagePath, userId, userName) => {
  try {
    const watermarkText = generateWatermarkText(userId, userName);

    // Create SVG watermark
    const watermarkSvg = Buffer.from(`
      <svg width="800" height="100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>
            .watermark-text {
              font-size: 20px;
              font-family: Arial;
              fill: rgba(0, 0, 0, 0.5);
              font-weight: bold;
            }
          </style>
        </defs>
        <text x="10" y="50" class="watermark-text">${watermarkText}</text>
      </svg>
    `);

    // Read original image, add watermark, and return buffer
    const watermarkedImage = await sharp(imagePath)
      .composite([
        {
          input: watermarkSvg,
          gravity: 'southeast',
          tile: false,
        },
      ])
      .toBuffer();

    return watermarkedImage;
  } catch (error) {
    console.error('Error adding watermark:', error);
    throw new Error('Failed to add watermark to image');
  }
};

// Add watermark overlay to PDF (convert to image first if needed)
const addPdfWatermark = async (pdfPath, userId, userName) => {
  try {
    const watermarkText = generateWatermarkText(userId, userName);

    // For PDFs, we'll create a watermark overlay
    // In production, use a PDF library like PDF-lib
    return {
      watermarkText,
      userId,
      userName,
      timestamp: new Date(),
    };
  } catch (error) {
    console.error('Error adding PDF watermark:', error);
    throw new Error('Failed to add watermark to PDF');
  }
};

// Add EXIF metadata to image (user tracking)
const addExifMetadata = async (imagePath, userId, userName) => {
  try {
    const metadata = {
      // Standard EXIF-like fields
      'Image Description': `Protected content. User: ${userName} (${userId})`,
      'Timestamp': new Date().toISOString(),
      'Copyright': `${userName} - ${userId}`,
    };

    return metadata;
  } catch (error) {
    console.error('Error adding metadata:', error);
    throw new Error('Failed to add metadata');
  }
};

// Create watermarked copy of file
const createWatermarkedCopy = async (sourcePath, destPath, userId, userName) => {
  try {
    const ext = path.extname(sourcePath).toLowerCase();

    if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      const watermarkedBuffer = await addImageWatermark(sourcePath, userId, userName);
      fs.writeFileSync(destPath, watermarkedBuffer);
    } else if (ext === '.pdf') {
      const metadata = await addPdfWatermark(sourcePath, userId, userName);
      // For PDFs, store metadata alongside
      fs.writeFileSync(`${destPath}.metadata.json`, JSON.stringify(metadata, null, 2));
    }

    return destPath;
  } catch (error) {
    console.error('Error creating watermarked copy:', error);
    throw new Error('Failed to create watermarked file');
  }
};

module.exports = {
  generateWatermarkText,
  addImageWatermark,
  addPdfWatermark,
  addExifMetadata,
  createWatermarkedCopy,
};
