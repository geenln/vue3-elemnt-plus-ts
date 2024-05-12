<script setup lang="ts"></script>

<template>
  <h1>Vue3 Element Plus Ts</h1>
  <div class="flex gap-2">
    <RouterLink to="/t1" class="underline text-teal-600">TestA.vue</RouterLink>
    |
    <RouterLink to="/t2" class="underline text-teal-600">TestB.vue</RouterLink>
  </div>
  <RouterView />
</template>
