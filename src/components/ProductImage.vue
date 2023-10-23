<template>
  <img :src="imageDataBase64" class="img-fluid" alt="Product Image" title="imageAuthor">
</template>

<script>
export default {
  name: 'ProductImage',
  props:{
    imageDataBase64: String
  }
}
</script>



