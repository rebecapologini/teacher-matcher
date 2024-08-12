let startX: number;
let startY: number;
let isDragging: boolean = false;
let isHorizontalSwipe: boolean | null = null;

export const startDrag = (
  e: MouseEvent | TouchEvent,
  card: HTMLDivElement,
  leftIndicator: HTMLDivElement,
  rightIndicator: HTMLDivElement,
  onSwipe: () => void
) => {
  isDragging = true;
  startX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
  startY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;

  isHorizontalSwipe = null;

  card.style.userSelect = "none";

  const drag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    const currentX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    const currentY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;

    const dx = currentX - startX;
    const dy = currentY - startY;

    if (isHorizontalSwipe === null) {
      isHorizontalSwipe = Math.abs(dx) > Math.abs(dy);
    }

    if (isHorizontalSwipe) {
      e.preventDefault();
      card.style.transform = `translateX(${dx}px) rotate(${dx * 0.1}deg)`;
      card.style.opacity = `${1 - Math.abs(dx) / 300}`;

      if (dx > 0) {
        rightIndicator.style.opacity = "1";
        leftIndicator.style.opacity = "0";
      } else if (dx < 0) {
        leftIndicator.style.opacity = "1";
        rightIndicator.style.opacity = "0";
      } else {
        leftIndicator.style.opacity = "0";
        rightIndicator.style.opacity = "0";
      }
    }
  };

  const stopDrag = (e: MouseEvent | TouchEvent) => {
    isDragging = false;

    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchmove", drag);
    document.removeEventListener("touchend", stopDrag);

    if (isHorizontalSwipe) {
      const currentX =
        e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX;
      const dx = currentX - startX;

      if (Math.abs(dx) > 100) {
        card.style.transition = "transform 0.5s ease, opacity 0.5s ease";
        card.style.transform = `translateX(${dx > 0 ? 200 : -200}px) rotate(${dx > 0 ? 20 : -20}deg)`;
        card.style.opacity = "0";
        setTimeout(() => {
          onSwipe();
          card.style.transition = "none";
          card.style.transform = "translateX(0) rotate(0)";
          card.style.opacity = "1";
          leftIndicator.style.opacity = "0";
          rightIndicator.style.opacity = "0";
        }, 500);
      } else {
        card.style.transition = "transform 0.3s ease, opacity 0.3s ease";
        card.style.transform = "translateX(0) rotate(0)";
        card.style.opacity = "1";
        leftIndicator.style.opacity = "0";
        rightIndicator.style.opacity = "0";
      }
    }
  };

  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDrag);

  document.addEventListener("touchmove", drag, { passive: true });
  document.addEventListener("touchend", stopDrag, { passive: true });
};

export const showTutorial = (
  card: HTMLDivElement,
  leftIndicator: HTMLDivElement,
  rightIndicator: HTMLDivElement
) => {
  card.style.transition = "transform 1s ease, opacity 1s ease";
  card.style.transform = "translateX(50px) rotate(5deg)";
  rightIndicator.style.opacity = "1";

  setTimeout(() => {
    card.style.transform = "translateX(-50px) rotate(-5deg)";
    rightIndicator.style.opacity = "0";
    leftIndicator.style.opacity = "1";
  }, 1000);

  setTimeout(() => {
    card.style.transform = "translateX(0) rotate(0)";
    rightIndicator.style.opacity = "0";
    leftIndicator.style.opacity = "0";
  }, 2000);
};
