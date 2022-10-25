<!--suppress ALL -->
<script lang="ts">
    export let data;

    import {List, Badge, Modal, Portal, Card } from "stwui";
    import {tooltip} from 'stwui/actions';
    import Autocomplete from "simple-svelte-autocomplete"
    import Artists from "$lib/components/Artists.svelte";
    import Tooltip from "$lib/components/Tooltip.svelte";

    const masterTrack = data.masterTrack;
    console.log(masterTrack);

    let options = data.tracks;
    let filteredOptions = options;
    let currentSelection;
    let currentValue;

    let selected = [];

    let open = false;

    function openModal() {
        // open modal after 2 seconds
        setTimeout(() => {
            open = true;
        }, 2000);
    }

    function closeModal() {
        open = false;
    }

    // remove later
    selected = [...selected, data.tracks[0]];

    const removeSelection = (track) => {
        // check if anythign is selected
        if (track.name) {
            console.log(track)
            selected = [...selected, track];
            // filteredOptions is options - selected tracks
            filteredOptions = options.filter((option) => !selected.includes(option))
            currentSelection = "s"
            currentValue = "w"
        } else {
            console.log("nothing selected")
        }

        // check if selected track id = master track id
        // if yes, reset selected to empty array
        if (track.id === masterTrack.id) {
            openModal();
            selected = [];
            filteredOptions = options;
        }

    }

    const getMonth = (month) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return months[parseInt(month) - 1]
    }

    // compare selected tracks to master track
    const compareSong = (type: string) => {
        const selectedTrack = selected[selected.length - 1]
        switch (type) {
            case 'name':
                if (selectedTrack.name === masterTrack.name) {
                    return 'bg-green-600'
                } else {
                    return 'bg-red-600'
                }
            // check if any of the artists match, if more than 1 artist, check if all match, if only 1 artist out of multiple match, return yellow
            case 'artist':
                if (selectedTrack.artists.length === 1) {
                    if (selectedTrack.artists[0].name === masterTrack.artists[0].name) {
                        return 'bg-green-600'
                    } else {
                        return 'bg-red-600'
                    }
                } else {
                    let match = false
                    selectedTrack.artists.forEach((artist) => {
                        if (artist.name === masterTrack.artists[0].name) {
                            match = true
                        }
                    })
                    if (match) {
                        return 'bg-yellow-600'
                    } else {
                        return 'bg-red-600'
                    }
                }

            case 'album':
                if (selectedTrack.album.name === masterTrack.album.name) {
                    return 'bg-green-600'
                } else {
                    return 'bg-red-600'
                }
            case 'albumType':
                if (selectedTrack.album.albumType === masterTrack.album.albumType) {
                    return 'bg-green-600'
                } else {
                    return 'bg-red-600'
                }
            case 'month':
                // if the month is the same, return green, if within 1 month, return yellow, if more than 1 month, return red
                const selectedMonth = parseInt(selectedTrack.releaseMonth)
                const masterMonth = parseInt(masterTrack.releaseMonth)
                console.log(selectedMonth, masterMonth + 1)
                if (selectedMonth === masterMonth) {
                    return 'bg-green-600'
                } else if (selectedMonth === masterMonth - 1 || selectedMonth === masterMonth + 1) {

                    return 'bg-yellow-600'
                } else {
                    return 'bg-red-600'
                }
            case 'year':
                // if the year is the same, return green, if within 1 year, return yellow, if more than 1 year, return red
                const selectedYear = parseInt(selectedTrack.releaseYear)
                const masterYear = parseInt(masterTrack.releaseYear)
                if (selectedYear === masterYear) {
                    return 'bg-green-600'
                } else if (selectedYear === masterYear - 1 || selectedYear === masterYear + 1) {
                    return 'bg-yellow-600'
                } else {
                    return 'bg-red-600'
                }
        }
    }

</script>

