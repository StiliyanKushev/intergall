const Auth = (function() {
    function authToken(){
        return sessionStorage.getItem('authToken') || false;
    }
    function username(){
        return sessionStorage.getItem('username') || false;
    }
    function id(){
        return sessionStorage.getItem('id') || false;
    }
    function saveUser(userdata){
        sessionStorage.setItem('authToken',userdata._kmd.authtoken);
        sessionStorage.setItem('id',userdata._id);
        sessionStorage.setItem('username',userdata.username);
    }
    function clear(){
        sessionStorage.clear();
    }
    function saveOne(itemReference,itemData){
        sessionStorage.setItem(itemReference,itemData);
    }
    function deleteOne(itemReference){
        sessionStorage.removeItem(itemReference);
    }
    function getOne(itemReference){
        return sessionStorage.getItem(itemReference) || false;
    }
    return {authToken,username,id,saveUser,clear,saveOne,deleteOne,getOne}
})();