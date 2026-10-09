# CLAUDE.md

Guidance for Claude when working in this repository.

## Project overview

SendItAlready: an AI proposal generator for freelancers (SendItAlready.co).

- **Frontend:** static pages `index.html` (landing) and `wizard.html` (proposal wizard, served at `/wizard`).
- **API:** Vercel serverless functions in `api/`: `generate.js` (AI proposal writing via OpenAI), `pdf.js` (PDF export with pdfmake), `proposals.js` (saved proposals in Supabase), `followup.js` (follow-ups).
- **Deploy:** Vercel (`vercel.json`). `npm run dev` runs `vercel dev`; `npm run deploy` runs `vercel --prod`.
- **Note:** this repo is **public**. Never commit secrets.

## Working across devices

Josh works on this repo from the Claude phone app, Claude desktop, and Claude Code in VS Code. GitHub is the sync point.

- **Start of a session:** `git pull` to get the latest work from the other devices.
- **End of a chunk of work:** commit with a clear message and `git push` so the other devices see it.
- Never commit secrets (`.env` files, API keys, tokens).
- Ask Josh before anything that costs money (paid services, big API spend) or touches real customer data.
- Josh prefers informal, quick, action-oriented replies.
