import StylesUser from './data.js'
import { MODULE_ID, TEMPLATES } from './styles.js'

/*
 * Let the user configure custom styles in the FoundryVTT UI via form
 */
class UserStyleForm extends FormApplication {
    constructor(object, options) {
        super(object, options)
        if (options?.user) {
            this.user = new StylesUser(options.user)
        }
    }

    static get defaultOptions() {
        const defaults = super.defaultOptions

        const overrides = {
            id: MODULE_ID,
            height: 'auto',
            template: TEMPLATES.FORM,
            title: game.i18n.localize('FORM.title'),
            closeOnSubmit: false,
            submitOnChange: true,
            minimizable: false,
            user: game.user
        }

        const mergedObject = foundry.utils.mergeObject(defaults, overrides)
        return mergedObject
    }

    activateListeners(html) {
        super.activateListeners(html)
        html.on('click', '[data-action]', this._handleButtonClick.bind(this))
        html.on('keydown', 'textarea#custom-styles-content', this._handleTextAreaKeyDown.bind(this))
    }

    async _handleTextAreaKeyDown(event) {
        const keyCode = event.keyCode || event.which
        if (keyCode == 9) {
            event.preventDefault()
            const textarea = event.currentTarget
            const start = textarea.selectionStart
            const end = textarea.selectionEnd
            // set textarea value to: text before caret + tab + text after caret
            textarea.value = textarea.value.substring(0, start) + ' '.repeat(4) + textarea.value.substring(end)
            // put caret at right position again
            textarea.selectionStart = textarea.selectionEnd = start + 1
        }
    }

    async _handleButtonClick(event) {
        const clickedElement = $(event.currentTarget)
        const action = clickedElement.data().action
        switch (action) {
        case 'save': {
            const styles = clickedElement.parents('form.custom-styles-form').find('textarea#custom-styles-content').val()
            // Inject the custom styles
            await this.user.styles.injectStyles(styles)
            this.render()
            break
        }
        case 'clear': {
            await this.user.styles.clear()
            await this.user.styles.removeStyles()
            this.render()
            break
        }
        default:
            console.error('Invalid action detected')
        }
    }

    getData() {
        return this.user.styles.get()
    }

    // This is useful if I add input elements in the future
    async _updateObject(event, { styles }) {
        return this.user.styles.set(styles?.trim())
    }
}

export default UserStyleForm