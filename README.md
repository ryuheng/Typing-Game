# Typing-test game inspired largely by Monkeytype

**I enjoy the minimalistic look and user interface of Monkeytype so I made this game with HTML, CSS and most importantly ReactJS. New to front-end web dev and this individual self-project is a way to put my knowledge about front-end web technologies into practice. Performance of code can be further improved in the future.**

**To play just download everything I guess? Not too sure which ones but I think there should be some redundant dependencies in the package.json file. Once done, run**\
`npm install`\
`npm start`

**I had to refer to a few tutorials online in the initial building phase as a starting point to learn about the necessities of a typing game. However, they were mainly over-simplified and didn't have certain features that I wanted in a more "complete" typing game. Some features that I implemented for the game to be more Monkeytype-like include:**
- A simple animated-look (but not a real animation) that shifts the test text as the player progresses
- A blinking cursor that moves as the player types each character
- A refresh key to restart the game whenever
- Fixed problem with regards to <kbd>Ctrl</kbd> + <kbd>Backspace</kbd> (more below)
- Improved on gameplay interface such as displaying extra wrong characters
- Use a countdown timer instead of a stopwatch for gameplay and conditionally render the test result box

**Input validating logic (processInput() function in Game.js file):**
- Initial implementation was to use a counter variable (say *x*)to check the the character at index *x* of the user input against the corresponding character of the test text (also at index *x*). As long as there is a new character input by the user, *x* is incremented by 1. If the input at index *x* is *null*, the game evaluates the input as a single <kbd>Backspace</kbd> and *x* is decremented by 1.
- The problem with the above implementation is that the keyboard shortcut <kbd>Ctrl</kbd> + <kbd>Backspace</kbd> cannot be differentiated fron a single <kbd>Backspace</kbd> and hence, decrementing *x* by 1 would be wrong if the entire word is cleared.
- The subsequent implementation was to check each character typed by the user from the start of the test text as long as there is a change in user input (both adding and deleting characters) in order to avoid the above problem. However, this is not efficient as size of input (characters to check) grows as the game progresses.
- The current implementation breaks the test text into individual words using React JS and processInput() is only called to check the characters within a single word on every change in user input, making it more efficient.

**Further optimisations:**
- Able to display different random test text (maybe using an API?)
- Allow users to select the duration of the countdown
- Improve underlying implementation of the game as the current logic in checking user input is inefficient
- Segmentation of different React components into their own individual files for better organisation

**Some screenshots**
<br>
![Cursor](/pics/Cursor.JPG)
<br>
overall look
<br>
<br>
![ExtraWrongCharacters](/pics/ExtraWrongCharacters.JPG)
<br>
extras are displayed red
<br>
<br>
![Result](/pics/Result.JPG)
<br>
result page
<br>
<br>

**Test text in game isn't owned by me. Credit to song "Never Gonna Give You Up" by Rick Astley**
