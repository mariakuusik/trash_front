<template>
<ChangeProductInfoModal ref="ChangeProductInfoModalRef"/>
  <div class="container text-center">
    <div class="row">

      <div class="col col-lg-6">
        <ul class="list-group list-group-flush text-start information-display-style">
          <li class="list-group-item"><h2 class="display-5"> {{ productResponse.productName }}</h2></li>
          <li class="list-group-item"><h2 class="display-6">UPC kood: {{ productResponse.productUpc }}</h2></li>
        </ul>
        <button type="button" class="btn my-standard-button" data-bs-toggle="modal" data-bs-target="#exampleModal"
                data-bs-whatever="@fat">Muuda andmeid
        </button>

        <div class="information-display-style">
          <table class="table">
            <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Komponent</th>
              <th scope="col">Materjali nimi</th>
              <th scope="col">Materjali kirjeldus</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(component, sequenceCounter) in productResponse.componentsResponse">
              <th>{{ sequenceCounter + 1 }}</th>
              <td>{{ component.componentName }}</td>
              <td>{{ component.materialResponse.materialName }}</td>
              <td>{{ component.materialResponse.materialDescription }}</td>
              <td></td>
            </tr>
            </tbody>
          </table>
        </div>
        <button class="btn my-standard-button">Muuda komponente ja materjale</button>

      </div>

      <div class="col col-lg-6 bg-success">
        TOOTE PILT
      </div>

    </div>
  </div>

</template>


<script>
import data from "bootstrap/js/src/dom/data";
import {useRoute} from "vue-router";
import ChangeProductInfoModal from "@/components/modal/ChangeProductInfoModal.vue";

export default {
  name: "productProfile",
  components: {ChangeProductInfoModal},
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
            materialResponse: {
              materialName: '',
              materialDescription: ''
            }
          }
        ]
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
  },

  openChangeProductInfoModal() {
    this.$refs.ChangeProductInfoModalRef.$refs.ModalRef.openModal()
  },

  beforeMount() {
    this.getProductProfile()
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