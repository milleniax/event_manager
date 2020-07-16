<template>
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
</template>

<script>


import { mapActions } from "vuex"

export default {
    data(){
        return{
            search: '',
            selected: ''
        }
    },
    methods: mapActions(['setSearch', 'setSelected']),
    async updated(){
        await this.setSearch(this.search);
        await this.setSelected(this.selected);
    }
}
</script>