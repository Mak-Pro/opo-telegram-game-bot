require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// удалить список команд
// bot.deleteMyCommands();

// Усстановка списка доступных команд
//название комманды вводится только прописными и без всяких дефисов
bot.setMyCommands([
  { command: "/keyboardbuttons", description: "List of Keyboard buttons" },
  { command: "/inlinebuttons", description: "List of Inline buttons" },
]);

// bot.setChatMenuButton({
//   menu_button: {
//     text: "Open app",
//     type: "web_app",
//     web_app: {
//       url: "https://127.0.0.1:3000/",
//     },
//   },
// });

// bot.setChatMenuButton({});

// bot.on("game", async function (e) {
//   await bot.sendGame(e.chat.id, "high_or_low", {
//     disable_notification: true,
//     reply_markup: {
//       // force_reply: true,
//       inline_keyboard: [
//         [
//           {
//             text: "🕹️ Run Game",
//             callback_game: {},
//           },
//           {
//             text: "Let's Play!",
//             web_app: {
//               url: "https://playcanv.as/index/fe53c04a",
//             },
//           },
//         ],
//       ],
//     },
//   });
// });

bot.on("callback_query", async (msg) => {
  console.log("callback query");
  const {
    id,
    data: command,
    message: {
      chat: { id: chatId },
    },
  } = msg;

  bot.answerCallbackQuery(id, {
    url: "https://playcanv.as/index/fe53c04a",
  });

  switch (command) {
    case "select_game":
      await bot.sendMessage(
        chatId,
        "Попробуй Doozie Dunks или выбери свою любимую игровую категорию ниже 👇",
        {
          reply_markup: {
            resize_keyboard: true,
            keyboard: [
              [
                {
                  text: "App",
                  web_app: {
                    url: "https://127.0.0.1:3000/",
                  },
                },
                { text: "Button 2" },
                { text: "Button 3" },
                { text: "Button 4" },
              ],
              [
                { text: "Button 5" },
                { text: "Button 6" },
                { text: "Button 7" },
              ],
              [{ text: "Button 8" }, { text: "Button 9" }],
              [{ text: "Button 10" }],
            ],
          },
        }
      );
      break;
  }
});

