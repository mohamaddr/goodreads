<!-- baserouter.vue -->
<template>
  <div>
    <!-- This is our header. Just a Jumbotron with some static info and a navigation bar -->

    <div class="jumbotron text-center w-75 mx-auto"> 
      <h1>Welcome to Goodreads!</h1>
      <nav class="navbar navbar-expand-sm ">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/listBooks">List Books</a>
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
  <div class="jumbotron text-center w-75 mx-auto " style="margin-bottom:0">
    <h3>Created by Group12.</h3>
  </div>
</div>
</template>

<script>
  module.exports = {
    name:"BaseRouter"
  };
</script>