# Render demo guide

This guide is for a full demo deployment of the shell, remotes, analytics, and docs on Render.

## Important limitation

Render free web services share a limited pool of free instance hours each month. That means deploying every service as a free web service is good for a demo, but not for leaving the full platform online all month.

For the exam, this is acceptable as a demonstration environment.

## What was prepared in the repo

- `shell/webpack.prod.config.ts` now reads remote URLs from environment variables.
- `deploy/docker/shell.Dockerfile` now accepts Render environment variables during image build.
- `deploy/nginx/spa.conf` now allows HTTPS remotes instead of only localhost.
- `render.yaml` defines all Render services with Docker deploys and path-based build filters.

## Recommended deploy order

1. Connect the GitLab repository to Render.
2. Create the remote services first:
   - `capitalflow-mfe-auth`
   - `capitalflow-mfe-payments`
   - `capitalflow-mfe-treasury`
   - `capitalflow-mfe-compliance`
   - `capitalflow-mfe-onboarding`
   - `capitalflow-mfe-admin`
   - `capitalflow-mfe-analytics`
   - optional: `capitalflow-docs`
3. Note the `onrender.com` URL of each deployed service.
4. Create or update `capitalflow-shell` last.
5. Set the shell environment variables with those public URLs.
6. Redeploy `capitalflow-shell`.

## Step by step in Render

### Option A: use the Blueprint

1. In Render, click `New +`.
2. Choose `Blueprint`.
3. Connect your GitLab repository.
4. Select the branch `mono-repo`.
5. Render will detect `render.yaml`.
6. Review the services and create them.

The shell service is created with placeholder values. After creation, you must replace them.

### Option B: create services manually

For each service:

1. Click `New +`.
2. Choose `Web Service`.
3. Connect the same GitLab repository.
4. Select branch `mono-repo`.
5. Choose `Docker`.
6. Set the corresponding Dockerfile:
   - `deploy/docker/shell.Dockerfile`
   - `deploy/docker/mfe-auth.Dockerfile`
   - `deploy/docker/mfe-payments.Dockerfile`
   - `deploy/docker/mfe-treasury.Dockerfile`
   - `deploy/docker/mfe-compliance.Dockerfile`
   - `deploy/docker/mfe-onboarding.Dockerfile`
   - `deploy/docker/mfe-admin.Dockerfile`
   - `deploy/docker/mfe-analytics.Dockerfile`
   - `deploy/docker/docs.Dockerfile`
7. Set `Docker Build Context` to `.`
8. Set the plan to `Free`
9. Set `Health Check Path` to `/healthz`
10. Create the service

## Shell environment variables

In the `capitalflow-shell` service, go to `Environment` and set:

- `MFE_PAYMENTS_URL=https://<payments-service>.onrender.com`
- `MFE_TREASURY_URL=https://<treasury-service>.onrender.com`
- `MFE_AUTH_URL=https://<auth-service>.onrender.com`
- `MFE_COMPLIANCE_URL=https://<compliance-service>.onrender.com`
- `MFE_ONBOARDING_URL=https://<onboarding-service>.onrender.com`
- `MFE_ADMIN_URL=https://<admin-service>.onrender.com`
- `ANALYTICS_ELEMENT_URL=https://<analytics-service>.onrender.com/analytics-element.js`

Then choose `Save, rebuild, and deploy`.

## What to verify after deploy

Open the shell URL and check:

- `/` loads correctly
- `/payments`
- `/treasury`
- `/auth`
- `/compliance`
- `/onboarding`
- `/admin`
- `/analytics`

Also verify:

- each remote answers on `/healthz`
- the shell answers on `/healthz`
- the browser console has no CSP or remote loading errors

## What to say in the demo

- Each microfrontend is independently deployable.
- The shell resolves remote production URLs from environment variables.
- Docker packaging is part of the delivery path.
- The monorepo is still optimized with path-based rebuild triggers.
- Shared library changes fan out to dependent services.
- The setup is demo-friendly on Render and production-ready in concept, but real production would usually move to paid infrastructure or a container platform.
