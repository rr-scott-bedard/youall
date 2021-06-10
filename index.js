// index.js
const {WebClient} = require('@slack/web-api');
const web = new WebClient(process.env.SLACK_TOKEN);

const {createEventAdapter} = require('@slack/events-api');
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);
const port = process.env.PORT || 3000;

var terms = [
    { term: "guys", suggestion: "team/You All/folks" },
    { term: "master", suggestion: "primary" },
    { term: "slave", suggestion: "replica" },
    { term: "whitelist", suggestion: "allowlist" },
    { term: "blacklist", suggestion: "denylist" },
    { term: "man hours", suggestion: "person hours" },
    { term: "sanity check", suggestion: "quick check" },
    { term: "dummy value", suggestion: "placeholder value" },
    { term: "master/slave", suggestion: "primary/replica" },
    { term: "spokesman", suggestion: "spokesperson" },
    { term: "spokeswoman", suggestion: "spokesperson" },
    { term: "foreman", suggestion: "supervisor" }
]

slackEvents.on('message', (event) => {
  //console.log(event)

    if (
        event.hasOwnProperty('text')
    ) {
        var suggested_replacement = terms.find(function(post, index) {
            if(event.text.toLowerCase().includes(post.term))
                return post
        });

        if (typeof suggested_replacement !== 'undefined'){
            console.log("suggested:" + suggested_replacement.suggestion);
            (async () => {
                await web.chat.postEphemeral({
                channel: event.channel,
                user: event.user,
                text: 'Hey, perhaps consider ' + suggested_replacement.suggestion + ' instead of _' + suggested_replacement.term + '_?',
                });
            })();        
        }
    }
});

slackEvents.on('error', console.error);

slackEvents.start(port).then(() => {
  console.log(`server listening on port ${port}`);
});