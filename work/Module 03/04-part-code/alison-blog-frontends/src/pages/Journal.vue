<template>
  <Layout>
    <div class="container">
      <div class="journal-hero">
        <h1 class="journal-header">a wise person once said...</h1>
      </div>
    </div>
    <g-link
      v-for="edge in $page.journals.edges"
      :key="edge.node.id"
      :to="`/journal/${edge.node.name}/${edge.node.id}`"
      class="journal-post"
      ><div class="container journal">
        <h2 class="journal-title">{{ edge.node.title }}</h2>
        <p class="journal-excerpt">{{edge.node.excerpt}}</p>
      </div>
    </g-link>
  </Layout>
</template>

<page-query>
query {    
  journals: allStrapiJournal(sortBy: "id", order: ASC)  {
    edges {
      node {
        id
        title
        name
        excerpt
      }
    }
  }
}
</page-query>

<script>
export default {
  name: "Journal",
};
</script>

<style scoped>

.journal-title {
	font-size:2rem;
	color: var(--color-contrast);
}
</style>