export function HomeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}

export function ImageIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" {...props}>
      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM6 17h12l-3.8-5-2.9 3.7-2-2.5z" />
    </svg>
  );
}

export function VideoIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11z" />
    </svg>
  );
}

export function SparkleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14 2l2.3 6.2L22.5 10.5l-6.2 2.3L14 19l-2.3-6.2L5.5 10.5l6.2-2.3z" />
      <path d="M6 14.5l1.1 2.4 2.4 1.1-2.4 1.1L6 21.5l-1.1-2.4L2.5 18l2.4-1.1z" />
      <path d="M5.5 2l.8 1.7 1.7.8-1.7.8-.8 1.7-.8-1.7L3 4.5l1.7-.8z" />
    </svg>
  );
}

export function ChipIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" {...props}>
      <rect x="5" y="5" width="14" height="14" rx="2.5" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="0.8" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </svg>
  );
}
