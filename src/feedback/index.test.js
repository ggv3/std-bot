const { restructureFeedback } = require('./index');

test('Should make a new Array from text values', () => {
  const feedback = [
    {
      id: 1,
      text: 'Feedback1',
      read: 0,
    },
    {
      id: 2,
      text: 'Feedback2',
      read: 0,
    },
    {
      id: 3,
      text: 'Feedback3',
      read: 0,
    },
  ];

  const filteredArray = ['Feedback1', 'Feedback2', 'Feedback3'];
  expect(restructureFeedback(feedback)).toStrictEqual(filteredArray);
});
