
<template>
  <div class="text-center">
    

<div class="container-fluid smth col-sm-12">
        <h4> Reader Name</h4>
        <div class="form-group">
        <select v-model="selectedUser">
           <option disabled value="">Please select Reader</option>
           <option  v-for="user in users" v-bind:key="user._id"  :value="user._id" >
             {{user.name}}
              </option>
          </select>
         </div>
          <!-- <label class="pull-left"> Reader ID </label> -->
          <!-- <input type="text" class="form-control" placeholder="e.g. 5ba954a131face3e6cd54a17" v-model="Review.postedBy"> -->
       
        <div class="form-group">
          <label class="pull-left"> Feedback </label>
          <input type="text" class="form-control"  placeholder="e.g. Ranim is cool" v-model="Review.feedback">
        </div>
        
        <button type="submit" class="btn pinkbtn" @click="addReview()">Submit Review</button>

      </div>
<div class="container-fluid smth col-sm-12">
      <h3>Reviews</h3>
       <div v-for="review in reviews" v-bind:key="review._id" class="media border p-3 mt-3 mb-3">
           
           <!--     <div class="media-body">
           <button type="button" class="btn">{{review.postedBy}}: {{review.feedback}}
                </button>
                    </div> -->

            <div class="media-body">
                <button type="button" class="close btn" @click="deleteReview(review._id)" style="float:right;">&times;</button>
                <p  v-if ="review.postedBy" class="review-content  p-3 mt-3 mb-3">{{review.postedBy.name}}:</p>
                <p class="review-content  p-3 mt-3 mb-3">{{review.feedback}}</p> 

             <div class="container col-sm-2">
<!--<button type="button" class="edit" @click="updateReview(review._id, message)" style="float:right;"><span class="glyphicon glyphicon-pencil">Update</span></button> -->


<button type="button" class="edit" data-toggle="modal" v-bind:data-target="'#review-modal-'+review._id">
  <span class="glyphicon glyphicon-pencil">Edit</span>
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
        <button type="button" class="btn btn-primary" @click="updateReview(review._id)"  data-dismiss="modal" aria-label="Close">Save changes</button>
      </div>
    </div>
  </div>
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
  name:"ListReviews",
  data () {
    return {
    reviews: [],
     Review : {book:'',feedback:'',postedBy:''},
     selectedUser:'',
     users:[],
    }
  },
  methods: {
         getReviews: function () {
            axios.get('/api/user/reviews/book/'+this.$route.params.id )
            .then(
                response => {
                    //This is only an example of how you can access the status code
                    if (response.status!==200) {
                        console.log("Wrong status code: " + response.status);
                    }
                    //If we get a response, empty the books array and fill it with all books from our endpoints
                    this.reviews.length = 0;
                    for (var i = 0; i < response.data.data.length; i++) {
                        this.reviews.push(response.data.data[i]);
                    }
            })
            .catch(error => {
                //In case of error, empty the books array.
                this.reviews.length = 0;
                console.log(error);
            })
            .then(function () {
                //This code is always executed, independent of the request being successful or not.
            });
        },

addReview: function(){
      let newReview ={
        book: this.$route.params.id,
        feedback:this.Review.feedback,
        postedBy:this.selectedUser
      }

    axios.post('/api/user/reviews/',newReview)
    .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });



},

deleteReview: function (reviewID) {
            console.log("Deleting review with ID " + reviewID);
            axios.delete('/api/user/reviews/'+reviewID)
            .then(
                response => {
                    var localIndex = -1;
                    for (var i=0; i < this.reviews.length; i++) {
                        if (this.reviews[i]._id === reviewID) {
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
                          this.getReviews();

                    }
            })
            .catch(error => {
                console.log(error);
            })
            .then(function () {
            });

          },
          alrt:function() {
            window.alert("you can't add an empty name!!");    // this function shows the alrt window 
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
    //This basically means that once Vue is ready, we call getBooks() to fetch
    //all books and populate our DOM tree with them.
    mounted () {
 this.getReviews();
 this.getUsers();
    }
};
</script>