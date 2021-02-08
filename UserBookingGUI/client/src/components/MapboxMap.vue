<template>
  <main>
    <div class="text-container">
      <p>Center: {{ center }}</p>
      <p>Zoom: {{ zoom }}</p>
    </div>
    <div id="map"></div>
  </main>
</template>

<script>
import mapboxgl from "mapbox-gl";

export default {
  name: "MapboxMap",
  data() {
    // Set initial data, this.createMap() configures event listeners that update data based on user interaction
    return {
      center: [11.965216102046611, 57.70635929297478], // Gothenburg
      zoom: 11
    };
  },
  mounted() {
    // create the map after the component is mounted
    this.createMap();
  },
  methods: {
    createMap() {
      // instantiate map.  this method runs once after the vue component is mounted to the dom
      this.map = new mapboxgl.Map({
        accessToken:
          "pk.eyJ1IjoiZ3Vzam9oZG8iLCJhIjoiY2toa3Nqbmh5MWpyOTJxbzk2ZjFuMGM2diJ9.7VhD18geRSiwNBS4LSFJdA",
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        minzoom: 5,
        center: this.center, // use initial data as default
        zoom: this.zoom,
        hash: true // sets url's hash to #zoom/lat/lng
      });

      // set mapbox event listeners to update Vue component data
      this.map.on("move", () => {
        // set the vue instance's data.center to the results of the mapbox instance method for getting the center
        this.center = this.map.getCenter();
      });
      this.map.on("zoom", () => {
        // set the vue instance's data.zoom to the results of the mapbox instance method for getting the zoom
        this.zoom = this.map.getZoom();
      });
    }
  }
};
</script>

<style scoped>
#map {
  height: 400px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid darkgrey;
}

.text-container {
  max-width: 500px;
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: flex-start;
  margin: 0 auto; /* center text container */
}
</style>
