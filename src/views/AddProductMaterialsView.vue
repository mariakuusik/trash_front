<template>
  <h1 class="mb-5">Add Materials to Product {{ productName }} </h1>

  <div class="container">

    <div class="row justify-content-center">
      <div class="col col-5 text-center">


        <AlertSuccess :success-message="successMessage"></AlertSuccess>

        <select v-model="selectedComponentId" @change="setComponentIdAndSendRequest" class="form-select">

          <option value="0" disabled selected>Choose component</option>
          <option v-for="component in componentResponse" :value="component.componentId" :key="component">
            {{ component.componentName }}
          </option>
        </select>
      </div>
    </div>

    <div v-show="selectedComponentId!==0" class="row justify-content-center">
      <div class="col col-5 text-center">
        <select v-model="selectedMaterialId" @change="setMaterialId" class="form-select">
          <option value="0" disabled selected>Choose material</option>
          <option v-for="material in materialsResponse" :value="material.materialId" :key="material">
             {{ material.materialName }} - {{material.materialDescription}}
          </option>
        </select>
      </div>
      <div v-show="selectedMaterialId!==0">
        <button @click="addComponentAndMaterialsToProduct" class="btn my-standard-button">Add component</button>
      </div>
    </div>

    <div class="row justify-content-center">

      <div class="col col-8 text-center">
        <h2 class="mt-5">Added components</h2>
        <ProductComponentsAndMaterialsTable
            :product-response="productResponse"
        />
      </div>
    </div>

  </div>


</template>


<script>

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
        componentId: this.selectedComponentId,
        materials: [
          {
            materialId: 0,
            productId: Number(useRoute().query.productId)
          }
        ]
      },
      productResponse: {},
      productComponentResponse: {
        productComponentId: 0
      }
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

    setComponentIdAndSendRequest(componentId) {
      componentId = this.selectedComponentId
      this.getAllMaterials()
    },

    setMaterialId(materialId) {
      materialId = this.selectedMaterialId
    },

    getAllComponents() {
      this.$http.get("/components", {}
      ).then(response => {
        this.componentResponse = response.data
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },

    addComponentAndMaterialsToProduct() {
      const selectedMaterials = [];
      if (this.selectedMaterialId !== 0) {
        selectedMaterials.push({
          materialId: this.selectedMaterialId
        })
      }
      this.addedComponent.productId = this.productId;
      this.addedComponent.componentId = this.selectedComponentId
      this.addedComponent.materials = selectedMaterials
      this.$http.post("/components/component", this.addedComponent
      ).then(response => {
        this.resetComponentAndMaterialIds()
        this.handleSuccessMessage()
        this.getProductProfile()
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },

    resetComponentAndMaterialIds() {
      this.addedComponent.productId = 0
      this.addedComponent.componentId = 0
      this.selectedMaterialId = 0
      this.selectedComponentId = 0
    },

    deleteAddedComponentAndMaterials(productComponentId) {
      this.$http.delete("/components/component", {
            params: {
              productComponentId: productComponentId
            }
          }
      ).then(response => {
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
    this.getAllComponents()
  }
}
</script>

