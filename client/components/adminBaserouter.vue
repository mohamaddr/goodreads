<!-- baserouter.vue -->
<template>
  <div>
    <!-- This is our header. Just a Jumbotron with some static info and a navigation bar -->

    <div class="jumbotron bg-accent-2 text-white mb-0"> 
     
      <h1 class="display-2 text-light text-uppercase">GOOD READER</h1> 
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#/listReviews">Reviews</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/books">Books</a>
          </li>
            <li class="nav-item">
            <a class="nav-link" href="#/users">Users</a>
          </li>

         <li class="nav-item">
         <a class="nav-link" href="#/addUser">Add new user</a>
        </li>
         <li class="nav-item">
         <a class="nav-link" href="#/addBook">Add new book</a>
         </li>
         <li class="nav-item">
        <a class="nav-link" href="#/addReview">Add new review</a>
          </li>
      
        </ul>
    
      </nav>

   



    </div>
  
    <!-- This is our footer -->
    <div class="row">
      <!-- The empty col-2 here are just used as a placeholder on the right and left -->
      <div class="col-sm-2">
      </div>
    
      <!-- Router view is where we will mount our dynamic content -->
      <div class="col-sm-8 text-center">
        <router-view></router-view>
      </div>
    
      <div class="col-sm-2">
      </div>
    </div>
  
  <!-- This is our footer -->
  <div class="jumbotron bg-accent-2 text-white mb-0" style="margin-bottom:0">
    <p>Created by Group 12</p>
  </div>
</div>
</template>

<script>
  module.exports = {
    name:"BaseRouter"
  };

</script>





