AdaptiveCards.setHostConfig({
    "supportsInteractivity": true,
    "strongSeparation": {
        "spacing": 10,
        "lineThickness": 1,
        "lineColor": "#EEEEEE"
    },
    "fontFamily": "Segoe UI",
    "fontSizes": {
        "small": 12,
        "normal": 14,
        "medium": 17,
        "large": 21,
        "extraLarge": 26
    },
    "fontWeights": {
        "lighter": 200,
        "normal": 400,
        "bolder": 600
    },
    "colors": {
        "dark": {
            "normal": "#333333",
            "subtle": "#EE333333"
        },
        "light": {
            "normal": "#FFFFFF",
            "subtle": "#88FFFFFF"
        },
        "accent": {
            "normal": "#2E89FC",
            "subtle": "#882E89FC"
        },
        "attention": {
            "normal": "#5D60B3",
            "subtle": "#DD5D60B3"
        },
        "good": {
            "normal": "#00a000",
            "subtle": "#DD00a000"
        },
        "warning": {
            "normal": "#c00000",
            "subtle": "#DDc00000"
        }
    },
    "imageSizes": {
        "small": 40,
        "medium": 80,
        "large": 160
    },
    "actions": {
        "maxActions": 5,
        "separation": {
            "spacing": 10
        },
        "buttonSpacing": 20,
        "stretch": false,
        "showCard": {
            "actionMode": "inlineEdgeToEdge",
            "inlineCardSpacing": 16,
            "backgroundColor": "#08000000",
            "padding": {
                "top": 16,
                "right": 16,
                "bottom": 16,
                "left": 16
            }
        },
        "actionsOrientation": "horizontal",
        "actionAlignment": "left"
    },
    "adaptiveCard": {
        "backgroundColor": "#fafafa",
        "padding": {
            "left": 10,
            "top": 10,
            "right": 10,
            "bottom": 10
        }
    },
    "container": {
        "separation": {
            "spacing": 10
        },
        "normal": {},
        "emphasis": {
            "backgroundColor": "#cccccc",
            "borderColor": "#aaaaaa",
            "borderThickness": {
                "top": 1,
                "right": 1,
                "bottom": 1,
                "left": 1
            },
            "padding": {
                "top": 10,
                "right": 10,
                "bottom": 10,
                "left": 10
            }
        }
    },
    "textBlock": {
        "color": "dark",
        "separations": {
            "small": {
                "spacing": 10
            },
            "normal": {
                "spacing": 10
            },
            "medium": {
                "spacing": 10
            },
            "large": {
                "spacing": 10
            },
            "extraLarge": {
                "spacing": 10
            }
        }
    },
    "image": {
        "size": "medium",
        "separation": {
            "spacing": 10
        }
    },
    "imageSet": {
        "imageSize": "medium",
        "separation": {
            "spacing": 10
        }
    },
    "factSet": {
        "separation": {
            "spacing": 10
        },
        "title": {
            "color": "dark",
            "size": "normal",
            "isSubtle": false,
            "weight": "bolder"
        },
        "value": {
            "color": "dark",
            "size": "normal",
            "isSubtle": false,
            "weight": "normal"
        },
        "spacing": 10
    },
    "input": {
        "separation": {
            "spacing": 10
        }
    },
    "columnSet": {
        "separation": {
            "spacing": 10
        }
    },
    "column": {
        "separation": {
            "spacing": 10
        }
    }
});

function renderCard(targetDiv, cardObject) {
    var adaptiveCard = new AdaptiveCards.AdaptiveCard();
    adaptiveCard.parse(cardObject);
    var renderedCard = adaptiveCard.render();
    var div = document.getElementById(targetDiv).appendChild(renderedCard);
    }

AdaptiveCards.AdaptiveCard.onExecuteAction = function (action) {
    var message = "Action executed\n";
    message += "    Title: " + action.title + "\n";

    if (action instanceof AdaptiveCards.OpenUrlAction) {
        message += "    Type: OpenUrl\n";
        message += "    Url: " + action.url + "\n";
    }
    else if (action instanceof AdaptiveCards.SubmitAction) {
        message += "    Type: Submit";
        message += "    Data: " + JSON.stringify(action.data);
    }
    else if (action instanceof AdaptiveCards.HttpAction) {
        var httpAction = action;
        message += "    Type: Http\n";
        message += "    Url: " + httpAction.url + "\n";
        message += "    Method: " + httpAction.method + "\n";
        message += "    Headers:\n";

        for (var i = 0; i < httpAction.headers.length; i++) {
            message += "        " + httpAction.headers[i].name + ": " + httpAction.headers[i].value + "\n";
        }
        message += "    Body: " + httpAction.body + "\n";
    }
    else {
        message += "    Type: <unknown>";
    }

    alert(message);
}

var cardData = {
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "type": "AdaptiveCard",
    "version": "1.0",
    "speak": "<s>Your  meeting about \"Adaptive Card design session\"<break strength='weak'/> is starting at 12:30pm</s><s>Do you want to snooze <break strength='weak'/> or do you want to send a late notification to the attendees?</s>",
    "body": [
      {
        "type": "TextBlock",
        "text": "Adaptive Card design session",
        "size": "large",
        "weight": "bolder"
      },
      {
        "type": "TextBlock",
        "text": "Conf Room 112/3377 (10)",
        "isSubtle":true
      },
      {
        "type": "TextBlock",
        "text": "12:30 PM - 1:30 PM",
        "isSubtle":true,
        "spacing":"none"
      },
      {
        "type": "TextBlock",
        "text": "Snooze for"
      },
      {
        "type": "Input.ChoiceSet",
        "id": "snooze",
        "style":"compact",
        "value": "5",
        "choices": [
          {
            "title": "5 minutes",
            "value": "5",
            "isSelected": true
          },
          {
            "title": "15 minutes",
            "value": "15"
          },
          {
            "title": "30 minutes",
            "value": "30"
          }
        ]
      }
    ],
    "actions": [
      {
        "type": "Action.Submit",
        "title": "Snooze",
        "data": { "x": "snooze" }
      },
      {
        "type": "Action.Submit",
        "title": "I'll be late",
        "data": { "x": "late" }
      }
    ]
  };

renderCard('viz', cardData);