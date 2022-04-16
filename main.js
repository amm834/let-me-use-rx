import {filter, map, Observable, pluck} from "rxjs";

const users = {
    data: [
        {
            status: 'online',
            age: 14
        }, {
            status: 'offline',
            age: 23
        }, {
            status: 'online',
            age: 12
        }, {
            status: 'online',
            age: 29
        }, {
            status: 'offline',
            age: 72
        }, {
            status: 'offline',
            age: 81
        },
    ]
}
const observable = new Observable(subscriber => {
    subscriber.next(users)
    subscriber.complete('soen')
}).pipe(
    map(value => {
        return value.data
    }),
    map(value => {
        return value.filter(user => user.status === 'online')
    }),
    map(value => {
        return value.reduce((sum, user) => sum + user.age, 0) / value.length
    }),
    map(value => {
        if (value < 18) {
            throw new Error("User should has less than 20 yro.")
        }
        return value;
    }),
)

const observer = {
    next(value) {
        console.log(`Subscriber got ${value}`)
    },
    error(error) {
        console.log(error)
    },
    complete() {
        console.log('Done')
    }
}


observable.subscribe(observer)