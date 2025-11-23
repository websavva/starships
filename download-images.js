const fs = require("fs");
const https = require("https");
const path = require("path");

const imagesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "images.json"), "utf8")
);
const baseUrl = imagesData.baseUrl;
const imageNames = imagesData.names;

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, "images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https
      .get(url, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file);
          file.on("finish", () => {
            file.close();
            resolve();
          });
        } else if (response.statusCode === 301 || response.statusCode === 302) {
          // Handle redirects
          file.close();
          fs.unlinkSync(filepath);
          downloadImage(response.headers.location, filepath)
            .then(resolve)
            .catch(reject);
        } else {
          file.close();
          fs.unlinkSync(filepath);
          reject(
            new Error(`Failed to download ${url}: ${response.statusCode}`)
          );
        }
      })
      .on("error", (err) => {
        file.close();
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
        reject(err);
      });
  });
}

async function downloadAllImages() {
  console.log(`Downloading ${imageNames.length} images...`);

  for (let i = 0; i < imageNames.length; i++) {
    const imageName = imageNames[i];
    const imageUrl = baseUrl + imageName;
    const filepath = path.join(imagesDir, imageName.replace(/_(.+)\./, "."));

    try {
      console.log(
        `[${i + 1}/${imageNames.length}] Downloading ${imageName}...`
      );
      await downloadImage(imageUrl, filepath);
      console.log(`✓ Downloaded ${imageName}`);
    } catch (error) {
      console.error(`✗ Failed to download ${imageName}:`, error.message);
    }
  }

  console.log("\nDownload complete!");
}

downloadAllImages().catch(console.error);
