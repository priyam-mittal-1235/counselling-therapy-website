"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Phone,
  Trash2,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Calendar,
  AlertCircle,
  Inbox,
  LogOut,
  CreditCard,
  IndianRupee,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";

// ─── Types ────────────────────────────────────────────────────────────────────
type Enquiry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  receivedAt: string;
  status: "new" | "contacted" | "archived";
};

type Payment = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  amount: number;
  status: "pending" | "confirmed" | "cancelled";
  generatedAt: string;
};

export default function EnquiriesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"enquiries" | "payments">("enquiries");

  // ── Enquiries state ────────────────────────────────────────────────────────
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loadingEnq, setLoadingEnq] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [errorEnq, setErrorEnq] = useState("");

  // ── Payments state ─────────────────────────────────────────────────────────
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loadingPay, setLoadingPay] = useState(true);
  const [paySearch, setPaySearch] = useState("");
  const [payFilter, setPayFilter] = useState("all");
  const [errorPay, setErrorPay] = useState("");

  const handleLogout = async () => {
    await fetch("/api/admin-login", { method: "DELETE" });
    router.push("/enquiries/login");
    router.refresh();
  };

  // ── Fetch enquiries ────────────────────────────────────────────────────────
  const fetchEnquiries = async () => {
    try {
      setLoadingEnq(true);
      const res = await fetch("/api/enquiries");
      if (!res.ok) throw new Error("Failed to load enquiries.");
      setEnquiries(await res.json());
      setErrorEnq("");
    } catch (err) {
      setErrorEnq(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setLoadingEnq(false);
    }
  };

  // ── Fetch payments ─────────────────────────────────────────────────────────
  const fetchPayments = async () => {
    try {
      setLoadingPay(true);
      const res = await fetch("/api/payments");
      if (!res.ok) throw new Error("Failed to load payments.");
      setPayments(await res.json());
      setErrorPay("");
    } catch (err) {
      setErrorPay(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setLoadingPay(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
    fetchPayments();
  }, []);

  // ── Enquiry actions ────────────────────────────────────────────────────────
  const updateStatus = async (id: string, newStatus: "new" | "contacted" | "archived") => {
    await fetch("/api/enquiries", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e)));
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    await fetch(`/api/enquiries?id=${id}`, { method: "DELETE" });
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
  };

  // ── Payment actions ────────────────────────────────────────────────────────
  const updatePaymentStatus = async (id: string, status: "pending" | "confirmed" | "cancelled") => {
    await fetch("/api/payments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setPayments((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  const deletePayment = async (id: string) => {
    if (!confirm("Delete this payment record?")) return;
    await fetch(`/api/payments?id=${id}`, { method: "DELETE" });
    setPayments((prev) => prev.filter((p) => p.id !== id));
  };

  // ── Filtered lists ─────────────────────────────────────────────────────────
  const filteredEnquiries = enquiries.filter((e) => {
    const q = search.toLowerCase();
    const matches = e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) ||
      e.phone.includes(q) || e.service.toLowerCase().includes(q);
    return matches && (statusFilter === "all" || e.status === statusFilter);
  });

  const filteredPayments = payments.filter((p) => {
    const q = paySearch.toLowerCase();
    const matches = p.name.toLowerCase().includes(q) || p.phone.includes(q) ||
      p.service.toLowerCase().includes(q);
    return matches && (payFilter === "all" || p.status === payFilter);
  });

  // ── Summary stats ──────────────────────────────────────────────────────────
  const totalRevenue = payments.filter((p) => p.status === "confirmed").reduce((s, p) => s + p.amount, 0);
  const pendingCount = payments.filter((p) => p.status === "pending").length;
  const confirmedCount = payments.filter((p) => p.status === "confirmed").length;

  // ── Status badge ───────────────────────────────────────────────────────────
  const payStatusBadge = (s: string) => {
    if (s === "confirmed") return "bg-green-50 text-green-700 border border-green-100";
    if (s === "cancelled") return "bg-red-50 text-red-700 border border-red-100";
    return "bg-amber-50 text-amber-700 border border-amber-100";
  };

  return (
    <>
      <PageHero
        eyebrow="Admin Dashboard"
        title="Form Submissions & Payments"
        description="Manage all client enquiries and track payment bookings from one place."
        image="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1800&q=85"
      />

      <section className="section-padding bg-cream-50 min-h-screen">
        <div className="site-container">

          {/* ── Tabs + Logout ──────────────────────────────────────────────── */}
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex rounded-xl border border-sage-100 bg-white p-1 shadow-sm">
              <button
                onClick={() => setActiveTab("enquiries")}
                className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                  activeTab === "enquiries"
                    ? "bg-sage-800 text-white shadow"
                    : "text-sage-700 hover:bg-sage-50"
                }`}
              >
                <Mail className="h-4 w-4" />
                Enquiries
                <span className={`ml-1 rounded-full px-2 py-0.5 text-xs font-bold ${activeTab === "enquiries" ? "bg-sage-700 text-white" : "bg-sage-100 text-sage-700"}`}>
                  {enquiries.filter((e) => e.status === "new").length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("payments")}
                className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                  activeTab === "payments"
                    ? "bg-sage-800 text-white shadow"
                    : "text-sage-700 hover:bg-sage-50"
                }`}
              >
                <CreditCard className="h-4 w-4" />
                Payments
                <span className={`ml-1 rounded-full px-2 py-0.5 text-xs font-bold ${activeTab === "payments" ? "bg-sage-700 text-white" : "bg-amber-100 text-amber-700"}`}>
                  {pendingCount}
                </span>
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-100 hover:bg-red-100 transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              TAB 1 — ENQUIRIES
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === "enquiries" && (
            <>
              {/* Search + Filter */}
              <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:max-w-md">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutralwarm-400">
                    <Search className="h-5 w-5" />
                  </span>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, email, service..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-sage-200 bg-white text-sage-950 focus:outline-none focus:border-softblue-500 shadow-sm transition"
                  />
                </div>
                <div className="flex w-full md:w-auto items-center gap-2 overflow-x-auto">
                  <span className="text-sm font-bold text-sage-900 flex items-center gap-1.5 whitespace-nowrap mr-1">
                    <Filter className="h-4 w-4" /> Filter:
                  </span>
                  {["all", "new", "contacted", "archived"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setStatusFilter(f)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap capitalize ${
                        statusFilter === f
                          ? "bg-sage-800 text-white shadow-soft"
                          : "bg-white text-sage-800 border border-sage-100 hover:bg-sage-50"
                      }`}
                    >
                      {f === "all" ? "All Enquiries" : f}
                    </button>
                  ))}
                </div>
              </div>

              {errorEnq && (
                <div className="mb-6 flex items-center gap-2 p-4 rounded-xl bg-red-50 text-red-800 border border-red-100">
                  <AlertCircle className="h-5 w-5" />
                  <p className="text-sm font-semibold">{errorEnq}</p>
                </div>
              )}

              {loadingEnq ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-700" />
                  <p className="mt-4 text-sm font-medium text-sage-800">Loading submissions...</p>
                </div>
              ) : filteredEnquiries.length === 0 ? (
                <div className="rounded-2xl border border-sage-100 bg-white p-12 text-center shadow-card max-w-xl mx-auto">
                  <Inbox className="mx-auto h-12 w-12 text-neutralwarm-400" />
                  <h3 className="mt-4 text-lg font-bold text-sage-950">No enquiries found</h3>
                  <p className="mt-2 text-sm text-neutralwarm-600">
                    {search || statusFilter !== "all" ? "Try clearing your filters." : "New submissions will appear here."}
                  </p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {filteredEnquiries.map((enquiry) => (
                    <div
                      key={enquiry.id}
                      className={`rounded-2xl border border-sage-100 bg-white p-6 shadow-card transition hover:shadow-soft flex flex-col gap-6 ${
                        enquiry.status === "new" ? "border-l-4 border-l-softblue-500" : ""
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-xl font-extrabold text-sage-950">{enquiry.name}</h3>
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                              enquiry.status === "new" ? "bg-softblue-50 text-softblue-700"
                              : enquiry.status === "contacted" ? "bg-green-50 text-green-700"
                              : "bg-neutral-100 text-neutral-600"
                            }`}>
                              {enquiry.status === "new" && <Clock className="h-3 w-3" />}
                              {enquiry.status === "contacted" && <CheckCircle className="h-3 w-3" />}
                              {enquiry.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-sage-600 mt-1">
                            Service: <span className="text-sage-950 font-normal">{enquiry.service}</span>
                          </p>
                          <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-neutralwarm-600">
                            <a href={`mailto:${enquiry.email}`} className="flex items-center gap-1.5 hover:text-sage-900">
                              <Mail className="h-3.5 w-3.5" /> {enquiry.email}
                            </a>
                            <a href={`tel:${enquiry.phone}`} className="flex items-center gap-1.5 hover:text-sage-900">
                              <Phone className="h-3.5 w-3.5" /> {enquiry.phone}
                            </a>
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              {new Date(enquiry.receivedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 self-end md:self-start">
                          <select
                            value={enquiry.status}
                            onChange={(e) => updateStatus(enquiry.id, e.target.value as "new" | "contacted" | "archived")}
                            className="rounded-lg border border-sage-200 bg-white px-3 py-1.5 text-xs font-bold text-sage-800 shadow-sm focus:outline-none"
                          >
                            <option value="new">Mark New</option>
                            <option value="contacted">Mark Contacted</option>
                            <option value="archived">Mark Archived</option>
                          </select>
                          <button onClick={() => deleteEnquiry(enquiry.id)} className="p-2 rounded-lg border border-red-100 text-red-600 hover:bg-red-50 transition">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="bg-sage-50/50 rounded-xl p-4 border border-sage-100 text-sm leading-relaxed text-sage-950 whitespace-pre-wrap">
                        {enquiry.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              TAB 2 — PAYMENTS
          ══════════════════════════════════════════════════════════════════ */}
          {activeTab === "payments" && (
            <>
              {/* Summary Cards */}
              <div className="mb-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-sage-100 bg-white p-5 shadow-card text-center">
                  <IndianRupee className="mx-auto h-7 w-7 text-green-600 mb-2" />
                  <p className="text-2xl font-extrabold text-sage-950">₹{totalRevenue.toLocaleString("en-IN")}</p>
                  <p className="text-xs font-semibold text-neutralwarm-500 mt-1">Confirmed Revenue</p>
                </div>
                <div className="rounded-2xl border border-sage-100 bg-white p-5 shadow-card text-center">
                  <Clock className="mx-auto h-7 w-7 text-amber-500 mb-2" />
                  <p className="text-2xl font-extrabold text-sage-950">{pendingCount}</p>
                  <p className="text-xs font-semibold text-neutralwarm-500 mt-1">Pending Payments</p>
                </div>
                <div className="rounded-2xl border border-sage-100 bg-white p-5 shadow-card text-center">
                  <Users className="mx-auto h-7 w-7 text-softblue-500 mb-2" />
                  <p className="text-2xl font-extrabold text-sage-950">{confirmedCount}</p>
                  <p className="text-xs font-semibold text-neutralwarm-500 mt-1">Confirmed Bookings</p>
                </div>
              </div>

              {/* Search + Filter */}
              <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:max-w-md">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutralwarm-400">
                    <Search className="h-5 w-5" />
                  </span>
                  <input
                    type="text"
                    value={paySearch}
                    onChange={(e) => setPaySearch(e.target.value)}
                    placeholder="Search by name, phone, service..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-sage-200 bg-white text-sage-950 focus:outline-none focus:border-softblue-500 shadow-sm transition"
                  />
                </div>
                <div className="flex w-full md:w-auto items-center gap-2 overflow-x-auto">
                  <span className="text-sm font-bold text-sage-900 flex items-center gap-1.5 whitespace-nowrap mr-1">
                    <Filter className="h-4 w-4" /> Filter:
                  </span>
                  {["all", "pending", "confirmed", "cancelled"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setPayFilter(f)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap capitalize ${
                        payFilter === f
                          ? "bg-sage-800 text-white shadow-soft"
                          : "bg-white text-sage-800 border border-sage-100 hover:bg-sage-50"
                      }`}
                    >
                      {f === "all" ? "All Payments" : f}
                    </button>
                  ))}
                </div>
              </div>

              {errorPay && (
                <div className="mb-6 flex items-center gap-2 p-4 rounded-xl bg-red-50 text-red-800 border border-red-100">
                  <AlertCircle className="h-5 w-5" />
                  <p className="text-sm font-semibold">{errorPay}</p>
                </div>
              )}

              {loadingPay ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-700" />
                  <p className="mt-4 text-sm font-medium text-sage-800">Loading payment records...</p>
                </div>
              ) : filteredPayments.length === 0 ? (
                <div className="rounded-2xl border border-sage-100 bg-white p-12 text-center shadow-card max-w-xl mx-auto">
                  <CreditCard className="mx-auto h-12 w-12 text-neutralwarm-400" />
                  <h3 className="mt-4 text-lg font-bold text-sage-950">No payment records yet</h3>
                  <p className="mt-2 text-sm text-neutralwarm-600">
                    Payment records will appear here when clients generate a QR code.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredPayments.map((pay) => (
                    <div key={pay.id} className="rounded-2xl border border-sage-100 bg-white p-5 shadow-card hover:shadow-soft transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700 font-bold text-lg">
                          {pay.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-extrabold text-sage-950">{pay.name}</h3>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${payStatusBadge(pay.status)}`}>
                              {pay.status}
                            </span>
                          </div>
                          <p className="text-sm text-sage-600 mt-0.5">
                            <span className="font-semibold">Service:</span> {pay.service}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-4 text-xs text-neutralwarm-600 font-medium">
                            <a href={`tel:${pay.phone}`} className="flex items-center gap-1.5 hover:text-sage-900">
                              <Phone className="h-3.5 w-3.5" /> {pay.phone}
                            </a>
                            {pay.email && (
                              <a href={`mailto:${pay.email}`} className="flex items-center gap-1.5 hover:text-sage-900">
                                <Mail className="h-3.5 w-3.5" /> {pay.email}
                              </a>
                            )}
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              {new Date(pay.generatedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end md:self-center">
                        <div className="text-right mr-2">
                          <p className="text-xl font-extrabold text-sage-950">₹{pay.amount.toLocaleString("en-IN")}</p>
                          <p className="text-xs text-neutralwarm-400">Amount</p>
                        </div>
                        <select
                          value={pay.status}
                          onChange={(e) => updatePaymentStatus(pay.id, e.target.value as "pending" | "confirmed" | "cancelled")}
                          className="rounded-lg border border-sage-200 bg-white px-3 py-1.5 text-xs font-bold text-sage-800 shadow-sm focus:outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <button onClick={() => deletePayment(pay.id)} className="p-2 rounded-lg border border-red-100 text-red-600 hover:bg-red-50 transition">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

        </div>
      </section>
    </>
  );
}
