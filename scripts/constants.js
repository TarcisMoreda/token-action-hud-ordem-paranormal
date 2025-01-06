/**
 * Module-based constants
 */
export const MODULE = {
    ID: 'token-action-hud-ordem-paranormal'
}

/**
 * Core module
 */
export const CORE_MODULE = {
    ID: 'token-action-hud-core'
}

/**
 * Core module version required by the system module
 */
export const REQUIRED_CORE_MODULE_VERSION = '2.0'

/**
 * Action types
 */
export const ACTION_TYPE = {
    skills: 'op.tab.skills',
    inventory: 'op.tab.inventory',
    abilities: 'op.tab.abilities',
    rituals: 'op.tab.rituals'
}

/**
 * Groups
 */
export const GROUP = {
    skills: { id: 'skills', name: 'op.tab.skills', type: 'system' },
    attributes: { id: 'attributes', name: 'op.attributesItem', type: 'system' },
    inventory: { id: 'inventory', name: 'op.tab.inventory', type: 'system' },
    armament: { id: 'armament', name: 'TYPES.Item.armament', type: 'system' },
    protection: { id: 'protection', name: 'TYPES.Item.protection', type: 'system' },
    generalEquipment: { id: 'generalEquipment', name: 'TYPES.Item.generalEquipment', type: 'system' },
    abilities: { id: 'abilities', name: 'op.tab.abilities', type: 'system' },
    // Não tem jeito de diferenciar os tipos de poderes (pelo menos não que eu tenha encontrado)
    // class: { id: 'class', name: 'op.powerTypeChoices.class', type: 'system' },
    // paranormal: { id: 'paranormal', name: 'op.powerTypeChoices.paranormal', type: 'system' },
    // path: { id: 'path', name: 'op.powerTypeChoices.path', type: 'system' },
    // ability: { id: 'ability', name: 'op.powerTypeChoices.ability', type: 'system' },
    rituals: { id: 'rituals', name: 'op.tab.rituals', type: 'system' },
    circle1: { id: 'circle1', name: 'tokenActionHud.op.circle.first', type: 'system' },
    circle2: { id: 'circle2', name: 'tokenActionHud.op.circle.second', type: 'system' },
    circle3: { id: 'circle3', name: 'tokenActionHud.op.circle.third', type: 'system' },
    circle4: { id: 'circle4', name: 'tokenActionHud.op.circle.fourth', type: 'system' },
}

