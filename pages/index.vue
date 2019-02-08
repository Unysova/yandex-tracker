<template>
    <section class="app">
        <div class="tools">
            <SearchBlock :ymapsReady="ymapsReady" />
            <TrackList/>
        </div>
        <div class="map">
            <Map :ymapsReady="ymapsReady"/>
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
		},
        data() {
            return {
                ymapsReady: false
            }
        },
        mounted() {
            this.readyMap();
        },
        methods: {
            readyMap() {
                const yandexMapScript = document.createElement('SCRIPT');
                const mapLink = `https://api-maps.yandex.ru/2.1?lang=ru_RU&apikey=24e78141-6456-4ce4-8362-6caaf2838f0c`;
                yandexMapScript.setAttribute('src', mapLink);
                yandexMapScript.setAttribute('async', '');
                yandexMapScript.setAttribute('defer', '');
                document.body.appendChild(yandexMapScript);
                yandexMapScript.onload = () => {
                    this.ymapsReady = true;
                }
            }
        }
    }
</script>
