import HomePage from "../pages/HomePage/HomePage";
import NewsPage from "../pages/NewsPage/NewsPage";
import CreateNewsPage from "../pages/CreateNewsPage/CreateNewsPage";
import LearningPathsPage from "../pages/LearningPathsPage/LearningPathsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
    },
    {
        path: '/news',
        page: NewsPage,
        isShowHeader: true,
    },
    {
        path: '/create-news',
        page: CreateNewsPage,
        isShowHeader: true,
    },
    {
        path: '/learning-paths',
        page: LearningPathsPage,
        isShowHeader: true,
    },
    {
        path: '*',
        page: NotFoundPage,
    },
]