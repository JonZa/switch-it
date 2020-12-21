<template>
	<div class="container">
		<nuxt />
	</div>
</template>

<style lang="scss">
@import '@/assets/variables.scss';
@import '@/assets/include-media.scss';
*,
*:before,
*:after {
	box-sizing: border-box;
	margin: 0;
}
body {
	background: #58585b;
	font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif;
	font-size: 16px;
	padding: 50px 0;
	@include media('>=tablet') {
		padding: 150px 0;
	}
}
button {
	font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif;
	font-size: 1rem;
}
hr {
	border: 0;
	height: 2px;
	background: #ccc;
	margin-bottom: 30px;
}
.container {
	margin: 0 auto;
	max-width: 1200px;
	width: calc(100% - 3.375rem);
}
</style>
