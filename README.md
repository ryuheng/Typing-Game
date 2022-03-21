# Typing-test game inspired largely by Monkeytype

**I enjoy the minimalistic look and user interface of Monkeytype so I made this game with HTML, CSS and most importantly ReactJS. New to front-end web dev and this individual self-project is a way to put my knowledge about front-end web technologies into practice. Performance of code can be further improved in the future.**

**To play just download everything I guess? Not too sure which ones but I think there should be some redundant dependencies in the package.json file. Once done, run**\
`npm install`\
`npm start`

**I had to refer to a few tutorials online in the initial building phase as a starting point to learn about the necessities of a typing game. However, they were mainly over-simplified and didn't have certain features that I wanted in a more "complete" typing game. Some features that I implemented for the game to be more Monkeytype-like include:**
- A simple animated-look (but not a real animation) that shifts the test text as the player progresses
- A blinking cursor that moves as the player types each character
- A refresh key to restart the game whenever
- Fixed problem with regards to <kbd>Ctrl</kbd> + <kbd>Backspace</kbd>
- Improved on gameplay interface such as displaying extra wrong characters
- Use a countdown timer instead of a stopwatch for gameplay and conditionally render the test result box

**Further optimisations:**
- Able to display different random test text (maybe using an API?)
- Allow users to select the duration of the countdown
- Improve underlying implementation of the game as the current logic in checking user input is inefficient
- Segmentation of different React components into their own individual files for better organisation

**Some screenshots**
<br>
![Cursor](/pics/Cursor.JPG)
<br>
![ExtraWrongCharacters](/pics/ExtraWrongCharacters.JPG)
<br>
![Result](/pics/Result.JPG)
<br>

**Test text in game isn't owned by me. Credit to song "Never Gonna Give You Up" by Rick Astley**
