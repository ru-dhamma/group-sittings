<script>
    import Fa from 'svelte-fa/src/fa.svelte';
    import {iconMap} from '../formatter/services-map';

    export let type = null;
    export let url = null;

    const prefixIcon = iconMap[type] ?? '';
</script>

{#if prefixIcon}
    <Fa icon={prefixIcon} class="inline text-gray-400 mr-1"/>
{/if}
<a href="{url}" target="_top">
    <slot>
        {url}
    </slot>
</a>
