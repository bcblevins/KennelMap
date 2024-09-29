<template>
  <div id="kennel">
    <div id="left">
      <ul>
        <li v-for="k in kennel.slice(0, 12) " :key="k.number" @click="edit(k)">
          <div class="number">{{ k.number }}</div>
          <div lang="en" class="name">{{ k.name }}</div>
        </li>
      </ul>
    </div>
    <div id="middle">
      <ul>
        <li v-for="k in kennel.slice(12, 17) " :key="k.number" @click="edit(k)">
          <div class="number">{{ k.number }}</div>
          <div lang="en" class="name">{{ k.name }}</div>
        </li>      </ul>
      <ul>
        <li v-for="k in kennel.slice(17, 22) " :key="k.number" @click="edit(k)">
          <div class="number">{{ k.number }}</div>
          <div lang="en"  class="name">{{ k.name }}</div>
        </li>      </ul>
      <ul>
        <li v-for="k in kennel.slice(22, 27) " :key="k.number" @click="edit(k)">
          <div class="number">{{ k.number }}</div>
          <div lang="en"  class="name">{{ k.name }}</div>
        </li>      </ul>
      <ul>
        <li v-for="k in kennel.slice(27, 32) " :key="k.number" @click="edit(k)">
          <div class="number">{{ k.number }}</div>
          <div lang="en"  class="name">{{ k.name }}</div>
        </li>      </ul>
      <ul>
        <li v-for="k in kennel.slice(32, 37) " :key="k.number" @click="edit(k)">
          <div class="number">{{ k.number }}</div>
          <div lang="en"  class="name">{{ k.name }}</div>
        </li>      </ul>
    </div>
    <div id="right">
      <ul>
        <li v-for="k in kennel.slice(37) " :key="k.number" @click="edit(k)">
          <div class="number">{{ k.number }}</div>
          <div lang="en"  class="name">{{ k.name }}</div>
        </li>      </ul>
    </div>

    <form v-if="showForm" @submit.prevent="save">
      <button type="button" @click.prevent="showForm = !showForm" id="close-form">X</button>
      <h2>Edit Kennel {{ kennelToEdit.number }}</h2>
      <div id="name-container">
        <input ref="nameInput" type="text" placeholder="Name" v-model="newName">
        <button type="button" @click.prevent="clear" id="clear-button">clear</button>
      </div>

      <button type="submit" @click.prevent="save" id="save">Save</button>
    </form>

  </div>
</template>

<script setup>

// 1217 1722 2227 2732 3237 37

import { ref } from 'vue'

import dataService from '@/services/dataService'

const showForm = ref(false)
const loading = ref(false)

const kennel = ref([])
const kennelToEdit = ref({})
const newName = ref('')

const nameInput = ref(null)

const fetchData = async () => {
  let kennelData = await dataService.getKennel()

  kennelData.sort((a, b) => b.number - a.number)

  kennel.value = kennelData
}

const edit = (k) => {
  showForm.value = true
  kennelToEdit.value = k
  newName.value = k.name
  nameInput.value.focus()
}

const save = async () => {
  loading.value = true
  kennelToEdit.value.name = newName.value
  await dataService.updateRun(kennelToEdit.value)
  loading.value = false

  showForm.value = false
  newName.value = ''
}

const clear = () => {
  newName.value = ''
}

// @created
fetchData();



</script>

<style lang="css" scoped>
@import "https://unpkg.com/open-props";


#kennel * {
  --main-blue: rgb(0, 204, 255);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
}

ul {
  list-style: none;
  padding: 0px;
  margin: 0px;

  li {
    border: 1px solid rgb(77, 77, 77);
    width: 125px;
    height: 77px;
    position: relative;
    transition: all .3s ease;
    background-image: linear-gradient(to bottom right, white 20%, rgb(202, 216, 220) 200%);
    background-position: 0% 0%;
    /* Initial background position */
    background-size: 500% 500%;
    /* Ensure the gradient covers the entire element */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;

    .number {
      position: absolute;
      top: 0px;
      left: 0px;
      text-align: center;
      padding-inline: 3px;
      padding-block: 1px;
      border-right: 1px solid black;
      border-bottom: 1px solid black;
      background-color: white;
    }

    .name {
      text-align: center;
      padding: 5px;
      border-radius: 5px;
      transition: all .1s ease;
      overflow-wrap:anywhere;
    }

  }

  li:hover {
    /* background: linear-gradient(to bottom right, white 20%, rgb(0, 204, 255) 200%); */
    background-position: 100% 100%;
    /* Change background position on hover */
    cursor: pointer;

    filter: saturate(2);

    .number {
      color: var(--main-blue)
    }

  }

  li:active {
    background: none;
    background-color: rgb(255, 255, 255);
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

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  position: fixed;
  background-color: white;
  padding: 20px;
  box-shadow: 0px 0px 100vw 100vw rgba(0, 0, 0, 0.5);
  width: 300px;
  left: calc((725px / 2) - 150px);

  #close-form {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 30px;
    height: 30px;
    background-color: rgb(0, 204, 255);
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }

  #close-form:hover {
    background-color: rgb(146, 228, 255);
  }

  #name-container {
    input {
      width: 200px;
      height: 30px;
      padding: 3px;
      margin: 0px;
      margin-left: 10px;
      margin-bottom: 10px;
      border: 1px solid rgb(112, 112, 112);
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      border-top-left-radius: 7px;
      border-bottom-left-radius: 7px;
    }

    #clear-button {
      height: 38px;
      padding: 3px;
      margin: 0px;
      position: relative;
      left: -10px;
      border: 1px solid rgb(112, 112, 112);
      border-radius: 7px;
      background-color: rgb(238, 94, 94);
      color: white;
      cursor: pointer;

    }

    #clear-button:hover {
      filter: brightness(1.5);
    }
  }

  #save {
    width: 100px;
    height: 30px;
    background-color: rgb(0, 204, 255);
    color: white;
    border: none;
    border-radius: 5px;
  }

  #save:hover {
    background-color: rgb(146, 228, 255);
    cursor: pointer;
  }

}


</style>
