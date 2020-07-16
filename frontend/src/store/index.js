import Vue from 'vue';
import Vuex from 'vuex';
import { isMonthEqualNow, isWeekEqualNow, isDayEqualNow } from '@/globalFunctions.js'


Vue.use(Vuex);


export default new Vuex.Store({
    actions: {
        setSearch(context, search) {
            context.commit('setSearch', search)
        },
        setSelected(context, selected) {
            context.commit('setSelected', selected)
        },
        async setEvents(context) {
            var response = await fetch('http://127.0.0.1:8000/rest/');
            var data = await response.json()
            context.commit('setEvents', data)
        },
        async createEvent(context) {
            await context.dispatch('setEvents');
            await fetch('http://127.0.0.1:8000/rest/', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ event: context.state.event })
            });
            await context.dispatch('setEvents');
            context.commit('createEvent', context.state.event)
        },
        async editEvent(context) {
            await context.dispatch('setEvents');
            await fetch(`http://127.0.0.1:8000/rest/${context.state.event.id}/`, {
                method: 'put',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ event: context.state.event })
            });
            await context.dispatch('setEvents');
            context.state.event = {};
        },
        async deleteEvent(context,event) {
            await context.dispatch('setEvents');
            await fetch(`http://127.0.0.1:8000/rest/${event.id}/`, {
                method: 'delete',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ event: this.event })
            });
            await context.dispatch('setEvents');
        },


        submitForm(context) {
            if (context.state.event.id === undefined) {
                context.dispatch('createEvent')
            } else {
                context.dispatch('editEvent', context.state.event)
            }
        },
    },
    mutations: {
        setEvents(state,events){
            state.events = events
        },
        createEvent(state, event){
            state.events.push(event)
        },
        setEvent(state, event){
            state.event = event
        },
        setSearch(state, search) {
            state.search = search
        },
        setSelected(state,selected) {
            state.selected = selected
        },
    },
    state: {
        events: [],
        event: {},
        selected: '',
        search: ''
    },
    getters: {
        eventsByFilters(state) {
            var events = state.events
            if (state.search === '' && state.selected) {
                switch (state.selected) {
                    case 'month':
                        return events.filter(item => isMonthEqualNow(item))
                    case 'week':
                        return events.filter(item => isMonthEqualNow(item) && isWeekEqualNow(item))
                    case 'day':
                        return events.filter(item => isMonthEqualNow(item) && isWeekEqualNow(item)
                            && isDayEqualNow(item))
                    default:
                        return events
                }
            } else {
                return events.filter(item => item.title.indexOf(state.search) !== -1)
            }
        },
        getEvent(state) {
            return state.event
        },
    },
});