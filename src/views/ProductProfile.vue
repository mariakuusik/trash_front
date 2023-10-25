<template>
  <ChangeMaterialsModal :product-response="productResponse" @update-product="handleProductUpdate" ref="ModalRef"/>
  <div class="container text-center">
    <div class="row">

      <div class="col col-lg-6">
        <ul class="list-group list-group-flush text-start information-display-style">
          <li class="list-group-item"><h2 class="display-5"> {{ productResponse.productName }}</h2></li>
          <li class="list-group-item"><h2 class="display-6">UPC kood: {{ productResponse.productUpc }}</h2></li>
        </ul>
        <button type="button" class="btn my-standard-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Muuda toote andmeid
        </button>
        <div class="information-display-style">
          <ProductComponentsAndMaterialsTable :product-response="productResponse"/>
        </div>
        <button class="btn my-standard-button">Muuda komponente ja materjale</button>
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
import ProductImage from "@/components/ProductImage.vue";
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

    handleProductUpdate() {
      this.$http.put("/products/profile"
      ).then(response => {
        const responseBody = response.data
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
      this.$refs.ChangeMaterialsModal.productInfo.productName = this.productResponse.productName
    },


  },
  beforeMount() {
    this.getProductProfile()
    this.getProductImage()
  }
}
</script>


<style scoped>

.information-display-style {
  border: solid 1px grey;
  border-radius: 10px;
  padding: 5px;
  margin-top: 50px;
  margin-bottom: 20px;
}

</style>