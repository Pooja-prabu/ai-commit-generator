// app.js - Hour 1-3
document.addEventListener("DOMContentLoaded", () => {
  const inputText = document.getElementById("inputText");
  const generateBtn = document.getElementById("generateBtn");
  const commitOutput = document.getElementById("commitOutput");
  const prTitleOutput = document.getElementById("prTitleOutput");
  const prDescOutput = document.getElementById("prDescOutput");
  const summaryOutput = document.getElementById("summaryOutput");
  const commitType = document.getElementById("commitType");

  function setOutputs(commit, title, desc, summary) {
    commitOutput.textContent = commit || "—";
    prTitleOutput.textContent = title || "—";
    prDescOutput.textContent = desc || "—";
    summaryOutput.textContent = summary || "—";
  }

  generateBtn.addEventListener("click", async () => {
  const raw = inputText.value.trim();
  if (!raw) {
    alert("Please paste a code snippet, diff, or error log.");
    return;
  }

  // Show loading placeholders
  setOutputs("Generating...", "Generating...", "Generating...", "Generating...");

  try {
    const res = await fetch("http://localhost:3001/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: raw,
        commitType: commitType.value
      })
    });

    const data = await res.json();

    if (data.error) {
      alert("Error: " + data.error);
      return;
    }

    // Update UI with AI output
    setOutputs(
      data.commit,
      data.pr_title,
      data.pr_description,
      data.summary
    );

  } catch (err) {
    console.error(err);
    alert("Failed to reach backend. Make sure backend is running on port 3001.");
  }
});

  // Copy buttons
  document.querySelectorAll(".copyBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const tgt = btn.getAttribute("data-target");
      const el = document.getElementById(tgt);
      if (!el) return;
      navigator.clipboard.writeText(el.textContent).then(() => {
        btn.textContent = "Copied";
        setTimeout(()=> btn.textContent = "Copy", 1200);
      }).catch(()=> alert("Copy failed — allow clipboard permissions."));
    });
  });

  // Small helper: rudimentary area detection from code snippet (very naive)
  function detectArea(text) {
    const lowered = text.toLowerCase();
    if (lowered.includes("auth") || lowered.includes("jwt") || lowered.includes("login")) return "auth";
    if (lowered.includes("db") || lowered.includes("database") || lowered.includes("sql")) return "db";
    if (lowered.includes("ui") || lowered.includes("css") || lowered.includes("html")) return "ui";
    if (lowered.includes("test") || lowered.includes("jest") || lowered.includes("pytest")) return "test";
    return "core";
  }

  function shortSanitize(s) {
    return s.replace(/\s+/g, " ").trim();
  }

});
