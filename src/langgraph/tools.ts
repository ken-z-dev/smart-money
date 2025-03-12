import { DynamicStructuredTool, tool } from '@langchain/core/tools';
import { z } from 'zod';
import { processLoopingFa } from '../meso/looping_fa';
import { processUnloopingFa } from '../meso/unlooping_fa';
import { loopingModel } from '../db';

export const looping = tool(
  async ({ symbolCoin, tool }: { symbolCoin: string; tool: string }) => {
    console.log('tool::', tool);

    // console.log(new Date().toISOString());
    // console.log(`looping::${symbolCoin}::${loopingInfo}`);
    // await processLoopingFa(symbolCoin);
    // await loopingModel.updateOne({ symbolCoin }, { looping: loopingInfo + 1 });
    return `looping::${symbolCoin}`;
  },
  {
    name: 'defi_function',
    // description:
    //   'a strategy in DeFi where users continuously borrow and stake assets to compound their yield.',
    description: 'Can perform looping or unlooping action',
    schema: z.object({
      operation: z
        .enum(['looping', 'unloop'])
        .describe('The type of function to execute.'),
      symbolCoin: z.string().describe('coin to perform action'),
      tool: z.string(),
    }),
  },
);

const calculatorTool = new DynamicStructuredTool({
  name: 'defi_function',
  // description:
  //   'a strategy in DeFi where users continuously borrow and stake assets to compound their yield.',
  description: 'Can perform looping or unlooping action',
  schema: z.object({
    functionName: z
      .enum(['looping', 'unlooping'])
      .describe('The type of function to execute.'),
    symbolCoin: z.string().describe('coin to perform action'),
  }),
  func: async ({
    symbolCoin,
    functionName,
  }: {
    symbolCoin: string;
    functionName: 'looping' | 'unlooping';
  }) => {
    console.log('tool::', functionName, '::', symbolCoin);
    const data = await loopingModel.findOne({ symbolCoin });
    if (functionName === 'looping') {
      const isSuccess = await processLoopingFa(symbolCoin);
      if (isSuccess) {
        await loopingModel.updateOne(
          { symbolCoin },
          { looping: data.looping + 1 },
        );
      }
    }
    if (functionName === 'unlooping') {
      const isSuccess = await processUnloopingFa(symbolCoin);
      if (isSuccess) {
        await loopingModel.updateOne(
          { symbolCoin },
          { looping: data.looping - 1 },
        );
      }
    }

    // console.log(new Date().toISOString());
    // console.log(`looping::${symbolCoin}::${loopingInfo}`);
    // await loopingModel.updateOne({ symbolCoin }, { looping: loopingInfo + 1 });
    return `${functionName}::${symbolCoin}`;
  },
});

// export const unlooping = tool(
//   async ({
//     symbolCoin,
//     loopingInfo,
//   }: {
//     symbolCoin: string;
//     loopingInfo: number;
//   }) => {
//     console.log(new Date().toISOString());
//     console.log(`unlooping::${symbolCoin}::${loopingInfo}`);
//     // await processUnloopingFa(symbolCoin);
//     await loopingModel.updateOne({ symbolCoin }, { looping: loopingInfo - 1 });
//     return `unlooping::${symbolCoin}::${loopingInfo}`;
//   },
//   {
//     name: 'unlooping',
//     // description:
//     //   'unlooping is the opposite of looping, it will withdraw and repay continuously',
//     description: 'call unlooping action',
//     schema: z.object({
//       symbolCoin: z.string(),
//       loopingInfo: z.number(),
//     }),
//   },
// );

export const tools = [calculatorTool];
// export const tools = [looping, unlooping];
