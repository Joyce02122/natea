(() => {
  /** Current user — used to rank "Recommended for You" by shared tags */
  const YOU = {
    name: "Alex Chen",
    title: "Product Designer",
    company: "Figma",
    tags: ["UX/UI", "AI", "Healthcare", "Product"],
  };

  const ALL_TAGS = [
    "UX/UI",
    "Healthcare",
    "Fintech",
    "AI",
    "Product",
    "Cloud",
    "Hardware",
    "Startups",
    "Data",
    "Leadership",
  ];

  const ATTENDEES = [
    {
      id: "a1",
      name: "Mei Lin",
      title: "Senior Product Designer",
      company: "Microsoft",
      tags: ["UX/UI", "AI", "Product", "Healthcare"],
      linkedin: "https://www.linkedin.com/",
    },
    {
      id: "a2",
      name: "Jason Wu",
      title: "Staff Engineer, ML Platform",
      company: "Amazon",
      tags: ["AI", "Cloud", "Data", "Healthcare"],
      linkedin: "https://www.linkedin.com/",
    },
    {
      id: "a3",
      name: "Priya Shah",
      title: "Head of Product",
      company: "Stripe",
      tags: ["Fintech", "Product", "Leadership", "UX/UI"],
      linkedin: "https://www.linkedin.com/",
    },
    {
      id: "a4",
      name: "Tom Hughes",
      title: "Founder & CEO",
      company: "Helix Biometrics",
      tags: ["Healthcare", "Startups", "AI", "Hardware"],
      linkedin: "https://www.linkedin.com/",
    },
    {
      id: "a5",
      name: "Elena Rossi",
      title: "Engineering Manager",
      company: "Databricks",
      tags: ["Data", "Cloud", "Leadership", "AI"],
      linkedin: "https://www.linkedin.com/",
    },
    {
      id: "a6",
      name: "Kevin Tseng",
      title: "Solutions Architect",
      company: "NVIDIA",
      tags: ["Hardware", "AI", "Cloud", "Startups"],
      linkedin: "https://www.linkedin.com/",
    },
    {
      id: "a7",
      name: "Sarah Kim",
      title: "UX Research Lead",
      company: "Google",
      tags: ["UX/UI", "Product", "Healthcare"],
      linkedin: "https://www.linkedin.com/",
    },
    {
      id: "a8",
      name: "Marcus Lee",
      title: "VP Engineering",
      company: "CoreWeave",
      tags: ["Cloud", "Leadership", "AI", "Hardware"],
      linkedin: "https://www.linkedin.com/",
    },
    {
      id: "a9",
      name: "Nina Patel",
      title: "Investment Associate",
      company: "a16z",
      tags: ["Startups", "Fintech", "AI", "Leadership"],
      linkedin: "https://www.linkedin.com/",
    },
    {
      id: "a10",
      name: "David Cho",
      title: "Clinical AI Scientist",
      company: "Fred Hutch",
      tags: ["Healthcare", "AI", "Data"],
      linkedin: "https://www.linkedin.com/",
    },
    {
      id: "a11",
      name: "Amy Zhou",
      title: "Senior PM, Payments",
      company: "Apple",
      tags: ["Product", "Fintech", "UX/UI"],
      linkedin: "https://www.linkedin.com/",
    },
    {
      id: "a12",
      name: "Robert Chen",
      title: "CTO, AI Systems",
      company: "Appier",
      tags: ["AI", "Startups", "Leadership", "Data"],
      linkedin: "https://www.linkedin.com/",
    },
  ];

  const youTags = new Set(YOU.tags);
  const activeFilters = new Set();

  const template = document.getElementById("attendee-card-template");
  const recommendedGrid = document.getElementById("recommended-grid");
  const browseGrid = document.getElementById("browse-grid");
  const filterTagsEl = document.getElementById("filter-tags");
  const filterCountEl = document.getElementById("filter-count");
  const clearBtn = document.getElementById("clear-filters");
  const emptyEl = document.getElementById("browse-empty");
  const youProfileEl = document.getElementById("you-profile");

  const sharedTags = (attendee) => attendee.tags.filter((t) => youTags.has(t));

  const score = (attendee) => {
    const shared = sharedTags(attendee);
    // Prefer more overlap; slight boost for rarer multi-tag matches
    return shared.length * 10 + (shared.length >= 3 ? 3 : 0);
  };

  const initials = (name) =>
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0].toUpperCase())
      .join("");

  const createCard = (attendee, { showMatch = false } = {}) => {
    const node = template.content.firstElementChild.cloneNode(true);
    const shared = sharedTags(attendee);

    node.querySelector(".attendee-card__initials").textContent = initials(attendee.name);
    node.querySelector(".attendee-card__name").textContent = attendee.name;
    node.querySelector(".attendee-card__title").textContent = attendee.title;
    node.querySelector(".attendee-card__company").textContent = attendee.company;

    const linkedin = node.querySelector(".attendee-card__linkedin");
    linkedin.href = attendee.linkedin;
    linkedin.setAttribute("aria-label", `${attendee.name} on LinkedIn`);

    const tagsEl = node.querySelector(".attendee-card__tags");
    attendee.tags.forEach((tag) => {
      const li = document.createElement("li");
      li.className = "chip" + (youTags.has(tag) ? " chip--shared" : "");
      li.textContent = tag;
      tagsEl.appendChild(li);
    });

    if (showMatch && shared.length) {
      const matchEl = node.querySelector(".attendee-card__match");
      matchEl.hidden = false;
      matchEl.textContent =
        shared.length === 1
          ? `1 shared interest · ${shared[0]}`
          : `${shared.length} shared interests`;
    }

    return node;
  };

  const ranked = ATTENDEES.map((a) => ({ a, s: score(a) }))
    .filter(({ s }) => s > 0)
    .sort((x, y) => y.s - x.s || x.a.name.localeCompare(y.a.name))
    .map(({ a }) => a);

  const recommended = ranked.slice(0, 6);

  const renderRecommended = () => {
    recommendedGrid.replaceChildren();
    recommended.forEach((a) => {
      recommendedGrid.appendChild(createCard(a, { showMatch: true }));
    });
  };

  const matchesFilters = (attendee) => {
    if (!activeFilters.size) return true;
    return [...activeFilters].every((t) => attendee.tags.includes(t));
  };

  const renderBrowse = () => {
    browseGrid.replaceChildren();
    const list = ATTENDEES.filter(matchesFilters).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    list.forEach((a) => browseGrid.appendChild(createCard(a)));

    emptyEl.hidden = list.length > 0;
    const total = ATTENDEES.length;
    const n = list.length;
    if (activeFilters.size) {
      filterCountEl.textContent = `${n} of ${total} attendees`;
    } else {
      filterCountEl.textContent = `${total} attendees`;
    }
    clearBtn.hidden = activeFilters.size === 0;
  };

  const renderFilters = () => {
    filterTagsEl.replaceChildren();
    ALL_TAGS.forEach((tag) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-tag";
      btn.textContent = tag;
      btn.setAttribute("aria-pressed", activeFilters.has(tag) ? "true" : "false");
      btn.addEventListener("click", () => {
        if (activeFilters.has(tag)) activeFilters.delete(tag);
        else activeFilters.add(tag);
        btn.setAttribute("aria-pressed", activeFilters.has(tag) ? "true" : "false");
        // Sync all pressed states if re-rendered not used
        renderFilters();
        renderBrowse();
      });
      filterTagsEl.appendChild(btn);
    });
  };

  clearBtn.addEventListener("click", () => {
    activeFilters.clear();
    renderFilters();
    renderBrowse();
  });

  youProfileEl.textContent = `Signed in as ${YOU.name} · ${YOU.tags.slice(0, 3).join(" · ")}`;

  renderRecommended();
  renderFilters();
  renderBrowse();
})();
