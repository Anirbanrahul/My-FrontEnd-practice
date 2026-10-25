import React, { useState, useEffect, useRef } from 'react';
import './StudyNudge.css';

const PREPARATION_PLANS = [
  { days: 30, label: '30 Days Sprint', desc: 'Intensive Daily DSA + System Design (2-3 hrs/day)', icon: '⚡' },
  { days: 60, label: '60 Days Comprehensive', desc: 'Balanced Mastery: FE Core, DSA & Machine Coding', icon: '🎯' },
  { days: 90, label: '90 Days Deep Dive', desc: 'Complete In-Depth: FE Bible, Architecture & Mock Quizzes', icon: '🏆' }
];

const POPULAR_DESIGNATIONS = [
  'Frontend Engineer (SDE-1)',
  'Frontend Engineer (SDE-2)',
  'Senior Frontend Engineer (SDE-3 / Lead)',
  'Full Stack Developer',
  'React / UI Specialist',
  'Software Engineer - Generalist'
];

const DAILY_QUOTES = [
  "Consistency beats intensity. Even 45 mins today moves you closer to the offer letter!",
  "Master one concept deeply today. Write code without looking at the answer.",
  "Your future self will thank you for showing up today. Let's solve today's challenge!",
  "Frontend mastery is built line by line. Open the editor and conquer today's topic!",
  "Great engineers aren't born; they practice consistently every single day."
];

