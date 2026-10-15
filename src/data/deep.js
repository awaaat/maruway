// Long-form copy for service, industry and company pages.
// Written from how Maruway's existing services work. VERIFY every claim with management before publishing.

export const SERVICE_DEEP = {
  'managed-it': {
    art: 'managed-it-hero',
    what: {
      k: 'What it is',
      h: 'An IT department you can phone, without hiring one.',
      p: [
        `Every hour your people spend waiting on a frozen laptop, a dead printer or a mailbox that will not open is an hour you are paying for and not getting. Managed IT removes that waste. You phone one number, a named person answers, and the problem is owned until it is closed.`,
        `Since 2014 we have looked after offices, schools and clinics across Nairobi and East Africa. We keep the asset list, check the backups and write down every visit, so when your board or your auditor asks, the answer is on paper and not in somebody's memory.`,
      ],
      facts: [['Who calls us', 'Office managers, school administrators, clinic managers'], ['How you reach us', 'Phone, WhatsApp or email'], ['What you keep', 'A written record of every visit']],
    },
    benefits: [
      { k: 'Fewer stoppages', h: 'Faults are caught while they are small.', p: `The costly failures never arrive without warning. A disk starts reporting errors, a backup quietly stops, a fan begins to scream. We find these signs on a routine visit and fix them on a quiet afternoon, so you never learn about them in the middle of payroll.`, art: 'managed-it-flow', alt: 'Ticket journey from report to fix' },
      { k: 'One owner', h: 'Nobody has to wonder whose job it is.', p: `When something breaks at 8:55 on a Monday, you should not be hunting for the right supplier. Printer, router, mailbox or server, the answer is the same: call us. We chase the vendor, honour the warranty and send the engineer, so your staff get back to work and you get your morning back.`, img: 'server-room-maintenance', alt: 'Engineer inspecting a server rack' },
      { k: 'Known costs', h: 'Planned spending instead of surprise invoices.', p: `Surprise invoices are what make IT feel expensive. Our asset records show what is ageing and when each warranty ends, so replacements are planned into next year's budget instead of arriving as emergencies you have no choice but to pay for.`, art: 'analytics-dashboard', alt: 'Dashboard of devices and warranties' },
      { k: 'Evidence', h: 'Every visit ends with a short written report.', p: `Trust is easier when it is written down. Every visit ends with a short report: what we checked, what we found, what we did and what we recommend next. Auditors, boards and owners can see the work was done, and so can you.`, img: 'cctv-maintenance-checks', alt: 'Maruway team on a maintenance visit' },
    ],
    compare: { before: ['Staff try to fix problems themselves', 'Nobody knows what equipment you own', 'Backups are assumed, never tested', 'Each fault starts with finding a supplier'], after: ['One phone number, a named person answers', 'Asset list with ages and warranty dates', 'Backups checked and restore-tested', 'We own the fault until it is closed'] },
    get: [['Helpdesk', 'Phone, WhatsApp and email support for users and devices.'], ['On-site engineers', 'A technician sent when the fault needs hands.'], ['Maintenance rhythm', 'Monthly and quarterly visits agreed up front.'], ['Backups and accounts', 'Email, cloud accounts and backup jobs administered.'], ['Asset register', 'Every device recorded with age and warranty.'], ['Visit reports', 'A short written record after every visit.']],
    faq: [['Can you support equipment you did not install?', 'Usually yes. We audit what you have, record it, and then agree what we will support and how.'], ['What if the fault needs a spare part?', 'We can supply parts and hardware, or work with your preferred supplier, and we track the warranty either way.'], ['Is support remote or on site?', 'Both. Many faults are solved remotely first. When hands are needed, an engineer is dispatched.'], ['How do we start?', 'A short site visit and audit. You then receive a written proposal with the scope and the support level.']],
    inds: ['offices', 'education', 'health'],
  },
  'network-infrastructure': {
    art: 'network-layers',
    what: {
      k: 'What it is',
      h: 'The roads, junctions and signposts of your organisation.',
      p: [
        `Your network carries every email, every call, every payment and every camera feed. When it is built well, nobody notices it. When it is built badly, everything else in the business feels broken, and your best people lose hours to a problem that was never theirs.`,
        `We design for the building you actually have, install to a standard, label every run and hand over drawings and test results. Years from now the next engineer, ours or yours, can find a fault in minutes. That is what you are really buying: a network you are never held hostage by.`,
      ],
      facts: [['Covers', 'Cabling, Wi-Fi, switching, routing, VPNs'], ['Includes', 'Chambers, ducts and outside plant'], ['Handover', 'Drawings, labels and test results']],
    },
    benefits: [
      { k: 'Reliable', h: 'Built in layers so one failure stays small.', p: `A single failure should never take the whole company offline. We build the network in layers, core, distribution, access and edge, so a broken switch affects one floor and not the whole building. That is the difference between an annoying morning and a lost day of trading.`, art: 'network-layers', alt: 'Four network layers from core to edge' },
      { k: 'Findable', h: 'Every cable is labelled at both ends.', p: `The most expensive part of any fault is the time spent finding it. Every cable we install is labelled at both ends and matched to a written schedule, so tracing a fault is reading, not guessing. A ten minute fix stays a ten minute fix.`, art: 'network-rack', alt: 'Neatly patched network rack' },
      { k: 'Weatherproof', h: 'Outside plant that survives the rains.', p: `The link that fails is often the one nobody can see. Underground chambers fill with water, joints corrode and ducts crack. We inspect them, keep them dry and photograph the result, so the connection between your buildings survives the rains.`, img: 'manhole-maintenance', alt: 'Technician working in a cable chamber' },
      { k: 'Ready to grow', h: 'Spare capacity left where you will need it.', p: `You will hire, expand and add equipment. We leave room in trays, patch panels and switch ports on purpose, so a new department is a day of work and not a rebuild.`, img: 'server-room-maintenance', alt: 'Server room with spare rack space' },
    ],
    compare: { before: ['Cables in a tangle, unlabelled', 'Wi-Fi dead spots nobody can explain', 'One switch failure takes down everything', 'No drawings of what is behind the ceiling'], after: ['Labelled, tested runs on a schedule', 'Wi-Fi surveyed and tuned per floor', 'Layered design that contains faults', 'As-built drawings and test results'] },
    get: [['Site survey', 'Walk-through, measurements and a written design.'], ['Structured cabling', 'Patch panels, cabinets and tested links.'], ['Wi-Fi design', 'Access points placed from a survey, then tuned.'], ['Switching and routing', 'Configured, secured and documented.'], ['Chamber works', 'Inspection, cable management and photo records.'], ['Handover pack', 'Drawings, labels and test results.']],
    faq: [['Do you install fibre?', 'Yes, for backbones between rooms, floors and buildings, and for outside plant where the route needs it.'], ['Which equipment do you use?', 'We work with partners such as Ubiquiti and can also support equipment you already own.'], ['Can you fix our existing network?', 'Yes. We start with an audit, document what is there and fix the worst problems first.'], ['How long does a cabling job take?', 'It depends on the number of outlets and the building. The survey gives you a schedule before any work starts.']],
    inds: ['education', 'telecom', 'offices'],
  },
  'cctv-access-control': {
    art: 'cctv-plan',
    what: {
      k: 'What it is',
      h: 'Eyes on the important places, and keys that keep a record.',
      p: [
        `When something goes wrong at your premises, two questions matter: what happened, and who was there. CCTV answers the first. Access control answers the second. If either one fails on the day, you are left with a loss and no evidence, which is the worst place a business owner can be.`,
        `A camera with a dusty lens or a recorder with a full disk gives you comfort and no protection. That is why we do more than install. We plan every view, test every door, and come back on schedule to check the system will work on the day it matters.`,
      ],
      facts: [['Cameras', 'IP cameras, recorders, remote viewing'], ['Doors', 'Readers, locks, controllers and logs'], ['After install', 'Scheduled checks with visit reports']],
    },
    benefits: [
      { k: 'Coverage', h: 'Cameras placed for what they must see.', p: `A camera that identifies a face at the door sits differently from one that watches a yard at night. We plan each view, its height and its lighting before we choose any hardware, so the footage you need is footage you can actually use.`, art: 'cctv-plan', alt: 'Floor plan with camera coverage cones' },
      { k: 'Doors that remember', h: 'Reader, lock and camera tested together.', p: `A door is only secure when the reader, the lock and the camera work as one. We test them together and leave you a log of who opened what and when. No more shared keys and no more guessing.`, art: 'access-door', alt: 'Door with reader, lock and camera' },
      { k: 'Checked', h: 'Maintenance visits that keep footage safe.', p: `Systems fail quietly. Lenses cloud, disks fill, cables loosen. Our maintenance visits clean, re-aim and test, and you get a report afterwards, so you hear about a fault from us and not after an incident.`, img: 'cctv-maintenance-checks', alt: 'Technicians checking CCTV equipment' },
      { k: 'Compliant', h: 'Signage and site rules done properly.', p: `Signs are part of security. Warning and restricted-area signage fitted where the law and good practice expect it tells visitors and staff the rules, and protects you if a dispute ever arises.`, img: 'safety-signage', alt: 'Safety signage fitted by the team' },
    ],
    compare: { before: ['Cameras installed wherever there was a bracket', 'Footage overwritten before anyone looks', 'Doors opened with shared keys', 'Nobody checks the system until it is needed'], after: ['Each view planned for a purpose', 'Storage sized for your retention period', 'Door log shows who opened what, when', 'Scheduled checks and written reports'] },
    get: [['Coverage plan', 'A drawing showing each camera and what it sees.'], ['Installation', 'Cameras, recorders and cabling, neatly done.'], ['Access control', 'Readers, locks and controllers for doors and gates.'], ['Remote viewing', 'Secure viewing from a phone or office screen.'], ['Maintenance checks', 'Scheduled visits with a report each time.'], ['Signage', 'Safety and restricted-area signs fitted.']],
    faq: [['How long is footage kept?', 'It depends on the storage we size. We agree the retention period with you first, then size the recorder disks to match.'], ['Can I watch from my phone?', 'Yes. Remote viewing is set up securely as part of commissioning.'], ['Do you maintain systems you did not install?', 'Usually yes, after an inspection that records what is there.'], ['Can doors work during a power cut?', 'We design lock behaviour for power failure and can add battery or solar backup so the system stays on.']],
    inds: ['retail', 'offices', 'education'],
  },
  'telecom-iot': {
    art: 'telecom-link',
    what: {
      k: 'What it is',
      h: 'Getting remote places online, and keeping them there.',
      p: [
        `Remote sites are where reliability is hardest to buy. Mounts loosen in the wind, chambers flood, alignments drift, and every return trip costs a day and a vehicle. We do the field work properly the first time, so the site stays online and you stop paying for repeat visits.`,
        `Our engineers survey the path, mount rigidly, ground the equipment, align from signal readings and record the result. When we leave you have photos, readings and a maintenance plan, not a promise. That is how a hard site becomes a dependable one.`,
      ],
      facts: [['Radio', 'Receiver assembly, mounting, alignment'], ['IoT', 'Sensors, gateways and data links'], ['Sites', 'Schools, towers, estates and remote offices']],
    },
    benefits: [
      { k: 'Aligned', h: 'Links set up from readings, not guesswork.', p: `Alignment by eye is a gamble. We align with signal measurements and record the number, so you know the link is at its best today and have something to compare against when it drops tomorrow.`, art: 'telecom-link', alt: 'Two towers with a radio link between them' },
      { k: 'Surveyed', h: 'The path is confirmed before anything is mounted.', p: `Trees, buildings and terrain decide link quality long before any equipment is mounted. A survey first means one trip to install, instead of three trips to fix.`, img: 'manhole-maintenance', alt: 'Technician on a difficult field site' },
      { k: 'Connected', h: 'Sensors that report to one place.', p: `Why wait for a user to tell you a remote site is down? Temperature, power, door and water sensors report to one screen, so you hear about problems before your customers do.`, art: 'iot-sensors', alt: 'Sensors reporting to a gateway and dashboard' },
      { k: 'Handed over', h: 'Documentation and a maintenance plan.', p: `Every site ends with a pack: photos, readings, an equipment list and a maintenance schedule. The site stays online long after our van has left.`, img: 'server-room-maintenance', alt: 'Equipment cabinet at a site' },
    ],
    compare: { before: ['Equipment mounted where it was easy to reach', 'Alignment judged by eye', 'No record of how the site was left', 'Faults discovered when users complain'], after: ['Rigid, grounded mounts that survive wind', 'Alignment recorded from signal readings', 'Handover pack with photos and results', 'Sensors that flag problems early'] },
    get: [['Site survey', 'Path, access and power confirmed first.'], ['Installation', 'Mounts, grounding and weatherproofed connectors.'], ['Alignment', 'Radio alignment with readings recorded.'], ['Sensor deployment', 'IoT devices, gateways and connectivity.'], ['Testing', 'Link results recorded against the target.'], ['Handover pack', 'Documentation and a maintenance plan.']],
    faq: [['Do you work on remote sites?', 'Yes. Remote and difficult access is a large part of our field work, and the survey plans for it.'], ['What do IoT sensors measure?', 'Common choices are temperature, humidity, power status, door state and water level. We agree the list with you.'], ['Can you maintain a site after installation?', 'Yes. We can agree scheduled visits and fault response.'], ['Do you need power at the site?', 'Where mains is unreliable we can pair the site with solar and battery backup.']],
    inds: ['telecom', 'public-sector', 'education'],
  },
  'data-analytics': {
    art: 'analytics-dashboard',
    what: {
      k: 'What it is',
      h: 'The numbers you already have, shown in one place so you can act.',
      p: [
        `You already own the data that would help you decide, but it is scattered across spreadsheets, device logs, forms and email. So managers decide from memory, reports take days to assemble, and problems are seen only after customers complain.`,
        `We collect the data from where it lives, clean it so names and dates mean the same thing everywhere, and show it on a dashboard built around the questions your managers actually ask. It refreshes itself, so you spend your time acting on the numbers and not building them.`,
      ],
      facts: [['Input', 'Spreadsheets, device logs, forms, systems'], ['Output', 'Live dashboards and scheduled reports'], ['Result', 'Decisions from current numbers']],
    },
    benefits: [
      { k: 'One view', h: 'Five spreadsheets become one screen.', p: `When five people hold five versions of the truth, meetings become arguments. One live view means everyone looks at the same numbers, and the meeting starts with the answer.`, art: 'analytics-before-after', alt: 'Messy spreadsheets replaced by one dashboard' },
      { k: 'Comparison', h: 'See which branch or site needs attention.', p: `A scorecard shows which branch or site needs attention first, using the measures you choose and clear good, warning and poor ranges. Effort goes where it will help most.`, art: 'analytics-branches', alt: 'Branch scorecard ranked by performance' },
      { k: 'Automated', h: 'Reports that build themselves.', p: `The monthly report that eats two days of your team's time can build itself. People get their time back, and the report arrives on time.`, art: 'analytics-pipeline', alt: 'Data flowing from sources to a dashboard' },
      { k: 'Trustworthy', h: 'Data cleaned before it is charted.', p: `A chart is only as honest as the data under it. We remove duplicates, standardise dates and match names before anything is drawn, so the number you act on is the number that is true.`, art: 'analytics-dashboard', alt: 'Dashboard with uptime and faults' },
    ],
    compare: { before: ['Monthly report takes days to assemble', 'Numbers differ between files', 'Problems seen after customers complain', 'Budget decisions made from memory'], after: ['Dashboard refreshes automatically', 'One agreed definition for every number', 'Warnings visible before users notice', 'Planning from device age and trend data'] },
    get: [['Data audit', 'What you hold, where it lives, what is missing.'], ['Cleaning and joining', 'Consistent names, dates and records.'], ['Dashboards', 'Three to six numbers per audience, clearly ranged.'], ['Scheduled reports', 'Reports delivered on a rhythm, no assembly.'], ['Training', 'Your team learns to read and question the numbers.'], ['Monthly review', 'A short session to refine what is shown.']],
    faq: [['Do we need special software?', 'No. Dashboards open in a web browser. We recommend tools after learning what data you have.'], ['Can you use our existing spreadsheets?', 'Yes. Starting from the spreadsheets people already trust is usually the quickest route.'], ['How many numbers should a dashboard show?', 'Fewer than you think. We start with the three that change what people do and add only on request.'], ['Is our data kept private?', 'Access is controlled and we agree who may see what before anything is shared.']],
    inds: ['public-sector', 'retail', 'offices'],
  },
  'public-address-audio': {
    art: 'pa-zones',
    what: {
      k: 'What it is',
      h: 'Clear speech and good sound, in exactly the rooms that need it.',
      p: [
        `Announcements nobody can understand are worse than none. They waste a moment, annoy people and fail exactly when you need them: at the school gate, in the showroom, during an evacuation. A good public address system makes speech clear everywhere it should be heard, without making it loud.`,
        `We plan speaker positions to the space, run and label the cabling, set up zones so a message reaches only the right areas, and then test by listening in the room, not just on paper.`,
      ],
      facts: [['Spaces', 'Offices, halls, schools, showrooms'], ['Features', 'Zones, paging, microphones, music'], ['Check', 'Tested by listening in the space']],
    },
    benefits: [
      { k: 'Even', h: 'Overlapping coverage, not louder speakers.', p: `Loud speakers solve nothing. Overlapping coverage at moderate volume means every seat hears clearly, nobody is blasted and nobody at the back is lost.`, art: 'pa-coverage', alt: 'Overlapping speaker coverage cones' },
      { k: 'Zoned', h: 'Say it once, in the right place.', p: `Say it once, in the right place. Page a classroom, a floor or the whole site, and let emergency messages override every zone so they always get through.`, art: 'pa-zones', alt: 'Building plan with announcement zones' },
      { k: 'Tidy', h: 'Installed so it looks planned.', p: `Equipment on your ceiling is part of your brand. Speakers and cables are fitted neatly and labelled, so the room looks planned and the next engineer can service it.`, img: 'ceiling-speakers', alt: 'Ceiling speakers installed in an office' },
      { k: 'Tested', h: 'Intelligibility checked in the room.', p: `We walk the space and listen at the back, in the corners and under the loudest air conditioning, then adjust until speech is clear. If we cannot understand it, neither can your visitors.`, img: 'server-room-maintenance', alt: 'Engineer testing equipment on site' },
    ],
    compare: { before: ['One loud speaker and echoing corners', 'Announcements heard in every room', 'Cables run wherever was quickest', 'No label on any zone or amplifier'], after: ['Evenly spaced speakers at moderate volume', 'Messages sent to chosen zones', 'Neat routes and labelled cabling', 'Zones labelled on controller and drawing'] },
    get: [['Layout plan', 'Speaker positions drawn for your space.'], ['Installation', 'Ceiling and wall speakers with neat cabling.'], ['Zoning', 'Areas grouped for paging and background audio.'], ['Microphones and paging', 'Set up and tested for clear speech.'], ['Servicing', 'Fault repair and periodic checks.'], ['Handover pack', 'Zone map, labels and settings.']],
    faq: [['Can the system play background music?', 'Yes. Zones can carry music at a different level from announcements.'], ['Can an alarm override everything?', 'We can design emergency messages to override every zone.'], ['Do you install in existing buildings?', 'Yes. We plan cable routes around what is already there.'], ['Can you repair an old system?', 'Usually. We test each part and report what is worth keeping.']],
    inds: ['education', 'retail', 'public-sector'],
  },
  'solar-installation': {
    art: 'solar-system',
    what: {
      k: 'What it is',
      h: 'Power that keeps your critical equipment on when the grid does not.',
      p: [
        `Power cuts are not a rare event for most sites. They are a recurring cost in lost work, damaged equipment and generator fuel. Solar with a battery keeps the equipment that matters running, your router, cameras and servers, while everything else waits.`,
        `You do not need to run the whole building on sun. We start with what must never stop, size the system around it and expand later if the numbers make sense. It is a smaller, safer first step.`,
      ],
      facts: [['Parts', 'Panels, inverter, battery, protection'], ['Protects', 'Networks, CCTV, servers, radio sites'], ['Works with', 'Existing UPS or generator']],
    },
    benefits: [
      { k: 'Always on', h: 'Networks and cameras ride through outages.', p: `When the grid drops, the battery carries the load you chose. Your link, cameras and servers stay up, and your customers never notice there was a cut.`, art: 'solar-day', alt: 'Graph of solar output and battery through a grid outage' },
      { k: 'Sized right', h: 'Built around what you actually run.', p: `We list your equipment and what it draws, then size panels and batteries to that load. You pay for what you use, not for guesswork.`, art: 'solar-system', alt: 'Solar panels, inverter and battery feeding equipment' },
      { k: 'Remote ready', h: 'Powers sites where mains is weak or absent.', p: `Where mains is weak or absent, solar and battery let radio sites, sensors and remote offices run independently of the grid.`, art: 'telecom-link', alt: 'Radio towers on remote terrain' },
      { k: 'Tidy and safe', h: 'Protected circuits and labelled cabling.', p: `Isolators, surge protection and clear labels mean the system is safe today and understandable to whoever services it next.`, img: 'manhole-maintenance', alt: 'Neat cabling by a technician' },
    ],
    compare: { before: ['Every power cut stops the network', 'Generator fuel and noise on every outage', 'Remote sites need a mains line', 'Nobody knows the real load'], after: ['Battery carries critical equipment', 'Solar cuts fuel and running cost', 'Remote sites run independently', 'Load measured and sized to match'] },
    get: [['Load assessment', 'A list of what must stay on and what it draws.'], ['System design', 'Panels, inverter and battery sized to the load.'], ['Installation', 'Mounted, wired and protected to a standard.'], ['Hybrid setup', 'Works with existing UPS or generator.'], ['Monitoring', 'Output and battery level visible remotely.'], ['Servicing', 'Scheduled checks and fault repair.']],
    faq: [['Can solar run our whole building?', 'It can, but most sites start by protecting critical equipment. We size what makes sense for your load and budget.'], ['What happens on cloudy days?', 'The battery and the grid or generator fill the gap. The design accounts for it.'], ['Can it work with a generator?', 'Yes. A hybrid setup lets each source do what it does best.'], ['How is the system maintained?', 'Panels are cleaned and inspected, batteries and connections checked, with a report after each visit.']],
    inds: ['telecom', 'health', 'education'],
  },
};

