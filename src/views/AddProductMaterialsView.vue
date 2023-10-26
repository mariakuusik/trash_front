<template>
  <h1>Add Materials to Product {{ productName }} </h1>

  <div class="container">

    <div class="row justify-content-center">
      <div class="col col-5 text-center">


        <AlertSuccess :success-message="successMessage"></AlertSuccess>

        <select v-model="selectedMaterialId" @change="setMaterialIdAndSendRequest" class="form-select">
          <option selected disabled>Choose material</option>
          <option v-for="material in materialsResponse" :value="material.materialId" :key="material">
            {{ material.materialName }} - {{ material.materialDescription }}
          </option>
        </select>
      </div>
    </div>

    <div v-show="selectedMaterialId!==0" class="row justify-content-center">
      <div class="col col-5 text-center">
        <select v-model="selectedComponentId" @change="setComponentId" class="form-select">
          <option v-for="component in componentResponse" :value="component.componentId" :key="component">
            {{ component.componentName }}
          </option>
        </select>
      </div>
      <div v-show="selectedMaterialId!==0">
        <button @click="addComponentToProduct" class="btn my-standard-button">Add component</button>
      </div>
    </div>

    <div class="row justify-content-center">

      <div class="col col-5 text-center">
        <h2>Added components</h2>
        <ProductComponentsAndMaterialsTable :product-response="productResponse"/>
      </div>
    </div>

  </div>


</template>


<script>
//TODO: kõigepealt too ära komponendid ja siis materjalid. ja siis meetod, mis saadab korraga komponent+materjal backi.
//TODO: Post meetod on tehtud backis.
import {useRoute} from "vue-router";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import ProductComponentsAndMaterialsTable from "@/views/ProductComponentsAndMaterialsTable.vue";

export default {
  name: "AddProductMaterialsView",
  components: {ProductComponentsAndMaterialsTable, AlertSuccess},
  props: {},
  data() {
    return {
      successMessage: '',
      productId: Number(useRoute().query.productId),
      productName: sessionStorage.getItem('productName'),
      selectedMaterialId: 0,
      selectedComponentId: 0,
      materialsResponse: [
        {
          materialId: 0,
          materialName: '',
          materialDescription: ''
        }
      ],
      componentResponse: [
        {
          componentId: 0,
          componentName: ''
        }
      ],
      addedComponent: {
        productId: this.productId,
        componentId: this.selectedComponentId
      },
      productResponse: {},
    }
  },
  methods: {
    getAllMaterials() {
      this.$http.get("/materials")
          .then(response => {
            this.materialsResponse = response.data
          })
          .catch(error => {
            const errorResponseBody = error.response.data
          })
    },

    setMaterialIdAndSendRequest(materialId) {
      materialId = this.selectedMaterialId
      this.getAllComponents()
    },

    setComponentId(componentId) {
      componentId = this.selectedComponentId
    },

    getAllComponents() {
      this.$http.get("/components", {}
      ).then(response => {
        this.componentResponse = response.data
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },

    addComponentToProduct() {
      this.addedComponent.productId = this.productId
      this.addedComponent.componentId = this.selectedComponentId
      this.$http.post("/components/component", this.addedComponent
      ).then(response => {
        this.addedComponent.productId = 0
        this.addedComponent.componentId = 0
        this.handleSuccessMessage()
        this.getProductProfile()
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },

    handleSuccessMessage() {
      this.successMessage = 'New Component Added to ' + this.productName
      setTimeout(() => {
        this.successMessage = ''
      }, 1500)
    },

    getProductProfile() {
      this.$http.get("/products/profile", {
            params: {
              productId: this.productId,
            }
          }
      ).then(response => {
        this.productResponse = response.data
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },

  },
  beforeMount() {
    this.getAllMaterials()
  }
}
</script>

