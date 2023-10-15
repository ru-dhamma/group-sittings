<script>
    import {faFacebook, faFacebookMessenger, faInstagram, faSnapchat, faTelegram, faVk, faWhatsapp} from '@fortawesome/free-brands-svg-icons';
    import {faChevronRight, faEnvelope, faPhone} from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa/src/fa.svelte';

    export let type;
    export let url;
    export let messengers = [];
    const preIcon = {
        email: faEnvelope,
        tel: faPhone,
        vk: faVk,
        fb: faFacebook,
        in: faInstagram,
    }[type] ?? '';
    const prefix = {
        email: 'mailto:',
        tel: 'tel:',
        map: 'https://maps.apple.com/?q=',
    }[type] ?? '';
    const messengersIcons = messengers.map(
        (m) => {
            switch (m) {
                case 'tg':
                    return faTelegram;
                case 'fb':
                    return faFacebookMessenger;
                case 'wa':
                    return faWhatsapp;
                case 'in':
                    return faInstagram;
                case 'sc':
                    return faSnapchat;
                default:
                    return '';
            }
        });
</script>
{#if preIcon}
    <Fa icon={preIcon} class="inline text-gray-400 mr-1"/>
{/if}
<a href="{prefix}{url}">
    <slot>
        {url}
    </slot>
</a>
{#if type === 'tel'}
    {#if messengersIcons}
<span class="ml-1">
  {#each messengersIcons as messengerIcon}
    <Fa icon={messengerIcon} class="inline text-gray-400 mr-1"/>
  {/each}
</span>
    {/if}
{:else if type === 'map'}
    <Fa icon={faChevronRight} class="inline ml-1 text-gray-400"/>
{/if}

