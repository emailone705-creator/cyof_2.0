import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface PatronProfile {
  salutation: string;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  patronId: string;
  tier: string;
  whatsappNotifications: boolean;
  monographPreviews: boolean;
  salonAlerts: boolean;
}

export interface AddressItem {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pinCode: string;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
}

export interface OrderItem {
  id: string;
  token: string;
  date: string;
  status: 'In Transit' | 'Delivered' | 'Atelier Tailoring';
  statusDescription: string;
  courierName: string;
  trackingNumber: string;
  estimatedHandover: string;
  deliveryAddress: string;
  items: {
    productId: string;
    name: string;
    category: string;
    shade: string;
    size: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  subtotal: number;
  gstAmount: number;
  grandTotal: number;
  trackingSteps: {
    title: string;
    location: string;
    timestamp: string;
    completed: boolean;
    current?: boolean;
  }[];
}

export interface ReturnRequest {
  id: string;
  orderToken: string;
  item: string;
  reason: string;
  status: 'Scheduled' | 'Vault Inspection' | 'Resolved';
  pickupDate: string;
  notes: string;
}

interface PatronContextType {
  isAuthenticated: boolean;
  signOut: () => void;
  signIn: (identifier: string) => void;
  profile: PatronProfile;
  updateProfile: (updated: Partial<PatronProfile>) => void;
  addresses: AddressItem[];
  addAddress: (addr: Omit<AddressItem, 'id'>) => void;
  updateAddress: (id: string, addr: Partial<AddressItem>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  orders: OrderItem[];
  returns: ReturnRequest[];
  addReturn: (ret: Omit<ReturnRequest, 'id'>) => void;
}

const INITIAL_PROFILE: PatronProfile = {
  salutation: 'Mr.',
  fullName: 'Aarav Singhania',
  email: 'aarav.singhania@private.in',
  phone: '+91 98200 12834',
  gender: 'Male',
  dob: '1988-10-24',
  patronId: '#CYOF-8829-MUM',
  tier: 'Haute Patron',
  whatsappNotifications: true,
  monographPreviews: true,
  salonAlerts: true,
};

const INITIAL_ADDRESSES: AddressItem[] = [
  {
    id: 'addr-1',
    label: 'Flagship Residence (Penthouse)',
    fullName: 'Aarav Singhania',
    phone: '+91 98200 12834',
    addressLine1: 'Penthouse 42, The Imperial Towers',
    addressLine2: 'Altamount Road, Cumballa Hill',
    city: 'Mumbai',
    state: 'Maharashtra',
    pinCode: '400026',
    isDefaultShipping: true,
    isDefaultBilling: true,
  },
  {
    id: 'addr-2',
    label: 'Architectural Atelier & Studio',
    fullName: 'Aarav Singhania (c/o Studio Desk)',
    phone: '+91 98200 12834',
    addressLine1: 'Heritage Villa 7, Lodha Park',
    addressLine2: 'Worli Sea Face',
    city: 'Mumbai',
    state: 'Maharashtra',
    pinCode: '400018',
    isDefaultShipping: false,
    isDefaultBilling: false,
  },
];

const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'ord-1',
    token: 'CYOF-IN-982410-MUM',
    date: '28 October 2026',
    status: 'In Transit',
    statusDescription: 'Private Chauffeur Hand-Delivery Dispatched from Mumbai Central Vault',
    courierName: 'CYOF Chauffeur White-Glove Fleet',
    trackingNumber: 'CYOF-EXP-99201-MUM',
    estimatedHandover: 'Today by 18:30 IST',
    deliveryAddress: 'Penthouse 42, The Imperial Towers, Altamount Road, Mumbai, MH 400026',
    items: [
      {
        productId: 'sforza-trench',
        name: 'The Sforza Structured Double-Face Wool Trench',
        category: 'Haute Tailoring',
        shade: 'Umber Melange',
        size: 'IT 48',
        price: 360000,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTp73Q34yV361sVn1L1E2nN3zJ0z5X7dJjK1lW3lWqKkKk_example',
      },
      {
        productId: 'palazzo-tote',
        name: 'The Palazzo Reversible Suede & Calfskin Tote',
        category: 'Leather Goods',
        shade: 'Cognac / Nero',
        size: 'Standard Archetype',
        price: 285000,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCd3rXvUeTfATgd8vxEqCtgM2Ul4MV3_fg1Fs8_Yvvl4OyKEvHoMv99nyBU1SW5l1pawfIb0O_s-EGzmrjL1ucfuHV4mP1DyIeXdjNTn3kr1Q0s_l2Y8R-wEK0WU2oSdO8siGa7vkahR2k3bm9NlFKdatsJMHIgr1TCQwib9QxJ7Rn3lDDV9sTYAi3N9MozGRzC-uzNgxIayRRnHPLa5GGKQDVkSNinRIQDR55x5Plz',
      },
    ],
    subtotal: 546610,
    gstAmount: 98390,
    grandTotal: 645000,
    trackingSteps: [
      {
        title: 'Commission Inscribed & Verified',
        location: 'CYOF Head Concierge, Mumbai',
        timestamp: '25 Oct 2026, 14:15 IST',
        completed: true,
      },
      {
        title: 'Atelier Provenance Certification & Hand-Inspection',
        location: 'Kala Ghoda Atelier Vault',
        timestamp: '27 Oct 2026, 11:30 IST',
        completed: true,
      },
      {
        title: 'Dispatched in Temperature-Controlled Case',
        location: 'Mumbai Central Vault',
        timestamp: '28 Oct 2026, 09:00 IST',
        completed: true,
      },
      {
        title: 'Out for White-Glove Hand-Delivery',
        location: 'En Route to Altamount Road',
        timestamp: '28 Oct 2026, 15:45 IST',
        completed: false,
        current: true,
      },
    ],
  },
  {
    id: 'ord-2',
    token: 'CYOF-IN-773194-DEL',
    date: '12 August 2026',
    status: 'Delivered',
    statusDescription: 'Hand-Delivered & Signed by Patron at DLF Emporio Suite',
    courierName: 'CYOF Private Courier India',
    trackingNumber: 'CYOF-EXP-44182-DEL',
    estimatedHandover: 'Delivered 12 August 2026, 16:10 IST',
    deliveryAddress: 'DLF Emporio VIP Salon Lounge, Vasant Kunj, New Delhi, 110070',
    items: [
      {
        productId: 'trapeze-bag',
        name: 'The Trapeze Hand-Painted Calfskin Evening Bag',
        category: 'Leather Goods',
        shade: 'Chalk & Ochre',
        size: 'Standard Archetype',
        price: 198000,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZzowpCzPcx5mHZOyld4KBfoZyHQP0qLxErt4mjFtPn8FpjeSKS5hQGEFG--hMARs4S4Wr-R3XrXjkmQCuKgBeQ8F48Ux08Y1KuHAFizAcNztiaRcicq3zxGGjaCEkGW7Zy5F4zsW2pm1S4Im8XJ7pKD1he_1PqKfqivOfaPMks1cHJHbdUTdQlv9b-jyxw0Vf-htjJVXKjg8d_pluMFj5cv9hGyKPgU82uEX5_IO4',
      },
    ],
    subtotal: 167796,
    gstAmount: 30204,
    grandTotal: 198000,
    trackingSteps: [
      {
        title: 'Commission Inscribed',
        location: 'New Delhi Salon',
        timestamp: '10 Aug 2026, 10:00 IST',
        completed: true,
      },
      {
        title: 'Delivered & Accepted by Patron',
        location: 'Vasant Kunj, New Delhi',
        timestamp: '12 Aug 2026, 16:10 IST',
        completed: true,
      },
    ],
  },
  {
    id: 'ord-3',
    token: 'CYOF-IN-662890-BLR',
    date: '04 May 2026',
    status: 'Delivered',
    statusDescription: 'Delivered to UB City Residence',
    courierName: 'CYOF Dedicated Chauffeur Express',
    trackingNumber: 'CYOF-EXP-11094-BLR',
    estimatedHandover: 'Delivered 04 May 2026, 13:40 IST',
    deliveryAddress: 'UB City Residence, Vittal Mallya Road, Bengaluru, 560001',
    items: [
      {
        productId: 'cosimo-slipper',
        name: 'The Cosimo Pointed Horsehide Slipper',
        category: 'Footwear',
        shade: 'Espresso',
        size: 'EU 42',
        price: 135000,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAb6AWVYrsz7qelU5GwgGDowN_WI5nHmS6FWbktffNW_uFJU9MsHIkgeof50aRQU_tbCSg2cY3NSAdRenzZECWoPOY9jdQWF5IlvD35JMT_bxlzCnxJ-k7H3YlAFhV5tJBXZi9su7ivSmUfbTm4EN5KQKP7k21NgcA6HDSdtTUylVQKsxIsJlYT5Aw4f6xuRlvvpdsVgYGj131vRFYgBlIuuArefnvfT-sEtkQjYToM',
      },
    ],
    subtotal: 114406,
    gstAmount: 20594,
    grandTotal: 135000,
    trackingSteps: [
      {
        title: 'Handcrafted & Delivered',
        location: 'Bengaluru Residence',
        timestamp: '04 May 2026, 13:40 IST',
        completed: true,
      },
    ],
  },
];

