const fs = require('fs');
const path = require('path');

const routes = ['/', '/about', '/contact']; // Your SEO routes
const distPath = 'dist/find-your-house';
const indexPath = path.join(distPath, 'index.html');

console.log('\n🚀 Starting static generation...');

// Read the main index.html
const indexContent = fs.readFileSync(indexPath, 'utf8');

// Generate static files for each route
routes.forEach(route => {
  if (route === '/') return; // Skip root, already exists
  
  const routeDir = path.join(distPath, route);
  const routeFile = path.join(routeDir, 'index.html');
  
  // Create directory
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  
  // Copy index.html to route directory
  fs.writeFileSync(routeFile, indexContent);
  console.log(`✅ Generated: ${route}/index.html`);
});

