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
  let messangersIcons = messangers.map(
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
{#if preIcon}<Fa icon={preIcon} class="inline text-gray-400" />{/if}
<a href="{prefix}{url}">
  <slot>
    {url}
  </slot>
</a>
{#if type == 'tel'}
  {#if messangersIcons}
<span class="ml-1">    
  {#each messangersIcons as messangerIcon}
    <Fa icon={messangerIcon} class="inline text-gray-400" />
  {/each}
</span>
  {/if}
{:else if type == 'map'} <Fa icon={faChevronRight} class="inline ml-1 text-gray-400" />
{/if}

<style>
  :global(.fa) {
    font-size: 1rem;
    margin-right: 0.4rem;
  }
  a {
    color: #955746;
    text-decoration: underline;
  }
</style>