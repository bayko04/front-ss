<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

          <!-- Page header -->
          <div class="mb-8">
            <!-- Title -->
            <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Управление аккаунтами ✨</h1>
          </div>

          <!-- Content -->
          <div class="bg-white dark:bg-slate-800 shadow-lg rounded-sm mb-8">
            <div class="flex flex-col md:flex-row md:-mr-px">
              <div class="grow">

                <!-- Panel body -->
                <div class="p-6">
                  <h2 class="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-5">Добавление нового аккаунта</h2>

                  <!-- Connected Apps cards -->
                  <section class="pb-6 border-b border-slate-200 dark:border-slate-700">
                    <div class="grid grid-cols-12 gap-6">
                      <div class="col-span-full xl:col-span-6 2xl:col-span-4 bg-white dark:bg-slate-800 shadow-md rounded-sm border border-slate-200 dark:border-slate-700">
                        <!-- Card content -->
                        <div class="flex flex-col h-full p-5">
                          <div class="grow">
                            <header class="flex items-center mb-4">
                              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-whatsapp" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                                <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                              </svg>
                              <h3 class="text-lg text-slate-800 dark:text-slate-100 font-semibold">Whatsapp</h3>
                            </header>
                            <div class="text-sm">Добавление Whatsapp аккаунта.</div>
                          </div>
                          <!-- Card footer -->
                          <footer class="mt-4">
                            <div class="flex flex-wrap justify-between items-center">
                              <!-- Left side -->
                              <div class="flex space-x-3">
                                <div class="flex items-center text-slate-400 dark:text-slate-500">
                                  <svg class="w-4 h-4 shrink-0 fill-current mr-1.5" viewBox="0 0 16 16">
                                    <path d="M14.14 9.585a2.5 2.5 0 00-3.522 3.194c-.845.63-1.87.97-2.924.971a4.979 4.979 0 01-1.113-.135 4.436 4.436 0 01-1.343 1.682 6.91 6.91 0 006.9-1.165 2.5 2.5 0 002-4.547h.002zM10.125 2.188a2.5 2.5 0 10-.4 2.014 5.027 5.027 0 012.723 3.078c.148-.018.297-.028.446-.03a4.5 4.5 0 011.7.334 7.023 7.023 0 00-4.469-5.396zM4.663 10.5a2.49 2.49 0 00-1.932-1.234 4.624 4.624 0 01-.037-.516 4.97 4.97 0 011.348-3.391 4.456 4.456 0 01-.788-2.016A6.989 6.989 0 00.694 8.75c.004.391.04.781.11 1.166a2.5 2.5 0 103.86.584z" />
                                  </svg>
                                  <div class="text-sm text-slate-500 dark:text-slate-300">2 000 000 000+</div>
                                </div>
                                <div class="flex items-center text-amber-500">
                                  <svg class="w-4 h-4 shrink-0 fill-current mr-1.5" viewBox="0 0 16 16">
                                    <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                                  </svg>
                                  <div class="text-sm text-amber-600">4.9</div>
                                </div>
                              </div>
                              <!-- Right side -->
                              <button class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm flex items-center"
                                      @click="socialAuthInit('whatsapp')"
                              >
                                <svg class="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2" viewBox="0 0 12 12">
                                  <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                                </svg>
                                <span>Добавить</span>
                              </button>
                            </div>
                          </footer>
                        </div>
                      </div>
                      <div class="col-span-full xl:col-span-6 2xl:col-span-4 bg-white dark:bg-slate-800 shadow-md rounded-sm border border-slate-200 dark:border-slate-700">
                        <!-- Card content -->
                        <div class="flex flex-col h-full p-5">
                          <div class="grow">
                            <header class="flex items-center mb-4">
                              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-instagram" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                                <path d="M16.5 7.5l0 .01" />
                              </svg>
                              <h3 class="text-lg text-slate-800 dark:text-slate-100 font-semibold">Instagram</h3>
                            </header>
                            <div class="text-sm">Добавление Instagram аккаунта.</div>
                          </div>
                          <!-- Card footer -->
                          <footer class="mt-4">
                            <div class="flex flex-wrap justify-between items-center">
                              <!-- Left side -->
                              <div class="flex space-x-3">
                                <div class="flex items-center text-slate-400 dark:text-slate-500">
                                  <svg class="w-4 h-4 shrink-0 fill-current mr-1.5" viewBox="0 0 16 16">
                                    <path d="M14.14 9.585a2.5 2.5 0 00-3.522 3.194c-.845.63-1.87.97-2.924.971a4.979 4.979 0 01-1.113-.135 4.436 4.436 0 01-1.343 1.682 6.91 6.91 0 006.9-1.165 2.5 2.5 0 002-4.547h.002zM10.125 2.188a2.5 2.5 0 10-.4 2.014 5.027 5.027 0 012.723 3.078c.148-.018.297-.028.446-.03a4.5 4.5 0 011.7.334 7.023 7.023 0 00-4.469-5.396zM4.663 10.5a2.49 2.49 0 00-1.932-1.234 4.624 4.624 0 01-.037-.516 4.97 4.97 0 011.348-3.391 4.456 4.456 0 01-.788-2.016A6.989 6.989 0 00.694 8.75c.004.391.04.781.11 1.166a2.5 2.5 0 103.86.584z" />
                                  </svg>
                                  <div class="text-sm text-slate-500 dark:text-slate-300">1 220 000 000+</div>
                                </div>
                                <div class="flex items-center text-amber-500">
                                  <svg class="w-4 h-4 shrink-0 fill-current mr-1.5" viewBox="0 0 16 16">
                                    <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                                  </svg>
                                  <div class="text-sm text-amber-600">4.8</div>
                                </div>
                              </div>
                              <!-- Right side -->
                              <button class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm flex items-center"
                                      @click="socialAuthInit('instagram')"
                              >
                                <svg class="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2" viewBox="0 0 12 12">
                                  <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                                </svg>
                                <span>Добавить</span>
                              </button>
                            </div>
                          </footer>
                        </div>
                      </div>
                      <div class="col-span-full xl:col-span-6 2xl:col-span-4 bg-white dark:bg-slate-800 shadow-md rounded-sm border border-slate-200 dark:border-slate-700">
                        <!-- Card content -->
                        <div class="flex flex-col h-full p-5">
                          <div class="grow">
                            <header class="flex items-center mb-4">
                              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-facebook" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                              </svg>
                              <h3 class="text-lg text-slate-800 dark:text-slate-100 font-semibold">Facebook</h3>
                            </header>
                            <div class="text-sm">Добавление Facebook аккаунта.</div>
                          </div>
                          <!-- Card footer -->
                          <footer class="mt-4">
                            <div class="flex flex-wrap justify-between items-center">
                              <!-- Left side -->
                              <div class="flex space-x-3">
                                <div class="flex items-center text-slate-400 dark:text-slate-500">
                                  <svg class="w-4 h-4 shrink-0 fill-current mr-1.5" viewBox="0 0 16 16">
                                    <path d="M14.14 9.585a2.5 2.5 0 00-3.522 3.194c-.845.63-1.87.97-2.924.971a4.979 4.979 0 01-1.113-.135 4.436 4.436 0 01-1.343 1.682 6.91 6.91 0 006.9-1.165 2.5 2.5 0 002-4.547h.002zM10.125 2.188a2.5 2.5 0 10-.4 2.014 5.027 5.027 0 012.723 3.078c.148-.018.297-.028.446-.03a4.5 4.5 0 011.7.334 7.023 7.023 0 00-4.469-5.396zM4.663 10.5a2.49 2.49 0 00-1.932-1.234 4.624 4.624 0 01-.037-.516 4.97 4.97 0 011.348-3.391 4.456 4.456 0 01-.788-2.016A6.989 6.989 0 00.694 8.75c.004.391.04.781.11 1.166a2.5 2.5 0 103.86.584z" />
                                  </svg>
                                  <div class="text-sm text-slate-500 dark:text-slate-300">2 100 000 000+</div>
                                </div>
                                <div class="flex items-center text-amber-500">
                                  <svg class="w-4 h-4 shrink-0 fill-current mr-1.5" viewBox="0 0 16 16">
                                    <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                                  </svg>
                                  <div class="text-sm text-amber-600">4.9</div>
                                </div>
                              </div>
                              <!-- Right side -->
                              <button class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm flex items-center"
                                      @click="socialAuthInit('facebook')"
                              >
                                <svg class="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2" viewBox="0 0 12 12">
                                  <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                                </svg>
                                <span>Добавить</span>
                              </button>
                            </div>
                          </footer>
                        </div>
                      </div>
