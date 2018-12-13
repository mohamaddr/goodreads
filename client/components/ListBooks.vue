
<template>

    <div class="text-center">
        <h3>Books</h3>
        <p>Here we list all the books the (default) backend provides.</p>
        <div v-for="book in books" v-bind:key="book._id" class="media border p-3 mt-3 mb-3">
             <img src="book.png" alt="Book" class="mr-3 mt-3" style="width:60px;">


               <router-link :to="{ path:'/bookReviews', name: 'bookReviews', params: { id: book._id }}">
                <div class="media-body">
           <button type="button" class="btn wide-btn">{{book.name}}- By: {{book.author}} <P> {{book.genre}}.</p> 
                </button>
                    </div>
                </router-link>
           
              
                    
              
                 
          </div>

        </div>
        

</template>

<script>


var axios = require('axios');

module.exports = {
  name:"ListBooks",
  data () {
    return {
      books: [],
    reviews: []
    }
  },
  methods: {
      //Performs a GET request to /api/user/books using AXIOS.
        getBooks: function () {
            axios.get('/api/user/books')
            .then(
                response => {
                    //This is only an example of how you can access the status code
                    if (response.status!==200) {
                        console.log("Wrong status code: " + response.status);
                    }
                    //If we get a response, empty the books array and fill it with all books from our endpoints
                    this.books.length = 0;
                    for (var i = 0; i < response.data.data.length; i++) {
                        this.books.push(response.data.data[i]);
                    }
            })
            .catch(error => {
                //In case of error, empty the books array.
                this.books.length = 0;
                console.log(error);
            })
            .then(function () {
                //This code is always executed, independent of the request being successful or not.
            });
        }
    }, 
    //This basically means that once Vue is ready, we call getBooks() to fetch
    //all books and populate our DOM tree with them.
    mounted () {
        this.getBooks();
    }
};
</script>