bot.on("message", async (msg) => {
  cid = msg.chat.id || 0;
  // Получаем ID чата
  const chatId = msg.chat.id || 0;
  const messageId = msg.message_id;
  const text = msg.text;

  // Получаем ник пользователя
  const firstName = msg.chat.first_name || "User";

  // бот отвечает приветственным сообщением
  // await bot.sendMessage(chatId, `Hello ${firstName}`);

  if (text === "Button 2") {
    // await bot.sendAnimation(
    //   chatId,
    //   "https://miro.medium.com/v2/resize:fit:977/1*wd-MDU_lNZcXdNl-t6WY1A.png",
    //   {
    //     allow_sending_without_reply: true,
    //     caption: "sdfg",
    //   }
    // );

    // await bot.forwardMessage(chatId, chatId, messageId, {});

    // await bot.sendAnimation(
    //   chatId,
    //   `https://www.galvanizeaction.org/wp-content/uploads/2022/06/Wow-gif.gif`,
    //   {
    //     caption: "asfdgh",
    //     disable_notification: true,
    //     parse_mode: "HTML",
    //   }
    // );
    // https://t.me/MPPracticeBot?game=high_or_low
    await bot.sendGame(chatId, "high_or_low", {
      disable_notification: true,
      reply_markup: {
        // force_reply: true,
        inline_keyboard: [
          [
            {
              text: "🕹️ Run Game",
              callback_game: {},
            },
            {
              text: "Let's Play!",
              web_app: {
                url: "https://playcanv.as/index/fe53c04a",
              },
            },
          ],
        ],
      },
    });

    // await bot.sendMessage(
    //   chatId,
    //   // `https://miro.medium.com/v2/resize:fit:977/1*wd-MDU_lNZcXdNl-t6WY1A.png`,
    //   `
    //   https://www.galvanizeaction.org/wp-content/uploads/2022/06/Wow-gif.gif
    //   `,
    //   {
    //     // reply_to_message_id: messageId,
    //     allow_sending_without_reply: true,
    //     disable_notification: true,
    //     disable_web_page_preview: false,
    //     protect_content: false,

    //     // has_spoiler: true,
    //     parse_mode: "HTML",
    //     link_preview_options: {
    //       show_above_text: false,
    //     },

    //     reply_markup: {
    //       inline_keyboard: [
    //         [
    //           {
    //             text: "Select Game!",
    //             url: "https://playcanv.as/index/fe53c04a",
    //           },
    //         ],
    //       ],
    //     },
    //   }
    // );
  }

  if (text === "/start") {
    await bot.sendPhoto(
      chatId,
      "https://miro.medium.com/v2/resize:fit:977/1*wd-MDU_lNZcXdNl-t6WY1A.png",
      {
        parse_mode: "HTML",
        caption:
          "Добро пожаловать на игровую платформу №1 в Telegram. Работающая на токене $GMEE.🚀",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Select Game",
                callback_data: "select_game",
              },
            ],
          ],
        },
      }
    );
    // await bot.sendMessage(chatId, "Start Message", {

    //   parse_mode: "HTML",
    //   reply_markup: {
    //     inline_keyboard: [
    //       [
    //         {
    //           text: "Jion 🌍",
    //           url: "https://www.google.com",
    //         },
    //       ],
    //     ],
    //   },
    //   entities: {

    //   }
    // });

    // bot.getUserProfilePhotos(msg.from.id).then((photos) => console.log(photos));
  }

  // клавиатурные кнопки
  if (text === "/keyboardbuttons") {
    await bot.sendMessage(chatId, "List of Keyboard buttons", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [
          [
            {
              text: "App",
              web_app: {
                url: "https://127.0.0.1:3000/",
              },
            },
            { text: "Button 2" },
            { text: "Button 3" },
            { text: "Button 4" },
          ],
          [{ text: "Button 5" }, { text: "Button 6" }, { text: "Button 7" }],
          [{ text: "Button 8" }, { text: "Button 9" }],
          [{ text: "Button 10" }],
        ],
      },
    });
  }

  // инлановые кнопки
  if (text === "/inlinebuttons") {
    await bot.sendMessage(chatId, "List of Inline buttons", {
      // parse_mode: "HTML",
      reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [
          [
            {
              text: "Google 🌍",
              url: "https://www.google.com", // просто открыть страницу
              // web_app: { url: '' } // открыть приложение
            },
            {
              text: "YUP 🎉",
              url: "https://yup-web-dev.techchaininnovations.com/",
            },
          ],
          [
            {
              text: "Open App",
              web_app: {
                url: "https://127.0.0.1:3000/",
              },
            },
          ],
        ],
      },
    });
  }

  // Payment
  if (text === "Payment") {
    // await bot
    //   .sendInvoice(
    //     chatId,
    //     "Payment Title",
    //     "Payment Description",
    //     "Payment Payload",
    //     process.env.STRIPE_TOKEN,
    //     "USD",
    //     [
    //       { label: "Product 1", amount: 400 },
    //       { label: "Product 2", amount: 500 },
    //     ],
    //     {
    //       photo_url:
    //         "https://media.istockphoto.com/id/1008861200/photo/stack-of-one-hundred-dollars-notes.jpg?s=612x612&w=0&k=20&c=Q5Dl6Giw7iWOSWgjy5fnkEyRCTgxT8cJyFIAbOMo7TA=",
    //       photo_width: 612,
    //       photo_height: 430,
    //       need_phone_number: true,
    //       need_email: true,
    //       need_name: true,
    //       // need_shipping_address: true,
    //       // is_flexible: true,
    //       // allow_sending_without_reply: true,
    //       disable_notification: true,
    //     }
    //   )
    //   .then(() => {});
  }

  // показать сообщение, отправленное с помощью кнопки из самого приложения
  // (приложение запущено с помощью кнопки клавиатуры)
  if (msg.web_app_data) {
    const {
      chat: { username },
      web_app_data: { data },
    } = msg;
    // await bot.sendMessage(chatId, `${username} send message: ${data}`);
  }

  // показать сообщение, отправленное с помощью кнопки из самого приложения
  // (приложение запущено с помощью инлайн кнопки)
}); // end on message

app.post("/web-data", async (req, res) => {
  // const { queryId } = req.body;

  // await bot
  //   .answerWebAppQuery(queryId, {
  //     type: "article",
  //     id: queryId,
  //     title: "Title",
  //     input_message_content: {
  //       message_text: "Payment",
  //     },
  //   })
  //   .then(async (data) => {});

  const invoiceLink = await bot.createInvoiceLink(
    "Payment Title",
    "Payment description",
    "Payment Payload",
    process.env.TELEGRAM_PAYMENT_PROVIDER_TOKEN,
    "USD",
    [
      { label: "Product 1", amount: 400 },
      { label: "Product 2", amount: 500 },
    ]
  );

  res.json({ invoice_link: invoiceLink });
});

