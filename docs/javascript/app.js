$(() => {
    Sammy('#container', function () {
        //use the library
        this.use('Handlebars', 'hbs');
        //set the location to the home href
        window.location.hash = "#/";

        this.get('#/', function () {
            if (Auth.authToken()) {
                this.redirect('#/allList');
            } else {
                this.redirect('#/welcome');
            }
        });
        this.get('#/welcome', function () {
            this.auth = Auth.authToken();
            this.username = Auth.username();
            this.loadPartials({
                nav: './templates/navigation.hbs'
            }).then(function () {
                this.partial('./templates/welcome.hbs');
            });
        });
        //login register logout
        this.get('#/login', function () {
            this.auth = Auth.authToken();
            this.username = Auth.username();
            this.loadPartials({
                nav: './templates/navigation.hbs'
            }).then(function () {
                this.partial('./templates/login.hbs');
            });
        });
        this.get('#/register', function () {
            this.auth = Auth.authToken();
            this.username = Auth.username();
            this.loadPartials({
                nav: './templates/navigation.hbs'
            }).then(function () {
                this.partial('./templates/register.hbs');
            });
        });
        this.post('#/register', function () {
            Notify.loading();
            Req.registerUser(this.params.username, this.params.password, this.params.repeatPass).then(res => {
                Notify.info(res);
                this.redirect('#/allList');
            }).catch(err => {
                Notify.error(err)
            });
        });
        this.post('#/login', function () {
            Notify.loading();
            Req.loginUser(this.params.username, this.params.password).then(res => {
                Notify.info(res);
                this.redirect('#/allList');
            }).catch(err => {
                Notify.error(err)
            });
        });
        this.get('#/logout', function () {
            Notify.loading();
            Req.logoutUser().then(res => {
                Notify.info(res);
                this.redirect('#/');
            }).catch(err => {
                Notify.error(err)
            });
        });

        //allLists myLists createList
        this.get('#/allList', function () {
            this.auth = Auth.authToken();
            this.username = Auth.username();
            Notify.loading();
            this.loadPartials({
                nav: './templates/navigation.hbs'
            }).then(function () {
                this.partial('./templates/carList.hbs');
                Req.getAll('cars', '?query={}&sort={"_kmd.ect": -1}').then(res => {
                    Notify.clear();
                    if (res.length != 0) {
                        for (let car of res) {
                            let created = `
                                <div class="listing">
                                <p>${car.title}</p>
                                <img src="${car.imageUrl}">
                                <h2>Brand: ${car.brand}</h2>
                                <div class="info">
                                    <div id="data-info">
                                        <h3>Seller: ${car.seller}</h3>
                                        <h3>Fuel: ${car.fuelType}</h3>
                                        <h3>Year: ${car.year}</h3>
                                        <h3>Price: ${car.price} $</h3>
                                    </div>
                                    <div id="data-buttons">
                                        <ul>
                                            <li class="action">
                                                <a href="#/details/${car._id}" class="button-carDetails">Details</a>
                                            </li>
                                            <li class="action">
                                                <a href="#/edit/${car._id}" class="button-carDetails">edit</a>
                                            </li>
                                            <li class="action">
                                                <a href="#/delete/${car._id}" class="button-carDetails">delete</a>
                                            </li>
    
                                        </ul>
                                    </div>
                                </div>
    
                            </div>`;
                            let notCreated = `
                            <div class="listing">
                            <p>${car.title}</p>
                            <img src="${car.imageUrl}">
                            <h2>Brand: ${car.brand}</h2>
                            <div class="info">
                                <div id="data-info">
                                    <h3>Seller: ${car.seller}</h3>
                                    <h3>Fuel: ${car.fuelType}</h3>
                                    <h3>Year: ${car.year}</h3>
                                    <h3>Price: ${car.price} $</h3>
                                </div>
                                <div id="data-buttons">
                                    <ul>
                                        <li class="action">
                                            <a href="#/details/${car._id}" class="button-carDetails">Details</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
    
                        </div>`;
                        if(car._acl.creator == Auth.id())
                            $('#listings').append(created);
                            else
                            $('#listings').append(notCreated);
                        }
                    }
                    else $('#listings').append('<p class="no-cars">No cars in database.</p>');
                }).catch();
            });
        });
        this.get('#/myList', function () {
            this.auth = Auth.authToken();
            this.username = Auth.username();
            Notify.loading();
            this.loadPartials({
                nav: './templates/navigation.hbs'
            }).then(function () {
                this.partial('./templates/myCars.hbs');
                Req.getAll('cars', `?query={"seller":"${Auth.username()}"}&sort={"_kmd.ect": -1}`).then(res => {
                    Notify.clear();
                    if (res.length != 0) {
                        for (let car of res) {
                            let created = `
                            <div class="my-listing">
                            <p id="listing-title">${car.title}</p>
                            <img src="${car.imageUrl}">
                
                            <div class="listing-props">
                                <h2>Brand: ${car.brand}</h2>
                                <h3>Model: ${car.model}</h3>
                                <h3>Year: ${car.year}</h3>
                                <h3>Price: ${car.price}$</h3>
                            </div>
                            <div class="my-listing-buttons">
                                <a href="#/details/${car._id}" class="my-button-list">Details</a>
                                <a href="#/edit/${car._id}" class="my-button-list">Edit</a>
                                <a href="#/delete/${car._id}" class="my-button-list">Delete</a>
                            </div>
                        </div>`;
                        $('.car-listings').append(created);
                        }
                    }
                    else $('.car-listings').append('<p class="no-cars">No cars in database.</p>');
                }).catch();
            });
        });
        this.get('#/create', function () {
            this.auth = Auth.authToken();
            this.username = Auth.username();
            this.loadPartials({
                nav: './templates/navigation.hbs'
            }).then(function () {
                this.partial('./templates/create.hbs');
            });
        });
        this.post('#/create', function () {
            if (this.params.title.length > 33) Notify.error('Title is too big. It must be smaller that 33 chars');
            else if (this.params.title.trim() == "") Notify.error('Empty title.');
            else if (this.params.description.length < 30 || this.params.description.length > 450) Notify.error('Description must be between 30 and 450 chars long');
            else if (this.params.description.trim() == "") Notify.error('Empty description.');
            else if (this.params.brand.length > 11) Notify.error('Brand must be smaller than 11 chars');
            else if (this.params.brand.trim() == "") Notify.error('Empty brand.');
            else if (this.params.model.length > 11 && this.params.model.length >= 4) Notify.error('Model must be bigger than 4 and smaller than 11 chars');
            else if (this.params.model.trim() == "") Notify.error('Empty model.');
            else if (this.params.year.length != 4) Notify.error('Year is not valid. Must be 4 chars long');
            else if (this.params.year.trim() == "") Notify.error('Empty year.');
            else if (this.params.imageUrl.indexOf('http') == -1) Notify.error('Image url must start with http');
            else if (this.params.imageUrl.trim() == "") Notify.error('Empty imageUrl.');
            else if (this.params.fuelType.length > 11) Notify.error('Fuel must be smaller than 11 chars');
            else if (this.params.fuelType.trim() == "") Notify.error('Empty fuelType.');
            else if (Number(this.params.price) > 1000000) Notify.error('price is too big. Must be under 1000000$');
            else if (this.params.price.trim() == "") Notify.error('Empty price.');
            else {
                Notify.loading();
                let data = {
                    "brand": this.params.brand,
                    "description": this.params.description,
                    "fuel": this.params.fuelType,
                    "imageUrl": this.params.imageUrl,
                    "isAuthor": true,
                    "model": this.params.model,
                    "price": this.params.price,
                    "seller": Auth.username(),
                    "title": this.params.title,
                    "year": this.params.year,
                };
                Req.post('cars', data, 'listing created.').then(res => {
                    Notify.info(res);
                    this.redirect('#/');
                }).catch(Notify.error(err));
            }
        });

        //details edit delete
        this.get('details/:id',function(){
            Notify.loading();
            Req.getOne('cars',this.params.id).then(res => {
                Notify.clear();
                this.title = res.title;
                this.imageUrl = res.imageUrl;
                this.brand = res.brand;
                this.model = res.model;
                this.yaer = res.year;
                this.fuel = res.fuelType;
                this.price = res.price;
                this.id = res._id;
                this.description = res.description;
                this.loadPartials({
                    nav : 'templates/navigation.hbs'
                }).then(function(){
                    this.partial('templates/details.hbs');
                });
            }).catch(err => {
                Notify.error(err);
            });
        });
        this.get('delete/:id',function(){
            Notify.loading();
            Req.deleteOne('cars',this.params.id).then(res => {
                Notify.info('Listing deleted.');
                this.redirect('#/');
            }).catch(err => {Notify.error(err)});
        });
        this.get('edit/:id',function(){
            Notify.loading();
            Req.getOne('cars',this.params.id).then(res => {
                Notify.clear();
                this.title = res.title;
                this.imageUrl = res.imageUrl;
                this.brand = res.brand;
                this.model = res.model;
                this.year = res.year;
                this.fuelType = res.fuel;
                this.price = res.price;
                this.id = res._id;
                this.description = res.description;
                this.loadPartials({
                    nav : 'templates/navigation.hbs'
                }).then(function(){
                    this.partial('templates/edit.hbs');
                });
            }).catch(err => {
                Notify.error(err);
            });
        });
        this.post('edit/:id',function(){
            Notify.loading();
            let data = {
                "brand": this.params.brand,
                "description":this.params.description,
                "fuel":this.params.fuel,
                "imageUrl":this.params.imageUrl,
                "isAuthor": true,
                "model": this.params.model,
                "price": this.params.price,
                "seller": Auth.username(),
                "title": this.params.title,
                "year": this.params.year,
        };
            Req.put('cars',this.params.id,data,``).then(res => {
                Notify.info(`Listing ${res.title} updated.`);
                this.redirect('#/');
            }).catch(err => {Notify.error(err)});
        });
    }).run();
});