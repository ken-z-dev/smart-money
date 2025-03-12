import {
  Annotation,
  END,
  MessagesAnnotation,
  START,
  StateGraph,
} from '@langchain/langgraph';
import { getting_apr } from './getting_apr_node';
import { connectToDatabase, loopingModel } from '../db';
import { createGeminiModel, generateImage } from './utils';
import { getting_loop_info } from './getting_loop_info_node';
import { tools } from './tools';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import {
  BaseMessage,
  HumanMessage,
  SystemMessage,
} from '@langchain/core/messages';
import { SYSTEM_PROMPT_TEMPLATE } from './prompts';
import {
  ChatPromptTemplate,
  FewShotChatMessagePromptTemplate,
} from '@langchain/core/prompts';

let countTool = 0;

// The overall state of the graph
export const TypedDictState = Annotation.Root({
  data: Annotation<string[][]>,
  messages: Annotation<BaseMessage[]>,
  hasPerformedTool: Annotation<boolean>,
});

const llm = createGeminiModel('gemini-1.5-flash');
const modelWithTools = llm.bindTools(tools);
const toolNode = new ToolNode<typeof MessagesAnnotation.State>(tools);

/**
 * Processes the state data and generates messages based on the coin information.
 * Each coin's APR and loop count are included in the messages.
 * The messages are then sent to the model with tools for further processing.
 *
 * @param state - The current state containing coin data.
 * @returns A promise that resolves to a partial state with the generated messages.
 */
