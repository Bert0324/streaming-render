import { createServer } from 'http';
import { renderToPipeableStream } from '../../fe/node_modules/react-dom/server';
import { readFileSync } from 'fs';
import * as React from '../../fe/node_modules/react';
import { ServerApp } from '../../fe/src/server/App';

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const server = createServer(async (req, res) => {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);
  if (pathname === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Transfer-Encoding", "chunked");
    res.write("<html><body><div>First segment</div>");
    // 手动设置延时，让分段显示的效果更加明显
    await sleep(10000);
    res.write("<div>Second segment</div></body></html>");
    res.end();
    return;
  } else if (pathname === '/content.json') {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.setHeader('Access-Control-Allow-Origin', '*');
    await sleep(5000);
    const content = readFileSync(`${__dirname}/content.json`).toString();
    res.write(content);
    res.end();
    return;
  } else if (pathname === '/ssr') {
    res.statusCode = 200;
    const { pipe } = renderToPipeableStream(<ServerApp />, {
      bootstrapScripts: [
        'http://localhost:8082/vendor.548d7b5c.js', 
        'http://localhost:8082/server.ad96f328.js'
      ],
      onShellReady() {
        res.setHeader('content-type', 'text/html');
        pipe(res);
      }
    });
    return;
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("okay");
});

server.listen(8080);
console.log(`http://localhost:8080`)
