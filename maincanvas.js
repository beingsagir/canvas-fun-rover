$('document').ready(function () {

    var canvas4 = document.getElementById('myCanvas4');
    var context4 = canvas4.getContext('2d');

    var shapes = [];
    drawImage();
    window.addEventListener('mousemove', pencilDraw, false);
    window.addEventListener('mousemove', copyToCanvas3, false);
    drawACircle()



    /* canvas.addEventListener('mousemove', function(e) {
      console.log("yo");
      getCursorPosition(canvas, e)
      console.log(getMousePos(canvas, e))
    }) */

    function getMousePosition(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
            y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
        };
    }

    function copyToCanvas3(e) {
        // get current position

        var canvas3 = document.getElementById("myCanvas3");
        var context3 = canvas3.getContext("2d");

        // get color from Image
        var canvas2 = document.getElementById("myCanvas2");
        var context2 = canvas2.getContext("2d");

        var pos = getMousePosition(canvas3, e);
        posx = pos.x;
        posy = pos.y;
        pixSize = 1;

        color = getPixelColor(context3, posx, posy, pixSize);
        // Draw that
       // console.log(color);
        pixelDraw(context3, posx, posy, color, pixSize);
    }

    function rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    }

    function getPixelColor(contx, x, y, pixSize) {

        var canvas2 = document.getElementById("myCanvas2");
        var context2 = canvas2.getContext("2d");
        var p = context2.getImageData(x, y, pixSize, pixSize).data;
        // If transparency on the image
        if ((p[0] == 0) && (p[1] == 0) && (p[2] == 0) && (p[3] == 0)) {
            //coord += " (Transparent color)";
        }

       // console.log(p[0])
        var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);

        return hex;
    }

    function pencilDraw(e) {
        var canvas1 = document.getElementById("myCanvas1");
        var context1 = canvas1.getContext("2d");

        var pos = getMousePosition(canvas1, e);


        posx = pos.x;
        posy = pos.y;
        pixelDraw(context1, posx, posy, "red", 2);
    }

    function pixelDraw(context, posx, posy, color, pixelSize) {
        context.fillStyle = color;
     //   console.info({ color, posx, posy, pixelSize, pixelSize });
        context.fillRect(posx, posy, pixelSize, pixelSize);
    }

    function drawImage() {
        var canvas2 = document.getElementById("myCanvas2");
        var ctx = canvas2.getContext("2d");
        img = new Image();
        img.crossOrigin = "Anonymous"
        img.onload = function () {
            ctx.drawImage(img, 0, 0, 300, 300);
        };
        img.src = "https://assets.imgix.net/hp/snowshoe.jpg?auto=compress&w=900&h=900&fit=crop";
    }

    function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
       // console.log("x: " + x + " y: " + y)
    }

    function drawACircle() {

        var x = canvas4.width / 2;
        var y = canvas4.height / 2;
        var radius = canvas4.height / 2;
        var color = 'green';
        drawACircleOperation(context4, x, y, radius, color)
        // setTimeout(function(){
        //     divideCircleIntoFour(context4, x, y, radius);
        // }, 5000);
       // clearRectangle(context4, x, y, radius);
    }

    function divideCircleIntoFour(context4, x, y, radius){
        var color = "red";
        clearRectangle(context4, x, y, radius);
        //shapes = shapes.filter((item) => item.x !== x && item.y !== y);
        //shapes = shapes.filter(function(item) { return ((item.x != x && item.y != )) });
      //  console.log("before-slice", shapes);
     //   console.log({x, y});
       // console.log("Index to Delete", shapes.findIndex(v => v.x === x && v.y === y));
       // shapes.slice(shapes.findIndex(v => v.x === x && v.y === y), 1);
        shapes = shapes.filter(s => !(s.x == x && s.y == y));
     //   console.log("after-slice", shapes);
        //drawACircleOperation(context4, x/2, y/2, radius/2, color);
        //drawACircleOperation(context4, x+(x/2), y/2, radius/2, color);
       // console.log("--------------------------------", context4, x+(x/2), y/2, radius/2, color});
        //drawACircleOperation(context4, x/2, (y + (y/2)), radius/2, color);
        //drawACircleOperation(context4, x+(x/2), y+(y/2), radius/2, color);  
        drawACircleOperation(context4, x-(radius/2), y-(radius/2), radius/2, color);
        drawACircleOperation(context4, x+(radius/2), y+(radius/2), radius/2, color);
        drawACircleOperation(context4, x+(radius/2), y-(radius/2), radius/2, color);
        drawACircleOperation(context4, x-(radius/2), y+(radius/2), radius/2, color);
    }

    function drawACircleOperation(context4, x, y, radius, color) {
       //clearRectangle(context4, 150, 150, 150);
       color = getPixelColor(null, x, y, 1)
        context4.beginPath();
        context4.arc(x, y, radius, 0, 2 * Math.PI, false);
        context4.fillStyle = color;
        context4.fill();
        shapes.push({x, y, radius, color});    
        context4.closePath();    
        //console.log({shapes})

    }

    function reOffset() {
        var BB = myCanvas4.getBoundingClientRect();
        offsetX = BB.left;
        offsetY = BB.top;
    }
    var offsetX, offsetY;
    reOffset();
    window.onscroll = function (e) { reOffset(); }
    window.onresize = function (e) { reOffset(); }

    $("#myCanvas4").mousemove(function (e) { handleMouseMove(e); });

    function handleMouseMove(e) {
        // tell the browser we're handling this event
        e.preventDefault();
        e.stopPropagation();

        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);

        // Put your mousemove stuff here
        for (var i = 0; i < shapes.length; i++) {
            var s = shapes[i];
            definePath(s.x, s.y, s.radius);
            p1 = definePath2d(s.x, s.y, s.radius);
            if (context4.isPointInPath(p1, mouseX, mouseY)) {
                // divide the circle
                divideCircleIntoFour(context4, s.x, s.y, s.radius)
              //  console.log("mouse", {mouseX, mouseY})
              //  console.log("s", s);
                break;
            }
        }
       // console.log({mouseX, mouseY})
    }

    function clearRectangle(cont, x, y, radius) {
        cont.beginPath();
        //cont.arc(x, y, radius, 0, 2 * Math.PI, true);
        //cont.clip();
        cont.clearRect(x - radius, y - radius, radius * 2, radius * 2);
       // cont.restore();
       context4.closePath();
    }

    function definePath2d(x, y, radius) {
        let p1 = new Path2D();
        p1.rect(x - radius, y - radius, radius * 2, radius * 2);
        return p1;
    }

    function definePath(x, y, radius) {
        var p = getFourCorner(x, y, radius)
        context4.moveTo(p[0].x, p[0].y);
        for (var i = 1; i < p.length; i++) {
            context4.lineTo(p[i].x, p[i].y);
        }
        context4.closePath();
       // context4.stroke();
       
    }



    function getFourCorner(x, y, radius){
        var a = x - radius;
        var b = y - radius;
        var length = radius * 2;
        var fullPath = [];
        var x = a;
        var y = b;
        var one = {x, y};
        fullPath.push(one);
        var aa = a+length
        x = aa;
        y = b;
        var two = {x, y};
        fullPath.push(two);
        var bb = b+length
        x = aa;
        y = bb;
        var three = {x, y};
        fullPath.push(three);
        x = a;
        y=bb;
        var four = {x, y};
        fullPath.push(four);
        return fullPath;
    }


    /* function findPosition(obj) {
        var curleft = 0, curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return { x: curleft, y: curtop };
        }
        return undefined;
    } */






});