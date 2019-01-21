const toHaveStyleRule = require('./toHaveStyleRule')
const styleSheetSerializer = require('./styleSheetSerializer')
const { resetStyleSheet } = require('./utils')

resetStyleSheet()

expect.addSnapshotSerializer(styleSheetSerializer)
expect.extend({ toHaveStyleRule })
