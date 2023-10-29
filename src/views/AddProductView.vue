<template>

  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-5">
        <h1>Adding a New Product</h1>

        <AlertError :error-message="errorResponse.message"/>

        <div>
          <div class="form-floating mb-4">
            <input v-model="newProduct.productName" type="text" class="form-control" id="floatingInput">
            <label for="floatingInput">Product Name</label>
          </div>
          <div class="form-floating mb-4">
            <input v-model="newProduct.productUpc" type="text" class="form-control" id="floatingInput">
            <label for="floatingInput">Product UPC</label>
          </div>
          <select v-model="newProduct.productIsActive" class="form-select mb-4">
            <option value="0" selected disabled >Choose status</option>
            <option value='true'>Active</option>
            <option value='false'>Not active</option>
          </select>
          If product has more than one component, add Bin information to each component separately.
          <select v-model="newProduct.binId" class="form-select mb-4">
            <option value="0" selected>No bin selected</option>
            <option v-for="bin in binResponse" :value="bin.id">{{bin.name}}</option>
          </select>
        </div>
        <p>
          <ImageInput @event-emit-base64="setProductImageInputData"/>
        </p>
        <button @click="addNewProduct" type="submit" class="my-standard-button">Add Product</button>

      </div>
    </div>
  </div>

</template>

<script>
import ImageInput from "@/components/image/ImageInput.vue";
import router from "@/router";
import AlertError from "@/components/alert/AlertError.vue";

export default {
  name: "AddProductView",
  components: {AlertError, ImageInput},
  data() {
    return {
      newProduct: {
        companyId: 1,
        productName: '',
        productUpc: '',
        productIsActive: true,
        imageData: '',
        binId: 0,
        sortingId: 0
      },
      newProductResponse: {
        productId: 0
      },
      errorResponse: {
        message: '',
        errorCode: 0
      },
      binResponse: [
        {
          id: 0,
          name: '',
          comments: ''
        }
      ]
    }
  },
  methods: {
    getAllBins() {
      this.$http.get("/bins")
          .then(response => {
            this.binResponse = response.data
          })
          .catch(error => {
            const errorResponseBody = error.response.data
          })
    },
    addNewProduct() {
      if (this.mandatoryFieldsAreFilled()) {
        this.sendNewProductProfile()
        sessionStorage.setItem('productName', this.newProduct.productName)
      } else {
        this.errorResponse.message = 'Fill Mandatory Fields'
        setTimeout(() => {
          this.errorResponse.message = '';
        }, 2000)
      }
    },

    sendNewProductProfile() {
      this.$http.post("/products/profile", this.newProduct
      ).then(response => {
        this.newProductResponse = response.data
        router.push({name: 'addMaterialsRoute', query: {productId: this.newProductResponse.productId}})
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },

    setProductImageInputData(imageDataBase64) {
      this.newProduct.imageData = imageDataBase64
    },

    mandatoryFieldsAreFilled() {
      return this.newProduct.productName.length > 0 && this.newProduct.productUpc.length > 0
    },
  },
  beforeMount() {
    this.getAllBins()
  }
}
</script>



