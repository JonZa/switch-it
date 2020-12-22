<template>
	<div>
		<div class="filters">
			<strong class="filters__headline">
				Filter
			</strong>
			<div class="filters__list">
				<button type="button" @click="resetTags()" class="filters__tag" :class="[!selectedTags.length ? activeTag : '']">
					All categories
				</button>
				<button type="button" @click="updateTags(tag)" v-for="tag in tags" :key="tag.id" class="filters__tag" :class="selectedTags.includes(tag.id) ? activeTag : ''">
					{{ tag.name }}
				</button>
				<button type="button" @click="resetTags()" class="filters__tag" :class="[!selectedTags.length ? activeTag : '']">
					Reset
				</button>
			</div>
		</div>
		<div class="tags-list"></div>
		<div class="articles">
			<a :href="`news/${post.slug}`" class="articles__article lozad" v-for="post in sortedPosts" :key="post.id" :data-background-image="post.thumbnail">
				<div class="articles__article-details">
					<small class="articles__article-subject">{{ post.subject }}</small>
					<h2 class="articles__article-title">{{ post.title }}</h2>
					<small class="articles__article-meta">
						<time :date-time="post.date">{{ post.date }}</time
						><br />
						{{ post.author.charAt(0) + ' ' + post.author.split(' ')[post.author.split(' ').length - 1] }}</small
					>
				</div>
			</a>
		</div>
	</div>
</template>

<script>
import lozad from 'lozad';
export default {
	data() {
		return {
			selectedTags: [],
			observer: null,
			activeTag: 'filters__tag--active'
		};
	},
	computed: {
		posts() {
			return this.$store.state.posts;
		},
		tags() {
			return this.$store.state.tags;
		},
		sortedPosts() {
			if (!this.selectedTags.length) return this.posts;
			return this.posts.filter(post => this.selectedTags.some(tag => post.tags.includes(tag)));
		}
	},
	created() {
		if (this.$route.query.filters !== undefined && this.$route.query.filters.split(',').length) this.selectedTags = this.$route.query.filters.split(',');
		this.$store.dispatch('getPosts');
	},
	methods: {
		resetTags() {
			this.selectedTags = [];
			this.$router.replace({ query: null });
			this.$nextTick(function() {
				this.observer.observe();
			});
		},
		updateTags(tag) {
			if (!this.selectedTags.includes(tag.id)) {
				this.selectedTags.push(tag.id);
			} else {
				this.selectedTags.splice(this.selectedTags.indexOf(tag.id), 1);
			}
			if (this.selectedTags.length) {
				this.$router.push({ query: { filters: this.selectedTags.join(',') } });
			} else {
				this.$router.replace({ query: null });
			}
			this.$nextTick(function() {
				this.observer.observe();
			});
		}
	},
	mounted() {
		this.observer = lozad();
		this.observer.observe();
	}
};
</script>

