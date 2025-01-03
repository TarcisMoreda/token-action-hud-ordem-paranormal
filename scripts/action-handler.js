// System Module Imports
import { Utils } from './utils.js'

export let ActionHandler = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    /**
     * Extends Token Action HUD Core's ActionHandler class and builds system-defined actions for the HUD
     */
    ActionHandler = class ActionHandler extends coreModule.api.ActionHandler {
        /**
         * Build system actions
         * Called by Token Action HUD Core
         * @override
         * @param {array} groupIds
         */
        async buildSystemActions(groupIds) {
            // Set actor and token variables
            this.actors = (!this.actor) ? this._getActors() : [this.actor]
            this.actorType = this.actor?.type

            this.displayUnequipped = Utils.getSetting('displayUnequipped')

            // Set items variable
            if (this.actor) {
                let items = this.actor.items
                items = coreModule.api.Utils.sortItemsByName(items)
                this.items = items
            }

            if (this.actorType === 'agent') {
                this.#buildCharacterActions()
            } else if (!this.actor) {
                this.#buildMultipleTokenActions()
            }
        }

        /**
         * Build character actions
         * @private
         */
        #buildCharacterActions() {
            // this.buildSkills()
            this.buildInventory()
            // this.buildAbilities()
            // this.buildRituals()
        }

        async buildSkills() {
            const actions = []
            for (const [_, skill] of Object.entries(this.actor.system.skills)) {
                const tooltip = {
                    content: '' + skill.formula.replace('kh', '') + '',
                    direction: 'LEFT'
                }
                actions.push({
                    name: skill.label,
                    id: skill.label,
                    tooltip,
                    encodedValue: ['skills', skill.label].join(this.delimiter)
                })
            }

            await this.addActions(actions.sort((a, b) => a.name.localeCompare(b.name)), { id: 'skills', type: 'system' })
        }

        async buildInventory() {
            const items = []
            for (const [id, item] of this.items.entries()) {
                const type = item.type
                let tooltip = {
                    content: '' + "test1" + '',
                    direction: 'LEFT'
                }
                switch (type) {
                    case 'armament':
                    case 'protection':
                    case 'generalEquipment':
                        break
                    default:
                        continue
                }

                items.push({
                    name: item.name,
                    id: id,
                    tooltip,
                    encodedValue: ['inventory', id].join(this.delimiter)
                })
            }

            await this.addActions(items.sort((a, b) => a.name.localeCompare(b.name)), { id: 'inventory', type: 'system' })
        }

        async buildAbilities() {
            const abilities = []
            for (const [_, ability] of Object.entries(this.actor.system.skills)) {
                const tooltip = {
                    content: '' + skill.formula.replace('kh', '') + '',
                    direction: 'LEFT'
                }
                abilities.push({
                    name: ability.name,
                    id: this.actor._id + ability.name,
                    tooltip,
                    encodedValue: ['abilities', ability.name].join(this.delimiter)
                })
            }

            await this.addActions(abilities.sort((a, b) => a.name.localeCompare(b.name)), { id: 'abilities', type: 'system' })
        }

        async buildRituals() {
            const actions = []
            for (const [_, skill] of Object.entries(this.actor.system.skills)) {
                const tooltip = {
                    content: '' + skill.formula.replace('kh', '') + '',
                    direction: 'LEFT'
                }
                actions.push({
                    name: skill.label,
                    id: this.actor._id + skill.label,
                    tooltip,
                    encodedValue: ['rituals', skill.label].join(this.delimiter)
                })
            }

            await this.addActions(actions.sort((a, b) => a.name.localeCompare(b.name)), { id: 'rituals', type: 'system' })
        }

        /**
         * Build multiple token actions
         * @private
         * @returns {object}
         */
        #buildMultipleTokenActions() {
        }
    }
})

