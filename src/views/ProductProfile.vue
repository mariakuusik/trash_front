<template>
  <ChangeMaterialsModal :product-response="productResponse" @update-product="handleProductUpdate" ref="ModalRef"/>
  <div class="container text-center information-display-style">
    <div class="row">

      <div class="col col-lg-6">
        <ul class="list-group list-group-flush text-start">
          <li class="list-group-item">
            <h2 class="display-5"> {{ productResponse.productName }}</h2>
          </li>
          <li class="list-group-item">
            <h2 class="display-6">UPC code: {{ productResponse.productUpc }}</h2>
          </li>
        </ul>
        <button type="button" class="btn my-standard-button mb-3" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop">
          Edit Info
        </button>
        <div>
          <ProductComponentsAndMaterialsTable :product-response="productResponse"/>
        </div>
        <button @click="sendReferenceInfoToModal" class="btn my-standard-button">Edit Components</button>
      </div>

      <div class="col col-lg-6">
        <ProductImage :image-data-base64="imageResponse.imageData"/>
      </div>

    </div>
  </div>

</template>


<script>
import {useRoute} from "vue-router";
import ChangeMaterialsModal from "@/components/modal/ChangeMaterialsModal.vue";
import ProductImage from "@/components/image/ProductImage.vue";
import ProductComponentsAndMaterialsTable from "@/views/ProductComponentsAndMaterialsTable.vue";

export default {
  name: "productProfile",
  components: {ProductComponentsAndMaterialsTable, ProductImage, ChangeMaterialsModal},
  data() {
    return {
      productId: Number(useRoute().query.productId),
      productResponse: {
        productName: '',
        productUpc: '',
        productIsActive: true,
        componentsResponse: [
          {
            componentId: 0,
            componentName: '',
            materialComponentResponse: [
              {
                materialName: '',
                materialDescription: ''
              }
            ]
          }
        ]
      },
      imageResponse: {
        imageData: ''
      },
      productUpdate: {
        productId: Number(useRoute().query.productId),
        productName: '',
        productUpc: ''
      },
      errorResponse:
          {
            message: '',
            errorCode: 0
          }
    }
  },
  methods: {
    getProductProfile() {
      this.$http.get("/products/profile", {
            params: {
              productId: this.productId
            }
          }
      ).then(response => {
        this.productResponse = response.data
      }).catch(error => {
        this.errorResponse = error.response.data
      })
    },

    handleProductUpdate(productInfo) {
      this.productUpdate.productName = productInfo.productName
      this.productUpdate.productUpc = productInfo.productUpc
      this.$http.put("/products/profile", this.productUpdate
      ).then(response => {
        this.getProductProfile()
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },

    getProductImage() {
      this.$http.get("/image", {
            params: {
              productId: Number(useRoute().query.productId)
            }
          }
      ).then(response => {
        this.imageResponse = response.data
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },

    sendReferenceInfoToModal() {
      this.$refs.ModalRef.productInfo.productName = this.productResponse.productName;
      this.$refs.ModalRef.productInfo.productUpc = this.productResponse.productUpc;
    }

  },
  beforeMount() {
    this.getProductProfile()
    this.getProductImage()
  }
}
</script>


<style scoped>


</style>