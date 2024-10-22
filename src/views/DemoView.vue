<template>
    <div id="kennel">
      <div id="left">
        <ul>
          <li v-for="k in runList.slice(0, 12) " :key="k.number" @click="edit(k)" @drop="drop($event, k)"
            @dragover="allowDrop($event)" @dragenter="dragEnter($event)" @dragleave="dragLeave($event)">
            <div class="number">{{ k.number }}</div>
            <div lang="en" class="name" @dragstart="dragStart($event, k)" draggable="true">{{ k.name }}</div>
          </li>
        </ul>
      </div>
      <div id="middle">
        <ul>
          <li v-for="k in runList.slice(12, 17) " :key="k.number" @click="edit(k)" @drop="drop($event, k)"
            @dragover="allowDrop($event)" @dragenter="dragEnter($event)" @dragleave="dragLeave($event)">
            <div class="number">{{ k.number }}</div>
            <div lang="en" class="name" @dragstart="dragStart($event, k)" draggable="true">{{ k.name }}</div>
          </li>
        </ul>
        <ul>
          <li v-for="k in runList.slice(17, 22) " :key="k.number" @click="edit(k)" @drop="drop($event, k)"
            @dragover="allowDrop($event)" @dragenter="dragEnter($event)" @dragleave="dragLeave($event)">
            <div class="number">{{ k.number }}</div>
            <div lang="en" class="name" @dragstart="dragStart($event, k)" draggable="true">{{ k.name }}</div>
          </li>
        </ul>
        <ul>
          <li v-for="k in runList.slice(22, 27) " :key="k.number" @click="edit(k)" @drop="drop($event, k)"
            @dragover="allowDrop($event)" @dragenter="dragEnter($event)" @dragleave="dragLeave($event)">
            <div class="number">{{ k.number }}</div>
            <div lang="en" class="name" @dragstart="dragStart($event, k)" draggable="true">{{ k.name }}</div>
          </li>
        </ul>
        <ul>
          <li v-for="k in runList.slice(27, 32) " :key="k.number" @click="edit(k)" @drop="drop($event, k)"
            @dragover="allowDrop($event)" @dragenter="dragEnter($event)" @dragleave="dragLeave($event)">
            <div class="number">{{ k.number }}</div>
            <div lang="en" class="name" @dragstart="dragStart($event, k)" draggable="true">{{ k.name }}</div>
          </li>
        </ul>
        <ul>
          <li v-for="k in runList.slice(32, 37) " :key="k.number" @click="edit(k)" @drop="drop($event, k)"
            @dragover="allowDrop($event)" @dragenter="dragEnter($event)" @dragleave="dragLeave($event)">
            <div class="number">{{ k.number }}</div>
            <div lang="en" class="name" @dragstart="dragStart($event, k)" draggable="true">{{ k.name }}</div>
          </li>
        </ul>
      </div>
      <div id="right">
        <ul>
          <li v-for="k in runList.slice(37, 49) " :key="k.number" @click="edit(k)" @drop="drop($event, k)"
            @dragover="allowDrop($event)" @dragenter="dragEnter($event)" @dragleave="dragLeave($event)">
            <div class="number">{{ k.number }}</div>
            <div lang="en" class="name" @dragstart="dragStart($event, k)" draggable="true">{{ k.name }}</div>
          </li>
        </ul>
      </div>
  
      <form v-if="showForm" @submit.prevent="saveRun">
        <button type="button" @click.prevent="showForm = !showForm" id="close-form">X</button>
        <h2>Edit Kennel {{ kennelToEdit.number }}</h2>
        <div id="name-container">
          <input ref="dogNameInput" type="text" placeholder="Name" v-model="newName">
          <button type="button" @click.prevent="clearRun" id="clear-button">clear</button>
        </div>
  
        <button type="submit" @click.prevent="saveRun" id="save">Save</button>
      </form>
  
    </div>
    <aside class="no-print">
      <div class="aside-left">
        <header>
          <h1> DEMO </h1>
        </header>
        <div id="welcome">
          <h1>Welcome to Kennel Map!</h1>
          <p>Click on a run to edit the name. Drag and drop to move dogs between runs.</p>
          <p> In this demo version, the saving functionality in not available. </p>
        </div>
        <button id="print-button" onclick="window.print()">Print</button>
        <form>
          <h2>Create New Kennel</h2>
          <div id="save-kennel-inputs">
            <label for="kennel-name-input">Name</label>
            <input id="kennel-name-input" autocomplete="off" type="text" v-model="kennelNameInput">
            <label for="date-input">Date (optional)</label>
            <input id="date-input" type="date" v-model="dateInput">
          </div>
          <button id="save-kennel" @click.prevent="newKennel">Create</button>
        </form>
      </div>
      <div class="aside-right">
        <menu id="pick-date">
          <h2>Saved Kennels</h2>
          <li class="current-kennel" @click.prevent="changeKennel(kennel.id)" v-for="kennel in savedKennels"
            :key="kennel.id">
            <span>{{ (kennel.id == activeKennel.id ? '> ' : '') + kennel.name }}</span>
            <button v-if="kennel.id !== 0" @click.prevent="deleteKennel(kennel.id)">Delete</button>
          </li>
        </menu>
      </div>
  
      <div class="loading" v-show="loading">
        Loading Kennel 
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
  
    </aside>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import dataService from '@/services/dataService'
  
  const showForm = ref(false)
  const loading = ref(false)
  
  const runList = ref([
  { number: 48, name: "Doggo" },
  { number: 47, name: null },
  { number: 46, name: null },
  { number: 45, name: null },
  { number: 44, name: null },
  { number: 43, name: null },
  { number: 42, name: "Richard" },
  { number: 41, name: null },
  { number: 40, name: null },
  { number: 39, name: null },
  { number: 38, name: null },
  { number: 37, name: null },
  { number: 36, name: null },
  { number: 35, name: null },
  { number: 34, name: null },
  { number: 33, name: null },
  { number: 32, name: null },
  { number: 31, name: null },
  { number: 30, name: null },
  { number: 29, name: "Fluffy" },
  { number: 28, name: null },
  { number: 27, name: null },
  { number: 26, name: null },
  { number: 25, name: null },
  { number: 24, name: null },
  { number: 23, name: null },
  { number: 22, name: null },
  { number: 21, name: null },
  { number: 20, name: null },
  { number: 19, name: null },
  { number: 18, name: null },
  { number: 17, name: null },
  { number: 16, name: null },
  { number: 15, name: null },
  { number: 14, name: null },
  { number: 13, name: null },
  { number: 12, name: null },
  { number: 11.5, name: null },
  { number: 11, name: null },
  { number: 10, name: null },
  { number: 9, name: null },
  { number: 8, name: null },
  { number: 7, name: null },
  { number: 6, name: null },
  { number: 5, name: null },
  { number: 4, name: null },
  { number: 3, name: null },
  { number: 2, name: null },
  { number: 1, name: null }
])
  const activeKennel = ref({})
  const kennelToEdit = ref({})
  const newName = ref('')
  const activeKennelId = ref(0)
  
  const dogNameInput = ref(null)
  
  const kennelNameInput = ref(null)
  const dateInput = ref(null)
  
  const savedKennels = ref([])
  
  const fetchData = async () => {
    let runsData = await dataService.getRuns(activeKennelId.value)
    activeKennel.value = (await dataService.getKennel(activeKennelId.value))[0];
    savedKennels.value = await dataService.getKennelList();
    runsData.sort((a, b) => b.number - a.number);
  
    runList.value = runsData
  }
  
  const changeKennel = async (id) => {
    activeKennelId.value = id
    fetchData()
  }
  
  // Individual run management //////////////////////////////////////
  
  const edit = (k) => {
    showForm.value = true
    kennelToEdit.value = k
    newName.value = k.name
    dogNameInput.value.focus()
  }
  
  const saveRun = async () => {
    loading.value = true
    kennelToEdit.value.name = newName.value
    // await dataService.updateRun(kennelToEdit.value)
    loading.value = false
  
    showForm.value = false
    newName.value = ''
  }
  
  const clearRun = () => {
    newName.value = ''
  }
  
  //////////////////////////////////////////////////////////////////
  
  // Kennel Managment ////////////////////////////////////////////////
  
