import fs from 'fs';
import path from 'path';

export default (pathToFile) => {
  try {
    const data = fs.readFileSync(path.resolve(pathToFile), 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
};
