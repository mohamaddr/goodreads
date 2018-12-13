// ownerMain.js - Main javascript file for the Owner SPA
const Vue = require('vue');
const VueRouter = require('vue-router');



// tell vue.js to use router capabilities
Vue.use(VueRouter);

// routing vueified components
// Specifically, we have one component showing a static home page (ownerHome) and one component showing a list of camels (ownerListCamels)
var router = new VueRouter({
  routes: [
    { path: '/users', component: require("./components/adminListUsers.vue") },
    { path: '/listReviews', component: require("./components/adminListReviews.vue") },
	{ path: '/books', component: require("./components/adminListBooks.vue") },
    { path: '/addUser', component: require("./components/createUser.vue")},
    { path: '/addReview', component: require("./components/createReview.vue")},
    { path: '/addBook', component: require("./components/createBook.vue")}

  ]
});

// this vue component will act as the root for our SPA
var baserouter = require("./components/adminBaserouter.vue");

// and finally, mount the view-model instance
new Vue({
  router: router,
  render: function (createElement) {
    return createElement(baserouter);
  }
}).$mount("#mountpoint");
//The mount command tells Vue where to place the template content (in HTML element with id mountpoint)