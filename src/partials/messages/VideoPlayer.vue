<template>
  <video-player
      class=""
      :src="videoPath"
      crossorigin="anonymous"
      playsinline
      controls
      :volume="0.6"
      :height="320"
      :playback-rates="[0.7, 1.0, 1.5, 2.0]"
  />
</template>
<script>
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

export default {
  name: 'VideoPlayer2',
  components: {
    VideoPlayer
  },
  props: {
    videoPath: {
      type: String,
      required: true,
    },
  }
}
</script>
