export let RollHandler = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    /**
     * Extends Token Action HUD Core's RollHandler class and handles action events triggered when an action is clicked
     */
    RollHandler = class RollHandler extends coreModule.api.RollHandler {
        /**
         * Handle action click
         * Called by Token Action HUD Core when an action is left or right-clicked
         * @override
         * @param {object} event        The event
         * @param {string} encodedValue The encoded value
         */
        async handleActionClick (event, encodedValue) {
            const [actionTypeId, actionId] = encodedValue.split('|')

            const knownCharacters = ['agent']

            // If single actor is selected
            if (this.actor) {
                await this.#handleAction(this.actor, actionTypeId, actionId)
                return
            }

            const controlledTokens = canvas.tokens.controlled
                .filter((token) => knownCharacters.includes(token.actor?.type))

            // If multiple actors are selected
            for (const token of controlledTokens) {
                const actor = token.actor
                await this.#handleAction(actor, actionTypeId, actionId)
            }
        }

        /**
         * Handle action hover
         * Called by Token Action HUD Core when an action is hovered on or off
         * @override
         * @param {object} event        The event
         * @param {string} encodedValue The encoded value
         */
        async handleActionHover (event, encodedValue) { }

        /**
         * Handle group click
         * Called by Token Action HUD Core when a group is right-clicked while the HUD is locked
         * @override
         * @param {object} event The event
         * @param {object} group The group
         */
        async handleGroupClick (event, group) { }

        /**
         * Handle action
         * @private
         * @param {object} event        The event
         * @param {object} actor        The actor
         * @param {string} actionTypeId The action type id
         * @param {string} actionId     The actionId
         */
        async #handleAction (actor, actionTypeId, actionId) {
            switch (actionTypeId) {
            case 'attributes':
                await this.#handleAttributessAction(actor, actionId)
                break
            case 'skills':
                await this.#handleSkillsAction(actor, actionId)
                break
            default:
                await this.#handleItemsAction(actor, actionId)
                break
            }
        }

        /**
         * Handle Attribute action
         * @private
         * @param {object} actor    The actor
         * @param {string} actionId The action id
         */
        async #handleAttributessAction (actor, actionId) {
            const attribute = actor.system.attributes[actionId]
            const attributeName = coreModule.api.Utils.i18n(`op.att${actionId.replace(/^./, actionId[0].toUpperCase())}`)
            const formula = `${attribute.value == 0 ? 2 : attribute.value}d20${attribute.value == 0 ? 'kl' : 'kh'}`
            await new Roll(formula).toMessage({ flavor: `Rolando ${attributeName}` })
        }

        /**
         * Handle Skill action
         * @private
         * @param {object} actor    The actor
         * @param {string} actionId The action id
         */
        async #handleSkillsAction (actor, actionId) {
            const rollData = actor.getRollData().skills[actionId]
            await new Roll(rollData.formula).toMessage({ flavor: `Rolando ${rollData.label}` })
        }

        /**
         * Handle Item action
         * @private
         * @param {object} actor    The actor
         * @param {string} actionId The action id
         */
        async #handleItemsAction (actor, actionId) {
            const item = actor.items.get(actionId)
            item.roll()
        }
    }
})