<!--                      tg              -->
                      <div class="col-span-full xl:col-span-6 2xl:col-span-4 bg-white dark:bg-slate-800 shadow-md rounded-sm border border-slate-200 dark:border-slate-700">
                        <!-- Card content -->
                        <div class="flex flex-col h-full p-5">
                          <div class="grow">
                            <header class="flex items-center mb-4">
                              <svg  xmlns="http://www.w3.org/2000/svg"  width="44"  height="44"  viewBox="0 0 24 24"  fill="none"  stroke="#057cd6"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-telegram"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" /></svg>                              <h3 class="text-lg text-slate-800 dark:text-slate-100 font-semibold">Telegram</h3>
                            </header>
                            <div class="text-sm">Добавление Telegram бота. Перед добавление вставьте токен бота в поле ниже.</div>
                          </div>
                          <!-- Card footer -->
                          <footer class="mt-4">
                            <div class="flex flex-wrap justify-between items-end w-full">
                              <!-- Left side -->
                              <div class="flex space-x-3 flex-grow">
                                <div class="flex flex-col">
                                  <div class="flex">
                                    <div class="flex items-center text-slate-400 dark:text-slate-500">
                                      <svg class="w-4 h-4 shrink-0 fill-current mr-1.5" viewBox="0 0 16 16">
                                        <path d="M14.14 9.585a2.5 2.5 0 00-3.522 3.194c-.845.63-1.87.97-2.924.971a4.979 4.979 0 01-1.113-.135 4.436 4.436 0 01-1.343 1.682 6.91 6.91 0 006.9-1.165 2.5 2.5 0 002-4.547h.002zM10.125 2.188a2.5 2.5 0 10-.4 2.014 5.027 5.027 0 012.723 3.078c.148-.018.297-.028.446-.03a4.5 4.5 0 011.7.334 7.023 7.023 0 00-4.469-5.396zM4.663 10.5a2.49 2.49 0 00-1.932-1.234 4.624 4.624 0 01-.037-.516 4.97 4.97 0 011.348-3.391 4.456 4.456 0 01-.788-2.016A6.989 6.989 0 00.694 8.75c.004.391.04.781.11 1.166a2.5 2.5 0 103.86.584z" />
                                      </svg>
                                      <div class="text-sm text-slate-500 dark:text-slate-300">7 000 000+</div>
                                    </div>
                                    <div class="flex items-center text-amber-500">
                                      <svg class="w-4 h-4 shrink-0 fill-current mr-1.5" viewBox="0 0 16 16">
                                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                                      </svg>
                                      <div class="text-sm text-amber-600">4.9</div>
                                    </div>
                                  </div>
                                  <div class="space-y-4">
                                    <div>
                                      <input placeholder="bot token" v-model="telegramBotToken" class="form-input w-full" type="text" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <!-- Right side -->
                              <button :disabled="!telegramBotToken" class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm flex items-center"
                                      @click="addTelegramBot()"
                              >
                                <svg class="w-3 h-3 shrink-0 fill-current text-emerald-500 mr-2" viewBox="0 0 12 12">
                                  <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                                </svg>
                                <span>Добавить</span>
                              </button>
                            </div>
                          </footer>
                        </div>
                      </div>
                    </div>
                  </section>

                  <div class="overflow-x-auto">
                    <table class="table-auto w-full dark:text-slate-300">
                      <!-- Table header -->
                      <thead class="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="font-semibold text-left">Название</div>
                        </th>
                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="font-semibold text-left">Соц. сеть</div>
                        </th>
                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="font-semibold text-left">Статус</div>
                        </th>
                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="font-semibold text-left">Бот</div>
                        </th>
                        <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="font-semibold text-left">Действия</div>
                        </th>
                      </tr>
                      </thead>
                      <!-- Table body -->
                      <tbody class="text-sm divide-y divide-slate-200 dark:divide-slate-700">
                      <tr v-for="account in accounts">
                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="font-bold text-black">{{ account.title }}</div>
                        </td>
                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="font-medium text-black" >{{ account.messenger.name }}</div>
                        </td>
                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="font-medium text-green-400" >Активный</div>
                        </td>
                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                          <div class="flex items-center">
                            <div class="form-switch">
                              <input type="checkbox" :id="account.id" class="sr-only" @click="showConfirmation(account.id)" v-model="account.ai_active" />
                              <label class="bg-slate-400 dark:bg-slate-700" :for="account.id">
                                <span class="bg-white shadow-sm" aria-hidden="true"></span>
                              </label>
                            </div>
                          </div>
                        </td>
                        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                          <div class="space-x-1">
                            <button @click.stop="deleteAccount(account)" class="text-rose-500 hover:text-rose-600 rounded-full">
                              <span class="sr-only">Delete</span>
                              <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
                                <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                                <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
                              </svg>
                            </button>
                          </div>
                        </td>

                      </tr>
                      </tbody>
                    </table>

                  </div>

                </div>

              </div>
            </div>
          </div>

          <!-- Модальное окно подтверждения -->
          <div v-if="showConfirmationModal" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md w-96">
              <div class="px-5 py-4">
                <div class="text-sm">
                  <div class="flex items-center mb-3">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100 dark:bg-rose-500/30 mr-2">
                      <svg class="w-4 h-4 shrink-0 fill-current text-rose-500" viewBox="0 0 16 16">
                        <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z"/>
                      </svg>
                    </div>
                    <div class="font-medium text-slate-800 dark:text-slate-100">Подтверждение действия</div>
                  </div>
                  <p class="text-slate-700 dark:text-slate-300 mb-4">Вы уверены, что хотите изменить состояние?</p>
                </div>
                <div class="flex justify-end space-x-2">
                  <button @click="cancelSwitch" class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300">
                    Отмена
                  </button>
                  <button @click="confirmSwitchAction" class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
                    Подтвердить
                  </button>
                </div>
              </div>
            </div>
          </div>

