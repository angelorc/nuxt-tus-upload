<template>
  <div>
    Progress: {{ progress }}<br>
    <input ref="inputUpload" type="file"><br>
    <button @click="go">
      Upload
    </button><br>
    Result: <a :href="result" target="_blank">{{ result }}</a>
  </div>
</template>

<script lang="ts" setup>
import * as tus from 'tus-js-client'

const inputUpload = ref<HTMLInputElement | null>(null)
const progress = ref('0')
const result = ref<string | undefined>('')

async function go() {
  const file = inputUpload.value?.files?.[0]
  if (!file) {
    return
  }

  const upload = new tus.Upload(file, {
    endpoint: '/uploads',
    retryDelays: [0, 3000, 5000, 10000, 20000],
    metadata: {
      filename: file.name,
      filetype: file.type,
    },
    // Callback for errors which cannot be fixed using retries
    onError: function (error) {
      console.log('Failed because: ' + error)
    },
    // Callback for reporting upload progress
    onProgress: function (bytesUploaded, bytesTotal) {
      const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
      console.log(bytesUploaded, bytesTotal, percentage + '%')
      progress.value = percentage
    },
    // Callback for once the upload is completed
    onSuccess: function () {
      console.log('Download %s from %s', (upload.file as File).name, `${location}`)
      result.value = upload.url || undefined
    },
  })

  upload.start()
}
</script>
