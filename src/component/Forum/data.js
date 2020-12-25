import { LoremIpsum } from "lorem-ipsum";
import _ from "lodash";

const generateDate = () => {
  let date = new Date(
    2020,
    _.random(11),
    _.random(29),
    _.random(23),
    _.random(59)
  );
  return date.toDateString();
};

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const data = [];
_.range(_.random(10)).forEach((i) => {
  data[i] = {
    user: lorem.generateWords(1),
    titel: lorem.generateSentences(1),
    date: generateDate(),
    body: lorem.generateParagraphs(7),
    comments: [],
  };
  _.range(_.random(10)).forEach((j) => {
    data[i].comments[j] = {
      user: lorem.generateWords(1),
      date: generateDate(),
      body: lorem.generateParagraphs(7),
    };
  });
});

export default data;