//   const newKennel = async () => {
//     loading.value = true;
//     // creates a blank list of runs
//     let runs =
//       [
//         { number: 1, name: '' },
//         { number: 2, name: '' },
//         { number: 3, name: '' },
//         { number: 4, name: '' },
//         { number: 5, name: '' },
//         { number: 6, name: '' },
//         { number: 7, name: '' },
//         { number: 8, name: '' },
//         { number: 9, name: '' },
//         { number: 10, name: '' },
//         { number: 11, name: '' },
//         { number: 11.5, name: '' },
//         { number: 12, name: '' },
//         { number: 13, name: '' },
//         { number: 14, name: '' },
//         { number: 15, name: '' },
//         { number: 16, name: '' },
//         { number: 17, name: '' },
//         { number: 18, name: '' },
//         { number: 19, name: '' },
//         { number: 20, name: '' },
//         { number: 21, name: '' },
//         { number: 22, name: '' },
//         { number: 23, name: '' },
//         { number: 24, name: '' },
//         { number: 25, name: '' },
//         { number: 26, name: '' },
//         { number: 27, name: '' },
//         { number: 28, name: '' },
//         { number: 29, name: '' },
//         { number: 30, name: '' },
//         { number: 31, name: '' },
//         { number: 32, name: '' },
//         { number: 33, name: '' },
//         { number: 34, name: '' },
//         { number: 35, name: '' },
//         { number: 36, name: '' },
//         { number: 37, name: '' },
//         { number: 38, name: '' },
//         { number: 39, name: '' },
//         { number: 40, name: '' },
//         { number: 41, name: '' },
//         { number: 42, name: '' },
//         { number: 43, name: '' },
//         { number: 44, name: '' },
//         { number: 45, name: '' },
//         { number: 46, name: '' },
//         { number: 47, name: '' },
//         { number: 48, name: '' },
//       ]
//     let newKennel = { name: kennelNameInput.value, date: dateInput.value }
//     let newKennelId = await dataService.saveKennel(runs, newKennel)
  
