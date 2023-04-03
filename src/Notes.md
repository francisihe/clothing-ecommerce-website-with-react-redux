1.  Basic installation of react using Vite or similar
3.  Create data source (or categories object)
2.  Install sass (npm add sass)
4.  Create components and extend props
5.  Install React Router (npm install react-router-dom or react-router-dom@6)
6.  Import { BrowserRouter } from "react-router-dom" into the main.jsx file (or wherever your <App /> is rendered)
7.  Wrap the <App /> component with the <BrowserRouter></BrowserRouter> as such:

`
<BrowserRouter>
    <App />
</BrowserRouter>
`

8.  Initially, the App page was rendering the directory, now we want it to render the different routes
9.  Setup the routes folder in the src directory
10. Setup a <Home /> in the route, move the code in the <App /> file into Home to enable you render the <Home /> component instead. Dont forget to fix the relative paths of your imports. Test if it still works fine.
11. Import {Routes, Route} from 'react-router-dom' in the App file
12. You wrap everything with the <Routes></Routes> with <Route /> nested within it.

Note that <Route /> requires a "path" attribute and an "element" attribute. 

"path" points to the url structure after the domain, "element" chooses which component to render as shown below

`
<Routes>
    <Route path='/' element={<Home />}/>
</Routes>
`

NOTE: The parent path "/" is usually to render the navigation component as this is displayed on every page on loading the domain. Now, since the initial page will usually host the Home component as well, you declare this using 'index' and the element as such:

`
<Routes>
    <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
    </Route>
</Routes>
`

13. NOTE: Nested route is also possible. You do this by using an opening and closing tag of <Route></Route>. This makes the nested route path relative to the parent route

14. NOTE: Even when you indicate a relative route within a parent route, the component being rendered on the parent route will still render even if you navigate to the child component path unless you declare an <Outlet /> within the parent component, indicating where you want the other components to render.

15. You import { Outlet } from 'react-router-dom', and declare <Outlet /> within the area you need other sub routes displayed.

Refer to the code sample above, the <Navigation /> component will have the <Outlet /> below the content within the render area to allow every other component be able to display on the app

16. Create the Navigation component under routes. Within the Navigation details, include the <Outlet /> component.

17. Another component that can be imported is {Fragment} and used as <Fragment /> to render stuff to the page. Also can be <></> with the content within

18. { Link } imported from 'react-router-dom' works exactly as anchor elements <a></a> do. It takes the attribute "to" to refer to the browser/url path

<Link className="nav-link" to="/shop">
    Shop
</Link>

19. Create your Navigation component, include the logo, logo image, do proper linking to home page, add links in the navigation bar