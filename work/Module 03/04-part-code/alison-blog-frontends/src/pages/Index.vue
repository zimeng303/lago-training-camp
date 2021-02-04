<template>
  <Layout>
    <div class="container">
      <div class="hero">
        <h1 class="hero-title">{{ hero.title }}</h1>
        <h2 class="hero-subtitle">
          {{ hero.subtitle }}
        </h2>
      </div>

      <div class="projects">
        <div
          class="project"
          v-for="edge in $page.projects.edges"
          :key="edge.node.id"
        >
          <g-link
            :to="`/projects/${edge.node.name}/${edge.node.id}`"
            class="project-link"
          >
            <img
              :alt="edge.node.title"
              :src="GRIDSOME_API_URL + edge.node.thumbnail.url"
              width="2560"
              class="thumbnail g-image g-image--lazy g-image--loaded"
              sizes="(max-width: 2560px) 100vw, 2560px"
            />
            <h3 class="project-title">{{ edge.node.title }}</h3>
            <div class="categories">
              <span class="category">photography</span>
              <span
                class="category"
                v-for="category in edge.node.categories"
                :key="category.id"
              >
                {{ category.photography }}
              </span>
            </div>
          </g-link>
        </div>
      </div>
    </div>

    <div>
      <div class="latest-journals-heading container">
        <span class="label">Latest and greatest</span>
      </div>
      <div class="latest-journals">
        <div class="container">
          <g-link
            v-for="edge in $page.journals.edges"
            :key="edge.node.id"
            :to="`/journal/${edge.node.name}/${edge.node.id}`"
            class="journal"
          >
            <h3 class="journal-title">
              {{ edge.node.title }}
            </h3>
          </g-link>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  allStrapiHero {
    edges {
      node {
        title
        subtitle
      }
    }
  }

  projects: allStrapiProject(sortBy: "id", order: ASC) {
    edges {
      node {
        id
        title
        content
        name
        thumbnail  {
          name
          url
        }
        categories {
          id
          photography
        }
      }
    }
  }

  journals: allStrapiJournal(sortBy: "id", order: ASC)  {
    edges {
      node {
        id
        title
        name
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: "Hello, world!",
  },

  computed: {
    hero() {
      return this.$page.allStrapiHero.edges[0].node;
    },
  },
};
</script>

<style scoped>
.project {
  grid-column: auto/span 2;
  text-align: center;
}

@media (min-width: 920px) {
  .project {
    grid-column: auto/span 1;
  }
}

@media (min-width: 920px) {
  .project:nth-child(3n + 1) {
    grid-column: auto/span 2;
  }
}

.project-title {
  font-size: 1rem;
  color: var(--color-contrast);
  margin: 2rem 0 1rem;
}

.journal:hover {
    background: var(--color-base-1);
}


.categories {
    font-size: .8rem;
    color: var(--color-contrast-1);
}

.category {
    margin-right: .8rem;
}

.category:last-of-type {
    margin: 0;
}
</style>
