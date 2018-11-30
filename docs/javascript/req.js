const BASE_URL = 'https://baas.kinvey.com/';
const APP_KEY = 'kid_B1rTIUtAm';
const APP_SECRET = '7d288f429d6b43bd9da17b1e607b6d60';
const AUTH_HEADERS = {
    'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)
}
const Req = (function () {
    function registerUser(email,username, password, secondPassword) {
        return new Promise(function (resolve, reject) {
            if (username.trim() == "" || password.trim() == "" || secondPassword.trim() == "") reject('please fill all inputs');
            if (username.length < 5) reject('Username must be at least 5 characters long');
            else if (password != secondPassword) reject("Passwords don't match");
            $.ajax({
                method: "POST",
                url: BASE_URL + 'user/' + APP_KEY,
                headers: AUTH_HEADERS,
                data: {
                    username,
                    password,
                    email
                }
            }).then(res => {
                Auth.saveUser(res);
                resolve('Sucsessfuly register');
            }).catch(err => {
                reject('There was a problem registering that user')
            });
        });
    }
    function loginUser(username, password) {
        return new Promise(function (resolve, reject) {
            if (username.trim() == "" || password.trim() == "") reject('please fill all inputs');
            $.ajax({
                method: "POST",
                url: BASE_URL + 'user/' + APP_KEY + "/login",
                headers: AUTH_HEADERS,
                data: {
                    username,
                    password
                }
            }).then(res => {
                Auth.saveUser(res);
                resolve('Sucsessfuly logged in');
            }).catch(err => {
                reject('There was a problem logging in that user');
            });
        });
    }
    function logoutUser() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                method: "POST",
                url: BASE_URL + 'user/' + APP_KEY + "/_logout",
                headers: {
                    "Authorization": "Kinvey " + Auth.authToken()
                }
            }).then(res => {
                Auth.clear();
                resolve('Sucsessfuly logged out');
            }).catch(err => {
                reject('There was a problem logging out that user')
            });
        });
    }

    function getOne(collectionName, id) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                method:'GET',
                url: BASE_URL + `appdata/${APP_KEY}/${collectionName}/${id}`,
                headers:{'Authorization':`Kinvey ${Auth.authToken()}`},
                success:function (res) {
                    resolve(res);
                },
                error:function (err) {
                    reject(err);
                }
            });
        });
    }
    function addOne(collectionName, data) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                method:'POST',
                url: BASE_URL + `appdata/${APP_KEY}/${collectionName}`,
                headers:{'Authorization':`Kinvey ${Auth.authToken()}`},
                data:data,
                success:function (res) {
                    resolve(res);
                },
                error:function (err) {
                    reject(err);
                }
            });
        });
    }
    function editOne(collectionName, id, data) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                method:'PUT',
                url: BASE_URL + `appdata/${APP_KEY}/${collectionName}/${id}`,
                headers:{'Authorization':`Kinvey ${Auth.authToken()}`},
                data:data,
                success:function (res) {
                    resolve(res);
                },
                error:function (err) {
                    reject(err);
                }
            });
        });
    }
    function deleteOne(collectionName, id) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                method:'Delete',
                url: BASE_URL + `appdata/${APP_KEY}/${collectionName}/${id}`,
                headers:{'Authorization':`Kinvey ${Auth.authToken()}`},
                success:function (res) {
                    resolve(res);
                },
                error:function (err) {
                    reject(err);
                }
            });
        });
    }
    function getAll(collectionName, query) {
        if(!query){
            query = '';
        }
        return new Promise(function (resolve, reject) {
            $.ajax({
                method:'GET',
                url: BASE_URL + `appdata/${APP_KEY}/${collectionName}${query}`,
                headers:{'Authorization':`Kinvey ${Auth.authToken()}`},
                success:function (res) {
                    resolve(res);
                },
                error:function (err) {
                    reject(err);
                }
            });
        });
    }
    return {
        registerUser,
        loginUser,
        logoutUser,
        getOne,
        addOne,
        editOne,
        getAll,
        deleteOne
    }
})();
