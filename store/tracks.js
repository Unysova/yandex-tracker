export const state = () => ({
	items: [],
	hasAnswer: false
});

export const getters = {
		items: (state) => state.items,
	hasAnswer: (state) => state.hasAnswer
};

export const actions = {
	async getAnswers({ state, commit }) {
	const { data } = await this.$axios.get('/answer/');

	commit('setAnswers', data.answers);
	commit('setHasAnswer', data.has_answer);
}
};

export const mutations = {
	setAnswers: (state, data) => {
	state.items = data.reverse()
},
setHasAnswer: (state, data) => {
	state.hasAnswer = data;
}
};
