# youall
Inclusive Language Filter for Slack

Gonna Need two things from Slack:
* SLACK_SIGNING_SECRET=XXX - https://api.slack.com/apps/YOUR_APP_ID/general
* SLACK_TOKEN=XXXX - https://api.slack.com/apps/YOUR_APP_ID/event-subscriptions

Run with: \
./SLACK_SIGNING_SECRET=XXXX \
SLACK_TOKEN=xoxb-XXXX \
node index.js

Need these NPMS:
* npm install @slack/events-api
* npm install @slack/web-api
