<template>
  <Layout :style="{ color: project.color, background: project.bgColor }">
    <div class="project">
      <div class="container">
        <div class="project-header">
          <h1 class="project-title">{{ project.title }}</h1>
          <div class="project-info">
            <div class="categories-container">
              <div class="categories">
                <span class="label">Categories</span>
                <span class="category">photography</span>
                <span
                  class="category"
                  v-for="category in project.categories"
                  :key="category.id"
                >
                  {{ category.photography }}
                </span>
              </div>
            </div>
            <div class="year-container">
              <span class="label">Year</span>
              <div v-html="new Date(project.created_at).getFullYear()"></div>
            </div>
          </div>
        </div>
        <div class="content" v-html="mdToHtml(project.content)"></div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  project: strapiProject (id: $id) {
    title
    content
    thumbnail  {
      name
      url
    }
    categories {
      id
      photography
    }
    color
    bgColor
    created_at
  }
}

</page-query>

<script>
import MarkdownIt from "markdown-it";
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

export default {
  name: 'Project-Detail',
  computed: {
    project() {
      return this.$page.project;
    },
  },
  methods: {
    mdToHtml(markdown) {
      if (md.validateLink(markdown)) {
        const arr = markdown.split("/uploads/");
        arr[0] += this.GRIDSOME_API_URL;
        markdown = arr.join("/uploads/");
      }

      return md.render(markdown);
    },
  },
};
</script>

<style scoped>
.project-title {
  font-size: 4rem;
  margin: 0 0 4rem;
  padding: 0;
}

</style>