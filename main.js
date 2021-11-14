img = "";
status = "";
object = [];

function preload()
{
    img = loadImage('cricket.webp');
}

function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();

    object_detection = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelLoaded()
{
    console.log("cocossd is initialized");
    status = true;
    object_detection.detect(img, gotResult);
}
function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        object = results;
    }


}

function draw()
{
    image(img, 0, 0, 640, 420);

    if(status != "")
    {
        for(i = 0; i < object.length; i++)
        {
            document.getElementById("status").innerHTML = "Object Detected";

            fill('#FF0000');
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 20, object[i].y+ 20);
            noFill();
            stroke('#FF0000');
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }

}