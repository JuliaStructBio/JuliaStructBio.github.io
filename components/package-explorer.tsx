"use client";

import { useMemo, useState } from "react";
import type { Capability, PackageCard } from "@/lib/content";

type PackageExplorerProps = {
    capabilities: Capability[];
    packages: PackageCard[];
};

export default function PackageExplorer({ capabilities, packages }: PackageExplorerProps) {
    const [activeCapability, setActiveCapability] = useState<string>("all");

    const filteredPackages = useMemo(() => {
        if (activeCapability === "all") {
            return packages;
        }

        return packages.filter((pkg) => pkg.capabilities.includes(activeCapability));
    }, [activeCapability, packages]);

    return (
        <section id="packages" className="section shell">
            <div className="section-header">
                <p className="eyebrow">From raw data to discovery</p>
                <h2>Hand-curated packages for structural bioinformatics workflows.</h2>
            </div>

            <div className="filters" role="tablist" aria-label="Filter packages by capability">
                <button
                    type="button"
                    role="tab"
                    aria-selected={activeCapability === "all"}
                    className={activeCapability === "all" ? "chip active" : "chip"}
                    onClick={() => setActiveCapability("all")}
                >
                    All
                </button>
                {capabilities.map((capability) => (
                    <button
                        key={capability.id}
                        type="button"
                        role="tab"
                        aria-selected={activeCapability === capability.id}
                        className={activeCapability === capability.id ? "chip active" : "chip"}
                        onClick={() => setActiveCapability(capability.id)}
                    >
                        {capability.label}
                    </button>
                ))}
            </div>

            <div className="package-grid">
                {filteredPackages.map((pkg) => (
                    <article className="package-card" key={pkg.id}>
                        <div className="package-meta">
                            <span className="package-stars">★ {pkg.stars}</span>
                        </div>
                        <h3>{pkg.name}</h3>
                        <p>{pkg.summary}</p>
                        <div className="package-tags">
                            {pkg.capabilities.map((capability) => (
                                <span key={capability} className="tag">
                                    {capability}
                                </span>
                            ))}
                        </div>
                        <div className="package-links">
                            <a href={pkg.repo_url} target="_blank" rel="noreferrer">
                                Repository
                            </a>
                            {pkg.docs_url ? (
                                <a href={pkg.docs_url} target="_blank" rel="noreferrer">
                                    Documentation
                                </a>
                            ) : null}
                            {pkg.paper_url ? (
                                <a href={pkg.paper_url} target="_blank" rel="noreferrer">
                                    Paper
                                </a>
                            ) : null}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
