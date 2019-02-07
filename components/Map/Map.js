import ymaps from 'ymaps';
import { mapGetters } from 'vuex'


export default {
	name: 'Map',
	data() {
		return {
            ymaps: {},
			myMap: {},
            myPolyline: {},
            myCollection : {}
		}
	},
    props: {
        ymapsReady: false
    },
	computed: {
		...mapGetters('tracks', [
			'track'
		])
	},
	mounted() {
		/*this.$nextTick(() =>  {
			this.readyMap();
		});*/

	},
	watch: {
		track(track) {
			this.changeRoute(track)
		},

        ymapsReady() {
			this.initMap();
		}

	},
	methods: {
		initMap() {
			var self = this;
			this.ymaps = global.ymaps;
            this.ymaps.ready(function () {
				self.myMap = new self.ymaps.Map('map', {
					center: [55.751574, 37.573856],
					zoom: 9,
                    controls: []
				});

                self.myMap.controls.add('zoomControl');

                self.myCollection = new self.ymaps.GeoObjectCollection({}, {
                    preset: 'islands#redIcon', //все метки красные
                    draggable: true // и их можно перемещать
                });

                self.myCollection.events.add('dragend', function (e) {

                    self.reverseGeocoder(e.get('target').geometry.getCoordinates(), e.get('target').properties.get('id'));

                });

                self.myPolyline = new self.ymaps.Polyline([]);



                /*// Создание экземпляра маршрута.
                self.multiRoute = new ymaps.multiRouter.MultiRoute({
                    // Точки маршрута.
                    // Обязательное поле.
                    referencePoints: [
                        'Москва, метро Смоленская',
                        'Москва, кремль',
                        [55.734876, 37.59308], // улица Льва Толстого.
                    ],
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
				self.myMap.geoObjects.add(self.multiRoute);*/


			});

		},
		changeRoute(track) {
			var self = this;
            self.ymaps.ready(function () {
                self.myCollection.removeAll();
                self.myPolyline.geometry.splice(0, self.myPolyline.geometry.getLength());

                for (var i = 0; i < self.track.length; i++) {
                    //Вычисляем координаты конкретной точки
                	var coords = self.track[i].coords;

                	//Создаем коллекцию
                    self.myCollection.add(new self.ymaps.Placemark(coords,
                        {   id: i,
                            balloonContentHeader: `Точка № ${i + 1}`,
                            balloonContentBody: `Адрес: ${self.track[i].address}`,
                            hintContent: `Точка № ${i + 1}`}));

                    //Добавляем координаты в ломаную
                    self.myPolyline.geometry.set(i, coords);

                }


                self.myMap.geoObjects.add(self.myCollection).add(self.myPolyline);

                self.myMap.setBounds(
                    self.myCollection.getBounds(), {checkZoomRange:true,
                        zoomMargin: 15
               });






				/*self.multiRoute.model.setReferencePoints(
					track
				);

                self.myMap.setBounds(
                    self.multiRoute.getBounds(), {checkZoomRange:true,
                        zoomMargin: 2});
*/
			});
		},

        reverseGeocoder(coords, id) {
		    var self = this;
            this.ymaps.ready(function () {
                var myGeocoder = self.ymaps.geocode(coords);
                myGeocoder.then(
                    function (res) {
                        var address = res.geoObjects.get(0).getAddressLine();
                        var trackPoint = {address: "", coords: []};
                        trackPoint.address = address;
                        trackPoint.coords = coords;

                        self.$store.dispatch('tracks/changePoint', {trackPoint, id});
                    },
                    function (err) {
                        alert("error")
                    }
                );
            });

        }

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