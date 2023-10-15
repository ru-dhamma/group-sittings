<script>
    import City from './City.svelte';
    import Index from './Index.svelte';
    import PageTransition from './lib/PageTransition.svelte';
    import {city, isIndex} from './stores.js';
</script>

<div class="max-w">
    <PageTransition refresh={$city}>
        <main class="max-w-full p-5 sm:p-0" id="main-container">
            <h2 class="mb-5">
                Групповые медитации для старых студентов
            </h2>
            {#if $isIndex}
                <Index/>
            {:else}
                <City/>
            {/if}
        </main>
    </PageTransition>
</div>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    @layer base {
        h1 {
            @apply text-2xl;
        }

        h2 {
            @apply text-2xl;
        }

        h3 {
            @apply text-xl;
        }

        a {
            color: #955746;
        }

        a:hover {
            text-decoration: underline;
        }
    }

    body {
        overflow: hidden;
    }

    #main-container {
        height: 620px;
        max-height: 620px;
        overflow-y: hidden;
    }
</style>
