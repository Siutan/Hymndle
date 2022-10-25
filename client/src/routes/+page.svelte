<script>
    export let data;

    console.log(data.body);

</script>
<div class="h-full p-2 bg-gray-100 dark:bg-zinc-900 dark:text-white">
    <p class="text-xl font-bold uppercase">Choose a category</p>
    <div class="grid sm:grid-cols-5 grid-cols-3 place-items-center text-center">
        {#each data.body as category}
            <a href={"/genre/" + category.catId} class="py-2 text-center hover:text-rose-600 hover:brightness-[.85]">
                <img src={category.image} alt={category.name} class="sm:w-28 sm:h-28 w-24 h-24 rounded-full" />
                <p class="font-semibold text-md">{category.name}</p>
            </a>
        {/each}
    </div>
</div>
