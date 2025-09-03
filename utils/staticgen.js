const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Generate static exports for multiple stores
 * @param {Array} stores - Array of store configurations
 * @param {Object} options - Generation options
 */
async function generateStaticSites(stores, options = {}) {
    const {
        sourceDir = process.cwd(),
        outputDir = 'staticfiles',
        excludeDirs = ['node_modules', '.next', '.git', 'staticfiles', 'out', '.vercel'],
        skipInstall = false
    } = options;

    console.log(`🚀 Starting static site generation for ${stores.length} stores...`);

    // Create output directory
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const store of stores) {
        try {
            console.log(`\n📦 Processing store: ${store.storeName}`);
            await generateStoreStaticSite(store, sourceDir, outputDir, excludeDirs, skipInstall);
            console.log(`✅ Successfully generated static site for ${store.storeName}`);
        } catch (error) {
            console.error(`❌ Error generating static site for ${store.storeName}:`, error.message);
        }
    }

    console.log('\n🎉 Static site generation completed!');
}

/**
 * Generate static site for a single store
 */
async function generateStoreStaticSite(store, sourceDir, outputDir, excludeDirs, skipInstall) {
    const { storeName, envVars = {} } = store;
    const storeDir = path.join(outputDir, storeName);

    // Step 1: Create store directory
    if (fs.existsSync(storeDir)) {
        console.log(`  🗑️  Cleaning existing directory for ${storeName}`);
        fs.rmSync(storeDir, { recursive: true, force: true });
    }
    fs.mkdirSync(storeDir, { recursive: true });

    // Step 2: Copy project files (excluding specified directories and config files)
    console.log(`  📋 Copying project files for ${storeName}`);
    const extendedExcludeDirs = [...excludeDirs, 'package.json', 'next.config.js'];
    copyProjectFiles(sourceDir, storeDir, extendedExcludeDirs);

    // Step 3: Copy static-specific configuration files
    console.log(`  ⚙️  Copying static configuration files for ${storeName}`);
    copyStaticConfigFiles(sourceDir, storeDir);

    // Step 4: Create store-specific environment file
    console.log(`  🔧 Creating environment variables for ${storeName}`);
    createEnvFile(storeDir, envVars);

    // Step 5: Update package.json with store-specific name
    updatePackageJson(storeDir, storeName);

    // Step 6: Install dependencies (if not skipping)
    if (!skipInstall) {
        console.log(`  📦 Installing dependencies for ${storeName}`);
        execSync('npm install', { cwd: storeDir, stdio: 'inherit' });
    }

    // Step 7: Build static export
    console.log(`  🏗️  Building static export for ${storeName}`);
    execSync('npm run build', { cwd: storeDir, stdio: 'inherit' });

    // Step 8: Move the out directory to the root of store directory
    const outDir = path.join(storeDir, 'out');
    const finalDir = path.join(storeDir, 'static');
    if (fs.existsSync(outDir)) {
        if (fs.existsSync(finalDir)) {
            fs.rmSync(finalDir, { recursive: true, force: true });
        }
        fs.renameSync(outDir, finalDir);
        console.log(`  📁 Static files moved to ${path.relative(process.cwd(), finalDir)}`);
    }
}

/**
 * Copy project files excluding specified directories
 */
function copyProjectFiles(sourceDir, targetDir, excludeDirs) {
    const items = fs.readdirSync(sourceDir);

    for (const item of items) {
        if (excludeDirs.includes(item)) continue;

        const sourcePath = path.join(sourceDir, item);
        const targetPath = path.join(targetDir, item);
        const stat = fs.statSync(sourcePath);

        if (stat.isDirectory()) {
            fs.mkdirSync(targetPath, { recursive: true });
            copyProjectFiles(sourcePath, targetPath, excludeDirs);
        } else {
            fs.copyFileSync(sourcePath, targetPath);
        }
    }
}

/**
 * Copy static-specific configuration files
 */
function copyStaticConfigFiles(sourceDir, targetDir) {
    const staticConfigDir = path.join(sourceDir, 'utils', 'static');
    
    // Copy static package.json
    const staticPackageJson = path.join(staticConfigDir, 'package.json');
    const targetPackageJson = path.join(targetDir, 'package.json');
    if (fs.existsSync(staticPackageJson)) {
        fs.copyFileSync(staticPackageJson, targetPackageJson);
    } else {
        throw new Error('Static package.json not found at utils/static/package.json');
    }

    // Copy static next.config.js
    const staticNextConfig = path.join(staticConfigDir, 'next.config.js');
    const targetNextConfig = path.join(targetDir, 'next.config.js');
    if (fs.existsSync(staticNextConfig)) {
        fs.copyFileSync(staticNextConfig, targetNextConfig);
    } else {
        throw new Error('Static next.config.js not found at utils/static/next.config.js');
    }
}

/**
 * Create environment file with store-specific variables
 */
function createEnvFile(storeDir, envVars) {
    const envContent = Object.entries(envVars)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');

    const envPath = path.join(storeDir, '.env.local');
    fs.writeFileSync(envPath, envContent);
}

/**
 * Update package.json with store-specific information
 */
function updatePackageJson(storeDir, storeName) {
    const packagePath = path.join(storeDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    packageJson.name = `${packageJson.name}-${storeName}`;
    
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
}

/**
 * Example usage function
 */
function example() {
    const stores = [
        {
            storeName: 'store1',
            envVars: {
                NEXT_PUBLIC_STORE_NAME: 'Store One',
                NEXT_PUBLIC_API_URL: 'https://api.store1.com',
                NEXT_PUBLIC_THEME_COLOR: '#ff0000',
                NEXT_PUBLIC_LOGO_URL: '/logos/store1.png'
            }
        },
        {
            storeName: 'store2',
            envVars: {
                NEXT_PUBLIC_STORE_NAME: 'Store Two',
                NEXT_PUBLIC_API_URL: 'https://api.store2.com',
                NEXT_PUBLIC_THEME_COLOR: '#00ff00',
                NEXT_PUBLIC_LOGO_URL: '/logos/store2.png'
            }
        }
    ];

    // Generate static sites
    generateStaticSites(stores, {
        outputDir: 'staticfiles',
        skipInstall: false // Set to true to skip npm install for faster builds
    });
}

module.exports = {
    generateStaticSites,
    example
};
