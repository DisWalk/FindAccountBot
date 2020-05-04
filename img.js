var Jimp = require('jimp'); 
var s = rand(0,6)
main()  
async function main() {
  var it = await Jimp.read('theweeknd1.jpg');
  var i = await Jimp.read('this.jpg');
  const font = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK);

  switch(s) {
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
  it.write("theweeknd.jpg")

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