/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { configure } from '@storybook/react'

function loadStories() {
  require('../app/stories')
}

configure(loadStories, module)