//     kennelNameInput.value = null
//     dateInput.value = null
  
//     await changeKennel(newKennelId)
//     loading.value = false
//   }
  
//   const deleteKennel = async (id) => {
//     await dataService.deleteKennel(id)
//     changeKennel(0)
//   }
  
  //////////////////////////////////////////////////////////////////
  
  // DRAG AND DROP ////////////////////////////////////////////////
  
  // used to handle drag start, sets up "name" property to be transferred to new element
  const dragStart = (event, k) => {
    event.dataTransfer.setData('text/plain', k.name)
  }
  
  // Default behavior is to not allow dropping, this function sets it to allow
  const allowDrop = (event) => {
    event.preventDefault()
  }
  
  const drop = async (event, newK) => {
    event.preventDefault()
  
    event.target.classList.remove('drag-over');
  
    // gets the name back from the event. We set it up in dragStart
    let nameData = event.dataTransfer.getData('text/plain')
  
    // this finds the right object with the name we dragged in the kennel array
    let oldK = runList.value.find(k => k.name === nameData)
  
    // this makes sure we aren't dragging the same element to the same place,
    // then it swaps the names
    if (oldK.number !== newK.number) {
      if (oldK.name === '') {
        return;
      }
  
      let nameToMove = oldK.name
      oldK.name = newK.name
      newK.name = nameToMove
  
      await dataService.updateRun(oldK)
      await dataService.updateRun(newK)
  
    }
  }
  
  // used to add styles to the element we are dragging over
  const dragEnter = (event) => {
    event.target.classList.add('drag-over');
  }
  
  // used to remove styles from the element we are dragging over
  const dragLeave = (event) => {
    event.target.classList.remove('drag-over');
  }
  
  //////////////////////////////////////////////////////////////////
  
  // @created
