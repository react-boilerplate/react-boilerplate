import something from 'some-lib'


// Empty block, but moduleName isn't set to some-lib
// so shouldn't be an error
const Button = something.div`

`
