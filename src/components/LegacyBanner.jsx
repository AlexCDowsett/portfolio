import './LegacyBanner.css';
import { Icon } from '../v3/Icon.jsx';

export default function LegacyBanner({ hidden = false }) {
    return (
        <>
            <aside className={`legacy-site-notice ${hidden ? 'is-hidden' : ''}`} aria-label="New portfolio available" aria-hidden={hidden}>
                <p>I have a new portfolio website.</p>
                <a href="/#home" tabIndex={hidden ? -1 : undefined}>Take a look <Icon /></a>
            </aside>
            <div className="legacy-notice-spacer" aria-hidden="true" />
        </>
    );
}
