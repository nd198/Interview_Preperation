# React, Angular & Build Tooling — Interview Prep
*(8+ years experience — Senior Specialist level)*

Answers below are written the way a senior candidate should frame them: concise, opinionated, with trade-offs called out. Adapt the specifics to match your own project experience — interviewers value real examples more than textbook definitions.

---

## PART 1 — React (Advanced)

### 1. How does React's reconciliation algorithm work, and what is the role of keys?
React uses a **diffing algorithm** that compares the new virtual DOM tree with the previous one, using heuristics to avoid an O(n³) comparison:
- Elements of different types produce entirely new trees (old subtree unmounted, new one mounted)
- Elements of the same type are compared attribute-by-attribute, and children are diffed recursively
- **Keys** help React identify which items in a list changed, were added, or removed, instead of re-rendering the entire list. Using array index as a key is an anti-pattern when list order can change, because it causes incorrect DOM reuse and can lead to state bugs in list items (e.g., input fields keeping stale values).

**Follow-up they may ask**: "What's Fiber?" — Fiber is React's reimplementation of the reconciler (since React 16) that breaks rendering work into units, enabling interruption, prioritization, and concurrent rendering.

---

### 2. Explain the difference between `useMemo`, `useCallback`, and `React.memo`. When would overusing them hurt you?
- `useMemo` memoizes a **computed value** between renders, recalculating only when dependencies change
- `useCallback` memoizes a **function reference**, useful to prevent unnecessary re-renders of child components that receive callbacks as props
- `React.memo` wraps a component to skip re-rendering if props haven't shallow-changed

**Mature answer on trade-offs**: These aren't free — memoization itself costs memory and comparison overhead. Overusing them on cheap components adds complexity without performance benefit, and can introduce bugs when dependency arrays are stale or incomplete. I only reach for these after profiling with React DevTools shows an actual re-render bottleneck, not preemptively.

---

### 3. How would you handle global state in a large-scale React application? Compare Context API, Redux, Zustand/Recoil.
- **Context API**: good for low-frequency updates (theme, auth user, locale). Causes re-renders of all consumers on any change — not ideal for high-frequency state like form data or real-time updates.
- **Redux (with Redux Toolkit)**: predictable, testable, great devtools, good for complex cross-cutting state with time-travel debugging needs. Adds boilerplate and a learning curve, though RTK reduced this significantly.
- **Zustand/Recoil/Jotai**: lighter-weight, less boilerplate, more granular subscriptions (avoids the "re-render everything" problem of Context). Good middle ground for medium-large apps.

