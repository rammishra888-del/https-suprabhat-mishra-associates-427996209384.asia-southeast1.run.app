import { PracticeArea, LawSectionItem } from "./types";

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: "civil",
    title: "Civil Litigation",
    titleHindi: "दीवानी मामले",
    iconName: "Scale",
    shortDesc: "Property disputes, Partition, Suits, and Injunction orders at Kanpur Collectorate and District courts.",
    longDesc: "Diwani or Civil laws govern disputes between individuals or organizations, including land, compensation, partition, or contract enforcement. Adv. Suprabhat Mishra provides aggressive civil pleading services to secure civil rights, stay orders, and secure titles.",
    casesHandled: [
      "Property Declaratory & Title Suits",
      "Injunction Suits (स्थगन आदेश - Stay Orders)",
      "Partition Suits (बंटवारा वाद)",
      "Money Recovery and Damages Pleading",
      "Appeals, Revisions, and Writs"
    ],
    disputesType: ["Land & Boundary Disputes", "Ancestral Property Claims", "Contracts & Agreement Breaches"]
  },
  {
    id: "criminal",
    title: "Criminal Defense",
    titleHindi: "फौजदारी मामले",
    iconName: "ShieldAlert",
    shortDesc: "Comprehensive trials, Regular & Anticipatory Bail representation, FIR Quashing, and Trial defense.",
    longDesc: "Faujdari or Criminal litigation requires strategic understanding of police reports, chargesheets, and cross-examination. We specialize in safeguarding client liberty with swift bail actions and high court representations.",
    casesHandled: [
      "Regular Bail Applications (धारा 437/439 CrPC / BNSS)",
      "Anticipatory Bail (अग्रिम जमानत)",
      "Defence in Trials / Cross-Examination",
      "Section 138 Negotiable Instruments Act (Cheque Bounce)",
      "FIR Quashing and Criminal Writ Pleadings"
    ],
    disputesType: ["False Accusations", "Police Harrassment & FIR Actions", "Financial Fraud & White-Collar Claims"]
  },
  {
    id: "family",
    title: "Family & Matrimonial Law",
    titleHindi: "पारिवारिक विवाद",
    iconName: "Users",
    shortDesc: "Sensitive handling of Mutual/Contested Divorce, Maintenance under Sec 125, Child Custody, and DV.",
    longDesc: "Family controversies can be emotionally taxing. We provide objective, firm, and legally sound advice to handle domestic relations, prioritizing the protection of children and fair alimony or maintenance.",
    casesHandled: [
      "Mutual Consent Divorce (पारस्परिक सहमति से तलाक)",
      "Contested Divorce & Alimony Pleadings",
      "Maintenance Suits (धारा 125 CrPC / गुजारा भत्ता)",
      "Domestic Violence Protection Acts (घरेलू हिंसा से संरक्षण)",
      "Child Custody & Guardianship Claims"
    ],
    disputesType: ["Matrimonial Discord", "Child Support & Maintenance", "Domestic Harassment & Cruelty Claims"]
  },
  {
    id: "property",
    title: "Property & Real Estate Law",
    titleHindi: "संपत्ति एवं रियल एस्टेट कानून",
    iconName: "Home",
    shortDesc: "Sale deed verification, Title investigation, Mutation checks, and Registrations in Kanpur Nagar.",
    longDesc: "Property acquisitions, registries, and mutations represent life-long savings. We perform rigorous due diligence, trace ancestral chains, examine mutation registers (Khatauni), and guide secure deeds registration.",
    casesHandled: [
      "Title Search & Legality Certificate Reports",
      "Sale Deed Drafting / Registry Process Guidance",
      "Mutation Applications (दाखिल-खारिज) in Kanpur Authority",
      "Power of Attorney (PoA) Drafts and Verification",
      "Wills (वसीयत) and Gift Deeds (दान पत्र)"
    ],
    disputesType: ["Property Fraud Avoidance", "Kanpur Nagar Registry Procedures", "KDA & Nagar Nigam Mutation issues"]
  },
  {
    id: "corporate",
    title: "Corporate & Business Compliance",
    titleHindi: "कॉर्पोरेट एवं व्यावसायिक कानून",
    iconName: "Briefcase",
    shortDesc: "Partnership Deeds, Commercial Contracts, Master Service Agreements, and business litigation.",
    longDesc: "Securing commercial interests prior to operational execution prevents catastrophic liabilities. We assist local Kanpur builders, suppliers, merchants, and entities with professional compliance audits, legal frameworks, and contracts.",
    casesHandled: [
      "Partnership Deeds and LLP Declarations",
      "Commercial Vendor & Services Contracts",
      "Company Dispute Settlement Mediations",
      "Legal Notices for Business Overdues",
      "GST & Labor Compliance Consultations"
    ],
    disputesType: ["Partnership Fractures", "Unpaid Merchant Invoices", "Regulatory Audit notices"]
  },
  {
    id: "drafting",
    title: "Drafting & Legal Documentation",
    titleHindi: "दस्तावेज़ एवं संविदा प्रारूपण",
    iconName: "FileText",
    shortDesc: "Compulsory registration drafts, Rental contracts, Legal Notices, and Indemnity affidavits.",
    longDesc: "A legally watertight text is the ultimate armor. Every notice, reply, declaration, and affidavit drafted at Chamber No. 7 is sculpted with absolute precision, legal definitions, and bullet-proof bindings.",
    casesHandled: [
      "Affidavits (शपथ पत्र) and Declarations",
      "Registered Rent Agreements (किरायानामा)",
      "Legal Notices to Adversaries / Repliations",
      "Sale / Lease Agreement drafts",
      "Adoption Deeds & General Declarations"
    ],
    disputesType: ["Pre-litigation legal warnings", "Eviction notice drafting", "UP stamp valuation compliance checks"]
  }
];

