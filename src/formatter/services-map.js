'use strict';

import {faFacebook, faInstagram, faTelegram, faVk, faWhatsapp} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope, faPhone} from '@fortawesome/free-solid-svg-icons';

/** @typedef {import('@fortawesome/fontawesome-common-types').IconDefinition} IconDefinition */
/** @typedef {"email"|"tel"|"vk"|"tg"|"wa"|"fb"|"in"} ContactIcon */

/** @type {Record<ContactIcon, IconDefinition>} */
const iconMap = {
    email: faEnvelope,
    tel: faPhone,
    vk: faVk,
    tg: faTelegram,
    wa: faWhatsapp,
    fb: faFacebook,
    in: faInstagram,
};

/** @type {Record<ContactIcon, string>} */
const labelMap = {
    email: 'E-mail',
    tel: 'Телефон',
    vk: 'VK',
    tg: 'Telegram',
    wa: 'WhatsApp',
    fb: 'Facebook',
    in: 'Instagram',
};

export {iconMap, labelMap};