export const PICKER = [
  ['Staff cannot work when a computer, printer or mailbox fails', 'managed-it'],
  ['Wi-Fi is weak or the cabling is a mess', 'network-infrastructure'],
  ['I want to see and control who enters my site', 'cctv-access-control'],
  ['A remote site needs a link or sensors', 'telecom-iot'],
  ['My reports take days and the numbers disagree', 'data-analytics'],
  ['People cannot hear announcements clearly', 'public-address-audio'],
  ['Power cuts keep stopping our equipment', 'solar-installation'],
];

export const INDUSTRY_DEEP = {
  education: { art: 'hero-industries', day: ['07:30  Gate cameras and access readers check in', '10:00  Principal pages the whole campus from reception', '13:00  Wi-Fi carries a class of forty tablets', '17:30  Maintenance report lands in the administrator\'s inbox'], services: ['network-infrastructure', 'cctv-access-control', 'public-address-audio'], faq: [['Can you work during term?', 'Yes. We schedule noisy work for weekends and holidays and keep classrooms usable.'], ['We have no IT staff. Who runs it?', 'We train a named person on site and cover the rest through support.']] },
  telecom: { art: 'telecom-link', day: ['06:00  Survey crew confirms the path to the mast', '09:30  Receiver mounted, grounded and aligned', '14:00  Chamber inspected, cables tidied and photographed', '17:00  Results recorded and site handed over'], services: ['telecom-iot', 'network-infrastructure', 'managed-it'], faq: [['Do you work on third-party networks?', 'Yes. We work as field partners to operators and ISPs under their standards.'], ['How do you record field work?', 'With photos, readings and a short report for every site.']] },
  'public-sector': { art: 'analytics-branches', day: ['08:00  Checklist opened for the site visit', '11:00  Equipment installed and signage fitted', '15:00  Photographs and results uploaded', '16:30  Site status rolls into the programme dashboard'], services: ['managed-it', 'data-analytics', 'cctv-access-control'], faq: [['Can you report across many sites?', 'Yes. A dashboard rolls up the status of every site in one place.'], ['Do you document work for audits?', 'Every visit produces a written report with photographs.']] },
  offices: { art: 'managed-it-hero', day: ['08:15  Remote check finds a failing disk before anyone notices', '10:30  A user phones, the desk fixes the mailbox in minutes', '14:00  Quarterly rack visit tidies cabling and tests the UPS', '16:00  Report logged, warranty dates updated'], services: ['managed-it', 'network-infrastructure', 'cctv-access-control'], faq: [['Do you replace our in-house IT?', 'We can, or we can support a small team with out-of-hours cover and projects.'], ['Do you work after hours?', 'Support plans can include extended or round-the-clock cover.']] },
  retail: { art: 'cctv-plan', day: ['08:00  Cameras checked before the doors open', '12:00  Guest Wi-Fi handles the lunch rush', '18:00  Background music shifts to the evening zone', '22:00  After-hours support line stays open'], services: ['cctv-access-control', 'network-infrastructure', 'public-address-audio'], faq: [['Can you install around opening hours?', 'Yes. We work early, late or overnight so trading is not interrupted.'], ['Can I watch all outlets together?', 'Remote viewing can bring several sites onto one screen.']] },
  health: { art: 'solar-system', day: ['06:00  Access control keeps pharmacy and records rooms secure', '09:00  Network links wards, labs and reception', '13:00  Grid drops; battery carries critical equipment', '20:00  Support desk watches the systems overnight'], services: ['network-infrastructure', 'managed-it', 'cctv-access-control'], faq: [['How do you schedule around patients?', 'Maintenance windows are agreed with clinical staff in advance.'], ['Can critical equipment survive outages?', 'Battery backup and solar can be sized for the equipment that must never stop.']] },
};

