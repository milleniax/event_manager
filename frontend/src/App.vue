<template>
  <div id="app">
    <div class="d-flex justify-content-between">
        <select v-model="selected"> 
            <option value="">Все</option>
            <option value="month">За этот месяц</option>
            <option value="week">За эту неделю</option>
            <option value="day">За этот день</option>
        </select>
        <div>
            <input type="text" v-model="search" placeholder="Поиск" />
        </div>
    </div>
    <br>
    <form @submit.prevent="submitForm">
        <div class="form-group row">
        <div class="col-10 d-flex">
            <input type="" class="title form-control" v-model="event.title" placeholder="Название">
            <input type="" class="content form-control" v-model="event.content" placeholder="Содержание">
            <input type="" class="event_date form-control" v-model="event.event_date" placeholder="Дата">
            <input type="" class="email form-control" v-model="event.email" placeholder="Email">
        </div>
        <div class="d-flex flex-column">
            <button class="btn btn-success mt-auto">Создать</button>
        </div>
    </div>
    </form>
    <div class='wrapper'>
            <div class="d-flex justify-content-around shadow p-3 my-3" v-for="event in eventsByFilters" :key="event.id" @dblclick="$data.event = event">
                <div style="width:40%;">
                    <h3>{{ event.title }}</h3>
                    <p class="bg-info text-light rounded">{{ event.email }} </p>
                    <p>{{ event.event_date }} </p>
                </div>
                <div style="width:50%;" class="">
                    <p class="my-5">{{ event.content }} </p>
                </div>
                
                <div class="align-middle ">
                    <button class="btn btn-outline-danger btn-sm  h-10 mx-1 my-5" @click="deleteEvent(event)">x</button>
                </div>
                
            </div>
    </div>
  </div>
</template>

<script>

 Date.prototype.getWeek = function() {
        var onejan = new Date(this.getFullYear(),0,1);
        var today = new Date(this.getFullYear(),this.getMonth(),this.getDate());
        var dayOfYear = ((today - onejan + 86400000)/86400000);
        return Math.ceil(dayOfYear/7)
}

export default {
  name: 'App',
  data(){
      return{
          selected: '',
          search: '',
          event:{},
          events: []
      }
  },
  async created(){
     await this.getEvents();

          
  },
  methods: {
      isMonthEqualNow(object){
          var event_date = new Date(object.event_date)
          var date_now = new Date()
          return event_date.getMonth() === date_now.getMonth()
      },
      isWeekEqualNow(object){
          var event_date = new Date(object.event_date)
          var date_now = new Date()
          return event_date.getWeek() === date_now.getWeek()
      },
      isDayEqualNow(object){
          var event_date = new Date(object.event_date)
          var date_now = new Date()
          return event_date.getDate() === date_now.getDate()
      },
      submitForm(){
          if (this.event.id === undefined){
              this.createEvent();
          } else{
              this.editEvent();
          }
      },

      async getEvents(){
        var response = await fetch('http://127.0.0.1:8000/rest/');
        this.events = await response.json()
      },

      async createEvent(){
        await this.getEvents();
        await fetch('http://127.0.0.1:8000/rest/',{
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({event: this.event})
        });
        await this.getEvents();
      },

      async editEvent(){
        await this.getEvents();
        await fetch(`http://127.0.0.1:8000/rest/${this.event.id}/`,{
            method: 'put',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({event: this.event})
        });
        await this.getEvents();
        this.event = {};
      },

      async deleteEvent(event){
        await this.getEvents();
        await fetch(`http://127.0.0.1:8000/rest/${event.id}/`,{
            method: 'delete',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({event: this.event})
        });
        await this.getEvents();
      }
          
  },
   computed:{
        eventsByFilters() {
            if(this.search === '' && this.selected){
                switch(this.selected){
                    case 'month':
                        return  this.events.filter(item => this.isMonthEqualNow(item))
                    case 'week':
                        return  this.events.filter(item => this.isMonthEqualNow(item) && this.isWeekEqualNow(item))
                    case 'day':
                        return  this.events.filter(item => this.isMonthEqualNow(item) && this.isWeekEqualNow(item)
                                                                    && this.isDayEqualNow(item))
                    default:
                        return this.events
                }
            }else{
                return this.events.filter(item => item.title.indexOf(this.search) !== -1)
            }
    }

        }
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
