<template>
    <form @submit.prevent="submitForm">
        <div class="form-group row">
            <div class="col-10 d-flex">
                <input type="" class="title form-control" v-model="event.title" placeholder="Название">
                <input type="" class="content form-control" v-model="event.content" placeholder="Содержание">
                <input type="" class="event_date form-control" v-model="event.event_date" placeholder="Дата">
                <input type="" class="email form-control" v-model="event.email" placeholder="Email">
            </div>
            <div class="d-flex flex-column">
                <button class="btn btn-success mt-auto" >Создать</button>
            </div>
        </div>
    </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
    computed: mapGetters(['getEvent']),
    methods: mapActions(['submitForm'])
}
</script>