export namespace Data {
    type LinkIcon = 'email' | 'tel' | 'vk' | 'fb' | 'in';
    type MessengerIcon = 'tg' | 'fb' | 'wa' | 'in' | 'sc';

    interface Link {
        text?: string;
        url?: string;
        icon?: LinkIcon;
    }

    interface Address {
        text?: string;
        map: number[];
    }

    interface Contact {
        name: string;
        email?: string;
        phone?: string;
        organizer?: boolean;
        links?: Link[];
        messengers?: MessengerIcon[];
    }

    interface City {
        name: string;
        slug: string;
        text?: string;
        mark?: boolean;
        addresses?: Address[];
        contacts?: Contact[];
    }

    interface Country {
        name: string;
        description?: string;
        cities?: City[];
    }

    export type Countries = Country[];
}
