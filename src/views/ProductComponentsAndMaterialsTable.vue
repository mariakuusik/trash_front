<template>
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
</template>
<script>
export default {
  name: 'ProductComponentsAndMaterialsTable',
  props: {
    productResponse: {}
  }
}
</script>