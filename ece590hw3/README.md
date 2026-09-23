<<<<<<< HEAD
# ece590hw3



## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

* [Create](https://docs.gitlab.com/user/project/repository/web_editor/#create-a-file) or [upload](https://docs.gitlab.com/user/project/repository/web_editor/#upload-a-file) files
* [Add files using the command line](https://docs.gitlab.com/topics/git/add_files/#add-files-to-a-git-repository) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.oit.duke.edu/wy114/ece590hw3.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

* [Set up project integrations](https://gitlab.oit.duke.edu/wy114/ece590hw3/-/settings/integrations)

## Collaborate with your team

* [Invite team members and collaborators](https://docs.gitlab.com/user/project/members/)
* [Create a new merge request](https://docs.gitlab.com/user/project/merge_requests/creating_merge_requests/)
* [Automatically close issues from merge requests](https://docs.gitlab.com/user/project/issues/managing_issues/#closing-issues-automatically)
* [Enable merge request approvals](https://docs.gitlab.com/user/project/merge_requests/approvals/)
* [Set auto-merge](https://docs.gitlab.com/user/project/merge_requests/auto_merge/)

## Test and Deploy

Use the built-in continuous integration in GitLab.

* [Get started with GitLab CI/CD](https://docs.gitlab.com/ci/quick_start/)
* [Analyze your code for known vulnerabilities with Static Application Security Testing (SAST)](https://docs.gitlab.com/user/application_security/sast/)
* [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/topics/autodevops/requirements/)
* [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/user/clusters/agent/)
* [Set up protected environments](https://docs.gitlab.com/ci/environments/protected_environments/)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thanks to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README

Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
=======
# ECE 590 HW3 — React Weather App

## Setup

```bash
cd ece590hw3

cd server
npm install

cd ../client
npm install
cp .env.example .env
```

`.env` already includes a WeatherAPI key if you copy `.env.example`. To use your own key, edit `client/.env`:

```
VITE_WEATHER_API_KEY=your-weatherapi-key
VITE_API_URL=http://localhost:4000
```

## Start

**Terminal 1 — favorites API (port 4000):**

```bash
cd server
npm run dev
```

If `nodemon` fails with a file-watch error (`EMFILE`), start the API directly:

```bash
cd server
npx ts-node src/server.ts
```

**Terminal 2 — React app:**

```bash
cd client
npm run dev
```

Open the URL Vite prints (usually [http://localhost:5173](http://localhost:5173)).

The React app calls `http://localhost:4000/favorites` for saved zip codes and [WeatherAPI](https://www.weatherapi.com/) for current conditions and the 3-day forecast.

## How to use

1. Enter a US zip code (default `27513`) and click **Get Forecast**.
2. Toggle **Switch to Metric** / **Switch to Imperial** for C/KPH vs F/MPH.
3. Click **Add to Favorites** to save the zip on the server.
4. Use **Go to favorite** to load a saved zip. The location line then includes the zip, matching the Figma "Displaying a Favorite" frame.
5. Click **Delete Favorite** to remove the selected favorite.

## Project layout

| Path | Role |
|------|------|
| `server/` | Express favorites API with CORS |
| `client/` | Vite + React 19 + TypeScript UI |
| `client/.env` | WeatherAPI key and API base URL (`VITE_*`) |

## API

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/favorites` | List all favorites |
| `POST` | `/favorites` | Add `{ "zip": "27513" }` |
| `DELETE` | `/favorites/:id` | Remove a favorite by id |
>>>>>>> 4634556 (ECE 590 HW3: React weather app and favorites API)
