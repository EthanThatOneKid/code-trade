const ghpages = require('gh-pages');
const { exec } = require('child_process');
require('dotenv').config();

const {
  GITHUB_USERNAME,
  GITHUB_NAME,
  GITHUB_EMAIL,
  PROJECT_NAME
} = process.env;

const deployURL = `https://${GITHUB_USERNAME}.github.io/${PROJECT_NAME}`.toLowerCase();

exec(
  `sapper export --basepath ${PROJECT_NAME} --legacy`,
  (error, stdout, stderr) => {

    if (error !== null) {
      return console.error({ error, stderr });
    } else {
      console.log(stdout);
      console.log("Deploying to GitHub Pages...");
    }

    ghpages.publish(
      `__sapper__/export/${PROJECT_NAME}`,
      {
        branch: 'gh-pages',
        repo: `https://github.com/${GITHUB_USERNAME}/${PROJECT_NAME}.git`,
        user: {
          name: GITHUB_NAME,
          email: GITHUB_EMAIL
        }
      },
      () => {
        const success = `Project '${PROJECT_NAME}' has been deployed to '${deployURL}'`;
        console.log(success);
      }
    );

});