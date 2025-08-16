url = 'https://c.tenor.com/yheo1GGu3FwAAAAd/tenor.gif';
function configImage(img) { img.src = url; return img; }
function createImage() { return configImage(document.createElement('img')); }
for (let i = 0; i < 10; i++) {
    parent.document.children[0].children[1].children.main.contentDocument.body.appendChild(configImage(createImage()))
}