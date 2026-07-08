# Secret Message Decryption Game

## Overview

This project is a simple Python game where the player must guess the correct number to decrypt a hidden message.

The encrypted message is protected using a Caesar Cipher with a shift of **6**. The player keeps guessing until they enter the correct number. Once the correct number is chosen, the program decrypts the message and reveals an interesting fact.

---

## Features

* Displays a custom ASCII logo at startup.
* Uses the Caesar Cipher technique to encrypt and decrypt a message.
* Repeatedly asks the user to guess the correct number.
* Keeps running until the correct answer is entered.
* Preserves spaces and punctuation while decrypting.
* Reveals a hidden fact when the correct number is chosen.

---

## Concepts Used

* Functions
* While loops
* Conditional statements (`if` / `else`)
* Lists
* String manipulation
* User input
* Modulo operator (`%`)
* Caesar Cipher encryption and decryption

---

## How It Works

1. The program displays a welcome message and an ASCII logo.
2. An encrypted message is shown to the user.
3. The player is asked to choose a number between **0 and 9**.
4. If the correct number (`4`) is entered:

   * The message is decrypted.
   * The hidden fact is displayed.
   * The game ends.
5. If the wrong number is entered:

   * The player is informed that the guess is incorrect.
   * The game continues until the correct answer is entered.

---

## Hidden Fact

After successful decryption, the program reveals:

> There are more possible chess games than atoms in the observable universe!

---

## File Structure

```text
.
├── main.py
└── art.py
```

* **main.py** – Contains the game logic and Caesar Cipher decryption.
* **art.py** – Stores the ASCII logo displayed when the program starts.

---

## Example

### Encrypted Message

```text
znkxk gxk suxk vuyyohrk inkyy mgsky zngt gzusy ot znk uhykxbghrk atobkxyk !
```

### Output (after entering the correct number)

```text
Good job you got it! The encrypted message was:
there are more possible chess games than atoms in the observable universe!
```
 
---

## Future Improvements

* Generate a random secret number each time the game starts.
* Allow the user to choose the Caesar Cipher shift value.
* Add hints after multiple incorrect guesses.
* Keep track of the number of attempts.
* Include multiple encrypted facts and choose one randomly.

---

## Author

Hrucha Sakulkar
 