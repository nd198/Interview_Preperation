**What is react** 
    > Javascript liberary to build dynamic and interactive user interface. 
    > used to create single page application 
    > react is declarative

**Working of DOM** 
    > browser takes the HTML and beutify with the help of css and create the DOM 
    > with the help of javascript we made it more interactive

**Extension For VS code** 
    > Live Server 
    > live Preview 
    > prettier

**Create the react APP**
    > official tool CRA(create react app via command line)
    > vite is moder tool to create react app
    > vite produces quick and small bundle size
    > vite uses npm run dev to launch dev server
    > use npm start for CRA

**Steps to create project with vite**   
    > npm create vite@latest
    > follow the steps
    > cd react-project-with-prashant
    > npm install
    > npm run dev

**React folder structure**   
    > Node modules
    > public directory/ contain static files that don't change
    > src : main folder of the react
      > component
      > assets : images, fonts and other static files
      > style : css or stylesheet 
    >   vite.config.js: contains the vite config

**Class VS Functional Componenet**    
    **Class Based:-** 
        > stateful : can manage state
        > lifecycle : Access to life cycle method
        > verbose : more boilerplat code
        not preffered anymore
    **Functional Component**  
        > initially stateless
        > can use hooks for satete and effects
        > simpler and mpre concise
        > most popular 

**Exporting Component**    
   **Default Export** -   

   **Named Export** - 
    > Allow exporting multiple itemsfrom a module
    > Importing : to use an exported

**What is fragment**  

**what is map method in react and it's purpose**

**what is key prop**

**conditional Rendering**

**css module**

**what is Container in React(container.children) -  passing children**

**Handling Event**

**how can we make React APp faster**
    > Lazy Loading - Lazy loading is a performance optimization technique used to split your code into smaller chunks and load them only when they are actually needed.
    `const LazyDashboard = React.lazy(() => import('./Dashboard'));` // The import() function returns a promise.

    `<Suspense fallback={<div>Loading... Please wait.</div>}>
    <LazyDashboard/> // then pass the component which want to lazy load
    </suspense>`

    > use memo hook whwnenver doing the complex task


**What is difference between server side rendering and client side rendering** 
    **What is Server-Side Rendering (SSR)?**
    Server-Side Rendering is the traditional method of rendering web pages. In this approach, when a user requests a page, the server is responsible for generating the full HTML content of the page. This complete HTML file, including all the necessary data, is then sent to the user's browser, which simply has to display it.
    **The SSR Process:**
    1) A user clicks on a link or types a URL into their browser.
    2) A request is sent to the server.
    3) The server processes the request, gathers any required data from databases or APIs, and generates the complete HTML for the page.
    4) The fully rendered HTML is sent back to the client's browser.
    5) The browser receives the HTML and displays it. Any necessary JavaScript is then downloaded and executed to make the page interactive.[1]
    **What is Client-Side Rendering (CSR)?**
    Client-Side Rendering is a more modern approach where the rendering of a web page is handled by the user's browser using JavaScript. When a user requests a page, the server sends a minimal HTML file, which acts as a shell, along with the necessary JavaScript files.
    **The CSR Process:**
    1) A user clicks on a link or types a URL.
    2) The server responds with a basic HTML file with links to JavaScript files.[2]
    3) The user's browser downloads the HTML and then the JavaScript.
    4) Once the JavaScript is downloaded and executed, it fetches any necessary data and generates the content of the page directly within the browser.[3]
    5) The page becomes visible and interactive.

**Key Features of react**
    **1. Architectural Strength and Scalability**
        One of the most significant benefits of React is its component-based architecture.[1] This approach encourages you to build encapsulated components that manage their own state, which you can then compose to create complex UIs.[3] For a senior developer, this translates to:

        Enhanced Maintainability and Scalability: As applications grow, a modular structure is crucial.[1] React's architecture allows you to update or modify individual components without affecting the rest of the application, simplifying maintenance and scaling.[1][2] This is a huge advantage in large-scale, data-driven applications.[3][4]

        Code Reusability: Building a library of reusable UI elements saves significant development time and ensures consistency across large projects.[1][4] Instead of rewriting code, you can leverage existing components, boosting productivity.[5][6]

    **2. Performance Optimization at Its Core**
        React is designed with performance in mind.[5][7] For experienced developers, the library provides sophisticated tools to build highly responsive applications:

        The Virtual DOM: React's use of a Virtual DOM is a key performance feature.[1][4] It creates an in-memory representation of the UI, and when the state of an object changes, it updates the Virtual DOM first. Then, it intelligently compares the Virtual DOM with the real DOM and only updates the necessary elements. This process, known as reconciliation, minimizes direct DOM manipulation, which is often a performance bottleneck.[8]

        Advanced Optimization Hooks and Techniques: Senior developers can leverage powerful features to fine-tune performance. This includes:

        Memoization with React.memo, useMemo, and useCallback to prevent unnecessary re-renders of components and expensive calculations.[9][10]

        Code-splitting and lazy loading to break down large application bundles into smaller chunks that are loaded on demand, significantly improving initial load times.[9][11]

        List virtualization, or "windowing," for rendering long lists of data efficiently by only displaying the items currently visible on the screen.[8][9][12]
    **3. A Rich and Mature Ecosystem**
        The React ecosystem is vast and mature, offering a rich landscape of tools and libraries that experienced developers can leverage to build robust applications.[4][13] This ecosystem provides solutions for nearly every aspect of development:

        State Management: For complex applications, libraries like Redux and Zustand offer powerful and predictable state management solutions.[1][13]
        Routing: React Router is a standard choice for handling navigation in single-page applications.[13][14]

        Frameworks for Advanced Features: Frameworks like Next.js extend React's capabilities with features like Server-Side Rendering (SSR) and Static Site Generation (SSG), which are crucial for SEO and initial page load performance.[3][10][14]
        Developer Tools: The React Developer Tools, available as a browser extension, provide invaluable assistance for debugging and profiling component performance.[2][10]

    **4. Flexibility and Developer Experience**
        React's flexibility is a significant advantage, as it doesn't lock you into a rigid framework.[3][5] This allows you to choose the libraries and architecture that best fit your project's needs.[1] The developer experience is also a key focus, with features designed to make development more intuitive and efficient.[3]

    **5. Strong Community and Corporate Backing**
        Backed by Meta (formerly Facebook) and a massive global community, React benefits from continuous development, long-term support, and a wealth of resources like tutorials and forums.[2] This strong backing ensures the library remains stable and up-to-date with the latest web standards.[3]
        
    **6. Career Opportunities**
        As one of the most popular web frameworks worldwide, proficiency in React is a highly sought-after skill.[15] For a senior developer, this translates to a wide range of career opportunities and the ability to work on modern, challenging projects.    


