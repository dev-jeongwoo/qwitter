<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fullscreen">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <div class="col">
          <q-input
            class="new-qweet"
            bottom-slots
            v-model="newQweetContent"
            placeholder="Waht's happening?"
            counter
            maxlength="280"
            autogrow
            :input-style="{ 'font-size': '19px', 'line-height': 1.4 }"
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
            @click="addNewQweet"
            class="q-mb-lg"
            :disable="!newQweetContent"
            unelevated
            rounded
            color="primary"
            label="Qweet"
            no-caps
          />
        </div>
      </div>

      <q-separator class="divider" size="10px" color="grey-2" />

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut"
        >
          <q-item
            v-for="qweet in qweets"
            :key="qweet.id"
            class="q-py-md qweet"
          >
            <q-item-section avatar top>
              <q-avatar size="xl">
                  <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
                </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong>Janet</strong>
                <span class="text-grey-7">
                  @janet
                  <br class="lt-md">&bullet;
                  {{ qweet.date | relativeDate }}
                </span>
              </q-item-label>
              <q-item-label class="qweet-content text-body1">
                {{ qweet.content }}
              </q-item-label>
              <div class="qweet-icon row justify-between q-mt-sm">
                <q-btn
                  flat
                  round
                  color="grey"
                  icon="far fa-comment"
                  size="sm"
                />
                <q-btn
                  flat
                  round
                  color="grey"
                  icon="fas fa-retweet"
                  size="sm"
                />
                <q-btn
                  flat
                  round
                  color="grey"
                  icon="far fa-heart"
                  size="sm"
                />
                <q-btn
                  @click="deleteQweet(qweet)"
                  flat
                  round
                  color="grey"
                  icon="fas fa-trash"
                  size="sm"
                />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import db from 'src/boot/firebase'
import { formatDistance, subDays } from 'date-fns'

export default {
  name: "PageHome",
  data() {
    return {
      newQweetContent: "",
      qweets: [],
    };
  },
  methods: {
    addNewQweet() {
      let newQweet = {
        content: this.newQweetContent,
        date: Date.now(),
      }

      db.collection('qweets').add(newQweet).then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      }).catch((error) => {
        console.error('Error adding document: ', error);
      });

      this.newQweetContent = ''
    },
    deleteQweet(qweet) {
      db.collection('qweets').doc(qweet.id).delete().then(() => {
        console.log('Document successfully deleted!');
      }).catch((error) => {
        console.error('Error removing document: ', error);
      });
    },
  },
  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date());
    }
  },
  mounted() {
    db.collection('qweets').orderBy('date').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let qweetChange = change.doc.data();
        qweetChange.id = change.doc.id;
        if (change.type === 'added') {
          console.log('New qweet: ', qweetChange);
          this.qweets.unshift(qweetChange);
        }
        if (change.type === 'modified') {
          console.log('Modified qweet: ', qweetChange);
        }
        if (change.type === 'removed') {
          console.log('Removed qweet: ', qweetChange);
          const index = this.qweets.findIndex(qweet => qweet.id === qweetChange.id);
          this.qweets.splice(index, 1);
        }
      });
    });
  },
};
</script>

<style lang="sass" scoped>
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
.qweet:not(:first-child)
  border-top: 1px solid rgba(0, 0, 0, 0.12)
.qweet-content
  white-space: pre-line
.qweet-icon
  margin-left: -5px
</style>
