
sound = "";
objects = [];
status = "";


function preload(){
 sound = loadSound('alertCP.mp3');
}


function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }if (results.length < 0){
    document.getElementById("status").innerHTML = "Status : Baby not found";
     sound.play();
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 380, 380);

      if(status != "")
      {
        r= random(255);
        g = random(255);
        b = random(255)
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          if(objects[i].label == "person"){
            document.getElementById("status").innerHTML = "Status : Baby found";
            sound.stop();

          }else{
            document.getElementById("status").innerHTML = "Status : Baby not found";
            sound.play();
          }
          
          
          
          document.getElementById("number_of_objects").innerHTML = "Number of Objects is" + objects.length;
    
          fill(r,g,b);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
}
