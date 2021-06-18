<template>
  <q-page>
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

    <q-list>
      <q-item class="q-py-md">
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
            </span>
          </q-item-label>
          <q-item-label class="qweet-content text-body1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            
            Ab, rerum? Fuga dolores iste provident vero obcaecati aperiam rem id dolorem dignissimos non. Fugiat accusantium aliquid amet. Laboriosam aut suscipit laborum.
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
              flat
              round
              color="grey"
              icon="fas fa-trash"
              size="sm"
            />
          </div>
        </q-item-section>

        <q-item-section side top>
          1 min ago
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: "PageHome",
  data() {
    return {
      newQweetContent: ""
    };
  }
};
</script>

<style lang="sass" scoped>
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
.qweet-content
  white-space: pre-line
.qweet-icon
  margin-left: -5px
</style>
