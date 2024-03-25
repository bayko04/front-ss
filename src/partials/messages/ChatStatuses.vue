<template>
    <!-- With Underline -->
    <div>
        <!-- Start -->
        <div class="relative mb-2">
            <div class="absolute bottom-0 w-full h-px bg-slate-200 dark:bg-slate-700" aria-hidden="true"></div>
            <ul class="relative text-sm font-medium flex flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar">
                <li class="px-0 sm:px-3 lg:px-8 flex items-start">
                    <a class="block pb-3 text-indigo-500 whitespace-nowrap border-b-2 border-indigo-500" href="#0">Мои</a>
                    <span class="text-xs inline-flex font-medium bg-indigo-400 text-white rounded-full text-center leading-5 px-2 ml-2">2</span>
                </li>
                <li class="px-4 sm:px-6 lg:px-0 flex items-start">
                    <a class="block pb-3 text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 whitespace-nowrap" href="#0">В очереди</a>
                    <span class="text-xs inline-flex font-medium bg-gray-400 text-white rounded-full text-center leading-5 px-2 ml-2">7</span>
                </li>
                <li class="px-4 sm:px-6 lg:px-4 flex items-start">
                    <a class="block pb-3 text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 whitespace-nowrap" href="#0">Все</a>
                    <span class="text-xs inline-flex font-medium bg-gray-400 text-white rounded-full text-center leading-5 px-2 ml-2">10</span>
                </li>
            </ul>
        </div>
        <!-- End -->
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue'
    import { useMessangers } from "../../utils/messengers.js"
    const {activeChat} = await useMessangers()

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