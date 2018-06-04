<template>
    <v-app id="app" light>
        <v-toolbar app fixed dense dark color="primary" clipped-left class="pr-2 pl-3">
            <v-toolbar-title>
                Search FlashCard Extension Options
            </v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-container fluid>
                <v-text-field
                        v-for="(code, color) in themes"
                        :key="code"
                        type="color"
                        @input="saveColor(color)"
                        v-model="themes[color]"
                        :label="label(color)"
                ></v-text-field>
            </v-container>
        </v-content>
    </v-app>
</template>
<script>
import Storage from '../ext/storage'
import Defaults from '../ext/defaults'

export default {
  data: () => ({
  }),
  computed: {
    themes () {
      return {
        ...Defaults.themes,
        ...Storage.get('themes')
      }
    }
  },
  methods: {
    label (color) {
      let text = 'Replace the usage of the color "'

      if (color === 'blue') {
        color = 'purple'
      }

      text += color + '" with another color: '

      return text
    },
    saveColor (color) {
      let themes = {
        ...this.themes
      }
      Storage.set('themes', themes)
    }
  }
}
</script>
<style>
</style>