<template>
    <div class="category">
        <div class="container">
            <div class="row">
                <div  v-for="(cat, index) in data" :key="index" class="col-lg-4 col-sm-12">
                    <NuxtLink :to="'/products/' + cat.id">
                        <div class="wrapper">
                            <img :src="cat.image" :alt="cat.title">
                            <div class="name">
                                {{
                                    cat["title_" + $store.state.currentLang]
                                        ? cat["title_" + $store.state.currentLang]
                                        : cat.title
                                }}
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
    };
  },

  async fetch() {
    const res = await this.$axios.get(
      "/products/categories"
    );
    this.data = res.data.results;
  },
};
</script>
