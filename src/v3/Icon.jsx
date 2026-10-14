const paths = {
    'arrow-up-right': 'M5 19 19 5M5 5h14v14',
    'arrow-down': 'M12 4v16m-6-6 6 6 6-6',
    'arrow-up': 'M12 20V4m-6 6 6-6 6 6',
    'arrow-left': 'M20 12H4m6-6-6 6 6 6',
    branch: 'M5 4v8a4 4 0 0 0 4 4h10m-5-5 5 5-5 5',
    grid: 'M4 4h16v16H4zM12 4v16M4 12h16',
    swap: 'M4 8h16m-4-4 4 4-4 4M20 16H4m4-4-4 4 4 4',
    check: 'm4 12 5 5L20 6',
    pause: 'M9 5v14M15 5v14',
    play: 'm8 5 11 7-11 7Z',
    plus: 'M12 5v14M5 12h14',
    minus: 'M5 12h14',
};

export function Icon({ name = 'arrow-up-right', className = '' }) {
    return <svg className={`v3-icon ${className}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={paths[name]} /></svg>;
}
