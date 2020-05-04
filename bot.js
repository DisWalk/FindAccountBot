var Twit = require('twit');
var fs = require('fs');
var Jimp = require('jimp');  
var urlExists = require('url-exists');
var config = require('./config')
var T = new Twit(config);

tweet()

setInterval(tweet , 1000 * 60 * 60 * 6 )

function tweet(){

let file = fs.readFileSync('yyy').toString().split('\n');  // read file and convert to array by line break
var s = file[0]          // first line
let file1 = fs.readFileSync('ddd').toString().split('\n'); 
var post = file1[0]
let file2 = fs.readFileSync('sss').toString().split('\n');  // read file and convert to array by line break
var prev = file2[file2.length-2]  
var params = { 
    screen_name: s
}

T.get('users/show', params ,m);

function m(err,data,response){
        var og = data.profile_image_url_https
            og = og.split("normal")[0]+ "bigger.jpg"

            urlExists(og, function(err, exists) {
              if(exists)  
              main()
              
              var s1 = rand(0,6)

            async function main() {
                    const it = await Jimp.read(og);
                    var i = await Jimp.read('this.jpg');
                    const font = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK);
                  
                    switch(s1) {
                      case 0:
                          f0(it)
                          break;
                      case 1:
                          f1(it)
                          break;
                      case 2:
                          f2(it)
                          break;
                      case 3:
                          f3(it)
                          break;
                      case 4:
                          f4(it)
                          break;
                      case 5:
                          f5(it,i)
                          break;
                      case 6:
                          f6(it,font)
                          break;
                      default:
                        f0(it)
                    }
                    it.write(s+".jpg")
                    
                    fs.writeFileSync('sss', "@"+post+"\n",  {'flag':'a'}, function(){});

                    post = post+".jpg"

                    var b64content = fs.readFileSync(post, { encoding: 'base64' })

                    T.post('media/upload', { media_data: b64content }, function (err, data, response) {
                      
                      var mediaIdStr = data.media_id_string
                      var altText = "processed image"
                      var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
                    
                      T.post('media/metadata/create', meta_params, function (err, data, response) {
                        if (!err) {
                          if(file2.length-2>=0){
                          var wr = "Previous answer - "+prev+"  |  #";
                          prev = prev.substring(1);
                          wr=wr+prev+"\n"+"#nofilter"
                        }else var wr="#nofilter"  
                          var params = { status: wr, media_ids: [mediaIdStr] }
                    
                          T.post('statuses/update', params, function (err, data, response) {
                            console.log("successful upload")
                          })
                        }
                      })
                     
                    })
                }
            });
    }

file.shift(); // remove the the first element from array
file = file.join('\n',function(){}) // convert array back to string
fs.writeFileSync('yyy', file,function(){})

const log = fs.createWriteStream('ddd', { flags: 'a' },function(){})
log.write(s+"\n",function(){})
log.end();

file1.shift(); 
file1 = file1.join('\n',function(){}) 

fs.writeFileSync('ddd', file1,function(){})

}

function f0(it){
  it.resize(320, 200) 
  it.quality(100)
  it.blur(2);  
  it.flip(false, true);
}

function f1(it){
  it.resize(320, 200) 
  it.quality(100)
  it.invert();  
  it.rotate(45);
}

function f2(it){
  it.resize(320, 200) 
  it.quality(100)
  it.threshold({ max: 150 });
  it.displace(it, 30);
  it.rotate(90);
}

function f3(it){
  it.resize(320, 200) 
  it.quality(100)
  it.rotate(180);
  it.posterize( 4 );  
  it.circle();
}

function f4(it){
  it.resize(320, 200) 
  it.quality(100)
  it.fisheye();
  it.convolute([[-2, -1, 0], [-1, 1, 1], [0, 1, 2]]);
}

function f5(it,i){
  it.resize(300, 300) 
  it.quality(100)
  it.blit(i,0,170);
  it.displace(it, 10);
}

function f6(it,font){
  it.resize(320, 200) 
  it.quality(100)
  it.print(font, 10, 10, 'SIKE');
  it.sepia();
}

function rand(min, max) {  
  min = Math.ceil(min); 
  max = Math.floor(max); 
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}  

