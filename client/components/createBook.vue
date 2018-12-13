<template>
  <div class="container">
    <form>
      <div class="well">
        <h4>Add new book</h4>
        <div class="form-group">
          <label class="pull-left"> Book name: </label>
          <input type="text" class="form-control" placeholder="book name" v-model="Book.name">
        </div>
        <div class="form-group">
          <label class="pull-left"> Author: </label>
          <input type="text" class="form-control"  placeholder="Author" v-model="Book.author">
        </div>
        <div class="form-group">
          <label class="pull-left"> Genre: </label>
          <input type="text" class="form-control" placeholder="Genre" v-model="Book.genre">
        </div>
      </div>
      <button type="submit" class="btn btn-large btn-block btn-primary full-width" @click="addBook()">add</button>
    </form>

 </div>





</template>




<script>
var axios = require('axios');
module.exports = {
name : "addNewbook",
data(){
    return {
        Book : {name:'',author:'',genre:''}

    }
},

methods:{

  addBook: function(){
      let newBook ={
        name: this.Book.name,
        author:this.Book.author,
        genre:this.Book.genre
      }

                
  if(this.Book.name==""||this.Book.author==""||this.Book.genre==""){

   this.alrt();
   return;
  }
    axios.post('/api/admin/books/',newBook)
    .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });



},
alrt:function() {
            window.alert("you can't add an empty book!!");    // this function shows the alrt window 
        }


}


}

</script>
