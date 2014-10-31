stl2image = require('stl2image');
var exec = require('child_process').exec,
    child;

var step = 8;

var next = function ( i ) {

  s = (i<10) ? '0'+i : i
  phi = Math.PI * i / step

  stl2image.imageify(process.argv[2], { width: 400, height: 300, phi: phi, dst: 'img/test'+ s +'.png' }
    , function (err, povOutput, name ) {
      process.stdout.write('.')
      if ( i < step*2 ) {
        next(i + 1);
      } else {
        process.stdout.write("\ngifin...\n")
        gify('img')
        process.stdout.write("bye!\n")
      }
    }
    , function (err, povPolygon, name) {
      // poly 
    }
  );
}



var gify = function ( path ) {
  child = exec('convert -delay 20 -loop 0 ' + path + '/*.png ' + process.argv[3],
    function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
}

var i = 0
next(i)

