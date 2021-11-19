var foto;
var doc;

window.onload = function(){
    doc = new jsPDF("p", "mm", "a4");
    // foto = new Foto();
}

function selectImage(){
    document.getElementById('foto-file').click();
}


var images_to_convert = [];

var getRatio = (files) =>{
// const files = document.getElementById('input-file').files[0];
console.log(files);
// Note files is json object not array object
for(let file of Object.values(files)){
    console.log('inside file reader')
    let reader = new FileReader();
    reader.onloadend=()=>{
    let imgsrc = reader.result;
    // console.log(imgsrc);
    addImageToPdf(imgsrc);
    }
    reader.readAsDataURL(file);
}

function addImageToPdf (src){
// src is data url of image

let img = new Image();
img.onload=()=>{
images_to_convert.push({src:img.src, height:img.height,width:img.width})
// Now successfully ratio of height as width is noted
}
img.src=src;
console.log(images_to_convert);
}
}


var render = () =>{
    const max = {height:300,width:210};
    
    images_to_convert.forEach(img=>{
    // img is json that we stored previously
    let height=img.height,width=img.width,src=img.src,ratio=img.height/img.width;

    if(height>max.height||width>max.width){
    if(height>width){
    height=max.height;
    width=height*(1/ratio);
    // Making reciprocal of ratio because ration of height as width is no valid here needs width as height
    }else if(width > height){
    width=max.width;
    height=width*ratio;
    // Ratio is valid here 
    }
    }
    doc.addImage(src,"png",0,0,width,height);   
    // doc.addPage("p","mm","a4");
    // Now successfully fitted image on page                                                
    // I will prefer to use mm instead px
    
    });
    doc.save("download.pdf");
}