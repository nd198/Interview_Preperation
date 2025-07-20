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


