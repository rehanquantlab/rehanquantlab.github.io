/**
 * ===============================================================================
 * 👑 REHAN QUANT LAB™ — INVISIBLE FOUNDER SOVEREIGN PORTAL (MOBILE & DESKTOP)
 * All 19 Sovereign Products + Universal Master Suite + Full License Tiers
 * Secret Trigger 1: Tap "Available for High-Impact Roles" badge (or Logo) 5 times!
 * Secret Trigger 2: Visit rehanquantlab.com/#founder (Instant access on mobile)
 * Secret Trigger 3: Press Ctrl + Shift + F on keyboard
 * ===============================================================================
 */

(function () {
  const OFFLINE_MASTER_SALT = "RQL_QUANT_LAB_MASTER_KEY_2026_EXPRESSBILL_OFFLINE_PERPETUAL";
  const FOUNDER_PIN_HASH = "ca980486c99f9c735d487cb1a48c4a0362c3f8e658ecfdf3c67c51ddb4ab7e29"; // Default SHA-256 for 709151
  const MASTER_KEY = "RQL-FOUNDER-MASTER-2026-SOVEREIGN";

  let tapCount = 0;
  let lastTapTime = 0;
  let touchHandled = false;

  async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  function openFounderModal() {
    injectModal();
    const modal = document.getElementById("rql-founder-modal");
    if (modal) {
      modal.style.display = "flex";
      const pin = document.getElementById("rql-founder-pin");
      if (pin) pin.focus();
    }
  }

  function injectModal() {
    if (document.getElementById("rql-founder-modal")) return;

    const modalHtml = `
    <div id="rql-founder-modal" style="display:none; position:fixed; inset:0; z-index:9999999; background:rgba(2,6,23,0.92); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); font-family:system-ui, -apple-system, sans-serif; align-items:center; justify-content:center; padding:16px;">
      <div style="background:#0F172A; border:1px solid #10B981; border-radius:20px; max-width:520px; width:100%; max-height:92vh; display:flex; flex-direction:column; box-shadow:0 25px 50px -12px rgba(16,185,129,0.3); overflow:hidden; color:#F8FAFC;">
        
        <!-- Header -->
        <div style="background:#1E293B; padding:16px 20px; border-bottom:1px solid #334155; display:flex; align-items:center; justify-content:space-between; shrink:0;">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:10px; height:10px; border-radius:50%; background:#10B981; box-shadow:0 0 10px #10B981;"></div>
            <span style="font-weight:800; font-size:13px; letter-spacing:1px; color:#10B981;">FOUNDER SOVEREIGN VAULT v2.0</span>
          </div>
          <button id="rql-founder-close" style="background:transparent; border:none; color:#94A3B8; font-size:22px; cursor:pointer; padding:4px 8px;">✕</button>
        </div>

        <!-- Step 1: PIN Gate -->
        <div id="rql-founder-gate" style="padding:28px 24px;">
          <div style="text-align:center; margin-bottom:20px;">
            <div style="font-size:38px; margin-bottom:8px;">🔐</div>
            <div style="font-weight:700; font-size:18px; color:#FFFFFF;">Founder Authentication</div>
            <div style="font-size:12px; color:#94A3B8; margin-top:4px;">Enter your master PIN to access the 19-Product key studio.</div>
          </div>
          <input type="password" id="rql-founder-pin" placeholder="Enter Founder PIN" style="width:100%; padding:14px 16px; border-radius:12px; background:#1E293B; border:1px solid #334155; color:#FFFFFF; font-size:20px; text-align:center; letter-spacing:4px; outline:none; box-sizing:border-box;">
          <div id="rql-pin-err" style="color:#EF4444; font-size:12px; text-align:center; margin-top:8px; display:none;">Invalid Master PIN (Use: 709151)</div>
          <button id="rql-founder-auth-btn" style="width:100%; margin-top:18px; padding:13px; border-radius:12px; background:#10B981; border:none; color:#FFFFFF; font-weight:700; font-size:14px; cursor:pointer;">Unlock Founder Studio</button>
        </div>

        <!-- Step 2: Generator Studio -->
        <div id="rql-founder-studio" style="padding:20px; overflow-y:auto; display:none; flex:1;">
          
          <!-- Master Key Quick Bar -->
          <div style="background:rgba(16,185,129,0.08); border:1px solid #10B981; border-radius:10px; padding:10px 14px; margin-bottom:14px; display:flex; align-items:center; justify-content:space-between; gap:8px;">
            <div style="overflow:hidden;">
              <div style="font-size:10px; font-weight:700; color:#10B981; text-transform:uppercase; letter-spacing:0.5px;">👑 Universal Founder Master Key</div>
              <div style="font-family:monospace; font-size:11px; color:#F59E0B; font-weight:bold; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${MASTER_KEY}</div>
            </div>
            <button id="rql-copy-master-btn" style="background:#1E293B; border:1px solid #10B981; color:#10B981; border-radius:8px; padding:6px 12px; font-size:11px; font-weight:bold; cursor:pointer; shrink:0; white-space:nowrap;">Copy Master</button>
          </div>

          <!-- Product Selector (Full 19 Products) -->
          <div style="margin-bottom:12px;">
            <label style="display:block; font-size:11px; font-weight:700; color:#10B981; margin-bottom:4px; text-transform:uppercase;">Select Target Commercial Product (All 19 Products)</label>
            <select id="rql-select-prod" style="width:100%; padding:9px 12px; border-radius:10px; background:#1E293B; border:1px solid #334155; color:#FFFFFF; font-size:12px; box-sizing:border-box; outline:none;">
              <option value="👑 Universal Sovereign Master Access (All 19 Products)">👑 Universal Sovereign Master Access (All 19 Products)</option>
              <option value="01 • RQL Conduit™ — Multi-Interface Network Gateway v2.0">01 • RQL Conduit™ — Network Gateway</option>
              <option value="02 • RQL Deterministic State Kernel™ v2.0">02 • RQL Deterministic State Kernel™</option>
              <option value="03 • RQL Aegis™ — Sovereign Risk Engine v2.0">03 • RQL Aegis™ — Sovereign Risk Engine</option>
              <option value="04 • RQL Veritas Dossier™ — Governance & Capital Auditor v2.0">04 • RQL Veritas Dossier™ — Capital Auditor</option>
              <option value="05 • RQL Industrial Sentinel™ — Telemetry Engine v2.0">05 • RQL Industrial Sentinel™ — Telemetry Engine</option>
              <option value="06 • RQL ExpressBill POS™ — Retail Billing Suite v2.0">06 • RQL ExpressBill POS™ — Retail Suite</option>
              <option value="07 • RQL Sovereign Suite Master™ — Enterprise Fleet v2.0">07 • RQL Sovereign Suite Master™ — Enterprise Fleet</option>
              <option value="08 • RQL TagMaster™ — Thermal Barcode & Label Printer v1.0">08 • RQL TagMaster™ — Barcode & Label</option>
              <option value="09 • RQL DeskBroadcast™ — WhatsApp Direct Marketing Workstation v1.0">09 • RQL DeskBroadcast™ — WhatsApp Marketing</option>
              <option value="10 • RQL TaxMatrix™ — CA Reconciler (GST 2B vs Books) v1.0">10 • RQL TaxMatrix™ — CA GST Reconciler</option>
              <option value="11 • RQL LocalMesh™ — Multi-Counter Sync (Air-Gapped CRDT) v1.0">11 • RQL LocalMesh™ — Counter Sync</option>
              <option value="12 • RQL Sovereign Flagship Studio Enterprise v2.0">12 • RQL Flagship Studio Enterprise™</option>
              <option value="13 • RQL StoreFlow™ — Unified Retail Workstation v1.0">13 • RQL StoreFlow™ — Retail POS Workstation</option>
              <option value="14 • RQL LedgerGuard™ — CA Financial Reconciler v1.0">14 • RQL LedgerGuard™ — CA Financial Reconciler</option>
              <option value="15 • RQL StockAudit™ — Physical Inventory Gun Scanner v1.0">15 • RQL StockAudit™ — Inventory Gun Scanner</option>
              <option value="16 • RQL OmniDispatch™ — 24/7 WhatsApp Closer Workstation v1.0">16 • RQL OmniDispatch™ — WhatsApp Closer</option>
              <option value="17 • RQL Nexus™ — Multi-Branch P2P Sync & Fleet Workstation v1.0">17 • RQL Nexus™ — Multi-Branch Sync</option>
              <option value="18 • RQL DocumentShield™ — Forensic PDF Redactor & Metadata Purge OS v1.0">18 • RQL DocumentShield™ — Forensic PDF Redactor</option>
              <option value="19 • RQL WhisperVault™ — Air-Gapped AI Voice Intelligence OS v1.0">19 • RQL WhisperVault™ — AI Voice OS</option>
            </select>
          </div>

          <!-- Validity Tier Selector -->
          <div style="margin-bottom:12px;">
            <label style="display:block; font-size:11px; font-weight:700; color:#38BDF8; margin-bottom:4px; text-transform:uppercase;">License Validity Tier</label>
            <select id="rql-select-tier" style="width:100%; padding:9px 12px; border-radius:10px; background:#1E293B; border:1px solid #334155; color:#FFFFFF; font-size:12px; box-sizing:border-box; outline:none;">
              <option value="LIFETIME_PERPETUAL">LIFETIME_PERPETUAL (Permanent Sovereign Ownership)</option>
              <option value="1_YEAR_ANNUAL_AMC">1_YEAR_ANNUAL_AMC (12-Month Enterprise)</option>
              <option value="ENTERPRISE_MULTI_COUNTER">ENTERPRISE_MULTI_COUNTER (Multi-Terminal Fleet)</option>
              <option value="CA_AUDIT_PRO">CA_AUDIT_PRO (Chartered Accountant Statutory)</option>
            </select>
          </div>

          <!-- Machine ID Input -->
          <div style="margin-bottom:12px;">
            <label style="display:block; font-size:11px; font-weight:700; color:#94A3B8; margin-bottom:4px; text-transform:uppercase;">Customer Machine ID (from buyer screen)</label>
            <input type="text" id="rql-input-mid" placeholder="e.g. RQL-0B78-F950-D49F" style="width:100%; padding:9px 12px; border-radius:10px; background:#1E293B; border:1px solid #334155; color:#38BDF8; font-family:monospace; font-weight:bold; font-size:13px; box-sizing:border-box; outline:none;">
          </div>

          <!-- Customer Name Input -->
          <div style="margin-bottom:14px;">
            <label style="display:block; font-size:11px; font-weight:700; color:#94A3B8; margin-bottom:4px; text-transform:uppercase;">Customer / Business Name</label>
            <input type="text" id="rql-input-cust" placeholder="e.g. Metro Retailers / Ladies Zone" style="width:100%; padding:9px 12px; border-radius:10px; background:#1E293B; border:1px solid #334155; color:#FFFFFF; font-size:12px; box-sizing:border-box; outline:none;">
          </div>

          <button id="rql-btn-gen" style="width:100%; padding:12px; border-radius:12px; background:#10B981; border:none; color:#FFFFFF; font-weight:700; font-size:13px; cursor:pointer;">⚡ Generate Fast Offline Key</button>

          <!-- Results -->
          <div id="rql-results" style="display:none; margin-top:14px; background:#1E293B; border-radius:12px; padding:14px; border:1px solid #334155;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <span style="font-size:11px; color:#10B981; font-weight:700;">FAST OFFLINE PIN:</span>
              <span id="rql-tier-tag" style="font-size:10px; padding:2px 8px; border-radius:12px; background:#059669; color:#FFFFFF; font-weight:bold;">LIFETIME</span>
            </div>
            <div id="rql-res-pin" style="font-family:monospace; font-size:16px; font-weight:800; color:#38BDF8; letter-spacing:1px; margin-bottom:10px;"></div>

            <button id="rql-btn-copy-wa" style="width:100%; padding:10px; border-radius:10px; background:#059669; border:none; color:#FFFFFF; font-weight:700; font-size:13px; cursor:pointer;">📋 Copy WhatsApp Message</button>
            <div id="rql-copy-toast" style="text-align:center; color:#4ADE80; font-size:12px; font-weight:bold; margin-top:6px; display:none;">✓ Copied to clipboard! Ready to paste in WhatsApp.</div>
          </div>
        </div>

      </div>
    </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHtml);

    // Event handlers
    const modal = document.getElementById("rql-founder-modal");
    const closeBtn = document.getElementById("rql-founder-close");
    const pinInput = document.getElementById("rql-founder-pin");
    const authBtn = document.getElementById("rql-founder-auth-btn");
    const pinErr = document.getElementById("rql-pin-err");
    const gate = document.getElementById("rql-founder-gate");
    const studio = document.getElementById("rql-founder-studio");

    const copyMasterBtn = document.getElementById("rql-copy-master-btn");
    if (copyMasterBtn) {
      copyMasterBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(MASTER_KEY).then(() => {
          copyMasterBtn.innerText = "✓ Copied!";
          setTimeout(() => { copyMasterBtn.innerText = "Copy Master"; }, 2000);
        });
      });
    }

    const midInput = document.getElementById("rql-input-mid");
    const custInput = document.getElementById("rql-input-cust");
    const prodSelect = document.getElementById("rql-select-prod");
    const tierSelect = document.getElementById("rql-select-tier");
    const genBtn = document.getElementById("rql-btn-gen");
    const results = document.getElementById("rql-results");
    const resPin = document.getElementById("rql-res-pin");
    const tierTag = document.getElementById("rql-tier-tag");
    const copyWaBtn = document.getElementById("rql-btn-copy-wa");
    const copyToast = document.getElementById("rql-copy-toast");

    let generatedMessage = "";

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    authBtn.addEventListener("click", async () => {
      const pin = pinInput.value.trim();
      const hash = await sha256(pin);
      if (hash === FOUNDER_PIN_HASH || pin === "709151" || pin === "rehan2026") {
        gate.style.display = "none";
        studio.style.display = "block";
      } else {
        pinErr.style.display = "block";
      }
    });

    pinInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") authBtn.click();
    });

    genBtn.addEventListener("click", async () => {
      const mid = midInput.value.trim().toUpperCase();
      if (!mid) {
        alert("Please enter customer Machine ID");
        return;
      }
      const prod = prodSelect.value;
      const tier = tierSelect.value;
      const cust = custInput.value.trim() || "Valued Commercial Partner";

      // Compute Fast PIN: SHA-256(mid:salt)
      const raw = mid + ":" + OFFLINE_MASTER_SALT;
      const h = (await sha256(raw)).toUpperCase();
      const pin = "KEY-" + h.slice(0, 4) + "-" + h.slice(4, 8) + "-" + h.slice(8, 12);

      resPin.innerText = pin;
      tierTag.innerText = tier.replace("_PERPETUAL", "").replace("1_YEAR_", "");

      const tierNotice = (tier === "LIFETIME_PERPETUAL") 
        ? "Your software is unlocked permanently with zero recurring fees! 🛡️"
        : `Your software is activated for ${tier} with full feature updates and VIP WhatsApp support! 🛡️`;

      generatedMessage = `Thank you for choosing Rehan Quant Lab Sovereign Suite! 🙏\n\n🖥️ Hardware Machine ID: ${mid}\n📦 Licensed Product: ${prod}\n🏢 Licensee: ${cust}\n🏷️ License Tier: ${tier}\n\n🔑 Fast Offline Activation Key:\n${pin}\n\nHow to activate:\n1. Open your application\n2. Paste this Key into the Activation Gate\n3. Click 'Activate & Unlock Workstation'\n\n${tierNotice}`;

      results.style.display = "block";
    });

    copyWaBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(generatedMessage).then(() => {
        copyToast.style.display = "block";
        setTimeout(() => {
          copyToast.style.display = "none";
        }, 2500);
      });
    });
  }

  function handleSecretTap(e) {
    const now = Date.now();
    if (now - lastTapTime < 2500) {
      tapCount++;
    } else {
      tapCount = 1;
    }
    lastTapTime = now;

    if (tapCount >= 5) {
      tapCount = 0;
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (navigator.vibrate) navigator.vibrate([40, 60, 40]);
      openFounderModal();
    }
  }

  function initTrigger() {
    // 1. Primary Trigger: The Highlighted "Available for High-Impact Roles" Badge
    const badge = document.getElementById("rql-founder-trigger");
    if (badge) {
      badge.addEventListener("touchend", (e) => {
        touchHandled = true;
        handleSecretTap(e);
        setTimeout(() => { touchHandled = false; }, 400);
      });
      badge.addEventListener("click", (e) => {
        if (touchHandled) return;
        handleSecretTap(e);
      });
    }

    // 2. Secondary Trigger: Brand Logos
    const logos = document.querySelectorAll('img[src*="emblem"], img[src*="logo"], a[href="index.html"]');
    logos.forEach((logo) => {
      logo.addEventListener("click", (e) => {
        const now = Date.now();
        if (now - lastTapTime < 2500) {
          tapCount++;
          e.preventDefault(); // Stop navigation while tapping rapidly!
        } else {
          tapCount = 1;
        }
        lastTapTime = now;

        if (tapCount >= 5) {
          tapCount = 0;
          e.preventDefault();
          e.stopPropagation();
          if (navigator.vibrate) navigator.vibrate([40, 60, 40]);
          openFounderModal();
        }
      });
    });

    // 3. Trigger 3: Keyboard Shortcut Ctrl + Shift + F
    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "F" || e.key === "f")) {
        e.preventDefault();
        openFounderModal();
      }
    });

    // 4. Trigger 4: Direct URL Hash (#founder or ?founder=true)
    if (window.location.hash.toLowerCase() === "#founder" || window.location.search.toLowerCase().includes("founder=true")) {
      openFounderModal();
    }
    window.addEventListener("hashchange", () => {
      if (window.location.hash.toLowerCase() === "#founder") {
        openFounderModal();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTrigger);
  } else {
    initTrigger();
  }
})();
