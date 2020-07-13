import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    var dayOfYear = ((today - onejan + 86400000) / 86400000);
    return Math.ceil(dayOfYear / 7)
}

export const store = new Vuex.Store({
    actions: {
        async getEvents(context) {
            var response = await fetch('http://127.0.0.1:8000/rest/');
            var data = await response.json()
            context('getEvents', data)
        },
        async createEvent(context) {
            await this.getEvents();
            await fetch('http://127.0.0.1:8000/rest/', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ event: context.state.event })
            });
            await this.getEvents();
            context.commit('createEvent', context.state.event)
        },
        async editEvent(context) {
            await this.getEvents();
            await fetch(`http://127.0.0.1:8000/rest/${context.state.event.id}/`, {
                method: 'put',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ event: context.state.event })
            });
            await this.getEvents();
            context.state.event = {};
        },
        async deleteEvent(context) {
            await this.getEvents();
            await fetch(`http://127.0.0.1:8000/rest/${context.state.event.id}/`, {
                method: 'delete',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ event: context.state.event })
            });
            await this.getEvents();
        },


        submitForm(context) {
            if (context.state.event.id === undefined) {
                this.createEvent();
            } else {
                this.editEvent();
            }
        },


        isMonthEqualNow(object) {
            var event_date = new Date(object.event_date)
            var date_now = new Date()
            return event_date.getMonth() === date_now.getMonth()
        },
        isWeekEqualNow(object) {
            var event_date = new Date(object.event_date)
            var date_now = new Date()
            return event_date.getWeek() === date_now.getWeek()
        },
        isDayEqualNow(object) {
            var event_date = new Date(object.event_date)
            var date_now = new Date()
            return event_date.getDate() === date_now.getDate()
        },
        eventsByFilters(context) {
            var events = context.state.events
            if (context.state.search === '' && context.state.selected) {
                switch (context.state.selected) {
                    case 'month':
                        return events.filter(item => this.isMonthEqualNow(item))
                    case 'week':
                        return events.filter(item => this.isMonthEqualNow(item) && this.isWeekEqualNow(item))
                    case 'day':
                        return events.filter(item => this.isMonthEqualNow(item) && this.isWeekEqualNow(item)
                            && this.isDayEqualNow(item))
                    default:
                        return events
                }
            } else {
                events.filter(item => item.title.indexOf(context.state.search) !== -1)
            }
        }

    },
    mutations: {
        setEvents(state,events){
            state.events = events
        },
        createEvent(state, event){
            state.events.push(event)
        }
    },
    state: {
        events: [],
        event: {},
        selected: '',
        search: ''
    },
    getters: {
        eventsByFilters(state) {
            return state.events
        },
        getSearch(state){
            return state.search
        },
        getSelected(state){
            return state.selected
        },
        getEvent(state) {
            return state.event
        }
    },
});