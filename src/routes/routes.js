import Home from "../pages/Home"
import Artists from "../pages/Artists"
import Tags from "../pages/Tags"
import Post from "../pages/Post"
import ArtistPost from "../pages/Artists/ArtistPosts"
import PostDetail from "../pages/Post/PostDetail"


const publicRoutes = [
    { path: '/', component: Home },
    { path: '/artists', component: Artists },
    { path: '/tags', component: Tags },
    { path: '/post', component: Post },
    { path: '/post/:postId', component: PostDetail },
    { path: '/artist/:artistId', component: ArtistPost },

]

export { publicRoutes }

