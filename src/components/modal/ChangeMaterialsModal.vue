<template>
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
       aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Change Product Info</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="mb-3 text-start">
                <label for="productName" class="form-label"> Product Name</label>
                <input v-model="productInfo.productName" class="form-control" id="productName">
              </div>
            </div>
            <div class="row">
              <div class="mb-3 text-start">
                <label for="productUpc" class="form-label">Product UPC</label>
                <input v-model="productInfo.productUpc" class="form-control" id="productUpc">
              </div>
            </div>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button @click="updateProductInfo" type="button" class="btn btn-primary" data-bs-dismiss="modal">Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangeMaterialsModal",
  props: {
    productResponse: {}
  },
  data() {
    return {
      productInfo: {
        productName: '',
        productUpc: ''
      },
    }
  },
  methods: {
    updateProductInfo() {
      this.productInfo = {...this.productResponse}
      this.$emit("update-product", this.productInfo)
    },


  }
}
</script>