const INITIAL_RETURNS: ReturnRequest[] = [
  {
    id: 'RET-CYOF-2026-092',
    orderToken: 'CYOF-IN-982410-MUM',
    item: 'The Sforza Structured Double-Face Wool Trench',
    reason: 'Bespoke Size Exchange (IT 48 to IT 50 sleeve taper adjustment)',
    status: 'Scheduled',
    pickupDate: 'Tomorrow, 29 Oct 2026 (11:00 - 14:00 IST)',
    notes: 'Private Chauffeur will collect the trench in its cedar archival garment bag.',
  },
];

const PatronContext = createContext<PatronContextType | undefined>(undefined);

export const PatronProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('cyof_auth');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [profile, setProfile] = useState<PatronProfile>(() => {
    const saved = localStorage.getItem('cyof_profile');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  const [addresses, setAddresses] = useState<AddressItem[]>(() => {
    const saved = localStorage.getItem('cyof_addresses');
    return saved ? JSON.parse(saved) : INITIAL_ADDRESSES;
  });

  const [orders] = useState<OrderItem[]>(INITIAL_ORDERS);

  const [returns, setReturns] = useState<ReturnRequest[]>(() => {
    const saved = localStorage.getItem('cyof_returns');
    return saved ? JSON.parse(saved) : INITIAL_RETURNS;
  });

  useEffect(() => {
    localStorage.setItem('cyof_auth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('cyof_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('cyof_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('cyof_returns', JSON.stringify(returns));
  }, [returns]);

  const signOut = () => {
    setIsAuthenticated(false);
  };

  const signIn = (identifier: string) => {
    setIsAuthenticated(true);
    if (identifier && !identifier.includes('singhania')) {
      setProfile((prev) => ({ ...prev, email: identifier }));
    }
  };

  const updateProfile = (updated: Partial<PatronProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const addAddress = (addr: Omit<AddressItem, 'id'>) => {
    const newAddress: AddressItem = {
      id: `addr-${Date.now()}`,
      ...addr,
    };
    if (newAddress.isDefaultShipping) {
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefaultShipping: false })));
    }
    setAddresses((prev) => [...prev, newAddress]);
  };

  const updateAddress = (id: string, addr: Partial<AddressItem>) => {
    setAddresses((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...addr } : a))
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefaultShipping: a.id === id }))
    );
  };

  const addReturn = (ret: Omit<ReturnRequest, 'id'>) => {
    const newReturn: ReturnRequest = {
      id: `RET-CYOF-${Date.now().toString().slice(-4)}`,
      ...ret,
    };
    setReturns((prev) => [newReturn, ...prev]);
  };

  return (
    <PatronContext.Provider
      value={{
        isAuthenticated,
        signOut,
        signIn,
        profile,
        updateProfile,
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        orders,
        returns,
        addReturn,
      }}
    >
      {children}
    </PatronContext.Provider>
  );
};

export const usePatron = () => {
  const context = useContext(PatronContext);
  if (!context) {
    throw new Error('usePatron must be used within a PatronProvider');
  }
  return context;
};
