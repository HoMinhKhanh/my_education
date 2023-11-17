import HomePage from "../pages/HomePage/HomePage";
import NewsPage from "../pages/NewsPage/NewsPage";
import CreateNewsPage from "../pages/CreateNewsPage/CreateNewsPage";
import LearningPathsPage from "../pages/LearningPathsPage/LearningPathsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import LessonDetailsPage from "../pages/LessonDetailsPage/LessonDetailsPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import InstructorPage from "../pages/InstructorPage/InstructorPage";
import LearningPathsToanPage from "../pages/LearningPathsToanPage/LearningPathsToanPage";
import LearningPathsSinhPage from "../pages/LearningPathsSinhPage/LearningPathsSinhPage";
import LearningPathsHoaPage from "../pages/LearningPathsHoaPage/LearningPathsHoaPage";
import LearningPathsLyPage from "../pages/LearningPathsLyPage/LearningPathsLyPage";
import LearningPathsAnhPage from "../pages/LearningPathsAnhPage/LearningPathsAnhPage";


export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
    },
    {
        path: '/:type',
        page: TypeProductPage,
        isShowHeader: true,
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false,
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false,
    },
    {
        path: '/product-details/:id',
        page: ProductDetailsPage,
        isShowHeader: true,
    },
    {
        path: '/lesson-details/:id',
        page: LessonDetailsPage,
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
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true,
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivated: true,
    },
    {
        path: '/system/instructor',
        page: InstructorPage,
        isShowHeader: false,
        isPrivated: true,
    },
    {
        path: '/LearningPaths/Toan',
        page: LearningPathsToanPage,
        isShowHeader: true,
    },
    {
        path: '/LearningPaths/Sinh',
        page: LearningPathsSinhPage,
        isShowHeader: true,
    },
    {
        path: '/LearningPaths/Hoa',
        page: LearningPathsHoaPage,
        isShowHeader: true,
    },
    {
        path: '/LearningPaths/Ly',
        page: LearningPathsLyPage,
        isShowHeader: true,
    },
    {
        path: '/LearningPaths/Anh',
        page: LearningPathsAnhPage,
        isShowHeader: true,
    },
    {
        path: '*',
        page: NotFoundPage,
    },
]