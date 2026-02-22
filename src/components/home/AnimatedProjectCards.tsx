import { useMemo, useState, type CSSProperties, type MouseEvent } from 'react';

type ProjectCard = {
  id: string;
  title: string;
  text: string;
  role: string;
  built: string;
  result: string;
  href: string;
};

type Props = {
  cards: ProjectCard[];
  readMore: string;
};

type MotionState = {
  rotateX: number;
  rotateY: number;
  shineX: number;
  shineY: number;
};

const INITIAL_MOTION: MotionState = {
  rotateX: 0,
  rotateY: 0,
  shineX: 50,
  shineY: 50,
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export default function AnimatedProjectCards({ cards, readMore }: Props) {
  const [motionByIndex, setMotionByIndex] = useState<Record<number, MotionState>>({});

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const onMove = (index: number, event: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setMotionByIndex((previous) => ({
      ...previous,
      [index]: {
        rotateX: clamp((0.5 - y) * 9, -5.5, 5.5),
        rotateY: clamp((x - 0.5) * 10, -6, 6),
        shineX: clamp(x * 100, 0, 100),
        shineY: clamp(y * 100, 0, 100),
      },
    }));
  };

  const onLeave = (index: number) => {
    if (prefersReducedMotion) return;
    setMotionByIndex((previous) => ({
      ...previous,
      [index]: INITIAL_MOTION,
    }));
  };

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-3">
      {cards.map((card, index) => {
        const motion = motionByIndex[index] ?? INITIAL_MOTION;
        const style = prefersReducedMotion
          ? undefined
          : ({
              transform: `perspective(1000px) rotateX(${motion.rotateX}deg) rotateY(${motion.rotateY}deg) translateY(-2px)`,
              '--shine-x': `${motion.shineX}%`,
              '--shine-y': `${motion.shineY}%`,
              animationDelay: `${index * 90}ms`,
            } as CSSProperties);

        return (
          <article
            key={card.href}
            className="ui-card ui-card--interactive portfolio-card portfolio-card-react is-visible p-6 text-left"
            tabIndex={0}
            onMouseMove={(event) => onMove(index, event)}
            onMouseLeave={() => onLeave(index)}
            onBlur={() => onLeave(index)}
            style={style}
          >
            <div className="card-id mb-4 inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-2.5 py-1 text-[11px] font-semibold tracking-[0.16em] text-cyan-200">
              {card.id}
            </div>

            <h3 className="text-2xl font-semibold leading-tight text-white">{card.title}</h3>
            <p className="mt-3 text-sm text-neutral-300">{card.text}</p>

            <ul className="mt-5 space-y-3 text-sm text-neutral-200">
              <li className="card-meta">{card.role}</li>
              <li className="card-meta">{card.built}</li>
              <li className="card-meta">{card.result}</li>
            </ul>

            <a
              href={card.href}
              className="mt-6 inline-flex items-center text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
            >
              {readMore}
              <span aria-hidden="true" className="ml-1">{'->'}</span>
            </a>
          </article>
        );
      })}
    </div>
  );
}
