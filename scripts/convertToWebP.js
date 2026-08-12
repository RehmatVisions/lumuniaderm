import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Asset directories to convert
const assetDirs = [
  path.join(__dirname, '../src/assets'),
];

// Image extensions to process
const imageExtensions = ['.png', '.jpg', '.jpeg'];

// Process all images in directory recursively
async function convertImagesToWebP(dir) {
  try {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(dir, file.name);

      if (file.isDirectory()) {
        // Recursively process subdirectories
        await convertImagesToWebP(fullPath);
      } else if (imageExtensions.includes(path.extname(file.name).toLowerCase())) {
        const webpPath = fullPath.replace(/\.[^.]+$/, '.webp');

        // Skip if webp already exists
        if (fs.existsSync(webpPath)) {
          console.log(`✓ Already converted: ${webpPath}`);
          continue;
        }

        try {
          await sharp(fullPath)
            .webp({ quality: 80 })
            .toFile(webpPath);

          console.log(`✓ Converted: ${file.name} → ${path.basename(webpPath)}`);
        } catch (err) {
          console.error(`✗ Error converting ${file.name}:`, err.message);
        }
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err);
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting image conversion to WebP...\n');

  for (const dir of assetDirs) {
    if (fs.existsSync(dir)) {
      console.log(`📁 Processing: ${dir}`);
      await convertImagesToWebP(dir);
    } else {
      console.warn(`⚠️  Directory not found: ${dir}`);
    }
  }

  console.log('\n✅ Conversion complete!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
