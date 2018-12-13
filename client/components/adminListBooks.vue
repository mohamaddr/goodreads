<!-- ownerHome.vue -->
<!-- This is a really basic (static) Vue component.
We just demonstrate how data (variables in the Vue instance) can be bound to HTML elements -->
<template>


    <div class="card-columns">

        <div v-for="book in books" v-bind:key="book._id" class="card">
            <img class="card-img-top" src="book.jpg" alt="book" style="width:100%">
            <div class="card-body">

                <div class="card-body">NAME: {{book.name}}</div>
                <div class="card-body">Author: {{book.author}}</div>
                <div class="card-body">Genre: {{book.genre}}</div>
                <button type="button" class="btn btn-primary" @click="deleteBook(book._id)">delete</button>
                <button type="button" class="btn btn-primary" data-toggle="modal" v-bind:data-target="'#book-modal-'+book._id">
                edit
                </button>
            </div>


            <div class="modal" :id="'book-modal-'+book._id" tabindex="-1" role="dialog" aria-labelledby="exampleModal" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalVerticalLabel">Edit</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-sm-8"><input v-model="message1" v-bind:placeholder = "book.name" class="form-control" type="text"></div>
                                <div class="col-sm-4"><button type="button" class="btn btn-primary" @click="updateName(book._id)" aria-label="Close" data-dismiss="modal">Save changes</button></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8"><input v-model="message2" v-bind:placeholder = "book.author" class="form-control" type="text"></div>
                                <div class="col-sm-4"><button type="button" class="btn btn-primary" @click="updateAuthor(book._id)" aria-label="Close" data-dismiss="modal">Save changes</button></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8"><input v-model="message3" v-bind:placeholder = "book.genre" class="form-control" type="text"></div>
                                <div class="col-sm-4"><button type="button" class="btn btn-primary" @click="updateGenre(book._id)" aria-label="Close" data-dismiss="modal">Save changes</button></div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


<script>

    var axios = require('axios');

    module.exports = {
    
    data () {
        return {
        books: []
        //dismissSecs: 5,
        //dismissCountDown: 0
        //massge1:''
        
        }
    },

    methods: {
        //Performs a GET request to /api/camels using AXIOS.
            getBooks: function () {
                console.log("get all books from the data base");
                axios.get('/api/admin/books')
                .then(
                    response => {
                        //This is only an example of how you can access the status code
                        if (response.status!==200) {
                            console.log("Wrong status code: " + response.status);
                        }
                        //If we get a response, empty the camels array and fill it with all camels from our endpoints
                        this.books.length = 0;
                        for (var i = 0; i < response.data.data.length; i++) {
                            this.books.push(response.data.data[i]);
                        }
                })
                .catch(error => {
                    //In case of error, empty the camels array.
                    this.books.length = 0;
                    console.log(error);
                })
                .then(function () {
                    //This code is always executed, independent of the request being successful or not.
                });
            
    },
    updateName: function (bookID) {
        if(this.message1==null){   // this only to prevent saving a book with an empty name
        this.alrt();
        console.log("empty field");
        return;
        }

        console.log("update book with ID " + bookID);
        axios.patch('/api/admin/books/'+bookID,{

        name :this.message1
        
        })
                .then( 
                    response => {
                
                        //This code basically finds the camel under question in the array and deletes it (using splice)
                    
                    if (response.status==200) {
                            console.log("status code: " + response.status);
                            this.getBooks();
                            //location.reload();

                        }
                })
                .catch(error => {
                    console.log(error);
                })
                .then(function () {
                });

            },

    updateAuthor: function (bookID) {
        if(this.message2==null){   // this only to prevent saving a book with an empty name
        this.alrt();
        console.log("empty field");
        return;
        }

        console.log("update book with ID " + bookID);
        axios.patch('/api/admin/books/'+bookID,{

        author :this.message2
        
        })
                .then( 
                    response => {
                
                        //This code basically finds the camel under question in the array and deletes it (using splice)
                    
                    if (response.status==200) {
                            console.log("status code: " + response.status);
                            this.getBooks();
                            //location.reload();

                        }
                })
                .catch(error => {
                    console.log(error);
                })
                .then(function () {
                });

            },

    updateGenre: function (bookID) {
        if(this.message3==null){   // this only to prevent saving a book with an empty name
        this.alrt();
        console.log("empty field");
        return;
        }

        console.log("update book with ID " + bookID);
        axios.patch('/api/admin/books/'+bookID,{

        genre :this.message3
        
        })
                .then( 
                    response => {
                
                        //This code basically finds the camel under question in the array and deletes it (using splice)
                    
                    if (response.status==200) {
                            console.log("status code: " + response.status);
                            this.getBooks();
                            // location.reload();

                        }
                })
                .catch(error => {
                    console.log(error);
                })
                .then(function () {
                });

            },
    //  countDownChanged (dismissCountDown) {
    //     this.dismissCountDown = dismissCountDown
    //   },
    //   showAlert () {
    //     this.dismissCountDown = this.dismissSecs
    //   }

        deleteBook: function (bookID) {
                console.log("Deleting book with ID " + bookID);
                axios.delete('/api/admin/books/'+bookID)
                .then(
                    response => {
                        //This code basically finds the camel under question in the array and deletes it (using splice)
                        var localIndex = -1;
                        for (var i=0; i < this.books.length; i++) {
                            if (this.books[i]._id === bookID) {
                                localIndex = i;
                                i = this.books.length;
                            }
                        }
                        if (localIndex !== -1) {
                            //Vue reacts to splice. So removing the element here causes the DOM to update.
                            this.books.splice(localIndex, 1); 
                        }
                        console.log("Success: " + response.status);
                })
                .catch(error => {
                    console.log(error);
                })
                .then(function () {
                });

            },

            alrt:function() {
                window.alert("you can't add an empty name!!");    // this function shows the alrt window 
            }


            
        },

        
            
        //This basically means that once Vue is ready, we call getCamels() to fetch
        //all camels and populate our DOM tree with them.
        mounted () {
        console.log("Loaded books component");
        this.getBooks();
        }
    };


</script>