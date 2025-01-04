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
        async handleActionClick(event, encodedValue) {
            const [actionTypeId, actionId] = encodedValue.split('|')

            const knownCharacters = ['agent']

            // If single actor is selected
            if (this.actor) {
                await this.#handleAction(event, this.actor, this.token, actionTypeId, actionId)
                return
            }

            const controlledTokens = canvas.tokens.controlled
                .filter((token) => knownCharacters.includes(token.actor?.type))

            // If multiple actors are selected
            for (const token of controlledTokens) {
                const actor = token.actor
                await this.#handleAction(event, actor, token, actionTypeId, actionId)
            }
        }

        /**
         * Handle action hover
         * Called by Token Action HUD Core when an action is hovered on or off
         * @override
         * @param {object} event        The event
         * @param {string} encodedValue The encoded value
         */
        async handleActionHover(event, encodedValue) { }

        /**
         * Handle group click
         * Called by Token Action HUD Core when a group is right-clicked while the HUD is locked
         * @override
         * @param {object} event The event
         * @param {object} group The group
         */
        async handleGroupClick(event, group) { }

        /**
         * Handle action
         * @private
         * @param {object} event        The event
         * @param {object} actor        The actor
         * @param {object} token        The token
         * @param {string} actionTypeId The action type id
         * @param {string} actionId     The actionId
         */
        async #handleAction(event, actor, token, actionTypeId, actionId) {
            switch (actionTypeId) {
                case 'skills':
                    await this.#handleSkillsAction(actor, actionId)
                    break
                case 'inventory':
                case 'abilities':
                case 'rituals':
                    await this.#handleItemsAction(actor, actionId)
                    break
            }
        }

        /**
         * Handle Skill action
         * @private
         * @param {object} actor    The actor
         * @param {string} actionId The action id
         */
        async #handleSkillsAction(actor, actionId) {
            const roll_data = actor.getRollData()["skills"][actionId]
            await new Roll(roll_data["formula"]).toMessage({ "flavor": `Rolando ${roll_data["label"]}` })
        }

        /**
         * Handle Item action
         * @private
         * @param {object} actor    The actor
         * @param {string} actionId The action id
         */
        async #handleItemsAction(actor, actionId) {
            const item = actor.items.get(actionId)
            item.roll()
        }
    }
})
