import { TypedDictState } from '.';
import { processGettingApr } from '../meso/views/apr';

export const getting_apr = async (state: typeof TypedDictState.State) => {
  console.log('Start getting_apr');
  const startTime = Date.now();
  const result = await processGettingApr();
  const endTime = Date.now();
  console.log('End getting_apr', endTime - startTime, 'ms');
  return { ...state, data: result };
};
