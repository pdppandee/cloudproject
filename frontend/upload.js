document.getElementById("upload-submit").addEventListener("click", function(event){
    event.preventDefault()
});

async function upload(file){
    const comp = this;
    console.log(`fn is running with ${file.files[0]}`);
    var image = file.files[0];
    var imgname = image.name;
    var img = new Image();

    img.src = window.URL.createObjectURL(image);

    img.onload = async function() {
        var image_width = img.naturalWidth;
        var image_height = img.naturalHeight;
        var image_size = image.size;
        var image_type = image.type;

        window.URL.revokeObjectURL( img.src );

        console.log(image_height);
        console.log(image_width);
        console.log(image_size);
        console.log(image_type);

        if (image_height > 200 || image_width > 200) {
            alert("Dimension of an image must not exceed 200px x 200px");
        }
        else if (image_size > 51200) {
            alert("Image size must not exceed 50KB");
        }
        else if (image_type != "image/jpeg") {
            alert("Image type must be .JPEG");
        }
        else {
            var formData = new FormData();

            formData.append("image", image);

            const api_url = "http://localhost:8080/upload/";
            const res = await postapi(imgname, image);
            console.log(res);
            alert("Image uploaded");
        }
    }
}

async function postapi(imgname, data) {
    console.log(data);
    const response = await fetch("https://g62ukvya60.execute-api.us-east-1.amazonaws.com/submit", {
        method: 'PUT',
        body: JSON.stringify({"userID":"test","name": imgname }),
        header: {
            'Content-Type': 'multipart/form-data'
        }
    });  
    var res = await response.json();

    const response2 = await fetch("https://4i8deg5io8.execute-api.us-east-1.amazonaws.com/putfile/cloudproject-bucket/"+imgname, {
        method: 'PUT',
        body: data
    });  
    var res2 = await response2;


    return res2
}



// function upload(){
//     alert("aaaaaaa");
//      $("#myform").on("submit",function(e){ // จะทำงานก็ต่อเมื่อกด submit ฟอร์ม
//     e.preventDefault(); // ปิดการใช้งาน submit ปกติ เพื่อใช้งานผ่าน ajax
//             var fd = new FormData(); // เตรียมข้อมูล form สำหรับส่งด้วย  FormData Object
//             console.log("fd",fd);
//             var files = $('#file')[0].files; //เป็นการดึงข้อมูลรูปภาพเพื่อเตรียมเช็คไฟล์ก่อนทำงานส่วน Ajax
//             console.log("file",files);
//             // เช็คว่ามีไฟล์รูปภาพอยู่หรือไม่
//             if(files.length > 0 ){

//                 fd.append('file',files[0]); //ใช้ในการแทรกค่าไฟล์รูปภาพใน element 

//                 $.ajax({
//                     url:'http://localhost:8080/upload/', //ให้ระบุชื่อไฟล์ PHP ที่เราจะส่งค่าไป
//                     type:'post',
//                     data:fd, //ข้อมูลจาก input ที่ส่งเข้าไปที่ PHP
//                     contentType: false,
//                     processData: false,
//                     success:function(response){ //หากทำงานสำเร็จ จะรับค่ามาจาก JSON หลังจากนั้นก็ให้ทำงานตามที่เรากำหนดได้
            
//                         if(response != 0){
//                             $("#image").attr("src",response);
//                             $('.preview img').show();
//                         }else{
//                             alert('File not uploaded');
//                         }
//                     }
//                 });
//             }else{
//                 alert("Please select a file.");
//             }
//         });
// }