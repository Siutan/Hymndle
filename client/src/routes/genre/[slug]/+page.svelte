<!--suppress ALL -->
<script lang="ts">
    export let data;

    import {List, Badge, Button, Card, Modal, Portal } from "stwui";
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
        }

    }

    const getMonth = (month) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return months[parseInt(month) - 1]
    }

    const stripName = (name) => {
        // remove all text in brackets
        // remove all text that is not alphanumeric
        return name.replace(/\(.*?\)/g, '').replace(/[^a-zA-Z0-9 ]/g, "")
    }

    // compare selected tracks to master track
    const compareSong = (type: string) => {
        const selectedTrack = selected[selected.length - 1]
        switch (type) {
            case 'name':
                if (selectedTrack.name === masterTrack.name) {
                    return 'text-green-500'
                } else {
                    return 'text-red-500'
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

    const getLyrics = async (track) => {
        const response = await fetch(``)
        const data = await response.json()
        console.log(data)
        return data
    }

    const getClue = () => {
        // randomly choose number between 1 and 3
        const random = Math.floor(Math.random() * 3) + 1

    }

</script>

<Portal>
    {#if open}
        <Modal handleClose={closeModal}>
            <Modal.Content slot="content">
                <Card>
                    <Card.Header slot="header">Congratulations!</Card.Header>
                    <Card.Content slot="content">
                        <div>
                            <Button type="primary">Play again?</Button>
                        </div>
                    </Card.Content>
                </Card>
            </Modal.Content>
        </Modal>
    {/if}
</Portal>

<div class="hidden lg:block absolute top-28 left-10 bg-gray-400 dark:bg-gray-800 items-center dark:text-white p-2 rounded-lg shadow-lg">
    <div class="flex flex-col gap-4">
        <div>
            <p class="font-bold">Rules:</p>
            <ul class="list-disc pl-5 text-sm font-semibold">
                <li>Guess the song based on the results of your guesses</li>
                <li>after 3 guesses, you will be offered a random clue</li>
                <li>if you guess the song correctly, you win</li>
            </ul>
        </div>
        <div>
            <p class="font-bold">Legend:</p>
            <ul class="list-disc pl-5 text-sm font-semibold">
                <li class="text-green-500">Correct</li>
                <li class="text-red-500">Incorrect</li>
                <li class="text-yellow-500">Close/Contains</li>
            </ul>
        </div>
    </div>
</div>

<div class="flex items-center dark:text-white">
    <div class="relative px-6 pt-10 pb-8 sm:mx-auto sm:rounded-lg sm:px-10">
        <div class="space-y-6 py-8 px-4 bg-gray-800 rounded-lg text-base leading-7 text-gray-600 shadow-lg">

            {#if selected.length >= 3}
                <div>
                    <h1 class="text-2xl font-bold text-gray-400">Do you need a clue?</h1>
                    <div class="py-2">
                        <Button type="primary" onClick={() => getClue()}>Yes</Button>
                        <Button type="primary" onClick={() => getClue()}>No</Button>
                    </div>
                </div>
            {/if}

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
                                                        <Badge class="{compareSong('artist')} flex w-14 justify-center">
                                                            <p class="truncate">
                                                                {artist.name}
                                                            </p>
                                                        </Badge>
                                                    {/if}
                                                {/each}
                                                <Badge class="{compareSong('artist')}">{track.artists.length - 2}more
                                                </Badge>
                                            {/if}
                                        </div>

                                    </List.Item.Content.Description>
                                </List.Item.Content>
                            </List.Item>
                        {/each}
                    </List>
                </div>


                <div class="hidden sm:block">
                    {#each selected as track}
                        <div class="flex gap-2 py-2">
                            <div class="flex justify-center">
                                <div class="flex flex-col rounded-lg bg-gray-600 shadow-lg md:w-screen md:max-w-xl md:flex-row">
                                    <img class="h-40 w-full rounded-t-lg object-cover md:h-36 md:w-36 md:rounded-none md:rounded-l-lg"
                                         src={track.image} alt=""/>
                                    <div class="flex flex-col justify-start px-6 pt-2">
                                        <div class="flex gap-12 items-center">
                                                <p
                                                        use:tooltip={{
                                                      placement: 'top',
                                                      content: 'Track Name: ' + track.name,
                                                      arrow: true,
                                                      animation: 'scale'
                                                   }}
                                                        class="{compareSong('name')} text-xl font-medium w-[10.3rem] truncate">
                                                    {stripName(track.name)}
                                                </p>
                                            <div class="flex gap-2 items-center">
                                                <div
                                                        use:tooltip={{
                                                      placement: 'top',
                                                      content: 'Album Name: ' + track.album.name,
                                                      arrow: true,
                                                      animation: 'scale'
                                                   }}
                                                >
                                                    <Badge class="{compareSong('album')} flex w-28 justify-center dark:bg-opacity-100">
                                                        <p class="truncate">
                                                            {track.album.name}
                                                        </p>
                                                    </Badge>
                                                </div>
                                                <div
                                                        use:tooltip={{
                                                      placement: 'top',
                                                      content: 'Album Type: ' + track.album.albumType,
                                                      arrow: true,
                                                      animation: 'scale'
                                                   }}
                                                >
                                                    <Badge class="{compareSong('albumType')} capitalize dark:bg-opacity-100">{track.album.albumType}</Badge>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex flex-col pt-4 pr-10">
                                            <div class="grid grid-cols-3 grid-rows-2 space-2">
                                                {#each track.artists as artist}
                                                    <div>
                                                        <Badge class="{compareSong('artist')} dark:bg-opacity-100 truncate">{artist.name}</Badge>
                                                    </div>
                                                {/each}
                                            </div>
                                            <div class="flex gap-4 pt-2">
                                                <p class="text-sm text-white font-bold">Released:</p>
                                                <Badge class="{compareSong('month')} dark:bg-opacity-100">{getMonth(track.releaseMonth)}</Badge>
                                                <Badge class="{compareSong('year')} dark:bg-opacity-100">{track.releaseYear}</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>