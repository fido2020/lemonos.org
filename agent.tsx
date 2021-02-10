import axios from 'axios';
import https from 'https';
import fs from "fs"
import { join } from 'path'

export const agent = new https.Agent({ rejectUnauthorized: false });

const instance = axios.create({ httpsAgent: agent })

export default instance;