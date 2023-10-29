<template>
  <div class="container">
    <LogoComponent/>
    <h1 class="display-5 text-center m-4">Products of {companyName} </h1>
    <div class="row justify-content-center">
      <div class="col-sm-8">
        <div class="dropdown">
          <a class="btn btn-outline-success dropdown-toggle m-1" href="#" role="button" data-bs-toggle="dropdown"
             aria-expanded="false">
            Sort Active Products
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#" @click="selectedFilter='Aktiivsed'">Active</a></li>
            <li><a class="dropdown-item" href="#" @click="selectedFilter='Mitteaktiivsed'">Inactive</a></li>
            <li><a class="dropdown-item" href="#" @click="selectedFilter='Kõik tooted'">All Products</a></li>
          </ul>
          <button @click="$router.push({name: 'newProfileRoute'})" class="btn btn-outline-success m-1">Add New Product</button>
        </div>

        <ProductsTable :filtered-products="filteredProducts"
                       @navigate-to-product-profile="navigateToProductProfile"
                       @change-product-status-to-active="changeProductStatusToActive"/>
        <p class="custom-warning-text">
          Inactive products cannot be searched by users that are not logged in.
        </p>
      </div>
    </div>
  </div>

</template>

<script>
import router from "@/router";
import ProductsTable from "@/views/ProductsTable.vue";
import LogoComponent from "@/components/image/LogoComponent.vue";


export default {
  name: 'ProductsList',
  components: {LogoComponent, ProductsTable},

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
