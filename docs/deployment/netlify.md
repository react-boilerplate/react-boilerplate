# Deploy to Netlify

Netlify is a static site host that deploys from Git repos. To deploy a `react-boilerplate` app from Netlify, you can leverage their continuous deployment feature. All you have to do is push to your repo and Netlify will [run your production build script](https://docs.netlify.com/configure-builds/get-started/).

_Step 1:_ Follow react-boilerplate's [quick start instructions](https://github.com/react-boilerplate/react-boilerplate#quick-start)

_Step 2:_ Create a Git repo for your project on one of the supported hosts (i.e. GitHub)

_Step 3:_ Create a new project on Netlify by logging in via your Git host and selecting the repo you just made

_Step 4:_ In your local repo, change the remote from `react-boilerplate`'s to your own (i.e. `git remote set-url origin https://github.com/USERNAME/REPOSITORY.git`)

_Step 5:_ Go to the **Build & deploy** section of the project settings. For "Build command," enter `npm run build`. For "Publish directory," enter `build`.

_Step 6:_ Commit and push. Netlify detects the push, builds the project, and deploys the results.
