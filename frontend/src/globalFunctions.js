
Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    var dayOfYear = ((today - onejan + 86400000) / 86400000);
    return Math.ceil(dayOfYear / 7)
}

export function isMonthEqualNow(object) {
    var event_date = new Date(object.event_date)
    var date_now = new Date()
    return event_date.getMonth() === date_now.getMonth()
}

export function isWeekEqualNow(object) {
    var event_date = new Date(object.event_date)
    var date_now = new Date()
    return event_date.getWeek() === date_now.getWeek()
}

export function isDayEqualNow(object) {
    var event_date = new Date(object.event_date)
    var date_now = new Date()
    return event_date.getDate() === date_now.getDate()
} 