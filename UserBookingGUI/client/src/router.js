import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";
import BookingSite from "./views/BookingSite.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "bookingLanding",
      component: BookingSite
    },
    {
      //Quick explanation:
      //when clicking on the "Book Now" button in BookingSite, it takes you to the section with the Id titleBookSection (where you do the booking)
      //After that, the link becomes http://localhost:8080/#/titleBookSection
      //So, if we don't add this path here and you refresh the page, it'll be blank because we don't have a component assigned to this route
      path: "/titleBookSection",
      name: "titleBookSection",
      component: BookingSite
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
