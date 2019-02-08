import { mapGetters } from 'vuex'

export default {
	name: 'Map',
	data() {
		return {
            ymaps: {},
			myMap: {},
            myPolyline: {},
            myCollection : {},
            multiRoute: {},
            distance: 0
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
                //Создание и настройки карты
				self.myMap = new self.ymaps.Map('map', {
					center: [55.751574, 37.573856],
					zoom: 9,
                    controls: []
				});

                self.myMap.controls.add('zoomControl');

                // Создание экземпляра коллекции
                self.myCollection = new self.ymaps.GeoObjectCollection({}, {
                    preset: 'islands#redIcon', //все метки красные
                    draggable: true // и их можно перемещать
                });

                // Навешиваем на коллекцию событие при перетаскивании маркеров
                self.myCollection.events.add('dragend', function (e) {
                    self.reverseGeocoder(e.get('target').geometry.getCoordinates(), e.get('target').properties.get('id'));
                });

                // Создание экземпляра ломаной
                self.myPolyline = new self.ymaps.Polyline([]);

			});

		},
		changeRoute(track) {
			var self = this;
            self.ymaps.ready(function () {
                //Удаляем старые объекты
                self.myMap.geoObjects.remove(self.multiRoute);
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

                //Добавляем на карту коллекцию и ломаную
                self.myMap.geoObjects.add(self.myCollection).add(self.myPolyline);

                //Вычисляем димтанцию между точками и ереводим в километры
                self.distance = self.myPolyline.geometry.getDistance() / 1000;

                //Устанавливаем границы карты так, чтобы был виден маршрут
                self.myMap.setBounds(
                    self.myCollection.getBounds(), {checkZoomRange:true,
                        zoomMargin: 15
               });

			});
		},
        addMultiRoute() {
		    var routePoints = [];
		    var self = this;
            // Создание экземпляра маршрута
            this.multiRoute = new self.ymaps.multiRouter.MultiRoute({
                referencePoints: [],
                params: {
                    reverseGeocoding: true
                }
            }, {
                viaPointDraggable: false,
                boundsAutoApply: true,
                editorDrawOver: false,
                editorMidPointsType: "via",
                wayPointVisible:false,
                viaPointVisible:false
            });

            for (var i = 0; i < self.track.length; i++) {
                //Вычисляем координаты конкретной точки
                var coords = self.track[i].coords;
                routePoints.push(coords);
            }

            this.multiRoute.model.setReferencePoints(
                routePoints
            );

            // Добавление маршрута на карту.
            this.myMap.geoObjects.add(this.multiRoute);
        },

        reverseGeocoder(coords, id) {
		    var self = this;

		    //Переводим адрес в координаты и меняем данные точки
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
                    }
                );
            });

        }
	}
}
