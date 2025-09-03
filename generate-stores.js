const { generateStaticSites } = require('./utils/staticgen');

// Define your stores with their specific configurations
const stores = [
    {
        storeName: 'nike-store',
        envVars: {
            NEXT_PUBLIC_STORE_NAME: 'Nike Official Store',
            NEXT_PUBLIC_STORE_ID: 'nike',
            NEXT_PUBLIC_API_URL: 'https://api.nike.com',
            NEXT_PUBLIC_THEME_COLOR: '#FF6900',
            NEXT_PUBLIC_LOGO_URL: '/logos/nike.png',
            NEXT_PUBLIC_CURRENCY: 'USD',
            NEXT_PUBLIC_COUNTRY: 'US'
        }
    },
    {
        storeName: 'adidas-store',
        envVars: {
            NEXT_PUBLIC_STORE_NAME: 'Adidas Official Store',
            NEXT_PUBLIC_STORE_ID: 'adidas',
            NEXT_PUBLIC_API_URL: 'https://api.adidas.com',
            NEXT_PUBLIC_THEME_COLOR: '#000000',
            NEXT_PUBLIC_LOGO_URL: '/logos/adidas.png',
            NEXT_PUBLIC_CURRENCY: 'EUR',
            NEXT_PUBLIC_COUNTRY: 'DE'
        }
    }
];

// Generation options
const options = {
    outputDir: 'staticfiles',
    skipInstall: false, // Set to true for faster builds if node_modules are already up to date
    excludeDirs: ['node_modules', '.next', '.git', 'staticfiles', 'out', '.vercel']
};

// Run the generation
console.log('🚀 Starting multi-store static site generation...');
generateStaticSites(stores, options)
    .then(() => {
        console.log('\n✅ All stores generated successfully!');
        console.log('\n📁 Generated stores:');
        stores.forEach(store => {
            console.log(`   - staticfiles/${store.storeName}/static/`);
        });
        console.log('\n💡 You can now deploy each store directory to your hosting service.');
    })
    .catch(error => {
        console.error('❌ Generation failed:', error);
        process.exit(1);
    }); 