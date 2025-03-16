import { Article } from '../../../types';
import './news.css';

class News {
    private readonly maxArticles: number = 10;

    public draw(data: Article[]): void {
        if (!data.length) {
            console.warn('No news data available.');
            return;
        }

        const news = data.slice(0, this.maxArticles);
        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) {
            console.error("Template element with ID 'newsItemTemp' not found.");
            return;
        }

        news.forEach((article, idx) => {
            const newsClone = this.createNewsElement(newsItemTemp, article, idx);
            fragment.append(newsClone);
        });

        this.renderNews(fragment);
    }

    private createNewsElement(template: HTMLTemplateElement, article: Article, idx: number): DocumentFragment {
        const newsClone = template.content.cloneNode(true) as DocumentFragment;

        const query = <T extends HTMLElement>(selector: string) => newsClone.querySelector<T>(selector);

        query<HTMLElement>('.news__item')?.classList.toggle('alt', idx % 2 === 1);
        query<HTMLElement>('.news__meta-photo')?.setAttribute(
            'style',
            `background-image: url(${article.urlToImage ?? 'img/news_placeholder.jpg'})`
        );
        query<HTMLElement>('.news__meta-author')!.textContent = article.author ?? article.source.name;
        query<HTMLElement>('.news__meta-date')!.textContent = this.formatDate(article.publishedAt);
        query<HTMLElement>('.news__description-title')!.textContent = article.title;
        query<HTMLElement>('.news__description-source')!.textContent = article.source.name;
        query<HTMLElement>('.news__description-content')!.textContent = article.description ?? '';
        query<HTMLAnchorElement>('.news__read-more a')!.href = article.url;

        return newsClone;
    }

    private formatDate(dateStr: string): string {
        return dateStr.slice(0, 10).split('-').reverse().join('-');
    }

    private renderNews(fragment: DocumentFragment): void {
        const newsContainer = document.querySelector('.news');

        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        } else {
            console.error("Element with class 'news' not found.");
        }
    }
}

export default News;
