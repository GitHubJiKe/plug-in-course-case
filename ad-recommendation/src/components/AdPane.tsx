
import React from 'react';
import './AdPane.scss';

export default function AdPane({ content }: { content: string }) {
    return <div className="ad-pane">
        <h3>广告位</h3>
        <article>
            {content}
        </article>
    </div>
}