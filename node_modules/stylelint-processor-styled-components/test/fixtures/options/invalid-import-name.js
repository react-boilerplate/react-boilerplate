import { something } from 'styled-components'


// Empty block, but importName isn't set to `something`
// so shouldn't be an error
const Button = something.div`

`
