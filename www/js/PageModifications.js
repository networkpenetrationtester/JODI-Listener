let frames = parent.document.children[0].children[1].children;
let entry = frames.entry.contentDocument, main = frames.main.contentDocument;
let inputs = entry.querySelectorAll('input');
inputs[6].value = 'Send'
inputs[7].type = 'text';
inputs[7].placeholder = 'Enter your message here... (Max 100 characters)';
for (let message of main.querySelectorAll('font')) message.color = '#00ff00';
let div = document.createElement('div');
let h1 = document.createElement('h1');
let p = document.createElement('p');
div.style.color = '#00ff00';
h1.innerText = 'Welcome to the JODI IP Chatroom!';
p.innerText = 'Enter a message and press Submit, but be warned doing so exposes your IP address.';
div.appendChild(h1);
div.appendChild(p);
main.body.prepend(div);