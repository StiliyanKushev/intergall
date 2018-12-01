let only_user_pages = ["gallery","your_images"];

for(let page of only_user_pages){
    if(!Auth.authToken() && window.location.href.includes(page)){
        if(window.location.href.includes("localhost")){
            window.location.replace("http://localhost:3000/");
        }
        else{
            window.location.replace("https://stiliyankushev.github.io/intergall/");
        }
        break;
    }
}