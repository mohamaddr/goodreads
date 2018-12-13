<template>
  <div class="container">
  
    <form>
  
      <div class="well">
        <h4> Add Review</h4>
        <div class="form-group">
          <!-- <label class="pull-left"> bookID </label>
          <input type="text" class="form-control" placeholder="bookID" v-model="Review.book"> -->
          <select v-model="selectedBook">
           <option disabled value="">Please select book</option>
           <option  v-for="book in books" v-bind:key="book._id"  :value="book._id" >
             {{book.name}}
              </option>
          </select>
        </div>
        <div class="form-group">
          <label class="pull-left">feedback</label>
          <input type="text" class="form-control" placeholder="feedback" v-model="Review.feedback">
        </div>
         <div class="form-group">
        <select v-model="selectedUser">
           <option disabled value="">Please select user</option>
           <option  v-for="user in users" v-bind:key="user._id"  :value="user._id" >
             {{user.name}}
              </option>
          </select>
         </div>
      </div>
      <button type="submit" class="btn btn-large btn-block btn-primary full-width" @click="addReview()">add</button>
    </form>
  
   </div>
  </template>




<script>
var axios = require('axios');
module.exports = {
name : "addReview",
data(){
    return {
        Review : {book:'',feedback:'',postedBy:''},
        books: [],
        users:[],
        selectedBook:'',
        selectedUser:'',

    }
},

methods:{

  addReview: function(){
      let newReview ={
        book: this.selectedBook,
        feedback:this.Review.feedback,
        postedBy:this.selectedUser
      }

            
  if(this.selectedBook==""||this.Review.feedback==""|| this.selectedUser==""){

   this.alrt();
   return;
  }
    axios.post('/api/user/reviews/',newReview)
    .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });



},

alrt:function() {
            window.alert("you can't add an empty review!!");    // this function shows the alrt window 
        },


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
     getUsers: function () {
             console.log("get all users from the data base");
            axios.get('/api/admin/users')
            .then(
                response => {
                    //This is only an example of how you can access the status code
                    if (response.status!==200) {
                        console.log("Wrong status code: " + response.status);
                    }
                    //If we get a response, empty the camels array and fill it with all camels from our endpoints
                    this.users.length = 0;
                    for (var i = 0; i < response.data.data.length; i++) {
                        this.users.push(response.data.data[i]);
                    }
            })
            .catch(error => {
                //In case of error, empty the camels array.
                this.users.length = 0;
                console.log(error);
            })
            .then(function () {
                //This code is always executed, independent of the request being successful or not.
            });
        
   }



},
 mounted () {
        this.getBooks();
        this.getUsers();
    }

};

</script>



