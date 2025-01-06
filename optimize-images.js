const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, 'static/uploads'); // Dossier des images à optimiser
const outputDir = path.join(__dirname, 'static/uploads-optimized'); // Dossier où stocker les images optimisées

// Fonction pour optimiser les images
async function optimizeImages() {
  try {
    console.log('Démarrage de l\'optimisation des images...');

    // Vérifie si le répertoire de sortie existe sinon le crée
    await fs.ensureDir(outputDir);

    // Fonction pour traiter les fichiers dans un répertoire
    async function processDirectory(currentDir, relativePath = '') {
      const fullPath = path.join(currentDir, relativePath);
      const files = await fs.readdir(fullPath);

      // Filtrer pour ne garder que les images avec les extensions souhaitées
      const imageExtensions = ['.png', '.jpg', '.jpeg', '.tiff'];
      const imageFiles = files.filter(file =>
        imageExtensions.includes(path.extname(file).toLowerCase())
      );

      // Créer un répertoire correspondant dans uploads-optimized
      const outputSubDir = path.join(outputDir, relativePath);
      await fs.ensureDir(outputSubDir); // Crée le sous-dossier dans uploads-optimized

      // Traiter chaque image dans le répertoire
      for (const file of imageFiles) {
        const inputPath = path.join(fullPath, file);
        const outputPath = path.join(outputSubDir, file);

        try {
          console.log(`Optimisation de l'image: ${inputPath}`);

          // Utilisation de sharp pour optimiser l'image
          await sharp(inputPath)
            .resize({ width: 2400 }) // Redimensionner à une largeur de 2400px, la hauteur sera ajustée proportionnellement
            .toFormat('jpeg', { quality: 80 }) // Convertir en JPEG et optimiser la qualité
            .toFile(outputPath); // Sauvegarder l'image optimisée

          console.log(`Image optimisée et enregistrée dans: ${outputPath}`);

        } catch (err) {
          console.error(`Erreur lors de l'optimisation de l'image ${file}:`, err);
        }
      }

      // Traiter les sous-dossiers récursivement
      const subDirs = files.filter(file => fs.statSync(path.join(fullPath, file)).isDirectory());
      for (const subDir of subDirs) {
        await processDirectory(currentDir, path.join(relativePath, subDir)); // Appel récursif pour sous-dossiers
      }
    }

    // Lancer l'optimisation à partir du dossier de départ
    await processDirectory(inputDir);

    console.log('Optimisation terminée!');

  } catch (error) {
    console.error('Erreur lors de l\'optimisation des images:', error);
  }
}

// Exécuter la fonction
optimizeImages();
