import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { exec } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')
const screenshotsDir = path.resolve(__dirname, '../docs/screenshots')

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true })
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
}

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0]
  let filePath = path.join(distDir, reqPath)

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath)
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' })
    fs.createReadStream(filePath).pipe(res)
    return
  }

  // SPA fallback
  const indexPath = path.join(distDir, 'index.html')
  res.writeHead(200, { 'Content-Type': 'text/html' })
  fs.createReadStream(indexPath).pipe(res)
})

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

function runCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, _stderr) => {
      if (err) reject(err)
      else resolve(stdout)
    })
  })
}

async function wait(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

server.listen(4173, async () => {
  console.log('Static server started at http://localhost:4173')
  try {
    const pages = [
      {
        url: 'http://localhost:4173/',
        output: path.join(screenshotsDir, 'dashboard.png'),
        windowSize: '1280,820',
      },
      {
        url: 'http://localhost:4173/mission/mission-01',
        output: path.join(screenshotsDir, 'mission-robot.png'),
        windowSize: '1280,820',
      },
      {
        url: 'http://localhost:4173/mission/mission-02',
        output: path.join(screenshotsDir, 'mission-pseudocode.png'),
        windowSize: '1280,820',
      },
    ]

    for (const p of pages) {
      console.log(`Capturing ${p.url} -> ${p.output}`)
      const cmd = `"${chromePath}" --headless=new --screenshot="${p.output}" --window-size=${p.windowSize} --virtual-time-budget=2000 --hide-scrollbars "${p.url}"`
      await runCommand(cmd)
      await wait(500)
    }

    console.log('All screenshots captured successfully!')
  } catch (err) {
    console.error('Error capturing screenshots:', err)
  } finally {
    server.close(() => {
      console.log('Server closed.')
      process.exit(0)
    })
  }
})
