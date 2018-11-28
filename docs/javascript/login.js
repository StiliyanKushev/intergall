function login() {
    let beg = window.location.href;
    let url = "";
    if(beg.includes("localhost")){
        url = "http://localhost:3000/";
    }
    else url = "https://stiliyankushev.github.io/intergall/";
    let username = $("#username").val();
    let password = $("#password").val();
    Req.loginUser(username,password).then(res => {
        console.log(res);
        window.location.replace(url);
    }).catch(err => {
        console.log(err);
    });
}