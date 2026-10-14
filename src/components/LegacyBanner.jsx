import './LegacyBanner.css';
import { Icon } from '../v3/Icon.jsx';

export default function LegacyBanner() {
    return (
        <>
            <aside className="legacy-site-notice" aria-label="New portfolio available">
                <p>I have a new portfolio website.</p>
                <a href="/#home">Take a look <Icon /></a>
            </aside>
            <div className="legacy-notice-spacer" aria-hidden="true" />
        </>
    );
}
