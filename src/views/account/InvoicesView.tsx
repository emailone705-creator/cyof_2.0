import React, { useState } from 'react';
import { ViewRoute } from '../../types';
import { usePatron, OrderItem } from '../../context/PatronContext';
import { AccountNavHeader } from '../../components/AccountNavHeader';

interface InvoicesViewProps {
  onNavigate: (route: ViewRoute) => void;
  onOpenSalonModal: () => void;
}

export const InvoicesView: React.FC<InvoicesViewProps> = ({
  onNavigate,
  onOpenSalonModal,
}) => {
  const { orders, profile } = usePatron();
  const [selectedInvoice, setSelectedInvoice] = useState<OrderItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full flex flex-col bg-[#fcf9f4] min-h-screen text-[#1c1c19] py-8 sm:py-12 px-4 md:px-8 lg:px-12 max-w-[1500px] mx-auto">
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#111111] text-white text-xs font-['Manrope'] px-5 py-3.5 shadow-2xl border-l-4 border-[#B94700] animate-in slide-in-from-top-2 flex items-center gap-3">
          <span className="material-symbols-outlined text-[18px] text-[#B94700]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <AccountNavHeader
        currentRoute="account-invoices"
        onNavigate={onNavigate}
        title="Tax Invoices & GST Receipts"
        subtitle="Itemized Sartorial Ledger • Ministry of Finance Compliant"
        onOpenSalonModal={onOpenSalonModal}
      />

      <div className="space-y-8 font-['Manrope']">
        {/* Tax Notice Card */}
        <div className="bg-white border border-[#E9DFD2] p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-[#B94700] font-bold block">
              Official Tax Identification
            </span>
            <h3 className="font-['EB_Garamond'] text-2xl text-[#111111]">
              CYOF Haute Couture India Pvt Ltd
            </h3>
            <p className="text-xs text-[#57534E]">
              GSTIN: <strong>27AABCC8924M1Z2</strong> • PAN: <strong>AABCC8924M</strong> • Registered Office: The Oberoi, Nariman Point, Mumbai 400021
            </p>
          </div>
          <div className="text-left md:text-right shrink-0">
            <span className="text-[11px] uppercase tracking-wider text-[#57534E] block">All-India Tax Standard</span>
            <span className="text-sm font-bold text-[#111111]">18% GST (CGST 9% + SGST 9%)</span>
          </div>
        </div>

        {/* Invoices List */}
        <div className="bg-white border border-[#E9DFD2] divide-y divide-[#E9DFD2] shadow-xs">
          <div className="p-4 bg-[#fcf9f4] text-xs uppercase tracking-wider text-[#57534E] font-semibold flex justify-between items-center">
            <span>Invoices Ledger ({orders.length} Registered Transactions)</span>
            <span>Currency: INR (₹)</span>
          </div>

          {orders.map((order, idx) => {
            const invoiceNo = `INV-CYOF-2026-08${idx + 1}4`;
            return (
              <div
                key={order.id}
                className="p-6 hover:bg-[#faf7f2] transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="material-symbols-outlined text-[24px] text-[#B94700]">receipt</span>
                    <h4 className="font-['EB_Garamond'] text-xl font-bold text-[#111111]">
                      {invoiceNo}
                    </h4>
                    <span className="text-[9px] uppercase tracking-widest px-2.5 py-0.5 bg-[#111111] text-white font-bold">
                      Original Tax Invoice
                    </span>
                  </div>

                  <p className="text-xs text-[#57534E]">
                    Order Token: <strong className="text-[#111111]">{order.token}</strong> • Date of Supply: <strong className="text-[#111111]">{order.date}</strong>
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#57534E]">
                    <span>Taxable Base: <strong>₹{order.subtotal.toLocaleString('en-IN')}</strong></span>
                    <span>•</span>
                    <span>CGST (9%): <strong>₹{Math.round(order.gstAmount / 2).toLocaleString('en-IN')}</strong></span>
                    <span>•</span>
                    <span>SGST (9%): <strong>₹{Math.round(order.gstAmount / 2).toLocaleString('en-IN')}</strong></span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                  <div className="text-left lg:text-right mr-4">
                    <span className="text-xs text-[#57534E] block">Gross Invoice Value</span>
                    <span className="text-xl font-bold text-[#111111]">
                      ₹{order.grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedInvoice(order)}
                    className="px-4 py-2.5 bg-[#111111] hover:bg-[#B94700] text-white text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                  >
                    View Item Breakdown
                  </button>

                  <button
                    onClick={() => {
                      showToast(`Digital Tax Invoice ${invoiceNo} generated as PDF & downloaded`);
                    }}
                    className="px-4 py-2.5 border border-[#E9DFD2] hover:bg-white text-[#111111] text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 cursor-pointer"
                    title="Download PDF"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>Download PDF</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedInvoice(order);
                      setTimeout(() => window.print(), 300);
                    }}
                    className="px-3.5 py-2.5 border border-[#E9DFD2] hover:bg-white text-[#57534E] hover:text-[#111111] text-xs uppercase tracking-wider font-semibold flex items-center gap-1 cursor-pointer"
                    title="Print Invoice"
                  >
                    <span className="material-symbols-outlined text-[16px]">print</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Invoice Breakdown Modal */}
      {selectedInvoice && (
        <div
          className="fixed inset-0 z-50 bg-[#111111]/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedInvoice(null)}
        >
          <div
            className="w-full max-w-2xl bg-white border border-[#E9DFD2] p-6 sm:p-8 max-h-[90vh] overflow-y-auto font-['Manrope'] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#E9DFD2]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B94700] font-bold block">
                  CYOF TAX INVOICE • #CraftedYourOwnFashion
                </span>
                <h3 className="font-['EB_Garamond'] text-2xl text-[#111111]">
                  Official Tax Invoice #{selectedInvoice.token}
                </h3>
                <p className="text-xs text-[#57534E] mt-0.5">
                  GSTIN: 27AABCC8924M1Z2 • Date of Supply: {selectedInvoice.date}
                </p>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="w-8 h-8 flex items-center justify-center text-[#57534E] hover:text-[#111111]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Address Columns */}
            <div className="grid grid-cols-2 gap-4 py-4 border-b border-[#E9DFD2] text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#57534E] block font-semibold">
                  Supplier / Atelier Details:
                </span>
                <p className="font-bold text-[#111111]">CYOF Haute Couture India Pvt Ltd</p>
                <p className="text-[#57534E]">The Oberoi, Nariman Point, Mumbai, MH 400021</p>
                <p className="text-[#57534E]">State Code: 27 (Maharashtra)</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#57534E] block font-semibold">
                  Recipient Patron:
                </span>
                <p className="font-bold text-[#111111]">{profile.fullName}</p>
                <p className="text-[#57534E]">{selectedInvoice.deliveryAddress}</p>
                <p className="text-[#57534E]">Patron ID: {profile.patronId}</p>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="py-4 space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-[#57534E] block font-semibold">
                Itemized Sartorial Ledger
              </span>
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-[#E9DFD2] text-[10px] uppercase text-[#57534E]">
                    <th className="py-2">Description</th>
                    <th className="py-2 text-center">HSN</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Taxable Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0ede9]">
                  {selectedInvoice.items.map((it, i) => (
                    <tr key={i}>
                      <td className="py-3">
                        <span className="font-semibold text-[#111111]">{it.name}</span>
                        <span className="block text-[10px] text-[#57534E]">
                          Category: {it.category} • Shade: {it.shade} • Size: {it.size}
                        </span>
                      </td>
                      <td className="py-3 text-center text-[#57534E]">6204</td>
                      <td className="py-3 text-center text-[#111111]">{it.quantity}</td>
                      <td className="py-3 text-right font-semibold text-[#111111]">
                        ₹{it.price.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculations */}
            <div className="py-4 border-t border-[#E9DFD2] space-y-2 text-xs">
              <div className="flex justify-between text-[#57534E]">
                <span>Taxable Base Value:</span>
                <span>₹{selectedInvoice.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#57534E]">
                <span>Central GST (CGST @ 9%):</span>
                <span>₹{Math.round(selectedInvoice.gstAmount / 2).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#57534E]">
                <span>State GST (SGST @ 9%):</span>
                <span>₹{Math.round(selectedInvoice.gstAmount / 2).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#111111] font-bold text-sm pt-2 border-t border-[#E9DFD2]">
                <span>Total Amount Paid (INR):</span>
                <span>₹{selectedInvoice.grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 mt-2 border-t border-[#E9DFD2] flex gap-3">
              <button
                onClick={handlePrint}
                className="flex-1 py-3 bg-[#111111] hover:bg-[#B94700] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>Print Official Invoice</span>
              </button>
              <button
                onClick={() => {
                  showToast('Official PDF receipt archived & downloaded');
                  setSelectedInvoice(null);
                }}
                className="px-6 py-3 border border-[#E9DFD2] hover:bg-[#f6f3ee] text-[#111111] text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
