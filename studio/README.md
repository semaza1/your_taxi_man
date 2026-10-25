# Your Taxi Man — Sanity Content Studio

This directory contains the standalone Sanity Content Studio for **Your Taxi Man**, managing editorial articles, scenic road trip stories, and announcements for the future Journal/Posts page.

---

## 🛠️ Prerequisites & Sanity Dashboard Setup

1. **Sign in or Create an Account**: Go to [sanity.io](https://www.sanity.io/) and log in (or sign up with GitHub/Google).
2. **Create a Project**:
   - Navigate to [sanity.io/manage](https://www.sanity.io/manage) and click **Create project** (or use `npx sanity init`).
   - Project Name: `Your Taxi Man` (or `your-tax-man`)
   - Dataset: Choose the default `production` dataset.
3. **Retrieve Project Credentials**:
   - From your project dashboard at [sanity.io/manage](https://www.sanity.io/manage), locate your **Project ID** (e.g. `a1b2c3d4`).
4. **Configure CORS Origins**:
   - In [sanity.io/manage](https://www.sanity.io/manage) -> Project -> **API** -> **CORS Origins**:
   - Add `http://localhost:3333` (Sanity Studio local dev server).
   - Add `http://localhost:5173` (Website local dev server).
   - Add `https://yourtaximan.vercel.app` (Production website).
   - Allow credentials: **Yes** for Studio origin.

---

## 🔐 Environment Variables

Create a local environment file in this directory:
```bash
cp .env.example .env.local
```

Populate `.env.local` with your credentials:
```env
SANITY_STUDIO_PROJECT_ID="your_sanity_project_id"
SANITY_STUDIO_DATASET="production"
```

> **Security Note**: Never commit `.env` or `.env.local` to git. Write tokens are never required for frontend reading; only public `projectId` and `dataset` are accessed.

---

## 🚀 Running the Studio Locally

Inside the `studio/` directory:

```bash
# Install Studio dependencies (first time only)
npm install

# Start local Sanity Studio dev server (runs at http://localhost:3333)
npm run dev
```

Alternatively, from the repository root:
```bash
npm run studio:dev
```

Open [http://localhost:3333](http://localhost:3333) in your browser and sign in with your Sanity credentials.

---

## 📦 Content Schema: Post (`post`)

The Studio includes a dedicated `Journal Post` document schema configured with:

| Field | Type | Description |
|---|---|---|
| **Title** | `string` | Headline for the journal article |
| **Slug** | `slug` | Auto-generated from title for clean URL routing |
| **Cover Image** | `image` | Main photo with crop/hotspot, mandatory `alt` text, and optional `caption` |
| **Excerpt** | `text` | Short 1-2 sentence preview summary for cards & meta tags |
| **Body** | `array` (block) | Rich Portable Text with headings (H2-H4), quotes, lists, links, & inline photos |
| **Category** | `string` | Dropdown (`rwanda-travel`, `airport-mobility`, `chauffeur-stories`, `travel-tips`, `corporate-mobility`) |
| **Published Date** | `datetime` | Date/time post was published |
| **Instagram URL** | `url` | Optional link to original @your_taxi_man Instagram post |
| **Featured** | `boolean` | Toggle to highlight post at the top of the Journal |

### Publishing Workflow
Sanity's native draft/publish workflow is supported out of the box:
- Edits are automatically saved as `drafts.<id>` and are not visible on the public website.
- Clicking the green **Publish** button promotes the draft to published status.
- No redundant custom status field is needed.

---

## 🧪 Sample Demonstration Content

A clearly marked demonstration post is available in `studio/data/sample-post.ndjson` and `studio/data/sample-post.json`:
- **Title**: `[Demonstration Post] Scenic Journey: Kigali to Volcanoes National Park`
- **Purpose**: Safe test content to verify schema validation and frontend rendering.
- Contains **no invented personal facts** about the business owner.
- Can be imported using the Sanity CLI:
  ```bash
  npx sanity dataset import data/sample-post.ndjson production
  ```
  Or easily created, edited, or deleted directly in the Studio interface.

---

## 🌐 Deploying the Studio

You can deploy Sanity Studio to Sanity's free managed hosting:
```bash
npm run deploy
```
This deploys the Studio to `https://yourtaximan.sanity.studio` (or your chosen hostname), keeping the Studio completely isolated from the public consumer website.
