<template>
  <table class="table">
    <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Component</th>
      <th scope="col">Material Name</th>
      <th scope="col">Material Description</th>
      <th scope="col"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(component, sequenceCounter) in productResponse.componentsResponse" class="align-middle">
      <th>{{ sequenceCounter + 1 }}</th>
      <td>{{ component.componentName }}</td>
      <td>
        <ul class="no-bullets">
          <li v-for="material in component.materialComponentResponse" :key="material.materialName">
            {{ material.materialName }}
          </li>
        </ul>
      </td>
      <td>
        <ul class="no-bullets">
          <li v-for="material in component.materialComponentResponse" :key="material.materialName">
            {{ material.materialDescription }}
          </li>
        </ul>
      </td>

      <td>
        <font-awesome-icon icon="fa-solid fa-trash" style="color: #000000;"/>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: 'ProductComponentsAndMaterialsTable',
  props: {
    productResponse: {}
  }
}
</script>

<style scoped>

.no-bullets {
  list-style: none;
}

</style>