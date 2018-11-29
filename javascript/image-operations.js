function addImage(){
    let link = $(".site-images #image-url").val();
    let creator = Auth.username();
    Req.addOne('images',{link,creator}).then(res => {
        $(".site-images #image-url").val("");
        console.log(res);
        location.reload();
    }).catch(err => {
        console.log(err);
    });
}

function delImage(){
    
}

function editImage(){

}