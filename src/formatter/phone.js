'use strict';

const formats = {
    RU: '+7 NNN NNN-NN-NN',
    BY: '+375 NN NNN-NN-NN',
    UA: '+380 NN NNN NNNN',
    KZ: '+7 NNN NNN-NN-NN',
}

/**
 * @param {string|null} format
 * @return {(phone: string) => string}
 */
const createFormatter = format => phone => {
    phone = phone.replace(/[^0-9]+/g, '');
    if (typeof format !== 'string') {
        phone = phone.startsWith('8') ? `7${phone.substring(1)}` : phone;
        return `+${phone}`;
    }
    const digits = phone.split('').map(v => parseInt(v)).filter(v => v >= 0 && v <= 9);
    const formatted = format.split('');
    let index = formatted.length - 1;
    do {
        if (formatted[index] === 'N') {
            const digit = digits.pop();
            if (typeof digit !== 'number') {
                return `+${phone}`;
            }
            formatted[index] = digit;
        }
        index--;
    } while (index >= 0);
    return formatted.join('');
}

/**
 * @param {string} [country]
 * @return {(phone: string) => string}
 */
export default function createPhoneFormatter(country) {
    return createFormatter(formats[country] ?? null);
}
