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
                    { ...groups.attributes, nestId: 'skills_attributes' },
                    { ...groups.skills, nestId: 'skills_skills' },
                ],
            },
            {
                nestId: 'inventory',
                id: 'inventory',
                name: coreModule.api.Utils.i18n('op.tab.inventory'),
                groups: [
                    { ...groups.armament, nestId: 'inventory_armament' },
                    { ...groups.protection, nestId: 'inventory_protection' },
                    { ...groups.generalEquipment, nestId: 'inventory_generalEquipment' },
                ],
            },
            {
                nestId: 'abilities',
                id: 'abilities',
                name: coreModule.api.Utils.i18n('op.tab.abilities'),
                groups: [
                    { ...groups.abilities, nestId: 'abilities_abilities' },
                    // { ...groups.class, nestId: 'abilities_class' },
                    // { ...groups.paranormal, nestId: 'abilities_paranormal' },
                    // { ...groups.path, nestId: 'abilities_path' },
                    // { ...groups.ability, nestId: 'abilities_ability' },
                ],
            },
            {
                nestId: 'rituals',
                id: 'rituals',
                name: coreModule.api.Utils.i18n('op.tab.rituals'),
                groups: [
                    { ...groups.rituals, nestId: 'rituals_rituals' },
                    // { ...groups.rituals, nestId: 'rituals_level1' },
                    // { ...groups.rituals, nestId: 'rituals_level2' },
                    // { ...groups.rituals, nestId: 'rituals_level3' },
                    // { ...groups.rituals, nestId: 'rituals_level4' },
                ],
            }
        ],
        groups: groupsArray
    }
})
