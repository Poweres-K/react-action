const core = require("@actions/core");
const github = require("@actions/github");

try {
  const token = core.getInput("token");
  const title = core.getInput("title");
  const body = core.getInput("body");
  const assignee = core.getInput("assignee");

  const octokit = github.getOctokit(token);

  const response = octokit.rest.issues.create({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    title,
    body,
    assignee: assignee ? assignee.split(",") : undefined,
  });

  core.setOutput("issue", JSON.stringify(response.data));
} catch (error) {
  core.setFailed(error.message);
}
