import { bootstrap } from "@angular/platform-browser-dynamic";
import { Component } from "@angular/core";

@Component({
	selector: "reddit-article",
	inputs: ['article'],
	host: {
		class: 'row',
	},
	template: `
		<div class="four wide column center aligned votes">
			<div class="ui statistic">
				<div class="value">
					{{ article.votes }}
				</div>
				<div class="label">
					Points
				</div>
			</div>
		</div>
		<div class="twelve wide column">
			<a class="ui large header" href="{{ article.link }}">
				{{ article.title }}
			</a>
			<ul class="ui big horizontal list voters">
				<li class="item">
					<a href (click)="voteUp()">
						<i class="arrow up icon"></i>
							upvote
					</a>
				</li>
				<li class="item">
					<a href (click)="voteDown()">
						<i class="arrow down icon"></i>
							downvote
					</a>
				</li>
			</ul>
		</div>

	`
})

class ArticleComponent {
	article : Article;
	constructor() {
		this.article = new Article("WutFace", "http://google.com", 30);
	}

	voteUp() {
		this.article.voteUp();
		return false;
	}

	voteDown() {
		this.article.voteDown();
		return false;
	}
}

class Article {
	votes: number;
	title: string;
	link: string;
	constructor(title: string, link: string, votes?: number) {
		this.title = title;
		this.link = link;
		this.votes = votes || 0;
	}

	voteUp(): void {
		this.votes += 1;
	}

	voteDown(): void {
		this.votes -= 1;
	}
}

@Component ({
	selector: 'reddit',
	directives: [ArticleComponent],
	template: `
	<form class="ui large form segment">
		<h3 class="ui header">Add a link</h3>
			<div class="field">
				<label for="title">Title:</label>
				<input name="title" #newtitle>
			</div>
			<div class="field">
				<label for="link">Link:</label>
				<input name="link" #newlink>
			</div>

			<button (click)="addArticle(newtitle, newlink)" class="ui positive right floated button">
			Submit link
			</button>
			<div class="ui grid posts">
				<reddit-article *ngFor="let article of sortedArticles()" [article] = "article"></reddit-article>
			</div>
	</form>
	`
})

class HelloWorld {
	articles : Article[];
	constructor() {
		this.articles = [
		new Article("WutFace", "http://google.com", 30),
		new Article("4Head", "http://google.com", 50),
		new Article("EleGiggle", "http://google.com", 40)
		];
	}

	sortedArticles(): Article[] {
		return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
	}

	addArticle(title: HTMLInputElement, link: HTMLInputElement): void {
		console.log(`Add title: ${title.value} and link: ${link.value}`);
		this.articles.push(new Article(title.value, link.value));
	}
}
bootstrap(HelloWorld);