export const ABOUT_DEEP = {
  principles: [
    { k: 'Before the job', h: 'We survey first, quote second.', p: 'A short visit answers most of the questions that cause overruns later: access, power, routes, risks. You get a written scope you can compare.', art: 'network-layers', alt: 'Network layers drawn during a survey' },
    { k: 'During the job', h: 'We install to a standard.', p: 'Labelled, tested and neat, every time, whether the site is a boardroom or a chamber under a road.', img: 'manhole-maintenance', alt: 'Engineer working in a chamber' },
    { k: 'After the job', h: 'We write down what was done.', p: 'A visit report, drawings and test results stay with you. Good work should be easy to verify.', img: 'server-room-maintenance', alt: 'Engineers checking a server rack' },
    { k: 'Always', h: 'We pick up the phone.', p: 'A support desk, field engineers and a clear route to a person who knows your site.', art: 'hero-support', alt: 'Sixty minute response clock' },
  ],
  steps: [['Survey', 'We visit, measure and ask what must never stop.'], ['Scope', 'A written plan with what is included and what is not.'], ['Install', 'Work done to a standard, labelled and tested.'], ['Hand over', 'Drawings, results and a walk-through.'], ['Support', 'Scheduled visits and a number to call.']],
};

export const CAREERS_DEEP = {
  rows: [
    { k: 'In the field', h: 'Work that you can see at the end of the day.', p: 'Cabling, cameras, radio links and racks. You leave a site with something tidy, tested and working, and a report that says so.', img: 'manhole-maintenance', alt: 'Engineer working in a chamber' },
    { k: 'On the desk', h: 'The calm centre of a fast job.', p: 'The support desk is where faults are understood, narrowed down and sent to the right engineer. Good listening matters as much as technical skill.', art: 'hero-support', alt: 'Support desk response illustration' },
    { k: 'In the data', h: 'Turning logs into decisions.', p: 'Dashboards, sensors and reports for people who need a clear answer, built by people who like making a mess make sense.', art: 'analytics-dashboard', alt: 'Dashboard of faults and uptime' },
  ],
  skills: ['Care about neat work', 'Write down what you did', 'Tell people early when plans change', 'Learn from the engineer next to you', 'Stay calm when something has stopped', 'Respect the client\'s site and time'],
  steps: [['Send your CV', 'Email a short note about the work you want to do.'], ['A conversation', 'We talk about your experience and our work.'], ['A practical look', 'For field roles, a short practical exercise.'], ['An offer', 'We confirm role, terms and start date together.']],
};

