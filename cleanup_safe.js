const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Remove nav links to articles
    content = content.replace(/[ \t]*<li><a href="articles\.html">Мої статті<\/a><\/li>\r?\n/g, '');
    
    // Remove articles button and its wrapper in index.html
    const articlesBtnRegex = /[ \t]*<div style="margin-top: 2rem;">\s*<a href="articles\.html" class="btn-primary">Мої статті<\/a>\s*<\/div>\r?\n/g;
    content = content.replace(articlesBtnRegex, '');
    
    // Remove certificates button and its wrapper in index.html
    const certBtnRegex = /[ \t]*<div style="text-align: center; margin-top: 3rem;">\s*<a href="certificates\.html" class="btn-primary">Всі мої сертифікати<\/a>\s*<\/div>\r?\n/g;
    content = content.replace(certBtnRegex, '');
    
    fs.writeFileSync(f, content);
});
console.log('Safe cleanup done!');
