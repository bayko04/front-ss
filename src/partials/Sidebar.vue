<template>
  <div class="min-w-fit z-60">
    <!-- Sidebar backdrop (mobile only) -->
    <div
      class="fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200"
      :class="sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      aria-hidden="true"
    ></div>

    <!-- Sidebar -->
    <div
      id="sidebar"
      ref="sidebar"
      class="flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] w-20 lg:w-20 lg:sidebar-expanded:!w-20 2xl:!w-20 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-64'"
    >
      <!-- Sidebar header -->
      <div class="flex justify-between mb-10 pr-3 sm:px-2">
        <!-- Close button -->
        <button
          ref="trigger"
          class="lg:hidden text-slate-500 hover:text-slate-400"
          @click.stop="$emit('close-sidebar')"
          aria-controls="sidebar"
          :aria-expanded="sidebarOpen"
        >
          <span class="sr-only">Close sidebar</span>
          <svg
            class="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"
            />
          </svg>
        </button>
        <!-- Logo -->
        <router-link class="block" to="/">
          <img src="../images/logo2.png" class="w-14" alt="" />
        </router-link>
      </div>

      <!-- Links -->
      <div class="space-y-8">
        <!-- Pages group -->
        <div>
          <ul class="mt-3">
            <!-- Архив -->
            <router-link
              to="/archive"
              custom
              v-slot="{ href, navigate, isExactActive }"
            >
              <li
                v-tooltip="'Обращения'"
                class="px-3 py-2 rounded-sm mb-0.5 last:mb-0"
                :class="isExactActive && 'bg-slate-900'"
              >
                <a
                  class="block text-slate-200 transition duration-150"
                  :class="
                    isExactActive ? 'hover:text-slate-200' : 'hover:text-white'
                  "
                  :href="href"
                  @click="navigate"
                >
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path
                          class="fill-current"
                          :class="
                            isExactActive ? 'text-indigo-500' : 'text-slate-600'
                          "
                          d="M16 13v4H8v-4H0l3-9h18l3 9h-8Z"
                        />
                        <path
                          class="fill-current"
                          :class="
                            isExactActive ? 'text-indigo-300' : 'text-slate-400'
                          "
                          d="m23.72 12 .229.686A.984.984 0 0 1 24 13v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-8c0-.107.017-.213.051-.314L.28 12H8v4h8v-4H23.72ZM13 0v7h3l-4 5-4-5h3V0h2Z"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              </li>
            </router-link>
            <!-- Customers -->
            <router-link
              to="/customers"
              custom
              v-slot="{ href, navigate, isExactActive }"
            >
              <li
                v-tooltip="'Клиенты'"
                class="px-3 py-2 rounded-sm mb-0.5 last:mb-0"
                :class="isExactActive && 'bg-slate-900'"
              >
                <a
                  class="block text-slate-200 transition duration-150"
                  :class="
                    isExactActive ? 'hover:text-slate-200' : 'hover:text-white'
                  "
                  :href="href"
                  @click="navigate"
                >
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path
                          class="fill-current"
                          :class="
                            currentRoute.fullPath.includes('customers')
                              ? 'text-indigo-500'
                              : 'text-slate-600'
                          "
                          d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                        />
                        <path
                          class="fill-current"
                          :class="
                            currentRoute.fullPath.includes('customers')
                              ? 'text-indigo-300'
                              : 'text-slate-400'
                          "
                          d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              </li>
            </router-link>
            <!-- //Board -->
            <router-link
              to="/kanban-board"
              custom
              v-slot="{ href, navigate, isExactActive }"
            >
              <li
                v-tooltip="'Канбан доска'"
                class="px-3 py-2 rounded-sm mb-0.5 last:mb-0 w-[48px] h-[40px]"
                :class="isExactActive && 'bg-slate-900'"
              >
                <a
                  class="block text-gray-800 dark:text-gray-100 truncate transition"
                  :class="
                    currentRoute.fullPath.includes('kanban-board')
                      ? ''
                      : 'hover:text-gray-900 dark:hover:text-white'
                  "
                  :href="href"
                  @click="navigate"
                >
                  <img
                    v-if="isExactActive"
                    class="w-full h-full object-cover"
                    src="../images/kanban2.svg?url"
                    alt=""
                  />
                  <img
                    v-else
                    class="w-full h-full object-cover"
                    src="../images/kanban1.svg?url"
                    alt=""
                  />
                </a>
              </li>
            </router-link>
            <!-- Marketing -->
            <router-link
              to="/marketingSettings/auto-client-retention"
              custom
              v-slot="{ href, navigate, isExactActive }"
            >
              <li
                v-tooltip="'Маркетинг'"
                class="px-3 py-2 rounded-sm mb-0.5 last:mb-0"
                :class="isExactActive && 'bg-slate-900'"
              >
                <a
                  class="block text-slate-200 transition duration-150"
                  :class="
                    isExactActive ? 'hover:text-slate-200' : 'hover:text-white'
                  "
                  :href="href"
                  @click="navigate"
                >
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 290.626 290.626"
                        xml:space="preserve"
                        fill="#000000"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <g>
                            <g>
                              <path
                                class="fill-current"
                                :class="
                                  isExactActive
                                    ? 'text-indigo-500'
                                    : 'text-slate-600'
                                "
                                d="M267.722,9.375h18.216V0h-18.75L144.797,28.125H44.274C19.861,28.125,0,47.986,0,72.399v61.453 c0,24.413,19.861,44.273,44.274,44.273h7.289v97.594c0,8.217,6.689,14.906,14.906,14.906h21.755 c8.217,0,14.906-6.684,14.906-14.906v-60.094h16.809c6.234,0,11.311-5.077,11.311-11.316c0-2.977-1.209-5.892-3.314-8.002 l-5.489-5.489c-0.366-0.366-0.572-0.867-0.572-1.378v-11.316h22.908l121.355,28.008l19.8,0.117v-9.375h-18.216L150,169.711V36.539 L267.722,9.375z M44.274,168.75c-19.242,0-34.898-15.656-34.898-34.898V72.399c0-19.242,15.656-34.898,34.898-34.898h96.352 v131.25h-37.5H51.563h-7.289V168.75z M93.75,275.719c0,3.047-2.48,5.531-5.531,5.531h-21.75c-3.047,0-5.531-2.48-5.531-5.531 v-97.594H93.75V275.719z M115.814,197.442l5.489,5.489c0.366,0.366,0.572,0.867,0.572,1.378c0,1.069-0.872,1.941-1.941,1.941 h-16.809v-28.125h9.375v11.316C112.5,192.417,113.71,195.333,115.814,197.442z"
                              ></path>
                              <path
                                class="fill-current"
                                :class="
                                  isExactActive
                                    ? 'text-indigo-300'
                                    : 'text-slate-400'
                                "
                                d="M107.813,112.5c0-2.766-0.83-5.33-2.217-7.509l9.675-16.12c0.633,0.084,1.261,0.192,1.917,0.192 c7.753,0,14.063-6.309,14.063-14.063s-6.309-14.063-14.063-14.063S103.125,67.247,103.125,75c0,3.698,1.463,7.041,3.802,9.553 l-8.794,14.658c-1.388-0.464-2.841-0.773-4.383-0.773c-3.783,0-7.205,1.519-9.736,3.956L74.4,97.585 c0.352-1.228,0.6-2.498,0.6-3.834c0-7.753-6.309-14.063-14.063-14.063S46.875,85.997,46.875,93.75c0,2.648,0.778,5.1,2.058,7.214 L37.538,118.06c-1.486-0.53-3.061-0.872-4.725-0.872c-7.753,0-14.063,6.309-14.063,14.062s6.309,14.063,14.063,14.063 s14.063-6.309,14.063-14.063c0-2.648-0.778-5.1-2.058-7.214l11.395-17.095c1.486,0.53,3.061,0.872,4.725,0.872 c2.958,0,5.7-0.928,7.964-2.494l10.955,5.48c-0.066,0.563-0.169,1.12-0.169,1.702c0,7.753,6.309,14.063,14.063,14.063 S107.813,120.253,107.813,112.5z M117.188,70.313c2.588,0,4.688,2.105,4.688,4.688s-2.1,4.688-4.688,4.688 c-2.588,0-4.688-2.105-4.688-4.688S114.6,70.313,117.188,70.313z M32.813,135.938c-2.588,0-4.688-2.105-4.688-4.688 c0-2.583,2.1-4.687,4.688-4.687s4.688,2.105,4.688,4.687C37.5,133.833,35.4,135.938,32.813,135.938z M56.25,93.75 c0-2.583,2.1-4.688,4.688-4.688s4.688,2.105,4.688,4.688s-2.1,4.688-4.688,4.688S56.25,96.333,56.25,93.75z M93.75,117.188 c-2.588,0-4.688-2.105-4.688-4.688s2.1-4.688,4.688-4.688c2.588,0,4.688,2.105,4.688,4.688S96.338,117.188,93.75,117.188z"
                              ></path>
                              <rect
                                class="fill-current"
                                :class="
                                  isExactActive
                                    ? 'text-indigo-500'
                                    : 'text-slate-600'
                                "
                                x="267.188"
                                y="0"
                                width="23.438"
                                height="206.25"
                              ></rect>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                </a>
              </li>
            </router-link>
            <!-- Calendar -->
            <router-link
              to="/calendar"
              custom
              v-slot="{ href, navigate, isExactActive }"
            >
              <li
                v-tooltip="'Календарь'"
                class="px-3 py-2 rounded-sm mb-0.5 last:mb-0"
                :class="isExactActive && 'bg-slate-900'"
              >
                <a
                  class="block text-slate-200 transition duration-150"
                  :class="
                    isExactActive ? 'hover:text-slate-200' : 'hover:text-white'
                  "
                  :href="href"
                  @click="navigate"
                >
                  <div class="flex items-center">
                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        class="fill-current"
                        :class="
                          isExactActive ? 'text-indigo-500' : 'text-slate-600'
                        "
                        d="M1 3h22v20H1z"
                      />
                      <path
                        class="fill-current"
                        :class="
                          isExactActive ? 'text-indigo-300' : 'text-slate-400'
                        "
                        d="M21 3h2v4H1V3h2V1h4v2h10V1h4v2Z"
                      />
                    </svg>
                  </div>
                </a>
              </li>
            </router-link>
            <router-link
              to="/products"
              custom
              v-slot="{ href, navigate, isExactActive }"
            >
              <li
                v-tooltip="'Продукты'"
                class="px-3 py-2 rounded-sm mb-0.5 last:mb-0"
                :class="isExactActive && 'bg-slate-900'"
              >
                <a
                  class="block text-slate-200 transition duration-150"
                  :class="
                    isExactActive ? 'hover:text-slate-200' : 'hover:text-white'
                  "
                  :href="href"
                  @click="navigate"
                >
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path
                          class="fill-current"
                          :class="
                            currentRoute.fullPath.includes('ecommerce')
                              ? 'text-indigo-300'
                              : 'text-slate-400'
                          "
                          d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
                        />
                        <path
                          class="fill-current"
                          :class="
                            currentRoute.fullPath.includes('ecommerce')
                              ? 'text-indigo-600'
                              : 'text-slate-700'
                          "
                          d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
                        />
                        <path
                          class="fill-current"
                          :class="
                            currentRoute.fullPath.includes('ecommerce')
                              ? 'text-indigo-500'
                              : 'text-slate-600'
                          "
                          d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              </li>
            </router-link>
            <router-link
              to="/"
              custom
              v-slot="{ href, navigate, isExactActive }"
            >
              <li
                v-tooltip="'Аналитика'"
                class="px-3 py-2 rounded-sm mb-0.5 last:mb-0"
                :class="isExactActive && 'bg-slate-900'"
              >
                <a
                  class="block text-slate-200 transition duration-150"
                  :class="
                    isExactActive ? 'hover:text-slate-200' : 'hover:text-white'
                  "
                  :href="href"
                  @click="navigate"
                >
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path
                          class="fill-current"
                          :class="
                            currentRoute.fullPath === '/' ||
                            currentRoute.fullPath.includes('dashboard')
                              ? 'text-indigo-500'
                              : 'text-slate-400'
                          "
                          d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                        />
                        <path
                          class="fill-current"
                          :class="
                            currentRoute.fullPath === '/' ||
                            currentRoute.fullPath.includes('dashboard')
                              ? 'text-indigo-600'
                              : 'text-slate-600'
                          "
                          d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                        />
                        <path
                          class="fill-current"
                          :class="
                            currentRoute.fullPath === '/' ||
                            currentRoute.fullPath.includes('dashboard')
                              ? 'text-indigo-200'
                              : 'text-slate-400'
                          "
                          d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              </li>
            </router-link>
            <!-- AccessControl -->
            <router-link
              to="/community/users-tabs"
              custom
              v-slot="{ href, navigate, isExactActive }"
            >
              <li
                v-tooltip="'Пользователи'"
                class="px-3 py-2 rounded-sm mb-0.5 last:mb-0"
                :class="isExactActive && 'bg-slate-900'"
              >
                <a
                  class="block text-slate-200 transition duration-150"
                  :class="
                    isExactActive ? 'hover:text-slate-200' : 'hover:text-white'
                  "
                  :href="href"
                  @click="navigate"
                >
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="shrink-0 h-6 w-6"
                        viewBox="0 0 24 24"
                      >
                        <path
                          class="fill-current"
                          :class="
                            currentRoute.fullPath.includes('community')
                              ? 'text-indigo-500'
                              : 'text-slate-600'
                          "
                          d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
                        />
                        <path
                          class="fill-current"
                          :class="
                            currentRoute.fullPath.includes('community')
                              ? 'text-indigo-600'
                              : 'text-slate-700'
                          "
                          d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
                        />
                        <path
                          class="fill-current"
                          :class="
                            currentRoute.fullPath.includes('community')
                              ? 'text-indigo-500'
                              : 'text-slate-600'
                          "
                          d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              </li>
            </router-link>

            <!-- SystemSettings -->
            <router-link
              to="/systemSettings/requestStatus"
              custom
              v-slot="{ href, navigate, isExactActive }"
            >
              <li
                v-tooltip="'Настройки'"
                class="px-3 py-2 rounded-sm mb-0.5 last:mb-0"
                :class="isExactActive && 'bg-slate-900'"
              >
                <a
                  class="block text-slate-200 transition duration-150"
                  :class="
                    isExactActive ? 'hover:text-slate-200' : 'hover:text-white'
                  "
                  :href="href"
                  @click="navigate"
                >
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="27"
                        height="27"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#B0BEC5"
                          d="M17 10.645v-2.29c-1.17-.417-1.907-.533-2.28-1.431-.373-.9.07-1.512.6-2.625l-1.618-1.619c-1.105.525-1.723.974-2.626.6-.9-.373-1.017-1.116-1.431-2.28h-2.29c-.412 1.158-.53 1.907-1.431 2.28h-.001c-.9.374-1.51-.07-2.625-.6l-1.617 1.619c.527 1.11.973 1.724.6 2.625-.375.901-1.123 1.019-2.281 1.431v2.289c1.155.412 1.907.531 2.28 1.431.376.908-.081 1.534-.6 2.625l1.618 1.619c1.107-.525 1.724-.974 2.625-.6h.001c.9.373 1.018 1.118 1.431 2.28h2.289c.412-1.158.53-1.905 1.437-2.282h.001c.894-.372 1.501.071 2.619.602l1.618-1.619c-.525-1.107-.974-1.723-.601-2.625.374-.899 1.126-1.019 2.282-1.43zm-8.5 1.689c-1.564 0-2.833-1.269-2.833-2.834s1.269-2.834 2.833-2.834 2.833 1.269 2.833 2.834-1.269 2.834-2.833 2.834zm15.5 4.205v-1.077c-.55-.196-.897-.251-1.073-.673-.176-.424.033-.711.282-1.236l-.762-.762c-.52.248-.811.458-1.235.283-.424-.175-.479-.525-.674-1.073h-1.076c-.194.545-.25.897-.674 1.073-.424.176-.711-.033-1.235-.283l-.762.762c.248.523.458.812.282 1.236-.176.424-.528.479-1.073.673v1.077c.544.193.897.25 1.073.673.177.427-.038.722-.282 1.236l.762.762c.521-.248.812-.458 1.235-.283.424.175.479.526.674 1.073h1.076c.194-.545.25-.897.676-1.074h.001c.421-.175.706.034 1.232.284l.762-.762c-.247-.521-.458-.812-.282-1.235s.529-.481 1.073-.674zm-4 .794c-.736 0-1.333-.597-1.333-1.333s.597-1.333 1.333-1.333 1.333.597 1.333 1.333-.597 1.333-1.333 1.333zm-4 3.071v-.808c-.412-.147-.673-.188-.805-.505s.024-.533.212-.927l-.572-.571c-.389.186-.607.344-.926.212s-.359-.394-.506-.805h-.807c-.146.409-.188.673-.506.805-.317.132-.533-.024-.926-.212l-.572.571c.187.393.344.609.212.927-.132.318-.396.359-.805.505v.808c.408.145.673.188.805.505.133.32-.028.542-.212.927l.572.571c.39-.186.608-.344.926-.212.318.132.359.395.506.805h.807c.146-.409.188-.673.507-.805h.001c.315-.131.529.025.924.213l.572-.571c-.186-.391-.344-.609-.212-.927s.397-.361.805-.506zm-3 .596c-.552 0-1-.447-1-1s.448-1 1-1 1 .447 1 1-.448 1-1 1z"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              </li>
            </router-link>

            <router-link
              to="/finance/overview"
              custom
              v-slot="{ href, navigate, isExactActive }"
            >
              <li
                v-tooltip="'Транзакции'"
                class="px-3 py-2 rounded-sm mb-0.5 last:mb-0"
                :class="isExactActive && 'bg-slate-900'"
              >
                <div class="flex items-center justify-between">
                  <a
                    class="block text-gray-800 dark:text-gray-100 truncate transition"
                    :class="
                      currentRoute.fullPath.includes('finance')
                        ? ''
                        : 'hover:text-gray-900 dark:hover:text-white'
                    "
                    :href="href"
                    @click="navigate"
                  >
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <svg
                          class="shrink-0 fill-current"
                          :class="
                            currentRoute.fullPath.includes('finance')
                              ? 'text-violet-500'
                              : 'text-gray-400 dark:text-gray-500'
                          "
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M6 0a6 6 0 0 0-6 6c0 1.077.304 2.062.78 2.912a1 1 0 1 0 1.745-.976A3.945 3.945 0 0 1 2 6a4 4 0 0 1 4-4c.693 0 1.344.194 1.936.525A1 1 0 1 0 8.912.779 5.944 5.944 0 0 0 6 0Z"
                          />
                          <path
                            d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm-4 6a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
                          />
                        </svg>
                        <span
                          class="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Finance</span
                        >
                      </div>
                      <!-- Icon -->
                      <div class="flex shrink-0 ml-2">
                        <svg
                          class="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500"
                          viewBox="0 0 12 12"
                        >
                          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>
              </li>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Sidebar",
  props: ["sidebarOpen"],
  components: {},
  setup(props, { emit }) {
    const trigger = ref(null);
    const sidebar = ref(null);

    const currentRoute = useRouter().currentRoute.value;

    // close on click outside
    const clickHandler = ({ target }) => {
      if (!sidebar.value || !trigger.value) return;
      if (
        !props.sidebarOpen ||
        sidebar.value.contains(target) ||
        trigger.value.contains(target)
      )
        return;
      emit("close-sidebar");
    };

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!props.sidebarOpen || keyCode !== 27) return;
      emit("close-sidebar");
    };

    onMounted(() => {
      document.addEventListener("click", clickHandler);
      document.addEventListener("keydown", keyHandler);
    });

    onUnmounted(() => {
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("keydown", keyHandler);
    });

    return {
      trigger,
      sidebar,
      currentRoute,
    };
  },
};
</script>