<!--          modal -->
          <!-- Cookies -->
          <div class="m-1.5">
            <!-- Start -->
            <ModalCookies v-if="deleting" id="cookies-modal" :modalOpen="deleting" @close-modal="deleting = false" title="Подтвердите удаление аккаунта">
              <!-- Modal content -->
              <div class="text-sm mb-5">
                <div class="space-y-2">
                  <p>Вы собираетесь удалить аккаунт {{deletingAccount.title}}.</p>
                  <p>Это приведеть к потере всех чатов, сообщений связанных с ним. И вы потеряете возможность получать обращения клиентов с этого аккаунта в нашей системе.</p>
                </div>
              </div>
              <!-- Modal footer -->
              <div class="flex flex-wrap justify-end space-x-2">
                <button class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" @click.stop="deleting = false">Отмена</button>
                <button class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" @click.stop="acceptDelete">Да, удалить</button>
              </div>
            </ModalCookies>
            <!-- End -->
          </div>
        </div>
      </main>

    </div>

  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue'
import Sidebar from '../partials/Sidebar.vue'
import Header from '../partials/Header.vue'
import { useAuthStore } from "../stores/auth.store.js";
import {useMessangers} from "../utils/messengers.js";
import {fetchWrapper} from "../helpers/fetch-wrapper.js";
import ModalCookies from "../components/ModalCookies.vue";

