const endPoint = 'https://script.googleusercontent.com/macros/echo?';

const app = Vue.createApp({
  data() {
    return {
      posts: [],
      categoryFilter: '',
      categories: []
    };
  },
  async created() {
      const response = await fetch(endPoint);
      const jsonData = await response.json();

      this.posts = jsonData;
      console.log(jsonData);

      this.categories = [...new Set(jsonData.map(post => post.category))];
      console.log(jsonData.map(post => post.category));

  },
  computed: {
    filteredPosts() {
      if (this.categoryFilter === '') {
        return this.posts;
      } else {
        return this.posts.filter(post => post.category === this.categoryFilter);
      }
    }
  },
});
app.mount('#app');