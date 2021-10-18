<script>
  import Fa from 'svelte-fa/src/fa.svelte';
  import {
    faChevronRight,
    faPhone,
    faEnvelope
  } from '@fortawesome/free-solid-svg-icons';
  import {
    faVk,
    faInstagram,
    faFacebook,
    faWhatsapp,
    faFacebookMessenger,
    faTelegram,
    faSnapchat
  } from '@fortawesome/free-brands-svg-icons';

  export let type;
  export let url;
  export let messengers = [];
  let preIcon = {
      email: faEnvelope,
      tel: faPhone,
      vk: faVk,
      fb: faFacebook,
      in: faInstagram,
    }[type] ?? '';
  let prefix = {
      email: 'mailto:',
      tel: 'tel:',
      map: 'http://maps.apple.com/?q='
    }[type] ?? '';
  let messengersIcons = messengers.map(
    (m) => {
      switch (m) {
        case "tg":
          return faTelegram
          break;
        case "fb":
          return faFacebookMessenger
          break;
        case "wa":
          return faWhatsapp
          break;
        case "in":
          return faInstagram
          break;
        case "sc":
          return faSnapchat
          break;
        default:
          return "";
      }
    });
</script>
{#if preIcon}<Fa icon={preIcon} class="inline text-gray-400 mr-1" />{/if}
<a href="{prefix}{url}">
  <slot>
    {url}
  </slot>
</a>
{#if type == 'tel'}
  {#if messengersIcons}
<span class="ml-1">    
  {#each messengersIcons as messengerIcon}
    <Fa icon={messengerIcon} class="inline text-gray-400 mr-1" />
  {/each}
</span>
  {/if}
{:else if type == 'map'} <Fa icon={faChevronRight} class="inline ml-1 text-gray-400" />
{/if}