const sidebarOpen = ref(false)
const baseUrl = `${import.meta.env.VITE_API_URL}/redirect`;
const authStore = useAuthStore()
const {accounts} = useMessangers()
const telegramBotToken = ref('')
const deleting = ref(false)
const deletingAccount = ref(null)

console.log('test1')
function deleteAccount(account) {
  deleting.value = true
  deletingAccount.value = account
}

async function acceptDelete() {
  await fetchWrapper.delete(`/delete-account/${deletingAccount.value.id}`)
  window.location.href = `/settings/socials-panel`
}

async function addTelegramBot() {

  let result = await fetchWrapper.post('/add-telegram-bot', {'token': telegramBotToken.value})

  if (result.data) {
    window.location.href = `/messages?accountId=${result.data.id}`
  }
}

const showConfirmationModal = ref(false);
const switchAccountId = ref(null);
const originalSwitchState = ref(null);

const showConfirmation = (accountId) => {
  switchAccountId.value = accountId;
  const account = accounts.value.find(acc => acc.id === accountId);
  originalSwitchState.value = account.ai_active;
  account.ai_active = originalSwitchState.value; // Отменить временное переключение
  showConfirmationModal.value = true;
};

const cancelSwitch = () => {
  showConfirmationModal.value = false;
  const account = accounts.value.find(acc => acc.id === switchAccountId.value);
  account.ai_active = originalSwitchState.value;
  switchAccountId.value = null;
};

const switchAI = async (accountId) => {
  try {
    let result = await fetchWrapper.post('/switch-ai/' + accountId);
    if (result.data) {
      window.location.href = `/settings/socials-panel`;
    }
  } catch (error) {
    console.error("Ошибка переключения AI:", error);
  }
};

const confirmSwitchAction = async () => {
  showConfirmationModal.value = false;
  await switchAI(switchAccountId.value);
  switchAccountId.value = null;
};

function registerSocialAuthEvent(register) {
  if (register)
    return window.addEventListener('message', handleAuth)
  return window.removeEventListener('message', handleAuth)
}

function handleAuth(accountData) {
  if(accountData.data?.accountId) {
    window.location.href = `/messages?accountId=${accountData.data.accountId}`
  }
}

function socialAuthInit(provider) {
  const width = 640
  const height = 660
  const left = window.screen.width / 2 - (width / 2)
  const top = window.screen.height / 2 - (height / 2)
  window.open(`${baseUrl}/${provider}/${authStore.userData.user.company_id}`, 'Log In',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no,
      resizable=no, copyhistory=no, width=${width},height=${height},top=${top},left=${left}`)
}

onMounted(() => registerSocialAuthEvent(true))
onBeforeUnmount(() => registerSocialAuthEvent(false))
</script>