export const CONTACT_DEEP = {
  next: [['We read it', 'A person, not a form robot, reads your message the same working day.'], ['We reply', 'You get a call or message to clarify the details.'], ['We survey', 'For installations, a short site visit to measure and ask questions.'], ['You decide', 'A written quotation with scope, timeline and support options.']],
  bring: ['Where the site is and how to reach it', 'What has stopped, or what you want built', 'Roughly how many users, rooms or devices', 'Any deadline or opening date', 'Photos if you have them'],
};

export const PARTNER_DEEP = [
  { k: 'Ubiquiti Networks', h: 'Wi-Fi and switching for sites of every size.', p: 'We deploy Ubiquiti access points, switches and gateways where a reliable, centrally managed network is needed at a sensible price.', img: 'server-room-maintenance', alt: 'Network equipment in a rack' },
  { k: 'GeoVision', h: 'Cameras and recorders built for security work.', p: 'GeoVision cameras, recorders and access control form the backbone of many of our CCTV installations, supported by our scheduled maintenance.', img: 'cctv-maintenance-checks', alt: 'Team checking a CCTV system' },
];
export const VENDOR_RULES = [['Supportable', 'We only recommend equipment we can support after the install.'], ['Proven in the field', 'Hardware has to survive our sites, heat, dust and power cuts.'], ['Fairly priced', 'No lock-in and no invented extras.'], ['Documented', 'Manuals, firmware notes and settings recorded at handover.']];

export const SUPPORT_DEEP = {
  covered: [['Users and devices', 'Laptops, desktops, printers, phones and accounts.'], ['Servers and backups', 'Checks, updates and restore tests.'], ['Network and Wi-Fi', 'Switches, access points and links.'], ['CCTV and doors', 'Cameras, recorders and access control.'], ['Audio systems', 'Amplifiers, zones and speakers.'], ['Power', 'UPS, solar and battery backup.']],
  levels: [['Level 1', 'Desk answers, logs and tries a fix on the phone.'], ['Level 2', 'Remote engineer diagnoses and repairs.'], ['Level 3', 'Field engineer attends site with parts.'], ['Level 4', 'Specialist or vendor escalation, owned by us until closed.']],
};
