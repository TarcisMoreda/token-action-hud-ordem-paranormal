import { GROUP } from './constants.js'

/**
 * Default layout and groups
 */
export let DEFAULTS = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    const groups = GROUP
    Object.values(groups).forEach(group => {
        group.name = coreModule.api.Utils.i18n(group.name)
        group.listName = `Group: ${coreModule.api.Utils.i18n(group.listName ?? group.name)}`
    })
    const groupsArray = Object.values(groups)
    DEFAULTS = {
        layout: [
            {
                nestId: 'skills',
                id: 'skills',
                name: coreModule.api.Utils.i18n('op.tab.skills'),
                groups: [
                    { ...groups.characteristics, nestId: 'skills_skills' }
                ],
            },
            {
                nestId: 'inventory',
                id: 'inventory',
                name: coreModule.api.Utils.i18n('op.tab.inventory'),
                groups: [
                    { ...groups.characteristics, nestId: 'inventory_inventory' }
                ],
            },
            {
                nestId: 'abilities',
                id: 'abilities',
                name: coreModule.api.Utils.i18n('op.tab.abilities'),
                groups: [
                    { ...groups.characteristics, nestId: 'abilities_abilities' }
                ],
            },
            {
                nestId: 'rituals',
                id: 'rituals',
                name: coreModule.api.Utils.i18n('op.tab.rituals'),
                groups: [
                    { ...groups.characteristics, nestId: 'rituals_rituals' }
                ],
            }
        ],
        groups: groupsArray
    }
})
