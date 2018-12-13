<!-- ownerHome.vue -->
<!-- This is a really basic (static) Vue component.
We just demonstrate how data (variables in the Vue instance) can be bound to HTML elements -->

<template>

 
<div class="card-columns">
  
 <div v-for="user in users" v-bind:key="user._id" class="card" >
      <img class="card-img-top" src="img_avatar3.png" alt="user" style="width:100%">
    
      <div class="card-body">NAME: {{user.name}}</div>
   <button type="button" class="btn btn-primary" @click="deleteUser(user._id)">delete</button>



<button type="button" class="btn btn-primary" data-toggle="modal" v-bind:data-target="'#user-modal-'+user._id">
    edit
</button>

<div class="modal" :id="'user-modal-'+user._id" tabindex="-1" role="dialog" aria-labelledby="exampleModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalVerticalLabel">add new name</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <input v-model="messge" vplaceholder="add new name" class="form-control" type="text" >
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="updateUser(user._id)" aria-label="Close" data-dismiss="modal">Save changes</button>
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
      users:[]

     
    }
  },

   methods: {
      //Performs a GET request to /api/review using AXIOS.
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
        
   },
   updateUser: function (userID) {
    if(this.messge==null){   // this only to prevent saving a user with an empty name
      this.alrt();
      console.log("empty feild");
      return;
    }

     console.log("update user with ID " + userID);
       axios.put('/api/admin/users/'+userID,{

       name :this.messge
       
       })
            .then( 
                response => {
            
                    //This code basically finds the camel under question in the array and deletes it (using splice)
                 
                 if (response.status==200) {
                        console.log("status code: " + response.status);
                      
                          //location.reload();
                          this.getUsers();
  
                    }
            })
            .catch(error => {
                console.log(error);
            })
            .then(function () {
            });

          },
  

     deleteUser: function (userID) {
            console.log("Deleting user with ID " + userID);
            axios.delete('/api/admin/users/'+userID)
            .then(
                response => {
                    //This code basically finds the camel under question in the array and deletes it (using splice)
                    var localIndex = -1;
                    for (var i=0; i < this.users.length; i++) {
                        if (this.users[i]._id === userID) {
                            localIndex = i;
                            i = this.users.length;
                        }
                    }
                    if (localIndex !== -1) {
                        //Vue reacts to splice. So removing the element here causes the DOM to update.
                        this.users.splice(localIndex, 1); 
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
      this.getUsers();
    }
 };


</script>