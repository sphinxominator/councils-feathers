import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import Datepicker from '../components/Datepicker'

storiesOf('Datepicker', module).add('Normal', () => <Datepicker />)
