window.Event = new Vue();

Vue.component('tweet-list', {
	data() {
		return {
			name: 'is this',
			username: 'called_progress',
			pic: 'url("/static/images/profpic.jpg")',
			tweets: []
		}
	},
	mounted() {
		axios({
			method: 'GET',
			url: '/tweets/'
		}).then((response) => {
			console.log(response);
			this.tweets = response.data;
		}).catch((response) => {
			console.log(response);
		});
	},
	created() {
		Event.$on("delete", (data) => this.tweets.splice(this.tweets.indexOf(data), 1));
		Event.$on("submit", (data) => this.tweets.splice(0, 0, data[0]));
	},
	methods: {
		deleteTweet : function(tweet) {
			axios({
				method: 'DELETE',
				url: '/tweets/',
				data: {
					pk: tweet.pk
				}
			}).then((response) => {
				console.log(response);
				Event.$emit("delete", tweet);
			}).catch((response) => {
				console.log(response);
			});
		}
	}
});


var app = new Vue({
	delimiters: ['[[',']]'],
	el: '#app',
	data: {
		name: 'is this',
		username: 'called_progress',
		content: '',
		textAreaHeight: '1.2em',
		disabledSubmit: true,
		displaySubmit: 'none',
		headerImg: 'url("/static/images/hacka.jpg")',
		pic: 'url("/static/images/profpic.jpg")',
	},
	watch: {
		'content': function() {
			if(this.content == ''){
				this.disabledSubmit = true;
			}
			else{
				this.disabledSubmit = false;
			}
		}
	},
	methods: {
		postTweet : function() {
			axios({
				method: 'POST',
				url: '/tweets/',
				data: {
					content: this.content
				}
			}).then((response) => {
				console.log(response);
				this.content = '';
				this.displaySubmit = 'none';
				this.disabledSubmit = true;
				this.textAreaHeight = '1.2em';
				Event.$emit("submit", response.data);
			}).catch((response) => {
				console.log(response);
			});
		},
		expand : function() {
			this.textAreaHeight = '4em';
			this.displaySubmit = 'block';
		},
		collapse : function() {
			if(this.content == ''){
				this.displaySubmit = 'none';
				this.textAreaHeight = '1.2em';
			}
		}

	}
})
