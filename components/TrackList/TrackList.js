import { mapGetters } from 'vuex'

export default {
    name: 'TrackList',
	data() {
		return {
		}
	},
    mounted() {
		/*this.init();*/

	},
	computed: {
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
		removeAddress(index) {
            var tracker = this.track.slice(0);
            tracker.splice(index, 1);
            this.$store.dispatch('tracks/updateTrack', tracker);
        },
        removeAll() {
            var tracker = this.track.slice(0);
            tracker = [];
            this.$store.dispatch('tracks/updateTrack', tracker);
        }
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
