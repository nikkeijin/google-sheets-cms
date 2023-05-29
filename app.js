const endPoint = 'THE_URL_OF_YOUR_GOOGLE_SHEETS_JSON';

const app = Vue.createApp({
  data() {
    return {
      posts: [],
      categoryFilter: '',
      categories: [],
      tagFilter: '',
      tags: []
    };
  },
  async created() {
      const response = await fetch(endPoint);
      const jsonData = await response.json();
      this.posts = jsonData;

      this.categories = [...new Set(jsonData.map(post => post.category))];
      this.tags = [...new Set(jsonData.map(post => post.tag))];
  },
  computed: {
    filteredPosts() {
      if (this.categoryFilter === '' && this.tagFilter === '') {
        return this.posts;
      } else {
        return this.posts.filter(post => {
          if (this.categoryFilter !== '' && post.category !== this.categoryFilter) {
            return false;
          }
          if (this.tagFilter !== '' && !post.tag.includes(this.tagFilter)) {
            return false;
          }
          return true;
        });
      }
    }
  },  
});
app.mount('#app');