export const FAMOUS_SECTIONS: LawSectionItem[] = [
  {
    section: "Section 125 CrPC",
    category: "Family",
    title: "Order for Maintenance of Wives, Children, and Parents",
    act: "Code of Criminal Procedure (CrPC)",
    description: "Empowers a Magistrate of first class to order a person who has sufficient means but neglects or refuses to maintain their wife, children, or parents, to make a monthly allowance for their maintenance.",
    penalty: "If unresolved, can lead to a warrant for levying the amount due, and sentencing to jail up to 1 month for each month's default.",
    keyAdvice: "Adv. Suprabhat Mishra advises clients to document proof of monthly income/expenditure and resources of the spouse early to expedite the interim maintenance awards."
  },
  {
    section: "Section 498A IPC",
    category: "Criminal",
    title: "Husband or Relative of Husband of a Woman Subjecting Her to Cruelty",
    act: "Indian Penal Code (IPC)",
    description: "Criminalizes subjecting a woman to cruelty by her husband or his relatives, specifically involving dowry demands or mental/physical coercion.",
    penalty: "Imprisonment for a term which may extend to 3 years and shall also be liable to fine (Non-bailable).",
    keyAdvice: "Cruelty takes many shapes. If falsely accused, collect text messages, bank statements showing separate living arrangements, and third-party witness statements to secure anticipatory bail."
  },
  {
    section: "Section 138 Negotiable Instruments Act",
    category: "Criminal",
    title: "Dishonour of Cheque for Insufficiency of Funds",
    act: "Negotiable Instruments (NI) Act",
    description: "Governs cheque bounce cases where a cheque drawn to discharge a debt is returned by the bank unpaid due to insufficient funds or matching signatures.",
    penalty: "Imprisonment up to 2 years, or fine which may extend to twice the amount of the cheque, or both.",
    keyAdvice: "A formal written notice MUST be dispatched to the drawer within 30 days of receiving the cheque dishonour memo. If they fail to pay within 15 days, you must file a complaint case within the next 30 days."
  },
  {
    section: "Section 420 IPC",
    category: "Criminal",
    title: "Cheating and Dishonestly Inducing Delivery of Property",
    act: "Indian Penal Code (IPC)",
    description: "Prohibits cheating another person and thereby dishonestly inducing them to deliver any property, make, alter or destroy valuable security.",
    penalty: "Imprisonment of either description for a term which may extend to 7 years, and shall also be liable to fine.",
    keyAdvice: "For Section 420, establishing 'fraudulent intent since inception' is vital. Ordinary commercial breaches do not qualify as cheating unless pre-planned dishonesty is evidenced."
  },
  {
    section: "Section 54 Transfer of Property Act",
    category: "Property",
    title: "Definition of 'Sale' and Compulsory Registration",
    act: "Transfer of Property Act (TPA)",
    description: "Defines 'Sale' as a transfer of ownership in exchange for a price paid or promised. For tangible immovable property value above Rs. 100, the transfer can only be executed via a registered legal instrument.",
    penalty: "Unregistered sale deeds are legally void and inadmissible in courts as title proof under Section 49 Registration Act.",
    keyAdvice: "Never transact on a notary stamp paper or unregistered 'Agreement to Sell' thinking it represents a complete sale. Compulsory registration at Sub-Registrar Kanpur is mandatory."
  },
  {
    section: "Section 17 Registration Act",
    category: "Property",
    title: "Compulsorily Registrable Documents",
    act: "Indian Registration Act",
    description: "Explicitly details documents that must be compulsorily registered, such as gift deeds of immovable property, leases of immovable property exceeding one year, and non-testamentary instruments transferring values above Rs 100.",
    penalty: "Non-registration nullifies any legal right to claim ownership, mutation, or ejectment based on that document in court.",
    keyAdvice: "Wills do not compulsorily require registration under Section 17, but registering a Will at Sub-Registrar Office Kanpur highly fortifies it against future probate or relative partition contests."
  },
  {
    section: "Section 12 Domestic Violence Act",
    category: "Family",
    title: "Application to Magistrate for Protection and Residence",
    act: "Protection of Women from Domestic Violence Act (PWDVA)",
    description: "Enables an aggrieved female to present an application to the Magistrate seeking protection orders, residential rights in a shared household, monetary reliefs, and custody orders.",
    penalty: "Breach of Magistrate's protection order is a cognizable criminal offense carrying up to 1 year jail.",
    keyAdvice: "Provides rapid relief independent of pending divorce suits. Courts in Kanpur regularly award residence stay protections and temporary monetary protection under this section."
  },
  {
    section: "Section 302 IPC / BNSS equivalents",
    category: "Criminal",
    title: "Punishment for Murder",
    act: "Indian Penal Code (IPC)",
    description: "Defines punishment for committing murder by intentionally causing death or severe injury knowing it is highly likely to cause death.",
    penalty: "Death penalty or imprisonment for life, and shall also be liable to fine.",
    keyAdvice: "Trial defense in murder charges relies immensely on tracking loop-holes in the forensic post-mortem timing, inconsistencies in eye-witness call statements, and chain of custody of recovered weapons."
  }
];

