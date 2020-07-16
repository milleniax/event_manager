<template>
  <div id="app">
    <Filters/>

    <br>

    <Form/>

    <EventList />
  </div>
</template>

<script>
import Filters from '@/components/Filters'
import Form from '@/components/Form'
import EventList from '@/components/EventList'
import { mapActions } from "vuex"


export default {
  name: 'App',
  components:{
      Filters,
      Form,
      EventList

  },
  async created(){
     await this.setEvents();       
  },
  methods: mapActions(['setEvents'])
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
