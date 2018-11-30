let url = window.location.href;
new Promise(function (resolve, reject) {
    if (url.includes("your_images")) {
        Req.getAll('images', `?query={"creator":"${Auth.username()}"}&sort={"_kmd.ect": -1}`).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    }
    else if (url.includes("gallery")) {
        Req.getAll('images', '?query={}&sort={"_kmd.ect": -1}').then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    }
}).then(res => {
    for (let image of res) {
        let edit_btn = $(`<input type="button" value="EDIT">`);
        let cancle_btn = $(`<button class="fas fa-times cancle-btn" input type="button" style="display:none;width:20%;">`);
        let done_btn = $(`<button class="fas fa-check done-btn" input type="button" style="display:none;width:20%;">`);

        let delete_btn = $(`<input type="button" value="DELETE">`);

        delete_btn.on("click",function(){
            delImage.call(this);
        });

        edit_btn.on("click",function(){
            this.cancle_btn = cancle_btn;
            this.done_btn = done_btn;
            this.delete_btn = delete_btn;
            editImage.call(this);
        });

        var img = new Image();
        img.onload = function () {
            let item;

            if (url.includes("your_images")) {
                item = $(`
                <div class="item"" item_id="${image._id}" item_link="${image.link}"></div>
                `).css("background", `url(${image.link})`).append($(`
                <div>
                </div>`).append(edit_btn).append(delete_btn).append(cancle_btn).append(done_btn));
            }
            else if (url.includes("gallery")) {
                item = $(`
                <div class="item"" item_id="${image._id}"></div>
                `).css("background", `url(${image.link})`).append($(`
                <div>
                </div>`));
            }

            if (this.width > this.height + 50) {
                item.addClass("landscape");
            }
            else if (this.height > this.width + 50) {
                item.addClass("portrait");
            }

            $(".grid").append(item);
        }
        img.src = `${image.link}`;
    }

    console.log(res);
}).catch(err => {
    console.log(err);
});