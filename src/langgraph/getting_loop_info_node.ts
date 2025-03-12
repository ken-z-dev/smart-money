import { TypedDictState } from '.';
import { loopingModel } from '../db';

export const getting_loop_info = async (state: typeof TypedDictState.State) => {
  console.log('Start getting_loop_info');
  const startTime = Date.now();
  for (const coin of state.data) {
    const data = await loopingModel.findOne({ symbolCoin: coin[0] });
    coin.push(data?.looping?.toString() || '0');
  }
  const endTime = Date.now();
  console.log('End getting_loop_info', endTime - startTime, 'ms');

  // console.log('state', state);

  return state;
};
