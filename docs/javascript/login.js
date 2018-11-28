function login() {
    let beg = window.location.href;
    let url = "";
    let slash_count = 0;
    for(let i = 0; i < beg.length;i++){
        if(beg[i] == "/") slash_count++;
        url += beg[i];
        if(beg[i + 1] == "i" && slash_count == 3) continue;
        if(slash_count == 3) break;
    }
    let username = $("#username").val();
    let password = $("#password").val();
    Req.loginUser(username,password).then(res => {
        console.log(res);
        window.location.replace(url);
    }).catch(err => {
        console.log(err);
    });
}