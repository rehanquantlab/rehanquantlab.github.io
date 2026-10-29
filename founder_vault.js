/**
 * ===============================================================================
 * 👑 REHAN QUANT LAB™ — INVISIBLE FOUNDER SOVEREIGN PORTAL (MOBILE & DESKTOP)
 * Secret Trigger: Tap "Available for High-Impact Roles" badge (or Logo) 5 times rapidly!
 * ===============================================================================
 */

(function () {
  const OFFLINE_MASTER_SALT = "RQL_QUANT_LAB_MASTER_KEY_2026_EXPRESSBILL_OFFLINE_PERPETUAL";
  const FOUNDER_PIN_HASH = "ca980486c99f9c735d487cb1a48c4a0362c3f8e658ecfdf3c67c51ddb4ab7e29"; // Default SHA-256 for 709151

  let tapCount = 0;
  let lastTapTime = 0;

  async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  function injectModal() {
    if (document.getElementById("rql-founder-modal")) return;

    const modalHtml = `
    <div id="rql-founder-modal" style="display:none; position:fixed; inset:0; z-index:9999999; background:rgba(2,6,23,0.92); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); font-family:system-ui, -apple-system, sans-serif; align-items:center; justify-content:center; padding:16px;">
      <div style="background:#0F172A; border:1px solid #10B981; border-radius:20px; max-width:480px; width:100%; box-shadow:0 25px 50px -12px rgba(16,185,129,0.3); overflow:hidden; color:#F8FAFC;">
        
        <!-- Header -->
        <div style="background:#1E293B; padding:16px 20px; border-bottom:1px solid #334155; display:flex; align-items:center; justify-content:space-between;">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:10px; height:10px; border-radius:50%; background:#10B981; box-shadow:0 0 10px #10B981;"></div>
            <span style="font-weight:800; font-size:13px; letter-spacing:1px; color:#10B981;">FOUNDER SOVEREIGN VAULT</span>
          </div>
          <button id="rql-founder-close" style="background:transparent; border:none; color:#94A3B8; font-size:22px; cursor:pointer; padding:4px 8px;">✕</button>
        </div>

        <!-- Step 1: PIN Gate -->
        <div id="rql-founder-gate" style="padding:24px;">
          <div style="text-align:center; margin-bottom:20px;">
            <div style="font-size:36px; margin-bottom:8px;">🔐</div>
            <div style="font-weight:700; font-size:17px; color:#FFFFFF;">Founder Authentication</div>
            <div style="font-size:12px; color:#94A3B8; margin-top:4px;">Enter your master PIN to access the key studio.</div>
          </div>
          <input type="password" id="rql-founder-pin" placeholder="Enter Founder PIN" style="width:100%; padding:12px 16px; border-radius:12px; background:#1E293B; border:1px solid #334155; color:#FFFFFF; font-size:18px; text-align:center; letter-spacing:4px; outline:none; box-sizing:border-box;">
          <div id="rql-pin-err" style="color:#EF4444; font-size:12px; text-align:center; margin-top:8px; display:none;">Invalid Master PIN</div>
          <button id="rql-founder-auth-btn" style="width:100%; margin-top:16px; padding:12px; border-radius:12px; background:#10B981; border:none; color:#FFFFFF; font-weight:700; font-size:14px; cursor:pointer;">Unlock Founder Studio</button>
        </div>

        <!-- Step 2: Generator Studio -->
        <div id="rql-founder-studio" style="padding:24px; display:none;">
          <div style="margin-bottom:14px;">
            <label style="display:block; font-size:11px; font-weight:700; color:#10B981; margin-bottom:4px; text-transform:uppercase;">Customer Machine ID (from buyer)</label>
            <input type="text" id="rql-input-mid" placeholder="e.g. RQL-0B78-F950-D49F" style="width:100%; padding:10px 14px; border-radius:10px; background:#1E293B; border:1px solid #334155; color:#38BDF8; font-family:monospace; font-weight:bold; font-size:14px; box-sizing:border-box; outline:none;">
          </div>

          <div style="margin-bottom:14px;">
            <label style="display:block; font-size:11px; font-weight:700; color:#94A3B8; margin-bottom:4px; text-transform:uppercase;">Licensed Product</label>
            <select id="rql-select-prod" style="width:100%; padding:10px 14px; border-radius:10px; background:#1E293B; border:1px solid #334155; color:#FFFFFF; font-size:13px; box-sizing:border-box; outline:none;">
              <option value="Universal Sovereign Suite (All Products)">🌟 Universal Sovereign Suite (All 16 Products)</option>
              <option value="RQL WhisperVault™">🎙️ 19 RQL WhisperVault™ AI Voice OS</option>
              <option value="RQL DocumentShield™">🛡️ 18 RQL DocumentShield™ PDF Redactor</option>
              <option value="RQL StoreFlow™ POS">🏪 13 RQL StoreFlow™ Unified Retail</option>
              <option value="RQL TaxMatrix™ CA Reconciler">⚖️ 10 RQL TaxMatrix™ CA Reconciler</option>
              <option value="RQL LedgerGuard™ CA Reconciler">🏦 14 RQL LedgerGuard™ CA Reconciler</option>
              <option value="RQL StockAudit™ Inventory Scanner">🔫 15 RQL StockAudit™ Inventory Gun</option>
              <option value="RQL OmniDispatch™ WhatsApp Closer">🤖 16 RQL OmniDispatch™ 24/7 Closer</option>
              <option value="RQL Nexus™ Multi-Branch P2P">🌐 17 RQL Nexus™ Multi-Branch Sync</option>
              <option value="ExpressBill POS Retail Suite">🧾 06 ExpressBill POS Retail Suite</option>
            </select>
          </div>

          <div style="margin-bottom:14px;">
            <label style="display:block; font-size:11px; font-weight:700; color:#94A3B8; margin-bottom:4px; text-transform:uppercase;">Customer / Business Name</label>
            <input type="text" id="rql-input-cust" placeholder="e.g. Metro Retailers / Ladies Zone" style="width:100%; padding:10px 14px; border-radius:10px; background:#1E293B; border:1px solid #334155; color:#FFFFFF; font-size:13px; box-sizing:border-box; outline:none;">
          </div>

          <button id="rql-btn-gen" style="width:100%; padding:12px; border-radius:12px; background:#10B981; border:none; color:#FFFFFF; font-weight:700; font-size:14px; cursor:pointer;">⚡ Generate Fast Offline Key</button>

          <!-- Results -->
          <div id="rql-results" style="display:none; margin-top:16px; background:#1E293B; border-radius:12px; padding:14px; border:1px solid #334155;">
            <div style="font-size:11px; color:#10B981; font-weight:700; margin-bottom:4px;">FAST OFFLINE PIN (17-CHAR):</div>
            <div id="rql-res-pin" style="font-family:monospace; font-size:16px; font-weight:800; color:#38BDF8; letter-spacing:1px; margin-bottom:12px;"></div>

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

    const midInput = document.getElementById("rql-input-mid");
    const custInput = document.getElementById("rql-input-cust");
    const prodSelect = document.getElementById("rql-select-prod");
    const genBtn = document.getElementById("rql-btn-gen");
    const results = document.getElementById("rql-results");
    const resPin = document.getElementById("rql-res-pin");
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
      const cust = custInput.value.trim() || "Valued Commercial Partner";

      // Compute Fast PIN: SHA-256(mid:salt)
      const raw = mid + ":" + OFFLINE_MASTER_SALT;
      const h = (await sha256(raw)).toUpperCase();
      const pin = "KEY-" + h.slice(0, 4) + "-" + h.slice(4, 8) + "-" + h.slice(8, 12);

      resPin.innerText = pin;
      generatedMessage = `Thank you for choosing Rehan Quant Lab Sovereign Suite! 🙏\n\n🖥️ Machine ID: ${mid}\n📦 Product: ${prod}\n🏢 Licensee: ${cust}\n🏷️ Tier: LIFETIME_PERPETUAL\n\n🔑 Fast Offline Activation Key:\n${pin}\n\nHow to activate:\n1. Open your application\n2. Paste this Key into the Activation Gate\n3. Click 'Activate & Unlock Workstation'\n\nYour software is unlocked permanently with zero recurring fees! 🛡️`;

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
      injectModal();
      const modal = document.getElementById("rql-founder-modal");
      modal.style.display = "flex";
      const pin = document.getElementById("rql-founder-pin");
      if (pin) pin.focus();
    }
  }

  function initTrigger() {
    // 1. Primary Trigger: The Highlighted "Available for High-Impact Roles" Badge!
    const badge = document.getElementById("rql-founder-trigger");
    if (badge) {
      badge.addEventListener("click", handleSecretTap);
      badge.addEventListener("touchend", handleSecretTap);
    }

    // 2. Secondary Trigger: Brand Logos with preventDefault on multi-tap
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
          injectModal();
          const modal = document.getElementById("rql-founder-modal");
          modal.style.display = "flex";
          const pin = document.getElementById("rql-founder-pin");
          if (pin) pin.focus();
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTrigger);
  } else {
    initTrigger();
  }
})();
