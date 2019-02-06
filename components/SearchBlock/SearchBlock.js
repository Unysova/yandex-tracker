import { mapGetters } from 'vuex'


export default {
	name: 'SearchBlock',
	pluginOptions: {},
	data() {
		return {
			datta: 'kk'
		}
	},
	props: {
        newAddress: '',
		dr: ''

	},
	computed: {
		...mapGetters('tracks', [
			'track'
		])

	},
	mounted() {
		//this.test();
	},

	methods: {
		addAddress() {
			const ymaps = global.ymaps;
			ymaps.ready(function () {
				var myGeocoder = ymaps.geocode('Москва, Сверчков переулок');
				myGeocoder.then(

					function (res) {
						this.datta = res;
						//выуживаем массив результатов
						var objs = res.geoObjects.toArray();
						//выводим их в консоль
						for(i=0; i < objs.length; i++)
							alert(objs[0]);
						/*console.log(objs[i].properties.getAll());*/
					}
				);
			});
		},

		test(){
			 this.$store.dispatch('tracks/addTrack', true)
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
