/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
    this.chain;
    this.keys;
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let table = {};
    let words = this.words;
    for (let i = 0; i < words.length; i++) {
      let nextWord;

      if (i == words.length - 1) nextWord = null;
      else nextWord = words[i + 1];

      table[words[i]] = table[words[i]]
        ? [...table[words[i]], nextWord]
        : [nextWord];
    }
    console.log(table);
    this.chain = table;
    this.keys = Object.keys(table);
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let textArray = [];
    let chain = this.chain;
    let keys = this.keys;
    let currWord;

    function randomWord(col) {
      let idx = Math.floor(Math.random() * col.length);
      return col[idx];
    }

    currWord = randomWord(keys);
    textArray.push(currWord);

    while (textArray.length < numWords) {
      let newWord = randomWord(chain[currWord]);
      if (newWord == null) newWord = randomWord(keys);
      textArray.push(newWord);
      currWord = newWord;
    }
    let res = textArray.join(" ");
    console.log(res);
    return res;
  }
}

// let mm = new MarkovMachine("the cat in the hat");
// mm.makeText(20);

module.exports = { MarkovMachine };
