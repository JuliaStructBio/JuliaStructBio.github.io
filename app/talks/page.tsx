import Link from "next/link";
import { getSiteContent } from "@/lib/content";

export default function TalksPage() {
    const content = getSiteContent();

    return (
        <main>
            <header className="site-header shell">
                <Link className="brand" href="/" aria-label={`${content.site.name} home`}>
                    {content.site.logo}
                </Link>
            </header>

            <section className="section shell">
                <div className="section-header">
                    <p className="eyebrow">Community knowledge</p>
                    <h1>JuliaCon and related talks</h1>
                    <p>
                        A growing list of talks and sessions relevant to structural bioinformatics, molecular
                        modeling, and scientific reproducibility.
                    </p>
                </div>

                <div className="talks-list">
                    {content.talks.map((talk) => (
                        <article key={`${talk.event}-${talk.year}-${talk.title}`} className="talk-card">
                            <p className="talk-meta">
                                {talk.event} {talk.year}
                            </p>
                            <h2>{talk.title}</h2>
                            <a href={talk.url} target="_blank" rel="noreferrer">
                                View event
                            </a>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
