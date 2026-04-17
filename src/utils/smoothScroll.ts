export function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const headerHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
    10
  );

  const offsetTop = element.getBoundingClientRect().top + window.scrollY - headerHeight;

  window.scrollTo({
    top: offsetTop,
    behavior: 'smooth',
  });
}

export function handleNavClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  sectionId: string,
  onAfterClick?: () => void
): void {
  e.preventDefault();
  scrollToSection(sectionId);
  onAfterClick?.();
}
