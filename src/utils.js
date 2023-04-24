//Este archivo permite ubicar y dirigir a las rutas determinadas

import path from 'path';
import {fileURLToPath} from 'url'

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

