<template>
  <Modal ref="ModalRef">
    <template #header>
      test
    </template>

    <template #body>
      <form>
        <div class="mb-3">
          <label for="product-name" class="col-form-label">Toote nimi</label>
          <input type="text" class="form-control" id="product-name">
        </div>
        <div class="mb-3">
          <label for="product-upc" class="col-form-label">Toote UPC kood</label>
          <input type="text" class="form-control" id="product-upc">
        </div>
      </form>
    </template>

    <template #footer>

    </template>

  </Modal>
</template>


<script>

import Modal from "@/components/modal/Modal.vue";

export default {
  name: "ChangeProductInfoModal",
  components: {Modal},
  methods: {
    emitModalOpenMessage() {
      this.$emit('event-change-product-info-modal')
    },
  }
}
</script>



