<script>
    import {Badge} from "stwui";

    export let artists
</script>

{#if artists.length < 3}
    {#each artists as artist}
        <Badge class={$$props.class} >{artist.name}</Badge>
    {/each}
{:else if artists.length > 3}
<!--  truncate the last artist  -->
    {#each artists as artist, i}
        {#if i < 3}
            <Badge class={$$props.class} >{artist.name}</Badge>
        {/if}
    {/each}
    <Badge class={$$props.class} >{artists.length - 3} more</Badge>
{/if}