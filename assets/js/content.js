/* ==========================================================================
   content.js — EVERYTHING on the site comes from this file.
   Edit text here; pages re-render automatically. Photos are referenced by
   key (see media.js). HTML is allowed in fields marked (html).
   ========================================================================== */
window.SITE = {
  updated: "November 2026",

  profile: {
    name: "Soorya Ram Shimgekar",
    affiliation: "University of Illinois Urbana-Champaign",
    email: { user: "sooryas2", domain: "illinois.edu" },
    phone: "+1 (447) 902-0530",
    address: ["Siebel Center for Computer Science", "201 N. Goodwin Ave.", "Urbana, IL 61801, USA"],
    links: {
      scholar: "https://scholar.google.com/citations?user=zgO6a_wAAAAJ&hl=en",
      github: "https://github.com/soorya15012001",
      linkedin: "https://www.linkedin.com/in/soorya-ram/",
      cv: "assets/files/Soorya_Ram_Shimgekar_Resume.pdf"
    },
    advisors: [
      { name: "Koustuv Saha", url: "https://koustuv.com/", title: "Assistant Professor of Computer Science, UIUC",
        lab: "OnCARE Lab", labUrl: "https://oncare.cs.illinois.edu/", labNote: "Online and Connected AI Reflections — human-centered AI for health, wellbeing and society." },
      { name: "Hari Sundaram", url: "https://sundaram.cs.illinois.edu/", title: "Professor, Siebel School of Computing and Data Science, UIUC",
        lab: "Crowd Dynamics Lab", labUrl: "https://crowddynamicslab.github.io/", labNote: "computational systems that help people make better decisions — causal inference, AI and HCI." }
    ]
  },

  scholar: { citations: 198, h: 6, i10: 5, asOf: "November 2026" },

  /* (html) the "Now playing" strip on the home page */
  now: [
    "<b>PhD, year 3</b> · UIUC",
    "<b>2 papers</b> · EMNLP 2026 Main",
    "<b>Best Paper</b> · DAIH @ COLM 2026",
    "<b>TA</b> · CS 567 Social Signals &amp; Social Media"
  ],

  /* (html) News — newest first. date = YYYY-MM */
  news: [
    { date: "2026-11", text: "Upcoming: <a href=\"#p-trust\">Trust but Verify</a> — evidence-linked multi-agent extraction from pathology reports — at the LLM4HR workshop @ <b>IEEE BIBM 2026</b> in Dallas (Dec 1)." },
    { date: "2026-10", text: "Two papers in the <b>EMNLP 2026 Main</b> conference in Budapest: <a href=\"#p-ai-psychosis\">AI Psychosis</a> (co-first author) and <a href=\"#p-llumi\">LLUMI</a>.<span class=\"badge badge--award\">Best Paper Nominee · LLUMI</span>" },
    { date: "2026-10", text: "Co-authored <a href=\"#p-hpylori\">Finding H. pylori in the Fine Print</a>, which won the <b>Best Paper Award</b> at the DAIH workshop @ COLM 2026 in San Francisco." },
    { date: "2026-10", text: "New preprint: <a href=\"#p-risk-refusal\">Risk and Refusal</a> — why LLM replies to suicidal disclosures turn risky or refuse, and a clinician-developed fix (co-first author)." },
    { date: "2026-08", text: "Fall 2026: teaching assistant for <b>CS 567 — Social Signals and Social Media</b>." },
    { date: "2026-07", text: "<a href=\"#p-belief\">Belief Is All You Need</a> — signed-belief GNNs for conspiratorial discourse on Telegram — at the NLP+CSS workshop @ ACL 2026." },
    { date: "2026-06", text: "Co-authored paper on suicide-related language in adolescents’ smartphone keyboard entries out in <b>npj Digital Medicine</b>." },
    { date: "2026-06", text: "Our <a href=\"#p-jmir\">JMIR AI</a> paper — suicidal ideation online through the lens of the Interpersonal Theory of Suicide — is published." },
    { date: "2026-05", text: "<b>Best Paper Honorable Mention</b> at ACM WebSci ’26 in Braunschweig for <a href=\"#p-websci\">detecting early and implicit suicidal ideation</a>.<span class=\"badge badge--award\">Honorable Mention</span>" },
    { date: "2026-05", text: "Started a summer as a <b>Research Scholar at Aalto University</b>, Finland, building MEM-STRESS — a memory-augmented, Oura-grounded stress companion." },
    { date: "2025-12", text: "Papers from my Nimblemind internship at <b>ML4H 2025</b>, <b>IEEE BigData 2025</b> and <b>IEEE BIBM 2025</b>." },
    { date: "2025-08", text: "Fall 2025: teaching assistant for <b>CS 598 — Computing and Wellbeing</b>." },
    { date: "2025-06", text: "Started an AI/ML internship at <b>Nimblemind Inc.</b>" },
    { date: "2024-08", text: "Started my <b>PhD in Computer Science</b> at the University of Illinois Urbana-Champaign." },
    { date: "2023-12", text: "Finished my <b>MS in Computer Science</b> at Illinois with a 4.0 GPA." },
    { date: "2023-06", text: "Summer at <b>JPMorgan Chase</b> on explainable credit-risk models — and a contribution to XGBoost." },
    { date: "2023-01", text: "Teaching assistant for <b>CS 418 — Interactive Computer Graphics</b> (Spring &amp; Fall 2023)." }
  ],

  /* Research themes. id is referenced by publications (theme: "...") */
  themes: [
    { id: "llm", title: "Conversational AI in high-stakes moments",
      blurb: "What happens when someone discloses suicidal thoughts to a chatbot, or drifts toward delusional thinking over a long conversation? I audit when language models turn risky, refuse or amplify harm, and trace those behaviors to mechanisms inside the model — from inattention to single-word changes that shift its internals." },
    { id: "risk", title: "Reading risk in online communities",
      blurb: "Distress is rarely stated outright. I detect early and implicit signs of suicidal ideation by reading a person’s posting history alongside the conversations around them, ground analyses in psychological theory, and study how conspiratorial beliefs spread through everyday discussion." },
    { id: "support", title: "AI that supports the supporters",
      blurb: "Much of the emotional work online is done by peers. I build AI writing assistance that learns from community feedback, and study how supporters experience it — where it helps, and where it raises questions of authorship, authenticity and trust." }
  ],

  /* Publications — newest first. Names ending in * = equal contribution.
     key:true → listed on the theme cards; selected:true → home page. */
  pubs: [
    { id: "p-trust", short: "Trust but Verify", topics: ["health", "ai"], methods: ["Multi-Agent Systems", "Language", "Information Extraction"], venueUrl: "https://llm4hr.github.io/", year: 2026, theme: "clinical", kind: "Workshop",
      title: "Trust but Verify: Evidence-Linked Multi-Agent Clinical Information Extraction in Pathology",
      authors: ["Yufan Wang", "Anit Kumar Sahu", "Yan Fei Ng", "Daniel Kang", "Shayan Vassef", "Soorya Ram Shimgekar", "Koustuv Saha", "Piyum Zonooz", "Navin Kumar", "Chee Leong Cheng", "Li Yan Khor"],
      venue: "LLM4HR @ IEEE BIBM 2026", role: "To appear", venueFull: "1st International Workshop on Large Language Models for Healthcare and Radiotherapy (LLM4HR), held with the 2026 IEEE International Conference on Bioinformatics and Biomedicine (BIBM), Dallas, TX, Dec 1, 2026.",
      container: "Workshop on Large Language Models for Healthcare and Radiotherapy (LLM4HR) at IEEE BIBM 2026", arxiv: "2607.06435",
      tldr: "A configurable multi-agent extractor for pathology reports that returns verbatim source evidence for every answer, reaching 98.6% accuracy on 216 decisions; its value is traceability, not beating single-model baselines.",
      links: [{ label: "arXiv", url: "https://arxiv.org/abs/2607.06435" }, { label: "PDF", url: "https://arxiv.org/pdf/2607.06435v2" }] },

    { id: "p-ai-psychosis", topics: ["ai", "mh", "online"], methods: ["LLM Evaluations", "Simulation", "Language"], venueUrl: "https://2026.emnlp.org/", year: 2026, theme: "llm", kind: "Conference", first: true, key: true, selected: true,
      title: "AI Psychosis: Does Conversational AI Amplify Delusion-Related Language?", short: "AI Psychosis",
      authors: ["Soorya Ram Shimgekar*", "Vipin Gunda*", "Jiwon Kim", "Violeta J. Rodriguez", "Hari Sundaram", "Koustuv Saha"],
      venue: "EMNLP 2026", role: "Co-first author", venueFull: "Proceedings of the 2026 Conference on Empirical Methods in Natural Language Processing (EMNLP 2026), Main Conference, Budapest, pp. 430–451.",
      container: "Proceedings of the 2026 Conference on Empirical Methods in Natural Language Processing", pages: "430--451", publisher: "Association for Computational Linguistics", doi: "10.18653/2026.emnlp-main.20",
      hook: "Simulated users with a history of delusion-related talk drift further in long chatbot conversations — and a DelusionScore-aware reply strategy curbs it.",
      tldr: "Simulated users modeled on Reddit posters with prior delusion-related talk show rising delusion-related language over long chats with GPT, LLaMA and Qwen; DelusionScore-aware responses curb the drift.",
      finding: "Treatment users’ DelusionScore rose by an average of 233% over controls across 3,500 simulated 34-turn conversations; reality skepticism and compulsive reasoning rose the most.",
      links: [{ label: "Paper", url: "https://aclanthology.org/2026.emnlp-main.20/" }, { label: "PDF", url: "https://aclanthology.org/2026.emnlp-main.20.pdf" }, { label: "arXiv", url: "https://arxiv.org/abs/2603.19574" }, { label: "Code", url: "https://github.com/soorya15012001/AI-Psychosis" }] },

    { id: "p-llumi", topics: ["ai", "mh", "online"], methods: ["LLM Evaluations", "Machine Learning", "Language"], venueUrl: "https://2026.emnlp.org/", year: 2026, theme: "support", kind: "Conference", key: true, award: "Best Paper Nominee",
      title: "LLUMI: Improving LLM Writing Assistance for Mental Health Support with Online Community Feedback", short: "LLUMI",
      authors: ["Jiwon Kim", "Maya Ajit", "Sherry Gong", "Soorya Ram Shimgekar", "Dong Whi Yoo", "Eshwar Chandrasekharan", "Koustuv Saha"],
      venue: "EMNLP 2026", venueFull: "Proceedings of the 2026 Conference on Empirical Methods in Natural Language Processing (EMNLP 2026), Main Conference, Budapest, pp. 51260–51278.",
      container: "Proceedings of the 2026 Conference on Empirical Methods in Natural Language Processing", pages: "51260--51278", publisher: "Association for Computational Linguistics", doi: "10.18653/2026.emnlp-main.2254",
      tldr: "Fine-tunes small, in-house open-source models on Reddit community votes to draft and revise mental-health support replies, performing comparably to proprietary GPT models with better privacy.",
      links: [{ label: "Paper", url: "https://aclanthology.org/2026.emnlp-main.2254/" }, { label: "PDF", url: "https://aclanthology.org/2026.emnlp-main.2254.pdf" }, { label: "arXiv", url: "https://arxiv.org/abs/2605.30273" }] },

    { id: "p-risk-refusal", topics: ["ai", "mh"], methods: ["LLM Evaluations", "Interpretability", "Language"], venueUrl: "https://arxiv.org/abs/2610.22715", year: 2026, theme: "llm", kind: "Preprint", first: true, key: true, selected: true,
      title: "Risk and Refusal: Mechanisms of LLM Responses to Suicidal Ideation", short: "Risk and Refusal",
      authors: ["Drishti Goel*", "Soorya Ram Shimgekar*", "Jeongah Lee", "Violeta J. Rodriguez", "Daniel S. Brown", "Ravi Karkar", "Koustuv Saha"],
      venue: "arXiv 2026", role: "Co-first author", venueFull: "arXiv preprint arXiv:2610.22715 (2026).", arxiv: "2610.22715",
      hook: "Why replies to suicidal disclosures turn risky — mostly inattention — and why a clinician-developed protocol beats simply suppressing refusals.",
      tldr: "Tests eight LLMs on suicidal-ideation disclosures: risky replies stem mainly from inattention, plus refusal; a clinician-developed protocol lowers both, whereas suppressing refusal doesn’t reliably cut risk.",
      finding: "With classification labels plus clinician guidance, risky responses on Reddit SI data fell from 17.8–63.9% to 1.9–3.3%, significant in all 24 model–dataset comparisons.",
      links: [{ label: "arXiv", url: "https://arxiv.org/abs/2610.22715" }, { label: "PDF", url: "https://arxiv.org/pdf/2610.22715" }] },

    { id: "p-perturb", topics: ["ai"], methods: ["LLM Evaluations", "Interpretability"], venueUrl: "https://arxiv.org/abs/2605.30913", year: 2026, theme: "llm", kind: "Preprint", first: true, key: true,
      title: "Prompt PerturbAItions: Mechanisms of LLM Response Inconsistencies", short: "Prompt PerturbAItions",
      authors: ["Soorya Ram Shimgekar", "Agam Goyal", "Amruta Parulekar", "Joshua Chen", "Yian Wang", "Navin Kumar", "Hari Sundaram", "Eshwar Chandrasekharan", "Koustuv Saha"],
      venue: "arXiv 2026", venueFull: "arXiv preprint arXiv:2605.30913.", arxiv: "2605.30913",
      tldr: "Appending a single polite, random or toxic word to otherwise-equivalent prompts lowers accuracy for most of seven LLMs; attribution graphs show perturbation-sensitive nodes gaining influence.",
      finding: "Under high-toxicity prompts, accuracy drops ranged from −4.2% (GPT-5-nano) to −36.1% (Gemma-2-2B), while refusals stayed below 2.2% — so refusals don’t explain the drops.",
      links: [{ label: "arXiv", url: "https://arxiv.org/abs/2605.30913" }, { label: "PDF", url: "https://arxiv.org/pdf/2605.30913" }] },

    { id: "p-hpylori", topics: ["health", "ai"], methods: ["Multi-Agent Systems", "Language", "Information Extraction"], venueUrl: "https://daih2026.github.io/", year: 2026, theme: "clinical", kind: "Workshop", award: "Best Paper Award", key: true,
      title: "Finding H. pylori in the Fine Print: Evidence-Linked Multi-Agent Case Finding from Gastric Biopsy Reports", short: "Finding H. pylori in the Fine Print",
      authors: ["Yufan Wang", "Anit Kumar Sahu", "Yan Fei Ng", "Daniel Kang", "Shayan Vassef", "Soorya Ram Shimgekar", "Koustuv Saha", "Piyum Zonooz", "Navin Kumar", "Chee Leong Cheng", "Li Yan Khor"],
      venue: "DAIH @ COLM 2026", venueFull: "DAIH: Deploying AI in Healthcare Workshop, co-located with COLM 2026, San Francisco (oral).",
      container: "Deploying AI in Healthcare (DAIH) Workshop at COLM 2026",
      tldr: "A pilot of an evidence-linked multi-agent workflow that flags H. pylori findings in gastric biopsy reports, getting 213 of 216 decisions right with traceable evidence.",
      links: [{ label: "OpenReview", url: "https://openreview.net/forum?id=aSOSebwCuB" }, { label: "PDF", url: "https://arxiv.org/pdf/2607.06435v1" }] },

    { id: "p-peerpen", short: "PeerPen", topics: ["ai", "mh", "online"], methods: ["User Study", "Language"], venueUrl: "https://arxiv.org/abs/2609.14886", year: 2026, theme: "support", kind: "Preprint",
      title: "PeerPen: AI-Assisted Writing for Online Mental Health Peer Support",
      authors: ["Jiwon Kim", "Sherry Gong", "Maya Ajit", "Soorya Ram Shimgekar", "Yunhao Yuan", "Dong Whi Yoo", "Eshwar Chandrasekharan", "Koustuv Saha"],
      venue: "arXiv 2026", venueFull: "arXiv preprint arXiv:2609.14886.", arxiv: "2609.14886",
      tldr: "An interview study (n=15) with PeerPen, an AI writing aid in a Reddit-like interface: it eased composing peer-support replies but raised authorship, authenticity and trust concerns.",
      links: [{ label: "arXiv", url: "https://arxiv.org/abs/2609.14886" }, { label: "PDF", url: "https://arxiv.org/pdf/2609.14886" }] },

    { id: "p-tumor", short: "From Analytics to Tumor Boards", topics: ["health", "ai"], methods: ["Multi-Agent Systems", "Information Extraction"], venueUrl: "https://arxiv.org/abs/2608.28974", year: 2026, theme: "clinical", kind: "Preprint",
      title: "From Analytics to Tumor Boards: An Evidence-Linked Multi-Agent Workflow for Oncology Feature Extraction",
      authors: ["Daniel Kang", "Michelle Hu", "Soorya Ram Shimgekar", "Shayan Vassef", "Yufan Wang", "Anit Kumar Sahu", "Munmun De Choudhury", "Vedant Das Swain", "Christian Poellabauer", "Li Yan Khor", "Koustuv Saha", "Robert Wojciechowski", "Elliot Kidd", "Piyum Zonooz", "Navin Kumar"],
      venue: "arXiv 2026", venueFull: "arXiv preprint arXiv:2608.28974.", arxiv: "2608.28974",
      tldr: "A configurable multi-agent workflow extracts 328 clinician-defined oncology attributes from fragmented EHR documents with source evidence, reaching 85.0% F1 versus 66.4% for a comparator.",
      links: [{ label: "arXiv", url: "https://arxiv.org/abs/2608.28974" }, { label: "PDF", url: "https://arxiv.org/pdf/2608.28974" }] },

    { id: "p-heart", short: "Tracing the Heart", topics: ["health", "ai"], methods: ["Multi-Agent Systems", "Machine Learning"], venueUrl: "https://arxiv.org/abs/2608.06366", year: 2026, theme: "clinical", kind: "Preprint", first: true,
      title: "Tracing the Heart: An Evidence-Linked Pipeline for Heart-Failure Feature Engineering",
      authors: ["Soorya Ram Shimgekar", "Michelle Hu", "Dorisa Shehi", "Daniel Kang", "Roy Ka-Wei Lee", "Koustuv Saha", "Christian Poellabauer", "Christopher Lee", "Sajeev Singh", "Piyum Zonooz", "Navin Kumar", "Zeeshan Ahmed", "Priyadarshini Kachroo"],
      venue: "arXiv 2026", venueFull: "arXiv preprint arXiv:2608.06366.", arxiv: "2608.06366",
      tldr: "A multi-agent, evidence-linked pipeline builds auditable heart-failure features from EHR tables, lifting HFrEF AUROC from 0.895 to 0.963 and HFpEF from 0.870 to 0.910 on 500 synthetic records.",
      links: [{ label: "arXiv", url: "https://arxiv.org/abs/2608.06366" }, { label: "PDF", url: "https://arxiv.org/pdf/2608.06366" }] },

    { id: "p-belief", topics: ["online", "ai"], methods: ["Graph Learning", "Language"], venueUrl: "https://aclanthology.org/volumes/2026.nlpcss-1/", year: 2026, theme: "risk", kind: "Workshop", first: true, key: true,
      title: "Belief Is All You Need: Signed Belief Graph Neural Networks for Topic Modeling in Conspiratorial Discourse", short: "Belief Is All You Need",
      authors: ["Soorya Ram Shimgekar", "Abhay Goyal", "Roy Ka-Wei Lee", "Koustuv Saha", "Pi Zonooz", "Edson C. Tandoc Jr.", "Navin Kumar"],
      venue: "NLP+CSS @ ACL 2026", venueFull: "Proceedings of the 7th Workshop on Natural Language Processing and Computational Social Science (NLP+CSS 2026), held with ACL 2026, San Diego, pp. 341–355.",
      container: "Proceedings of the 7th Workshop on Natural Language Processing and Computational Social Science (NLP+CSS)", pages: "341--355", publisher: "Association for Computational Linguistics",
      tldr: "Classifies 553,648 Singapore Telegram messages and clusters signed-belief GNN embeddings into seven topics: conspiratorial content shows up across everyday topics like finance and law, not in isolated echo chambers.",
      finding: "A fine-tuned RoBERTa-large conspiracy classifier reached F1 = 0.866; SiBeGNN clusters scored cDBI 8.38 versus 13.60–67.27 for baselines.",
      links: [{ label: "Paper", url: "https://aclanthology.org/2026.nlpcss-1.20/" }, { label: "PDF", url: "https://aclanthology.org/2026.nlpcss-1.20.pdf" }] },

    { id: "p-npj", short: "Suicide-related language in adolescents’ keyboards", topics: ["mh", "health"], methods: ["Language", "Mobile Sensing", "LLM Evaluations"], venueUrl: "https://www.nature.com/npjdigitalmed/", year: 2026, theme: "other", kind: "Journal", bib: "article",
      title: "Identifying suicide-related language in smartphone keyboard entries among high-risk adolescents",
      authors: ["Paul Alexander Bloom*", "Isaac N. Treves*", "David Pagliaccio", "Isabella Nadel", "Emma Wool", "Hayley Quinones", "Julia Greenblatt", "Natalia Parjane", "Katherine Durham", "Samantha Salem", "Esha Trivedi", "Hanga Galfalvy", "Nicholas B. Allen", "Deanna M. Barch", "Ashley Blanchard", "David Brent", "Lauren S. Chernick", "Peter S. Dayan", "Caroline Hoyniak", "Karla Joyce", "Jaclyn S. Kirshenbaum", "Lilian Y. Li", "Joan Luby", "Simryn Molina", "Giovanna Porta", "Zoe Price", "Eva Purvin", "Alexander Saul Rosenberg", "Koustuv Saha", "Stewart A. Shankman", "Adela Schwartz", "Soorya Ram Shimgekar", "Jamie Zelazny", "Randy P. Auerbach"],
      venue: "npj Digital Medicine", venueFull: "npj Digital Medicine, vol. 9, article 797 (2026).", container: "npj Digital Medicine", volume: "9", doi: "10.1038/s41746-026-02921-x",
      tldr: "A youth-specific suicide lexicon outperformed few-shot LLMs on 171k labeled keyboard entries; in two high-risk adolescent cohorts, suicidal thoughts and behaviors were associated with more suicide-related smartphone language.",
      links: [{ label: "Paper", url: "https://www.nature.com/articles/s41746-026-02921-x" }, { label: "PDF", url: "https://www.nature.com/articles/s41746-026-02921-x.pdf" }] },

    { id: "p-jmir", topics: ["mh", "online", "ai"], methods: ["Psychological Theory", "Language"], venueUrl: "https://ai.jmir.org/", year: 2026, theme: "risk", kind: "Journal", first: true, key: true, selected: true, bib: "article",
      title: "Suicidal Ideation in Online Spaces Through the Lens of Interpersonal Theory of Suicide: Exploratory Study of Self-Disclosure, Peer Support, and AI Responses", short: "Interpersonal Theory of Suicide, online",
      authors: ["Soorya Ram Shimgekar", "Violeta J. Rodriguez", "Paul A. Bloom", "Dong Whi Yoo", "Koustuv Saha"],
      venue: "JMIR AI 2026", venueFull: "JMIR AI, vol. 5, e86265 (2026).", container: "JMIR AI", volume: "5", doi: "10.2196/86265",
      hook: "Psychological theory meets 59,607 r/SuicideWatch posts — and AI replies that are structurally strong but miss personalization and emotional depth.",
      tldr: "Applies the Interpersonal Theory of Suicide to 59,607 r/SuicideWatch posts and peer replies; AI-generated replies were structurally stronger but less diverse and lacked personalization and emotional depth.",
      links: [{ label: "Paper", url: "https://ai.jmir.org/2026/1/e86265" }, { label: "PDF", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13232919/pdf/ai-v5-e86265.pdf" }, { label: "arXiv", url: "https://arxiv.org/abs/2504.13277" }] },

    { id: "p-websci", topics: ["mh", "online"], methods: ["Machine Learning", "Language"], venueUrl: "https://dl.acm.org/doi/10.1145/3795766.3799758", year: 2026, theme: "risk", kind: "Conference", first: true, key: true, selected: true, award: "Best Paper Honorable Mention", accept: "32%",
      title: "Detecting Early and Implicit Suicidal Ideation via Longitudinal and Information Environment Signals on Social Media", short: "Early & implicit suicidal ideation",
      authors: ["Soorya Ram Shimgekar", "Ruining Zhao", "Agam Goyal", "Violeta J. Rodriguez", "Paul A. Bloom", "Navin Kumar", "Hari Sundaram", "Koustuv Saha"],
      venue: "WebSci ’26", venueFull: "Proceedings of the 18th ACM Web Science Conference (WebSci ’26), Braunschweig, Germany, pp. 176–187.",
      container: "Proceedings of the 18th ACM Web Science Conference", pages: "176--187", publisher: "ACM", doi: "10.1145/3795766.3799758",
      hook: "Catching suicidal ideation before it is stated, by reading a person’s posting history together with what their social circle is discussing.",
      tldr: "Predicts early, implicit signs of suicidal ideation on Reddit by combining a user’s posting history with discussions from socially close peers in a fine-tuned DeBERTa-v3 model.",
      finding: "Across 1,000 Reddit users (500 cases, 500 controls), the approach improved early and implicit detection by an average of 10% over all other baselines.",
      links: [{ label: "Paper", url: "https://doi.org/10.1145/3795766.3799758" }, { label: "PDF", url: "https://arxiv.org/pdf/2510.14889" }] },

    { id: "p-ml4h", topics: ["health", "ai"], methods: ["Multimodal", "Machine Learning"], venueUrl: "https://proceedings.mlr.press/v297/", year: 2025, theme: "clinical", kind: "Conference", key: true,
      title: "One VLM, Two Roles: Stage-Wise Routing and Specialty-Level Deployment for Clinical Workflows", short: "One VLM, Two Roles",
      authors: ["Shayan Vassef", "Soorya Ram Shimgekar", "Abhay Goyal", "Christian Poellabauer", "Koustuv Saha", "Pi Zonooz", "Navin Kumar"],
      venue: "ML4H 2025", venueFull: "Proceedings of the Fifth Machine Learning for Health Symposium (ML4H 2025), PMLR 297, pp. 263–274, San Diego.",
      container: "Proceedings of the Fifth Machine Learning for Health Symposium", pages: "263--274", volume: "297", publisher: "PMLR",
      tldr: "One vision-language model, two jobs: routing medical images to the right specialist model through a three-stage workflow, and — fine-tuned per specialty — handling multiple clinical tasks itself.",
      finding: "The stage-wise router improved routing accuracy by +9 points on the training split and +11 on held-out data over a baseline router, with lower held-out calibration error.",
      links: [{ label: "Paper", url: "https://proceedings.mlr.press/v297/vassef26a.html" }, { label: "arXiv", url: "https://arxiv.org/abs/2508.16839" }] },

    { id: "p-nimblelabs", short: "NimbleLabs", topics: ["health", "ai"], methods: ["Multi-Agent Systems", "Systems"], venueUrl: "https://doi.org/10.1109/BigData66926.2025.11401464", year: 2025, theme: "clinical", kind: "Conference", first: true,
      title: "NimbleLabs: Accelerating Healthcare AI Development Through Agentic AI",
      authors: ["Soorya Ram Shimgekar", "Abhay Goyal", "Shayan Vassef", "Koustuv Saha", "Christian Poellabauer", "Xavier Vautier", "Pi Zonooz", "Navin Kumar"],
      venue: "IEEE BigData 2025", venueFull: "2025 IEEE International Conference on Big Data (BigData), Macau, pp. 8327–8329.",
      container: "2025 IEEE International Conference on Big Data (BigData)", pages: "8327--8329", publisher: "IEEE", doi: "10.1109/BigData66926.2025.11401464",
      tldr: "A six-agent system that helps data scientists, medical researchers and practitioners anonymize, understand and model medical data without deep machine-learning expertise.",
      links: [{ label: "Paper", url: "https://doi.org/10.1109/BigData66926.2025.11401464" }, { label: "Preprint", url: "https://doi.org/10.20944/preprints202508.1713.v1" }, { label: "Platform", url: "https://nimblelabs.ai/agent" }] },

    { id: "p-bibm25", topics: ["health", "ai"], methods: ["Multi-Agent Systems", "Machine Learning"], venueUrl: "https://doi.org/10.1109/BIBM66473.2025.11356498", year: 2025, theme: "clinical", kind: "Conference", first: true, key: true,
      title: "Agentic AI Framework for End-to-End Medical Data Inference", short: "Agentic AI for end-to-end medical inference",
      authors: ["Soorya Ram Shimgekar", "Shayan Vassef", "Abhay Goyal", "Koustuv Saha", "Pi Zonooz", "Navin Kumar"],
      venue: "IEEE BIBM 2025", venueFull: "2025 IEEE International Conference on Bioinformatics and Biomedicine (BIBM), Wuhan, pp. 7807–7810.",
      container: "2025 IEEE International Conference on Bioinformatics and Biomedicine (BIBM)", pages: "7807--7810", publisher: "IEEE", doi: "10.1109/BIBM66473.2025.11356498",
      tldr: "Modular, single-task AI agents automate the clinical ML lifecycle end to end — ingestion and anonymization through preprocessing, model selection and interpretable inference.",
      links: [{ label: "Paper", url: "https://doi.org/10.1109/BIBM66473.2025.11356498" }, { label: "arXiv", url: "https://arxiv.org/abs/2507.18115" }] },

    { id: "p-wearables", topics: ["health"], methods: ["Mobile Sensing", "Machine Learning"], venueUrl: "https://arxiv.org/abs/2511.19577", year: 2025, theme: "wearable", kind: "Preprint", key: true,
      title: "From Wearables to Warnings: Predicting Pain Spikes in Patients with Opioid Use Disorder", short: "From Wearables to Warnings",
      authors: ["Abhay Goyal", "Navin Kumar", "Kimberly DiMeola", "Rafael Trujillo", "Soorya Ram Shimgekar", "Christian Poellabauer", "Pi Zonooz", "Ermonda Gjoni-Markaj", "Declan Barry", "Lynn Madden"],
      venue: "arXiv 2025", venueFull: "arXiv preprint arXiv:2511.19577.", arxiv: "2511.19577",
      tldr: "In a pilot with patients managing chronic pain and opioid use disorder, machine learning on wearable data predicted pain spikes, while LLMs offered limited insight.",
      links: [{ label: "arXiv", url: "https://arxiv.org/abs/2511.19577" }, { label: "PDF", url: "https://arxiv.org/pdf/2511.19577" }] },

    { id: "p-eswa", topics: ["mobility"], methods: ["Machine Learning"], venueUrl: "https://www.sciencedirect.com/journal/expert-systems-with-applications", year: 2022, theme: "early", kind: "Journal", bib: "article",
      title: "Intelligent advice system for human drivers to prevent overtaking accidents in roads",
      authors: ["P. Shunmuga Perumal", "Yong Wang", "M. Sujasree", "Venkat Mukthineni", "Soorya Ram Shimgekar"],
      venue: "Expert Syst. Appl. 2022", venueFull: "Expert Systems with Applications, vol. 199, 117178 (2022).", container: "Expert Systems with Applications", volume: "199", doi: "10.1016/j.eswa.2022.117178",
      tldr: "An advisory system for human drivers that predicts lead-vehicle velocities and potential time-to-collision to help prevent overtaking accidents.",
      links: [{ label: "Paper", url: "https://doi.org/10.1016/j.eswa.2022.117178" }] },

    { id: "p-icsoftcomp", topics: ["vision"], methods: ["Machine Learning"], venueUrl: "https://doi.org/10.1007/978-3-031-05767-0", year: 2022, theme: "early", kind: "Conference", first: true,
      title: "Database Concentration Method for Efficient Image Retrieval Using Clustering and Image Tag Comparison",
      authors: ["Soorya Ram Shimgekar", "Preetham Reddy Pathi", "V. Vijayarajan"],
      venue: "icSoftComp 2021", venueFull: "Soft Computing and its Engineering Applications (icSoftComp 2021), Communications in Computer and Information Science, vol. 1572, pp. 222–234, Springer, 2022.",
      container: "Soft Computing and its Engineering Applications (icSoftComp 2021)", pages: "222--234", volume: "1572", publisher: "Springer", doi: "10.1007/978-3-031-05767-0_18",
      tldr: "Clusters unlabeled images with ResNet-50 features and K-Means, auto-tags each cluster, then searches only matching clusters — shrinking the CIFAR-10 search space from 50,000 to 15,000 images.",
      links: [{ label: "Paper", url: "https://doi.org/10.1007/978-3-031-05767-0_18" }] },

    { id: "p-eaai", topics: ["mobility"], methods: ["Review"], venueUrl: "https://www.sciencedirect.com/journal/engineering-applications-of-artificial-intelligence", year: 2021, theme: "early", kind: "Journal", bib: "article",
      title: "An insight into crash avoidance and overtaking advice systems for Autonomous Vehicles: A review, challenges and solutions",
      authors: ["P. Shunmuga Perumal", "M. Sujasree", "Suresh Chavhan", "Deepak Gupta", "Venkat Mukthineni", "Soorya Ram Shimgekar", "Ashish Khanna", "Giancarlo Fortino"],
      venue: "Eng. Appl. AI 2021", venueFull: "Engineering Applications of Artificial Intelligence, vol. 104, 104406 (2021).", container: "Engineering Applications of Artificial Intelligence", volume: "104", doi: "10.1016/j.engappai.2021.104406",
      tldr: "A review of crash-avoidance and overtaking-advice subsystems in driver assistance, focused on accuracy, response time and robustness, with a typical functional architecture and open gaps.",
      links: [{ label: "Paper", url: "https://doi.org/10.1016/j.engappai.2021.104406" }] },

    { id: "p-ipact", topics: ["vision", "health"], methods: ["Machine Learning", "Speech"], venueUrl: "https://doi.org/10.1109/i-PACT52855.2021.9696600", year: 2021, theme: "early", kind: "Conference", first: true,
      title: "Voice based Segmentation of Laparoscopic Surgical Tools and its Image Enhancement",
      authors: ["Soorya Ram Shimgekar", "Preetham Reddy Pathi", "V. Santhi"],
      venue: "IEEE i-PACT 2021", venueFull: "2021 Innovations in Power and Advanced Computing Technologies (i-PACT), IEEE, Kuala Lumpur, pp. 1–7.",
      container: "2021 Innovations in Power and Advanced Computing Technologies (i-PACT)", pages: "1--7", publisher: "IEEE", doi: "10.1109/i-PACT52855.2021.9696600",
      tldr: "A voice-controlled system — Mask R-CNN for segmentation, Kaldi for speech — that segments laparoscopic tools and reduces glare and fogging so surgeons stay focused.",
      links: [{ label: "Paper", url: "https://doi.org/10.1109/i-PACT52855.2021.9696600" }] },

    { id: "p-iet", topics: ["vision"], methods: ["Systems", "Speech"], venueUrl: "https://doi.org/10.1049/PBPC042E", year: 2021, theme: "early", kind: "Book chapter", first: true, bib: "incollection",
      title: "Glasses for smart tourism applications",
      authors: ["Soorya Ram Shimgekar", "Pathi Preetham Reddy", "Praveen Kumar Reddy Maddikunta", "Giridhar Reddy Bojja"],
      venue: "IET book chapter", venueFull: "Chapter 13 in Computer Vision and Recognition Systems Using Machine and Deep Learning Approaches, IET Computing Series 42, pp. 301–335 (2021).",
      container: "Computer Vision and Recognition Systems Using Machine and Deep Learning Approaches", pages: "301--335", publisher: "IET", doi: "10.1049/PBPC042E_ch13",
      tldr: "A voice-driven smart-glasses system for tourists combining speech recognition with cloud APIs for face recognition, navigation, species identification, OCR, translation and weather.",
      links: [{ label: "Chapter", url: "https://doi.org/10.1049/PBPC042E_ch13" }, { label: "Code", url: "https://github.com/soorya15012001/Smart-Glasses" }] }
  ],

  experience: [
    { role: "Graduate Researcher", org: "OnCARE Lab & Crowd Dynamics Lab, UIUC", url: "https://oncare.cs.illinois.edu/", where: "Urbana, IL", when: "Aug 2024 – present", current: true,
      bullets: ["PhD research with Koustuv Saha and Hari Sundaram on how conversational AI responds to people in distress, early and implicit signals of suicidal ideation online, and AI support for online peer supporters.", "Lead or co-lead author on papers at EMNLP, ACM WebSci (Best Paper Honorable Mention), JMIR AI and NLP+CSS @ ACL."],
      tags: ["LLMs", "Mental health", "CSS"] },
    { role: "Research Scholar", org: "Aalto University", url: "https://www.aalto.fi/en", where: "Espoo, Finland", when: "May – Aug 2026",
      bullets: ["Developed <b>MEM-STRESS</b>, a hierarchical memory framework integrating Oura behavioral signals with conversational AI for personalized stress management.", "Ran a controlled user study (N=40): 45% improvement in personalization, 32% increase in behavioral grounding and 50% deeper user engagement versus a baseline chatbot."],
      tags: ["Conversational AI", "Wearables", "User study"] },
    { role: "Software Engineer — AI/ML", org: "Nimblemind Inc.", url: "https://nimblelabs.ai/agent", where: "Internship", when: "Jun 2025 – present", current: true,
      bullets: ["Built multi-agent frameworks that automate the healthcare ML pipeline — ingestion, feature extraction and model selection.", "Built the <b>NimbleLabs</b> platform, where users upload data, supporting documents and a prompt for automated model selection, feature engineering, preprocessing and fine-tuning.", "Developed a vision-language model on MedGemma that routes medical images to best-fit specialist models (ML4H 2025)."],
      tags: ["Agentic AI", "MedGemma", "Healthcare"] },
    { role: "Software Engineer — AI/ML", org: "JPMorgan Chase & Co.", url: "https://www.jpmorganchase.com/", where: "Summer 2023", when: "Jun – Aug 2023",
      bullets: ["Enhanced credit-card risk models by splitting the ‘bad customer’ class by months of missed payments.", "Built an explainable-ML pipeline with SHAP and gain-based feature selection for the new classes — an 8–10% accuracy boost without sacrificing performance.", "Contributed multiclass monotonicity constraints for per-class sub-models to the XGBoost codebase."],
      tags: ["XGBoost", "SHAP", "Explainable ML"] },
    { role: "Software Engineer — AI/ML", org: "Relatas Sales AI", where: "India", when: "Oct 2021 – Mar 2022",
      bullets: ["Built a full-stack Chrome extension that derives personality insights from LinkedIn and Twitter using trustworthy AI.", "Proposed an LSTM + XGBoost ensemble after studying feature-engineering methods (83% accuracy); the tool is used as a CRM aid by a Relatas client, Salesforce."],
      tags: ["NLP", "Chrome extension"] },
    { role: "Research Engineer — AI/ML", org: "ISRO — Indian Space Research Organisation", url: "https://www.isro.gov.in/", where: "India", when: "Jun – Aug 2021",
      bullets: ["Proposed an integrated GUI for rendering and processing Indian agricultural GeoTIFF satellite imagery, with apodization, wavelet de-speckling and ocean normalization."],
      tags: ["Remote sensing", "Image processing"] },
    { role: "Research Engineer — AI/ML", org: "Centre of Excellence for Autonomous Vehicles", where: "India", when: "Dec 2019 – Dec 2022",
      bullets: ["Developed Level-4 autonomous ground vehicles for Indian roads using IMU, Velodyne LiDAR, depth cameras and RADAR."],
      tags: ["Autonomous vehicles", "LiDAR", "Sensor fusion"] }
  ],

  teaching: [
    { term: "Fall 2026", code: "CS 567", title: "Social Signals and Social Media", role: "Teaching Assistant", instructor: "Prof. Koustuv Saha", url: "https://docs.google.com/document/d/1EY57g_R930cuGjCBOsmHZFfpp23jSfyj" },
    { term: "Fall 2025", code: "CS 598 CWB", title: "Computing and Wellbeing", role: "Teaching Assistant", instructor: "Prof. Koustuv Saha", url: "https://docs.google.com/document/d/1i2mxkhU5tV-F9fmmBT-uEf-CbS1c2TPG/" },
    { term: "Fall 2023", code: "CS 418", title: "Interactive Computer Graphics", role: "Teaching Assistant", instructor: "Prof. Luther Tychonievich", url: "https://illinois-cs418.github.io/" },
    { term: "Spring 2023", code: "CS 418", title: "Interactive Computer Graphics", role: "Teaching Assistant", instructor: "Prof. Luther Tychonievich", url: "https://illinois-cs418.github.io/" }
  ],

  education: [
    { degree: "PhD, Computer Science", school: "University of Illinois Urbana-Champaign", when: "Aug 2024 – present",
      detail: "GPA 4.0/4.0 · Advisors: Koustuv Saha &amp; Hari Sundaram · Coursework: Text Mining with LLMs" },
    { degree: "MS, Computer Science", school: "University of Illinois Urbana-Champaign", when: "Aug 2022 – Dec 2023",
      detail: "GPA 4.0/4.0 · Coursework: Generative AI, Large Language Models, Natural Language Processing, Data Mining, Artificial Intelligence" },
    { degree: "B.Tech, Computer Science", school: "Vellore Institute of Technology (VIT), Vellore", when: "2018 – 2022" }
  ],

  awards: [
    { title: "Best Paper Award — DAIH Workshop @ COLM 2026", note: "“Finding H. pylori in the Fine Print: Evidence-Linked Multi-Agent Case Finding from Gastric Biopsy Reports” · co-author", when: "Oct 2026" },
    { title: "Best Paper Nominee — EMNLP 2026", note: "“LLUMI: Improving LLM Writing Assistance for Mental Health Support with Online Community Feedback” · co-author", when: "Oct 2026" },
    { title: "Best Paper Honorable Mention — ACM Web Science ’26", note: "Best Paper nominee · “Detecting Early and Implicit Suicidal Ideation…” · first author", when: "May 2026" },
    { title: "Top 10 — IIT Madras GDC I-NCUBATE", when: "Jan 2022" },
    { title: "Rank 3 — Siemens ITTCP Challenge", when: "Feb 2021" },
    { title: "Top 50 of 39,000 — ZS Prize Hackathon", when: "Jan 2021" },
    { title: "Rank 5 — Philips Healthcare Hackathon", when: "Dec 2020" }
  ],

  /* Skills — five compact rows. Research rows come from methods used in my own papers. */
  skills: [
    { group: "Research areas", items: ["Natural language processing", "Computational social science", "Computational mental health", "AI safety", "Mechanistic interpretability", "Human–AI interaction"] },
    { group: "Methods", items: ["LLM evaluation & user simulation", "Circuit tracing, probing & steering", "SFT, DPO & LoRA fine-tuning", "Graph neural networks", "Topic modeling", "Propensity score matching", "Statistical testing", "Interviews & thematic analysis"] },
    { group: "Languages", items: ["Python", "R", "SQL", "C / C++", "Java", "JavaScript", "TypeScript"] },
    { group: "Toolkits", items: ["PyTorch", "Hugging Face", "vLLM", "scikit-learn", "LIWC", "BERTopic", "Sentence-Transformers", "FAISS", "Docker", "Git", "AWS"] }
  ],

  glance: [
    ["PhD", "CS · UIUC · 2024–"],
    ["MS", "CS · UIUC · 2023"],
    ["B.Tech", "CS · VIT · 2022"],
    ["Advisors", "Saha · Sundaram"]
  ],

  /* ---------------- My Life ----------------
     Albums open in an overlay. Each block is one of:
     garage (set) · gallery (set) · heading (text) · map · stamps · regions · genres · artists */
  albums: [
    { id: "road", k: "moto-cornfield", title: "On the road", sub: "Motorcycles & the Mustang", alt: "A black Harley-Davidson Sportster on a road through cornfields",
      blurb: "A Harley-Davidson Sportster and a Yamaha Virago for the back roads of Champaign County, and a yellow Ford Mustang for longer trips.",
      blocks: [{ garage: "bikes" }, { gallery: "moto" }, { heading: "The Mustang" }, { garage: "cars" }, { gallery: "cars" }, { heading: "Spotted on the road" }, { gallery: "spotted" }] },
    { id: "water", k: "kayak-me", title: "On the water", sub: "Kayaking", alt: "Paddling a red kayak on a lake",
      blurb: "Kayaking on rivers and lakes, and in Finland.",
      blocks: [{ gallery: "water" }] },
    { id: "wall", k: "still-climb", title: "On the wall", sub: "Climbing & archery", alt: "Climbing an indoor wall on top rope",
      blurb: "Top-rope climbing in Otaniemi, and archery in Porvoo and Riga.",
      blocks: [{ gallery: "wall" }] },
    { id: "stage", k: "still-stage-champaign", title: "On stage", sub: "Guitar & music", alt: "Playing guitar on stage with friends",
      blurb: "I play guitar, sometimes on stage with friends. I listen to Indian classical, rock, punk, ballad-style country and Indian fusion — the less mainstream, the better.",
      blocks: [{ gallery: "stage" }, { heading: "On repeat" }, { genres: true }, { artists: true }] },
    { id: "cats", k: "cats-bed", title: "Bidu & Shakti", sub: "Cats & walks", alt: "Two cats lounging on a bed",
      blurb: "Bidu is the gray one with the white chest; Shakti is the black-and-white tuxedo.",
      blocks: [{ gallery: "cats" }] },
    { id: "travel", k: "fi-midsummer", title: "Travels", sub: "Six countries", alt: "Midsummer bonfires by the sea in Helsinki",
      blurb: "From Hyderabad, where I grew up, to wherever research and road trips have taken me.",
      blocks: [{ map: true }, { stamps: true }, { regions: true }] }
  ],

  garage: {
    bikes: [
      { k: "moto-field", name: "Harley-Davidson Sportster", spec: ["Harley-Davidson", "V-twin"], place: "Savoy, IL", text: "Blacked-out and built for back roads." },
      { k: "moto-virago", name: "Yamaha Virago", spec: ["Yamaha", "Cruiser"], pos: "50% 60%", place: "Champaign, IL", text: "A classic cruiser with plenty of chrome." }
    ],
    cars: [
      { k: "car-autumn", name: "Ford Mustang", spec: ["Ford", "Coupe"], text: "The yellow one, for longer road trips." }
    ]
  },

  galleries: {
    moto: [
      { k: "moto-cornfield", span: 8, c: "The open road", p: "St. Joseph, IL", d: "Aug 2025" },
      { k: "moto-lake", span: 4, ar: "4/5", pos: "50% 55%", c: "Lake of the Woods", p: "Mahomet, IL", d: "Aug 2025" },
      { k: "moto-helmet", span: 6, c: "A pause by the lake", p: "Homer Lake, IL", d: "Aug 2025" },
      { k: "moto-pack", span: 6, c: "Three bikes, one field", p: "Thomasboro, IL", d: "Aug 2025" },
      { k: "moto-virago-ride", span: 12, ar: "21/9", pos: "50% 45%", c: "Riding the Virago", d: "Jun 2025" }
    ],
    cars: [
      { k: "car-golden", span: 4, ar: "4/5", c: "An afternoon stop", d: "Oct 2026" },
      { k: "car-shakti", span: 4, ar: "4/5", c: "Shakti on the hood", p: "Toughkenamon, PA", d: "Mar 2026" },
      { k: "car-modela", span: 4, ar: "4/5", c: "Old and new Fords", p: "Urbana, IL", d: "Mar 2026" },
      { k: "car-lake", span: 6, c: "By the lake", p: "Colfax, IL", d: "May 2025" },
      { k: "car-night", span: 6, c: "Night stop", p: "Lewes, DE", d: "Mar 2026" }
    ],
    spotted: [
      { k: "spot-ducati-chicago", span: 3, ar: "4/5", c: "Ducati Scrambler", p: "Chicago, IL", d: "Oct 2026" },
      { k: "spot-honda-braunschweig", span: 3, ar: "4/5", c: "Honda roadster", p: "Braunschweig, DE", d: "May 2026" },
      { k: "spot-yamaha-helsinki", span: 3, ar: "4/5", c: "Yamaha cruiser", p: "Helsinki, FI", d: "Jun 2026" },
      { k: "spot-volvo-tallinn", span: 3, ar: "4/5", pos: "60% 60%", c: "Classic Volvo", p: "Tallinn, EE", d: "Jul 2026" }
    ],
    water: [
      { k: "kayak-me", span: 4, ar: "4/5", c: "Paddling out" },
      { k: "kayak-finland", span: 4, ar: "4/5", c: "Kayaking in Finland", p: "Finland", d: "Jun 2026" },
      { k: "kayak-river", span: 4, ar: "4/5", c: "Down the river with friends" }
    ],
    wall: [
      { k: "still-climb", span: 4, ar: "4/5", pos: "50% 35%", c: "Top-rope climbing", p: "Espoo, FI", d: "Jun 2026", alt: "Me climbing an indoor wall on top rope" },
      { k: "archery-porvoo", span: 4, ar: "4/5", c: "At the archery range", p: "Porvoo, FI", d: "Jun 2026" },
      { k: "still-archery", span: 4, ar: "4/5", pos: "100% 50%", c: "Full draw", p: "Riga, LV", d: "Aug 2026", alt: "Me at full draw with a recurve bow" }
    ],
    stage: [
      { k: "still-stage-champaign", span: 6, c: "Live with friends", p: "Champaign, IL", d: "Oct 2025", alt: "Four musicians on stage in front of a pink and gold backdrop; I am seated with a guitar" },
      { k: "still-stage-outdoors", span: 6, c: "An evening set", alt: "Four musicians seated on an outdoor stage at night under colored lights" }
    ],
    cats: [
      { k: "cats-bed", span: 8, c: "Bidu and Shakti", d: "Oct 2026" },
      { k: "cats-me", span: 4, ar: "4/5", c: "With Bidu and Shakti" },
      { k: "shakti-walk", span: 8, c: "A walk in the woods with Shakti", alt: "Walking Shakti, the black-and-white cat, on a leash through a wooded park" },
      { k: "shakti-outside", span: 4, ar: "4/5", c: "Shakti outdoors" },
      { k: "bidu-toy", span: 4, ar: "4/5", c: "Bidu at play", d: "Mar 2025" },
      { k: "cat-cowboy", span: 4, ar: "4/5", c: "Cowboy hat", d: "Mar 2026" },
      { k: "cat-bath", span: 4, ar: "4/5", c: "Bath time", d: "Aug 2026" },
      { k: "cats-blanket", span: 6, c: "Nap time", d: "Oct 2026" },
      { k: "bidu-sofa", span: 6, c: "On the sofa", d: "Nov 2026" }
    ]
  },

  /* Map pins — city-level coordinates only */
  places: [
    { name: "Hyderabad", country: "India", region: "hyderabad", lat: 17.385, lon: 78.487, when: "where I grew up", home: true },
    { name: "Champaign–Urbana", country: "United States", region: "usa", lat: 40.11, lon: -88.24, when: "home since 2022", home: true },
    { name: "Mumbai & Elephanta", country: "India", region: "india", lat: 18.94, lon: 72.85, when: "Jan 2026" },
    { name: "Munnar", country: "India", region: "india", lat: 10.09, lon: 77.06, when: "Jan 2026" },
    { name: "Thekkady", country: "India", region: "india", lat: 9.6, lon: 77.16, when: "Jan 2026" },
    { name: "Kerala backwaters", country: "India", region: "india", lat: 9.6, lon: 76.38, when: "Jan 2026" },
    { name: "Kochi", country: "India", region: "india", lat: 9.95, lon: 76.25, when: "Jan 2026" },
    { name: "Bengaluru", country: "India", region: "india", lat: 12.97, lon: 77.59, when: "Jan 2026" },
    { name: "Khajuraho", country: "India", region: "india", lat: 24.85, lon: 79.93, when: "Jul 2025" },
    { name: "Orchha", country: "India", region: "india", lat: 25.35, lon: 78.64, when: "Jul 2025" },
    { name: "Gwalior", country: "India", region: "india", lat: 26.22, lon: 78.18, when: "Jul 2025" },
    { name: "Bodh Gaya", country: "India", region: "india", lat: 24.7, lon: 84.99, when: "Mar 2025" },
    { name: "Espoo (Aalto)", country: "Finland", region: "nordics", lat: 60.18, lon: 24.83, when: "summer 2026" },
    { name: "Helsinki", country: "Finland", region: "nordics", lat: 60.17, lon: 24.94, when: "summer 2026" },
    { name: "Porvoo", country: "Finland", region: "nordics", lat: 60.39, lon: 25.66, when: "Jun–Jul 2026" },
    { name: "Tallinn", country: "Estonia", region: "nordics", lat: 59.44, lon: 24.75, when: "Jul 2026" },
    { name: "Riga", country: "Latvia", region: "nordics", lat: 56.95, lon: 24.11, when: "Aug 2026" },
    { name: "Braunschweig", country: "Germany", region: "germany", lat: 52.27, lon: 10.52, when: "May 2026 · WebSci ’26" },
    { name: "San Francisco", country: "United States", region: "usa", lat: 37.77, lon: -122.42, when: "Dec 2024" },
    { name: "Monterey & Big Sur coast", country: "United States", region: "usa", lat: 36.55, lon: -121.92, when: "Dec 2024" },
    { name: "New York City", country: "United States", region: "usa", lat: 40.71, lon: -74.01, when: "Dec 2024" },
    { name: "Great Smoky Mountains", country: "United States", region: "usa", lat: 35.5, lon: -83.3, when: "Nov 2024" },
    { name: "Metropolis, IL", country: "United States", region: "usa", lat: 37.15, lon: -88.73, when: "Nov 2024" },
    { name: "Chicago", country: "United States", region: "usa", lat: 41.88, lon: -87.63, when: "Oct 2026" },
    { name: "Manitou Springs, CO", country: "United States", region: "usa", lat: 38.86, lon: -104.92, when: "Sep 2025" },
    { name: "Doylestown, PA", country: "United States", region: "usa", lat: 40.31, lon: -75.13, when: "May 2025" },
    { name: "Lewes, DE", country: "United States", region: "usa", lat: 38.77, lon: -75.14, when: "Mar 2026" }
  ],

  regions: [
    { id: "hyderabad", title: "Hyderabad", places: "Where I grew up",
      shots: [
        { k: "hyd-charminar", span: 7, ar: "4/5", c: "The Charminar", p: "Hyderabad" },
        { k: "hyd-charminar-up", span: 5, ar: "4/5", c: "Looking up at the Charminar", p: "Hyderabad" }
      ] },
    { id: "india", title: "India", places: "Mumbai · Kerala · Bengaluru · Madhya Pradesh · Bihar",
      shots: [
        { k: "mum-elephanta", span: 8, c: "Elephanta Caves", p: "Mumbai", d: "Jan 2026" },
        { k: "mum-taj", span: 4, ar: "4/5", c: "The Taj Mahal Palace", p: "Mumbai", d: "Jan 2026" },
        { k: "ker-munnar", span: 6, c: "Tea estates", p: "Munnar", d: "Jan 2026" },
        { k: "ker-sunset", span: 3, ar: "3/4", c: "Backwaters at sunset", p: "Kerala", d: "Jan 2026" },
        { k: "ker-kathakali", span: 3, ar: "3/4", c: "Kathakali", p: "Kochi", d: "Jan 2026" },
        { k: "ker-periyar", span: 4, ar: "4/5", c: "Periyar Lake", p: "Thekkady", d: "Jan 2026" },
        { k: "blr-lalbagh", span: 4, ar: "4/5", c: "Lalbagh", p: "Bengaluru", d: "Jan 2026" },
        { k: "mp-khajuraho", span: 4, ar: "4/5", c: "Khajuraho temples", p: "Madhya Pradesh", d: "Jul 2025" },
        { k: "mp-orchha", span: 6, c: "Orchha", p: "Madhya Pradesh", d: "Jul 2025" },
        { k: "bodhgaya", span: 6, c: "Great Buddha Statue", p: "Bodh Gaya", d: "Mar 2025" }
      ] },
    { id: "nordics", title: "Finland, Estonia & Latvia", places: "Summer 2026 · Aalto University",
      blurb: "A summer as a research scholar at Aalto University, with weekends in Helsinki, Tallinn and Riga.",
      shots: [
        { k: "fi-campfire", span: 8, c: "Campfire with friends", p: "Finland", d: "Jul 2026" },
        { k: "fi-suomenlinna", span: 4, ar: "4/5", c: "Suomenlinna", p: "Helsinki", d: "May 2026" },
        { k: "fi-midsummer", span: 6, c: "Midsummer bonfires", p: "Helsinki", d: "Jun 2026" },
        { k: "fi-porvoo", span: 6, c: "Old Porvoo", p: "Porvoo", d: "Jul 2026" },
        { k: "ee-tallinn", span: 4, ar: "4/5", c: "Viru Gate", p: "Tallinn", d: "Jul 2026" },
        { k: "ee-nevsky", span: 4, ar: "4/5", c: "Alexander Nevsky Cathedral", p: "Tallinn", d: "Jul 2026" },
        { k: "lv-riga", span: 4, ar: "4/5", c: "Riga", p: "Riga", d: "Aug 2026" },
        { k: "lv-cathedral", span: 12, ar: "21/9", pos: "50% 40%", c: "Brick Gothic interior", p: "Riga", d: "Aug 2026" }
      ] },
    { id: "germany", title: "Germany", places: "Braunschweig · ACM WebSci ’26",
      blurb: "In Braunschweig for ACM Web Science ’26, where our paper received a Best Paper Honorable Mention.",
      shots: [
        { k: "de-braunschweig-dusk", span: 4, ar: "4/5", c: "Old town at dusk", p: "Braunschweig", d: "May 2026" },
        { k: "de-braunschweig-night", span: 4, ar: "4/5", c: "A Gothic church at night", p: "Braunschweig", d: "May 2026" },
        { k: "de-braunschweig-burg", span: 4, ar: "4/5", c: "The old town in sunlight", p: "Braunschweig", d: "May 2026" }
      ] },
    { id: "usa", title: "United States", places: "Champaign–Urbana and beyond",
      shots: [
        { k: "ca-pointlobos", span: 4, ar: "4/5", c: "Point Lobos", p: "California", d: "Dec 2024" },
        { k: "ca-cypress", span: 8, c: "A lone cypress", p: "Monterey, CA", d: "Dec 2024" },
        { k: "ny-liberty", span: 4, ar: "4/5", c: "Statue of Liberty", p: "New York", d: "Dec 2024" },
        { k: "ny-vessel", span: 4, ar: "4/5", c: "Midtown at night", p: "New York", d: "Dec 2024" },
        { k: "ca-sf", span: 4, ar: "4/5", c: "Chinatown", p: "San Francisco", d: "Dec 2024" },
        { k: "nc-mingo", span: 4, ar: "4/5", c: "A waterfall in the Smokies", p: "Cherokee, NC", d: "Nov 2024" },
        { k: "il-metropolis", span: 4, ar: "4/5", c: "The Superman statue", p: "Metropolis, IL", d: "Nov 2024" },
        { k: "pa-fonthill", span: 4, ar: "4/5", c: "Mercer’s concrete castle", p: "Doylestown, PA", d: "May 2025" }
      ] }
  ],

  /* ---------------- Music (inside the "On stage" album) ---------------- */
  genres: ["Indian classical", "Indian fusion & indie", "Ballad-style country & folk", "Rock", "Punk", "Desert blues"],
  artists: [
    { name: "Kaushiki Chakraborty", from: "Kolkata", genre: "Hindustani classical",
      line: "Hindustani vocalist of the Patiala gharana, at home in khayal, thumri and dadra.", works: ["Pure (2004)", "Sakhi"], url: "https://www.kaushikichakraborty.com" },
    { name: "Agam", from: "Bengaluru", genre: "Carnatic progressive rock",
      line: "Carnatic compositions set inside progressive rock.", works: ["The Inner Self Awakens (2012)", "A Dream to Remember (2017)"] },
    { name: "Raman Negi", from: "New Delhi", genre: "Hindi indie rock",
      line: "Former frontman of The Local Train, now making guitar-led Hindi-Urdu rock solo.", works: ["Shakhsiyat (2022)", "Chaltey Purzay (2024)"], url: "https://music.apple.com/album/1769053929" },
    { name: "Gregory Alan Isakov", from: "Colorado", genre: "Indie folk",
      line: "Hushed, spacious folk songs from a songwriter and farmer.", works: ["Evening Machines (2018)", "“Big Black Car”"], url: "https://gregoryalanisakov.com" },
    { name: "Bob Dylan", from: "Minnesota", genre: "Folk rock",
      line: "Carried folk into rock, country and gospel; Nobel laureate in Literature, 2016.", works: ["Blood on the Tracks (1975)", "Highway 61 Revisited (1965)"], url: "https://www.bobdylan.com" },
    { name: "The Beatles", from: "Liverpool", genre: "Rock",
      line: "From beat-group singles to studio-built albums in a single decade.", works: ["Revolver (1966)", "Abbey Road (1969)"], url: "https://www.thebeatles.com" },
    { name: "Jacob Collier", from: "London", genre: "Jazz & harmony",
      line: "Multi-instrumentalist and arranger of dense, joyful harmony.", works: ["In My Room (2016)", "Djesse, Vol. 1–4"], url: "https://www.jacobcollier.com" },
    { name: "Desert blues", from: "The Sahara", genre: "Tuareg guitar music",
      line: "Hypnotic, guitar-driven Tuareg music from the Sahara, pioneered by Tinariwen.", works: ["Tinariwen", "Bombino", "Mdou Moctar"], url: "https://en.wikipedia.org/wiki/Desert_blues" }
  ]
};
