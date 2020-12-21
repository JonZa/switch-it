<template>
	<div class="news">
		<a href="/" class="news__back">Back</a>
		<hr />
		<img class="news__image" :src="post.thumbnail" />
		<h1 class="news__headline">{{ post.title }}</h1>
		<time class="news__date" :date-time="post.date">{{ post.date }}</time>
		<div class="news__content" v-html="post.excerpt"></div>
	</div>
</template>

<script>
export default {
	computed: {
		posts() {
			return this.$store.state.posts;
		},
		post() {
			return this.posts.find(el => el.slug === this.slug);
		}
	},
	data() {
		return {
			slug: this.$route.params.slug
		};
	},
	created() {
		this.$store.dispatch('getPosts');
	}
};
</script>

<style lang="scss">
.news {
	background: #fff;
	padding: #{'min(31vw / 12, 1200px * 0.31 / 12)'};
	&::after {
		content: '';
		clear: both;
		display: table;
	}
	&__back {
		display: inline-block;
		color: #58585b;
		text-decoration: none;
		margin-bottom: 15px;
		padding-left: 30px;
		position: relative;
		&,
		&::before {
			transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
		}
		&::before {
			display: block;
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translatey(-50%);
			background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E %3Cpath fill='%23000' d='M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z'/%3E %3C/svg%3E");
			height: 20px;
			width: 20px;
			border: 1px solid #ccc;
		}
		&:hover {
			color: #b00;
			&::before {
				border-color: #b00;
			}
		}
	}
	&__headline {
		font-size: #{'min(100vw / 37.5, 2rem)'};
	}
	&__headline,
	&__date {
		margin-bottom: #{'min(31vw / 12, 1200px * 0.31 / 12)'};
		display: block;
	}
	&__image {
		display: block;
		float: right;
		width: 33%;
	}
}
</style>
