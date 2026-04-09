const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Remove list items for articles
    content = content.replace(/<li><a href="articles\.html">Мої статті<\/a><\/li>[\r\n\s]*/g, '');
    
    // Remove btn-primary for articles
    content = content.replace(/<a href="articles\.html" class="btn-primary">Мої статті<\/a>[\r\n\s]*/g, '');
    
    // Remove btn-primary for certificates
    content = content.replace(/<a href="certificates\.html" class="btn-primary">Всі мої сертифікати<\/a>[\r\n\s]*/g, '');
    
    fs.writeFileSync(f, content);
});
console.log('Done!');