const StudyNudge = () => {
  // Form State
  const [phoneNumber, setPhoneNumber] = useState(() => localStorage.getItem('study_nudge_phone') || '');
  const [designation, setDesignation] = useState(() => localStorage.getItem('study_nudge_desig') || POPULAR_DESIGNATIONS[0]);
  const [prepDays, setPrepDays] = useState(() => Number(localStorage.getItem('study_nudge_days')) || 60);
  const [reminderTime, setReminderTime] = useState(() => localStorage.getItem('study_nudge_time') || '20:00');
  
  // Custom Webhook or Telegram Chat ID (Optional)
  const [customWebhookUrl, setCustomWebhookUrl] = useState(() => localStorage.getItem('study_nudge_custom_hook') || '');

  // Nudge Channels
  const [browserPushEnabled, setBrowserPushEnabled] = useState(false);
  const [freeSmsEnabled, setFreeSmsEnabled] = useState(true);
  const [whatsappWebEnabled, setWhatsappWebEnabled] = useState(true);
  const [phonePushNtfy, setPhonePushNtfy] = useState(true);

  // Status & Logs
  const [scheduleActive, setScheduleActive] = useState(() => localStorage.getItem('study_nudge_active') === 'true');
  const [statusMessage, setStatusMessage] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [isTestingSms, setIsTestingSms] = useState(false);
  const [smsDiagnosticResult, setSmsDiagnosticResult] = useState(null);
  const [cascadeLogs, setCascadeLogs] = useState([]);

  const [notificationHistory, setNotificationHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('study_nudge_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const timerRef = useRef(null);

  // Check browser notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'granted') {
      setBrowserPushEnabled(true);
    }
  }, []);

  // Save profile to localStorage
  useEffect(() => {
    localStorage.setItem('study_nudge_phone', phoneNumber);
    localStorage.setItem('study_nudge_desig', designation);
    localStorage.setItem('study_nudge_days', String(prepDays));
    localStorage.setItem('study_nudge_time', reminderTime);
    localStorage.setItem('study_nudge_active', String(scheduleActive));
    localStorage.setItem('study_nudge_custom_hook', customWebhookUrl);
    localStorage.setItem('study_nudge_history', JSON.stringify(notificationHistory));
  }, [phoneNumber, designation, prepDays, reminderTime, scheduleActive, customWebhookUrl, notificationHistory]);

  // Request browser notification permission
  const requestBrowserPermission = async () => {
    if (!('Notification' in window)) {
      alert('Your browser does not support desktop notifications.');
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      setBrowserPushEnabled(true);
      new Notification('🔔 Notifications Enabled!', {
        body: `You will get daily study nudges at ${reminderTime} for ${designation}!`,
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      });
    } else {
      setBrowserPushEnabled(false);
      alert('Notification permission was denied. You can enable it in browser settings.');
    }
  };

  // Construct message content
  const constructMessage = (isTest = false) => {
    const randomQuote = DAILY_QUOTES[Math.floor(Math.random() * DAILY_QUOTES.length)];
    const prefix = isTest ? '[TEST NUDGE] ' : '🚀 [DAILY STUDY NUDGE] ';
    return `${prefix}Hey ${designation}! Time for your daily interview prep sprint (${prepDays}-day target).
💡 Reminder: ${randomQuote}
📚 Open Hub: ${window.location.origin}/dsa-practice`;
  };

  // Record into history
  const logNotification = (channel, status, detail) => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      date: new Date().toLocaleDateString(),
      channel,
      status,
      detail
    };
    setNotificationHistory(prev => [newEntry, ...prev.slice(0, 19)]);
  };

  // 1. Primary Public Carrier Gateway Attempt
  const attemptPublicSmsGateway = async (phone, msg) => {
    try {
      const response = await fetch('https://textbelt.com/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phone.trim(),
          message: msg.slice(0, 140),
          key: 'textbelt'
        })
      });
      const data = await response.json();
      return { success: data.success === true, data, error: data.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // 2. Open-Source Mobile Push Webhook (100% Free, zero credentials)
  const attemptMobilePush = async (phone, msg) => {
    const cleanNumber = phone.replace(/[^0-9]/g, '');
    const topic = `interview-prep-${cleanNumber.slice(-8) || 'student'}`;
    try {
      const res = await fetch(`https://ntfy.sh/${topic}`, {
        method: 'POST',
        body: msg,
        headers: {
          'Title': `Study Nudge: ${designation} (${prepDays}d Plan)`,
          'Priority': 'high',
          'Tags': 'books,alarm_clock'
        }
      });
      return { success: res.ok, topic };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // 3. Optional Custom Webhook (e.g. Discord, Slack, IFTTT, Zapier)
  const attemptCustomWebhook = async (url, msg) => {
    if (!url.trim()) return null;
    try {
      const res = await fetch(url.trim(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: msg,
          text: msg,
          message: msg
        })
      });
      return { success: res.ok };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Smart Multi-Gateway Fallback Engine
  const executeCascadeNudge = async (isTest = false) => {
    if (!phoneNumber.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter your phone number with country code first (e.g. +91 9876543210).' });
      return;
    }

    setIsSending(true);
    setIsTestingSms(true);
    const logs = [];
    const msg = constructMessage(isTest);
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    const ntfyTopic = `interview-prep-${cleanNumber.slice(-8) || 'student'}`;

    logs.push(`🔍 Initiating Multi-Gateway Dispatch for ${phoneNumber}...`);

    // Tier 1: Try Public Carrier SMS Gateway
    logs.push('⏳ [Tier 1] Trying Free Public SMS Gateway (Textbelt)...');
    const smsRes = await attemptPublicSmsGateway(phoneNumber, msg);

    if (smsRes.success) {
      logs.push(`✅ [Tier 1 SUCCESS] Public Carrier SMS delivered! Quota left: ${smsRes.data?.quotaRemaining}`);
      logNotification('Carrier SMS', 'Success', `Sent to ${phoneNumber}`);
      setSmsDiagnosticResult(smsRes.data);
    } else {
      logs.push(`❌ [Tier 1 FAILED] Carrier SMS rejected: "${smsRes.error || 'Country/Spam restriction'}".`);
      logs.push('⚡ [Tier 2 FALLBACK] Triggering Zero-Credential Mobile Push Gateway (ntfy.sh)...');
      setSmsDiagnosticResult(smsRes.data || { success: false, error: smsRes.error });

      // Tier 2: Instant Mobile Push (ntfy)
      const pushRes = await attemptMobilePush(phoneNumber, msg);
      if (pushRes.success) {
        logs.push(`✅ [Tier 2 SUCCESS] Push delivered to phone channel: ntfy.sh/${ntfyTopic}`);
        logNotification('Mobile Push (ntfy)', 'Delivered', `Pushed to topic: ${ntfyTopic}`);
      } else {
        logs.push(`⚠️ [Tier 2 FAILED] Mobile Push: ${pushRes.error}`);
      }

      // Tier 3: Browser/OS Desktop Notification
      if (browserPushEnabled && 'Notification' in window && Notification.permission === 'granted') {
        try {
          new Notification(`⏰ Prep Reminder: ${designation}`, {
            body: msg,
            icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
          });
          logs.push('✅ [Tier 3 SUCCESS] Desktop OS push notification popped on your screen.');
          logNotification('Desktop Notification', 'Success', `Popped for ${designation}`);
        } catch {
          logs.push('⚠️ [Tier 3] Desktop notification skipped.');
        }
      }

      // Tier 4: Optional Custom Webhook (if user entered Discord/Slack/Telegram hook)
      if (customWebhookUrl.trim()) {
        logs.push('⏳ [Tier 4] Triggering custom configured Webhook...');
        const hookRes = await attemptCustomWebhook(customWebhookUrl, msg);
        if (hookRes?.success) {
          logs.push('✅ [Tier 4 SUCCESS] Custom Webhook executed successfully.');
          logNotification('Custom Webhook', 'Success', 'Dispatched to custom endpoint');
        }
      }

      // Tier 5: Direct Mobile Native Hook
      logs.push(`📲 [Tier 5 READY] Direct Phone SMS & WhatsApp links prepared for instant click.`);
    }

    setCascadeLogs(logs);
    setIsSending(false);
    setIsTestingSms(false);

    setStatusMessage({
      type: 'info',
      text: `🚀 Multi-Gateway Execution Complete! Check the Live Cascade Logs below.`
    });
  };

  // Launch Native Messages App (sms: protocol)
  const triggerNativeSms = () => {
    if (!phoneNumber.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid phone number first!' });
      return;
    }
    const cleanPhone = phoneNumber.replace(/[^0-9+]/g, '');
    const msg = constructMessage(true);
    const smsUrl = `sms:${cleanPhone}?body=${encodeURIComponent(msg)}`;
    window.location.href = smsUrl;
    logNotification('Native SMS (Device)', 'Success', `Opened native SMS app for ${cleanPhone}`);
  };

  // Launch WhatsApp Message (wa.me)
  const triggerWhatsAppNudge = () => {
    if (!phoneNumber.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid phone number first!' });
      return;
    }
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    const msg = constructMessage(true);
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    logNotification('WhatsApp Nudge', 'Success', `Sent to +${cleanPhone}`);
  };

  // Background Daily Timer Checker (checks every 30 seconds)
  useEffect(() => {
    if (!scheduleActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      const now = new Date();
      const currentHHMM = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const lastSentDate = localStorage.getItem('study_nudge_last_sent_date');
      const todayDateStr = now.toDateString();

      if (currentHHMM === reminderTime && lastSentDate !== todayDateStr) {
        localStorage.setItem('study_nudge_last_sent_date', todayDateStr);
        executeCascadeNudge(false);
      }
    }, 30000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [scheduleActive, reminderTime, phoneNumber, designation, prepDays, browserPushEnabled, phonePushNtfy, freeSmsEnabled, whatsappWebEnabled, customWebhookUrl]);

  const handleToggleSchedule = () => {
    if (!scheduleActive) {
      if (!phoneNumber.trim()) {
        setStatusMessage({ type: 'error', text: 'Please enter a valid phone number before starting the schedule!' });
        return;
      }
      setScheduleActive(true);
      setStatusMessage({
        type: 'success',
        text: `🚀 Daily study reminder activated! Will nudge you every day at ${reminderTime} with auto-fallback.`
      });
    } else {
      setScheduleActive(false);
      setStatusMessage({
        type: 'info',
        text: '⏸️ Daily reminder paused. You can re-enable it whenever you resume preparation.'
      });
    }
  };

  const cleanPhoneForNtfy = phoneNumber.replace(/[^0-9]/g, '');
  const ntfyTopic = `interview-prep-${cleanPhoneForNtfy.slice(-8) || 'student'}`;

  return (
    <div className="study-nudge-container">
      {/* Hero Header */}
      <div className="nudge-header">
        <div className="nudge-header-badge">🔔 Automatic Study Nudge System</div>
        <h1>Daily Study & Interview Preparation Nudge</h1>
        <p>
          Configure your target role, prep timeline, and preferred study hour. Equipped with 
          <strong> Multi-Gateway Automatic Fallback</strong>: if the public carrier SMS is filtered by regional telecom firewalls, it immediately cascades to zero-credential mobile push, WhatsApp, and device triggers!
        </p>
      </div>

      {/* Main Grid */}
      <div className="nudge-grid">
        {/* Left Column: Form Configuration */}
        <div className="nudge-card form-card">
          <h2 className="card-title">⚙️ Configure Your Daily Nudge</h2>

          {/* Phone Number Input */}
          <div className="form-group">
            <label className="form-label">
              📱 Mobile / Phone Number (Include Country Code, e.g. +91 or +1)
              <span className="required-star">*</span>
            </label>
            <div className="input-with-icon">
              <span className="input-prefix">📞</span>
              <input
                type="tel"
                className="nudge-input"
                placeholder="+91 9876543210 or +1 2345678900"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <span className="input-hint">Used for carrier SMS, mobile push alerts, and direct phone nudges.</span>
          </div>

          {/* Multi-Gateway Live Test & Cascade Box */}
          <div className="sms-quick-test-box">
            <div className="sms-test-header">
              <span className="sms-test-title">🧪 Multi-Gateway SMS & Nudge Test</span>
              <span className="sms-test-badge">Auto-Fallback</span>
            </div>
            <p className="sms-test-desc">
              Executes Tier 1 (Carrier SMS). If blocked, automatically cascades to Tier 2 (Mobile Push), Tier 3 (Desktop), and native device triggers.
            </p>
            <div className="sms-buttons-group">
              <button
                type="button"
                className="btn-sms-test"
                onClick={() => executeCascadeNudge(true)}
                disabled={isTestingSms || isSending}
              >
                {isTestingSms ? 'Executing Fallback Cascade...' : '⚡ Test Multi-Gateway Cascade'}
              </button>
              <button
                type="button"
                className="btn-sms-native"
                onClick={triggerNativeSms}
              >
                📱 Open Phone SMS
              </button>
              <button
                type="button"
                className="btn-sms-wa"
                onClick={triggerWhatsAppNudge}
              >
                💬 Open WhatsApp
              </button>
            </div>

            {/* Cascade Live Execution Logs */}
            {cascadeLogs.length > 0 && (
              <div className="cascade-log-container">
                <div className="cascade-log-header">Live Cascade Dispatch Logs:</div>
                <div className="cascade-log-body">
                  {cascadeLogs.map((log, index) => (
                    <div key={index} className="cascade-log-line">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Target Designation */}
          <div className="form-group">
            <label className="form-label">💼 Target Job Designation / Role</label>
            <input
              type="text"
              list="designation-suggestions"
              className="nudge-input"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="e.g. Frontend Engineer (SDE-2)"
            />
            <datalist id="designation-suggestions">
              {POPULAR_DESIGNATIONS.map((role) => (
                <option key={role} value={role} />
              ))}
            </datalist>
            <span className="input-hint">Your customized reminder will address you with this dream role.</span>
          </div>

          {/* Preparation Timeline Selector (30d, 60d, 90d) */}
          <div className="form-group">
            <label className="form-label">⏳ Preparation Sprint Timeline</label>
            <div className="prep-plans-grid">
              {PREPARATION_PLANS.map((plan) => (
                <div
                  key={plan.days}
                  className={`plan-pill ${prepDays === plan.days ? 'selected' : ''}`}
                  onClick={() => setPrepDays(plan.days)}
                >
                  <div className="plan-icon">{plan.icon}</div>
                  <div className="plan-title">{plan.label}</div>
                  <div className="plan-desc">{plan.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Picker */}
          <div className="form-group">
            <label className="form-label">⏰ Daily Study Reminder Time</label>
            <div className="time-selector-row">
              <input
                type="time"
                className="nudge-input time-input"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
              />
              <span className="time-badge">
                Daily at {new Date(`2026-01-01T${reminderTime}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
              </span>
            </div>
            <span className="input-hint">Set the exact time when you sit down for coding / revisions.</span>
          </div>

          {/* Optional Webhook URL */}
          <div className="form-group">
            <label className="form-label">🔗 Optional Custom Webhook (Discord / Slack / Telegram)</label>
            <input
              type="url"
              className="nudge-input"
              value={customWebhookUrl}
              onChange={(e) => setCustomWebhookUrl(e.target.value)}
              placeholder="https://discord.com/api/webhooks/... or https://hooks.slack.com/..."
            />
            <span className="input-hint">Leave blank or paste any webhook URL for an extra notification channel.</span>
          </div>

          {/* Channels Toggles */}
          <div className="channels-section">
            <label className="form-label">📡 Active Delivery Channels</label>
            <div className="channel-toggle-list">
              <label className="channel-item">
                <input
                  type="checkbox"
                  checked={freeSmsEnabled}
                  onChange={(e) => setFreeSmsEnabled(e.target.checked)}
                />
                <div className="channel-info">
                  <span className="channel-name">💬 Tier 1: Public Carrier SMS Gateway</span>
                  <span className="channel-desc">Tries open carrier gateway first. Automatically falls back if blocked by carrier.</span>
                </div>
              </label>

              <label className="channel-item">
                <input
                  type="checkbox"
                  checked={phonePushNtfy}
                  onChange={(e) => setPhonePushNtfy(e.target.checked)}
                />
                <div className="channel-info">
                  <span className="channel-name">📲 Tier 2: Instant Mobile Push (ntfy.sh)</span>
                  <span className="channel-desc">
                    100% Guaranteed free push to phone without credentials: <code>ntfy.sh/{ntfyTopic}</code>
                  </span>
                </div>
              </label>

              <label className="channel-item">
                <input
                  type="checkbox"
                  checked={whatsappWebEnabled}
                  onChange={(e) => setWhatsappWebEnabled(e.target.checked)}
                />
                <div className="channel-info">
                  <span className="channel-name">🟢 Tier 3: Instant WhatsApp Nudge</span>
                  <span className="channel-desc">Generates direct wa.me link with prep reminder, ready to tap & send for free.</span>
                </div>
              </label>

              <label className="channel-item">
                <input
                  type="checkbox"
                  checked={browserPushEnabled}
                  onChange={() => {
                    if (!browserPushEnabled) {
                      requestBrowserPermission();
                    } else {
                      setBrowserPushEnabled(false);
                    }
                  }}
                />
                <div className="channel-info">
                  <span className="channel-name">🖥️ Tier 4: Desktop / Browser System Notification</span>
                  <span className="channel-desc">Pops up OS notification on your screen even if the tab is running in background.</span>
                </div>
              </label>
            </div>
          </div>

          {/* Status Alert */}
          {statusMessage && (
            <div className={`status-banner ${statusMessage.type}`}>
              {statusMessage.text}
            </div>
          )}

          {/* Action Buttons */}
          <div className="action-buttons-row">
            <button
              className={`main-action-btn ${scheduleActive ? 'active' : ''}`}
              onClick={handleToggleSchedule}
            >
              {scheduleActive ? '⏸️ Stop / Pause Daily Schedule' : '🚀 Activate Daily Study Nudge'}
            </button>
            <button
              className="test-nudge-btn"
              onClick={() => executeCascadeNudge(true)}
              disabled={isSending}
            >
              {isSending ? 'Dispatching...' : '🧪 Test All Now'}
            </button>
          </div>
        </div>

        {/* Right Column: Live Status & Free Method Guides */}
        <div className="nudge-card info-card">
          <h2 className="card-title">📊 Live Schedule Status</h2>
          
          <div className="status-overview-card">
            <div className="status-indicator">
              <span className={`pulse-dot ${scheduleActive ? 'green' : 'gray'}`}></span>
              <span className="status-text">
                {scheduleActive ? 'SCHEDULE ACTIVE (Auto-Fallback ON)' : 'SCHEDULE PAUSED'}
              </span>
            </div>
            <div className="status-details">
              <div className="status-item">
                <span className="k">Target Role:</span>
                <span className="v">{designation}</span>
              </div>
              <div className="status-item">
                <span className="k">Target Timeline:</span>
                <span className="v">{prepDays} Days</span>
              </div>
              <div className="status-item">
                <span className="k">Time:</span>
                <span className="v">{reminderTime} (Every Day)</span>
              </div>
              <div className="status-item">
                <span className="k">Phone:</span>
                <span className="v">{phoneNumber || 'Not configured'}</span>
              </div>
            </div>
          </div>

          {/* Guaranteed Mobile Alert Setup Guide */}
          <div className="guide-box">
            <h3>📲 How to Get 100% Free Guaranteed Alerts on Your Phone:</h3>
            <ul className="guide-list">
              <li>
                <strong>Step 1: Open Your Private Free Channel</strong>
                <div>
                  No password, no signup. Open this URL in your phone's browser or install the free <a href="https://ntfy.sh" target="_blank" rel="noreferrer">ntfy mobile app</a>:
                </div>
                <div style={{ marginTop: '0.45rem', marginBottom: '0.45rem' }}>
                  <a href={`https://ntfy.sh/${ntfyTopic}`} target="_blank" rel="noreferrer" className="topic-link">
                    🔔 Tap to Open: ntfy.sh/{ntfyTopic}
                  </a>
                </div>
              </li>
              <li>
                <strong>Step 2: Tap "Subscribe"</strong>
                <div>Your phone will instantly receive real-time push notifications with sound when your study time arrives!</div>
              </li>
              <li>
                <strong>Step 3: Native SMS & WhatsApp Options</strong>
                <div>Whenever you want a carrier SMS or WhatsApp, tap the <em>"Open Phone SMS"</em> or <em>"Open WhatsApp"</em> button. It automatically opens your device's native app with everything pre-filled.</div>
              </li>
            </ul>
          </div>

          {/* History of Dispatched Nudges */}
          <div className="history-section">
            <h3>📜 Recent Activity Logs</h3>
            {notificationHistory.length === 0 ? (
              <div className="empty-history">No nudges dispatched yet. Click "Test Multi-Gateway Cascade" to see the auto-fallback in action!</div>
            ) : (
              <div className="history-list">
                {notificationHistory.map((item) => (
                  <div key={item.id} className="history-item">
                    <div className="h-top">
                      <span className="h-channel">{item.channel}</span>
                      <span className={`h-status ${item.status.toLowerCase()}`}>{item.status}</span>
                      <span className="h-time">{item.timestamp}</span>
                    </div>
                    <div className="h-detail">{item.detail}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyNudge;
