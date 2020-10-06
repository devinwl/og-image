import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);


function getCss() {
    const primary = '#7344ee';
    const background = 'white';
    const foreground = 'black';
    const radial = 'rgba(115, 68, 238, 0.4)';
    const fontFamily = '-apple-system,blinkmacsystemfont,segoe ui,roboto,oxygen,ubuntu,cantarell,fira sans,droid sans,helvetica neue,sans-serif';

    return `

    body {
        background: ${background};
        background-image: radial-gradient(circle at 25px 25px, ${radial} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${radial} 2%, transparent 0%);
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    code {
        color: ${primary};
        font-family: monospace;
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .spacer {
        margin: 150px;
    }

    .emoji {
        height: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
        width: 1em;
    }
    
    .title {
        color: ${foreground};
        font-family: ${fontFamily};
        font-size: 120px;
        font-weight: 800;
    }

    .title > * {
        margin: 0;
    }

    .summary {
        color: #9b9cad;
        font-family: ${fontFamily};
        font-size: 80px;
        margin: 0;
    }

    .summary > * {
        margin: 0;
    }


    .site {
        color: ${primary}; 
        font-family: ${fontFamily};
        font-size: 50px;
        font-weight: 800;
        letter-spacing: -0.03em;
        text-transform: uppercase;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, summary, md } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <body>
        <div>
            <div class="title">${emojify(
                md ? marked(text) : sanitizeHtml(text)
            )}
            </div>
            <div class="summary">${emojify(
                md ? marked(summary) : sanitizeHtml(summary)
            )}</div>
            <div class="spacer"></div>
            <div class="site">devinlumley.com</div>
        </div>
    </body>
</html>`;
}

