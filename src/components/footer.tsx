import { gitConfig } from '@/lib/shared';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-fd-border py-6">
      <p className="text-center text-sm text-fd-muted-foreground">
        &copy; {year} {gitConfig.user}. All rights reserved.
      </p>
    </footer>
  );
}
