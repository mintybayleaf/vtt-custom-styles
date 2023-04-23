import { MODULE_ID } from './styles.js'

/*
 * The interface between the foundry data and our api
 */

// Styles Abstraction

function Styles () {
    this.moduleKey = MODULE_ID
    this.storeKey = 'styles'
    this.injectId = 'custom-styles--injected-css'
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

function clear (user) {
    const deletedStyles = {
        [`-=${user.id}`]: { styles: null }
    }
    return user?.setFlag(this.moduleKey, this.storeKey, deletedStyles)
}

Styles.prototype.clear = clear

function inject (styles, {selector = 'head', remove = false}) {
    if (!remove) {
        $(selector).append(`
            <style id="${this.injectId}">
                ${styles}
            '</style>
        `)
    } else {
        $(this.injectId).remove()
    }

}

Styles.prototype.inject = inject

// Styles User

function StylesUser(user) {
    this.user = user || game.user // Grab current game user (this is context dependent)

    if (!this.user) {
        throw new Error('Cannot create a "User" without a current "game.user" object')
    }
    this.styles = new Styles()

    // Bind styles with current user
    this.styles.get = this.styles.get.bind(this.styles, this.user)
    this.styles.set = this.styles.set.bind(this.styles, this.user)
    this.styles.clear = this.styles.clear.bind(this.styles, this.user)
}


export default StylesUser
