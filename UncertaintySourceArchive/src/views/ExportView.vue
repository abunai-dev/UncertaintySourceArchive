<template>
  <div class="flex max-h-full flex-col overflow-hidden">
    <p class="mx-auto w-fit">
      Get a json file containing all the uncertainties either by using this link:
    </p>
    <p class="mx-auto my-4 flex w-fit">
      <span
        class="flex h-8 items-center justify-center rounded rounded-r-none border border-primary-400 px-2 py-1"
        >{{ url }}</span
      >
      <span
        class="max-w-8 flex h-8 max-h-8 w-8 cursor-pointer items-center justify-center rounded rounded-l-none border border-l-0 border-primary-400 px-2 py-1 text-center duration-1000 active:text-lg"
        @click="copy()"
      >
        <FontAwesomeIcon :icon="faCopy" />
      </span>
    </p>
    <p class="mx-auto w-fit">Or by directly downloading it:</p>
    <form method="get" file="url">
      <a :href="url" download="data.json">
        <ButtonComponent class="mx-auto">Download</ButtonComponent>
      </a>
    </form>

    <div class="mx-auto pt-5 text-center">
      <p>
        For more information on how to use the data, please refer to
        <a href="https://www.abunai.dev" class="text-link underline dark:text-link-dark"
          >abunai.dev</a
        >.
      </p>
      <p>
        All information can also be found
        <a
          :href="`https://www.github.com/${IssueResourceGetter.OWNER}/${IssueResourceGetter.REPO}/issues?q=label%3A${IssueResourceGetter.ACCEPTED_ISSUE_LABEL}`"
          class="text-link underline dark:text-link-dark"
          >here</a
        >.
      </p>
    </div>

    <section class="mx-auto mt-10 flex w-3/6 flex-col overflow-hidden">
      <h3 class="font-mono text-xl">&gt; cat data.json</h3>
      <ContainerComponent
        class="max-h-[30vh] grow overflow-scroll bg-primary-50 dark:bg-primary-970"
      >
        <pre
          v-if="fileContent != null"
          class="min-h-[100px]"
        ><code v-html="fileContent" class="font-mono text-xs"></code></pre>
      </ContainerComponent>
      <div ref="styleholder"></div>
    </section>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue'
import { resourceGetter } from '@/model/resourceGetter/ResourceGetter'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { ref, watch, type Ref, onMounted, inject } from 'vue'
import { format } from 'prettier'
import hljsLightMode from 'highlight.js/styles/idea.css?raw'
import hljsDarkMode from 'highlight.js/styles/vs2015.css?raw'
import hljs from 'highlight.js'
import json from 'highlight.js/lib/languages/json'
import estree from 'prettier/plugins/estree'
import babel from 'prettier/plugins/babel'
import ContainerComponent from '@/components/ContainerComponent.vue'
import { IssueResourceGetter } from '@/model/resourceGetter/IssueResourceGetter'

hljs.registerLanguage('json', json)

const url = resourceGetter.getFileUrl()
const fileContent: Ref<null | string> = ref(null)
const maxLines = 120

function copy() {
  navigator.clipboard.writeText(url)
}

resourceGetter
  .getFileContent()
  .then(async (content) => {
    return format(JSON.stringify(content), { filepath: 'name.json', plugins: [estree, babel] })
  })
  .then((content) => {
    return hljs.highlight(content, { language: 'json' }).value
  })
  .then((content) => {
    const lines = content.split('\n')
    if (lines.length > maxLines) {
      lines.splice(maxLines, lines.length - maxLines)
      lines.push('...')
    }
    fileContent.value = lines.join('\n')
  })

// This code is responsible for changing the theme of the highlighted code depending on light/dark mode
// Changing the used style itsself is the desired solution (https://github.com/highlightjs/highlight.js/issues/2115)
const styleholder: Ref<Node | null> = ref(null)
const dark = inject('dark') as Ref<boolean>

onMounted(() => {
  if (styleholder.value == null) {
    return
  }
  const styleHolderDiv = styleholder.value as Node
  const styleElement = document.createElement('style')
  styleElement.innerHTML = dark.value ? hljsDarkMode : hljsLightMode
  styleHolderDiv.appendChild(styleElement)
})

watch(dark, (newValue) => {
  if (styleholder.value == null) {
    return
  }
  const styleHolderDiv = styleholder.value as Node
  styleHolderDiv.removeChild(styleHolderDiv.firstChild as Node)
  const styleElement = document.createElement('style')
  styleElement.innerHTML = newValue ? hljsDarkMode : hljsLightMode
  styleHolderDiv.appendChild(styleElement)
})
</script>
