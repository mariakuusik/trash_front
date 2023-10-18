<template>
  <div v-show="errorMessage != null && errorMessage.length > 0" class="alert alert-danger" role="alert">
    {{ errorMessage }}
  </div>
</template>


<script>
export default {
  name: "AlertError",
  props: {
    errorMessage: {}
  }
}
</script>


