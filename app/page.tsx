import PackageExplorer from "@/components/package-explorer";
import { getSiteContent } from "@/lib/content";

export default function Home() {
  const content = getSiteContent();

  return (
    <main id="top">
      <header className="site-header shell">
        <a className="brand" href="#top" aria-label={`${content.site.name} home`}>
          {content.site.logo}
        </a>
        <nav aria-label="Primary">
          <ul>
            <li>
              <a href="#focus">Focus areas</a>
            </li>
            <li>
              <a href="#packages">Packages</a>
            </li>
            <li>
              <a href="/talks/">{content.site.talks_nav}</a>
            </li>
          </ul>
        </nav>
      </header>

      <section className="hero shell">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">{content.site.hero_badge}</p>
            <h1>{content.hero.headline}</h1>
            <p className="hero-subheadline">{content.hero.subheadline}</p>
            <div className="hero-ctas">
              <a className="button primary" href="#packages">
                {content.site.hero_primary_cta}
              </a>
              <a
                className="button secondary"
                href={content.get_involved.organization_url}
                target="_blank"
                rel="noreferrer"
              >
                {content.site.hero_secondary_cta}
              </a>
            </div>
          </div>

          <aside className="hero-panel" aria-label="Community signals">
            <p className="eyebrow">Community signals</p>
            <dl className="hero-metrics">
              <div>
                <dt>{content.hero.metric_1_label}</dt>
                <dd>{content.hero.metric_1_value}</dd>
              </div>
              <div>
                <dt>{content.hero.metric_2_label}</dt>
                <dd>{content.hero.metric_2_value}</dd>
              </div>
              <div>
                <dt>{content.hero.metric_3_label}</dt>
                <dd>{content.hero.metric_3_value}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section id="focus" className="section shell">
        <div className="section-header">
          <p className="eyebrow">Three focus areas. One shared purpose.</p>
          <h2>
            Open communities building the foundations for structural biology and reproducible
            molecular discovery.
          </h2>
        </div>
        <div className="focus-grid">
          {content.focus_areas.map((area, index) => (
            <article key={area.id} className="focus-card" style={{ borderColor: area.color }}>
              <p className="focus-index">{String(index + 1).padStart(2, "0")}</p>
              <h3>{area.name}</h3>
              <p>{area.blurb}</p>
            </article>
          ))}
        </div>
      </section>

      <PackageExplorer capabilities={content.capabilities} packages={content.packages} />

      <section className="section shell">
        <div className="section-header">
          <p className="eyebrow">Not exactly what you are looking for?</p>
          <h2>Check out other GitHub organizations in the Julia scientific ecosystem.</h2>
        </div>
        <div className="neighbors-grid">
          {content.neighboring_communities.map((community) => (
            <article key={community.id} className="neighbor-card">
              <h3>{community.name}</h3>
              <p>{community.summary}</p>
              <div className="neighbor-links">
                <a href={community.github_url} target="_blank" rel="noreferrer">
                  GitHub
                </a>
                {community.website_url ? (
                  <a href={community.website_url} target="_blank" rel="noreferrer">
                    Website
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell">
        <div className="section-header">
          <p className="eyebrow">Get involved</p>
          <h2>Help shape the Structural Bioinformatics in Julia ecosystem.</h2>
          <p>{content.get_involved.contribution_text}</p>
        </div>
        <div className="involved-links">
          <a href={content.get_involved.organization_url} target="_blank" rel="noreferrer">
            Organization
          </a>
          <a href={content.get_involved.issues_url} target="_blank" rel="noreferrer">
            Issues
          </a>
          <a href={content.get_involved.slack_url} target="_blank" rel="noreferrer">
            Julia Slack
          </a>
        </div>
      </section>

      <footer className="site-footer shell">
        <p>{content.site.name}</p>
        <p>Open source. Composable. Reproducible.</p>
      </footer>
    </main>
  );
}
