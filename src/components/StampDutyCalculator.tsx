import { useState } from "react";
import { StampDutyInput, StampDutyResult } from "../types";
import { UP_STAMP_DUTY_RATES } from "../legalData";
import { Calculator, Info, FileCheck, CheckCircle2 } from "lucide-react";

export default function StampDutyCalculator() {
  const [propertyValue, setPropertyValue] = useState<number>(1500000);
  const [buyerGender, setBuyerGender] = useState<"male" | "female" | "joint">("male");
  const [propertyType, setPropertyType] = useState<"residential" | "agricultural" | "commercial">("residential");
  const [isUrban, setIsUrban] = useState<boolean>(true);
  const [calcResult, setCalcResult] = useState<StampDutyResult | null>(null);

  const calculateDuty = () => {
    // 1. Determine baseline stamp duty percentage
    let baseRate = UP_STAMP_DUTY_RATES.male; // 7%
    let rebatePercent = 0;

    if (buyerGender === "female") {
      // Female buyers in UP get 1% rebate for transaction value up to 10 Lakhs. 
      // If property value is higher, the 1% rebate still applies to the first 10L, effectively lowering overall rate.
      // Let's model this realistic legal rebate rules beautifully:
      baseRate = UP_STAMP_DUTY_RATES.female; // 6%
      rebatePercent = 0.01;
    } else if (buyerGender === "joint") {
      baseRate = UP_STAMP_DUTY_RATES.joint; // 6.5%
      rebatePercent = 0.005;
    }

    // 2. Adjust for Kanpur Municipal / Urban surcharge if any
    let urbanSurchargePercent = 0;
    if (isUrban) {
      // Add a 1% municipal development surcharge typical in Kanpur development authority (KDA) municipal limits
      urbanSurchargePercent = 0.01;
    }

    const stampDutyPercent = baseRate + urbanSurchargePercent;
    let stampDutyAmount = propertyValue * stampDutyPercent;

    // Apply female rebate cap if value is extremely high
    let rebateAmount = 0;
    if (buyerGender === "female") {
      // 1% of up to 10,000,000 (10 Lakhs cap) = MAX RS 10,000 extra rebate
      const limit = Math.min(propertyValue, 1000000);
      rebateAmount = limit * 0.01;
      stampDutyAmount = Math.max(stampDutyAmount - rebateAmount, 0);
    } else if (buyerGender === "joint") {
      const limit = Math.min(propertyValue, 1000000);
      rebateAmount = limit * 0.005;
      stampDutyAmount = Math.max(stampDutyAmount - rebateAmount, 0);
    }

    // 3. Registration Fee calculations
    // UP registration fee is 1% of the value, with a maximum cap of Rs 20,000.
    const rawRegistration = propertyValue * UP_STAMP_DUTY_RATES.registrationRate;
    const registrationAmount = Math.min(rawRegistration, UP_STAMP_DUTY_RATES.registrationCap);
    const registrationPercent = Math.round((registrationAmount / propertyValue) * 1000) / 1000;

    const totalCharges = stampDutyAmount + registrationAmount;
    const grandTotal = propertyValue + totalCharges;

    // Legal guidance note depending on parameters
    let legalNote = "";
    if (buyerGender === "female") {
      legalNote = "महिला क्रेता के लिए 1% की विशेष स्टाम्प छूट लागू की गयी है। (Under Section 9 Indian Stamp Act as applicable in Uttar Pradesh).";
    } else if (buyerGender === "joint") {
      legalNote = "संयुक्त स्वामित्व (Joint Ownership with Female) के लिए नियमानुसार 0.5% आंशिक स्टाम्प छूट लागू है।";
    } else {
      legalNote = "सामान्य पुरुष स्वामित्व दर (7% स्टाम्प + 1% निबंधन शुल्क) लागू की गई है। महिला क्रेता के पक्ष में रजिस्ट्री करने पर स्टाम्प शुल्क में बचत संभव है।";
    }

    if (isUrban) {
      legalNote += " नगर निगम / के.डी.ए. नगर विकास सीमा में विकास उपकर (Municipal Surcharge 1%) जोड़ दिया गया है।";
    }

    if (propertyType === "commercial") {
      legalNote += " व्यावसायिक संपत्तियों (Commercial) के निबंधन पर मूल्यांकन सर्किल दर के अतिरिक्त अतिरिक्त स्टाम्प नियमों का पुनरीक्षण आवश्यक है।";
    }

    setCalcResult({
      propertyValue,
      stampDutyPercent: stampDutyPercent * 100,
      stampDutyAmount,
      rebatePercent: rebatePercent * 100,
      rebateAmount,
      registrationPercent: registrationPercent * 100,
      registrationAmount,
      totalCharges,
      grandTotal,
      legalNote
    });
  };

  const handleValuesPreset = (val: number) => {
    setPropertyValue(val);
  };

  return (
    <div id="stamp-duty-calculator" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="bg-gradient-to-r from-navy-900 to-navy-850 p-6 sm:p-8 text-white relative">
        <div class="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-gold-500 rounded-full blur-3xl opacity-10"></div>
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-gold-500/20 text-gold-400 rounded-xl flex items-center justify-center">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 class="text-xl font-serif font-bold text-white tracking-wide">UP Stamp Duty & Registration Estimator</h3>
            <p class="text-xs text-gold-300 font-medium tracking-wider uppercase mt-1">Kanpur Nagar Regional Calculator</p>
          </div>
        </div>
      </div>

      <div class="p-6 sm:p-8 grid lg:grid-cols-5 gap-8">
        {/* Input Panel */}
        <div class="lg:col-span-2 space-y-6">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Property / Transaction Value (₹)</label>
            <div class="relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">₹</span>
              </div>
              <input
                id="prop-val-input"
                type="number"
                min="10000"
                step="50000"
                class="block w-full pl-8 pr-12 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-gray-900 font-medium transition-colors"
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
              />
            </div>
            {/* Quick Presets */}
            <div class="flex flex-wrap gap-2 pt-1">
              <button
                id="preset-5l"
                type="button"
                onClick={() => handleValuesPreset(500000)}
                class="px-2.5 py-1 text-xs bg-gray-100 hover:bg-gold-100 hover:text-navy-900 text-gray-700 font-semibold rounded-md transition-colors"
              >
                5 Lakhs (5L)
              </button>
              <button
                id="preset-15l"
                type="button"
                onClick={() => handleValuesPreset(1500000)}
                class="px-2.5 py-1 text-xs bg-gray-100 hover:bg-gold-100 hover:text-navy-900 text-gray-700 font-semibold rounded-md transition-colors"
              >
                15 Lakhs (15L)
              </button>
              <button
                id="preset-35l"
                type="button"
                onClick={() => handleValuesPreset(3500000)}
                class="px-2.5 py-1 text-xs bg-gray-100 hover:bg-gold-100 hover:text-navy-900 text-gray-700 font-semibold rounded-md transition-colors"
              >
                35 Lakhs (35L)
              </button>
              <button
                id="preset-75l"
                type="button"
                onClick={() => handleValuesPreset(7500000)}
                class="px-2.5 py-1 text-xs bg-gray-100 hover:bg-gold-100 hover:text-navy-900 text-gray-700 font-semibold rounded-md transition-colors"
              >
                75 Lakhs (75L)
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Buyer Type (Rebate Selection)</label>
            <div class="grid grid-cols-3 gap-3">
              <button
                id="buyer-male"
                type="button"
                onClick={() => setBuyerGender("male")}
                class={`px-3 py-3 border text-center rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  buyerGender === "male"
                    ? "bg-navy-900 text-gold-500 border-navy-900 shadow-sm"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                Male (7%)
              </button>
              <button
                id="buyer-female"
                type="button"
                onClick={() => setBuyerGender("female")}
                class={`px-3 py-3 border text-center rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  buyerGender === "female"
                    ? "bg-navy-900 text-gold-500 border-navy-900 shadow-sm"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                Female (6%)
              </button>
              <button
                id="buyer-joint"
                type="button"
                onClick={() => setBuyerGender("joint")}
                class={`px-3 py-3 border text-center rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  buyerGender === "joint"
                    ? "bg-navy-900 text-gold-500 border-navy-900 shadow-sm"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                Joint (6.5%)
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Property Type</label>
            <div class="grid grid-cols-3 gap-3">
              <button
                id="type-res"
                type="button"
                onClick={() => setPropertyType("residential")}
                class={`px-3 py-2.5 border text-center rounded-lg text-xs font-medium transition-all ${
                  propertyType === "residential"
                    ? "bg-gold-500 text-navy-900 border-gold-500 shadow-sm font-semibold"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                Residential
              </button>
              <button
                id="type-agri"
                type="button"
                onClick={() => setPropertyType("agricultural")}
                class={`px-3 py-2.5 border text-center rounded-lg text-xs font-medium transition-all ${
                  propertyType === "agricultural"
                    ? "bg-gold-500 text-navy-900 border-gold-500 shadow-sm font-semibold"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                Agricultural
              </button>
              <button
                id="type-comm"
                type="button"
                onClick={() => setPropertyType("commercial")}
                class={`px-3 py-2.5 border text-center rounded-lg text-xs font-medium transition-all ${
                  propertyType === "commercial"
                    ? "bg-gold-500 text-navy-900 border-gold-500 shadow-sm font-semibold"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                Commercial
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between p-3.5 bg-gray-50 rounded-lg border border-gray-200">
            <div>
              <p class="text-sm font-semibold text-gray-800">Within Kanpur Municipal Limits?</p>
              <p class="text-xs text-gray-500">Adds 1% UP Urban Area Development Surcharge</p>
            </div>
            <button
              id="urban-toggle"
              type="button"
              onClick={() => setIsUrban(!isUrban)}
              class={`w-12 h-6 flex items-center rounded-full p-0.5 transition-colors duration-300 focus:outline-none ${
                isUrban ? "bg-navy-900" : "bg-gray-300"
              }`}
            >
              <div
                class={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                  isUrban ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <button
            id="calculate-btn"
            type="button"
            onClick={calculateDuty}
            class="w-full py-4 bg-navy-900 text-gold-500 font-bold uppercase tracking-wider rounded-lg hover:bg-navy-950 transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5 pointer-events-none" />
            Calculate Surcharges & Fees
          </button>
        </div>

        {/* Output Panel */}
        <div class="lg:col-span-3 bg-gray-50/50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between">
          {calcResult ? (
            <div class="space-y-6">
              <div>
                <h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Estimated Valuation Breakdown</h4>
                <p class="text-xs text-gray-400 mt-0.5">Assessed for Collectorate Court Registration norms in UP</p>
              </div>

              <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <div class="flex justify-between items-center py-2 border-b border-gray-100 text-sm">
                  <span class="text-gray-600 font-medium">Agreement Property Value</span>
                  <span class="font-bold text-gray-900">₹{calcResult.propertyValue.toLocaleString()}</span>
                </div>

                <div class="flex justify-between items-center py-2 border-b border-gray-100 text-sm">
                  <span class="text-gray-600 font-medium">
                    Stamp Duty Fee ({calcResult.stampDutyPercent}%)
                  </span>
                  <span class="font-bold text-gray-900">₹{calcResult.stampDutyAmount.toLocaleString()}</span>
                </div>

                {calcResult.rebateAmount > 0 && (
                  <div class="flex justify-between items-center py-2 border-b border-gray-100 text-sm">
                    <span class="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 class="w-4 h-4 text-emerald-600" />
                      Applied Female Rebate
                    </span>
                    <span class="font-bold text-emerald-700">-₹{calcResult.rebateAmount.toLocaleString()}</span>
                  </div>
                )}

                <div class="flex justify-between items-center py-2 border-b border-gray-100 text-sm">
                  <span class="text-gray-600 font-medium">UP Registration Charge (Capped at ₹20K)</span>
                  <span class="font-bold text-gray-900">₹{calcResult.registrationAmount.toLocaleString()}</span>
                </div>

                <div class="flex justify-between items-center pt-3 text-base">
                  <span class="text-navy-900 font-bold">Total Overheads</span>
                  <span class="font-extrabold text-navy-900 text-lg">
                    ₹{calcResult.totalCharges.toLocaleString()}
                  </span>
                </div>
              </div>

              <div class="bg-gold-50 p-4 rounded-xl border border-gold-300 flex gap-3 text-navy-900">
                <Info className="w-5 h-5 flex-shrink-0 text-gold-600 mt-0.5" />
                <div class="text-xs space-y-1">
                  <p class="font-bold uppercase tracking-wider text-gold-600">Legal Registrar Surcharge Note:</p>
                  <p class="leading-relaxed font-serif italic text-gray-800">
                    "{calcResult.legalNote}"
                  </p>
                </div>
              </div>

              <div class="bg-navy-900 p-5 rounded-xl text-white flex items-center justify-between">
                <div>
                  <p class="text-xs text-gold-400 font-semibold uppercase tracking-widest">Grand Total Project Cost</p>
                  <p class="text-xs text-gray-400">Property Cost + Official Stamp Duties</p>
                </div>
                <p class="text-2xl font-serif font-bold text-gold-500">
                  ₹{calcResult.grandTotal.toLocaleString()}
                </p>
              </div>
            </div>
          ) : (
            <div class="flex flex-col items-center justify-center text-center h-full py-12 space-y-4">
              <div class="w-16 h-16 bg-gold-50 rounded-full flex items-center justify-center text-gold-500 border border-gold-100 delicate-pulse">
                <FileCheck className="w-8 h-8" />
              </div>
              <div>
                <p class="font-serif font-bold text-navy-900 text-lg">Calculate Stamp Duty Overheads</p>
                <p class="text-sm text-gray-500 max-w-sm mt-1 mx-auto">
                  Adjust custom parameters on the left and hit calculated surcharge to verify registration schedules under Uttar Pradesh Sub-Registrar norms.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
