import { useEffect, useRef } from "react";

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add in-view class when element comes into view
            entry.target.classList.add("in-view");
            // Optionally stop observing after animation
            // observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before element is fully visible
        threshold: 0.1, // Trigger when 10% of element is visible
      }
    );

    // Find all elements with scroll-animate class within this section
    const animatedElements = element.querySelectorAll(".scroll-animate");
    animatedElements.forEach((el) => observer.observe(el));

    // Also observe the main element if it has scroll-animate class
    if (element.classList.contains("scroll-animate")) {
      observer.observe(element);
    }

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
      if (element.classList.contains("scroll-animate")) {
        observer.unobserve(element);
      }
    };
  }, []);

  return ref;
}

// Alternative: Direct animation wrapper component
export function ScrollAnimated({
  children,
  animation = "fade-in-up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  animation?: "fade-in-up" | "fade-in-down" | "fade-in-left" | "fade-in-right" | "scale-in";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -50px 0px",
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  const delayClass = delay ? `delay-${delay}` : "";

  return (
    <div
      ref={ref}
      className={`scroll-animate ${animation} ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
}