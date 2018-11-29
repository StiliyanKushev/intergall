let url = window.location.href;
new Promise(function (resolve, reject) {
    if(url.includes("your_images")){
        Req.getAll('images', `?query={"creator":"${Auth.username()}"}&sort={"_kmd.ect": -1}`).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    }
    else if(url.includes("gallery")){
        Req.getAll('images', '?query={}&sort={"_kmd.ect": -1}').then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    }
}).then(res => {
    for(let image of res){
        $(".grid").append($(`<div class="item""></div>`).css("background",`url(${image.link})`));
    }

    console.log(res);
}).catch(err => {
    console.log(err);
});