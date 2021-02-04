<template>
  <div class="layout" :class="{ 'sticky-header' : $route.path === '/'}">
    <header class="header" :class="{ 'sticky' : $route.path === '/' || $route.path.startsWith('/projects')}">
      <div class="container">
        <div class="left">
          <g-link to="/">
            <img
              :src="$static.metadata.siteUrl"
              :alt="$static.metadata.siteName"
              class="logo"
            />
          </g-link>
        </div>
        <nav class="nav right">
          <g-link class="nav__link" to="/journal/">Journal</g-link>
          <g-link class="nav__link" to="/contact/">Say Hi</g-link>
        </nav>
      </div>
    </header>

    <slot />

   

    <footer class="footer">
      <div class="container">Copyright © 2021</div>
    </footer>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName,
    siteUrl
  }
}
</static-query>

<style>
</style>
