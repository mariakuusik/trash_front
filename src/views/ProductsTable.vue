<template>
  <table class="table table-responsive-sm align-middle">
    <thead>
    <tr>
      <th></th>
      <th>Product Name</th>
      <th>UPC</th>
      <th>Status</th>
      <th></th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(product, sequenceCounter) in filteredProducts" :key="product.productUpc">
      <td :class="{'inactive-product': !product.productIsActive}">{{ sequenceCounter + 1 }}</td>
      <td :class="{'inactive-product': !product.productIsActive}">{{ product.productName }}</td>
      <td class="test-class" :class="{'inactive-product': !product.productIsActive}">{{ product.productUpc }}</td>
      <td :class="{'inactive-product': !product.productIsActive}">
        {{ product.productIsActive ? 'Aktiivne' : 'Mitteaktiivne' }}
      </td>
      <td>
        <button type="button" class="btn btn-outline-success btn-sm"
                @click="navigateToProductProfile(product.productId)">
          View and Edit
        </button>
      </td>
      <td v-if="!product.productIsActive">
        <button type="button" class="btn btn-outline-success btn-sm"
                @click="changeProductStatusToActive(product.productId)">
          Activate
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: 'ProductsTable',
  props: {
    filteredProducts: Array,
    navigateToProductProfile: Function
  },
  methods: {
    navigateToProductProfile(productId) {
      this.$emit('navigate-to-product-profile', productId);
    },
    changeProductStatusToActive(productId) {
      this.$emit('change-product-status-to-active', productId);
    },
  }
}
</script>