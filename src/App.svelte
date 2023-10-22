<script>
    import City from './City.svelte';
    import Index from './Index.svelte';
    import PageTransition from './lib/PageTransition.svelte';
    import {city, isIndex} from './stores.js';
</script>

<div class="group-sittings-app">
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
    <div class="contact">
        Заметили ошибку?<br>
        Хотите проводить групповые медитации в своём городе?<br>
        Свяжитесь с нами: <a href="mailto:info@vipassana.ru" target="_top">info@vipassana.ru</a>
    </div>
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
            color: var(--link-color);
        }

        a:hover {
            text-decoration: underline;
        }
    }

    :root {
        --link-color: #955746;
    }

    .group-sittings-app {
        overflow-x: hidden;
    }

    .contact {
        position: fixed;
        right: 0;
        bottom: 0;
        z-index: 10;
        padding: 10px;
        background-color: rgba(255, 255, 255, 0.9);
        font-size: 14px;
        text-align: right;
    }
</style>