**Mature framing**: I choose based on update frequency and team familiarity, not on hype. For a workflow/dashboard-heavy app (relevant to GOC's automation focus), I'd lean toward Redux Toolkit or Zustand for predictable state transitions tied to backend-driven workflows, and Context only for static app-level config.

---

### 4. What are React Server Components (RSC), and how do they differ from SSR?
- **SSR** renders the full component tree to HTML on the server for the initial load, then hydrates on the client — the whole tree still ships as JS.
- **RSC** allows components to run *only* on the server and never ship their JS to the client at all, reducing bundle size. Server components can't use hooks like `useState`/`useEffect` since they don't run on the client. Client components are explicitly marked (`"use client"` in Next.js).

**Trade-off to mention**: RSC is powerful for reducing bundle size and data-fetching waterfalls, but adds architectural complexity in deciding the server/client boundary, and is tightly coupled to frameworks like Next.js currently.

---

### 5. How does React's concurrent rendering (`useTransition`, `useDeferredValue`) improve UX?
These APIs let you mark updates as **non-urgent**, so React can interrupt them in favor of more urgent updates (like user typing):
- `useTransition` wraps state updates that can be deprioritized (e.g., filtering a large list)
- `useDeferredValue` defers using a value until urgent renders complete, useful for keeping an input responsive while a heavy list re-renders behind it

**Mature answer**: I've used this pattern for search-as-you-type against large datasets — keeping the input field responsive while the filtered list update is deprioritized, avoiding the need for manual debouncing in some cases.

---

### 6. How do you approach performance profiling and optimization in a large React app?
1. Use **React DevTools Profiler** to identify components with expensive/frequent re-renders
2. Check for unnecessary re-renders due to inline object/array/function props breaking memoization
3. Use **code splitting** (`React.lazy` + `Suspense`) to reduce initial bundle size
4. Virtualize long lists (`react-window`/`react-virtualized`)
5. Audit unnecessary context re-renders
6. Use the browser's Performance tab for actual paint/layout thrashing, not just React-level metrics

---

### 7. Explain error boundaries. Why can't they catch errors in event handlers?
Error boundaries are components implementing `componentDidCatch`/`getDerivedStateFromError` that catch errors during **render, lifecycle methods, and constructors** of their child tree, showing a fallback UI instead of crashing the whole app.

They **don't** catch errors in event handlers, async code, or SSR, because those happen outside React's render cycle — for those, use regular try/catch or promise `.catch()`.

---

### 8. Testing: how do you approach testing React components at a senior level?
- **Unit tests** for pure logic/hooks (Jest/Vitest)
- **Component tests** with React Testing Library — testing behavior/output, not implementation details (avoid testing internal state directly)
- **Integration tests** for flows spanning multiple components
- **E2E** with Cypress/Playwright for critical user journeys
- Mature point to make: I prioritize testing user-facing behavior over implementation detail, so tests survive refactors. I also treat flaky E2E tests as a maintenance cost to actively manage, not ignore.

---

## PART 2 — Angular (Advanced)

### 1. Explain Angular's change detection mechanism and Zone.js's role.
Angular runs **change detection** by walking the component tree and checking bindings for changes. **Zone.js** monkey-patches async APIs (setTimeout, promises, DOM events) so Angular knows *when* to trigger change detection automatically, without you manually calling it.

**Advanced follow-up**: With `OnPush` change detection strategy, a component only re-checks when its `@Input()` reference changes, an event originates from within it, or an observable it's subscribed to (via async pipe) emits — this significantly reduces unnecessary checks in large apps.

**Zoneless Angular** (newer versions) removes Zone.js entirely, relying on signals for fine-grained reactivity instead of dirty-checking the whole tree — worth mentioning if the interviewer is testing awareness of recent Angular direction.

---

### 2. What are Angular Signals, and how do they change state management?
Signals are a **reactive primitive** introduced to provide fine-grained reactivity without relying on Zone.js or RxJS for simple state. A signal wraps a value; reading it in a template automatically tracks it as a dependency, and updating it triggers only the affected view updates — not a full component tree check.

**Mature framing**: Signals reduce boilerplate compared to RxJS for simple local state, and pair well with `computed()` and `effect()` for derived state. RxJS is still better suited for complex async streams (websockets, debounced search, combining multiple async sources) — I'd use signals for local UI state and RxJS for genuinely asynchronous data flows.

---

### 3. Compare NgModules vs Standalone Components. Why did Angular move to standalone?
- **NgModules** require declaring components/directives/pipes in a module, importing/exporting explicitly — powerful but verbose, and a common source of confusion for import cycles.
- **Standalone components** (default since Angular 17+) let a component declare its own dependencies directly, removing the NgModule requirement, simplifying lazy loading and reducing boilerplate.

**Mature answer**: Standalone simplifies the mental model, especially for teams new to Angular, and improves tree-shaking since dependencies are explicit per-component rather than bundled at module level.

---

### 4. Explain Angular's Dependency Injection hierarchy.
Angular DI is hierarchical:
- **Root injector** (`providedIn: 'root'`) — singleton across the app
- **Module-level injector** — scoped to a lazy-loaded module
- **Component-level injector** — a new instance per component instance, useful for isolating state (e.g., a form service scoped to a single form component)

**Trade-off to discuss**: Providing a service at component level vs root affects whether state is shared or isolated — I've used component-level providers deliberately to avoid state leakage between multiple instances of the same reusable component (e.g., multiple independent wizard/forms on the same page).

---

### 5. RxJS: explain the difference between `switchMap`, `mergeMap`, `concatMap`, and `exhaustMap`, with real use cases.
- `switchMap`: cancels the previous inner observable when a new value arrives — ideal for **typeahead search** (cancel stale requests)
- `mergeMap`: runs all inner observables concurrently — good for **parallel independent requests** (e.g., uploading multiple files)
- `concatMap`: queues inner observables, running them **strictly in order** — good when order matters (e.g., sequential form submission steps)
- `exhaustMap`: ignores new emissions while an inner observable is active — good for **preventing double-submit** on a button click

This is a very common senior-level question, and giving a concrete use case per operator (not just the definition) signals real production experience.

---

### 6. How do you handle memory leaks in Angular with RxJS subscriptions?
- Prefer the **async pipe** in templates — it auto-unsubscribes
- Use `takeUntil(this.destroy$)` pattern with a `Subject` triggered in `ngOnDestroy`
- Newer Angular versions support `takeUntilDestroyed()` from `@angular/core/rxjs-interop`, tied to the component's `DestroyRef` — cleaner than manual `Subject` management
- Avoid subscribing manually inside components when the async pipe or signals can handle it declaratively

---

### 7. What's the difference between `OnPush` and default change detection, and when would you NOT use OnPush?
`OnPush` skips checking a component unless: an `@Input` reference changes, an event fires within it, or an observable bound via async pipe emits. This is a major performance lever in large apps.

**When not to use it blindly**: If a component relies on mutating objects/arrays in place (rather than creating new references), `OnPush` will miss those changes — this is the most common bug when adopting `OnPush` in an existing codebase. Requires disciplined immutability.

---

### 8. How would you architect a large Angular app for maintainability (module boundaries, lazy loading, shared libraries)?
- Feature-based folder structure with **lazy-loaded feature modules/routes** to keep initial bundle small
- A **shared/core module** for singleton services, guards, interceptors
- A **shared UI library** (or Nx-based monorepo) for reusable components across features/apps
- Strict use of interfaces/DTOs at API boundaries, with a dedicated data-access layer (facade pattern) so components don't call HTTP services directly

---

## PART 3 — Build Tools & Frontend Infrastructure

### 1. Compare Webpack vs Vite. Why has Vite become popular?
- **Webpack**: bundles everything upfront (even in dev), which slows dev server startup on large apps. Highly configurable, mature plugin ecosystem.
- **Vite**: uses native **ES modules in dev** (no bundling needed until build), giving near-instant server start and fast HMR. Uses esbuild for dev, Rollup for production builds.

**Mature answer**: For new projects I'd default to Vite for developer experience, but for legacy large apps already deeply configured around Webpack, the migration cost needs to be weighed against the DX gain.

---

### 2. Explain code splitting, tree shaking, and lazy loading — how do they reduce bundle size?
- **Tree shaking**: removes unused exports during bundling — relies on ES module static analysis, which is why side-effect-free, ESM-authored libraries tree-shake better than CommonJS ones
- **Code splitting**: breaks the bundle into smaller chunks loaded on demand (route-based or component-based via dynamic `import()`)
- **Lazy loading**: defers loading a chunk until it's actually needed (e.g., a route or a heavy modal component)

**Practical point**: I'd mention using `webpack-bundle-analyzer` or Vite's build visualizer to actually identify what's bloating the bundle rather than guessing.

---

### 3. What's Module Federation, and when would you use it?
Module Federation (Webpack 5+) allows multiple independently built and deployed applications to **share code at runtime** — enabling micro-frontend architectures where different teams ship separate apps that compose into one at runtime.

**Trade-off to raise**: Powerful for large orgs with independent team deployment cycles, but adds real complexity — versioning shared dependencies, runtime failure handling if a remote is down, and debugging across app boundaries. I'd only reach for it when team/deployment independence is a genuine organizational need, not just for "microservices for the frontend" as a trend.

---

### 4. How do you optimize a CI/CD pipeline for a large frontend monorepo?
- **Incremental builds/caching** — only rebuild/retest what changed (Nx, Turborepo affected-graph detection)
- **Parallelize** lint/test/build stages across CI runners
- **Cache `node_modules`/build artifacts** between runs
- Separate **fast feedback loop** (lint, unit tests, type-check) from slower **E2E/integration** stages, gating merges only on the fast loop where reasonable
- Use **preview deployments** per PR for visual/QA review before merge

---

### 5. How would you approach migrating a legacy Angular/React app to a newer version or architecture with minimal downtime?
- Strangler-fig approach: new features built in the new pattern/version, old code migrated incrementally rather than a big-bang rewrite
- Maintain a **compatibility layer** (e.g., Angular's `ngUpgrade` for AngularJS→Angular, or feature-flagged component boundaries in React)
- Strong test coverage on legacy code *before* touching it, to catch regressions
- Communicate risk/timeline clearly to stakeholders — senior-level answers here should show awareness of business risk, not just technical steps

---

## Interview Tips for This Section
- For every "compare X vs Y" question, always close with a **decision framework** ("I'd choose X when... and Y when..."), not just a feature list — this is what signals seniority
- Have **1-2 concrete war stories** ready per framework (a performance bug you fixed, a migration you led, a state-management decision you made and why)
- If you haven't used a newer feature (Signals, RSC) hands-on, it's fine to say so honestly and describe your conceptual understanding — don't overclaim production experience you don't have