export const UP_STAMP_DUTY_RATES = {
  male: 0.07,     // 7%
  female: 0.06,   // 6% (regular rebate of 1% up to 10L, let's represent realistic calculations)
  joint: 0.065,   // 6.5% (average)
  registrationRate: 0.01, // 1% of transaction value or capped at Rs 20,000 in UP
  registrationCap: 20000, // Rs 20,000 maximum registration charge rules in UP
};

export const FAQ_ITEMS = [
  {
    vibe: "UP Land Registry",
    q: "Kanpur me zameen registry ke liye kaun se documents chahiye?",
    a: "मुख्य रूप से: विक्रेता का मूल Sale Deed, वर्तमान खतौनी (Khatauni), नगर निगम/प्राधिकरण का अनापत्ति प्रमाण पत्र (NOC), दोनों पक्षों के पैन कार्ड एवं आधार कार्ड, एवं दो गवाह (गवाहों के आधार कार्ड सहित)। स्टाम्प ड्यूटी की गणना सर्किल रेट या वास्तविक विलेख मूल्य में से जो भी अधिक हो, उस पर होती है।"
  },
  {
    vibe: "Matrimonial (Divorce)",
    q: "Mutual Divorce (आपसी सहमति से तलाक) का क्या नियम है?",
    a: "हिन्दू विवाह अधिनियम की धारा 13B के अंतर्गत दोनों पक्ष आपसी रजामंदी से याचिका दायर कर सकते हैं। इसके लिए कम से कम 1 वर्ष से अलग रहना अनिवार्य है। प्रथम प्रस्ताव (First Motion) के बाद 6 महीने का 'कूलिंग ऑफ पीरियड' होता है, जिसे विशेष परिस्थितियों में कोर्ट कम भी कर सकता है और फिर द्वितीय प्रस्ताव पर तलाक डिक्री प्रदान की जाती है।"
  },
  {
    vibe: "Bail Procedures",
    q: "Anticipatory Bail (अग्रिम जमानत) कब फाइल और मंजूर की जाती है?",
    a: "धारा 438 CrPC (अब BNSS प्रावधान) के अंतर्गत जब किसी व्यक्ति को झूठे गंभीर आरोप या अ-जमानती मामले में गिरफ्तार होने की आशंका होती है। यह सीधे सत्र न्यायालय (Sessions Court) या उच्च न्यायालय (High Court) में दाखिल की जाती है। वकील की मजबूत दलीलों एवं पुलिस केस डायरी में ठोस सबूतों की कमी पर अंतरिम सुरक्षा या अग्रिम जमानत मंजूर होती है।"
  },
  {
    vibe: "Uttar Pradesh Stamp Duty Rules",
    q: "Uttar Pradesh में महिला क्रेता के लिए क्या विशेष छूट है?",
    a: "उत्तर प्रदेश सरकार द्वारा महिला खरीदारों को स्टाम्प शुल्क में 1% की विशेष छूट प्रदान की जाती है (सर्किल वैल्यू में 10 लाख रुपये तक की सीमा पर)। अर्थात जहाँ सामान्यतः पुरुष के लिए स्टाम्प शुल्क 7% है, वहीं महिला क्रेता के लिए केवल 6% लागू होता है।"
  }
];
