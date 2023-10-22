<script>
    import {faFacebook, faFacebookMessenger, faInstagram, faSnapchat, faTelegram, faVk, faWhatsapp} from '@fortawesome/free-brands-svg-icons';
    import {faChevronRight, faEnvelope, faPhone} from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa/src/fa.svelte';

    export let type = null;
    export let url = null;
    export let messengers = [];

    const prefixIcon = {
        email: faEnvelope,
        tel: faPhone,
        vk: faVk,
        fb: faFacebook,
        in: faInstagram,
    }[type] ?? '';

    const urlPrefix = {
        email: 'mailto:',
        tel: 'tel:',
    }[type] ?? '';

    const messengerData = {
        tg: {
            icon: faTelegram,
            formatter: contact => `https://t.me/${contact.startsWith('@') ? contact.substring(1) : '+' + contact.replace(/\D+/g, '')}`,
        },
        fb: {
            icon: faFacebookMessenger,
            formatter: null,
        },
        wa: {
            icon: faWhatsapp,
            formatter: phone => `https://wa.me/${phone.replace(/\D+/g, '')}`,
        },
        in: {
            icon: faInstagram,
            formatter: null,
        },
        sc: {
            icon: faSnapchat,
            formatter: null,
        },
    };

    if (Array.isArray(messengers)) {
        messengers = messengers.map(v => ({
            icon: messengerData[v]?.icon ?? null,
            url: (messengerData[v]?.formatter ? messengerData[v]?.formatter(url) : null),
        }));
    } else if (typeof messengers === 'object' && messengers !== null) {
        messengers = Object.entries(messengers).map(([k, v]) => ({
            icon: messengerData[k]?.icon ?? null,
            url: (messengerData[k]?.formatter ? messengerData[k]?.formatter(v ?? url) : v ?? url),
        }));
    } else {
        messengers = [];
    }
</script>
{#if prefixIcon}
    <Fa icon={prefixIcon} class="inline text-gray-400 mr-1"/>
{/if}
<a href="{urlPrefix}{url}">
    <slot>
        {url}
    </slot>
</a>
{#if type === 'tel'}
    {#if messengers.length}
        {#each messengers as messenger}
            <span class="ml-1">
                  {#if messenger.url}
                      <a href="{messenger.url}" target="_top"><Fa icon={messenger.icon} class="inline mr-1" style="color: var(--link-color)"/></a>
                  {:else}
                      <Fa icon={messenger.icon} class="inline text-gray-400 mr-1"/>
                  {/if}
            </span>
        {/each}
    {/if}
{:else if type === 'map'}
    <Fa icon={faChevronRight} class="inline ml-1 text-gray-400"/>
{/if}