app.post("/game", async (req, res) => {
  const { queryId, id, gameId, gameUrl } = req.body;

  await bot.sendGame(id, gameId, {
    disable_notification: false,
    reply_markup: {
      // force_reply: true,
      inline_keyboard: [
        [
          {
            text: "🕹️ Play Game in Browser",
            callback_game: {},
          },
          {
            text: "Play Game in Web App",
            web_app: {
              url: gameUrl,
            },
          },
        ],
      ],
    },
  });

  // await bot.answerWebAppQuery(queryId, {
  //   id: queryId,
  //   type: "game",
  //   game_short_name: "high_or_low",
  // });

  // const id = uuidv4();

  // await bot.answerInlineQuery(queryId, [
  //   {
  //     id: id,
  //     type: "game",
  //     game_short_name: "high_or_low",
  //   },
  // ]);

  // await bot.answerWebAppQuery(queryId, {
  //   id: queryId,
  //   type: "article",

  // });

  // await bot.sendGame(queryId, "high_or_low", {
  //   disable_notification: false,
  //   reply_markup: {
  //     // force_reply: true,
  //     inline_keyboard: [
  //       [
  //         {
  //           text: "🕹️ Run Game",
  //           callback_game: {},
  //         },
  //         {
  //           text: "Let's Play!",
  //           web_app: {
  //             url: "https://playcanv.as/index/fe53c04a",
  //           },
  //         },
  //       ],
  //     ],
  //   },
  // });

  // await bot.answerWebAppQuery(queryId, {
  //   type: "game",
  //   id: queryId,
  //   game_short_name: "high_or_low",
  //   reply_markup: {
  //     force_reply: true,
  //     inline_keyboard: [
  //       [
  //         {
  //           text: "🕹️ Run Game",
  //           callback_game: {},
  //         },
  //         {
  //           text: "Let's Play!",
  //           web_app: {
  //             url: "https://playcanv.as/index/fe53c04a",
  //           },
  //         },
  //       ],
  //     ],
  //   },
  // });

  // await bot
  //   .answerWebAppQuery(queryId, {
  //     type: "photo",
  //     id: queryId,
  //     photo_file_id: "asr",
  //     photo_url:
  //       "https://miro.medium.com/v2/resize:fit:977/1*wd-MDU_lNZcXdNl-t6WY1A.png",
  //     thumb_url:
  //       "https://miro.medium.com/v2/resize:fit:977/1*wd-MDU_lNZcXdNl-t6WY1A.png",
  //     caption: "Game Caption",
  //     description: "Game Ddescription",
  //     title: "Game Title",
  //     photo_height: 300,
  //     photo_width: 400,
  //     reply_markup: {
  //       inline_keyboard: [
  //         [
  //           {
  //             text: "Play game",
  //             // url: "https://playcanv.as/index/fe53c04a",
  //             web_app: { url: "https://playcanv.as/index/fe53c04a" }, // открыть приложение
  //           },
  //         ],
  //       ],
  //     },
  //   })
  //   .then(async (data) => {});
});

app.get("/roulette", async (req, res) => {
  const roulette = [
    { id: "1", color: "#A4DE02", value: 3, suffix: "%", icon: "discount.webp" },
    {
      id: "2",
      color: "#76BA1B",
      value: 5,
      suffix: "%",
      icon: "discount.webp",
    },
    { id: "3", color: "#4C9A2A", value: 3, suffix: "%", icon: "discount.webp" },
    { id: "4", color: "#48cae4", value: 5, suffix: "%", icon: "discount.webp" },
    {
      id: "5",
      color: "#0077b6",
      value: 5,
      suffix: "%",
      icon: "discount.webp",
    },
    { id: "6", color: "#023e8a", value: 3, suffix: "%", icon: "discount.webp" },
    { id: "7", color: "#ffde1a", value: 5, suffix: "%", icon: "discount.webp" },
    { id: "8", color: "#ffa700", value: 5, suffix: "%", icon: "discount.webp" },
    { id: "9", color: "#ff7400", value: 3, suffix: "%", icon: "discount.webp" },
    {
      id: "10",
      color: "#ff5252",
      value: 5,
      suffix: "%",
      icon: "discount.webp",
    },
    {
      id: "11",
      color: "#ff0000",
      value: 3,
      suffix: "%",
      icon: "discount.webp",
    },
    {
      id: "12",
      color: "#a70000",
      value: 3,
      suffix: "%",
      icon: "discount.webp",
    },
    // {
    //   id: "13",
    //   color: "#A4DE02",
    //   value: 3,
    //   suffix: "%",
    //   icon: "discount.webp",
    // },
    // {
    //   id: "14",
    //   color: "#76BA1B",
    //   value: 5,
    //   suffix: "%",
    //   icon: "discount.webp",
    // },
    // {
    //   id: "15",
    //   color: "#4C9A2A",
    //   value: 3,
    //   suffix: "%",
    //   icon: "discount.webp",
    // },
    // {
    //   id: "16",
    //   color: "#48cae4",
    //   value: 3,
    //   suffix: "%",
    //   icon: "discount.webp",
    // },
    // {
    //   id: "17",
    //   color: "#0077b6",
    //   value: 5,
    //   suffix: "%",
    //   icon: "discount.webp",
    // },
    // {
    //   id: "18",
    //   color: "#023e8a",
    //   value: 3,
    //   suffix: "%",
    //   icon: "discount.webp",
    // },
    // {
    //   id: "19",
    //   color: "#ffde1a",
    //   value: 5,
    //   suffix: "%",
    //   icon: "discount.webp",
    // },
    // {
    //   id: "20",
    //   color: "#ffa700",
    //   value: 5,
    //   suffix: "%",
    //   icon: "discount.webp",
    // },
  ];

  const winner = Math.floor(Math.random() * roulette.length); // dummy backend;
  console.log(winner);

  res.json({ roulette, winner });
});
