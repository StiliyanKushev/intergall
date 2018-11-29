$("#third-nav-li a").on("click", function () {
    if ($("#third-nav-li a").text() == "Logout") {
        Req.logoutUser().then(res => {
            let beg = window.location.href;
            let url = "";
            if (beg.includes("localhost")) {
                url = "http://localhost:3000/";
            }
            else url = "https://stiliyankushev.github.io/intergall/";
            window.location.replace(url);
        }).catch(err => {
            console.log(err);
        });
    }
});