const core = require("@actions/core");
const github = require("@actions/github");
const fetch = require("node-fetch");

async function run() {
  const USER_NAME = core.getInput("USER_NAME");
  const P_W = core.getInput("P_W");
  const body = {
    username: "Mangal.jena@performalytic.com",
    password: "12345",
  };

  const dbt_body ={
    "cause": "Triggered via API",
    "git_sha": ""
  }

  const dbtResponse = await fetch(
    "https://cloud.getdbt.com/api/v2/accounts/59838/jobs/82836/run/",
    {
      method: "post",
      body: JSON.stringify(dbt_body),
      headers: { 'Authorization': 'Bearer ' +'dbts_VI8YPnwVLObW4GvtUQX320NhIWBkKqwaYYRt4bargyqEX-OnVkzyzx3w==', "Content-Type": "application/json" },
    }
  );
  const dbt_res = await dbtResponse.json();
  console.log({ dbt_res });


  const TokenFetchResponse = await fetch(
    "http://40.122.209.231/api/v1/users/login-user",
    {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    }
  );
  const Tokendata = await TokenFetchResponse.json();
  const Token = Tokendata.token;

  const response = await fetch(
    "http://40.122.209.231/api/v1/4d/ci/cd/get-table-details-from-schema?offset=0&limit=100&SystemName=PERFORM&SchemaName=DBO",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        cookie: `4dalert-user-token=${Token}`,
      },
    }
  );
  const ResonseData = await response.text();
  console.log("ResonseData : ", ResonseData);

  const GITHUB_TOKEN = core.getInput("GITHUB_TOKEN");
  const octokit = github.getOctokit(GITHUB_TOKEN);

  const { context = {} } = github;
  const { pull_request } = context.payload;

  await octokit.rest.issues.createComment({
    ...context.owner,
    ...context.repo,
    issue_number: pull_request.number,
    body: `Thank you for submitting a pull request! We will try to review this as soon as we can.\n\n${ResonseData}`,
  });
}

run();
