'use strict';

import {iconMap, labelMap} from './services-map';
import createPhoneFormatter from './phone';

/** @typedef {import('./services-map').ContactIcon} ContactIcon */

/**
 * @typedef {{}} ContactsDefinition
 * @property {string} [name]
 * @property {string} [email]
 * @property {string} [phone]
 * @property {string[]|Record<ContactIcon, string|null>} [messengers]
 */

/**
 * @typedef {{}} Contact
 * @property {IconDefinition} icon
 * @property {string} url
 * @property {string} label
 * @property {Contact[]} [messengers]
 */

/** @type {Record<ContactIcon, (v: string) => string>} */
const urlFormatter = {
    email: v => `mailto:${v}`,
    tel: v => `tel:${v}`,
    vk: v => v.includes('://') ? v : `https://vk.com/${v}`,
    tg: v => v.includes('://') ? v : (`https://t.me/${v.startsWith('@') ? v.substring(1) : v}`),
    wa: v => `https://wa.me/${v}`,
    fb: v => v,
    in: v => v,
};

const phoneFormatters = new Map();

/**
 * @param {*} phone
 * @return {string|null}
 */
function normalizePhoneNumber(phone) {
    if (typeof phone !== 'string') {
        return null;
    }
    phone = phone.replace(/[^0-9]+/g, '');
    if (phone.length < 10) {
        return null;
    }
    phone = phone.startsWith('8') ? `7${phone.substring(1)}` : phone;
    return `+${phone}`;
}

function getPhoneFormatter(country) {
    if (!phoneFormatters.has(country)) {
        phoneFormatters.set(country, createPhoneFormatter(country));
    }
    return phoneFormatters.get(country);
}

/**
 * @param {string} country
 * @param {ContactsDefinition} contacts
 * @return {Generator<Contact, void, *>}
 */
export default function* contactsList(country, contacts) {
    if (typeof contacts.email === 'string') {
        yield {
            icon: iconMap.email,
            url: urlFormatter.email(contacts.email),
            label: contacts.email,
        };
    }

    let phone;
    const phoneFormatter = getPhoneFormatter(country);
    const messengerContacts = {
        phone: [],
        separate: [],
    };
    if (typeof contacts.phone === 'string') {
        phone = normalizePhoneNumber(contacts.phone);
    }
    if (Array.isArray(contacts.messengers) && typeof phone !== 'undefined') {
        for (let messenger of contacts.messengers) {
            messengerContacts.phone.push({
                icon: iconMap[messenger],
                url: urlFormatter[messenger](phone),
                label: labelMap[messenger],
            });
        }
    } else if (typeof contacts.messengers === 'object') {
        let messenger, contact;
        for ([messenger, contact] of Object.entries(contacts.messengers)) {
            const key = typeof contact === 'string' && contact.trim() !== '' ? 'separate' : 'phone';
            if (key === 'phone') {
                contact = phone;
            }
            messengerContacts[key].push({
                icon: iconMap[messenger],
                url: urlFormatter[messenger](contact),
                label: labelMap[messenger],
            });
        }
    }
    yield {
        icon: iconMap.tel,
        url: urlFormatter.tel(phone),
        label: phoneFormatter(phone),
        messengers: messengerContacts.phone,
    };
    for (let contact of messengerContacts.separate) {
        yield contact;
    }
}
