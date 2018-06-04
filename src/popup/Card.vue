<template>
    <v-card light>
        <v-toolbar :color="card.category.color" dark card prominent>
            <v-toolbar-title>{{ card.title }}</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn icon :href="link">
                <v-icon>link</v-icon>
            </v-btn>
        </v-toolbar>

        <v-card-text>
            <div class="text-xs-right ma-0 pb-3">
                <v-chip class="ma-0" small disabled label :color="card.category.color" text-color="white">
                    <v-icon left color="white">label</v-icon>
                    {{ card.category.title }}
                </v-chip>
                <v-chip class="ma-0" small disabled label :color="card.category.color" text-color="white">
                    <strong class="pr-1">{{ card.views }}</strong>
                    Views
                </v-chip>
                <v-chip class="ma-0" small disabled label :color="card.category.color" text-color="white">
                    {{ card.short_modified }}
                </v-chip>
            </div>

            <div v-html="card.content"></div>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
      computed: {
        link () {
          return window.location.origin + '/' + this.card.slug
        }
      },
      props: ['card']
    }
</script>
