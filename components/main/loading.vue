<template>
  <div class="load" :style="{height: height+'px'}">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  props: ["height"],
};
</script>

<style>
.load{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.loader {
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  border-top: 8px solid #ee7b7b;
  border-bottom: 8px solid #ee7b7b;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>