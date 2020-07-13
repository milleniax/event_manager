export default {
    actions: {
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
            if (this.search === '' && this.selected) {
                switch (this.selected) {
                    case 'month':
                        return this.events.filter(item => this.isMonthEqualNow(item))
                    case 'week':
                        return this.events.filter(item => this.isMonthEqualNow(item) && this.isWeekEqualNow(item))
                    case 'day':
                        return this.events.filter(item => this.isMonthEqualNow(item) && this.isWeekEqualNow(item)
                            && this.isDayEqualNow(item))
                    default:
                        return this.events
                }
            } else {
                 this.events.filter(item => item.title.indexOf(this.search) !== -1)
            }
        }
    },
    mutations: {

    },
    state: {
        events: [],
        selected: '',
        search: ''
    },
    getters: {
        eventsByFilters(){
            return state.events
        }
    },
}