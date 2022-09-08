<template>
  <div class="home">


    <form class="input-container" @submit.prevent="search(1)">
      <input type="text" placeholder="Enter movie title..." v-model="searchKeyword">
     <MButton>
       Search
     </MButton>
     
    </form>

    <div class="error">
      {{error}}
    </div>

   <LoadingState v-if="loading"></LoadingState>

    <div class="posters" v-if="movieList.length === 0 && !loading">
      <img src="@/assets/poster.svg" alt="Movie Poster">
    </div>

    <div class="container">
      <div class="movie-list" v-if="movieList !== 0 && !loading">
        <div class="movie" v-for="movie in movieList" :key="movie.imdbID" @click="goToMovie(movie.imdbID)">
          <div class="image">
            <img :src="movie.Poster" alt="">
          </div>
          <div class="title">{{ movie.Title }}</div>
          <div class="additional">
            <div class="type">{{ movie.Type }}</div>
            <div class="mid">&middot;</div>
            <div class="year">{{ movie.Year }}</div>
          </div>
        </div>
      </div>

      <div class="pagination">
        <div :class="['page',  {'active': page === currentPage}]" v-for="page in totalPages"  :key="page" @click="currentPage = page">
          {{page}}
        </div>
      </div>
    </div>

  </div>


</template>

<script>
import MButton from '@/components/Button.vue'
import { mapState, mapActions } from 'vuex';
import LoadingState from '@/components/LoadingState.vue';
// import { searchMovie } from '@/api/movies'
export default {
  name: 'HomeView',
  data: () => ({
    searchKeyword: "",
    currentPage: 1,
    
  }),

  components: {
    MButton,
    LoadingState
},
  computed: {
    ...mapState(['movieList', 'loading', 'error', 'totalResults']),
    totalPages() {
      return Math.ceil(this.totalResults / 10);
     }
  },

  methods: {

    ...mapActions(['fetchAllMovies', 'clearList']),
     search(page) {   
      if (page) {
        this.currentPage = page;
      }
       this.$router.replace({ query: { s: this.searchKeyword}})
       const options ={
        searchPhrase: this.searchKeyword,
        page: page || this.currentPage
       }
      this.fetchAllMovies( options )
      // this.$route.query.searchPhrase = this.searchKeyword
    },

    goToMovie(movieId) {
      this.$router.push(`/${movieId}`)
    }
  },
  mounted() {
    this.clearList()
    this.searchKeyword = this.$route.query.s
    if(this.searchKeyword){
      this.search();
    }
    
  },

  watch:{
    currentPage() {
      this.search();
    }
  }
}
</script>

<style scoped>

  
.error{
  text-align: center;
  margin-block: 1rem;
  color: #C53939;
  font-size: 20px;
}

.loading-state{
  min-height: 400px;
  display: grid;
  place-content: center;
}

.input-container {
  width: calc(100vw - 64px);
  max-width: 507px;
  height: 45px;
  margin-top: 72px;
  margin-inline: auto;
  padding: 6px;
  display: flex;
  border-radius: 100px;
  background-color: #313030;
  position: sticky;
  top: 80px;
  z-index: 90;
  
}

.input-container:focus-within {
  box-shadow: 0 0 0 2px #C53939;
}

::placeholder {
  opacity: 0.8;
  font-size: 16px;
}

.input-container input {
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  padding-inline: 20px 16px;
  color: white;
  font-size: 16px;
  
}


.posters {
  margin-top: 140px;
  width: 100%;
}

.posters img {
  display: block;
  width: 90%;
  max-width: 715px;
  margin-inline: auto;
}

.movie-list {
  max-width: 1200px;
  margin-inline:auto;
  margin-block: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, auto));
  gap: 32px;
}


@media (min-width: 800px) {
  .movie-list{
    grid-template-columns: repeat(5, 1fr);
  }
}


.movie{
  width: 100%;
  transition: transform 300ms ease;
  cursor: pointer;
}

.movie:hover{
  transform: scale(1.05);
}

.movie .title{
  font-weight: 700;
}

.movie .image img{
  width: 100%;
  height: 310px;
  object-fit: cover;
}

.movie .additional{
  display: flex;
  gap: 8px;
  opacity: 0.55;
}

.movie .type{
  text-transform: capitalize;
}

.movie .additional .mid{
  font-size: 40px;
  line-height: 20px;
}

.pagination{
  display: flex;
  gap: 4px;
  widows: 100%;
  overflow-x: auto;
  margin-block: 32px;
}

.page.active{
  background-color: #C53939;
}

.page{
  min-width: 40px;
  height: 40px;
  display: grid;
  place-content: center;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
}

.page:not(.active):hover{
  background-color: rgba(255, 255, 255, 0.2);
}





</style>