<Portal>
    {#if open}
        <Modal handleClose={closeModal}>
            <Modal.Content slot="content">
                <Card>
                    <Card.Header slot="header">Modal</Card.Header>
                    <Card.Content slot="content">I am the content</Card.Content>
                </Card>
            </Modal.Content>
        </Modal>
    {/if}
</Portal>

<div class="flex items-center dark:text-white">
    <div class="relative px-6 pt-10 pb-8 sm:mx-auto sm:rounded-lg sm:px-10">
        <div class="space-y-6 py-8 text-base leading-7 text-gray-600 ">

            <form class="flex" on:submit|preventDefault={removeSelection(currentSelection)}>
                <div class="relative flex">
                    <Autocomplete
                            noInputStyles=true
                            items={filteredOptions}
                            bind:value={currentSelection}
                            bind:selectedItem={currentValue}
                            labelFieldName="name"
                            class="flex sm:w-[32rem] w-[17rem] border border-gray-300/50 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-gray-500 focus:ring-0">
                        <div slot="item" let:item={item} let:label={label}>
                            <div class="flex cursor-pointer rounded-full">
                                <div class="flex-shrink-0">
                                    <img class="h-16 w-16 rounded-full" src={item.image} alt="">
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">
                                        {item.name}
                                    </div>
                                    <div class="flex gap-2 text-sm text-slate-700">
                                        {#each item.artists as artist}
                                            <p>{artist.name}</p>
                                        {/each}
                                    </div>
                                    <div class="text-sm font-medium text-gray-900">
                                        {getMonth(item.releaseMonth)} {item.releaseYear}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div slot="no-results" let:noResultsText={noResultsText}>
                            <strong>NO RESULTS - {noResultsText}</strong>
                        </div>
                    </Autocomplete>

                    <div class="flex">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-3 px-4 rounded"
                                type="submit">
                            Submit
                        </button>
                    </div>

                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                  d="M6.293 14.707a1 1 0 010-1.414L10.586 10 6.293 5.707a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                  clip-rule="evenodd"></path>
                        </svg>
                    </div>

                </div>
            </form>

            <div>
                <table class="sm:w-[100rem] hidden overflow-x-scroll">
                    <thead>
                    <tr>
                        <th class="px-6 py-3 overflow-hidden border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Artist/s
                        </th>
                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Album Name
                        </th>
                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Album Type
                        </th>
                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Release Month
                        </th>
                        <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Release Year
                        </th>
                    </thead>
                    <tbody>
                    {#each selected as track}
                        <tr class="text-center">
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 {compareSong('name')}">
                                <div>
                                    <p class="text-sm truncate leading-5 font-medium text-gray-900 dark:text-white">
                                        {track.name}
                                    </p>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 {compareSong('artist')}">
                                <div>
                                    <div class="truncate text-sm leading-5 font-medium text-gray-900 dark:text-white">
                                        <p class="truncate">{track.artists.map((artist) => artist.name).join(', ')}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 {compareSong('album')}">
                                <div>
                                    <div class="text-sm leading-5 font-medium text-gray-900 dark:text-white">
                                        {track.album.name}
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 {compareSong('albumType')}">
                                <div>
                                    <div class="text-sm leading-5 font-medium text-gray-900 dark:text-white">
                                        {track.album.albumType}
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 {compareSong('month')}">
                                <div>
                                    <div class="text-sm leading-5 font-medium text-gray-900 dark:text-white">
                                        {getMonth(track.releaseMonth)}
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 {compareSong('year')}">
                                <div>
                                    <div class="text-sm leading-5 font-medium text-gray-900 dark:text-white">
                                        {track.releaseYear}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    {/each}
                    </tbody>
                </table>

                <div class="sm:hidden">
                    <List>
                        {#each selected as track}
                            <List.Item>
                                <List.Item.Leading slot="leading">
                                    <List.Item.Leading.Avatar slot="avatar" src={track.image}/>
                                </List.Item.Leading>
                                <List.Item.Content slot="content">
                                    <List.Item.Content.Title slot="title">
                                        <div class="flex gap-2">
                                            <Badge class="{compareSong('name')} flex w-24 justify-center">
                                                <p class="truncate">
                                                    {track.name}
                                                </p>
                                            </Badge>
                                            <Badge class="{compareSong('album')} flex w-24 justify-center">
                                                <p class="truncate">
                                                    {track.album.name}
                                                </p>
                                            </Badge>
                                            <Badge class="{compareSong('albumType')}">{track.album.albumType}</Badge>
                                        </div>
                                    </List.Item.Content.Title>
                                    <List.Item.Content.Description class="py-2" slot="description">
                                            <div class="flex gap-2">
                                                {#if track.artists.length <= 2}
                                                    {#each track.artists as artist}
                                                        <Badge class="{compareSong('artist')}">{artist.name}</Badge>
                                                    {/each}
                                                    <Badge class="{compareSong('month')}">{getMonth(track.releaseMonth)}</Badge>
                                                    <Badge class="{compareSong('year')}">{track.releaseYear}</Badge>
                                                {:else}
                                                    {#each track.artists as artist, i}
                                                        {#if i < 3}
                                                            <Badge class="{compareSong('artist')} flex w-14 justify-center" >
                                                                <p class="truncate">
                                                                    {artist.name}
                                                                </p>
                                                            </Badge>
                                                        {/if}
                                                    {/each}
                                                    <Badge class="{compareSong('artist')}" >{track.artists.length - 2} more</Badge>
                                                {/if}
                                            </div>

                                    </List.Item.Content.Description>
                                </List.Item.Content>
                            </List.Item>
                        {/each}
                    </List>
                </div>
            </div>
        </div>
    </div>
</div>