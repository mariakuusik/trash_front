<template>
  <div class="container">
    <h1 class="display-5 text-center mb-5">Tere, (ettevõtte nimi)</h1>
    <div class="row justify-content-center">
      <div class="col-sm-8">
        <div class="dropdown">
          <a class="btn btn-outline-success dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
             aria-expanded="false">
            Sort Active Products
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#" @click="selectedFilter='Aktiivsed'">Active</a></li>
            <li><a class="dropdown-item" href="#" @click="selectedFilter='Mitteaktiivsed'">Inactive</a></li>
            <li><a class="dropdown-item" href="#" @click="selectedFilter='Kõik tooted'">All Products</a></li>
          </ul>
          <button @click="$router.push({name: 'newProfileRoute'})" class="btn btn-outline-success">Add New Product</button>
        </div>

        <ProductsTable :filtered-products="filteredProducts"
                       @navigate-to-product-profile="navigateToProductProfile"
                       @change-product-status-to-active="changeProductStatusToActive"/>
        <p class="custom-warning-text">
          Mitteaktiivsed tooted ei kajastu otsingus.
        </p>
      </div>
    </div>
  </div>

</template>

<script>
import router from "@/router";
import ProductsTable from "@/views/ProductsTable.vue";


export default {
  name: 'ProductsList',
  components: {ProductsTable},

  data() {
    return {
      companyId: 1,
      allProducts: [
        {
          productId: 0,
          productName: '',
          productUpc: '',
          productIsActive: true
        }
      ],
      changeProductStatusRequest: {
        productId: 0,
        productIsActive: true
      },
      errorResponse: {
        message: '',
        errorCode: 0
      },
      selectedFilter: 'Kõik tooted'
    }
  },
  methods: {
    getProducts() {
      this.$http.get("/products", {
            params: {
              companyId: this.companyId
            }
          }
      ).then(response => {
        this.allProducts = response.data
      }).catch(error => {
        this.errorResponse = error.response.data
      });
    },

    changeProductStatusToActive(productId) {
      this.changeProductStatusRequest.productId = productId
      this.$http.patch("/products/status", this.changeProductStatusRequest
      ).then(response => {
        this.handleProductStatusChange()
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },

    handleProductStatusChange() {
      this.getProducts()
    },

    navigateToProductProfile(productId) {
      router.push({name: 'productProfileRoute', query: {productId: productId}})
    },

  },
  computed: {
    filteredProducts() {
      if (this.selectedFilter === 'Aktiivsed') {
        return this.allProducts.filter(product => product.productIsActive);
      } else if (this.selectedFilter === 'Mitteaktiivsed') {
        return this.allProducts.filter(product => !product.productIsActive);
      } else {
        return this.allProducts;
      }
    }
  },

  beforeMount() {
    this.getProducts()
  }
}
</script>
