import { mapGetters } from 'vuex'


export default {
	name: 'SearchBlock',
	data() {
		return {
            newAddress: '',
            dialogVisible: false,
			message: '',
			ymaps: {},
            test: 'test'

        }
	},
    props: {
        ymapsReady: false
    },
    watch: {
        ymapsReady() {
            this.ymaps = global.ymaps;

        }

    },
	computed: {
		...mapGetters('tracks', [
			'track'
		])

	},
	mounted() {
	},

	methods: {
		addAddress() {
			if (this.newAddress === '') {
				this.dialogVisible = true;
				this.message = 'Вы ввели пустое значение';
				return
			}
            var self = this;
            this.ymaps.ready(function () {
                var myGeocoder = self.ymaps.geocode(self.newAddress);
                myGeocoder.then(
                    function (res) {
                        var coords = res.geoObjects.get(0).geometry.getCoordinates();
                            var trackPoint = {address: "", coords: []};
                            trackPoint.address = self.newAddress;
                            trackPoint.coords = coords;

                        self.$store.dispatch('tracks/addPoint', trackPoint);
                        self.newAddress = '';
                    },
                    function (err) {
                        this.dialogVisible = true;
                        this.message = 'Произошла ошибка. Перезагрузите страницу.';
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
