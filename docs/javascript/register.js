function register() {
    let beg = window.location.href;
    let url = "";
    if(beg.includes("localhost")){
        url = "http://localhost:3000/";
    }
    else url = "https://stiliyankushev.github.io/intergall/";
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