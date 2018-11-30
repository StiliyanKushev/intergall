function addImage() {
    let link = $(".site-images #image-url").val();
    let creator = Auth.username();
    Req.addOne('images', { link, creator }).then(res => {
        $(".site-images #image-url").val("");
        console.log(res);
        location.reload();
    }).catch(err => {
        console.log(err);
    });
}

function delImage() {
    let image_id = $(this).parent().parent().attr("item_id");
    Req.deleteOne("images", image_id).then(res => {
        location.reload();
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
}

function editImage() {
    let image_id = $(this).parent().parent().attr("item_id");
    let image_link = $(this).parent().parent().attr("item_link");
    $(this.cancle_btn).on("click",(event) => {
        $(this.cancle_btn).hide();
        $(this.done_btn).hide();
        $(this.delete_btn).css("display", "block");

        $(this).css("width", "50%");
        $(this).css("color", "#fff");
        $(this).css("padding", ".5rem 0rem");
        $(this).css("background", "#4b4bc0");
        $(this).attr("type", "button");
        $(this).attr("placeholder", "");
        $(this).val("EDIT");
    });
    $(this.done_btn).on("click",(event) => {
        Req.editOne("images",image_id,{"link":$(this).val(),"creator":Auth.username()}).then(res => {
            location.reload();
        }).catch(err => {

        });
    });

    $(this.cancle_btn).css("display","block");
    $(this.cancle_btn).css("background","rgb(202, 34, 34)");
    $(this.done_btn).css("display","block");
    $(this.done_btn).css("background","rgb(75, 75, 192)");
    $(this.delete_btn).css("display", "none");

    $(this).css("width", "100%");
    $(this).css("color", "#757575");
    $(this).css("padding", ".5rem 1rem");
    $(this).css("background", "rgb(240,240,240)");
    $(this).attr("type", "text");
    $(this).attr("placeholder", "Enter new url");
    $(this).val(image_link);
}