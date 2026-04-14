#!/usr/bin/env node
/**
 * Batch image optimizer for public/uploads and public/images
 * Uses sharp to compress JPEG images to web-friendly sizes
 */

import { readdir, stat, rename, unlink } from 'fs/promises';
import { join, extname } from 'path';
import { execSync } from 'child_process';

// Install sharp temporarily
try {
    await import('sharp');
} catch {
    console.log('📦 Installing sharp...');
    execSync('npm install sharp --no-save', { stdio: 'inherit' });
}

const sharp = (await import('sharp')).default;

const DIRS = [
    './public/uploads',
    './public/images',
];

const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;
const JPEG_QUALITY = 80;
const SKIP_EXTENSIONS = ['.png', '.svg', '.ico', '.heic', '.mov'];

let totalOriginal = 0;
let totalOptimized = 0;
let filesProcessed = 0;
let filesSkipped = 0;

async function getFilesRecursive(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...await getFilesRecursive(fullPath));
        } else if (entry.isFile()) {
            const ext = extname(entry.name).toLowerCase();
            if (['.jpg', '.jpeg'].includes(ext)) {
                files.push(fullPath);
            }
        }
    }
    return files;
}

async function optimizeImage(filePath) {
    try {
        const originalStat = await stat(filePath);
        const originalSize = originalStat.size;

        // Skip small files (already optimized)
        if (originalSize < 200 * 1024) {
            filesSkipped++;
            return;
        }

        const tempPath = filePath + '.optimized.jpg';

        await sharp(filePath)
            .resize(MAX_WIDTH, MAX_HEIGHT, {
                fit: 'inside',
                withoutEnlargement: true,
            })
            .jpeg({
                quality: JPEG_QUALITY,
                mozjpeg: true,
                progressive: true,
            })
            .toFile(tempPath);

        const newStat = await stat(tempPath);
        const newSize = newStat.size;

        // Only replace if we actually saved space
        if (newSize < originalSize * 0.9) {
            await unlink(filePath);
            await rename(tempPath, filePath);
            
            totalOriginal += originalSize;
            totalOptimized += newSize;
            filesProcessed++;
            
            const savedPct = ((1 - newSize / originalSize) * 100).toFixed(0);
            console.log(`  ✅ ${filePath}: ${formatSize(originalSize)} → ${formatSize(newSize)} (-${savedPct}%)`);
        } else {
            await unlink(tempPath);
            filesSkipped++;
            console.log(`  ⏭  ${filePath}: already optimized (${formatSize(originalSize)})`);
        }
    } catch (err) {
        console.error(`  ❌ ${filePath}: ${err.message}`);
        filesSkipped++;
    }
}

function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

console.log('🖼  Image Optimization Script');
console.log('=' .repeat(50));

for (const dir of DIRS) {
    try {
        console.log(`\n📁 Scanning ${dir}...`);
        const files = await getFilesRecursive(dir);
        console.log(`   Found ${files.length} JPEG files\n`);

        for (const file of files) {
            await optimizeImage(file);
        }
    } catch (err) {
        console.log(`   Directory ${dir} not found or empty, skipping.`);
    }
}

console.log('\n' + '='.repeat(50));
console.log(`📊 Results:`);
console.log(`   Files optimized: ${filesProcessed}`);
console.log(`   Files skipped:   ${filesSkipped}`);
if (filesProcessed > 0) {
    console.log(`   Original total:  ${formatSize(totalOriginal)}`);
    console.log(`   Optimized total: ${formatSize(totalOptimized)}`);
    console.log(`   Saved:           ${formatSize(totalOriginal - totalOptimized)} (-${((1 - totalOptimized / totalOriginal) * 100).toFixed(0)}%)`);
}
console.log('✨ Done!');
