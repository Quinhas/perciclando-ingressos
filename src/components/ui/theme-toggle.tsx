import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './button';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      className='aspect-square p-1 border-zinc-900 bg-transparent border-solid border-[1px] hover:bg-zinc-900 hover:bg-opacity-10 text-zinc-900 dark:border-zinc-100 dark:bg-transparent dark:hover:bg-zinc-100 dark:hover:bg-opacity-10 dark:text-zinc-100'
      size='icon'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
