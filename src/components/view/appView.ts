import { ApiResponse, Article, Source } from '../../types';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: ApiResponse): void {
        const values: Article[] = data?.articles ?? [];
        this.news.draw(values);
    }

    drawSources(data: ApiResponse): void {
        const values: Source[] = data?.sources ?? [];
        this.sources.draw(values);
    }
}

export default AppView;
