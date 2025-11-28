import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');

const files = ['index.js', 'index.mjs'];

files.forEach(file => {
    const filePath = path.join(distDir, file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (!content.startsWith('"use client"')) {
            fs.writeFileSync(filePath, `"use client";\n${content}`);
            console.log(`✓ Added "use client" directive to ${file}`);
        }
    }
});
