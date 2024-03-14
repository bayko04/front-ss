<template>
    <div class="flex space-x-4">
        <button class="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300">Мои</button>
        <button class="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300">В очереди</button>
        <button class="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300">Все</button>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue'
    import { useMessangers } from "../../utils/messengers.js"



    const dropdownOpen = ref(false)
    const trigger = ref(null)
    const dropdown = ref(null)

    // close on click outside
    const clickHandler = ({ target }) => {
      if (!dropdownOpen.value || dropdown.value.contains(target) || trigger.value.contains(target)) return
      dropdownOpen.value = false
    }

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen.value || keyCode !== 27) return
      dropdownOpen.value = false
    }

    onMounted(() => {
      document.addEventListener('click', clickHandler)
      document.addEventListener('keydown', keyHandler)
    })

    onUnmounted(() => {
      document.removeEventListener('click', clickHandler)
      document.removeEventListener('keydown', keyHandler)
    })    

</script>