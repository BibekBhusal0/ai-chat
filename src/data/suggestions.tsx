export const suggestedCommands = [
  {
    question: "Write a poem about a summer breeze",
    answer:
      "The summer breeze, a gentle sigh,\nWhispers secrets as it goes by.\nThrough leafy trees, it softly streams,\nA playful dance of sunlit dreams.\n\nIt kisses skin with tender grace,\nA cool embrace in a warm space.\nAcross the fields, it lightly glides,\nWhere golden wheat in rhythm rides.\n\nWith scents of flowers, sweet and light,\nIt fills the air, both day and night.\nA soothing balm for weary souls,\nThe summer breeze gently consoles.\n\nSo let it sweep your cares away,\nAnd bring you joy this summer day.\nA simple pleasure, pure and free,\nThe summer breeze, for you and me.",
  },
  {
    question: "Explain black holes to a 5-year-old",
    answer:
      "Imagine space is like a big trampoline, and everything is a ball rolling on it. A black hole is like a super heavy bowling ball that makes a very deep hole in the trampoline. It's so strong that nothing, not even light, can climb out of the hole if it gets too close! \n\nBlack holes are made when very big stars die and squeeze themselves into a tiny, tiny spot. Because they are so heavy and small, they pull everything around them really, really hard. If you were to go near a black hole, you would get pulled in like a slide, and you wouldn't be able to come back out. \n\nScientists use special telescopes to learn about black holes, even though we can't see them. They're like the universe's secret vacuum cleaners, sucking up everything that gets too close!",
  },
  {
    question: "How do computers work?",
    answer:
      "Computers are like super-smart helpers that follow instructions to do all sorts of things. Inside a computer, there's a brain called the processor, which is the main part that does the thinking. It gets instructions from programs, which are like recipe books telling the computer what to do step by step. \n\nComputers use something called binary code, which is just a bunch of 0s and 1s, to understand these instructions. It's like a secret language that the computer understands. When you type on the keyboard or click the mouse, you're giving the computer instructions. The computer then shows you the results on the screen. \n\nComputers also have memory to remember things, like your name or your favorite game. They can connect to the internet to get even more information and talk to other computers all over the world. So, a computer is a powerful tool that helps us learn, play, and create!",
  },
  {
    question: "What is the theory of general relativity?",
    answer:
      "Einstein's theory of general relativity, published in 1915, revolutionized our understanding of gravity. Instead of viewing gravity as a force, Einstein described it as a curvature of spacetime caused by mass and energy. Imagine a bowling ball placed on a trampoline; it creates a dip, and objects nearby will roll towards it. Similarly, massive objects like planets and stars warp spacetime, influencing the motion of other objects. \n\nOne of the key predictions of general relativity is the bending of light around massive objects. This phenomenon has been observed during solar eclipses, providing strong evidence for the theory. General relativity also predicts the existence of gravitational waves, ripples in spacetime caused by accelerating massive objects. These waves were directly detected for the first time in 2015, confirming another prediction of the theory. \n\nGeneral relativity has numerous applications, including theGlobal Positioning System (GPS), which relies on precise time measurements that are affected by gravitational effects. Black holes, another prediction of the theory, are regions of spacetime where gravity is so strong that nothing, not even light, can escape. General relativity continues to be a cornerstone of modern physics, shaping our understanding of the universe.",
  },
  {
    question: "Plan a family vacation in Italy.",
    answer:
      "Planning a family vacation in Italy requires careful consideration of interests and ages. Start with Rome, exploring the Colosseum, Roman Forum, and Vatican City. Toss a coin in the Trevi Fountain and enjoy delicious gelato. Next, head to Florence, the birthplace of the Renaissance, and visit the Uffizi Gallery and climb the Duomo for panoramic views. \n\nConsider a few days in Venice, riding gondolas through the canals and exploring St. Mark's Square. For a relaxing break, visit the Tuscan countryside, staying in a farmhouse and enjoying wine tasting and cooking classes. If you have older children, consider a visit to Pompeii and Mount Vesuvius to learn about ancient Roman history. \n\nFactor in travel time between locations, using trains for efficient transportation. Book accommodations in advance, opting for family-friendly hotels or apartments. Pack comfortable shoes for walking and exploring. Enjoy the local cuisine, including pizza, pasta, and regional specialties. Italy offers a rich blend of history, culture, and natural beauty, making it a perfect destination for a memorable family vacation.",
  },
]

export function getAnswer(question: string): string | null {
  const suggestion = suggestedCommands.find((s) => s.question === question);
  return suggestion ? suggestion.answer : null;
}

