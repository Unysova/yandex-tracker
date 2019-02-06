import { mapGetters } from 'vuex'

export default {
    name: 'TrackList',
	pluginOptions: {},
	data() {
		return {
			myArray: [
			    'lllla',
                'kkkk',
                'kkkk'
            ]
		}
	},
	mounted() {
		/*this.init();*/

	},
	computed: {
		/*...mapGetters('tracks', [
			'track'
		])*/

		track: {
			get() {
				return this.$store.state.tracks.track
			},
			set(value) {
				this.$store.dispatch('tracks/updateTrack', value);
			}
		}


	},
	methods: {

	},

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
