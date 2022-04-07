<template>
  <router-link to="/" class="logo"><span>OMDbAPI</span>.COM</router-link>
</template>
<style lang="scss" scoped>
@import "~/scss/main";
  .logo {
    font-weight: 500;
    font-family: "Oswald", sans-serif;
    text-decoration: none;
    font-size: 20px;
    color: $black;
    &:hover {
      color:$black;
    }
    span{
      color:$primary;
    }
  }
</style>