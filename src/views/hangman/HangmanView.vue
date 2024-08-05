<template>
  <section class="hangman-container p-10 bg-gray-100 drop-shadow rounded flex gap-20 w-min">
    <HangmanGraphic :lives="lives" class="mt-8" />

    <div class="flex flex-col gap-10 items-center">
      <div class="phrase flex gap-2 text-4xl" v-if="selected_phrase">
        <p
          v-for="(char, index) in selected_phrase"
          :key="index"
          :class="{ 'text-transparent': char === ' ' }"
        >
          {{ guessed_chars.includes(char) ? char.toUpperCase() : '_' }}
        </p>
      </div>
      <p>Incorrect guesses: {{ 6 - lives }} / 6</p>
      <div
        class="keyboard grid grid-cols-9 gap-2 gap-x-9 justify-center items-center justify-items-center"
        v-if="selected_phrase"
      >
        <button
          v-for="(char, index) in 'abcdefghijklmnopqrstuvwxyz'.split('')"
          class="char"
          :disabled="guessed_chars.includes(char)"
          @click="PickLetter(char)"
        >
          {{ char.toUpperCase() }}
        </button>
      </div>
    </div>
  </section>

  <div
    class="popup-container bg-black w-full h-screen absolute top-0 flex justify-center items-center p-40 bg-opacity-50"
    v-if="lives === 0 || has_won"
  >
    <div v-if="lives === 0" class="popup bg-white p-20 rounded flex flex-col items-center gap-3">
      <p class="text-3xl">Game over!</p>
      <p class="text-3xl rotate-90">:(</p>
      <p>The phrase was '{{ selected_phrase.toUpperCase() }}'.</p>
      <button @click="Reset" class="primary mt-5">Try Again</button>
    </div>

    <div v-if="has_won" class="popup bg-white p-20 rounded flex flex-col items-center gap-3">
      <p class="text-3xl">You won!</p>
      <p class="text-3xl rotate-90">:)</p>
      <p>The phrase was '{{ selected_phrase.toUpperCase() }}'.</p>
      <button @click="Reset" class="primary mt-5">Play Again</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import phrases_data from './phrases.json'
import HangmanGraphic from '@/views/hangman/HangmanGraphic.vue'

export default defineComponent({
  name: 'Hangman',
  components: {
    HangmanGraphic
  },
  setup() {
    const phrases = phrases_data.phrases as string[]
    const selected_phrase = ref<string | null>(null)
    const guessed_chars = ref<string[]>([])
    const lives = ref<number>(6)
    Reset()

    function Reset() {
      if (phrases.length === 0) return
      selected_phrase.value = phrases[Math.floor(Math.random() * phrases.length)]
      guessed_chars.value = []
      lives.value = 6
    }

    function PickLetter(char: string) {
      guessed_chars.value.push(char)
      if (!selected_phrase.value.includes(char)) lives.value--
    }

    const has_won = computed(() => {
      if (!selected_phrase.value) return false
      return [...selected_phrase.value].every(
        (char) => char === ' ' || guessed_chars.value.includes(char)
      )
    })

    return { Reset, selected_phrase, lives, guessed_chars, PickLetter, has_won }
  }
})
</script>
