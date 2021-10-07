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
  export let messangers = [];
  let preIcon = 
    type == 'email' ? faEnvelope :
    type == 'tel' ? faPhone : 
    type == 'vk' ? faVk : 
    type == 'fb' ? faFacebook : 
    type == 'in' ? faInstagram : 
    '';
  let prefix = 
    type == 'email' ? 'mailto:' :
    type == 'tel' ? 'tel:' :
    type == 'map' ? 'http://maps.apple.com/?q=' : '';
    console.log(messangers);
  let messangersIcons = messangers.map(
    (m) => {
      switch (m) {
        case "tg": return faTelegram
          break;
        case "fb": return faFacebookMessenger
          break;
        case "wa": return faWhatsapp
          break; 
        case "in": return faInstagram
          break;
        case "sc": return faSnapchat
          break;
        default: return "";
      }
    });
    
</script>

<a href="{prefix}{url}">
  {#if preIcon}<Fa icon={preIcon} class="inline" />{/if}
  <slot>
    {url}
  </slot>
  {#if type == 'tel'}
    {#if messangersIcons}
    {#each messangersIcons as messangerIcon}
      <Fa icon={messangerIcon} class="inline text-gray-500" />
    {/each}
    {/if}
  {:else if type == 'map'} <Fa icon={faChevronRight} class="inline" />
  {/if}
</a>