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
<<<<<<< HEAD
import FogotPasword from "../pages/FogotPassword/Forgotpassword";
import Forgotpassword3 from "../pages/ForgotPassword3/FogotPassword3";
import Forgotpassword4 from "../pages/ForgotPassword4/FogotPassword4";
=======
import InstructorPage from "../pages/InstructorPage/InstructorPage";
>>>>>>> 09a384dec923a768188f78a69ed32d1851d6c782

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
<<<<<<< HEAD
        path: '/fogotPassword',
        page: FogotPasword,
        isShowHeader: false,
        isPrivated: true,
    },
    {
        path: '/fogotPassword2/:id',
        page: Forgotpassword3,
        isShowHeader: false,
        isPrivated: true,
    },
    {
        path: '/fogotPassword3',
        page: Forgotpassword4,
=======
        path: '/system/instructor',
        page: InstructorPage,
>>>>>>> 09a384dec923a768188f78a69ed32d1851d6c782
        isShowHeader: false,
        isPrivated: true,
    },
    {
        path: '*',
        page: NotFoundPage,
    },
]