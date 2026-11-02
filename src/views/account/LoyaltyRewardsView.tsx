import React from 'react';
import { ViewRoute } from '../../types';
import { usePatron } from '../../context/PatronContext';
import { AccountNavHeader } from '../../components/AccountNavHeader';

interface LoyaltyRewardsViewProps {
  onNavigate: (route: ViewRoute) => void;
  onOpenSalonModal: () => void;
}

export const LoyaltyRewardsView: React.FC<LoyaltyRewardsViewProps> = ({
  onNavigate,
  onOpenSalonModal,
}) => {
  const { profile } = usePatron();

  const tiers = [
    {
      name: 'Membre',
      spendThreshold: 'Entry Level',
      perks: ['Complimentary gift wrapping', 'Gazette digital subscriptions'],
      isCurrent: false,
    },
    {
      name: 'Connoisseur',
      spendThreshold: '₹2,50,000 Annual Spend',
      perks: ['Standard express freight across India', 'Monograph 24-hr priority access'],
      isCurrent: false,
    },
    {
      name: 'Haute Patron',
      spendThreshold: '₹10,00,000 Annual Spend',
      perks: [
        'Unlimited white-glove chauffeur deliveries',
        'Dedicated Master Couturier at residence',
        '48-hour monograph early reservation',
        'Annual Taj Falaknuma Palace salon banquet invitation',
      ],
      isCurrent: true,
    },
    {
      name: 'Sovereign',
      spendThreshold: '₹25,00,000 Annual Spend',
      perks: [
        'Private aircraft vault delivery in 48 hours',
        'Archival bespoke commissions with creative director',
        'Bespoke woven gold thread label customization',
      ],
      isCurrent: false,
    },
  ];

  const pointLedger = [
    {
      token: 'CYOF-IN-982410-MUM',
      date: '28 Oct 2026',
      desc: 'Commission: Sforza Trench & Palazzo Tote',
      points: '+64,500 Pts',
      value: '₹64,500 Credit',
    },
    {
      token: 'CYOF-IN-773194-DEL',
      date: '12 Aug 2026',
      desc: 'Commission: Trapeze Hand-Painted Evening Bag',
      points: '+19,800 Pts',
      value: '₹19,800 Credit',
    },
    {
      token: 'CYOF-IN-662890-BLR',
      date: '04 May 2026',
      desc: 'Commission: Cosimo Horsehide Slipper',
      points: '+13,500 Pts',
      value: '₹13,500 Credit',
    },
    {
      token: 'CYOF-SLN-MUM-441',
      date: '15 Jun 2026',
      desc: 'Private Salon Rendezvous Milestone (The Oberoi, Mumbai)',
      points: '+15,000 Pts',
      value: '₹15,000 Credit',
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[#fcf9f4] min-h-screen text-[#1c1c19] py-8 sm:py-12 px-4 md:px-8 lg:px-12 max-w-[1500px] mx-auto">
      <AccountNavHeader
        currentRoute="account-loyalty"
        onNavigate={onNavigate}
        title="CYOF Atelier Privé Rewards"
        subtitle="Patronage Hierarchy & Redeemable Privé Credit • India"
        onOpenSalonModal={onOpenSalonModal}
      />

      <div className="space-y-8 font-['Manrope']">
        {/* Tier & Credit Overview Card */}
        <div className="bg-[#111111] text-white p-6 sm:p-10 border border-[#E9DFD2] shadow-sm relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/20">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B94700] font-bold block">
                Active Patron Status
              </span>
              <h2 className="font-['EB_Garamond'] text-3xl sm:text-5xl text-white font-normal mt-1">
                Haute Patron (Tier III)
              </h2>
              <p className="text-xs text-[#E9DFD2]/70 mt-1">
                Patron ID: <strong className="text-white">{profile.patronId}</strong> • Lifetime Spend: <strong className="text-white">₹12,45,000</strong>
              </p>
            </div>

            <div className="text-left lg:text-right shrink-0 bg-white/5 p-4 border border-white/10">
              <span className="text-[10px] uppercase tracking-widest text-[#E9DFD2] block">
                Available Atelier Privé Store Credit
              </span>
              <span className="text-3xl sm:text-4xl font-bold text-[#D35400] block mt-0.5">
                ₹1,42,500
              </span>
              <span className="text-xs text-[#E9DFD2]/80">
                (1,42,500 Redeemable Points • 1 Pt = ₹1.00)
              </span>
            </div>
          </div>

          {/* Progress Bar to Next Tier */}
          <div className="pt-6">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-[#E9DFD2]">Next Tier: <strong>Sovereign Patron</strong></span>
              <span className="text-[#D35400] font-bold">₹57,500 more acquisitions to achieve Sovereign</span>
            </div>
            <div className="w-full h-2.5 bg-white/20">
              <div className="h-full bg-[#B94700]" style={{ width: '82%' }} />
            </div>
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#E9DFD2]/60 mt-2">
              <span>Membre (₹0)</span>
              <span>Connoisseur (₹2.5L)</span>
              <span className="text-white font-bold">Haute Patron (You)</span>
              <span>Sovereign (₹25L)</span>
            </div>
          </div>
        </div>

        {/* Tier Hierarchy Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E9DFD2]">
            <h3 className="font-['EB_Garamond'] text-2xl text-[#111111]">
              Atelier Privé Tier Privileges
            </h3>
            <span className="text-xs text-[#57534E]">Permanent Patronage Benefits</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`p-6 border flex flex-col justify-between ${
                  tier.isCurrent
                    ? 'border-[#111111] bg-white ring-2 ring-[#111111]'
                    : 'border-[#E9DFD2] bg-white opacity-85'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold">
                      Tier {idx + 1}
                    </span>
                    {tier.isCurrent && (
                      <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 bg-[#111111] text-white font-bold">
                        Your Tier
                      </span>
                    )}
                  </div>
                  <h4 className="font-['EB_Garamond'] text-2xl text-[#111111] font-semibold">
                    {tier.name}
                  </h4>
                  <p className="text-xs font-semibold text-[#57534E] mt-1 mb-4">
                    {tier.spendThreshold}
                  </p>

                  <ul className="space-y-2 text-xs text-[#57534E] border-t border-[#f0ede9] pt-3">
                    {tier.perks.map((p, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-[#B94700] font-bold">✓</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Points Activity Ledger */}
        <div className="bg-white border border-[#E9DFD2] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E9DFD2]">
            <h3 className="font-['EB_Garamond'] text-2xl text-[#111111]">
              Recent Points Activity Ledger
            </h3>
            <span className="text-xs text-[#57534E]">100% Guaranteed INR Currency Value</span>
          </div>

          <div className="divide-y divide-[#E9DFD2]">
            {pointLedger.map((row, idx) => (
              <div
                key={idx}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#111111]">{row.desc}</span>
                    <span className="text-[10px] text-[#57534E]">({row.token})</span>
                  </div>
                  <p className="text-[11px] text-[#57534E]">Recorded on {row.date}</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="font-bold text-sm text-emerald-700 block">
                    {row.points}
                  </span>
                  <span className="text-[11px] text-[#57534E]">{row.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
