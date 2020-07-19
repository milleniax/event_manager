<template>
    <div class='wrapper'>
            <div class="d-flex justify-content-around shadow p-3 my-3" v-for="event in eventsByFilters" :key="event.id" @dblclick="setEvent(event)">
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
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
    computed: mapGetters(['eventsByFilters']),
    methods: mapActions(['deleteEvent'])
}
</script>