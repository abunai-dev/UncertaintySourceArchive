<template>
  <div class = "container">
    <header>
      <img alt="Uncertainty source logo" class="logo" :src="logoPath" width="1300" height="150" />
      <h1 v-if="!showContent">Welcome to the Uncertainty Source Archive</h1>   
    </header>
    <main>
      <div class="button-container" v-if="!showContent">
        <p v-for="messageItem in message" :key="messageItem">{{ messageItem }}</p>
        <p>Press the button below to get started!</p>
        <button @click="toggleShowContent" class="button">
          Show Table
        </button> 
      </div>
        <div v-if="showContent" class="content">
          <Suspense>
            <Content/>
          </Suspense>
        </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Content from './components/AppContent.vue';
import { ref } from 'vue'
import message from '@/data/welcome/welcomemessage'


const showContent = ref(false)

function toggleShowContent() {
  showContent.value = !showContent.value
  console.log("The value is: " + showContent.value)
}

const logoPath = ref("images/logo.jpg")

</script>



<style>
header {
  padding: 20px;
  text-align: center;
  line-height: 1.5;
}

main {
  max-width: 2500px;
  flex: 2;
  display: flex;
  justify-content: center;
}

.logo {
  position: relative;
  top: 10px;
  display: block;
  margin: 0 auto 2rem;
}
h1 {
  margin-top: 30px;
  text-align: center;
  color: #2c3e50;
}
p {
  text-align: center;
  color: grey;
  display: block;
}
.button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: #fff;
  cursor: pointer;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background: #fff;
  color: #2c3e50;
  font-size: 1rem;
  justify-content: center;
  align-items: center;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.content {
  clear: both;
  display: flex;
  margin: 40px auto;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background: #fff;
  color: #2c3e50;
  font-size: 1rem;
  max-width: 2000px;
  max-height: fit-content;
}
</style>
