import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { exec } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.resolve(rootDir, 'dist')
const docsDir = path.resolve(rootDir, 'docs')

if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true })
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webm': 'video/webm',
}

let recordedVideoBuffer = null

const server = http.createServer((req, res) => {
  // Save video endpoint
  if (req.method === 'POST' && req.url === '/save-video') {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => {
      recordedVideoBuffer = Buffer.concat(chunks)
      const outputPath = path.join(docsDir, 'logic-forge-showcase.webm')
      fs.writeFileSync(outputPath, recordedVideoBuffer)
      console.log(`Video saved successfully to: ${outputPath} (${(recordedVideoBuffer.length / 1024 / 1024).toFixed(2)} MB)`)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, size: recordedVideoBuffer.length }))
    })
    return
  }

  // Serve studio recorder html
  if (req.url === '/recorder' || req.url === '/recorder.html') {
    const recorderHtmlPath = path.join(__dirname, 'recorder.html')
    if (fs.existsSync(recorderHtmlPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      fs.createReadStream(recorderHtmlPath).pipe(res)
      return
    }
  }

  // Serve screenshots from docs/screenshots
  if (req.url.startsWith('/screenshots/')) {
    const screenshotName = path.basename(req.url)
    const screenshotPath = path.join(docsDir, 'screenshots', screenshotName)
    if (fs.existsSync(screenshotPath)) {
      res.writeHead(200, { 'Content-Type': 'image/png' })
      fs.createReadStream(screenshotPath).pipe(res)
      return
    }
  }

  // Serve static dist files
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

server.listen(4173, async () => {
  console.log('Video recording server started on http://localhost:4173')
  console.log('Launching headless Chrome to capture cinematic interface walkthrough video...')

  try {
    const chromeArgs = [
      `"${chromePath}"`,
      '--autoplay-policy=no-user-gesture-required',
      '--disable-background-timer-throttling',
      '--disable-renderer-backgrounding',
      '--use-fake-ui-for-media-stream',
      '--window-size=1280,720',
      '"http://localhost:4173/recorder"',
    ].join(' ')

    // Run Chrome and wait for recording completion
    const chromeProcess = exec(chromeArgs)

    // Wait up to 50 seconds for recording to finish and post to /save-video
    const startTime = Date.now()
    while (!recordedVideoBuffer && Date.now() - startTime < 60000) {
      await new Promise((r) => setTimeout(r, 1000))
    }

    if (recordedVideoBuffer) {
      console.log('Showcase video generation complete!')
    } else {
      console.error('Timed out waiting for video recording.')
    }

    try {
      chromeProcess.kill()
    } catch {}
  } catch (err) {
    console.error('Error during video recording:', err)
  } finally {
    server.close(() => {
      console.log('Recording server closed.')
      process.exit(recordedVideoBuffer ? 0 : 1)
    })
  }
})
