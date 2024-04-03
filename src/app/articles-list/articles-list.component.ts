import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Article} from '../common/article';
import {ArticleService} from '../common/article.service';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './articles-list.component.html',
  styleUrl: './articles-list.component.css'
})
export class ArticlesListComponent {

  article: Article = {
    id: '',
    name: '',
    price: '',
    contact: '',
    stock: '',
  };

  articles!: Article[];

  constructor(private articleService: ArticleService) {
  }

  ngOnInit() {
    this.articles = this.articleService.getArticles();
  }
  createArticle() {
    const newArticle: Article = {
      id: this.article.id,
      name: this.article.name,
      price: this.article.price,
      contact: this.article.contact,
      stock: this.article.stock
    };
    this.articleService.addArticle(newArticle);
    this.articles = this.articleService.getArticles();
    // Réinitialisation des valeurs des champs de saisie
    this.article = { id: '', name: '', price: '', contact: '', stock: '' };
  }

  deleteArticle(article: Article) {
    this.articleService.deleteArticle(article);
    this.articles = this.articleService.getArticles(); // Mettre à jour la liste des articles après suppression
  }
}
