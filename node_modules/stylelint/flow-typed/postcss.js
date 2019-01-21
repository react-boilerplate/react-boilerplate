declare class postcss$node {
  raw: Function;
  raws: Object;
  type: "rule" | "atrule" | "root" | "comment" | "decl";
  parent: Object;
  nodes: Array<Object>;
  next(): postcss$node | void;
  prev(): postcss$node | void;
  source: {
    start: {
      line: number,
      column: number
    },
    end: {
      line: number,
      column: number
    }
  };
  error(message: string, options: { plugin: string }): void;
}

declare class postcss$comment extends postcss$node {
  text: string;
  raws: {
    before?: string,
    after?: string
  };
}

declare class postcss$atRule extends postcss$node {
  name: string;
  params: string;
  raws: {
    before?: string,
    after?: string,
    afterName?: string
  };
}

declare class postcss$rule extends postcss$node {
  selector: string;
  raws: {
    before?: string,
    after?: string
  };
}

declare class postcss$decl extends postcss$node {
  prop: string;
  value: string;
  raws: {
    before?: string,
    after?: string
  };
}

declare function postcss$parser(
  css: ?string,
  opts: postcss$options
): postcss$node;

declare function postcss$stringifier(postcss$node, builder: Function): void;

export type postcss$syntax = {
  stringify?: postcss$stringifier,
  parse?: postcss$parser
};

export type postcss$options = {
  from?: string,
  to?: string,
  parser?: postcss$parser,
  stringifier?: postcss$stringifier,
  syntax?: postcss$syntax,
  map?: Object
};

export type postcss$result = {
  css: string,
  root: Object,
  stylelint: {
    disabledRanges: disabledRangeObject,
    ruleSeverities?: Object,
    customMessages?: Object,
    quiet?: boolean
  }
};
