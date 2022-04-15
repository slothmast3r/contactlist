## Getting started with project

In the project directory, you can run:

### `npm install`

Installs required packages to run the app. 

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Further development 

I'm not 100% satisfied with the solution. Toggling contact-element is too slow. 
I would improve this by extracting row to new component. Then it would re-render
by specific row (not by whole list).
