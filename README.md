# Masyu Puzzle Game

## Overview
This is an interactive web-based implementation of the **Masyu Puzzle** game. Masyu is a logic puzzle where players must draw a single continuous loop through a grid, following specific rules dictated by black and white circles placed in some of the cells.

## Game Rules
1. **Single Continuous Loop**: The loop must pass through the centers of the cells, moving **horizontally or vertically**.
   - The loop **must not** cross itself.
   - The loop **must not** branch off.
   - The loop **must not** visit the same cell more than once.
2. **All Circles Must Be Used**: The loop must pass through every **black and white circle** on the grid.
3. **White Circle Rule**: The loop must **go straight through** a white circle's cell (no turn in that cell).
   - The loop must make a **90-degree turn** in at least one of the adjacent cells (before or after the white circle).
4. **Black Circle Rule**: The loop must make a **90-degree turn in a black circle's cell**.
   - After turning in the black circle's cell, the loop **must go straight** through the next cell on both sides (without turning immediately again).

## Features
- **Interactive Grid**: Clickable cells allow players to draw the loop by toggling lines between adjacent cells.
- **Validation System**: A built-in check ensures the player's drawn loop follows all Masyu rules.
- **Preset Puzzles**: Multiple levels of difficulty with pre-defined Masyu puzzles.
- **Responsive UI**: Optimized for both desktop and mobile play.
- **Reset & Undo Options**: Allows clearing mistakes and retrying the puzzle.

## How to Play
1. Click on an edge between two adjacent cells to draw a segment of the loop.
2. Click again on an existing segment to remove it.
3. Follow the Masyu rules to create a valid continuous loop.
4. Click **Check** to validate your solution.
5. If the puzzle is solved correctly, a success message will appear.

## Installation & Running Locally
1. Clone this repository:
   ```sh
   git clone https://github.com/yourusername/masyu-puzzle.git
   cd masyu-puzzle
   ```
2. Open `index.html` in your web browser.

## Technologies Used
- **HTML, CSS, JavaScript** – For rendering the interactive grid and handling game logic.
- **SVG/Canvas (Optional)** – For optimized loop drawing.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to improve the game.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments
Inspired by the traditional Masyu puzzles from Nikoli.

---
Happy puzzling! 🎉

