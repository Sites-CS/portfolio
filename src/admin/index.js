import CMS from 'netlify-cms'
import { fr } from 'netlify-cms-locales'
import injectPlugins from 'gridsome-plugin-netlify-cms/lib/inject-plugins'

import styles from '!css-loader!sass-loader!../assets/scss/preview.scss'

injectPlugins(CMS)

CMS.registerLocale('fr', fr)
CMS.registerPreviewStyle(styles.toString(), { raw: true })
