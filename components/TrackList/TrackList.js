import { mapGetters } from 'vuex'

export default {
    name: 'TrackList',
	data() {
		return {
		}
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