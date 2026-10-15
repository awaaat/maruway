// Draft site copy. It describes how Maruway's existing services apply; it makes no client claims.
// VERIFY every list and figure with management before publishing.

export const HERO_SLIDES = [
  { k: 'Managed IT', tag: 'Run', h: 'Technology that keeps working, supported on site within the hour.', p: 'Helpdesk, monitoring and field engineers for organisations that cannot afford downtime.', img: 'kajiado-radio-receiver', to: '/services/managed-it', cta: 'Explore Managed IT' },
  { k: 'Networks', tag: 'Build', h: 'Networks built to a standard, labelled and tested.', p: 'Structured cabling, fibre, Wi-Fi and outside-plant works, documented so faults are found fast.', img: 'manhole-maintenance', to: '/services/network-infrastructure', cta: 'Explore Networks' },
  { k: 'Security', tag: 'Protect', h: 'Cameras, access control and public address, maintained properly.', p: 'Installed around how your site is used, and checked on a schedule with records of every visit.', img: 'cctv-maintenance-checks', to: '/services/cctv-access-control', cta: 'Explore Security' },
];

export const HELP = [
  { k: 'Build', t: 'We build the foundation', d: 'Structured cabling, fibre, Wi-Fi and racks installed to a standard, labelled and tested before handover.', pts: ['Site survey and design', 'Cabling, cabinets and chambers', 'Wi-Fi planning and tuning', 'As-built documentation'], to: '/services/network-infrastructure', img: 'manhole-maintenance' },
  { k: 'Protect', t: 'We protect people and places', d: 'CCTV, access control, safety signage and public address systems planned around how your site is used.', pts: ['IP camera design and commissioning', 'Doors, gates and server-room access', 'Zoned public address', 'Signage and site compliance'], to: '/services/cctv-access-control', img: 'cctv-maintenance-checks' },
  { k: 'Run', t: 'We keep it running', d: 'Managed IT, monitoring and scheduled maintenance, with a technician on site within the hour.', pts: ['Helpdesk and on-site support', 'Servers, devices and backups', 'Preventive maintenance visits', 'Written visit reports'], to: '/services/managed-it', img: 'radio-receiver-alignment' },
  { k: 'Insight', t: 'We turn data into decisions', d: 'Dashboards and reports that show how your network, devices and sites are performing.', pts: ['Device and uptime reporting', 'IoT sensor deployments', 'Three-number dashboards', 'Monthly service reviews'], to: '/services/data-analytics', img: 'ceiling-speakers' },
];

export const INDUSTRIES = [
  { slug: 'education', name: 'Education', lead: 'Campus Wi-Fi, CCTV and public address for schools and colleges.', points: ['Structured cabling and campus Wi-Fi', 'CCTV and access control for gates and labs', 'Ceiling and wall speaker systems', 'Radio links for remote sites'], img: 'ceiling-speakers', challenge: 'Schools have many buildings, little IT staff and tight budgets. Systems must be simple to run and quick to repair.', approach: 'We survey the whole campus, plan zones for Wi-Fi, cameras and audio, and train a named person on site.' },
  { slug: 'telecom', name: 'Telecom and ISPs', lead: 'Field engineering for operators and the partners who serve them.', points: ['Radio receiver assembly and alignment', 'Chamber and cable maintenance', 'Fibre and equipment installation', 'IoT connectivity'], img: 'manhole-maintenance', challenge: 'Network sites are remote and unforgiving. A bad alignment or a wet chamber means repeat visits.', approach: 'Careful field work, test records at every site, and engineers who are used to difficult access.' },
  { slug: 'public-sector', name: 'Government and NGOs', lead: 'Dependable connectivity and safety systems for public programmes.', points: ['Network design and installation', 'Safety signage and site compliance', 'Managed IT support', 'Reporting dashboards'], img: 'safety-signage', challenge: 'Programmes run across many sites and need evidence that work was done properly.', approach: 'Standard checklists, photographic visit reports and dashboards that roll up site status.' },
  { slug: 'offices', name: 'Offices and enterprise', lead: 'Server rooms, networks and security that your teams never think about.', points: ['Server room maintenance', 'Managed helpdesk and monitoring', 'Access control for floors and rooms', 'Backups and device management'], img: 'ceiling-speakers', challenge: 'Staff lose hours when a printer, mailbox or switch fails and nobody owns the fix.', approach: 'One support number, scheduled maintenance and asset records so problems are found early.' },
  { slug: 'retail', name: 'Retail and hospitality', lead: 'Cameras, Wi-Fi and audio for customer-facing spaces.', points: ['CCTV coverage planning', 'Guest and staff Wi-Fi', 'Background audio and paging', 'Out-of-hours support'], img: 'cctv-maintenance-checks', challenge: 'Customer-facing sites trade late and cannot wait until Monday for a fix.', approach: 'Coverage planning before purchase, tidy installs, and an out-of-hours support line.' },
  { slug: 'health', name: 'Healthcare', lead: 'Reliable systems for sites where downtime is not an option.', points: ['Resilient network design', 'Access control for restricted areas', 'Round-the-clock support', 'Planned maintenance windows'], img: 'wall-speakers', challenge: 'Clinical teams cannot stop work for IT. Maintenance has to be planned around patients.', approach: 'Redundant links where it matters, controlled access to sensitive rooms and agreed maintenance windows.' },
];

