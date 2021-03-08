
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Install dependencies

```bash
npm i 
# or
yarn
```

## Running the app

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Testing the app

```bash
npm run test
# or 
yarn test
```

## Enhancement Ideas
- Styled Components - clean up component usage and get rid of the css module styles that come with Next starter. Ideal for a larger more robust app. 
- Enhance the UI with a theme or some color.
- Add more details or outbound links to the results - depends on the use case of the app.
- Type-a-head style search - would need to see if API supports it.
- Pagination/Lazy load results - depends on the overall use case of the app. If it's just to see the top 10 or so then that woudn't matter. 
- Keyboard navigation support.
- Error handling.
- Hooks work in the case, but a larger app would need a store for state management.
- Use authentication for accessing the API.
- Set up API routes in the `api/` folder for the various Github API routes.
