/**
 * compliance-knowledge.js
 * ========================
 * Base de connaissances conformite pour le marche canadien / quebecois.
 * Reference utilisee par les agents d'audit (site-audit, curator, auditor).
 *
 * Couvre :
 *   - Loi 25 (Quebec) — protection des renseignements personnels
 *   - PIPEDA (federal) — LPRPDE
 *   - LCAP / CASL — legislation anti-pourriel
 *   - Checklist site web e-commerce / guide consommateur
 *
 * Severite :
 *   critical = obligation legale avec sanctions directes
 *   high     = obligation legale, risque repute eleve
 *   medium   = bonne pratique fortement recommandee
 *
 * checkType :
 *   automated = verifiable par un script / crawler
 *   manual    = necessite revision humaine ou juridique
 */

// ═══════════════════════════════════════════════════════════════════════════
// LOI 25 — Loi modernisant des dispositions legislatives en matiere de
//          protection des renseignements personnels
//          (RLRQ c. P-39.1, phases 2022-2023-2024)
// ═══════════════════════════════════════════════════════════════════════════

export const LOI_25_RULES = [
  // --- Consentement ---
  {
    id: 'L25-01',
    title: 'Consentement explicite et eclaire',
    description:
      'Le consentement doit etre manifeste, libre, eclaire, donne a des fins specifiques ' +
      'et pour une duree limitee. Il ne peut etre obtenu par defaut (cases pre-cochees) ni ' +
      'etre une condition a la fourniture du service sauf si necessaire. Le langage doit ' +
      'etre simple et clair. Le consentement obtenu autrement est sans effet.',
    severity: 'critical',
    checkType: 'manual',
  },
  {
    id: 'L25-02',
    title: 'Consentement granulaire par finalite',
    description:
      'Le consentement doit etre demande pour chaque finalite distincte. Un consentement ' +
      'global couvrant plusieurs finalites non liees est invalide. Chaque categorie de ' +
      'cookies / traqueurs doit pouvoir etre acceptee ou refusee individuellement ' +
      '(necessaires, analytiques, marketing, personnalisation).',
    severity: 'critical',
    checkType: 'automated',
  },
  {
    id: 'L25-03',
    title: 'Consentement des mineurs (moins de 14 ans)',
    description:
      'Pour les mineurs de moins de 14 ans, le consentement doit etre donne par le ' +
      'titulaire de l\'autorite parentale. Le site doit implementer un mecanisme de ' +
      'verification d\'age si des mineurs sont susceptibles de l\'utiliser. Entre 14 et ' +
      '17 ans, le mineur peut consentir lui-meme.',
    severity: 'high',
    checkType: 'manual',
  },

  // --- Droits des personnes ---
  {
    id: 'L25-04',
    title: 'Droit a la portabilite des donnees',
    description:
      'Toute personne peut exiger de recevoir ses renseignements personnels dans un format ' +
      'technologique structure et couramment utilise (ex. JSON, CSV), ou demander leur ' +
      'transmission directe a un tiers autorise. Delai de reponse : 30 jours.',
    severity: 'high',
    checkType: 'manual',
  },
  {
    id: 'L25-05',
    title: 'Droit a la desindexation (droit a l\'oubli)',
    description:
      'Toute personne peut demander la cessation de la diffusion de ses renseignements ' +
      'personnels ou la desindexation de tout hyperlien rattache a son nom lorsque la ' +
      'diffusion contrevient a la loi ou a une ordonnance judiciaire. L\'organisation ' +
      'doit prendre les mesures raisonnables pour donner suite a cette demande.',
    severity: 'high',
    checkType: 'manual',
  },
  {
    id: 'L25-06',
    title: 'Droit d\'acces et de rectification',
    description:
      'Toute personne a le droit de consulter les renseignements personnels la concernant ' +
      'et de demander leur rectification. L\'organisation doit repondre dans un delai de ' +
      '30 jours. Le refus doit etre motive par ecrit.',
    severity: 'high',
    checkType: 'manual',
  },

  // --- Obligations organisationnelles ---
  {
    id: 'L25-07',
    title: 'Responsable de la protection des renseignements personnels',
    description:
      'L\'entreprise doit designer une personne responsable de la protection des ' +
      'renseignements personnels. Par defaut, il s\'agit de la personne ayant la plus ' +
      'haute autorite dans l\'organisation. Le titre et les coordonnees de cette personne ' +
      'doivent etre publies sur le site web.',
    severity: 'critical',
    checkType: 'automated',
  },
  {
    id: 'L25-08',
    title: 'Evaluation des facteurs relatifs a la vie privee (EFVP / PIA)',
    description:
      'Une EFVP doit etre realisee avant tout projet impliquant la collecte, l\'utilisation ' +
      'ou la communication de renseignements personnels, incluant l\'acquisition ou le ' +
      'developpement de systemes d\'information, et avant toute communication de RP hors ' +
      'Quebec. L\'EFVP doit etre proportionnee a la sensibilite des RP et au contexte.',
    severity: 'critical',
    checkType: 'manual',
  },
  {
    id: 'L25-09',
    title: 'Notification obligatoire d\'incident de confidentialite (72h a la CAI)',
    description:
      'En cas d\'incident de confidentialite presentant un risque de prejudice serieux, ' +
      'l\'organisation doit : (1) notifier la Commission d\'acces a l\'information (CAI) ' +
      'dans les meilleurs delais (objectif 72h), (2) notifier les personnes concernees ' +
      'avec diligence, (3) prendre les mesures pour reduire le risque. Un incident = ' +
      'acces non autorise, utilisation, communication, perte de RP.',
    severity: 'critical',
    checkType: 'manual',
  },
  {
    id: 'L25-10',
    title: 'Registre des incidents de confidentialite',
    description:
      'Un registre de tous les incidents de confidentialite doit etre tenu, meme ceux ne ' +
      'presentant pas un risque serieux de prejudice. Le registre doit contenir la ' +
      'description de l\'incident, les RP concernes, les circonstances, la date, les ' +
      'mesures prises. Il doit etre conserve et fourni a la CAI sur demande.',
    severity: 'high',
    checkType: 'manual',
  },
  {
    id: 'L25-11',
    title: 'Transparence des decisions automatisees',
    description:
      'Lorsqu\'une decision fondee exclusivement sur un traitement automatise de RP est ' +
      'prise (incluant profilage, recommandations IA, scoring), la personne concernee doit ' +
      'en etre informee au moment de la decision ou avant. Elle doit connaitre : (1) que ' +
      'la decision est automatisee, (2) les RP utilises, (3) les raisons / criteres ' +
      'principaux, (4) son droit de presenter des observations a un humain pouvant ' +
      'reviser la decision.',
    severity: 'critical',
    checkType: 'manual',
  },
  {
    id: 'L25-12',
    title: 'Minimisation des donnees',
    description:
      'Seuls les renseignements personnels necessaires a la finalite determinee peuvent ' +
      'etre collectes. La collecte doit etre proportionnee et limitee a ce qui est ' +
      'strictement necessaire. Les donnees devenues inutiles doivent etre detruites ou ' +
      'anonymisees selon les meilleures pratiques reconnues.',
    severity: 'high',
    checkType: 'manual',
  },
  {
    id: 'L25-13',
    title: 'Transfert transfrontalier de donnees',
    description:
      'Avant de communiquer des RP hors Quebec, l\'organisation doit effectuer une EFVP ' +
      'tenant compte : (1) de la sensibilite des renseignements, (2) des finalites, ' +
      '(3) des mesures de protection applicables, (4) du cadre juridique dans l\'Etat de ' +
      'destination. La communication doit faire l\'objet d\'une entente ecrite garantissant ' +
      'un niveau de protection adequat.',
    severity: 'critical',
    checkType: 'manual',
  },
  {
    id: 'L25-14',
    title: 'Politique de confidentialite en termes simples',
    description:
      'L\'entreprise doit publier sur son site web une politique de confidentialite redigee ' +
      'en termes simples et clairs, detaillant : les types de RP collectes, les finalites, ' +
      'les moyens de collecte, les droits des personnes (acces, rectification, portabilite, ' +
      'desindexation), les durees de conservation, les tiers impliques, les coordonnees du ' +
      'responsable vie privee, la date de derniere mise a jour.',
    severity: 'critical',
    checkType: 'automated',
  },
  {
    id: 'L25-15',
    title: 'Anonymisation conforme et irreversible',
    description:
      'L\'anonymisation doit etre irreversible selon les meilleures pratiques generalement ' +
      'reconnues et conformes aux criteres reglementaires. La pseudonymisation (substitution ' +
      'reversible) ne constitue pas une anonymisation. L\'anonymisation permet l\'utilisation ' +
      'des donnees a des fins serieuses et legitimes sans consentement.',
    severity: 'high',
    checkType: 'manual',
  },
  {
    id: 'L25-16',
    title: 'Disponibilite en francais',
    description:
      'Toutes les politiques, avis et communications relatives aux renseignements personnels ' +
      'doivent etre disponibles en francais, conformement a la Charte de la langue francaise ' +
      '(Loi 101 / Loi 96). Le francais doit etre la langue predominante au Quebec.',
    severity: 'critical',
    checkType: 'automated',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// PIPEDA — Loi sur la protection des renseignements personnels et les
//          documents electroniques (S.C. 2000, c. 5) / LPRPDE
//          10 principes equitables de traitement de l'information
// ═══════════════════════════════════════════════════════════════════════════

export const PIPEDA_RULES = [
  {
    id: 'PIP-01',
    title: 'Principe 1 — Responsabilite',
    description:
      'L\'organisation est responsable des renseignements personnels dont elle a la gestion. ' +
      'Elle doit designer une ou des personnes responsables de la conformite. La ' +
      'responsabilite s\'etend aux renseignements transferes a un tiers pour traitement — ' +
      'des clauses contractuelles doivent garantir un niveau de protection comparable.',
    severity: 'critical',
    checkType: 'manual',
  },
  {
    id: 'PIP-02',
    title: 'Principe 2 — Determination des fins de la collecte',
    description:
      'Les fins auxquelles les renseignements personnels sont collectes doivent etre ' +
      'determinees avant la collecte ou au moment de celle-ci. Les fins doivent etre ' +
      'documentees et communiquees a la personne concernee. Toute nouvelle utilisation ' +
      'requiert un nouveau consentement.',
    severity: 'critical',
    checkType: 'manual',
  },
  {
    id: 'PIP-03',
    title: 'Principe 3 — Consentement',
    description:
      'La collecte, l\'utilisation ou la communication de RP exige le consentement de la ' +
      'personne. Le consentement doit etre valable : la personne doit comprendre la nature, ' +
      'les fins et les consequences. Consentement explicite requis pour les donnees ' +
      'sensibles. Consentement implicite acceptable dans des cas limites (execution d\'un ' +
      'contrat, interet legitime si attentes raisonnables).',
    severity: 'critical',
    checkType: 'manual',
  },
  {
    id: 'PIP-04',
    title: 'Principe 4 — Limitation de la collecte',
    description:
      'La collecte doit se limiter aux renseignements necessaires aux fins determinees. ' +
      'Les renseignements doivent etre recueillis par des moyens honnetes et licites. ' +
      'Aucune collecte a l\'insu de la personne sauf exceptions prevues par la loi.',
    severity: 'high',
    checkType: 'manual',
  },
  {
    id: 'PIP-05',
    title: 'Principe 5 — Limitation de l\'utilisation, communication et conservation',
    description:
      'Les RP ne doivent etre utilises ou communiques qu\'aux fins pour lesquelles ils ont ' +
      'ete recueillis, sauf avec consentement ou si la loi l\'exige. Des politiques de ' +
      'conservation avec des periodes definies doivent etre en place. Les RP devenus ' +
      'inutiles doivent etre detruits, effaces ou rendus anonymes de maniere securisee.',
    severity: 'high',
    checkType: 'manual',
  },
  {
    id: 'PIP-06',
    title: 'Principe 6 — Exactitude',
    description:
      'Les RP doivent etre aussi exacts, complets et a jour que l\'exigent les fins pour ' +
      'lesquelles ils sont utilises. L\'organisation doit offrir un moyen simple aux individus ' +
      'de demander la correction de leurs renseignements inexacts ou incomplets.',
    severity: 'medium',
    checkType: 'manual',
  },
  {
    id: 'PIP-07',
    title: 'Principe 7 — Mesures de securite',
    description:
      'Les RP doivent etre proteges par des mesures de securite proportionnees a leur ' +
      'sensibilite : physiques (locaux), organisationnelles (acces limite, formation du ' +
      'personnel) et technologiques (chiffrement TLS, hachage mots de passe, headers de ' +
      'securite, journalisation des acces). Les methodes doivent etre revues regulierement.',
    severity: 'critical',
    checkType: 'automated',
  },
  {
    id: 'PIP-08',
    title: 'Principe 8 — Transparence',
    description:
      'L\'organisation doit rendre facilement accessible de l\'information detaillee sur ses ' +
      'politiques et pratiques relatives a la gestion des RP. La politique de confidentialite ' +
      'doit etre redigee dans un langage comprehensible, publiee en ligne et accessible ' +
      'en un maximum de deux clics depuis la page d\'accueil.',
    severity: 'high',
    checkType: 'automated',
  },
  {
    id: 'PIP-09',
    title: 'Principe 9 — Acces aux renseignements personnels',
    description:
      'Sur demande, toute personne doit etre informee de l\'existence, de l\'utilisation et ' +
      'de la communication de ses RP, et doit y avoir acces. Elle doit pouvoir contester ' +
      'l\'exactitude et l\'integralite et les faire modifier. L\'acces doit etre fourni dans ' +
      'un delai raisonnable (30 jours), a un cout minime ou nul.',
    severity: 'high',
    checkType: 'manual',
  },
  {
    id: 'PIP-10',
    title: 'Principe 10 — Possibilite de porter plainte',
    description:
      'L\'organisation doit mettre en place des procedures simples et facilement accessibles ' +
      'pour recevoir et traiter les plaintes. Le responsable de la conformite doit enqueter ' +
      'sur chaque plainte et prendre les mesures correctives. Les coordonnees pour porter ' +
      'plainte doivent etre publiees sur le site.',
    severity: 'high',
    checkType: 'automated',
  },
  {
    id: 'PIP-11',
    title: 'Notification obligatoire des atteintes (LPRPDE)',
    description:
      'Depuis novembre 2018, les organisations doivent signaler au Commissariat a la ' +
      'protection de la vie privee du Canada (CPVP) toute atteinte aux mesures de securite ' +
      'presentant un risque reel de prejudice grave. Les personnes touchees doivent aussi ' +
      'etre avisees. Un registre des atteintes doit etre tenu pendant 24 mois.',
    severity: 'critical',
    checkType: 'manual',
  },
  {
    id: 'PIP-12',
    title: 'Consentement valable — Lignes directrices du CPVP',
    description:
      'Le CPVP exige un consentement « valable » selon sept principes directeurs : (1) fins ' +
      'enoncees clairement, (2) langage comprehensible, (3) information accessible, (4) choix ' +
      'reel sans consequences negatives disproportionnees, (5) consentement adapte a la ' +
      'sensibilite, (6) possibilite de retrait, (7) pas de consentement groupe invalide.',
    severity: 'critical',
    checkType: 'manual',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// CASL / LCAP — Loi canadienne anti-pourriel (S.C. 2010, ch. 23)
//               En vigueur depuis le 1er juillet 2014
// ═══════════════════════════════════════════════════════════════════════════

export const CASL_RULES = [
  {
    id: 'CASL-01',
    title: 'Consentement expres pour les messages electroniques commerciaux (MEC)',
    description:
      'Tout message electronique commercial (courriel, SMS, notification push, message sur ' +
      'reseaux sociaux) envoye dans le cadre d\'une activite commerciale exige le consentement ' +
      'expres prealable du destinataire (opt-in). Le consentement implicite n\'est valable que ' +
      'dans des cas limites : (1) relation d\'affaires existante dans les 2 ans precedents, ' +
      '(2) demande de renseignements dans les 6 mois, (3) publication visible d\'une adresse. ' +
      'Les cases pre-cochees et le consentement par defaut sont invalides.',
    severity: 'critical',
    checkType: 'manual',
  },
  {
    id: 'CASL-02',
    title: 'Mecanisme de desabonnement fonctionnel',
    description:
      'Chaque MEC doit contenir un mecanisme de desabonnement : (1) clairement visible et ' +
      'facile a reperer, (2) fonctionnel pendant au moins 60 jours apres l\'envoi, (3) traite ' +
      'dans un delai maximal de 10 jours ouvrables. Le mecanisme ne doit pas exiger de ' +
      'connexion, de paiement ou de renseignements personnels additionnels. Un simple lien ' +
      'cliquable ou une reponse par courriel suffit.',
    severity: 'critical',
    checkType: 'automated',
  },
  {
    id: 'CASL-03',
    title: 'Identification de l\'expediteur',
    description:
      'Chaque MEC doit clairement identifier : (1) le nom de l\'expediteur (personne ou ' +
      'organisation responsable), (2) si envoye au nom d\'un tiers, le nom de ce tiers, ' +
      '(3) des coordonnees valides : adresse postale physique ou case postale, PLUS un numero ' +
      'de telephone, courriel ou URL de site web. Ces informations doivent rester valides ' +
      'pendant au moins 60 jours apres l\'envoi.',
    severity: 'critical',
    checkType: 'automated',
  },
  {
    id: 'CASL-04',
    title: 'Registre de consentements',
    description:
      'L\'organisation doit conserver la preuve du consentement : date et heure d\'obtention, ' +
      'methode (formulaire, case cochee), contenu exact du message de consentement, ' +
      'finalites communiquees, identite du consentant. La charge de la preuve repose sur ' +
      'l\'expediteur en cas de litige ou d\'enquete du CRTC.',
    severity: 'high',
    checkType: 'manual',
  },
  {
    id: 'CASL-05',
    title: 'Exactitude du contenu, de l\'objet et des liens',
    description:
      'Le contenu du MEC ne doit pas etre faux ou trompeur. L\'objet (subject line) doit ' +
      'representer fidelement le contenu. Les en-tetes et metadonnees ne doivent pas induire ' +
      'en erreur. Les liens hypertextes doivent pointer vers le contenu annonce. Les liens ' +
      'd\'affiliation doivent etre clairement identifies.',
    severity: 'high',
    checkType: 'automated',
  },
  {
    id: 'CASL-06',
    title: 'Sanctions LCAP',
    description:
      'Les sanctions administratives pecuniaires (SAP) peuvent atteindre 1 M$ par violation ' +
      'pour un individu et 10 M$ par violation pour une organisation. Le CRTC, le Bureau ' +
      'de la concurrence et le CPVP partagent l\'application. Un droit prive d\'action existe ' +
      'permettant aux victimes de reclamer des dommages-interets. Les dirigeants peuvent ' +
      'etre tenus personnellement responsables.',
    severity: 'critical',
    checkType: 'manual',
  },
  {
    id: 'CASL-07',
    title: 'Installation de programmes informatiques',
    description:
      'La LCAP interdit l\'installation de programmes informatiques (cookies de suivi, ' +
      'scripts analytiques, widgets tiers) sur l\'ordinateur d\'un utilisateur sans son ' +
      'consentement expres, sauf pour les cookies strictement necessaires au fonctionnement ' +
      'du site. Cela renforce l\'obligation d\'une banniere cookies opt-in.',
    severity: 'high',
    checkType: 'automated',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// CHECKLIST SITE WEB — Specifique a un site e-commerce / guide consommateur
// ═══════════════════════════════════════════════════════════════════════════

export const WEBSITE_CHECKLIST = [

  // --- Politique de confidentialite ---

  {
    id: 'WEB-01',
    title: 'Politique de confidentialite (FR)',
    description:
      'Une politique de confidentialite complete en francais doit etre accessible depuis ' +
      'toutes les pages du site (lien dans le footer). Elle doit detailler : types de RP ' +
      'collectes, finalites, moyens de collecte, droits des utilisateurs (acces, ' +
      'rectification, suppression, portabilite, desindexation), durees de conservation, ' +
      'tiers impliques (avec pays et finalite), coordonnees du responsable vie privee, ' +
      'date de derniere mise a jour.',
    severity: 'critical',
    checkType: 'automated',
    automatedCheck:
      'Verifier la presence d\'un lien /privacy ou /politique-confidentialite dans le footer. ' +
      'Verifier que la page contient les sections obligatoires (mots-cles : "renseignements ' +
      'personnels", "consentement", "droits", "responsable", "conservation", "tiers").',
  },
  {
    id: 'WEB-02',
    title: 'Politique de confidentialite (EN)',
    description:
      'Version anglaise de la politique de confidentialite, equivalente en contenu a la ' +
      'version francaise. Necessaire pour les visiteurs anglophones et pour conformite ' +
      'PIPEDA (loi federale). Doit couvrir les memes sections que la version FR.',
    severity: 'high',
    checkType: 'automated',
    automatedCheck:
      'Verifier la presence d\'un lien /en/privacy ou equivalent. Comparer la structure ' +
      'des sections avec la version francaise (mots-cles EN : "personal information", ' +
      '"consent", "rights", "collection", "retention", "third party").',
  },

  // --- Cookies et traceurs ---

  {
    id: 'WEB-03',
    title: 'Banniere de consentement aux cookies (opt-in)',
    description:
      'Une banniere de consentement aux cookies doit etre affichee au premier acces, avec : ' +
      '(1) bouton "Accepter" et "Refuser" de meme taille et visibilite (pas de dark pattern), ' +
      '(2) lien vers la politique de cookies, (3) possibilite de choisir par categorie ' +
      '(necessaires, analytiques, marketing, personnalisation), (4) aucun cookie non-essentiel ' +
      'depose avant consentement explicite. Le modele opt-in est obligatoire (Loi 25 + LCAP).',
    severity: 'critical',
    checkType: 'automated',
    automatedCheck:
      'Verifier la presence d\'un element de banniere cookie au chargement (div#cookie-banner, ' +
      '[class*="cookie"], [class*="consent"]). Verifier que les scripts analytics/marketing ' +
      'ne se chargent pas avant interaction avec la banniere (surveiller les requetes reseau ' +
      'avant consentement). Verifier la presence de boutons Accepter ET Refuser de taille ' +
      'comparable.',
  },
  {
    id: 'WEB-04',
    title: 'Gestion post-consentement des preferences cookies',
    description:
      'L\'utilisateur doit pouvoir modifier ses preferences de cookies a tout moment apres ' +
      'le consentement initial (bouton / lien accessible dans le footer ou les parametres). ' +
      'Le retrait du consentement doit etre aussi facile que son octroi. La modification ' +
      'doit prendre effet immediatement.',
    severity: 'high',
    checkType: 'automated',
    automatedCheck:
      'Verifier la presence d\'un lien "Gerer les cookies", "Cookie settings" ou ' +
      '"Preferences de confidentialite" dans le footer.',
  },

  // --- Conditions d\'utilisation ---

  {
    id: 'WEB-05',
    title: 'Conditions generales d\'utilisation (CGU)',
    description:
      'Les CGU doivent etre accessibles et couvrir : identification de l\'entreprise, ' +
      'description du service, limitations de responsabilite, propriete intellectuelle, ' +
      'loi applicable (lois du Quebec / Canada), mecanisme de resolution des litiges, ' +
      'restrictions d\'age si applicable, conditions de resiliation, modifications des CGU.',
    severity: 'high',
    checkType: 'automated',
    automatedCheck:
      'Verifier la presence d\'un lien /terms ou /conditions dans le footer, en FR et EN.',
  },

  // --- Conservation des donnees ---

  {
    id: 'WEB-06',
    title: 'Divulgation des durees de conservation',
    description:
      'La politique de confidentialite doit indiquer les durees de conservation pour chaque ' +
      'type de renseignement personnel : donnees de compte, cookies (session / persistants), ' +
      'historique de navigation, historique d\'achat, donnees analytics, formulaires de contact. ' +
      'Les durees doivent etre raisonnables et proportionnees a la finalite.',
    severity: 'high',
    checkType: 'manual',
  },

  // --- Services tiers ---

  {
    id: 'WEB-07',
    title: 'Divulgation des services tiers',
    description:
      'Tous les services tiers recevant des RP doivent etre identifies dans la politique : ' +
      'analytics (Google Analytics, Vercel Analytics), AI APIs (Google Gemini, OpenAI, ' +
      'Anthropic), plateformes publicitaires, fournisseurs de paiement (Stripe), liens ' +
      'd\'affiliation (Amazon, Best Buy), CDN (Cloudflare), hebergeur (Vercel), monitoring ' +
      '(Sentry). Pour chaque tiers : nom, pays, finalite, lien vers leur politique.',
    severity: 'critical',
    checkType: 'automated',
    automatedCheck:
      'Scanner le code source et les requetes reseau pour detecter les domaines tiers ' +
      '(google-analytics, googletagmanager, facebook, amazon-adsystem, doubleclick, ' +
      'generativelanguage.googleapis.com, stripe, cloudflare, sentry). Comparer avec la ' +
      'liste declaree dans la politique de confidentialite.',
  },
  {
    id: 'WEB-08',
    title: 'Divulgation des liens d\'affiliation',
    description:
      'Les liens d\'affiliation doivent etre clairement identifies comme tels. Une mention ' +
      'visible doit accompagner chaque lien (ex. icone + tooltip "Lien d\'affiliation") ou ' +
      'etre presente globalement sur la page (ex. bandeau "Cette page contient des liens ' +
      'd\'affiliation"). Requis par le Bureau de la concurrence du Canada (publicite ' +
      'trompeuse) et les lignes directrices du CPVP sur la transparence.',
    severity: 'high',
    checkType: 'automated',
    automatedCheck:
      'Detecter les liens contenant des parametres d\'affiliation (tag=, ref=, aff=, ' +
      'utm_source=affiliate, associate). Verifier la presence d\'une mention d\'affiliation ' +
      'a proximite du lien ou en haut de la page.',
  },

  // --- Decisions automatisees / IA ---

  {
    id: 'WEB-09',
    title: 'Transparence du comparateur / recommandations IA',
    description:
      'Si le site utilise un algorithme ou une IA pour generer des recommandations (comparateur ' +
      'de produits, guide d\'achat, contenu genere par IA), l\'utilisateur doit etre informe : ' +
      '(1) qu\'une decision automatisee est utilisee, (2) des criteres generaux de l\'algorithme, ' +
      '(3) de la possibilite de demander une revision humaine (Loi 25, art. 12.1). Si du ' +
      'contenu est genere par IA (blog, fiches produit), cela doit etre indique.',
    severity: 'critical',
    checkType: 'automated',
    automatedCheck:
      'Verifier la presence d\'une mention de decision automatisee / IA sur les pages de ' +
      'recommandation et le blog (mots-cles : "algorithme", "automatise", "intelligence ' +
      'artificielle", "recommandation generee", "genere par IA", "AI-generated").',
  },

  // --- Accessibilite ---

  {
    id: 'WEB-10',
    title: 'Accessibilite WCAG 2.1 AA',
    description:
      'Le site doit respecter les criteres WCAG 2.1 niveau AA : contraste suffisant ' +
      '(4.5:1 texte normal, 3:1 grands textes), navigation au clavier, textes alternatifs ' +
      'pour les images, structure semantique (headings, landmarks, listes), formulaires ' +
      'accessibles (labels, messages d\'erreur), pas de dependance au seul rouge/vert ' +
      '(daltonisme). La norme quebecoise SGQRI 008 2.0 s\'applique aux sites publics.',
    severity: 'high',
    checkType: 'automated',
    automatedCheck:
      'Executer un audit Lighthouse accessibilite (score cible >= 90). Verifier les ratios ' +
      'de contraste avec axe-core. Verifier attributs alt sur images, labels sur inputs, ' +
      'roles ARIA, lang attribute sur <html>, structure des headings (h1 unique).',
  },

  // --- Securite ---

  {
    id: 'WEB-11',
    title: 'En-tetes de securite HTTP',
    description:
      'Le site doit implementer les en-tetes de securite : Content-Security-Policy (CSP), ' +
      'Strict-Transport-Security (HSTS, min 1 an / 31536000s, includeSubDomains), ' +
      'X-Content-Type-Options: nosniff, X-Frame-Options: DENY ou SAMEORIGIN, ' +
      'Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy (bloquer camera, ' +
      'microphone, geolocation par defaut).',
    severity: 'high',
    checkType: 'automated',
    automatedCheck:
      'Effectuer une requete HEAD sur la page d\'accueil et verifier la presence et la ' +
      'valeur de chaque en-tete. Utiliser securityheaders.com ou Mozilla Observatory comme ' +
      'reference. Grade cible : A ou A+.',
  },
  {
    id: 'WEB-12',
    title: 'SSL/TLS valide et a jour',
    description:
      'Le site doit etre servi exclusivement en HTTPS avec un certificat TLS valide et non ' +
      'expire. TLS 1.2 minimum (1.3 recommande). TLS 1.0 et 1.1 doivent etre desactives. ' +
      'Le site doit rediriger automatiquement HTTP vers HTTPS (301). HSTS doit etre active.',
    severity: 'critical',
    checkType: 'automated',
    automatedCheck:
      'Verifier que le certificat est valide (date, chaine de confiance, CN/SAN). Tester la ' +
      'redirection HTTP → HTTPS. Verifier la version TLS minimale. Cible : grade A sur ' +
      'ssllabs.com.',
  },
  {
    id: 'WEB-13',
    title: 'Formulaires securises',
    description:
      'Tous les formulaires collectant des RP doivent : etre servis en HTTPS, utiliser des ' +
      'tokens CSRF, implementer une validation cote serveur, limiter le debit (rate limiting), ' +
      'ne pas stocker de RP en clair, et implementer une protection contre les bots ' +
      '(honeypot, CAPTCHA).',
    severity: 'high',
    checkType: 'automated',
    automatedCheck:
      'Verifier la presence de tokens CSRF dans les formulaires. Verifier que l\'attribut ' +
      'action pointe vers HTTPS. Verifier la presence de champs honeypot ou reCAPTCHA.',
  },
  {
    id: 'WEB-14',
    title: 'Absence de donnees personnelles dans les URLs',
    description:
      'Les URLs ne doivent pas contenir de renseignements personnels (courriel, nom, ' +
      'identifiants, tokens de session). Les parametres de requete ne doivent pas exposer ' +
      'de RP dans les journaux serveur, l\'historique du navigateur ou les en-tetes Referrer.',
    severity: 'high',
    checkType: 'automated',
    automatedCheck:
      'Scanner les URLs generees par le site pour detecter des patterns de RP ' +
      '(email=, name=, user=, phone=, ssn=, token=).',
  },

  // --- Coordonnees et identification ---

  {
    id: 'WEB-15',
    title: 'Coordonnees du responsable vie privee',
    description:
      'Le site doit publier les coordonnees (nom ou titre du poste, courriel et/ou adresse ' +
      'postale) de la personne responsable de la protection des renseignements personnels ' +
      '(Loi 25) et du responsable de la conformite PIPEDA. Un courriel dedie du type ' +
      'privacy@domain.com ou un formulaire de contact vie privee est recommande.',
    severity: 'critical',
    checkType: 'automated',
    automatedCheck:
      'Verifier la presence d\'un courriel de contact dans la politique de confidentialite ' +
      '(regex email). Verifier la presence d\'un lien vers un formulaire de contact dedie ' +
      'ou une section "Vie privee" dans la page contact.',
  },
  {
    id: 'WEB-16',
    title: 'Page "A propos" / identification de l\'entreprise',
    description:
      'Le site doit identifier clairement l\'exploitant : nom legal ou d\'exploitation, ' +
      'adresse physique, province, coordonnees (courriel, telephone). Un numero NEQ (Quebec) ' +
      'ou numero d\'entreprise federal est recommande pour les commerces. Requis par la LPC.',
    severity: 'medium',
    checkType: 'automated',
    automatedCheck:
      'Verifier la presence d\'une page /about ou /a-propos avec des coordonnees physiques ' +
      'et electroniques.',
  },

  // --- Langue et i18n ---

  {
    id: 'WEB-17',
    title: 'Site disponible en francais (langue predominante)',
    description:
      'Au Quebec, le francais est la langue officielle. Le site doit etre disponible en ' +
      'francais comme langue par defaut ou avec une version francaise complete et equivalente. ' +
      'La Charte de la langue francaise (Loi 101, mise a jour Loi 96) impose le francais ' +
      'pour les communications commerciales au Quebec. Les inscriptions sur les produits, ' +
      'le service a la clientele et la publicite doivent etre en francais.',
    severity: 'critical',
    checkType: 'automated',
    automatedCheck:
      'Verifier la presence de l\'attribut lang="fr" sur <html>. Verifier qu\'un selecteur ' +
      'de langue est disponible. Verifier que la page d\'accueil par defaut est en francais ' +
      'pour les visiteurs du Quebec (geolocalisation ou defaut FR).',
  },

  // --- E-commerce specifique ---

  {
    id: 'WEB-18',
    title: 'Politique de retour et remboursement',
    description:
      'Si le site facilite des transactions ou redirige vers des marchands, la politique de ' +
      'retour/remboursement doit etre clairement affichee ou un lien vers la politique du ' +
      'marchand doit etre fourni. Conforme a la Loi sur la protection du consommateur du ' +
      'Quebec (LPC). Les frais, delais et conditions doivent etre explicites.',
    severity: 'medium',
    checkType: 'automated',
    automatedCheck:
      'Verifier la presence d\'un lien /returns, /retours ou /refund dans le footer ou ' +
      'les pages produit.',
  },
  {
    id: 'WEB-19',
    title: 'Affichage des prix en dollars canadiens',
    description:
      'Les prix doivent etre affiches en dollars canadiens (CAD) avec les taxes applicables ' +
      'clairement indiquees (TPS 5% + TVQ 9.975% au Quebec). Le prix total incluant toutes ' +
      'les charges obligatoires doit etre visible avant la confirmation d\'achat. La mention ' +
      '"taxes en sus" est acceptable si clairement indiquee.',
    severity: 'high',
    checkType: 'automated',
    automatedCheck:
      'Verifier la presence du symbole $ avec mention CAD ou "dollars canadiens". Verifier ' +
      'la mention des taxes (TPS/TVQ ou GST/QST) sur les pages de prix.',
  },

  // --- Technique et SEO ---

  {
    id: 'WEB-20',
    title: 'Meta robots, robots.txt et sitemap',
    description:
      'Le fichier robots.txt doit etre present et correctement configure. Le sitemap XML ' +
      'doit etre genere, valide et reference dans robots.txt. Les pages sensibles (admin, ' +
      'compte, API) doivent etre exclues de l\'indexation via noindex ou robots.txt.',
    severity: 'medium',
    checkType: 'automated',
    automatedCheck:
      'Verifier la presence et la validite de /robots.txt et /sitemap.xml. Verifier que ' +
      'les chemins sensibles (/api/, /admin, /account) sont exclus.',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// RESSOURCES DE CONFORMITE — Liens officiels et outils de reference
// ═══════════════════════════════════════════════════════════════════════════

export const COMPLIANCE_RESOURCES = [
  {
    name: 'Commission d\'acces a l\'information du Quebec (CAI)',
    url: 'https://www.cai.gouv.qc.ca/',
    description:
      'Organisme de surveillance pour la Loi 25. Formulaires de plainte, guides d\'EFVP, ' +
      'formulaires de notification d\'incident, registre des incidents.',
  },
  {
    name: 'Commissariat a la protection de la vie privee du Canada (CPVP / OPC)',
    url: 'https://www.priv.gc.ca/',
    description:
      'Organisme federal pour la LPRPDE/PIPEDA. Lignes directrices sur le consentement ' +
      'valable, bulletins d\'interpretation, formulaire de declaration d\'atteinte LPRPDE-1.',
  },
  {
    name: 'CRTC — Legislation anti-pourriel (LCAP / CASL)',
    url: 'https://crtc.gc.ca/fra/com500/guide.htm',
    description:
      'Guide du CRTC sur la conformite a la LCAP. Bulletins d\'information, FAQ, exemples ' +
      'de conformite, processus de plainte.',
  },
  {
    name: 'Texte integral — Loi 25 (LQ 2021, c. 25)',
    url: 'https://www.publicationsduquebec.gouv.qc.ca/fileadmin/Fichiers_client/lois_et_reglements/LoisAnnuelles/fr/2021/2021C25F.PDF',
    description:
      'Texte legislatif complet de la Loi 25 modernisant les dispositions legislatives ' +
      'en matiere de protection des renseignements personnels.',
  },
  {
    name: 'PIPEDA — Texte de la loi (Justice Canada)',
    url: 'https://laws-lois.justice.gc.ca/fra/lois/p-8.6/',
    description:
      'Texte integral de la Loi sur la protection des renseignements personnels et les ' +
      'documents electroniques, incluant l\'Annexe 1 (les 10 principes).',
  },
  {
    name: 'CASL / LCAP — Texte de la loi (Justice Canada)',
    url: 'https://laws-lois.justice.gc.ca/fra/lois/E-1.6/',
    description:
      'Texte integral de la Loi canadienne anti-pourriel et ses reglements d\'application.',
  },
  {
    name: 'Guide EFVP de la CAI',
    url: 'https://www.cai.gouv.qc.ca/evaluations-facteurs-vie-privee/',
    description:
      'Guide officiel de la CAI pour realiser une evaluation des facteurs relatifs a la ' +
      'vie privee (EFVP / PIA). Modeles et exemples inclus.',
  },
  {
    name: 'Lignes directrices du CPVP sur le consentement',
    url: 'https://www.priv.gc.ca/fr/sujets-lies-a-la-protection-de-la-vie-privee/collecte-de-renseignements-personnels/consentement/',
    description:
      'Les sept principes directeurs du CPVP pour l\'obtention d\'un consentement valable ' +
      'sous la LPRPDE.',
  },
  {
    name: 'Bureau de la concurrence du Canada',
    url: 'https://bureaudelaconcurrence.gc.ca/',
    description:
      'Regles sur la publicite trompeuse, divulgation des liens d\'affiliation, temoignages ' +
      'et avis, indications de prix.',
  },
  {
    name: 'Charte de la langue francaise (Loi 101 / Loi 96)',
    url: 'https://www.legisquebec.gouv.qc.ca/fr/document/lc/C-11',
    description:
      'Obligations linguistiques pour les communications commerciales au Quebec. Le francais ' +
      'doit etre la langue predominante.',
  },
  {
    name: 'WCAG 2.1 — Regles d\'accessibilite (W3C)',
    url: 'https://www.w3.org/TR/WCAG21/',
    description:
      'Norme internationale d\'accessibilite web. Niveau AA recommande comme minimum pour la ' +
      'conformite canadienne. Criteres de succes, techniques et exemples.',
  },
  {
    name: 'SGQRI 008 2.0 — Standard quebecois d\'accessibilite',
    url: 'https://www.tresor.gouv.qc.ca/ressources-informationnelles/standards-et-normes/',
    description:
      'Standard quebecois sur l\'accessibilite du web pour les organismes publics. Base sur ' +
      'WCAG 2.0 AA avec extensions quebecoises.',
  },
  {
    name: 'Mozilla Observatory',
    url: 'https://observatory.mozilla.org/',
    description:
      'Outil gratuit d\'audit des en-tetes de securite HTTP. Verifie CSP, HSTS, ' +
      'X-Frame-Options, Referrer-Policy, etc. Grade cible : A+.',
  },
  {
    name: 'SSL Labs Server Test (Qualys)',
    url: 'https://www.ssllabs.com/ssltest/',
    description:
      'Analyse la configuration TLS/SSL d\'un serveur. Verifie versions de protocole, ' +
      'suites de chiffrement, chaine de certificats. Grade cible : A ou A+.',
  },
  {
    name: 'Loi sur la protection du consommateur du Quebec (LPC)',
    url: 'https://www.legisquebec.gouv.qc.ca/fr/document/lc/P-40.1',
    description:
      'Regit les contrats de consommation, la publicite, les garanties, le commerce ' +
      'electronique. Applicable aux transactions en ligne ciblant les consommateurs quebecois.',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS SUPPLEMENTAIRES — Conserves de la version precedente pour
// compatibilite avec les agents existants (site-audit, auditor, curator)
// ═══════════════════════════════════════════════════════════════════════════

// --- Pages legales requises ---

export const LEGAL_PAGES = [
  { path: '/privacy', required: true, label: 'Politique de confidentialite' },
  { path: '/terms', required: false, label: 'Conditions d\'utilisation' },
];

// --- Termes obligatoires par locale dans la politique de confidentialite ---

export const PRIVACY_REQUIRED_TERMS = {
  fr: [
    'renseignements personnels',
    'Loi 25',
    'responsable de la protection',
    'consentement',
    'collecte',
    'droits',
    'conservation',
    'tiers',
    'portabilite',
    'desindexation',
  ],
  en: [
    'personal information',
    'privacy',
    'consent',
    'collection',
    'rights',
    'data protection',
    'retention',
    'third party',
    'portability',
  ],
};

// --- Services tiers a divulguer (detection automatisee) ---

export const THIRD_PARTY_SERVICES = [
  { id: 'google', patterns: ['googleapis.com', 'google-analytics', 'gtag', 'gemini', 'generativelanguage.googleapis'], disclosure: 'Google (Gemini API / Analytics)' },
  { id: 'vercel', patterns: ['vercel', '_vercel', 'va.vercel-scripts'], disclosure: 'Vercel (hebergement / analytics)' },
  { id: 'affiliate', patterns: ['amazon', 'bestbuy', 'tag=', 'ref=', 'affiliate', 'utm_source'], disclosure: 'Programmes d\'affiliation' },
  { id: 'stripe', patterns: ['stripe.com', 'js.stripe'], disclosure: 'Stripe (paiement)' },
  { id: 'cloudflare', patterns: ['cloudflare', 'cdnjs.cloudflare'], disclosure: 'Cloudflare (CDN)' },
  { id: 'sentry', patterns: ['sentry.io', '@sentry'], disclosure: 'Sentry (monitoring erreurs)' },
  { id: 'openai', patterns: ['openai.com', 'api.openai'], disclosure: 'OpenAI (API IA)' },
  { id: 'anthropic', patterns: ['anthropic.com', 'api.anthropic'], disclosure: 'Anthropic (API IA)' },
];

// --- En-tetes de securite requis ---

export const REQUIRED_SECURITY_HEADERS = [
  { name: 'content-security-policy', severity: 'critical', label: 'Content-Security-Policy' },
  { name: 'strict-transport-security', severity: 'critical', label: 'Strict-Transport-Security (HSTS)' },
  { name: 'x-frame-options', severity: 'high', label: 'X-Frame-Options' },
  { name: 'x-content-type-options', severity: 'high', label: 'X-Content-Type-Options' },
  { name: 'referrer-policy', severity: 'medium', label: 'Referrer-Policy' },
  { name: 'permissions-policy', severity: 'medium', label: 'Permissions-Policy' },
];

// --- Verifications d'accessibilite ---

export const ACCESSIBILITY_CHECKS = [
  { id: 'lang-attr', label: 'Attribut lang sur <html>', selector: '<html[^>]+lang=' },
  { id: 'alt-text', label: 'Attribut alt sur les images', selector: '<img[^>]+alt=' },
  { id: 'heading-h1', label: 'Balise <h1> presente', selector: '<h1[\\s>]' },
  { id: 'skip-link', label: 'Lien "Passer au contenu"', selector: 'a[href="#main"], a[href="#content"]' },
  { id: 'focus-visible', label: 'Focus visible sur les elements interactifs', selector: ':focus-visible' },
];

// --- Pages a echantillonner pour l'audit ---

export const SAMPLE_PAGES = [
  { path: '/', label: 'Accueil' },
  { path: '/guide', label: 'Guide' },
  { path: '/catalogue', label: 'Catalogue' },
  { path: '/comparateur', label: 'Comparateur' },
  { path: '/blog', label: 'Blog' },
  { path: '/glossaire', label: 'Glossaire' },
  { path: '/about', label: 'A propos' },
  { path: '/privacy', label: 'Politique de confidentialite' },
];

// --- Seuils de scoring ---

export const SCORING = {
  // Poids par categorie (sur 100)
  weights: {
    privacy: 25,
    security: 25,
    cookies: 10,
    thirdParty: 10,
    accessibility: 15,
    i18n: 15,
  },
  // Seuils d'alerte
  thresholds: {
    critical: 50,  // < 50% = alerte critique Discord
    warning: 75,   // < 75% = warning
    good: 90,      // >= 90% = OK
  },
};
