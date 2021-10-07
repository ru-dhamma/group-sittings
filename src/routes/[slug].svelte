<script context="module">
  import {
    base
  } from '$app/paths';
  export async function load({
    page,
    fetch
  }) {
    const slug = page.params.slug;
    const city = await fetch(`${base}/${slug}.json`)
      .then((r) => r.json());

    return {
      props: {
        city
      }
    }
  }
</script>

<script>
  import Link from '$lib/components/base/link.svelte'
  import Fa from 'svelte-fa/src/fa.svelte';
  import {
    faMapMarkerAlt,
    faChevronLeft,
    faUserCheck,
    faPhone,
    faEnvelope
  } from '@fortawesome/free-solid-svg-icons';

  export let city;
  export let formatPhoneNumber = (str) => {
    // Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '');
    // Check if the input is of correct
    // For russia and kazakhstan
    let match = cleaned.match(/^(7|8|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      let intlCode = (match[1] ? '+7 ' : '');
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    // For ukrain and belarus
    match = cleaned.match(/^(380|375|)?(\d{2})(\d{3})(\d{4})$/);
    if (match) {
      return ["+", match[1], ' (', match[2], ') ', match[3], '-', match[4]].join('');
    }

    //if nothing matched return unformatted
    return str;
  }
</script>

<svelte:head>
  <title>{city.name}</title>
</svelte:head>

<h1 class="title">{city.name}</h1>
{#if city.text}<p>{@html city.text}</p>{/if}
<a class="button" href="/">
  <Fa icon={faChevronLeft} class="inline" /> Назад</a>

  {#if city.links}
    {#each city.links as link}
    <div class="">
      {#if link.text}<Link type={link.icon} url={link.url}>{link.text}</Link>
      {:else}<Link type={link.icon} url={link.url} />
      {/if}
    </div>
    {/each}
  {/if}

{#if city.addresses}
  {#each city.addresses as address}
  <div class="grid grid-cols-12 gap-2">
    <div class="col-span-2"><Fa icon={faMapMarkerAlt} class="inline" />Адрес</div>
    <div class="col-span-10">
      <div class="">{address.text}</div>
      {#if address.map}<div class=""><Link type="map" url={address.map}>Карта</Link></div>{/if}
      {#if address.description}<div class="">{address.description}</div>{/if}
    </div>
  </div>
  {/each}
{/if}


{#if city.contacts}
<h3>Контакты</h3>
{#each city.contacts as contact}
<div class="grid grid-cols-12 gap-2">
  <div class="col-span-2">{#if contact.organizer}<Fa icon={faUserCheck} class="inline" />{/if}{contact.name}</div>
  <div class="col-span-10">
    {#if contact.phone}<div class="">
      <Link type="tel" url={contact.phone} messangers={contact.messangers}>{formatPhoneNumber(contact.phone)}</Link>
      {#if contact.description}<p>{contact.description}</p>{/if}
    </div>{/if}
    {#if contact.email}<div class=""><Link type="email" url={contact.email}>{contact.email}</Link></div>{/if}
    {#if contact.links}
      {#each contact.links as link}
      <div class="">
        {#if link.text}<Link type={link.icon} url={link.url}>{link.text}</Link>
        {:else}<Link type={link.icon} url={link.url} />
        {/if}
      </div>
      {/each}
    {/if}
  </div>
</div>
{/each}
{/if}