<template>
  <div id="kennel">
    <div id="left">
      <ul>
        <li v-for="k in activeKennel.slice(0, 12) " :key="k.number" @click="edit(k)" @drop="drop($event, k)"
          @dragover="allowDrop($event)" @dragenter="dragEnter($event)" @dragleave="dragLeave($event)">
          <div class="number">{{ k.number }}</div>
          <div lang="en" class="name" @dragstart="dragStart($event, k)" draggable="true">{{ k.name }}</div>
        </li>
      </ul>
    </div>
    <div id="middle">
      <ul>
        <li v-for="k in activeKennel.slice(12, 17) " :key="k.number" @click="edit(k)" @drop="drop($event, k)"
          @dragover="allowDrop($event)" @dragenter="dragEnter($event)" @dragleave="dragLeave($event)">
          <div class="number">{{ k.number }}</div>
          <div lang="en" class="name" @dragstart="dragStart($event, k)" draggable="true">{{ k.name }}</div>
        </li>
      </ul>
      <ul>
        <li v-for="k in activeKennel.slice(17, 22) " :key="k.number" @click="edit(k)" @drop="drop($event, k)"
          @dragover="allowDrop($event)" @dragenter="dragEnter($event)" @dragleave="dragLeave($event)">
          <div class="number">{{ k.number }}</div>
          <div lang="en" class="name" @dragstart="dragStart($event, k)" draggable="true">{{ k.name }}</div>
        </li>
      </ul>
      <ul>
        <li v-for="k in activeKennel.slice(22, 27) " :key="k.number" @click="edit(k)" @drop="drop($event, k)"
          @dragover="allowDrop($event)" @dragenter="dragEnter($event)" @dragleave="dragLeave($event)">
          <div class="number">{{ k.number }}</div>
          <div lang="en" class="name" @dragstart="dragStart($event, k)" draggable="true">{{ k.name }}</div>
        </li>
      </ul>
      <ul>
        <li v-for="k in activeKennel.slice(27, 32) " :key="k.number" @click="edit(k)" @drop="drop($event, k)"
          @dragover="allowDrop($event)" @dragenter="dragEnter($event)" @dragleave="dragLeave($event)">
          <div class="number">{{ k.number }}</div>
          <div lang="en" class="name" @dragstart="dragStart($event, k)" draggable="true">{{ k.name }}</div>
        </li>
      </ul>
      <ul>
        <li v-for="k in activeKennel.slice(32, 37) " :key="k.number" @click="edit(k)" @drop="drop($event, k)"
          @dragover="allowDrop($event)" @dragenter="dragEnter($event)" @dragleave="dragLeave($event)">
          <div class="number">{{ k.number }}</div>
          <div lang="en" class="name" @dragstart="dragStart($event, k)" draggable="true">{{ k.name }}</div>
        </li>
      </ul>
    </div>
    <div id="right">
      <ul>
        <li v-for="k in activeKennel.slice(37, 49) " :key="k.number" @click="edit(k)" @drop="drop($event, k)"
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
        <input ref="nameInput" type="text" placeholder="Name" v-model="newName">
        <button type="button" @click.prevent="clearRun" id="clear-button">clear</button>
      </div>

      <button type="submit" @click.prevent="saveRun" id="save">Save</button>
    </form>

  </div>
  <aside class="no-print">
    <div>
      <h1>Welcome to Kennel Map!</h1>
      <p>Click on a run to edit the name. Drag and drop to move dogs between runs.</p>
      <p>Drag and drops are saved automatically.</p>
    </div>
    <button id="print-button" onclick="window.print()" >Print</button>
    <form class="not-implemented">
      <h3> {{ activeKennelDate === null ? "Today" : activeKennelDate }} </h3>
      <h2>Save Kennel Configuration</h2>
      <input type="date" v-model="dateInput">
      <button id="save-kennel" @click.prevent="saveKennel">Save</button>
    </form>
    <menu id="pick-date" class="not-implemented" >
      <h2>Saved Kennels</h2>
      <li @click.prevent="fetchData(kennel.kennel_id)" v-for="kennel in savedKennels" :key="kennel.id"> {{ kennel.date == null ? "Today" : kennel.date }} </li>
    </menu>

  </aside>
</template>

<script setup>
import { ref } from 'vue'
import dataService from '@/services/dataService'

const showForm = ref(false)
const loading = ref(false)

const activeKennel = ref([])
const kennelToEdit = ref({})
const newName = ref('')
const activeKennelId = ref(0)
const activeKennelDate = ref(null)

const nameInput = ref(null)
const dateInput = ref(null)

const savedKennels = ref([])

const fetchData = async (kennel_id) => {
  let kennelData = await dataService.getKennel(kennel_id)
  activeKennelDate.value = (await dataService.getKennelDate(kennel_id))[0].date;
  savedKennels.value = await dataService.getKennelList();
  kennelData.sort((a, b) => b.number - a.number);

  activeKennel.value = kennelData
}

// Individual run management //////////////////////////////////////

const edit = (k) => {
  showForm.value = true
  kennelToEdit.value = k
  newName.value = k.name
  nameInput.value.focus()
  console.log(activeKennel.value)
}

const saveRun = async () => {
  loading.value = true
  kennelToEdit.value.name = newName.value
  await dataService.updateRun(kennelToEdit.value)
  loading.value = false

  showForm.value = false
  newName.value = ''
}

const clearRun = () => {
  newName.value = ''
}

//////////////////////////////////////////////////////////////////

// Kennel Managment ////////////////////////////////////////////////

const saveKennel = async () => {
  activeKennelDate.value = dateInput.value
  let runs = activeKennel.value
  let newKennel = { date: activeKennelDate.value }
  await dataService.saveKennel(runs, newKennel)
}

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
  let oldK = activeKennel.value.find(k => k.name === nameData)

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
fetchData(activeKennelId.value);



</script>

<style lang="css" scoped>
@import "https://unpkg.com/open-props";

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

  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
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
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0px;
  left: 760px;
  padding: 10px;
  z-index: 0;
  background-color: rgb(224, 224, 224);
  height: 100%;
  width: 100%;

  div {
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 10px;
    border: 1px solid black;
    border-radius: 5px;
    background-color: white;
    width: 200px;
    padding: 10px;
    align-items: center;
    z-index: 0;

    h1 {
      text-align: center;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 10px;
    border: 1px solid black;
    border-radius: 5px;
    background-color: white;
    width: 200px;
    padding: 10px;
    align-items: center;
    z-index: 0;


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
      margin-top: 0px;
    }
    input {
      height: 30px;
      padding: 3px;
      margin: 0px;
      margin-left: 10px;
      margin-bottom: 10px;
      border: 1px solid rgb(112, 112, 112);
      border-radius: 7px;
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

  #pick-date {
    list-style: none;
    padding: 0px;
    margin: 10px;
    border: 1px solid black;
    border-radius: 5px;
    background-color: white;
    width: 200px;
    padding: 10px;

    h2 {
      text-align: center;
    }

    li {
      text-decoration: underline;
      color: blue;
      margin-bottom: 5px;
      cursor: pointer;

    }

    li:hover {
      filter: brightness(5);
    }

  }

  #print-button {
    width: 100px;
    height: 30px;
    background-color: rgb(0, 204, 255);
    color: white;
    border: none;
    border-radius: 5px;
    margin-left: 75px;
    cursor: pointer;
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
