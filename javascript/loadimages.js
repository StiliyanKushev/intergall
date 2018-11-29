let url = window.location.href;
if(url.includes("your_images")){
    Req.getAll('images', `?query={"creator":"${Auth.username()}"}&sort={"_kmd.ect": -1}`).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
}
else if(url.includes("gallery")){
    Req.getAll('images', '?query={}&sort={"_kmd.ect": -1}').then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
}