const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imageDir = path.join(process.cwd(), 'public/assets/images');
const webPDir = path.join(process.cwd(), 'public/assets/images/webp');

// Create webp directory if it doesn't exist
if (!fs.existsSync(webPDir)) {
  fs.mkdirSync(webPDir, { recursive: true });
}

// Get all image files
const imageFiles = fs.readdirSync(imageDir).filter(file => {
  const ext = path.extname(file).toLowerCase();
  return ['.jpg', '.jpeg', '.png'].includes(ext) && !file.includes('webp');
});

async function convertToWebP() {
  console.log('Converting images to WebP format...');
  
  for (const file of imageFiles) {
    const inputPath = path.join(imageDir, file);
    // Change extension to .webp
    const outputFilename = path.basename(file, path.extname(file)) + '.webp';
    const outputPath = path.join(webPDir, outputFilename);
    
    try {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      console.log(`Converted: ${file} → ${outputFilename}`);
    } catch (error) {
      console.error(`Error converting ${file}:`, error);
    }
  }
  
  console.log('\nConversion complete. WebP images saved to public/assets/images/webp/');
  console.log('Consider updating your components to use these WebP images for better performance.');
}

convertToWebP().catch(console.error); 