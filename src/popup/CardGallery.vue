<template>
    <div>
        <div>
            <v-layout>
                <v-flex d-flex>
                    <v-container grid-list-md fluid>
                        <v-progress-linear
                                v-show="loading"
                                color="accent"
                                :indeterminate="true">
                        </v-progress-linear>

                        <v-layout row wrap>
                            <v-flex
                                    v-for="(card, index) in cards"
                                    :key="'t'+index"
                                    xl3 lg6 md6 sm12
                                    d-flex
                            >
                                <card :card="card"></card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
            </v-layout>
            <v-btn block
                   v-show="hasMore && !initial"
                   :loading="loading"
                   :disabled="loading"
                   color="primary"
                   class="mb-5"
                   @click="loadData">
                Load more cards...
            </v-btn>
        </div>
    </div>
</template>

<script>
import Card from './Model/Card'
import CardComponent from './Card.vue'
const _ = require('lodash')

export default {
  components: {
    card: CardComponent
  },
  data () {
    return {
      initial: true,
      loading: false,
      hasMore: true,
      page: 1,
      limit: 20,
      cards: [],
      category: 0
    }
  },
  props: ['keyword'],
  watch: {
    keyword () {
      _.debounce(() => this.setData(), 300)()
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    query () {
      let query = Card
        .include('category')
        .append('short_modified')
        .page(this.page)

      if (this.limit) {
        query = query.limit(this.limit)
      }

      if (this.category) {
        query = query.where('category_id', this.category)
      }

      if (this.keyword) {
        query = query.where('search', this.keyword)
      }

      return query.get()
    },
    filterByCategory (category) {
      this.initial = true
      this.category = category
      this.setData()
    },
    filterByKeyword (keyword) {
      this.initial = true
      this.keyword = keyword
      this.setData()
    },
    loadData () {
      this.loading = true
      this.query()
        .then(response => {
          if (response.data !== undefined) {
            this.cards = [
              ...this.cards,
              ...response.data
            ]
            this.page += 1
            this.hasMore = !!response.next_page_url
            this.loading = false
            this.initial = false
          }
        })
    },
    setData () {
      this.loading = true
      this.query()
        .then(response => {
          if (response.data !== undefined) {
            this.cards = response.data
            this.page = 1
            this.hasMore = !!response.next_page_url
            this.loading = false
          }
        })
    }
  }
}
</script>
