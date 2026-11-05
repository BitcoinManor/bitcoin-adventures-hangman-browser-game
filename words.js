// The word list. Each word has:
//   word:  the answer (letters and spaces only)
//   hint:  shown under the blanks while playing
//   meaning: what the character teaches after the round
// This is a starter list. We'll grow it to about 100 words in step 2.
const WORDS = [
  {
    word: "bitcoin",
    hint: "Digital money that nobody controls",
    meaning: "Bitcoin is money on the internet that belongs to everyone and no one. No bank is in charge!"
  },
  {
    word: "satoshi",
    hint: "The smallest piece of a bitcoin",
    meaning: "A satoshi, or 'sat', is the tiniest bit of a bitcoin. It takes 100 million sats to make one bitcoin!"
  },
  {
    word: "wallet",
    hint: "Where you keep your keys",
    meaning: "A wallet holds the secret keys that let you spend your bitcoin. Keep it safe!"
  },
  {
    word: "block",
    hint: "A page in Bitcoin's big book",
    meaning: "A block is a group of transactions, like one page in Bitcoin's giant record book."
  },
  {
    word: "blockchain",
    hint: "Blocks linked together",
    meaning: "The blockchain is every block chained together in order, so anyone can check the whole history."
  },
  {
    word: "miner",
    hint: "Works hard to add new blocks",
    meaning: "Miners use computers to solve puzzles. The winner adds the next block and earns new bitcoin."
  },
  {
    word: "node",
    hint: "A computer that checks the rules",
    meaning: "A node is a computer that keeps a copy of the blockchain and makes sure everyone follows the rules."
  },
  {
    word: "halving",
    hint: "Happens about every four years",
    meaning: "Every four years or so, the reward for miners is cut in half. That's the halving!"
  },
  {
    word: "seed phrase",
    hint: "Secret words to recover your wallet",
    meaning: "A seed phrase is a list of secret words that can bring back your wallet. Never share it with anyone!"
  },
  {
    word: "hodl",
    hint: "Hold on tight and don't sell",
    meaning: "HODL started as a typo for 'hold'. Now it means keeping your bitcoin for the long run."
  }
];
