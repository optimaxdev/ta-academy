const MAX_FILE_SIZE = 4096;

type ValidFileType = 'image/png' | 'image/jpg';

export class CustomFile extends Blob {
    private constructor(type: ValidFileType | 'Invalid Type', size: number) {
        super([''], { type });
        Object.defineProperty(this, 'size', { get: () => size });
    }

    public static get normal(): CustomFile {
        return new CustomFile('image/png', MAX_FILE_SIZE);
    }

    public static get withInvalidType(): CustomFile {
        return new CustomFile('Invalid Type', MAX_FILE_SIZE);
    }

    public static get withMaxSize(): CustomFile {
        return new CustomFile('image/png', MAX_FILE_SIZE + 1);
    }
}
