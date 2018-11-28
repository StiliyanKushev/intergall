function register() {
    let beg = window.location.href;
    let url = "";
    let slash_count = 0;
    for(let i = 0; i < beg.length;i++){
        if(beg[i] == "/") slash_count++;
        url += beg[i];
        if(slash_count == 3 && beg[i + 1] != "i") break;
    }
    let username = $("#username").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let repeatPass = $("#re-password").val();
    Req.registerUser(email,username,password,repeatPass).then(res => {
        window.location.replace(url);
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
}