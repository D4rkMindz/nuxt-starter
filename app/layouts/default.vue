<script setup lang="ts">
useI18n()
const menuOpen = ref(false);
</script>

<template>
  <div class="layout-container">
    <header-nav/>
    <main class="pt-20 grow">
      <slot/>
    </main>

    <Footer/>
  </div>
</template>

<style>
@reference "#main";
html, body {
  @apply bg-blue-200 text-gray-950 dark:bg-gray-900 dark:text-gray-100 w-[100dvw] min-h-screen m-0 p-0;
}

.nav {
  @apply fixed m-0 h-[100dvh] top-0 bottom-0 right-0 left-0 bg-gray-900 flex flex-col;
  transition: 1300ms ease-in-out;

  &.hidden {
    display: none;
  }

  .nav-items {
    @apply flex flex-col justify-center my-[15dvh] mx-[5dvw] md:mx-[20dvw] xl:mx-[30dvw];

    .nav-item {
    $border: 5 px;
      @apply relative w-full rounded-lg text-center bg-gray-100 dark:bg-gray-900 text-3xl mx-auto my-2 px-[4rem] py-[2rem];
      transition: 300ms ease-out;
      background-clip: padding-box;
      /* !importanté */
      border: solid $border transparent; /* !importanté */

      &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        margin: -$border; /* !importanté */
        border-radius: inherit; /* !importanté */
        background: linear-gradient(to right, purple, red);
      }

      &:hover {
        background-color: transparent;
        transition: 300ms ease-in;
      }
    }
  }
}

.menu {
  @apply w-full pt-3 flex flex-row justify-between h-[7dvh];

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.profile {
  border-radius: 50%;
}

.layout-container {
  @apply w-[100dvw] md:w-[95dvw] xl:w-[80dvw] mx-0 md:mx-auto bg-blue-100 dark:bg-gray-800 min-h-[100dvh] flex flex-col;
}

</style>