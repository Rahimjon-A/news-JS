export interface Article {
    source: { id: string | null; name: string };
    author?: string;
    title: string;
    description?: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
    content?: string;
}

export interface Source {
    id: string;
    name: string;
    description?: string;
    url: string;
    category?: string;
    language?: string;
    country?: string;
}

export interface ApiResponse {
    status: string;
    totalResults?: number;
    articles?: Article[];
    sources?: Source[];
}
