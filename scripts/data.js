import { MODULE_ID } from './globals.js'

/*
 * The interface between the foundry data and our api
 */

// Styles Abstraction

function Styles () {
    this.moduleKey = MODULE_ID
    this.storeKey = 'styles'
}

function get(user) {
    return user?.getFlag(this.moduleKey, this.storeKey)?.[user.id]
}

Styles.prototype.get = get

function set(user, styles) {
    const updatedStyles = {
        [user.id]: { styles }
    }
    return user?.setFlag(this.moduleKey, this.storeKey, updatedStyles)
}

Styles.prototype.set = set

function remove (user) {
    const deletedStyles = {
        [`-=${user.id}`]: null
    }
    return user?.setFlag(this.moduleKey, this.storeKey, deletedStyles)
}

Styles.prototype.remove = remove

// Styles User

function User(user) {
    this.user = user || game.user // Grab current game user (this is context dependent)

    if (!this.user) {
        throw new Error('Cannot create a "User" without a current "game.user" object')
    }
    this.styles = new Styles()

    // Bind styles with current user
    this.styles.get = this.styles.get.bind(this.styles, this.user)
    this.styles.set = this.styles.set.bind(this.styles, this.user)
    this.styles.remove = this.styles.remove.bind(this.styles, this.user)
}

export default User
