# GitLab pipeline guide

This repository now has a `.gitlab-ci.yml` prepared for GitLab CI/CD.

## What the pipeline does

- Runs `lint` and `test`.
- Builds the shared library, the shell, docs, and each microfrontend in separate jobs.
- Uses path-based rules so not every build job runs on every change.
- Packages the `dist/` output into a release artifact.
- Leaves manual deployment jobs for `staging` and `production`.
- Leaves manual smoke checks against `/healthz` after each deployment.
- Includes an optional manual `smoke_e2e` job that runs Playwright against a deployed environment.

This matches the exam intent better than a single monolithic pipeline because each module can fail independently and the release is traceable through artifacts and environments.

## What happens when you change only one area

- If you change only one microfrontend, only that microfrontend build job should run, plus the common validation jobs.
- If you change `projects/core`, multiple build jobs should run because that shared UI library is consumed by shell, docs, and several microfrontends.
- If you change `library/utils`, multiple build jobs should also run because it is imported by shell and multiple microfrontends.
- `lint` and `test` still run as shared validation gates for the whole branch.

This is a good talking point for the exam: the pipeline is no longer one monolithic release path, but shared foundations still correctly fan out to dependent modules.

## What you need to do in GitLab

1. Push the branch to the new remote:

```powershell
git push -u gitlab mono-repo
```

2. Open the project in GitLab and confirm that a runner is available.

The pipeline uses standard container images such as `node:22-bookworm`, `debian:bookworm-slim`, and `curlimages/curl:8.12.1`.

3. If you only want CI for now, you can stop here.

The `lint`, `test`, `build`, and `package_release` jobs should already appear without any extra GitLab configuration.

4. To enable deployments, create these CI/CD variables in `Settings > CI/CD > Variables`:

- `DEPLOY_SSH_HOST`
- `DEPLOY_SSH_PORT`
- `DEPLOY_SSH_USER`
- `DEPLOY_SSH_PRIVATE_KEY`
- `DEPLOY_SSH_KNOWN_HOSTS`
- `STAGING_DEPLOY_PATH`
- `PRODUCTION_DEPLOY_PATH`
- `STAGING_URL`
- `PRODUCTION_URL`
- `E2E_BASE_URL` (optional, for the Playwright smoke suite)

Recommended: mark the private key as protected and masked.

5. Prepare the remote server paths used by the jobs.

Each deploy job expects a directory structure like this on the target server:

```text
<DEPLOY_PATH>/
  releases/
  current -> symlink to the active dist folder
```

The job uploads `release-<sha>.tgz`, extracts it into `releases/<sha>`, and atomically switches the `current` symlink.

6. Point your web server to the `current` symlink.

For example, if `STAGING_DEPLOY_PATH` is `/var/www/capitalflow/staging`, your web server should serve:

```text
/var/www/capitalflow/staging/current
```

That gives you an auditable release history and a near-zero-downtime switch for static assets.

7. After each manual deploy, run the matching smoke job.

The pipeline exposes:

- `smoke_staging`
- `smoke_production`
- `smoke_e2e`

`smoke_e2e` runs the Playwright suite in this repository against the URL stored in `E2E_BASE_URL`. For your Render demo, you can set:

```text
E2E_BASE_URL=https://capitalflow-shell.onrender.com
```

8. Make sure `/healthz` is reachable on each environment URL.

The smoke jobs call:

- `$STAGING_URL/healthz`
- `$PRODUCTION_URL/healthz`

In this repo the Nginx config already exposes `/healthz` for static apps.

## How to explain it in the exam

You can justify this setup like this:

- The old bottleneck was one monolithic pipeline for all teams.
- The new CI splits validation and build by module, reducing cross-team blocking.
- Every pipeline produces auditable artifacts.
- Deployment is automated and repeatable instead of SSHing manually and running scripts by hand.
- Staging can be validated with a smoke check before production promotion.
- The deployed shell can also be validated end to end with Playwright, proving that the remotes load correctly in a browser.
- The production release is promoted manually after validation, which is a reasonable control for regulated clients.
- The symlink switch provides a practical zero-downtime approach for static microfrontend deployments.

## What is still infrastructure-dependent

These parts depend on your company environment and may need a small adjustment:

- The exact deploy directories on the server.
- Whether the runner can reach the target servers over SSH.
- Whether you deploy static files directly or prefer Docker/Kubernetes.
- Whether production deploys should be restricted to protected branches or tags only.

The current `deploy_*` jobs assume static artifact deployment over SSH with a symlink switch.

If the GitLab project uses Kubernetes, Docker Swarm, OpenShift, or a company deployment platform instead of SSH, the `deploy_*` jobs should be adapted to that platform, but the validate/build/package flow can stay as-is.
