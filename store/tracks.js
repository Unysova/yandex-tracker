export const state = () => ({
	track: []
});

export const actions = {
	addPoint({commit}, value) {
		commit('add_point', value)
	},

	updateTrack({commit}, track) {
		commit('update_track', track)
	},

    changePoint({commit}, track) {
        commit('change_point', track)
    }
};

export const getters = {
	track: (state) => state.track
};

export const mutations = {
	add_point(state, value) {
		state.track.push(value)

	},
	update_track(state, track) {
        state.track = [];

	    if (track.length === 0) {
	        return
        }

		track.forEach(function(item) {
            state.track.push(item)
        });
	},

    change_point(state, {trackPoint, id}) {
		state.track.splice(id, 1, trackPoint);
    }
};