export const INSIGHTS = [
  { slug: 'good-structured-cabling', tag: 'Networks', title: 'What a good structured cabling job looks like', mins: 5, lead: 'Labelled runs, tested links, tidy racks and a handover pack. These are the checks we make before we leave a site.', body: [
    ['h', 'Start with the survey, not the cable'], ['p', 'Most cabling faults are decided before anyone pulls a cable. Where are the outlets, where will the cabinet sit, and how will cable reach each one without sharp bends or heat sources? A short survey answers these questions and prevents rework.'],
    ['h', 'What to check at handover'], ['ul', ['Every run labelled at both ends, matching a written schedule', 'Every link tested and the results kept', 'Cabinets tidy, with slack managed and bend radius respected', 'Spare capacity left in trays and patch panels', 'A handover pack with drawings, labels and test results']],
    ['q', 'If you cannot find a cable in two minutes, the installation is not finished.'], ['h', 'Why it pays off'], ['p', 'Tidy, documented cabling is quicker to maintain. The next engineer can trace a fault without guessing, which shortens outages and cuts call-out time.'] ] },
  { slug: 'planning-cctv-coverage', tag: 'CCTV', title: 'Planning camera coverage before you buy cameras', mins: 4, lead: 'Start with what you need to see and when. Placement and lighting matter more than megapixels.', body: [
    ['h', 'Decide what each camera must do'], ['p', 'A camera that must identify a face at a door needs a different position and lens than one that watches a car park. List the views you need and the purpose of each before choosing hardware.'],
    ['h', 'The three things that decide image quality'], ['ul', ['Placement and height, to avoid glare and blind spots', 'Lighting at night, including infrared range', 'Storage sizing for the retention period you need']],
    ['h', 'Keep it maintained'], ['p', 'Lenses collect dust, cables loosen and recorders fill up. Scheduled checks catch problems while there is still footage to protect.'] ] },
  { slug: 'preventive-maintenance', tag: 'Managed IT', title: 'Why preventive maintenance beats emergency call-outs', mins: 4, lead: 'Scheduled checks on servers, cabling chambers and cameras catch the faults that otherwise strike at the worst time.', body: [
    ['h', 'Failures give warnings'], ['p', 'Fans get noisy, disks report errors, cables loosen and chambers fill with water. A scheduled visit finds these signs while the fix is cheap and planned.'],
    ['h', 'A simple maintenance rhythm'], ['ul', ['Monthly: backups, updates and device health', 'Quarterly: racks, cabling, UPS and cooling', 'Yearly: a full review of assets, warranties and capacity']],
    ['q', 'The best outage is the one your users never notice.'], ['p', 'Written visit reports turn maintenance into evidence: what was checked, what was found and what was done.'] ] },
  { slug: 'zoning-public-address', tag: 'Audio', title: 'Zoning a public address system', mins: 3, lead: 'Dividing a building into zones lets you page one classroom or the whole campus without wasted volume.', body: [
    ['h', 'Why zones matter'], ['p', 'A single loud zone annoys everyone. Zoning lets you send a message to one area, a group of areas or the entire site, at the right volume for each space.'],
    ['h', 'Planning zones'], ['ul', ['Group spaces by use and noise level', 'Keep emergency messages able to override every zone', 'Choose speaker spacing for even coverage, not loudness', 'Label every zone on the controller and in the handover pack']] ] },
  { slug: 'aligning-radio-links', tag: 'Telecom', title: 'Aligning a radio link for remote sites', mins: 4, lead: 'Line of sight, mounting and alignment decide link quality. Careful field work saves repeat visits.', body: [
    ['h', 'Line of sight comes first'], ['p', 'Trees, buildings and terrain all interfere. A survey with the right tools confirms the path before any hardware is mounted.'],
    ['h', 'Mounting and alignment'], ['ul', ['Rigid, well-grounded mounts that do not move in wind', 'Alignment using signal readings, not guesswork', 'Weatherproofed connectors and tidy cable runs', 'Recorded results at handover']] ] },
  { slug: 'logs-to-dashboard', tag: 'Data', title: 'From device logs to a dashboard people use', mins: 4, lead: 'Choose the three numbers that drive decisions, then build the report around them.', body: [
    ['h', 'Fewer numbers, better decisions'], ['p', 'A dashboard with forty charts is ignored. Ask the people who run the site which three numbers change what they do, and start there.'],
    ['h', 'Build it in steps'], ['ul', ['Collect data from devices that already exist', 'Clean and label it so names mean the same thing everywhere', 'Show the three numbers with a clear good, warning and bad range', 'Review monthly and add only what is asked for']] ] },
];

