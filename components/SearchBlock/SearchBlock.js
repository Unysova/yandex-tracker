import { mapGetters } from 'vuex'


export default {
	name: 'SearchBlock',
	pluginOptions: {},
	data() {
		return {
            newAddress: ''
		}
	},
	props: {

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
            this.$store.dispatch('tracks/addTrack', this.newAddress);
			this.newAddress = '';
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
