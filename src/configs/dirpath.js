import { join } from 'path';
const baseDirectory = join(__dirname, '../../volumes/uploads');

export const completedfiles = join(baseDirectory, 'completedFiles');
export const exportFilesFTP = join(baseDirectory, 'exportFilesFTP');
export const fileSource = join(baseDirectory, 'fileSource');
export const importedFiles = join(baseDirectory, 'importedFiles');
export const outfiles = join(baseDirectory, 'outFiles');
export const skippedFiles = join(baseDirectory, 'skippedFiles');