<!-- ownerHome.vue -->
<!-- This is a really basic (static) Vue component.
We just demonstrate how data (variables in the Vue instance) can be bound to HTML elements -->
<template>
  <div>
    <h1>{{title}}</h1>
    <p>{{description}}</p>
  </div>
</template>

<script>
module.exports = {
  name:"Home",
  data () { 
    return {
      title:"Book Reader Home",
      description:"Hello good-reader! here is your dream book SPA, you can view all books stored in Goodreads database, write a review then edit/ delete it if you changed your mind ;) \r\n don't forget to rate us so we can get a G on this assignment, thanks. \r\n Cheers, \r\n Group 12 <3"
    }
  }
};
</script>