<style lang="scss">
@import '@/assets/variables.scss';
@import '@/assets/include-media.scss';
$details: '.articles__article-details';
$title: '.articles__article-title';
.filters {
	font-size: 0.875rem;
	&__headline {
		display: block;
		color: #fff;
		margin-bottom: 20px;
	}
	&__list {
		display: flex;
		flex-wrap: wrap;
		padding: 0;
		margin-bottom: 50px;
		position: relative;
		@include media('>=tablet') {
			justify-content: space-between;
			&::before {
				display: block;
				content: '';
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				height: 1px;
				background: #666;
			}
		}
	}
	&__tag {
		font-size: 0.875rem;
		cursor: pointer;
		outline: 0;
		background: transparent;
		border: 0;
		color: #aaa;
		margin-right: 1rem;
		padding: 0 0 0.125rem 0;
		margin-bottom: 0.5rem;
		display: block;
		border-bottom: 1px solid transparent;
		transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
		@include media('>=tablet') {
			margin-bottom: 0;
			margin-right: 0;
			padding-bottom: 0.75rem;
			position: relative;
		}
		@include media('>=desktop') {
			font-size: 1rem;
		}
		&:hover,
		&--active {
			border-color: #aaa;
			color: #fff;
		}
		&:last-child {
			border-bottom: 0;
			color: #fff;
			margin-left: 0.5rem;
			margin-right: 0;
			&::before {
				color: #aaa;
				content: '|';
				position: relative;
				left: -0.5rem;
				top: -1px;
			}
		}
	}
}
.articles {
	color: #444;
	@include media('>=tablet') {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-auto-flow: dense;
		grid-gap: 1.875rem;
	}
	&__article {
		background-color: #fafafa;
		display: flex;
		flex-direction: column;
		position: relative;
		background-size: 0;
		text-decoration: none;
		@include media('<tablet') {
			padding-top: #{'min(55vw, 50vh)'};
			margin-bottom: 1.875rem;
		}
		&::before,
		&::after {
			display: block;
			content: '';
			position: absolute;
			top: 0;
			@include media('<tablet') {
				height: #{'min(55vw, 50vh)'};
				width: 100%;
			}
		}
		&::before {
			background-attachment: fixed;
			background-color: #247;
			background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8) 10px, rgba(255, 255, 255, 0.9) 10px, rgba(255, 255, 255, 0.9) 20px), repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7) 10px, rgba(255, 255, 255, 0.8) 10px, rgba(255, 255, 255, 0.8) 20px);
		}
		&::after {
			background-image: inherit;
			background-repeat: no-repeat;
			background-position: center center;
			background-size: cover;
			transition: background-size 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s cubic-bezier(0.16, 1, 0.3, 1);
			@include media('>=tablet') {
				background-size: 110% auto;
			}
		}

		&:hover::after {
			@include media('>=tablet') {
				background-size: 120% auto;
				filter: brightness(1.2);
			}
		}

		@include media('>=tablet') {
			&:nth-of-type(4n + 1) {
				grid-column: span 2;
				height: calc(17.5vw * 2 + 1em);
				#{$details} {
					width: #{'min(31vw, 1200px * 0.31)'};
					height: 100%;
					padding: #{'min(31vw / 6, 1200px * 0.31 / 6)'};
				}
				&::before,
				&::after {
					bottom: 0;
					left: #{'min(31vw, 1200px * 0.31)'};
					right: 0;
				}
			}

			&:nth-of-type(4n + 2),
			&:nth-of-type(4n + 3) {
				grid-column: 1;
				justify-content: flex-end;
				height: 17.5vw;
				&::before,
				&::after {
					bottom: 0;
					left: 0;
					width: #{'min(31vw, 1200px * 0.31)'};
				}
				#{$details} {
					margin-left: #{'min(31vw, 1200px * 0.31)'};
					height: 100%;
				}
				#{$title} {
					font-size: #{'max(50vw / 37.5, 0.875rem)'};
				}
			}

			&:nth-child(4n) {
				grid-row: span 2;
				&::before,
				&::after {
					height: 17.5vw;
					left: 0;
					right: 0;
				}
				#{$details} {
					margin-top: 17.5vw;
					height: 100%;
				}
			}
		}

		&-details {
			background-color: #fafafa;
			color: #555;
			display: flex;
			flex-direction: column;
			transition: background-color 0.5s cubic-bezier(0.16, 1, 0.3, 1);
			padding: 15px 15px 20px 15px;
			@include media('>=tablet') {
				padding: #{'min(31vw / 12, 1200px * 0.31 / 12)'};
			}
		}
		&:hover #{$details} {
			background-color: #eee;
			color: #333;
		}

		&-subject,
		&-meta {
			text-transform: uppercase;
			font-size: 0.75rem;
			color: #999;
		}
		&-subject {
			padding-bottom: 25px;
			@include media('>=tablet') {
				padding-bottom: #{'min(31vw / 11, 1200px * 0.31 / 11)'};
			}
		}
		&-title {
			font-size: #{'min(100vw / 37.5, 2rem)'};
			@include media('<tablet') {
				font-size: 1.125rem;
				padding-bottom: 60px;
			}
		}
		&-meta {
			@include media('>=tablet') {
				margin-top: auto;
			}
		}
	}
}
</style>
