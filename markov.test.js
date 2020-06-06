const { MarkovMachine } = require("./markov");

test("check chain", function () {
  let mm = new MarkovMachine("the cat in the hat");
  expect(mm.chain).toEqual({
    the: ["cat", "hat"],
    cat: ["in"],
    in: ["the"],
    hat: [null],
  });
});

test(" check word count", function () {
  let mm = new MarkovMachine("the cat in the hat");
  let res = mm.makeText(20).split(" ");
  expect(res.length).toEqual(20);
});
