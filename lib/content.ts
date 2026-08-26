import { readFileSync } from "node:fs";
import path from "node:path";
import { parse } from "smol-toml";

export type FocusArea = {
    id: string;
    name: string;
    blurb: string;
    color: string;
};

export type Capability = {
    id: string;
    label: string;
};

export type PackageCard = {
    id: string;
    name: string;
    summary: string;
    repo_url: string;
    docs_url?: string;
    paper_url?: string;
    stars: number;
    focus_area: string;
    capabilities: string[];
};

export type Talk = {
    title: string;
    event: string;
    year: number;
    url: string;
};

export type NeighboringCommunity = {
    id: string;
    name: string;
    summary: string;
    github_url: string;
    website_url?: string;
};

export type SiteContent = {
    site: {
        name: string;
        short_name: string;
        url: string;
        logo: string;
        meta_title: string;
        meta_description: string;
        hero_badge: string;
        hero_primary_cta: string;
        hero_secondary_cta: string;
        talks_nav: string;
    };
    hero: {
        headline: string;
        subheadline: string;
        metric_1_label: string;
        metric_1_value: string;
        metric_2_label: string;
        metric_2_value: string;
        metric_3_label: string;
        metric_3_value: string;
    };
    focus_areas: FocusArea[];
    capabilities: Capability[];
    packages: PackageCard[];
    talks: Talk[];
    neighboring_communities: NeighboringCommunity[];
    get_involved: {
        organization_url: string;
        issues_url: string;
        slack_url: string;
        contribution_text: string;
    };
};

let cachedContent: SiteContent | null = null;

function assertString(value: unknown, field: string): string {
    if (typeof value !== "string" || value.trim() === "") {
        throw new Error(`Invalid or missing string field: ${field}`);
    }

    return value;
}

function assertStringArray(value: unknown, field: string): string[] {
    if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
        throw new Error(`Invalid or missing array field: ${field}`);
    }

    return value;
}

function assertNumber(value: unknown, field: string): number {
    if (typeof value !== "number" || Number.isNaN(value)) {
        throw new Error(`Invalid or missing numeric field: ${field}`);
    }

    return value;
}

function parseContent(): SiteContent {
    const contentPath = path.join(process.cwd(), "content.toml");
    const raw = readFileSync(contentPath, "utf8");
    const parsed = parse(raw) as Record<string, unknown>;

    const site = parsed.site as Record<string, unknown>;
    const hero = parsed.hero as Record<string, unknown>;
    const getInvolved = parsed.get_involved as Record<string, unknown>;

    const focusAreas = (parsed.focus_areas as Record<string, unknown>[]).map((item, idx) => ({
        id: assertString(item.id, `focus_areas[${idx}].id`),
        name: assertString(item.name, `focus_areas[${idx}].name`),
        blurb: assertString(item.blurb, `focus_areas[${idx}].blurb`),
        color: assertString(item.color, `focus_areas[${idx}].color`),
    }));

    const capabilities = (parsed.capabilities as Record<string, unknown>[]).map((item, idx) => ({
        id: assertString(item.id, `capabilities[${idx}].id`),
        label: assertString(item.label, `capabilities[${idx}].label`),
    }));

    const packages = (parsed.packages as Record<string, unknown>[]).map((item, idx) => ({
        id: assertString(item.id, `packages[${idx}].id`),
        name: assertString(item.name, `packages[${idx}].name`),
        summary: assertString(item.summary, `packages[${idx}].summary`),
        repo_url: assertString(item.repo_url, `packages[${idx}].repo_url`),
        docs_url: typeof item.docs_url === "string" ? item.docs_url : undefined,
        paper_url: typeof item.paper_url === "string" ? item.paper_url : undefined,
        stars: assertNumber(item.stars, `packages[${idx}].stars`),
        focus_area: assertString(item.focus_area, `packages[${idx}].focus_area`),
        capabilities: assertStringArray(item.capabilities, `packages[${idx}].capabilities`),
    }));

    const talks = (parsed.talks as Record<string, unknown>[]).map((item, idx) => ({
        title: assertString(item.title, `talks[${idx}].title`),
        event: assertString(item.event, `talks[${idx}].event`),
        year: assertNumber(item.year, `talks[${idx}].year`),
        url: assertString(item.url, `talks[${idx}].url`),
    }));

    const neighboringCommunities = (
        (parsed.neighboring_communities as Record<string, unknown>[] | undefined) ?? []
    ).map((item, idx) => ({
        id: assertString(item.id, `neighboring_communities[${idx}].id`),
        name: assertString(item.name, `neighboring_communities[${idx}].name`),
        summary: assertString(item.summary, `neighboring_communities[${idx}].summary`),
        github_url: assertString(item.github_url, `neighboring_communities[${idx}].github_url`),
        website_url: typeof item.website_url === "string" ? item.website_url : undefined,
    }));

    const knownCapabilities = new Set(capabilities.map((item) => item.id));
    for (const pkg of packages) {
        for (const capability of pkg.capabilities) {
            if (!knownCapabilities.has(capability)) {
                throw new Error(`Unknown capability '${capability}' in package '${pkg.id}'`);
            }
        }
    }

    return {
        site: {
            name: assertString(site.name, "site.name"),
            short_name: assertString(site.short_name, "site.short_name"),
            url: assertString(site.url, "site.url"),
            logo: assertString(site.logo, "site.logo"),
            meta_title: assertString(site.meta_title, "site.meta_title"),
            meta_description: assertString(site.meta_description, "site.meta_description"),
            hero_badge: assertString(site.hero_badge, "site.hero_badge"),
            hero_primary_cta: assertString(site.hero_primary_cta, "site.hero_primary_cta"),
            hero_secondary_cta: assertString(site.hero_secondary_cta, "site.hero_secondary_cta"),
            talks_nav: assertString(site.talks_nav, "site.talks_nav"),
        },
        hero: {
            headline: assertString(hero.headline, "hero.headline"),
            subheadline: assertString(hero.subheadline, "hero.subheadline"),
            metric_1_label: assertString(hero.metric_1_label, "hero.metric_1_label"),
            metric_1_value: assertString(hero.metric_1_value, "hero.metric_1_value"),
            metric_2_label: assertString(hero.metric_2_label, "hero.metric_2_label"),
            metric_2_value: assertString(hero.metric_2_value, "hero.metric_2_value"),
            metric_3_label: assertString(hero.metric_3_label, "hero.metric_3_label"),
            metric_3_value: assertString(hero.metric_3_value, "hero.metric_3_value"),
        },
        focus_areas: focusAreas,
        capabilities,
        packages,
        talks,
        neighboring_communities: neighboringCommunities,
        get_involved: {
            organization_url: assertString(getInvolved.organization_url, "get_involved.organization_url"),
            issues_url: assertString(getInvolved.issues_url, "get_involved.issues_url"),
            slack_url: assertString(getInvolved.slack_url, "get_involved.slack_url"),
            contribution_text: assertString(getInvolved.contribution_text, "get_involved.contribution_text"),
        },
    };
}

export function getSiteContent(): SiteContent {
    if (!cachedContent) {
        cachedContent = parseContent();
    }

    return cachedContent;
}
