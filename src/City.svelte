<script>
    import {faChevronLeft, faMapMarkerAlt, faUserCheck} from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa/src/fa.svelte';
    import createPhoneFormatter from './formatter/phone';
    import Link from './lib/Link.svelte';
    import {city, country, isIndex} from './stores.js';

    // empty city and back to index
    const back = () => {
        country.update(() => undefined);
        city.update(() => undefined);
        isIndex.update(() => true);
    };

    const formatPhone = createPhoneFormatter($country);
</script>

<svelte:head>
    <title>{$city?.name}</title>
</svelte:head>

<header class="mb-7">
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a class="button text-black hover:no-underline bg-gray-100 p-2.5 pr-3.5 rounded-full hover:bg-gray-300 inline-block mb-4 md:absolute"
       href="#"
       on:click="{back}"
    >
        <span class="rounded-full inline-block bg-yellow-400 w-6 h-6 pl-1.5 pt-0.25 mr-1"><Fa class="inline" icon={faChevronLeft}/></span>
        Назад
    </a>
    {#if $city?.name}<h1 id="city-title" class="text-center">{$city.name}</h1>{/if}
</header>
{#if $city?.text}<p id="city-text" class="mb-3">{@html $city.text}</p>{/if}

{#if $city?.links}
    <div id="links">
        {#each $city.links as link}
            <div class="mb-3">
                {#if link.text}
                    <Link type={link.icon} url={link.url}>{link.text}</Link>
                {:else}
                    <Link type={link.icon} url={link.url}/>
                {/if}
            </div>
        {/each}
    </div>
{/if}

{#if $city?.addresses}
    <div id="addresses">
        {#each $city.addresses as address}
            <div class="grid grid-cols-5 gap-2 mb-3">
                <div class="col-span-1">
                    <Fa icon={faMapMarkerAlt} class="inline mr-2"/>
                    Адрес
                </div>
                <div class="col-span-4">
                    <div class="">{address.text}</div>
                    {#if address.map}
                        <div class="">
                            <Link type="map" url={address.map}>Карта</Link>
                        </div>
                    {/if}
                    {#if address.description}
                        <div class="">{address.description}</div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
{/if}


{#if $city?.contacts}
    <h3 class="">Контакты</h3>
    <div id="contatcs" class="divide-y divide-gray-200">
        {#each $city.contacts as contact}
            <div class="grid grid-cols-5 gap-2 py-4">
                <div class="col-span-1">
                    {#if contact.organizer}
                        <Fa icon={faUserCheck} class="inline mr-2"/>
                    {/if}{contact.name}
                    {#if contact.organizer}<p class="text-sm italic">(организатор)</p>{/if}
                </div>
                <div class="col-span-4">
                    {#if contact.phone}
                        <div class="">
                            <Link type="tel" url={contact.phone} messengers={contact.messengers}>{formatPhone(contact.phone)}</Link>
                            {#if contact.description}<p>{contact.description}</p>{/if}
                        </div>
                    {/if}
                    {#if contact.email}
                        <div class="">
                            <Link type="email" url={contact.email}>{contact.email}</Link>
                        </div>
                    {/if}
                    {#if contact.links}
                        {#each contact.links as link}
                            <div class="">
                                {#if link.text}
                                    <Link type={link.icon} url={link.url}>{link.text}</Link>
                                {:else}
                                    <Link type={link.icon} url={link.url}/>
                                {/if}
                            </div>
                        {/each}
                    {/if}
                </div>
            </div>
        {/each}
    </div>
{/if}

