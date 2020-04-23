module.exports = {
  confirmation: (context) => {
    console.log(context);
    return {
      channel: context.channel_id,
      text: "Ticket created!",
      blocks: JSON.stringify([
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*Ticket created!*",
          },
        },
        {
          type: "divider",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Amount*\n${context.title}\n\n*Location*\n${context.location}`,
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `*Date*: ${context.date}`,
            },
          ],
        },
      ]),
    };
  },
  modal: (context) => {
    return {
      trigger_id: context.trigger_id,
      view: JSON.stringify({
        type: "modal",
        title: {
          type: "plain_text",
          text: "Submit new Recipt 🛍",
        },
        callback_id: "submit-ticket",
        submit: {
          type: "plain_text",
          text: "Submit",
        },
        blocks: [
          {
            block_id: "title_block",
            type: "input",
            label: {
              type: "plain_text",
              text: "total value of expense 💸",
            },
            element: {
              action_id: "title",
              type: "plain_text_input",
            },
            hint: {
              type: "plain_text",
              text: "total value to be added on the list",
            },
          },
          {
            block_id: "location_block",
            type: "input",
            label: {
              type: "plain_text",
              text: "Location  🌍",
            },
            element: {
              action_id: "location",
              type: "plain_text_input",
            },
            hint: {
              type: "plain_text",
              text: "Where did you buy?",
            },
          },
          {
            block_id: "date_block",
            type: "input",
            label: {
              type: "plain_text",
              text: "Date  📅",
              emoji: true,
            },
            element: {
              type: "datepicker",
              action_id: "date",
              initial_date: "2020-04-28",
              placeholder: {
                type: "plain_text",
                text: "Select a date",
                emoji: true,
              },
            },
            hint: {
              type: "plain_text",
              text: "When did you buy?",
            },
          },
        ],
      }),
    };
  },
};
