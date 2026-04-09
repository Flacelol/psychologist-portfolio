const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Clean up empty div from articles button
    content = content.replace(/<div style="margin-top: 2rem;">\s*<\/div>[\r\n\s]*/g, '');
    
    // Clean up empty div from certificates button
    content = content.replace(/<div style="text-align: center; margin-top: 3rem;">\s*<\/div>[\r\n\s]*/g, '');
    
    fs.writeFileSync(f, content);
});
console.log('Cleanup empty divs done!');
