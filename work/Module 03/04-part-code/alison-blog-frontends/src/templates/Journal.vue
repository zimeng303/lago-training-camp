<template>
  <Layout>
    <div class="journal">
      <div class="container journal-container">
        <div class="journal-header">
          <h1 class="journal-title">{{ journal.title }}</h1>
          <div class="journal-meta">
            <div class="journal-author">
              <span class="label">Author</span
              ><span class="author-name">{{ journal.author }}</span>
            </div>
            <div class="journal-date">
              <span class="label">Date</span>
              <div>{{ journal.created_at | date('D. MMM YYYY') }}</div>
            </div>
            <div class="journal-time">
              <span class="label">Time</span><span>1 min read</span>
            </div>
          </div>
        </div>
        <div class="journal-content" v-html="mdToHtml(journal.content)"></div>
      </div>
    </div>
  </Layout>
</template>

<page-query>

query($id: ID!) {
  strapiJournal(id: $id) {
    title
    content
    author
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
  name: "Journal-Detail",
  computed: {
    journal() {
      return this.$page.strapiJournal;
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
.journal-container {
  max-width: 840px;
}
.journal-header {
  padding: 2rem 0 4rem;
}

.journal-title {
  font-size: 4rem;
  margin: 0 0 4rem;
  padding: 0;
}
.journal-meta {
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8rem;
}

.journal-meta > div {
  margin-right: 4rem;
}

.journal-meta > div:last-of-type {
  margin: 0;
}
</style>