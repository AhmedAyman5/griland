const fs = require('fs');
let content = fs.readFileSync('main.js', 'utf8');

content = content.replace(/"te_cta_btn2": "B2B Inquiry"[\s\S]*?=======/g, '"te_cta_btn2": "B2B Inquiry",');
content = content.replace(/"te_cta_btn2": "استفسار تجاري B2B"[\s\S]*?=======/g, '"te_cta_btn2": "استفسار تجاري B2B",');
content = content.replace(/<<<<<<< HEAD\r?\n?/g, '');
content = content.replace(/>>>>>>> [a-f0-9]+\r?\n?/g, '');

fs.writeFileSync('main.js', content);
console.log('Fixed conflicts');
