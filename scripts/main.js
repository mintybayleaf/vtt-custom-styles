import User from './data.js'
import UserStyleForm from './form.js'

/*
 * Insert a button on each player list item so they can customize their styles
 */

function createUserButton () {
    const tooltip = game.i18n.localize('USER_BUTTON.title')
    return `
        <button class='custom-styles-user-button' title=${tooltip}>
            <i class="fa-brands fa-css3-alt"></i>
        </button>
    `
}

Hooks.once('init', () => {
    console.log('Hooking up Custom Styles Module!')
})

Hooks.on('renderPlayerList', (playerList, html) => {
    const userItem = html.find(`[data-user-id="${game.user.id}"]`)
    userItem.append(createUserButton())

    html.on('click', '.custom-styles-user-button', (event) => {
        const user = new User()
        new UserStyleForm().render(true,  { user })
    })
})
