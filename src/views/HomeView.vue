<template>
  <div id="kennel">
    <div id="left">
      <ul>
        <li v-for="k in left" :key="k">{{ k }} </li>
      </ul>
    </div>
    <div id="middle">
      <ul>
        <li v-for="k in middle1" :key="k">{{ k }}</li>
      </ul>
      <ul>
        <li v-for="k in middle2" :key="k"> {{ k }} </li>
      </ul>
      <ul>
        <li v-for="k in middle3" :key="k"> {{ k }} </li>
      </ul>
      <ul>
        <li v-for="k in middle4" :key="k"> {{ k }} </li>
      </ul>
      <ul>
        <li v-for="k in middle5" :key="k"> {{ k }} </li>
      </ul>
    </div>
    <div id="right">
      <ul>
        <li v-for="k in right" :key="k"> {{k}} </li>
      </ul>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const left = ref([48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37])
const middle1 = ref([36, 35, 34, 33, 32])
const middle2 = ref([27, 28, 29, 30, 31])
const middle3 = ref([26, 25, 24, 23, 22])
const middle4 = ref([17, 18, 19, 20, 21])
const middle5 = ref([16, 15, 14, 13, 12])
const right = ref([11.5, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
</script>

<style lang="css" scoped>
ul {
  list-style: none;
  padding: 0px;
  margin: 0px;

  li {
    border: 1px solid black;
    width: 125px;
    height: 77px;
  }
}

#kennel {
  display: grid;
  grid-template-columns: 1fr 2.3fr 1fr;
  width: 725px;

  #left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-self: start;
  }
  #middle {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    ul {
      li {
        float: left;
        width: 75px;
        height: 150px;
      }
    }
    ul:nth-child(1) {
      margin-bottom: 75px;
    }
    ul:nth-child(3) {
      margin-bottom: 75px;
    }
  }

  #right {
    display: flex;
    align-items: end;

    ul {
      margin-left: auto;
    }
  }

}
</style>
