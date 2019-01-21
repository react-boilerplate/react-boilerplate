import _uniq from "lodash/fp/uniq";
import _identity from "lodash/fp/identity";
import _filter from "lodash/fp/filter";
import _split from "lodash/fp/split";
import _flatMap from "lodash/fp/flatMap";
import _map from "lodash/fp/map";
import _toArray from "lodash/fp/toArray";
import _flow from "lodash/fp/flow";

var computeClassNames = _flow(_toArray, _map('props.className'), _flatMap(_split(/\s+/)), _filter(_identity), _uniq);

export default computeClassNames;