import UserStyleForm from './form.js'

const module = {
    form: null,
    initialize: function() {
        if (!this.form) {
            this.form = new UserStyleForm(undefined, { user: game.user })
        }
    }
}

/*
 * Insert a button on each player list item so they can customize their styles
 */

function createUserButton () {
    const tooltip = game.i18n.localize('USER_BUTTON.title')
    return `
        <button class="custom-styles-user-button" title=${tooltip}>
            <i class="fa-brands fa-css3-alt"></i>
        </button>
    `
}

Hooks.once('ready', () => {
    console.log('Hooking up Custom Styles Module!')
    module.initialize(game.user)
    // Inject custom css at startup
    const data = module.form.user.styles.get()
    module.form.user.styles.injectStyles(data?.styles)
})

Hooks.on('renderPlayerList', (playerList, html) => {
    const userItem = html.find(`[data-user-id="${game.user.id}"]`)
    userItem.append(createUserButton())

    html.on('click', '.custom-styles-user-button', (event) => {
        module.form.render(true)
    })
})
