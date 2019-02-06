import ymaps from 'ymaps';
import { mapGetters } from 'vuex'


export default {
	name: 'Map',
	pluginOptions: {},
	data() {
		return {
			myMap: {},
			multiRoute: {}
		}
	},

	computed: {
		...mapGetters('tracks', [
			'track'
		])
	},
	mounted() {
		this.$nextTick(() =>  {
			this.readyMap();
		});

	},
	watch: {
		track(track) {
			alert(track);
			this.changeRoute(track)
		}
	},
	methods: {
		initMap() {
			var self = this;
			const ymaps = global.ymaps;
			ymaps.ready(function () {
				self.myMap = new ymaps.Map('map', {
					center: [55.751574, 37.573856],
					zoom: 9
				});

				// Создание экземпляра маршрута.
				self.multiRoute = new ymaps.multiRouter.MultiRoute({
					// Точки маршрута.
					// Обязательное поле.
					referencePoints: self.track,
					params: {
						reverseGeocoding: true
					}
				}, {
					// Автоматически устанавливать границы карты так,
					// чтобы маршрут был виден целиком.
					viaPointDraggable: true,
					boundsAutoApply: true,
					editorDrawOver: false,
					editorMidPointsType: "via"
				});

				self.multiRoute.editor.start({
					addWayPoints: true,
					removeWayPoints: true,
					addMidPoints: true
				});

				self.multiRoute.events.add('update', function(e){

				});
	// Добавление маршрута на карту.
				self.myMap.geoObjects.add(self.multiRoute);

			});

		},
		initRoute() {
			const ymaps = global.ymaps;
			var self = this;
			alert(trackPoints);
			ymaps.ready(function () {

				self.multiRoute.model.setReferencePoints([
					self.track
				]);

				// Изменение параметров маршрутизации.
				self.multiRoute.model.setParams({
					routingMode: 'masstransit'
				});
				self.myMap.geoObjects.add(self.multiRoute);

			});
		},
		changeRoute() {
			const ymaps = global.ymaps;
			var self = this;
			ymaps.ready(function () {

				self.multiRoute.model.setReferencePoints(
					self.track
				);
				self.myMap.geoObjects.add(self.multiRoute);

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