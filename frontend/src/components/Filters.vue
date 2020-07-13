<template>
    <div class="d-flex justify-content-between">
        <select v-model="getSelected"> 
            <option value="">Все</option>
            <option value="month">За этот месяц</option>
            <option value="week">За эту неделю</option>
            <option value="day">За этот день</option>
        </select>
        <div>
            <input type="text" v-model="getSearch" placeholder="Поиск" />
        </div>
    </div>
</template>

<script>


import { mapGetters } from "vuex"

export default {
    computed: mapGetters(['getSearch', 'getSelected']),
}
</script>