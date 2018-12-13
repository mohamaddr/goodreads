<template>
  <div class="container">
    <form>
      <div class="well">
        <h4>add new user</h4>
        <div class="form-group">
          <label class="pull-left"> Name: </label>
          <input type="text" class="form-control"  v-model="User.name">
        </div>
      </div>
      <button type="submit" class="btn btn-large btn-block btn-primary full-width" @click="addUser()">add</button>
    </form>

 </div>





</template>




<script>
var axios = require('axios');
module.exports = {
name : "addnewUser",
data(){
    return {
        User : {name:''}

    }
},

methods:{


  addUser: function(){
  

      let newUser ={

        name: this.User.name
      }

       
  if(this.User.name==""){

   this.alrt();
   return;
  }
    axios.post('/api/admin/users/',newUser)
    .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });



},
alrt:function() {
            window.alert("you can't add an empty name!!");    // this function shows the alrt window 
        }


}


}

</script>
