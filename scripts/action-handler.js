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
            this.buildAttributes()
            this.buildSkills()
            this.buildInventory()
            this.buildAbilities()
            this.buildRituals()
        }

        async buildAttributes() {
            const attributes = []
            for (const [id, attribute] of Object.entries(this.actor.system.attributes)) {
                const attribute_name = coreModule.api.Utils.i18n(`op.att${id.replace(/^./, id[0].toUpperCase())}`)
                const roll = `${attribute.value==0?2:attribute.value}d20${attribute.value==0?' (Desvantagem)':''}`

                const tooltip = {
                    content: '' + roll + '',
                    direction: 'LEFT'
                }
                attributes.push({
                    name: attribute_name,
                    id: id,
                    tooltip,
                    encodedValue: ['attributes', id].join(this.delimiter)
                })
            }

            await this.addActions(attributes, { id: 'attributes', type: 'system' })
        }

        async buildSkills() {
            const skills = []
            for (const [id, skill] of Object.entries(this.actor.system.skills)) {
                let content = skill.formula.replace('kh', '')
                if (content.includes('kl')) {
                    content = content.replace('kl', '')
                    content += ' (Desvantagem)'
                }

                const tooltip = {
                    content: '' + content + '',
                    direction: 'LEFT'
                }
                skills.push({
                    name: skill.label,
                    id: id,
                    tooltip,
                    encodedValue: ['skills', id].join(this.delimiter)
                })
            }

            await this.addActions(skills, { id: 'skills', type: 'system' })
        }

        async buildInventory() {
            const buildArmament = async () => {
                const items = []
                for (const [id, item] of this.items.entries()) {
                    const type = item.type
                    if (type != 'armament')
                        continue

                    const info = item.system
                    const skill = `op.skill.${info.formulas.attack.skill}`
                    const tooltip = {
                        content: '' + `${coreModule.api.Utils.i18n(skill)} | ${info.formulas.damage.formula} | ${info.critical} | ${info.range}` + '',
                        direction: 'LEFT'
                    }

                    items.push({
                        name: item.name,
                        id: id,
                        img: item.img,
                        tooltip,
                        encodedValue: ['inventory', id].join(this.delimiter)
                    })
                }

                await this.addActions(items.sort((a, b) => a.name.localeCompare(b.name)), { id: 'armament', type: 'system' })
            }
            const buildProtection = async () => {
                const items = []
                for (const [id, item] of this.items.entries()) {
                    const type = item.type
                    if (type != 'protection')
                        continue

                    items.push({
                        name: item.name,
                        id: id,
                        img: item.img,
                        encodedValue: ['inventory', id].join(this.delimiter)
                    })
                }

                await this.addActions(items.sort((a, b) => a.name.localeCompare(b.name)), { id: 'protection', type: 'system' })
            }
            const buildGeneralEquipment = async () => {
                const items = []
                for (const [id, item] of this.items.entries()) {
                    const type = item.type
                    if (type != 'generalEquipment')
                        continue

                    items.push({
                        name: item.name,
                        id: id,
                        img: item.img,
                        encodedValue: ['inventory', id].join(this.delimiter)
                    })
                }

                await this.addActions(items.sort((a, b) => a.name.localeCompare(b.name)), { id: 'generalEquipment', type: 'system' })
            }

            await buildArmament()
            await buildProtection()
            await buildGeneralEquipment()
        }

        async buildAbilities() {
            const abilities = []
            for (const [id, ability] of this.items.entries()) {
                const type = ability.type
                if (type != 'ability')
                    continue

                const tooltip = {
                    content: '' + ability.system.description + '',
                    direction: 'LEFT'
                }
                abilities.push({
                    name: ability.name,
                    id: id,
                    tooltip,
                    img: ability.img,
                    encodedValue: ['abilities', id].join(this.delimiter)
                })
            }

            await this.addActions(abilities.sort((a, b) => a.name.localeCompare(b.name)), { id: 'abilities', type: 'system' })
        }

        async buildRituals() {
            const rituals = []
            for (const [id, ritual] of this.items.entries()) {
                const type = ritual.type
                if (type != 'ritual')
                    continue

                const tooltip = {
                    content: '' + ritual.system.description + '',
                    direction: 'LEFT'
                }
                rituals.push({
                    name: ritual.name,
                    id: id,
                    tooltip,
                    img: ritual.img,
                    encodedValue: ['rituals', id].join(this.delimiter)
                })
            }

            await this.addActions(rituals.sort((a, b) => a.name.localeCompare(b.name)), { id: 'rituals', type: 'system' })
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

