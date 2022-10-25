<script>
    import '../tailwind.css'
    import NavBar from "$lib/components/NavBar.svelte";
</script>

<div id="body" class="dark h-screen">
    <div class="flex flex-col overflow-hidden h-screen bg-gray-100 dark:bg-gray-900">
        <NavBar />
        <slot></slot>
    </div>
</div>