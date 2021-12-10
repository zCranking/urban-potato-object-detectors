Status = "";
objects = "";
function back(){
    history.back();
}
function preload(){
    img = loadImage('item_1.jpg');
}
function setup(){
    canvas = createCanvas(800, 700);
    canvas.position(550, 170);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelLoaded(){
    console.log("model loaded");
    Status = true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}
function draw(){
    image(img, 0, 0, 800, 700);
    if(Status != ""){
        for(var i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Detected. I have found " + i + " objects.";
            confidence = floor(objects[i].confidence * 100);
            fill("#F49D37");
            textSize(20);
            text(objects[i].label + " " + confidence + "%", objects[i].x, objects[i].y - 10);
            noFill();
            stroke("#F49D37");
            rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width);
        }
    }
}