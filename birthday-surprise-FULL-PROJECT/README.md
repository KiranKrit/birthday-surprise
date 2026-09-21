# Birthday Surprise Website ❤️

Complete static website containing the HTML, CSS, JavaScript, 8 uploaded photos, and the uploaded birthday music.

## Included
- Midnight countdown
- Birthday reveal
- 8-photo story
- Romantic reveal
- Date proposal
- Respectful "I need some time" flow
- Date-choice interaction
- Confetti
- Background music with mute/unmute
- Responsive mobile/desktop design

## Personalize
Edit `js/script.js`:

```js
recipientName: "[HER_NAME]",
senderName: "[YOUR_NAME]",
birthdayDate: "YYYY-MM-DD",
```

The website already references:
- `assets/music/background.mp3`
- `assets/photos/photo1.jpeg` through `photo8.jpeg`

## Run locally

From this folder:

```bash
python -m http.server 8000
```

Then open:

`http://localhost:8000`

## Important
The browser may block audio until the visitor interacts with the page. The website attempts to start music after the first user interaction and also provides a music button.
