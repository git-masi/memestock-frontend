// Utils
import { createRandomId } from './createRandomId';
import { getRandomBoolean } from './getRandomBoolean';
import { getRandomIndex } from './getRandomIndex';

export function createFakeTransactions(num = 10) {
  const transactions = [];

  for (let i = 0; i < num; i++) {
    transactions.push(createFakeTransaction());
  }

  return transactions;
}

function createFakeTransaction() {
  return {
    id: createRandomId(),
    total: Math.floor(Math.random() * 1_000_000),
    message: createMessage(),
  };
}

function createMessage() {
  const emoji = ['💩', '💰', '💸', '🤑', '🚀', '💎'];
  const messages = [
    'To the moon!',
    'HODL GANG!',
    'I like the stock!',
    "Mo' money mo' problems",
  ];
  return `${messages[getRandomIndex(messages)]} ${
    emoji[getRandomIndex(emoji)]
  }`;
}
