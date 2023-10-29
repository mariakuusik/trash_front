<template>

  <div class="container text-center justify-content-center">
    <LogoComponent/>
    <div class="row justify-content-center">
      <div class="col-6">
        <input type="text" class="form-control mt-4 mb-4" placeholder="Search by UPC code" v-model="searchUpcInput">
        <div v-show="searchResponse.productId===0">
          <p>Example UPC code for search:</p>
          <p>123456789012</p>
        </div>

        <button class="my-standard-button m-3" type="button" @click="getSerchResultByUpc">Search</button>

        <div v-show="searchResponse.productId!==0">
          <div class="row information-display-style">
            <div class="col col-6 justify-content-center">
              <ul class="list-group list-group-flush text-start">
                <li class="list-group-item item-bold">{{ searchResponse.productName }}</li>
                <li> <span class="item-bold">Bin:</span>
                  {{ searchResponse.productBinName }}
                </li>
                <li> <span class="item-bold">Bin instructions:</span>
                  {{ searchResponse.productBinComments }}
                </li>
                <li> <span class="item-bold">Sorting instructions:</span>
                  {{ searchResponse.productSortingInstructions }}
                </li>
              </ul>
              <ul class="list-group list-group-flush text-start">
                <li class="list-group-item item-bold">Components</li>
                <li class="list-group-item">
                  <div v-for="component in searchResponse.searchComponentDtos">
                    <p>{{ component.componentName }}</p>
                    <p>{{ component.componentBinName }}</p>
                    <p>{{ component.componentBinComments }}</p>
                    <p>{{ component.componentSortingInstructions }}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div class="col col-6 justify-content-center">
              <div>
                <ProductImage :image-data-base64="imageResponse.imageData"/>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import LogoComponent from "@/components/image/LogoComponent.vue";
import ProductImage from "@/components/image/ProductImage.vue";

export default {
  name: 'HomeView',
  components: {
    ProductImage,
    LogoComponent
  },
  data() {
    return {
      searchUpcInput: '',
      searchResponse: {
        productId: 0,
        productSortingInstructions: '',
        productName: '',
        productBinName: '',
        productBinComments: '',
        searchComponentDtos: [
          {
            componentSortingInstructions: '',
            componentName: '',
            componentBinName: '',
            componentBinComments: ''
          }
        ]
      },
      imageResponse: {
        imageData: ''
      }
    }
  },
  methods: {
    getSerchResultByUpc() {
      this.$http.get("/search/upc", {
            params: {
              productUpc: this.searchUpcInput,
            }
          }
      ).then(response => {
        this.searchResponse = response.data
        this.getProductImage()
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },

    getProductImage() {
      this.$http.get("/image", {
            params: {
              productId: this.searchResponse.productId
            }
          }
      ).then(response => {
        this.imageResponse = response.data
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },
  }
}
</script>

