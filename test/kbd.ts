import { isEqual } from './support/is-equal';

describe('kbd', () => {
  it('should convert <kbd> tags', () => {
    isEqual.inline('To switch directories, type <kbd>cd</kbd> followed by the name of the directory.<br> To edit settings, press <kbd><kbd>ctrl</kbd> + <kbd>,</kbd></kbd>', 'To switch directories, type <kbd>cd</kbd> followed by the name of the directory.<br>\nTo edit settings, press <kbd>ctrl</kbd> + <kbd>,</kbd>');
  });

  it('should convert nested <kbd> tags', () => {
    isEqual.inline('Press <kbd><kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Delete</kbd></kbd> to open the task manager.', 'Press <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Delete</kbd> to open the task manager.');
  });
});
