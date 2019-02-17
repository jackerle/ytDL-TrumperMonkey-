var express = require('express')
var app = express()
var fs = require('fs')
var youtubedl = require('youtube-dl')

app.get('/download',(req,res)=>{
  res.send('success '+req.query.param)
 var _url = req.query.param
  var url = "https://www.youtube.com/watch?v="+_url
  var video  = youtubedl(url, ['--format=18'],{ cwd: __dirname });
var options = ['--username=user', '--password=hunter2'];
var name;
video.on('info', function(info) {
  console.log('Download started');
  console.log('filename: ' + info.filename);
  console.log('size: ' + info.size);
});
youtubedl.getInfo(url, options, function(err, info) {
	if (err) throw err;
	console.log('Download Success! : ', info._filename);
	video.pipe(fs.createWriteStream('./../../music/'+info._filename));
  });
})



 










app.listen(3000)
console.log('server opened!')
