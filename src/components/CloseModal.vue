<template lang="">
  <div class="closeModal"></div>
</template>
<script>
export default {};
</script>
<style lang="css">
.closeModal {
  flex: 0 0 30px;
  width: 20px;
  height: 20px;
  position: relative;
  cursor: pointer;
}

.closeModal::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 1px;
  background: black;
  transform: translate(-50%, -50%) rotate(-45deg);
}

.closeModal:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 1px;
  background: black;
  transform: translate(-50%, -50%) rotate(45deg);
}
</style>
