const CONFIG = JSON.parse(fs.readFileSync('./config.json', {encoding: 'utf-8'}));

import * as os from 'node:os';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import 'express';
import express from 'express';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const platform = os.platform();
const log = console.log;
const platform_vars = {
    'win32': {
        'time': '⏰',
        'path': '\\'
    },
    'linux': {
        'time': '\u23F1',
        'path': '/'
    }
}

console.log = (...args) => log(TimeStamp(), ...args);

function TimeStamp() {
    return `${platform_vars[platform].time}: ${new Date(Date.now()).toString()}>`;
}

function pathify(...path_parts) {
    return path_parts.join(platform_vars[platform].path);
}

app.use(express.json());
app.use((req, res, next) => {
    // console.log(chalk.cyan(`${req.headers['x-forwarded-for']} ${req.method} ${req.url} ${req?.body ? JSON.stringify(req.body) : ''}`));
    res.setHeader('Access-Control-Allow-Origin', ['*']);
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use((err, req, res, next) => {
    console.log(chalk.red(err));
    res.sendStatus(400);
});

// app.get('*', (req, res) => res.sendStatus(200));
app.options("*", (req, res) => res.sendStatus(200));
app.post('/jodi', async (req, res) => {
    let client = req.headers['x-forwarded-for'];
    switch (req.body.type) {
        case 'log':
            console.log(chalk.cyan(`${client} loaded the page...`));
            res.sendStatus(200);
            break;
        case 'ip':
            console.log(chalk.bgHex('#000000').hex('#00ff00')(`${req.body.data.ip} (${client}): ${req.body.data.message}`));
            await fetch(CONFIG.DISCORD_WEBHOOK, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:
                    JSON.stringify({
                        content: `||${req.body.data.ip} (${client})||: ${req.body.data.message}`,
                        username: 'jodi.org',
                        avatarURL: 'https://404.jodi.org/img/4.gif',
                    })
            });
            res.sendStatus(200);
            break;
        case 'file':
            let filename = req.body?.name;
            if (filename && !filename.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,\/\\]+/g)) {
                res.sendFile(pathify(__dirname, 'www', 'js', filename), (error) => {
                    if (error) {
                        console.log(chalk.red(`${client} tried to load ${filename}`));
                        res.sendStatus(404);
                    } else {
                        console.log(chalk.cyan(`Sending ${client} ${filename}...`));
                    }
                });
                break;
            }
            console.log(chalk.red(`${client} tried to load ${filename}`));
            res.sendStatus(418);
            break;
        default:
            console.log(chalk.red(`${client} submitted unknown data: ${JSON.stringify(req.body)}`));
            res.sendStatus(400);
    }
});

app.listen(CONFIG.PORT, () => console.log(chalk.cyan(`Express running on port ${CONFIG.PORT}`)));
//manually start NGROK in new VT terminal/powershell window