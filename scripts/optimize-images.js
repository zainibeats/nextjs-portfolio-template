const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imageDir = path.join(process.cwd(), 'public/assets/images');
const optimizedDir = path.join(process.cwd(), 'public/assets/images/optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// Get all image files
const imageFiles = fs.readdirSync(imageDir).filter(file => {
  const ext = path.extname(file).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) && !file.includes('optimized');
});

async function optimizeImages() {
  console.log('Optimizing images...');
  
  const largeImages = [];
  
  for (const file of imageFiles) {
    const inputPath = path.join(imageDir, file);
    const stats = fs.statSync(inputPath);
    const fileSizeInMB = stats.size / (1024 * 1024);
    
    // Check if file is larger than 1MB
    if (fileSizeInMB > 1) {
      largeImages.push({ file, size: fileSizeInMB.toFixed(2) });
      
      const outputPath = path.join(optimizedDir, file);
      const ext = path.extname(file).toLowerCase();
      
      try {
        // Process image based on type
        if (ext === '.png') {
          await sharp(inputPath)
            .resize(1280) // Resize to max width of 1280px
            .png({ quality: 80, compressionLevel: 9 })
            .toFile(outputPath);
        } else if (['.jpg', '.jpeg'].includes(ext)) {
          await sharp(inputPath)
            .resize(1280) // Resize to max width of 1280px
            .jpeg({ quality: 80 })
            .toFile(outputPath);
        } else if (ext === '.webp') {
          await sharp(inputPath)
            .resize(1280) // Resize to max width of 1280px
            .webp({ quality: 80 })
            .toFile(outputPath);
        }
        
        console.log(`Optimized: ${file} (${fileSizeInMB.toFixed(2)} MB)`);
      } catch (error) {
        console.error(`Error optimizing ${file}:`, error);
      }
    }
  }
  
  // Report large images
  if (largeImages.length > 0) {
    console.log('\nLarge images found:');
    largeImages.forEach(img => {
      console.log(`- ${img.file} (${img.size} MB)`);
    });
    console.log('\nOptimized versions saved to public/assets/images/optimized/');
    console.log('Consider replacing the original files with these optimized versions.');
  } else {
    console.log('No large images found that need optimization.');
  }
}

optimizeImages().catch(console.error); 