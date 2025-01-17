<template>
  <div class="flex h-[100dvh] overflow-hidden">
    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div
      class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
    >
      <!-- Site header -->
      <Header
        :sidebarOpen="sidebarOpen"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
      />

      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <!-- Page header -->
          <div class="mb-8">
            <!-- Title -->
            <h1
              class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold"
            >
              Автоматическое назначение ответственных ✨
            </h1>
          </div>

          <!-- Content -->
          <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm mb-8">
            <div class="flex flex-col md:flex-row md:-mr-px">
              <SettingsSystem />
              <div class="grow">
                <!-- Panel body -->
                <div class="p-6 space-y-6">
                  <h2
                    class="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5"
                  >
                    Автоматическое назначение отвественных
                  </h2>

                  <!-- Toggle Switch -->
                  <div
                    class="flex flex-wrap items-center max-xl:flex-col max-xl:items-start gap-[40px] max-xl:gap-[20px]"
                  >
                    <div class="">
                      <!-- Start -->
                      <div class="flex items-center">
                        <div class="form-switch">
                          <input
                            type="checkbox"
                            id="auto-assigner"
                            class="sr-only"
                            v-model="isActive"
                            true-value="Включен"
                            false-value="Выключен"
                          />
                          <label
                            class="bg-slate-400 dark:bg-slate-700"
                            for="auto-assigner"
                          >
                            <span
                              class="bg-white shadow-sm"
                              aria-hidden="true"
                            ></span>
                            <span class="sr-only">Enable smart sync</span>
                          </label>
                        </div>
                        <div
                          class="text-sm text-gray-400 dark:text-gray-500 italic ml-2"
                        >
                          {{ isActive }}
                        </div>
                      </div>
                      <!-- End -->
                    </div>

                    <div>
                      <!-- Start -->
                      <div class="flex items-end">
                        <input
                          v-model="maxCount"
                          id="small"
                          class="form-input px-2 py-1 mr-4 w-20"
                          type="number"
                        />
                        <label
                          class="block text-sm font-medium mb-1"
                          for="small"
                          >Максимальное количество</label
                        >
                      </div>
                      <!-- End -->
                    </div>

                    <button
                      @click="save()"
                      class="cursor-pointer bg-indigo-500 text-white px-4 py-2 rounded"
                    >
                      Сохранить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Sidebar from "../../partials/Sidebar.vue";
import Header from "../../partials/Header.vue";
import SettingsSidebar from "../../partials/settings/SettingsSidebar.vue";
import SettingsSystem from "../../partials/settings/SettingsSystem.vue";
import { useAuthStore } from "../../stores/auth.store.js";

export default {
  name: "Account",
  components: {
    Sidebar,
    Header,
    SettingsSidebar,
    SettingsSystem,
  },
  setup() {
    const authStore = useAuthStore();
    const settings = authStore.userData.company.assigner_settings;
    const sidebarOpen = ref();
    const isActive = ref(settings.is_active ? "Включен" : "Выключен");
    const maxCount = ref(settings.max_count ?? 10);

    function save() {
      authStore.updateAssignerSettings({
        is_active: isActive.value === "Включен",
        max_count: maxCount.value,
      });
    }

    return {
      sidebarOpen,
      isActive,
      maxCount,
      save,
    };
  },
};
</script>