async function assistant(
  state: typeof TypedDictState.State,
): Promise<Partial<typeof MessagesAnnotation.State>> {
  const messages: string[] = [];

  for (let coin of state.data) {
    messages.push(
      `${coin[0]} has an APR of ${coin[1]}%, i have looped ${coin[2]} times`,
    ),
      console.log(
        `${coin[0]} has an APR of ${coin[1]}%, i have looped ${coin[2]} times`,
      );
  }

  for (let coin of [
    ['USDt', 0.83, 0],
    ['USDC', 0.94, 1],
  ]) {
    messages.push(
      `${coin[0]} has an APR of ${coin[1]}%, i have looped ${coin[2]} times`,
    ),
      console.log(
        `${coin[0]} has an APR of ${coin[1]}%, i have looped ${coin[2]} times`,
      );
  }
  // console.log(`assistant::${messages}`);

  const examplePrompt = ChatPromptTemplate.fromTemplate(`Human: {input}
    {output}`);

  const fewShotTemplate = new FewShotChatMessagePromptTemplate({
    examples: [
      {
        input:
          'USDt has an APR of -1.23%, I have looped 0 times; USDC has an APR of -1.333%, I have looped 0 times. Which function will you call with which coin?',
        output:
          "because usdt has apr of -1.23% < 0 but you haven't looped yet and usdc has apr of -1.333% < 0 but you haven't looped yet so it won't call any function",
      },
      {
        input:
          'USDt has an APR of -2.13%, I have looped 3 times; USDC has an APR of -1.333%, I have looped 0 times. Which function will you call with which coin?',
        output:
          'because usdt has apr of -2.13% < 0 and you have looped 3 times so i must call defi_function function with unlooping functionName and USDt symbolCoin',
      },
      {
        input:
          'USDt has an APR of -2.13%, I have looped 0 times; USDC has an APR of -4.133%, I have looped 1 times. Which function will you call with which coin?',
        output:
          'because usdt has apr of -2.13% < 0 but you have never looped and usdc has apr of -4.133% but you have looped once so I must call defi_function function with unlooping functionName and USDC symbolCoin',
      },
      {
        input:
          'USDt has an APR of 1.89%, I have looped 0 times; USDC has an APR of -3.133%, I have looped 0 times. Which function will you call with which coin?',
        output:
          'because usdt has apr of 1.89% so if you looping this coin you will make profit and usdc has apr of -3.133% if you looping this coin you will lose so i must call defi_function function with looping functionName and USDt symbolCoin',
      },
      {
        input:
          'USDt has an APR of 1.89%, I have looped 0 times; USDC has an APR of -3.133%, I have looped 2 times. Which function will you call with which coin?',
        output:
          'because usdt has an apr of 1.89% so if you loop this coin you will make a profit and usdc has an apr of -3.133% if you loop this coin you will lose and you are looping usdc 2 times already so i must call defi_function function with unlooping functionName and USDC symbolCoin',
      },
      {
        input:
          'USDt has an APR of 1.89%, I have looped 1 times; USDC has an APR of -3.133%, I have looped 0 times. Which function will you call with which coin?',
        output:
          "because usdc has negative apr but luckily you haven't looped yet and usdt has positive api luckily you have looped for 1 time so i must call defi_function function with looping functionName and USDt symbolCoin",
      },
      {
        input:
          'USDt has an APR of 2.37%, I have looped 0 times; USDC has an APR of 4.67%, I have looped 0 times. Which function will you call with which coin?',
        output:
          "because both coins have positive apr but 4.67 > 2.37 and you haven't looped any coins so I must call defi_function function with looping functionName and USDC symbolCoin",
      },
      {
        input:
          'USDt has an APR of 2.37%, I have looped 2 times; USDC has an APR of 4.67%, I have looped 0 times. Which function will you call with which coin?',
        output:
          'because both coins have positive apr, when looping you both have profit but usdc has a bigger apr and you are looping into usdt so I think you will unloop usdt first and then loop usdc, so I must call defi_function function with unlooping functionName and USDt symbolCoin',
      },
      {
        input:
          'USDt has an APR of 2.37%, I have looped 0 times; USDC has an APR of 4.67%, I have looped 5 times. Which function will you call with which coin?',
        output:
          'because both coins have positive apr but usdc has a bigger apr luckily you have looped 5 times so to increase profit i will loop more on this coin so i must call defi_function function with looping functionName and USDC symbolCoin',
      },
      {
        input:
          'USDt has an APR of 2.37%, I have looped 1 times; USDC has an APR of 4.67%, I have looped 0 times. Which function will you call with which coin?',
        output:
          'because both coins have positive apr but you have looped the coin with smaller apr which is usdt, you have to unloop this usdt coin first, so I must call defi_function function with unlooping functionName and USDt symbolCoin',
      },
    ],
    suffix: 'Human: {input}',
    examplePrompt,
    // prefix: SYSTEM_PROMPT_TEMPLATE,
    inputVariables: ['input'],
  });

  console.log(
    `${messages.join('; ')}. Which function will you call with which coin?`,
  );

  // messages.push(fewShotTemplate);
  const formattedPrompt = await fewShotTemplate.format({
    input: `${messages.join(';')}. Which function will you call with which coin?`,
  });
  const response = await modelWithTools.invoke([
    new SystemMessage(SYSTEM_PROMPT_TEMPLATE),
    formattedPrompt,
    // ...messages,
  ]);

  // console.log([response]);
  // We return an object with a messages property, because this will get added to the existing list
  return { messages: [response] };
}

// Define a new graph
const builder = new StateGraph(TypedDictState)
  .addNode('getting_apr', getting_apr)
  .addNode('getting_loop_info', getting_loop_info)
  .addNode('assistant', assistant)
  .addNode('tools', toolNode)
  .addEdge('assistant', 'tools')
  .addEdge('tools', END)
  .addEdge('getting_loop_info', 'assistant')
  .addEdge('getting_apr', 'getting_loop_info')
  .addEdge(START, 'getting_apr');

const graph = builder.compile({});

export async function main() {
  await connectToDatabase();
  await generateImage(graph, 'graph-ignore/ai-finance-2.jpg');

  const res = await graph.invoke({});
}

main().then(() => {
  console.log('success');
  process.exit(0);
});
