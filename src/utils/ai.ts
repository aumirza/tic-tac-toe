import * as tf from "@tensorflow/tfjs";

export function createModel() {
  const model = tf.sequential();

  model.add(
    tf.layers.dense({ units: 32, activation: "relu", inputShape: [9] })
  );
  model.add(tf.layers.dense({ units: 32, activation: "relu" }));
  model.add(tf.layers.dense({ units: 9, activation: "linear" })); // 9 output neurons (one per move)

  model.compile({ optimizer: tf.train.adam(0.01), loss: "meanSquaredError" });
  return model;
}

export async function aiMove(
  model: tf.Sequential,
  board: number[]
): Promise<number | null> {
  const inputTensor = tf.tensor2d([board], [1, 9]);
  const predictions = model.predict(inputTensor) as tf.Tensor;
  const qValues = await predictions.data();
  inputTensor.dispose();
  predictions.dispose();

  // Get available moves
  const availableMoves = board
    .map((cell, i) => (cell === 0 ? i : null))
    .filter(Boolean) as number[];

  console.log(availableMoves);

  if (availableMoves.length === 0) return null;

  // Choose the move with the highest Q-value
  return availableMoves.reduce(
    (bestMove, move) => (qValues[move] > qValues[bestMove] ? move : bestMove),
    availableMoves[0]
  );
}

export async function trainModel(
  model: tf.Sequential,
  gameHistory: { board: number[]; move: number; reward: number }[]
) {
  if (gameHistory.length === 0) return;

  console.log("Training model with past games...");

  const xs = gameHistory.map((data) => data.board);
  const ys = gameHistory.map((data) => {
    const output = new Array(9).fill(0);
    output[data.move] = data.reward; // Assign reward
    return output;
  });

  const xsTensor = tf.tensor2d(xs);
  const ysTensor = tf.tensor2d(ys);

  await model.fit(xsTensor, ysTensor, { epochs: 10, batchSize: 4 });

  xsTensor.dispose();
  ysTensor.dispose();

  console.log("Model trained!");
}
