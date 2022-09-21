object = []
status = ''

function preload() {
  music = loadSound('alarm.mp3')
}

function setup() {
  canvas = createCanvas(600, 450)
  canvas.center()
  video = createCapture(VIDEO)
  video.size(600, 450)
  video.hide()
  objectDetector = ml5.objectDetector('cocossd', modelLoaded)
  document.getElementById('status').innerHTML = 'Status detecting object'
}

function draw() {
  image(video, 0, 0, 600, 450)
  if (status != '') {
    r = random(255)
    g = random(255)
    b = random(255)
    objectDetector.detect(video, gotResults)
    for (i = 0; i < object.length; i++) {
      document.getElementById('status').innerHTML = 'Status: Object detected'
      document.getElementById('numberofobjects').innerHTML =
        'Number of objects detected are: ' + object.length

      fill(r, g, b)
      percent = floor(object[i].confidence * 100)
      text(object[i].label + ' ' + percent + '%', object[i].x, object[i].y)
      noFill()
      stroke(r, g, b)
      rect(object[i].x, object[i].y, object[i].width, object[i].height)
      if (object[i].label == 'person') {
        document.getElementById('numberofobjects').innerHTML = 'Baby found'
        music.stop()
      } else {
        document.getElementById('numberofobjects').innerHTML = 'Baby not found'
        music.play()
      }
    }
  }
}

function modelLoaded() {
  console.log('Model had loaded')
  status = true
}

function gotResults(error, results) {
  if (error) {
    console.log(error)
  }
  console.log(results)
  object = results
}
