// cd ~/workspace/mm-scripts/move/ts_scripts
// ENV=mainnet npx ts-node src/meso/views/asset_values.demo.ts

import { client } from "../../networks";
import { getPrivateKey } from "../account";
import { generateMoveFunction } from "../utils";

async function main() {
  const account = await getPrivateKey();

  const info = await client.view({
    payload: {
      function: generateMoveFunction({method: 'asset_values'}),
      typeArguments: [],
      functionArguments: [account.accountAddress],
    },
  });

  console.log(JSON.stringify(info));
}

main();
