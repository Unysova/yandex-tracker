<template>
    <section class="app">
        <div class="tools">
            <TrackList/>
            <SearchBlock/>
        </div>
        <div class="map">
            <Map/>
        </div>
    </section>
</template>

<script>
	import TrackList from '~/components/TrackList';
	import SearchBlock from '~/components/SearchBlock';
	import Map from '~/components/Map';

	export default {
		components: {
			TrackList,
            SearchBlock,
            Map
		}
	}
</script>
