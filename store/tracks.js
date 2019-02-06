/*

export const state = () => ({
	tracks: [],
	test: ''
});

export const getters = {
	tracks: (state) => state.tracks,
	test: (state) => state.test
};

export const actions = {

	commit('setAnswers', data.answers);
	commit('setHasAnswer', data.has_answer);
};

export const mutations = {
	setAnswers: (state, data) => {
	state.items = data.reverse()
},
setHasAnswer: (state, data) => {
	state.hasAnswer = data;
}
};

*/


export const state = () => ({
	track: [
		'москва',
		'ульяновск',
		'саратов'
	],
	test: ''
});

export const actions = {
	addTrack({commit}, value) {
		commit('add_track', value)
	},

	updateTrack({commit}, track) {
		commit('update_track', track)
	}
};

export const getters = {
	track: (state) => state.track
};

export const mutations = {
	add_track(state, value) {
		/*state.tracks.push(value)*/
		state.track = value

	},
	update_track(state, track) {
		state.track.length = 0;
		state.track.push(track)
	}
};