<template>
    <v-app id="app" light>
        <v-toolbar app fixed dense dark color="primary" clipped-left class="pr-4 pl-4">
            <v-text-field
                    v-model.lazy="keyword"
                    prepend-icon="search"
                    clearable
                    dark
                    color="white"
                    name="keyword"
                    label="Search cards"
                    :hide-details="true"
                    hide-details
                    single-line>
            </v-text-field>
        </v-toolbar>
        <v-content>
            <v-container fluid>
                <card-gallery :keyword="keyword"></card-gallery>
            </v-container>
        </v-content>
    </v-app>
</template>
<script>
  import Gallery from './CardGallery.vue'

  export default {
    components: {
      'card-gallery': Gallery
    },
    data: () => ({
      keyword: ''
    })
  }
</script>
<style lang="scss">

</style>