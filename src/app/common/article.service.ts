import {Injectable} from '@angular/core';
import {Article} from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articles: Article[] = [];
  private deletedArticles: Article[] = [];

  constructor() {
    this.articles = this.getArticles();
    this.deletedArticles = this.getDeletedArticles();
  }

  getArticles(): Article[] {
    const stringData = localStorage.getItem('articles');
    return JSON.parse(stringData || '[]');
  }

  addArticle(article: Article): void {
    this.articles.push(article);
    localStorage.setItem('articles', JSON.stringify(this.articles));
  }

  deleteArticle(article: Article): void {
    const index = this.articles.findIndex((x) => x.id === article.id);
    const deletedArticle = this.articles.splice(index, 1)[0];
    this.deletedArticles.push(deletedArticle);
    localStorage.setItem('articles', JSON.stringify(this.articles));
    localStorage.setItem('deletedArticles', JSON.stringify(this.deletedArticles));
  }

  getDeletedArticles(): Article[] {
    const stringData = localStorage.getItem('deletedArticles');
    return JSON.parse(stringData || '[]');
  }

  restoreArticle(article: Article): void {
    const index = this.deletedArticles.findIndex((x) => x.id === article.id);
    const restoredArticle = this.deletedArticles.splice(index, 1)[0];
    this.articles.push(restoredArticle);
    localStorage.setItem('articles', JSON.stringify(this.articles));
    localStorage.setItem('deletedArticles', JSON.stringify(this.deletedArticles));
  }
}