export const STORIES_EXTRA = {
  'server-room-maintenance': { kpis: [['Rack and cabling', 'Checked'], ['Visit report', 'Written'], ['Follow-up', 'Scheduled']], story: 'A routine maintenance visit is where small faults are found. Engineers inspect racks, cabling and equipment, tidy what has drifted and record what was done.' },
  'manhole-maintenance': { kpis: [['Chamber', 'Inspected'], ['Cables', 'Managed'], ['Photos', 'Recorded']], story: 'Underground chambers hold the cables that link sites together. Maintenance keeps them dry, tidy and traceable.' },
};

export const VALUES = [
  ['Predictable delivery', 'We say what will happen and when, and we tell you early if that changes.'],
  ['Records, not promises', 'Every visit ends with a written report so work can be checked.'],
  ['Standard first', 'Labelled, tested and documented installs that the next engineer can understand.'],
  ['Local and reachable', 'Engineers based in Nairobi, and a support desk you can phone.'],
];

export const TIMELINE = [
  ['2014', 'Maruway Networks founded', 'The company begins providing IT and network services in Nairobi.'],
  ['Growth', 'Telecom and public programme work', 'Field engineering for operators and public programmes, including radio and school connectivity projects.'],
  ['Today', 'Managed IT, networks, security, IoT and data', 'One team across six disciplines, with a support desk and field engineers.'],
];

export const FAQS = [
  ['How fast can a technician reach us?', 'Our target is to be on site within 60 minutes for covered locations in Nairobi. Coverage area and terms are confirmed in your service agreement.'],
  ['Do you work outside Nairobi?', 'Yes. We work across East Africa on planned projects, and arrange cover for remote sites during the survey.'],
  ['Can you support equipment you did not install?', 'Usually yes. We start with an audit of what you have, record it, and then agree what we will support.'],
  ['What do we get after a visit?', 'A short written visit report: what was checked, what was found, what was done and what we recommend next.'],
  ['Do you supply the hardware?', 'We can supply and install hardware from partners such as Ubiquiti and GeoVision, or work with equipment you already own.'],
  ['How do we ask for a quotation?', 'Send a request through the contact page or call the support desk. Most quotations start with a short site survey.'],
];

export const SUPPORT_TIERS = [
  ['Essential', 'Business hours helpdesk, remote support and scheduled visits.', ['Helpdesk by phone and email', 'Remote diagnosis', 'Quarterly maintenance visit']],
  ['Priority', 'Extended hours and on-site response for sites that cannot wait.', ['Everything in Essential', 'Target on-site response of 60 minutes', 'Monthly visit and report']],
  ['Always-on', 'Round-the-clock cover with monitoring for critical sites.', ['Everything in Priority', '24/7 support desk', 'Proactive monitoring and reviews']],
];

export const ROLES = [
  ['Field engineers', 'Cabling, CCTV, radio and rack work on client sites.'],
  ['Support desk', 'First contact for faults, remote diagnosis and dispatch.'],
  ['Network engineers', 'Design, configuration and monitoring of client networks.'],
  ['Data and IoT', 'Dashboards, sensors and reporting.'],
];

export const PARTNER_GROUPS = [
  ['Technology partners', 'We deploy and support equipment from these vendors.', [['Ubiquiti Networks', 'ubiquiti'], ['GeoVision', 'geovision']]],
  ['Organisations we have worked with', 'Logos shown with permission. VERIFY each one before publishing.', [['Airtel', 'airtel'], ['Safaricom', 'safaricom'], ['UNICEF', 'unicef'], ['Liquid Telecom', 'liquid-telecom'], ['Jamii Telecom', 'jamii-telecom'], ['Nursing Council of Kenya', 'nck'], ['Ecoaxis', 'ecoaxis'], ['Apiro Data', 'apiro-data']]],
];
