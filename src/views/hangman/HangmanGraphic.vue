<template>
  <div class="hangman relative">
    <div v-if="lives < 1" class="part11 h-1 w-10 bg-black rotate-45 absolute top-36"></div>
    <div v-if="lives < 2" class="part10 h-1 w-10 bg-black -rotate-45 absolute left-40 top-36"></div>
    <div v-if="lives < 3" class="part9 h-1 w-10 bg-black rotate-45 absolute top-24"></div>
    <div v-if="lives < 4" class="part8 h-1 w-10 bg-black -rotate-45 absolute left-40 top-24"></div>
    <div v-if="lives < 5" class="part7 w-1 bg-black absolute left-48 top-20"></div>
    <div
      v-if="lives < 6"
      class="part6 h-12 w-12 absolute top-8 rounded-full border-4 border-black"
    ></div>
    <div class="part5 h-8 w-1 bg-black absolute left-48"></div>
    <div class="part4 h-1 bg-black -rotate-45 absolute left-8 top-6"></div>
    <div class="part3 h-1 bg-black relative left-10"></div>
    <div class="part2 h-56 bg-black w-1 relative left-10"></div>
    <div class="part1 h-1 bg-black w-72"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'HangmanGraphic',
  props: {
    lives: {
      type: Number as PropType<number>,
      required: true
    }
  }
})
</script>

<style>
.hangman div:not(.part6):not(.part2):not(.part3):not(.part5):not(.part7):not(.part4) {
  border-radius: 30px;
}

.part4 {
  width: 66px;
}
.part5 {
  border-top-right-radius: 30px;
}
.part3 {
  width: 152px;
  border-top-left-radius: 30px;
}
.part6 {
  left: 170px;
}
.part7 {
  height: 53px;
}
.part9,
.part11 {
  left: 188px;
}
</style>
