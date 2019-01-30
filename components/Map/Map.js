import ymaps from 'ymaps';


export default {
	name: 'Map',
	pluginOptions: {},
	data() {
		return {
			myap: {}
		}
	},
	props: {
		ymapClass: String,
		mapLink: String
	},
	mounted() {

		this.$nextTick(() =>  {
			this.readyMap();
		});

	},
	methods: {
		initMap() {
			const ymaps = global.ymaps;
			ymaps.ready(function () {
				this.myMap  = new ymaps.Map("map", {
					center: [55.76, 37.64],
					zoom: 10
				});
			});
		},
		readyMap() {
				const yandexMapScript = document.createElement('SCRIPT');
				const { apiKey = '24e78141-6456-4ce4-8362-6caaf2838f0c', lang = 'ru_RU', version = '2.1' } = this.$options.pluginOptions;
				const mapLink = this.mapLink || `https://api-maps.yandex.ru/${version}/?lang=${lang}${ apiKey && `&apikey=${apiKey}` }`;
				yandexMapScript.setAttribute('src', mapLink);
				yandexMapScript.setAttribute('async', '');
				yandexMapScript.setAttribute('defer', '');
				document.body.appendChild(yandexMapScript);
				yandexMapScript.onload = () => {
					this.initMap();

				}
		},
	}
}

/*
import {mapGetters} from 'vuex'

export default {
	name: 'Quiz',
	components: {
		Background,
		Progress,
		Question,
		CreativeTask,
		Results,
		Product
	},
	computed: {
		...mapGetters('quiz', [
			'isFinishQuestions',
			'currentStep',
			'steps',
			'questions',
			'videoPaused'
		]),
	...mapGetters('answers', [
		'hasAnswer'
	])
},

}*/