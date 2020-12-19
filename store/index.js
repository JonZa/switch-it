const siteURL = 'https://my.api.mockaroo.com';

export const state = () => ({
	posts: [],
	tags: []
});

export const mutations = {
	updatePosts: (state, posts) => {
		state.posts = posts;
	},
	updateTags: (state, tags) => {
		state.tags = tags;
	}
};

export const actions = {
	async getPosts({ state, commit, dispatch }) {
		if (state.posts.length) return;

		try {
			let posts = await fetch(`${siteURL}/fed-exercise-data.json?key=cf334d90`).then(res => res.json());
			let tags = [...new Set([].concat.apply([], posts.map(({ Tags }) => Tags)))];

			posts = posts.map(({ id, ArticleTitle, ShortDescription, Date, Tags }) => ({
				id,
				slug: ArticleTitle.toLowerCase().split(' ').join('-'),
				title: ArticleTitle,
				excerpt: ShortDescription,
				date: Date,
				tags: Tags.map(tag => (
					tag.toLowerCase().split(' ').join('-')
				))
			}));

			tags = tags.map(tag => ({
				id: tag.toLowerCase().split(' ').join('-'),
				name: tag
			}));

			commit('updatePosts', posts);
			commit('updateTags', tags);
		} catch (err) {
			console.log(err);
		}
	}
};