//   fetchData(activeKennelId.value);
  
  
  
  </script>
  
  <style lang="css" scoped>
  @import "https://unpkg.com/open-props";
  
  @keyframes dot-bounce {
  
    0%,
    20%,
    100% {
      transform: translateY(0);
      box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.187);
    }
  
    50% {
      transform: translateY(-20px);
      box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.5);
    }
  
  }
  
  .not-implemented {
    filter: brightness(0.9);
  }
  
  
  
  .not-implemented::after {
    content: "Coming Soon!";
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    color: rgb(255, 255, 255);
    background-color: rgba(80, 80, 80, 0.5);
    cursor: not-allowed
  }
  
  
  #kennel * {
    --main-blue: rgb(0, 204, 255);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  
    /* The following prevents highlighting on all browsers, 
    to make drag and drop work better */
    user-select: none;
  }
  
  aside * {
    --main-blue: rgb(0, 204, 255);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }
  
  
  #kennel {
    display: grid;
    grid-template-columns: 1fr 2.3fr 1fr;
    width: 750px;
  
    ul {
      list-style: none;
      padding: 0px;
      margin: 0px;
  
      .drag-over {
        background-image: none;
        background-color: rgba(0, 204, 255, 0.289);
        filter: saturate(2);
      }
  
      li {
        border: 2px solid rgb(77, 77, 77);
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
          top: 1px;
          left: 1px;
          text-align: center;
          padding-inline: 3px;
          padding-block: 1px;
          border-right: 1px solid black;
          border-bottom: 1px solid black;
          background-color: white;
          height: 20px;
          border-top-left-radius: 7px;
        }
  
        .name {
          text-align: center;
          padding: 5px;
          border-radius: 5px;
          transition: all .1s ease;
          overflow-wrap: anywhere;
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
      z-index: 1000;
  
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
  
  aside {
    width: calc(100vw - 770px);
    height: 100vh;
    z-index: 0;
    position: fixed;
    top: 0px;
    left: 770px;
    background-color: rgb(224, 224, 224);
    padding: 10px;
    display: flex;
  
  
    .aside-left {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-items: center;
  
      width: 290px;
  
      header {
        background-color: white;
        width: 250px;
        margin-inline: 10px;
        padding: 10px;
        border: 1px solid black;
        border-radius: 5px;
  
  
        h1 {
          margin: 0px;
          font-size: 30px;
          text-align: center;
          color: rgb(0, 204, 255);
          text-shadow: 3px 1px 1px rgb(236, 236, 236);
        }
      }
  
      #welcome {
        display: flex;
        flex-direction: column;
        padding: 10px;
        margin: 10px;
        border: 1px solid black;
        border-radius: 5px;
        background-color: white;
        width: 250px;
        padding: 10px;
        align-items: center;
        z-index: 0;
  
        h1 {
          text-align: center;
          margin-bottom: 0px;
        }
  
        p {
          margin-bottom: 0px
        }
      }
  
      form {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        padding: 10px;
        margin: 10px;
        border: 1px solid black;
        border-radius: 5px;
        background-color: white;
        width: 250px;
        padding: 10px;
        align-items: center;
        z-index: 0;
  
        margin-bottom: auto;
  
        h3 {
          margin-block: 0px;
          font-weight: 300;
          display: inline-block;
          border: 1px solid black;
          padding: 5px;
          position: relative;
          top: -5px;
          left: -70px;
          color: rgb(0, 204, 255);
        }
  
        h2 {
          text-align: center;
          margin: 0px;
        }
  
        #save-kennel-inputs {
          border: none;
          margin: 0px;
          display: flex;
          flex-direction: column;
  
          label {
            text-align: center;
          }
  
          input {
            height: 20px;
            padding: 3px;
            margin: 0px;
            margin-left: 10px;
            margin-bottom: 10px;
            border: 1px solid rgb(112, 112, 112);
            border-radius: 7px;
            width: 150px;
          }
        }
  
  
        #save-kennel {
          width: 100px;
          height: 30px;
          background-color: rgb(0, 204, 255);
          color: white;
          border: none;
          border-radius: 5px;
        }
  
        #save-kennel:hover {
          background-color: rgb(146, 228, 255);
          cursor: pointer;
  
        }
      }
  
    }
  
    #pick-date {
      list-style: none;
      padding: 0px;
      margin: 10px;
      margin-top: 0px;
      border: 1px solid black;
      border-radius: 5px;
      background-color: white;
      width: 200px;
      padding: 10px;
  
      h2 {
        text-align: center;
      }
  
  
  
      li {
        padding: 5px;
        display: flex;
        justify-content: space-between;
  
        span {
          text-decoration: underline;
          color: blue;
          cursor: pointer;
        }
  
        span:hover {
          filter: brightness(5)
        }
  
        button {
          padding: 3px;
          margin: 0px;
          position: relative;
          left: -10px;
          border: 1px solid rgb(112, 112, 112);
          border-radius: 7px;
          background-color: rgb(210, 240, 255);
          color: rgb(0, 0, 0);
          cursor: pointer;
  
        }
  
        button:hover {
          background-color: rgb(238, 94, 94);
        }
  
      }
  
      li:nth-child(even) {
        background-color: rgb(224, 224, 224);
      }
  
  
    }
  
    #print-button {
      width: 100px;
      height: 30px;
      background-color: rgb(0, 204, 255);
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  
    .loading {
      position: fixed;
      left: calc(385px - 100px);
      top: calc(50% - 50px);
      z-index: 1000;
      font-size: 20px;
  
      width: 200px;
      height: 100px;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0px 0px 100vw 100vw rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
  
  
  
      .dot {
        display: inline-block;
        height: 10px;
        width: 10px;
        background-color: rgb(0, 204, 255);
        border-radius: 50%;
        margin: 4px;
        animation: dot-bounce .8s infinite;
      }
  
      .dot:nth-child(1) {
        animation-delay: -0.4s;
      }
  
      .dot:nth-child(2) {
        animation-delay: -0.2s;
      }
  
      .dot:nth-child(3) {
        animation-delay: 0s;
      }
  
  
    }
  
  }
  
  
  
  @media print {
    form {
      display: none;
    }
  
    .no-print {
      display: none;
    }
  }
  </style>
  