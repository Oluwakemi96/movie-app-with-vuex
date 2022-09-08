<template>
  
    <NavBar></NavBar>
    <router-view/>
  
</template>

<script>
  import NavBar from './components/NavBar.vue'

  export default {
    name: "App",
    components: {
      NavBar
    }
}
</script>
<style>

@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap');
body{
  margin: 0;
  background-color: #242222;
  color: white;
  font-family: "DM sans", system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.container{
  width: calc(100vw - 64px);
  margin-inline: auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50; */
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
