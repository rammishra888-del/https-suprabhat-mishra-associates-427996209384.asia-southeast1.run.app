import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { Bot, Send, Trash2, ArrowRight, Scale, Info, CheckCircle, ShieldAlert, Sparkles, HelpCircle } from "lucide-react";

const STARTER_PROMPTS = [
  {
    label: "Draft Sec 138 Notice (Cheque Bounce)",
    prompt: "Draft a formal legal notice format for a Cheque Bounce issue under Section 138 of the Negotiable Instruments Act. I want a template I can present to Adv. Suprabhat Mishra."
  },
  {
    label: "Explain UP Property Mutation",
    prompt: "Explain the official process of 'Dakhil-Kharij' (Property Mutation) in Kanpur Nagar. What documents are needed and what are the common disputes?"
  },
  {
    label: "Matrimonial Maintenance Rules",
    prompt: "What are the core parameters courts consider when deciding maintenance allowances under Section 125 CrPC / Hindu Marriage Act?"
  },
  {
    label: "Bail for False Disputes",
    prompt: "Under Indian Law, what is the step-by-step procedure to file and prove an Anticipatory Bail in a false family or dowry harrassment (Section 498A) dispute?"
  }
];

export default function AiConsultant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "Suprabhat. Welcome to the Legal Consultation engine of Suprabhat Mishra & Associates, Kanpur Nagar.\n\nI am your digital legal AI advisor. Feel free to ask me questions regarding Indian Penal Code (IPC), Code of Criminal Procedure (CrPC), family disputes, land registries, mutations, agreements drafting, or court procedures at the Kanpur Collectorate Court.\n\nChoose one of the quick starter chips below or write your specific inquiry.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [configError, setConfigError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessageId = `user-${Math.random()}`;
    const userMsg: ChatMessage = {
      id: userMessageId,
      role: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setLoading(true);
    setConfigError(null);

    try {
      // Structure chat log history to forward to Gemini API
      // We map the last 8 messages (roles are 'user' and 'model')
      const historyLog = messages
        .filter((m) => m.id !== "welcome")
        .slice(-8)
        .map((m) => ({
          role: m.role,
          text: m.text
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: historyLog
        })
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.isConfigError) {
          // Key is missing, render helpful fallback dialog instead of generic crash
          setMessages((prev) => [
            ...prev,
            {
              id: `system-error-${Math.random()}`,
              role: "model",
              text: `⚠️ **API Configuration Required**\n\nThe Google Gemini API Key has not yet been set up in the app secrets panel on the workspace. \n\nHowever, to keep your experience productive and seamless, I am switching to **Chamber Knowledgebase Simulation Mode**, referencing Adv. Suprabhat Mishra's direct court insights. Ask anything below!`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
          setConfigError("Gemini API Key is currently unconfigured. Using Chamber Insight Simulation Engine.");
          setLoading(false);
          return;
        }
        throw new Error(data.error || "An backend error occurred.");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `model-${Math.random()}`,
          role: "model",
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err: any) {
      console.warn("Using offline simulated counseling fallback:", err);
      // Fallback response generator so the app stays functional in any environment!
      setTimeout(() => {
        const fallbackText = getSimulatedResponse(text);
        setMessages((prev) => [
          ...prev,
          {
            id: `model-${Math.random()}`,
            role: "model",
            text: fallbackText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  const getSimulatedResponse = (query: string): string => {
    const qLower = query.toLowerCase();
    let header = "### Chamber Counselor Response (Simulation Mode)\n\n";
    let footer = "\n\n---\n*Disclaimer: This simulated guidance is crafted from general legal precedents at Kanpur District Courts. Please schedule an appointment in Chamber 7 (New Adhivakta Building) or Call Advocate Suprabhat Mishra at +91 9450365729 for a binding formal vakalatnama representation.*";

    if (qLower.includes("cheque") || qLower.includes("notice") || qLower.includes("138")) {
      return header + `**विषय: धारा 138 पराक्रम्य लिखत अधिनियम (Negotiable Instruments Act, 1881) के अधीन कानूनी नोटिस प्रारूप ।**

जब कोई चेक भुगतान के लिए डाला जाए परंतु बैंक द्वारा 'अपर्याप्त धनराशि' (Funds Insufficient) या 'हस्ताक्षर भिन्न' होने के कारण अस्वीकृत (Dishonour) कर दिया जाता है, तो निम्नलिखित कानूनी मार्ग अपनाया जाता है:

1. **समय सीमा** - चेक बाउंस होने के **30 दिनों के भीतर** देनदार को लिखित रूप में निबंधन डाक (Registered Post) द्वारा कानूनी नोटिस भेजना कानूनन आवश्यक है।
2. **भुगतान अवधि** - नोटिस प्राप्ति के **15 दिनों के भीतर** देनदार को विवादित धनराशि का भुगतान करना होगा।
3. **परिवाद (Complaint)** - यदि वह 15 दिनों में भुगतान नहीं करता, तो अगले **30 दिनों के भीतर** कानपुर मुख्य न्यायिक मजिस्ट्रेट (CJM Court) के समक्ष कानूनी मुकदमा दायर करना होगा।

**मॉडल कानूनी नोटिस का मुख्य ढांचा:**
- **प्रेषक:** [आपका नाम एवं पता]
- **प्राप्तकर्ता:** [देनदार का नाम एवं पता]
- **तथ्य:** "आपने व्यापारिक दायित्व / ऋण चुकाने हेतु चेक दिनांकित ____________ संख्या ____________ बैंक ____________ मूल्य ₹____________ का दिया था..."
- **बाउंस विवरण:** "उक्त चेक दिनांक ____________ को हमारे बैंक में प्रस्तुत किया गया जिसे आपकी बैंक द्वारा मेमो संख्या ____________ दिनांक ____________ के साथ अनादरित करके लौटा दिया..."
- **मांग:** "अतः इस कानूनी नोटिस के माध्यम से आपको निर्देशित किया जाता है कि नोटिस मिलने के 15 दिनों के अन्दर कुल धनराशि ₹____________ का तत्काल भुगतान करें अन्यथा आपके विरुद्ध न्यायालय मुख्य न्यायिक मजिस्ट्रेट कानपुर में आवश्यक फौजदारी कार्रवाई की जाएगी जिसका समस्त हर्जा-खर्चा आपका होगा।"
` + footer;
    }

    if (qLower.includes("mutation") || qLower.includes("khatauni") || qLower.includes("dakhil")) {
      return header + `**विषय: कानपुर में संपत्ति का दाखिल-खारिज (Property Mutation Process) प्रक्रिया।**

दाखिल-खारिज (Mutation) एक बहुत ही आवश्यक प्रक्रिया है, जिससे राजस्व रिकॉर्ड (जैसे खतौनी या नगर निगम रजिस्टर) में पुराने मालिक का नाम हटाकर नए खरीदार का नाम दर्ज किया जाता है।

**कानपुर में आवश्यक कदम (Step-by-Step):**
1. **रजिस्ट्री प्रतिलिपि:** दाखिल-खारिज के लिए आवेदन तहसील कार्यालय (सदर, बिल्हौर, घाटमपुर तहसील कानपुर) में किया जाता है, जिसके लिए रजिस्टर्ड सेल डीड (Sale Deed) की प्रमाणित प्रति संलगन करना आवश्यक है।
2. **सर्किल रेट व स्टाम्प:** स्टाम्प मूल्यांकन का प्रमाण पत्र। In UP, ensure appropriate stamp duty is paid inside the registrar bounds.
3. **आपत्ति आमंत्रण (Proclamation):** तहसील कार्यालय द्वारा सार्वजनिक नोटिस जारी कर 35 से 45 दिनों के भीतर कोई भी विधिक आपत्ति आमंत्रित की जाती है।
4. **राजस्व रिपोर्ट (Lekhpal Report):** यदि कोई गंभीर आपत्ति प्राप्त नहीं होती, तो क्षेत्र लेखपाल / तहसीलदार द्वारा नाम हस्तांतरण का आदेश जारी कर खतौनी अपडेट कर दी जाती है।

*महत्वपूर्ण चेतावनी:* बिना दाखिल-खारिज खरीदे गए प्लाट या मकान के मालिकाना अधिकार में कानूनी संशय बना रहता है एवं आप उसे भविष्य में किसी अन्य को बेचने या बैंक से ऋण लेने में असमर्थ होंगे।` + footer;
    }

    if (qLower.includes("498a") || qLower.includes("cruelty") || qLower.includes("bail")) {
      return header + `**विषय: धारा 498A (दहेज उत्पीड़न एवं क्रूरता) फौजदारी मामले में कानूनी बचाव रणनीति।**

धारा 498A (अब भारतीय न्याय संहिता BNSS के संगत प्रावधान) एक गंभीर और अमूमन गैर-जमानती धारा है। इसके झूठे मुकदमों से बचने के लिए कानपुर न्यायालय के वरिष्ठ वकीलों की देख-रेख में निम्नांकित उपाय किए जा सकते हैं:

1. **अग्रिम जमानत (Anticipatory Bail):** FIR दर्ज होने की आशंका या दर्ज होते ही तुरंत कानपुर सत्र न्यायालय (Sessions Court Kanpur Nagar) के समक्ष अग्रिम जमानत (धारा 438 CrPC) हेतु प्रार्थना पत्र दायर करें।
2. **मध्यस्थता (Mediation):** पारिवारिक न्यायालय (Family Court Kanpur) एवं महिला थाने में परामर्श / काउंसलिंग आयोजित की जाती है। जहां सुलाह-समझौते का पूर्ण कानूनी प्रयास किया जाना उत्तम विकल्प है।
3. **वैकल्पिक साक्ष्य:** किसी भी झूठे आरोप के विरुद्ध अपने बेगुनाही का सबूत जैसे - घटना के वक्त आपके बाहर होने के साक्ष्य (Alibi), बैंक ट्रांसक्शन संदेश, या पड़ोसियों के हलफनामे तुरंत सुरक्षित कर लें।
4. **हाईकोर्ट याचिका (FIR Quashing):** यदि आरोप पूर्णतः मनगढ़ंत हैं तो माननीय इलाहाबाद उच्च न्यायालय (High Court) में धारा 482 CrPC के अंतर्गत FIR रद्द (Quashing) कराने याचिका भी दाखिल की जा सकती है।` + footer;
    }

    return header + `**विषय: सामान्य कानूनी परामर्श (General Legal Consultation Guide)**

अधिवक्ता सुप्रभा मिश्रा एसोसिएट्स चैम्बर से प्राप्त आपकी जिज्ञासा: "${query}" का विवरण राजस्व नियमावली एवं क्रिमिनल मैनुअल के परिपेक्ष्य में निम्नलिखित है:

1. **विवाद की प्रकृति:** आपका मामला सिविल या क्रिमिनल कोर्ट कानपुर के अधिकार क्षेत्र के अंतर्गत है।
2. **प्राथमिक दस्तावेजीकरण:** किसी भी सिविल सूट या पुलिस जांच में लिखित अनुबंध, रसीदें, और साक्ष्यों का मिलान प्राथमिक साक्ष्य माना जाता है।
3. **कानपुर जिला न्यायालय प्रक्रिया:** कानपुर कलेक्ट्रेट में मुकदमों के त्वरित निवारण हेतु सुव्यवस्थित प्रक्रियाएं मौजूद हैं।

*आपके लिए चैंबर की विशेष सलाह:*
- किसी भी कानूनी नोटिस या सम्मन का समय पर लिखित जवाब न देना केस को कमजोर कर देता है।
- सम्मन मिलते ही 30 दिनों के भीतर न्यायालय में अपनी आपत्ति (Written Statement) अवश्य दर्ज कराएं।` + footer;
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "model",
        text: "Suprabhat. Welcome to the Legal Consultation engine of Suprabhat Mishra & Associates, Kanpur Nagar.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setConfigError(null);
  };

  return (
    <div id="ai-chat-consultation" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[600px] relative">
      
      {/* Consultant Header */}
      <div class="bg-gradient-to-r from-navy-900 to-navy-850 p-4 sm:p-5 text-white flex items-center justify-between border-b border-gold-500/20">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center text-navy-900 delicate-pulse">
            <Bot className="w-5.5 h-5.5 text-navy-900" />
          </div>
          <div>
            <h3 class="text-sm sm:text-base font-serif font-bold text-white tracking-wide flex items-center gap-1.5">
              AI Legal Advisor (Chamber 7 Assist)
              <span class="inline-block px-1.5 py-0.5 bg-emerald-500 text-[9px] uppercase tracking-wider text-white font-bold rounded">
                Active
              </span>
            </h3>
            <p class="text-[10px] text-gold-300 font-medium font-serif leading-tight">Digital Consultant associated with Adv. Suprabhat Mishra</p>
          </div>
        </div>

        <button
          id="clear-chat-btn"
          onClick={clearChat}
          class="p-2 text-gray-400 hover:text-white hover:bg-navy-800 rounded-lg transition-colors cursor-pointer"
          title="Clear Chat Thread"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Secrets Status warning banner */}
      {configError && (
        <div class="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between text-xs text-amber-800 gap-2">
          <span class="flex items-center gap-1.5">
            <Info className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <strong>Simulation Mode:</strong> {configError}
          </span>
          <span class="text-[10px] bg-amber-200 px-1 py-0.5 rounded font-bold uppercase tracking-wider">OFFLINE FALLBACK</span>
        </div>
      )}

      {/* Messages Thread container */}
      <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-50/50">
        {messages.map((msg) => (
          <div
            id={`chat-msg-${msg.id}`}
            key={msg.id}
            class={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
              msg.role === "user" ? "bg-gold-500 text-navy-900" : "bg-navy-900 border border-gold-500/20 text-gold-400"
            }`}>
              {msg.role === "user" ? "You" : "SM"}
            </div>

            {/* Message Speech bubble */}
            <div class="space-y-1">
              <div
                class={`p-3.5 rounded-2xl shadow-sm border text-xs leading-relaxed ${
                  msg.role === "user"
                    ? "bg-navy-900 text-white border-navy-900 rounded-tr-none"
                    : "bg-white text-gray-800 border-gray-150 rounded-tl-none whitespace-pre-wrap font-sans"
                }`}
              >
                {msg.text.split("\n").map((line, idx) => {
                  // Basic rendering helpers for headers and bullets
                  if (line.startsWith("###")) {
                    return <h4 key={idx} class="font-serif font-bold text-navy-900 text-sm mt-3 mb-1">{line.replace("###", "").trim()}</h4>;
                  }
                  if (line.startsWith("**") && line.endsWith("**")) {
                    return <p key={idx} class="font-bold text-navy-900 mt-2">{line.replace(/\*\*/g, "")}</p>;
                  }
                  if (line.startsWith("-") || line.startsWith("*")) {
                    return (
                      <li key={idx} class="ml-4 list-disc mt-1 text-gray-700">
                        {line.substring(1).trim()}
                      </li>
                    );
                  }
                  return <p key={idx} class="mt-1">{line}</p>;
                })}
              </div>
              <p class={`text-[9px] text-gray-400 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div class="flex gap-3 max-w-[80%] mr-auto">
            <div class="w-8 h-8 rounded-full bg-navy-900 text-gold-400 flex items-center justify-center text-xs border border-gold-500/20 delicate-pulse">
              SM
            </div>
            <div class="p-4 bg-white text-gray-500 rounded-2xl rounded-tl-none border border-gray-150 shadow-sm text-xs flex items-center gap-2">
              <span class="inline-block w-2 h-2 rounded-full bg-gold-500 animate-bounce" />
              <span class="inline-block w-2 h-2 rounded-full bg-gold-500 animate-bounce [animation-delay:0.2s]" />
              <span class="inline-block w-2 h-2 rounded-full bg-gold-500 animate-bounce [animation-delay:0.4s]" />
              <span class="font-serif italic font-medium ml-1">Consulting senior counsel database...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Starter Prompts chips */}
      {messages.length === 1 && !loading && (
        <div class="px-4 py-3 bg-white border-t border-gray-100">
          <p class="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-gold-500" />
            Suggested Consultation Inquiries
          </p>
          <div class="flex flex-wrap gap-2">
            {STARTER_PROMPTS.map((starter, index) => (
              <button
                id={`starter-chip-${index}`}
                key={starter.label}
                onClick={() => handleSendMessage(starter.prompt)}
                class="px-3 py-1.5 bg-gray-50 hover:bg-gold-50 hover:text-navy-900 border border-gray-250 hover:border-gold-300 text-[11px] font-medium text-gray-700 rounded-lg transition-all text-left flex items-center gap-1.5 cursor-pointer"
              >
                {starter.label}
                <ArrowRight className="w-3 h-3 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Input Console */}
      <div class="p-4 bg-white border-t border-gray-150 flex gap-2">
        <input
          id="ai-chat-input"
          type="text"
          placeholder="Ask a legal question (e.g. bail rules, land disputes UP circle rate)..."
          class="flex-1 px-4 py-3 border border-gray-300 bg-gray-50 rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-gray-900 transition-colors"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage(inputMessage);
          }}
          disabled={loading}
        />
        <button
          id="ai-send-btn"
          onClick={() => handleSendMessage(inputMessage)}
          disabled={!inputMessage.trim() || loading}
          class="p-3 bg-navy-900 hover:bg-navy-950 text-gold-500 rounded-xl transition-all shadow-md flex items-center justify-center disabled:opacity-50 disabled:hover:bg-navy-900 cursor-pointer text-white"
        >
          <Send className="w-4.5 h-4.5 pointer-events-none" />
        </button>
      </div>

    </div>
  );
}
