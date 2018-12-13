
<template>
    <div class="card-columns">   
        <div v-for="review in reviews" v-bind:key="review._id" class="card">

         <div v-if ="review.book" class="card-body">book: {{review.book.name}}</div>   
         <div class="card-body">feedback: {{review.feedback}}</div>  
          <div v-if ="review.postedBy" class="card-body">postedby: {{review.postedBy.name}}</div>  
  <button type="button"  class="btn btn-primary" @click="deleteReview(review._id)">delete</button> 
    

<button type="button" class="btn btn-primary" data-toggle="modal" v-bind:data-target="'#review-modal-'+review._id">
    edit
</button>

<div class="modal" :id="'review-modal-'+review._id" tabindex="-1" role="dialog" aria-labelledby="exampleModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalVerticalLabel">add new feedback</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <input v-model="message" placeholder="add new feedback" class="form-control" type="text">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="updateReview(review._id)" aria-label="Close" data-dismiss="modal">Save changes</button>
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
  name:"ListReview",
  data () {
    return {
      reviews: [],
      
    }
  },
  methods: {
      //Performs a GET request to /api/reivew using AXIOS.
        getReview: function () {
            axios.get('/api/admin/reviews/')
            .then(
                response => {
                    //This is only an example of how you can access the status code
                    if (response.status!==200) {
                        console.log("Wrong status code: " + response.status);
                    }
                    //If we get a response, empty the review array and fill it with all review from our endpoints
                    this.reviews.length = 0;
                    for (var i = 0; i < response.data.data.length; i++) {
                        this.reviews.push(response.data.data[i]);
                    }
            })
            .catch(error => {
                //In case of error, empty the review array.
                this.reviews.length = 0;
                console.log(error);
            })
            .then(function () {
                //This code is always executed, independent of the request being successful or not.
            });
        }, 
        //Performs a DELETE request to the review with the provided ID.
        deleteReview: function (reivewID) {
            console.log("Deleting user with ID " + reivewID);
            axios.delete('/api/user/reviews/'+reivewID)
            .then(
                response => {
                    //This code basically finds the review under question in the array and deletes it (using splice)
                    var localIndex = -1;
                    for (var i=0; i < this.reviews.length; i++) {
                        if (this.reviews[i]._id === reivewID) {
                            localIndex = i;
                            i = this.reviews.length;
                        }
                    }
                    if (localIndex !== -1) {
                        //Vue reacts to splice. So removing the element here causes the DOM to update.
                        this.reviews.splice(localIndex, 1); 
                    }
                    console.log("Success: " + response.status);
            })
            .catch(error => {
                console.log(error);
            })
            .then(function () {
            });

        },

    updateReview: function (reviewID) {
    if(this.message==null){   // this only to prevent saving a user with an empty name
      this.alrt();
      console.log("empty feild");
      return;
    }

     console.log("update review with ID " + reviewID);
       axios.patch('/api/user/reviews/'+reviewID,{

       feedback :this.message 
       
       })
            .then( 
                response => {
            
                    //This code basically finds the camel under question in the array and deletes it (using splice)
                 
                 if (response.status==200) {
                        console.log("status code: " + response.status);
                          this.getReview();
                       

                    }
            })
            .catch(error => {
                console.log(error);
            })
            .then(function () {
            });

          },
          alrt:function() {
            window.alert("you can't add an empty feedback!!");    // this function shows the alrt window 
        }

    }, 
    //This basically means that once Vue is ready, we call getCamels() to fetch
    //all camels and populate our DOM tree with them.
    mounted () {
        this.getReview();
    }
};
</script>
