import { PlopGenerator as PG } from 'node-plop';

export interface PlopGenerator extends PG {
  runActions?: <T extends string | number>(
    props: { [P in T]: any },
  ) => Promise<{ changes: []; failures: [] }>;
}
