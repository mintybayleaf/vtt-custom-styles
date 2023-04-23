import { MODULE_ID, TEMPLATES } from './globals.js'

/*
 * Let the user configure custom styles in the FoundryVTT UI via  form
 */
class UserStyleForm extends FormApplication {
    static get defaultOptions() {
        const defaults = super.defaultOptions

        const overrides = {
            id: MODULE_ID,
            template: TEMPLATES.FORM,
            title: 'Custom User Styles',
            closeOnSubmit: false,
        }

        return foundry.utils.mergeObject(defaults, overrides)
    }
}

export default UserStyleForm