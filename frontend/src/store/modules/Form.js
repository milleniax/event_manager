export default {
    actions: {
        submitForm() {
            if (state.event.id === undefined) {
                this.createEvent();
            } else {
                this.editEvent();
            }
        }
    },
    mutations: {
        
    },
    state: {
        event: {}
    },
    getters: {},
}