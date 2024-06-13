const USERS_KEY = "users"
const LOGGED_IN_USER = "loggedInUser"
const BOOKINGS_KEY = "bookings"

const storageService = {
    getUsers(){
        const users = localStorage.getItem(USERS_KEY)
        return users ? JSON.parse(users) : [] 
    },
    saveUser(user){
        localStorage.setItem(USERS_KEY, JSON.stringify(user));
    },
    getLoggedInUser(){
        const loggedInUser = localStorage.getItem(LOGGED_IN_USER)
        return loggedInUser ? JSON.parse(loggedInUser) : null
      },
      saveLoggedInUser(user){
        localStorage.setItem(LOGGED_IN_USER,JSON.stringify(user))
      },
    getBookings(){
        const bookings = localStorage.getItem(BOOKINGS_KEY)
        return  bookings ? JSON.parse(bookings) : []
    },
    saveBooking(newBooking){
        const bookingsList = this.getBookings()
        bookingsList.push(newBooking)
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookingsList))
    },
    clearAll(){
        localStorage.removeItem(LOGGED_IN_USER)
    }
}
export default storageService;