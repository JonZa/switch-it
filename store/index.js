const siteURL = 'https://jsonkeeper.com';

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
			let posts = await fetch(`${siteURL}/b/WKYH`).then(res => res.json());
			let tags = [...new Set([].concat.apply([], posts.map(({ Tags }) => Tags)))];

			posts = posts.map(({ id, ArticleTitle, Subject, Author, ShortDescription, ThumbnailImage, Date, Tags }) => ({
				id,
				slug: ArticleTitle.toLowerCase().split(' ').join('-'),
				subject: Subject,
				title: ArticleTitle,
				author: Author,
				excerpt: ShortDescription,
				thumbnail: 'https://picsum.photos/seed/' + ArticleTitle.replace(/[^a-zA-Z]+/g, '').split('').reverse().join('') + '/800/800.webp',
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