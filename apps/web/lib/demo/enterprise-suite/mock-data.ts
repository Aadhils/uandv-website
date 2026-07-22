export function formatInr(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export const demoLeads = [
  { id: 'LEAD-201', name: 'Arjun Nair', company: 'Vista Mart Demo', source: 'Website', score: 82, status: 'qualified', owner: 'Karthik Rao', createdAt: '2026-07-14' },
  { id: 'LEAD-202', name: 'Fatima Begum', company: 'Pearl Clinics Demo', source: 'Referral', score: 74, status: 'contacted', owner: 'Karthik Rao', createdAt: '2026-07-15' },
  { id: 'LEAD-203', name: 'Dev Patel', company: 'Axis Packers Demo', source: 'Expo', score: 61, status: 'new', owner: 'Priya Menon', createdAt: '2026-07-18' },
  { id: 'LEAD-204', name: 'Hannah George', company: 'Leaf & Co Demo', source: 'LinkedIn', score: 48, status: 'lost', owner: 'Karthik Rao', createdAt: '2026-07-02' },
  { id: 'LEAD-205', name: 'Suresh Balan', company: 'Metro Hardware Demo', source: 'Cold call', score: 69, status: 'contacted', owner: 'Karthik Rao', createdAt: '2026-07-19' },
  { id: 'LEAD-206', name: 'Ritika Shah', company: 'Orbit Retail Demo', source: 'Website', score: 77, status: 'qualified', owner: 'Nisha Varma', createdAt: '2026-07-20' },
];

export const demoCustomers = [
  { id: 'CUS-1001', name: 'Ravi Krishnan', company: 'Southern Retail Demo', email: 'ravi@southern.demo', phone: '+91 ••••• •••21', city: 'Chennai', status: 'active', owner: 'Karthik Rao', lifetimeValue: 1840000, openDeals: 2, lastContact: '2026-07-18' },
  { id: 'CUS-1002', name: 'Meera Iyer', company: 'BluePeak Traders Demo', email: 'meera@bluepeak.demo', phone: '+91 ••••• •••44', city: 'Coimbatore', status: 'active', owner: 'Karthik Rao', lifetimeValue: 920000, openDeals: 1, lastContact: '2026-07-16' },
  { id: 'CUS-1003', name: 'Imran Ali', company: 'Orbit Logistics Demo', email: 'imran@orbit.demo', phone: '+91 ••••• •••88', city: 'Bengaluru', status: 'prospect', owner: 'Priya Menon', lifetimeValue: 0, openDeals: 1, lastContact: '2026-07-12' },
  { id: 'CUS-1004', name: 'Sneha Patel', company: 'Cascade Foods Demo', email: 'sneha@cascade.demo', phone: '+91 ••••• •••09', city: 'Madurai', status: 'active', owner: 'Karthik Rao', lifetimeValue: 640000, openDeals: 0, lastContact: '2026-07-08' },
  { id: 'CUS-1005', name: 'Lakshmi Devi', company: 'Nimbus Wellness Demo', email: 'lakshmi@nimbus.demo', phone: '+91 ••••• •••33', city: 'Hyderabad', status: 'active', owner: 'Karthik Rao', lifetimeValue: 1180000, openDeals: 3, lastContact: '2026-07-20' },
  { id: 'CUS-1006', name: 'Asha Menon', company: 'Harbor Family Demo', email: 'asha@harbor.demo', phone: '+91 ••••• •••55', city: 'Kochi', status: 'active', owner: 'Nisha Varma', lifetimeValue: 420000, openDeals: 1, lastContact: '2026-07-21' },
];

export function getCustomerById(id: string) {
  return demoCustomers.find((c) => c.id === id);
}

export const demoDeals = [
  { id: 'DEAL-91', name: 'Southern Q3 Expansion', customer: 'Southern Retail Demo', stage: 'negotiation', value: 780000, probability: 70, owner: 'Karthik Rao', closeDate: '2026-08-15' },
  { id: 'DEAL-88', name: 'Nimbus ERP Pilot', customer: 'Nimbus Wellness Demo', stage: 'proposal', value: 450000, probability: 55, owner: 'Karthik Rao', closeDate: '2026-08-05' },
  { id: 'DEAL-84', name: 'Orbit WMS Rollout', customer: 'Orbit Logistics Demo', stage: 'qualification', value: 320000, probability: 35, owner: 'Priya Menon', closeDate: '2026-09-01' },
  { id: 'DEAL-80', name: 'BluePeak Annual', customer: 'BluePeak Traders Demo', stage: 'won', value: 210000, probability: 100, owner: 'Karthik Rao', closeDate: '2026-07-12' },
  { id: 'DEAL-77', name: 'Harbor Spare Parts', customer: 'Harbor Family Demo', stage: 'lost', value: 95000, probability: 0, owner: 'Priya Menon', closeDate: '2026-07-01' },
];

export const demoFollowUps = [
  { id: 'FU-11', relatedTo: 'CUS-1001 · Southern Retail Demo', type: 'call', dueDate: '2026-07-22', status: 'open', owner: 'Karthik Rao', note: 'Confirm Q3 replenishment volumes' },
  { id: 'FU-12', relatedTo: 'LEAD-201 · Vista Mart Demo', type: 'meeting', dueDate: '2026-07-23', status: 'open', owner: 'Karthik Rao', note: 'Product walkthrough' },
  { id: 'FU-13', relatedTo: 'CUS-1005 · Nimbus Wellness Demo', type: 'email', dueDate: '2026-07-21', status: 'overdue', owner: 'Karthik Rao', note: 'Send revised quotation QT-441' },
  { id: 'FU-14', relatedTo: 'CUS-1006 · Harbor Family Demo', type: 'whatsapp', dueDate: '2026-07-24', status: 'open', owner: 'Nisha Varma', note: 'Share Kerala package options' },
];

export const demoQuotations = [
  { id: 'QT-441', customer: 'Nimbus Wellness Demo', amount: 286000, status: 'sent', validUntil: '2026-07-30', owner: 'Karthik Rao' },
  { id: 'QT-438', customer: 'Southern Retail Demo', amount: 512000, status: 'accepted', validUntil: '2026-07-20', owner: 'Karthik Rao' },
  { id: 'QT-430', customer: 'BluePeak Traders Demo', amount: 148000, status: 'draft', validUntil: '2026-08-01', owner: 'Karthik Rao' },
  { id: 'QT-450', customer: 'Harbor Family Demo', amount: 185000, status: 'sent', validUntil: '2026-08-05', owner: 'Nisha Varma' },
];

export const demoSalesOrders = [
  { id: 'SO-7781', customer: 'Southern Retail Demo', amount: 512000, status: 'processing', orderDate: '2026-07-18', items: 18 },
  { id: 'SO-7760', customer: 'Nimbus Wellness Demo', amount: 164000, status: 'confirmed', orderDate: '2026-07-16', items: 9 },
  { id: 'SO-7722', customer: 'BluePeak Traders Demo', amount: 88000, status: 'shipped', orderDate: '2026-07-10', items: 6 },
  { id: 'SO-7701', customer: 'Cascade Foods Demo', amount: 121000, status: 'delivered', orderDate: '2026-07-02', items: 11 },
];

export const demoTasks = [
  { id: 'TSK-1', title: 'Prepare proposal deck', relatedTo: 'DEAL-88', priority: 'high', status: 'in_progress', dueDate: '2026-07-22', owner: 'Karthik Rao' },
  { id: 'TSK-2', title: 'Approve leave backlog', relatedTo: 'HR', priority: 'high', status: 'todo', dueDate: '2026-07-22', owner: 'Anitha Selvan' },
  { id: 'TSK-3', title: 'Confirm Bali hotel allotment', relatedTo: 'PKG-INT-02', priority: 'medium', status: 'todo', dueDate: '2026-07-23', owner: 'Nisha Varma' },
  { id: 'TSK-4', title: 'Reconcile June invoices', relatedTo: 'Accounting', priority: 'medium', status: 'done', dueDate: '2026-07-15', owner: 'Priya Menon' },
];

export const demoCalendar = [
  { id: 'CAL-1', title: 'Demo · Vista Mart', date: '2026-07-23', time: '11:00', type: 'demo', attendees: 'Karthik, Arjun' },
  { id: 'CAL-2', title: 'Kerala departure briefing', date: '2026-07-25', time: '09:00', type: 'internal', attendees: 'Nisha, Guides' },
  { id: 'CAL-3', title: 'HR weekly sync', date: '2026-07-24', time: '10:00', type: 'internal', attendees: 'Anitha, Priya' },
  { id: 'CAL-4', title: 'Negotiation · Southern', date: '2026-07-22', time: '16:30', type: 'meeting', attendees: 'Karthik, Ravi' },
];

export const demoNotes = [
  { id: 'NOTE-1', title: 'Budget timing', body: 'Customer wants phased billing across Aug–Oct.', relatedTo: 'DEAL-91', author: 'Karthik Rao', updatedAt: '2026-07-18' },
  { id: 'NOTE-2', title: 'Visa docs pending', body: 'Passport scans still missing for 2 passengers.', relatedTo: 'BK-4402', author: 'Nisha Varma', updatedAt: '2026-07-20' },
  { id: 'NOTE-3', title: 'Payroll cutoff', body: 'July payroll lock on 28th evening.', relatedTo: 'HR', author: 'Anitha Selvan', updatedAt: '2026-07-20' },
];

export const demoEmails = [
  { id: 'EM-1', subject: 'Revised quotation QT-441', from: 'sales@uandv.com', to: 'lakshmi@nimbus.demo', date: '2026-07-20 09:42', direction: 'outbound', preview: 'Updated commercial proposal with volume pricing…' },
  { id: 'EM-2', subject: 'Kerala package confirmation', from: 'travel@uandv.com', to: 'asha@harbor.demo', date: '2026-07-21 11:20', direction: 'outbound', preview: 'Booking BK-4401 is confirmed with voucher attached…' },
  { id: 'EM-3', subject: 'Re: Delivery windows', from: 'ravi@southern.demo', to: 'sales@uandv.com', date: '2026-07-18 17:10', direction: 'inbound', preview: 'Can we split SO-7781 across two drops?' },
];

export const demoLeadSources = [
  { label: 'Website', value: 38 },
  { label: 'Referral', value: 24 },
  { label: 'Expo', value: 16 },
  { label: 'LinkedIn', value: 12 },
  { label: 'Cold call', value: 10 },
];

export const demoPackages = [
  { id: 'PKG-DOM-01', name: 'Kerala Backwaters Escape', category: 'domestic', days: 5, price: 42999, seats: 18, availability: 'available', departures: ['2026-08-12', '2026-09-02'], inclusions: ['Houseboat', 'Breakfast', 'Transfers'], exclusions: ['Flights', 'Personal expenses'], itinerary: ['Kochi arrival', 'Alleppey houseboat', 'Kumarakom', 'Thekkady', 'Departure'] },
  { id: 'PKG-DOM-02', name: 'Rajasthan Heritage Circuit', category: 'domestic', days: 7, price: 56999, seats: 12, availability: 'available', departures: ['2026-08-20', '2026-10-05'], inclusions: ['Hotels', 'Guide', 'Breakfast'], exclusions: ['Flights', 'Lunch/Dinner'], itinerary: ['Jaipur', 'Pushkar', 'Jodhpur', 'Udaipur', 'Departure'] },
  { id: 'PKG-INT-01', name: 'Bali Honeymoon Soft Adventure', category: 'honeymoon', days: 6, price: 89999, seats: 8, availability: 'limited', departures: ['2026-09-10'], inclusions: ['Resort', 'Candlelight dinner', 'Airport transfers'], exclusions: ['Visa', 'International flights'], itinerary: ['Denpasar', 'Ubud', 'Nusa Penida', 'Seminyak', 'Departure'] },
  { id: 'PKG-INT-02', name: 'Dubai Family Explorer', category: 'international', days: 5, price: 79999, seats: 20, availability: 'available', departures: ['2026-08-28', '2026-11-15'], inclusions: ['Hotel', 'Desert safari', 'City tour'], exclusions: ['Flights', 'Visa'], itinerary: ['Arrival', 'City tour', 'Desert safari', 'Theme parks', 'Departure'] },
  { id: 'PKG-GRP-01', name: 'Himachal Group Trek Lite', category: 'group', days: 6, price: 24999, seats: 24, availability: 'available', departures: ['2026-09-18'], inclusions: ['Camping', 'Meals', 'Local transport'], exclusions: ['Flights', 'Gear rental'], itinerary: ['Manali', 'Base camp', 'Trek day', 'Trek day', 'Return'] },
  { id: 'PKG-PIL-01', name: 'Tirupati Darshan Circuit', category: 'pilgrimage', days: 3, price: 12999, seats: 40, availability: 'available', departures: ['2026-08-08', '2026-08-22'], inclusions: ['AC coach', 'Temple assistance', 'Hotel'], exclusions: ['Special entry tickets'], itinerary: ['Departure', 'Darshan', 'Return'] },
  { id: 'PKG-COR-01', name: 'Goa Corporate Offsite', category: 'corporate', days: 3, price: 18999, seats: 30, availability: 'available', departures: ['2026-09-05'], inclusions: ['Resort', 'Conference hall', 'Team dinner'], exclusions: ['Flights', 'Bar'], itinerary: ['Arrival + kickoff', 'Workshops', 'Departure'] },
];

export const demoTravelEnquiries = [
  { id: 'ENQ-901', customer: 'Harbor Family Demo', packageName: 'Kerala Backwaters Escape', status: 'quoted', owner: 'Nisha Varma', date: '2026-07-18', budget: 180000 },
  { id: 'ENQ-902', customer: 'Cascade Foods Demo', packageName: 'Goa Corporate Offsite', status: 'enquiry', owner: 'Nisha Varma', date: '2026-07-19', budget: 520000 },
  { id: 'ENQ-903', customer: 'BluePeak Traders Demo', packageName: 'Dubai Family Explorer', status: 'confirmed', owner: 'Nisha Varma', date: '2026-07-12', budget: 320000 },
  { id: 'ENQ-904', customer: 'Southern Retail Demo', packageName: 'Rajasthan Heritage Circuit', status: 'pending', owner: 'Nisha Varma', date: '2026-07-21', budget: 240000 },
];

export const demoBookings = [
  { id: 'BK-4401', customer: 'Harbor Family Demo', packageId: 'PKG-DOM-01', packageName: 'Kerala Backwaters Escape', departure: '2026-08-12', passengers: 4, amount: 171996, bookingStatus: 'confirmed', paymentStatus: 'paid', voucher: 'VCH-4401', cancelStatus: '—', refundStatus: '—' },
  { id: 'BK-4402', customer: 'BluePeak Traders Demo', packageId: 'PKG-INT-02', packageName: 'Dubai Family Explorer', departure: '2026-08-28', passengers: 3, amount: 239997, bookingStatus: 'pending', paymentStatus: 'partial', voucher: '—', cancelStatus: '—', refundStatus: '—' },
  { id: 'BK-4403', customer: 'Cascade Foods Demo', packageId: 'PKG-COR-01', packageName: 'Goa Corporate Offsite', departure: '2026-09-05', passengers: 22, amount: 417978, bookingStatus: 'confirmed', paymentStatus: 'pending', voucher: 'VCH-4403', cancelStatus: '—', refundStatus: '—' },
  { id: 'BK-4390', customer: 'Nimbus Wellness Demo', packageId: 'PKG-PIL-01', packageName: 'Tirupati Darshan Circuit', departure: '2026-07-05', passengers: 6, amount: 77994, bookingStatus: 'cancelled', paymentStatus: 'refunded', voucher: '—', cancelStatus: 'completed', refundStatus: 'settled' },
];

export const demoItineraryDays = [
  { day: 1, title: 'Arrival & hotel check-in', hotel: 'Backwater Residency', transport: 'Airport transfer', activities: 'Welcome drink', meals: 'Dinner', notes: 'Late check-in possible' },
  { day: 2, title: 'Houseboat cruise', hotel: 'Premium Houseboat', transport: 'AC coach + boat', activities: 'Village walk', meals: 'Breakfast, Lunch, Dinner', notes: 'Vegetarian options ready' },
  { day: 3, title: 'Kumarakom bird sanctuary', hotel: 'Lake View Inn', transport: 'AC coach', activities: 'Boat ride', meals: 'Breakfast, Dinner', notes: 'Carry binoculars' },
  { day: 4, title: 'Thekkady spice tour', hotel: 'Hilltop Stay', transport: 'AC coach', activities: 'Spice plantation', meals: 'Breakfast, Dinner', notes: 'Evening cultural show' },
  { day: 5, title: 'Departure', hotel: '—', transport: 'Airport transfer', activities: 'Checkout', meals: 'Breakfast', notes: 'Buffer 3 hours before flight' },
];

export const demoHotels = [
  { id: 'HTL-1', name: 'Backwater Residency', city: 'Alleppey', rooms: 'Deluxe Twin', rate: 5200, availability: 'available', checkIn: '14:00', checkOut: '11:00', status: 'confirmed' },
  { id: 'HTL-2', name: 'Desert Pearl Hotel', city: 'Dubai', rooms: 'Family Suite', rate: 14500, availability: 'limited', checkIn: '15:00', checkOut: '12:00', status: 'pending' },
  { id: 'HTL-3', name: 'Goa Coast Resort', city: 'Goa', rooms: 'Conference Block', rate: 7800, availability: 'available', checkIn: '13:00', checkOut: '11:00', status: 'confirmed' },
  { id: 'HTL-4', name: 'Ubud Garden Villas', city: 'Bali', rooms: 'Pool Villa', rate: 16800, availability: 'available', checkIn: '14:00', checkOut: '12:00', status: 'hold' },
];

export const demoTransport = [
  { id: 'TR-1', type: 'cab', route: 'COK Airport → Alleppey', vehicle: 'Innova Crysta', driver: 'Suresh K', schedule: '2026-08-12 10:30', status: 'confirmed' },
  { id: 'TR-2', type: 'bus', route: 'Chennai → Tirupati', vehicle: 'AC Coach 42', driver: 'Team Alpha', schedule: '2026-08-08 05:00', status: 'confirmed' },
  { id: 'TR-3', type: 'airport-transfer', route: 'DXB → Desert Pearl', vehicle: 'Hiace', driver: 'Partner Gulf', schedule: '2026-08-28 14:10', status: 'pending' },
  { id: 'TR-4', type: 'cab', route: 'Goa Airport → Coast Resort', vehicle: 'Tempo Traveller', driver: 'Ramesh', schedule: '2026-09-05 11:00', status: 'scheduled' },
];

export const demoFlightTrain = [
  { id: 'FT-1', mode: 'flight', route: 'MAA → COK', travelDate: '2026-08-12', passengers: 4, reference: 'REF-PENDING', status: 'pending' },
  { id: 'FT-2', mode: 'flight', route: 'BLR → DXB', travelDate: '2026-08-28', passengers: 3, reference: 'EK-DEMO-5521', status: 'confirmed' },
  { id: 'FT-3', mode: 'train', route: 'MAS → TPTY', travelDate: '2026-08-08', passengers: 6, reference: 'TRN-DEMO-221', status: 'confirmed' },
  { id: 'FT-4', mode: 'flight', route: 'BOM → GOI', travelDate: '2026-09-05', passengers: 22, reference: 'REF-PENDING', status: 'enquiry' },
];

export const demoVisas = [
  { id: 'VISA-1', customer: 'BluePeak Traders Demo', country: 'UAE', documents: ['Passport', 'Photo', 'Bank statement'], applicationStatus: 'submitted', appointmentStatus: 'scheduled', approvalStatus: 'pending' },
  { id: 'VISA-2', customer: 'Harbor Family Demo', country: 'Indonesia', documents: ['Passport', 'Photo'], applicationStatus: 'draft', appointmentStatus: '—', approvalStatus: '—' },
  { id: 'VISA-3', customer: 'Nimbus Wellness Demo', country: 'UAE', documents: ['Passport', 'Photo', 'Invitation'], applicationStatus: 'submitted', appointmentStatus: 'done', approvalStatus: 'approved' },
];

export const demoAgents = [
  { id: 'AG-1', name: 'Coastal Holidays Demo', contact: 'Vimal', bookings: 12, commissionRate: 8, performance: 'high', settlementDue: 64000 },
  { id: 'AG-2', name: 'Skyline Tours Demo', contact: 'Rekha', bookings: 7, commissionRate: 7, performance: 'medium', settlementDue: 28000 },
  { id: 'AG-3', name: 'Temple Trails Demo', contact: 'Joseph', bookings: 15, commissionRate: 6, performance: 'high', settlementDue: 21000 },
];

export const demoTravelSuppliers = [
  { id: 'TSUP-1', name: 'Backwater Residency', type: 'hotel', city: 'Alleppey', paymentDue: 78000, contractNote: 'Peak season allotment 10 rooms' },
  { id: 'TSUP-2', name: 'Kerala Cab Co Demo', type: 'transport', city: 'Kochi', paymentDue: 24000, contractNote: 'Airport SLA 45 mins' },
  { id: 'TSUP-3', name: 'Spice Route Guides', type: 'guide', city: 'Thekkady', paymentDue: 12000, contractNote: 'English + Tamil guides' },
  { id: 'TSUP-4', name: 'Desert Activities LLC', type: 'activity', city: 'Dubai', paymentDue: 56000, contractNote: 'Safari + BBQ package' },
];

export const demoTravelComms = [
  { id: 'TC-1', type: 'enquiry-follow-up', channel: 'whatsapp', to: 'Harbor Family Demo', body: 'Sharing Kerala options and dates.', date: '2026-07-18' },
  { id: 'TC-2', type: 'quote-sent', channel: 'email', to: 'Cascade Foods Demo', body: 'Corporate offsite quotation attached.', date: '2026-07-19' },
  { id: 'TC-3', type: 'booking-confirmation', channel: 'email', to: 'Harbor Family Demo', body: 'BK-4401 confirmed with voucher VCH-4401.', date: '2026-07-21' },
  { id: 'TC-4', type: 'payment-reminder', channel: 'whatsapp', to: 'BluePeak Traders Demo', body: 'Balance pending for BK-4402.', date: '2026-07-21' },
  { id: 'TC-5', type: 'travel-reminder', channel: 'email', to: 'Harbor Family Demo', body: 'Departure in 3 weeks — document checklist.', date: '2026-07-22' },
];

export const demoPopularDestinations = [
  { label: 'Kerala', value: 42 },
  { label: 'Dubai', value: 28 },
  { label: 'Goa', value: 18 },
  { label: 'Bali', value: 12 },
];

export const demoAgentPerformance = [
  { label: 'Coastal Holidays', value: 12 },
  { label: 'Temple Trails', value: 15 },
  { label: 'Skyline Tours', value: 7 },
];

export const demoEmployees = [
  { id: 'EMP-01', name: 'Priya Menon', email: 'admin@uandv.com', department: 'Operations', role: 'Platform Admin', status: 'active', joinDate: '2024-02-01', salary: 120000 },
  { id: 'EMP-02', name: 'Karthik Rao', email: 'sales@uandv.com', department: 'Sales', role: 'Sales Executive', status: 'active', joinDate: '2024-06-12', salary: 75000 },
  { id: 'EMP-03', name: 'Anitha Selvan', email: 'hr@uandv.com', department: 'HR', role: 'HR Manager', status: 'active', joinDate: '2024-03-18', salary: 85000 },
  { id: 'EMP-04', name: 'Nisha Varma', email: 'travel@uandv.com', department: 'Travel', role: 'Travel Manager', status: 'active', joinDate: '2024-09-01', salary: 90000 },
  { id: 'EMP-05', name: 'Vignesh Kumar', email: 'vignesh@uandv.demo', department: 'Warehouse', role: 'Store Lead', status: 'active', joinDate: '2025-01-09', salary: 48000 },
  { id: 'EMP-06', name: 'Divya R', email: 'divya@uandv.demo', department: 'Finance', role: 'Accountant', status: 'on_leave', joinDate: '2025-04-02', salary: 56000 },
];

export const demoDepartments = [
  { id: 'DEP-1', name: 'Sales', head: 'Karthik Rao', employees: 2 },
  { id: 'DEP-2', name: 'HR', head: 'Anitha Selvan', employees: 1 },
  { id: 'DEP-3', name: 'Travel', head: 'Nisha Varma', employees: 1 },
  { id: 'DEP-4', name: 'Operations', head: 'Priya Menon', employees: 1 },
  { id: 'DEP-5', name: 'Warehouse', head: 'Vignesh Kumar', employees: 1 },
  { id: 'DEP-6', name: 'Finance', head: 'Divya R', employees: 1 },
];

export const demoAttendance = [
  { id: 'ATT-1', employee: 'Karthik Rao', date: '2026-07-21', checkIn: '09:12', checkOut: '18:05', status: 'present' },
  { id: 'ATT-2', employee: 'Anitha Selvan', date: '2026-07-21', checkIn: '09:01', checkOut: '17:55', status: 'present' },
  { id: 'ATT-3', employee: 'Nisha Varma', date: '2026-07-21', checkIn: '09:08', checkOut: '18:40', status: 'present' },
  { id: 'ATT-4', employee: 'Divya R', date: '2026-07-21', checkIn: '—', checkOut: '—', status: 'absent' },
  { id: 'ATT-5', employee: 'Vignesh Kumar', date: '2026-07-21', checkIn: '09:28', checkOut: '18:20', status: 'late' },
];

export const demoLeave = [
  { id: 'LV-31', employee: 'Divya R', type: 'sick', from: '2026-07-20', to: '2026-07-22', days: 3, status: 'approved' },
  { id: 'LV-32', employee: 'Karthik Rao', type: 'casual', from: '2026-07-28', to: '2026-07-28', days: 1, status: 'pending' },
  { id: 'LV-33', employee: 'Nisha Varma', type: 'earned', from: '2026-08-18', to: '2026-08-20', days: 3, status: 'pending' },
];

export const demoPayroll = [
  { id: 'PAY-JUL-01', employee: 'Priya Menon', period: 'Jul 2026', gross: 120000, deductions: 18000, net: 102000, status: 'processed' },
  { id: 'PAY-JUL-02', employee: 'Karthik Rao', period: 'Jul 2026', gross: 75000, deductions: 9800, net: 65200, status: 'processed' },
  { id: 'PAY-JUL-03', employee: 'Nisha Varma', period: 'Jul 2026', gross: 90000, deductions: 12000, net: 78000, status: 'draft' },
  { id: 'PAY-JUL-04', employee: 'Anitha Selvan', period: 'Jul 2026', gross: 85000, deductions: 11200, net: 73800, status: 'draft' },
];

export const demoProducts = [
  { id: 'PRD-01', name: 'Industrial Pack Tape', sku: 'IPT-100', category: 'Packaging', price: 240, cost: 140, stock: 820, reorderLevel: 200 },
  { id: 'PRD-02', name: 'Barcode Scanner Pro', sku: 'BSP-220', category: 'Hardware', price: 8900, cost: 5400, stock: 46, reorderLevel: 15 },
  { id: 'PRD-03', name: 'Thermal Label Roll', sku: 'TLR-80', category: 'Packaging', price: 320, cost: 180, stock: 64, reorderLevel: 100 },
  { id: 'PRD-04', name: 'Travel Voucher Kit', sku: 'TVK-10', category: 'Travel Ops', price: 150, cost: 60, stock: 220, reorderLevel: 80 },
];

export const demoCategories = [
  { id: 'CAT-1', name: 'Packaging', products: 2, description: 'Consumables for packing and labeling' },
  { id: 'CAT-2', name: 'Hardware', products: 1, description: 'Devices and scanners' },
  { id: 'CAT-3', name: 'Travel Ops', products: 1, description: 'Travel fulfilment supplies' },
];

export const demoPurchases = [
  { id: 'PO-551', supplier: 'Alpha Supplies Demo', amount: 186000, status: 'ordered', orderDate: '2026-07-12', expectedDate: '2026-07-24' },
  { id: 'PO-548', supplier: 'Delta Plastics Demo', amount: 64000, status: 'received', orderDate: '2026-07-02', expectedDate: '2026-07-10' },
  { id: 'PO-540', supplier: 'Nova Devices Demo', amount: 312000, status: 'draft', orderDate: '2026-07-19', expectedDate: '2026-08-02' },
];

export const demoSuppliers = [
  { id: 'SUP-1', name: 'Alpha Supplies Demo', contact: 'Suresh', email: 'suresh@alpha.demo', city: 'Chennai', rating: 4.6, openPos: 1 },
  { id: 'SUP-2', name: 'Delta Plastics Demo', contact: 'Nisha', email: 'nisha@delta.demo', city: 'Coimbatore', rating: 4.2, openPos: 0 },
  { id: 'SUP-3', name: 'Nova Devices Demo', contact: 'Aravind', email: 'aravind@nova.demo', city: 'Bengaluru', rating: 4.8, openPos: 1 },
];

export const demoIncome = [
  { id: 'INC-1', date: '2026-07-18', category: 'Sales', description: 'SO-7781 advance', amount: 200000, method: 'NEFT' },
  { id: 'INC-2', date: '2026-07-21', category: 'Travel', description: 'BK-4401 payment', amount: 171996, method: 'UPI' },
  { id: 'INC-3', date: '2026-07-16', category: 'Sales', description: 'SO-7760 payment', amount: 164000, method: 'UPI' },
  { id: 'INC-4', date: '2026-07-10', category: 'Service', description: 'Implementation fee', amount: 75000, method: 'NEFT' },
];

export const demoExpense = [
  { id: 'EXP-1', date: '2026-07-19', category: 'Payroll', description: 'Partial payroll run', amount: 180000, method: 'NEFT' },
  { id: 'EXP-2', date: '2026-07-14', category: 'Purchase', description: 'PO-551 deposit', amount: 60000, method: 'NEFT' },
  { id: 'EXP-3', date: '2026-07-20', category: 'Travel supplier', description: 'Hotel allotment deposit', amount: 78000, method: 'NEFT' },
  { id: 'EXP-4', date: '2026-07-05', category: 'Marketing', description: 'Lead ads campaign', amount: 35000, method: 'Card' },
];

export const demoInvoices = [
  { id: 'INV-552', customer: 'BluePeak Traders Demo', amount: 88000, status: 'overdue', issueDate: '2026-06-28', dueDate: '2026-07-12' },
  { id: 'INV-560', customer: 'Southern Retail Demo', amount: 256000, status: 'sent', issueDate: '2026-07-18', dueDate: '2026-08-01' },
  { id: 'INV-561', customer: 'Harbor Family Demo', amount: 171996, status: 'paid', issueDate: '2026-07-21', dueDate: '2026-07-28' },
  { id: 'INV-562', customer: 'Cascade Foods Demo', amount: 417978, status: 'sent', issueDate: '2026-07-20', dueDate: '2026-08-05' },
];

export const demoPayments = [
  { id: 'PMT-901', invoiceId: 'INV-561', customer: 'Harbor Family Demo', amount: 171996, method: 'UPI', date: '2026-07-21', status: 'completed' },
  { id: 'PMT-898', invoiceId: 'INV-548', customer: 'Cascade Foods Demo', amount: 121000, method: 'NEFT', date: '2026-07-08', status: 'completed' },
  { id: 'PMT-890', invoiceId: 'INV-552', customer: 'BluePeak Traders Demo', amount: 40000, method: 'UPI', date: '2026-07-19', status: 'pending' },
];

export const demoReceipts = [
  { id: 'RCT-11', date: '2026-07-21', customer: 'Harbor Family Demo', amount: 171996, mode: 'UPI', note: 'Travel booking BK-4401' },
  { id: 'RCT-10', date: '2026-07-16', customer: 'Nimbus Wellness Demo', amount: 164000, mode: 'UPI', note: 'SO-7760' },
  { id: 'RCT-09', date: '2026-07-08', customer: 'Cascade Foods Demo', amount: 121000, mode: 'NEFT', note: 'SO-7701' },
];

export const demoOutstanding = [
  { id: 'OUT-1', party: 'BluePeak Traders Demo', type: 'customer', amount: 48000, dueDate: '2026-07-12', status: 'overdue' },
  { id: 'OUT-2', party: 'Cascade Foods Demo', type: 'customer', amount: 417978, dueDate: '2026-08-05', status: 'pending' },
  { id: 'OUT-3', party: 'Coastal Holidays Demo', type: 'agent', amount: 64000, dueDate: '2026-07-30', status: 'pending' },
  { id: 'OUT-4', party: 'Backwater Residency', type: 'supplier', amount: 78000, dueDate: '2026-07-25', status: 'pending' },
];

export const demoPnL = [
  { label: 'Product sales', amount: 885000, type: 'income' },
  { label: 'Travel bookings', amount: 829971, type: 'income' },
  { label: 'Services', amount: 75000, type: 'income' },
  { label: 'COGS', amount: 410000, type: 'expense' },
  { label: 'Travel suppliers', amount: 320000, type: 'expense' },
  { label: 'Payroll', amount: 380000, type: 'expense' },
  { label: 'Marketing', amount: 35000, type: 'expense' },
];

export const demoTravelPayments = [
  { id: 'TP-1', bookingId: 'BK-4401', customer: 'Harbor Family Demo', amount: 171996, status: 'paid', date: '2026-07-21' },
  { id: 'TP-2', bookingId: 'BK-4402', customer: 'BluePeak Traders Demo', amount: 100000, status: 'partial', date: '2026-07-18' },
  { id: 'TP-3', bookingId: 'BK-4403', customer: 'Cascade Foods Demo', amount: 0, status: 'pending', date: '—' },
];

export const demoSupplierPayments = [
  { id: 'SP-1', supplier: 'Backwater Residency', amount: 78000, status: 'pending', dueDate: '2026-07-25' },
  { id: 'SP-2', supplier: 'Desert Activities LLC', amount: 56000, status: 'scheduled', dueDate: '2026-08-10' },
  { id: 'SP-3', supplier: 'Kerala Cab Co Demo', amount: 24000, status: 'paid', dueDate: '2026-07-15' },
];

export const demoAgentCommissions = [
  { id: 'AC-1', agent: 'Coastal Holidays Demo', bookingId: 'BK-4401', amount: 13760, status: 'pending', period: 'Jul 2026' },
  { id: 'AC-2', agent: 'Skyline Tours Demo', bookingId: 'BK-4402', amount: 16800, status: 'pending', period: 'Jul 2026' },
  { id: 'AC-3', agent: 'Temple Trails Demo', bookingId: 'BK-4390', amount: 4680, status: 'settled', period: 'Jun 2026' },
];

export const demoUsers = [
  { id: 'USR-ADMIN', name: 'Priya Menon', email: 'admin@uandv.com', role: 'Admin', status: 'active', lastLogin: '2026-07-22 09:10' },
  { id: 'USR-SALES', name: 'Karthik Rao', email: 'sales@uandv.com', role: 'Sales', status: 'active', lastLogin: '2026-07-22 08:45' },
  { id: 'USR-HR', name: 'Anitha Selvan', email: 'hr@uandv.com', role: 'HR', status: 'active', lastLogin: '2026-07-21 18:02' },
  { id: 'USR-TRAVEL', name: 'Nisha Varma', email: 'travel@uandv.com', role: 'Travel', status: 'active', lastLogin: '2026-07-22 08:10' },
];

export const demoRoles = [
  { id: 'ROLE-1', name: 'Admin', users: 1, description: 'Full suite access' },
  { id: 'ROLE-2', name: 'Sales', users: 1, description: 'CRM and sales reports' },
  { id: 'ROLE-3', name: 'HR', users: 1, description: 'People operations' },
  { id: 'ROLE-4', name: 'Travel', users: 1, description: 'Travel operations and settlements' },
];

export const demoPermissions = [
  { id: 'PERM-1', module: 'CRM', action: 'read/write', admin: true, sales: true, hr: false, travel: false },
  { id: 'PERM-2', module: 'Travel', action: 'read/write', admin: true, sales: false, hr: false, travel: true },
  { id: 'PERM-3', module: 'HR', action: 'read/write', admin: true, sales: false, hr: true, travel: false },
  { id: 'PERM-4', module: 'Inventory', action: 'read/write', admin: true, sales: false, hr: false, travel: false },
  { id: 'PERM-5', module: 'Accounting', action: 'read/write', admin: true, sales: false, hr: false, travel: true },
  { id: 'PERM-6', module: 'Admin', action: 'manage', admin: true, sales: false, hr: false, travel: false },
];

export const demoBranches = [
  { id: 'BR-1', name: 'Chennai HQ', city: 'Chennai', manager: 'Priya Menon', status: 'active' },
  { id: 'BR-2', name: 'Coimbatore Sales', city: 'Coimbatore', manager: 'Karthik Rao', status: 'active' },
  { id: 'BR-3', name: 'Kochi Travel Desk', city: 'Kochi', manager: 'Nisha Varma', status: 'active' },
];

export const demoTax = [
  { id: 'TAX-1', name: 'GST 18%', rate: 18, appliesTo: 'Products & services', status: 'active' },
  { id: 'TAX-2', name: 'GST 5%', rate: 5, appliesTo: 'Selected travel packages', status: 'active' },
  { id: 'TAX-3', name: 'TDS 1%', rate: 1, appliesTo: 'Supplier settlements', status: 'active' },
];

export const demoCurrency = [
  { id: 'CUR-1', code: 'INR', name: 'Indian Rupee', rate: 1, base: true },
  { id: 'CUR-2', code: 'USD', name: 'US Dollar', rate: 83.2, base: false },
  { id: 'CUR-3', code: 'AED', name: 'UAE Dirham', rate: 22.7, base: false },
];

export const demoAudit = [
  { id: 'AUD-1', actor: 'Priya Menon', action: 'Updated tax settings', at: '2026-07-21 16:40' },
  { id: 'AUD-2', actor: 'Nisha Varma', action: 'Confirmed booking BK-4401', at: '2026-07-21 11:05' },
  { id: 'AUD-3', actor: 'Karthik Rao', action: 'Sent quotation QT-441', at: '2026-07-20 09:42' },
  { id: 'AUD-4', actor: 'Anitha Selvan', action: 'Approved leave LV-31', at: '2026-07-20 08:15' },
];

export const demoSalesChart = [
  { label: 'Feb', value: 420 },
  { label: 'Mar', value: 510 },
  { label: 'Apr', value: 480 },
  { label: 'May', value: 620 },
  { label: 'Jun', value: 710 },
  { label: 'Jul', value: 780 },
];

export const demoTravelRevenueChart = [
  { label: 'Feb', value: 210 },
  { label: 'Mar', value: 260 },
  { label: 'Apr', value: 240 },
  { label: 'May', value: 310 },
  { label: 'Jun', value: 360 },
  { label: 'Jul', value: 420 },
];

export const demoPipelineChart = [
  { label: 'Qualification', value: 320 },
  { label: 'Proposal', value: 450 },
  { label: 'Negotiation', value: 780 },
  { label: 'Won', value: 210 },
];

export const demoRecentActivities = [
  { id: 'ACT-1', text: 'BK-4401 confirmed for Harbor Family Demo', time: '2h ago', type: 'travel' },
  { id: 'ACT-2', text: 'QT-441 sent to Nimbus Wellness Demo', time: '5h ago', type: 'crm' },
  { id: 'ACT-3', text: 'Leave LV-31 approved for Divya R', time: '1d ago', type: 'hr' },
  { id: 'ACT-4', text: 'Low stock alert on TLR-80', time: '1d ago', type: 'inventory' },
  { id: 'ACT-5', text: 'INV-552 marked overdue', time: '2d ago', type: 'accounting' },
];

export const demoDashboardStats = {
  admin: [
    { id: 'leads', label: 'Total leads', value: '6', hint: 'Open + qualified', trend: 'Demo CRM queue' },
    { id: 'customers', label: 'Active customers', value: '5', hint: 'Active accounts', trend: 'Mock roster' },
    { id: 'pipeline', label: 'Sales pipeline', value: '₹15.5L', hint: 'Open deal value', trend: '3 open deals' },
    { id: 'quotes', label: 'Pending quotations', value: '2', hint: 'Awaiting reply', trend: 'QT-441 priority' },
    { id: 'revenue', label: 'Monthly revenue', value: '₹7.8L', hint: 'Booked sales (demo)', trend: '+9.8% vs Jun' },
    { id: 'attendance', label: 'Employee attendance', value: '83%', hint: 'Present today', trend: '1 absent' },
    { id: 'stock', label: 'Inventory alerts', value: '1', hint: 'Below reorder', trend: 'TLR-80' },
    { id: 'bookings', label: 'Active travel bookings', value: '3', hint: 'Confirmed + pending', trend: 'Mock travel ops' },
  ],
  sales: [
    { id: 'leads', label: 'Total leads', value: '5', hint: 'Assigned pipeline', trend: '2 high score' },
    { id: 'customers', label: 'Active customers', value: '4', hint: 'Owned accounts', trend: 'Demo set' },
    { id: 'pipeline', label: 'Sales pipeline', value: '₹12.3L', hint: 'My open deals', trend: 'Negotiation heavy' },
    { id: 'quotes', label: 'Pending quotations', value: '2', hint: 'Need follow-up', trend: 'This week' },
    { id: 'revenue', label: 'Monthly revenue', value: '₹7.8L', hint: 'Team booked', trend: 'Demo chart' },
    { id: 'tasks', label: 'Open tasks', value: '2', hint: 'Due soon', trend: 'Action needed' },
  ],
  hr: [
    { id: 'head', label: 'Employees', value: '6', hint: 'Active roster', trend: '1 on leave' },
    { id: 'att', label: 'Employee attendance', value: '83%', hint: 'Today', trend: '1 late' },
    { id: 'leave', label: 'Pending leave', value: '2', hint: 'Needs approval', trend: 'Action queue' },
    { id: 'pay', label: 'Payroll status', value: 'Draft', trend: 'Lock 28 Jul', hint: 'July cycle' },
  ],
  travel: [
    { id: 'enq', label: 'Pending travel enquiries', value: '2', hint: 'Need response', trend: 'ENQ-901/904' },
    { id: 'book', label: 'Confirmed bookings', value: '2', hint: 'Ready to travel', trend: 'BK-4401/4403' },
    { id: 'pending', label: 'Pending bookings', value: '1', hint: 'Payment follow-up', trend: 'BK-4402' },
    { id: 'depart', label: 'Upcoming departures', value: '3', hint: 'Next 45 days', trend: 'Aug–Sep' },
    { id: 'rev', label: 'Revenue overview', value: '₹8.3L', hint: 'Travel MTD demo', trend: 'Mock chart' },
    { id: 'out', label: 'Outstanding payments', value: '₹5.6L', hint: 'Customer + agent', trend: 'Follow-up list' },
  ],
};

export const demoSettings = {
  company: 'U&V Enterprise Suite Demo',
  fiscalYear: 'Apr 2026 – Mar 2027',
  currency: 'INR',
  timezone: 'Asia/Kolkata',
  notifications: {
    dealAlerts: true,
    leaveAlerts: true,
    lowStock: true,
    travelReminders: true,
    paymentReminders: true,
  },
};
