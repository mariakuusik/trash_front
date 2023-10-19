<template>
  <h1>Add Materials to Product {{ productName }} </h1>

  <div class="container">
    <div class="row justify-content-center">
      <div class="col col-5 text-center">
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

  </div>


</template>


<script>
import {useRoute} from "vue-router";

export default {
  name: "AddProductMaterialsView",
  data() {
    return {
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

    setMaterialIdAndSendRequest(materialId) {
      materialId = this.selectedMaterialId
      this.getComponents()
    },

    setComponentId(componentId) {
      componentId = this.selectedComponentId
    },

    getComponents() {
      this.$http.get("/components/by-material", {
            params: {
              materialId: this.selectedMaterialId,
            }
          }
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
        console.log(this.productId)
        console.log(this.selectedComponentId)
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

