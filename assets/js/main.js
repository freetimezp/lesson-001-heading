/* =========================
       1. LESSON INFORMATION
       Each object represents one step.
    ========================= */

const steps = [
    {
        title: "Welcome to HTML headings",
        shortTitle: "Introduction",
        eyebrow: "01 / LET'S BEGIN",
        description:
            "Every great website starts with structure. Today, you'll learn how to organize text using HTML headings.",
        type: "intro",
    },
    {
        title: "Meet the six headings",
        shortTitle: "H1 to H6",
        eyebrow: "02 / THE BASICS",
        description:
            "HTML gives us six heading levels. Explore them below and see how the visual size changes.",
        type: "playground",
    },
    {
        title: "Size is not the same as meaning",
        shortTitle: "Hierarchy",
        eyebrow: "03 / IMPORTANT IDEA",
        description:
            "Headings create a meaningful outline for your content. Their purpose is more important than their default appearance.",
        type: "hierarchy",
    },
    {
        title: "Build a clean structure",
        shortTitle: "Best practices",
        eyebrow: "04 / YOUR TOOLKIT",
        description:
            "A few simple habits will help make your pages easier to read, navigate, and maintain.",
        type: "tips",
    },
    {
        title: "Your first HTML check",
        shortTitle: "Quick quiz",
        eyebrow: "05 / TEST YOURSELF",
        description:
            "Let's check what you've learned. Choose an answer, read the feedback, and finish your first lesson.",
        type: "quiz",
    },
];

/* =========================
       2. APP STATE
    ========================= */

let currentStep = 0;
let selectedHeading = "h1";
let baseFontSize = 38;
let quizAnswered = false;

const lessonList = document.getElementById("lessonList");
const lessonContent = document.getElementById("lessonContent");
const progressFill = document.getElementById("progressFill");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const progressPercent = document.getElementById("progressPercent");
const lessonCounter = document.getElementById("lessonCounter");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

/* =========================
       3. CREATE THE STEP MENU
    ========================= */

function createMenu() {
    lessonList.innerHTML = "";

    steps.forEach((step, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "lesson-link";
        button.innerHTML = `
          <span class="step-number">${String(index + 1).padStart(2, "0")}</span>
          <span>${step.shortTitle}</span>
        `;

        button.addEventListener("click", () => {
            currentStep = index;
            renderLesson();
        });

        lessonList.appendChild(button);
    });
}

/* =========================
       4. SMALL REUSABLE HELPERS
    ========================= */

function escapeHTML(value) {
    return value.replace(
        /[&<>"']/g,
        (character) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;",
            })[character],
    );
}

function highlight(title, text) {
    return `
        <div class="highlight">
          <div class="highlight-icon" aria-hidden="true">💡</div>
          <div>
            <strong>${title}</strong>
            <p>${text}</p>
          </div>
        </div>
      `;
}

function codeWindow(code) {
    return `
        <div class="code-window">
          <div class="code-top" aria-hidden="true">
            <span class="code-dot"></span>
            <span class="code-dot"></span>
            <span class="code-dot"></span>
            <span class="code-file">index.html</span>
          </div>
          <pre class="code-body"><code>${code}</code></pre>
        </div>
      `;
}

/* =========================
       5. LESSON STEP TEMPLATES
    ========================= */

function renderIntro() {
    return `
        <div class="eyebrow">${steps[0].eyebrow}</div>

        <h1 class="page-title">
          Give your words<br />
          <span>some structure.</span>
        </h1>

        <p class="lead">
          Headings help people understand what a page is about,
          what each section contains, and how the information fits together.
          Let's start with six simple HTML elements.
        </p>

        <div class="card">
          <div class="card-heading">Your first HTML heading</div>
          <p class="card-description">
            HTML uses tags to tell the browser what each piece of content means.
          </p>

          ${codeWindow(
              `<h1>My first website</h1>

<h2>About me</h2>

<p>Welcome to my page!</p>`,
          )}

          <div style="margin-top:22px">
            <div class="preview-label" style="margin-bottom:12px">
              What the browser displays
            </div>

            <div style="padding:8px 0">
              <div style="font-size:32px;font-weight:700;line-height:1.3">
                My first website
              </div>
              <div style="font-size:23px;font-weight:700;margin-top:12px">
                About me
              </div>
              <p style="margin-top:8px;color:#858ba2">
                Welcome to my page!
              </p>
            </div>
          </div>

          ${highlight(
              "Remember this",
              "HTML describes the meaning and structure of content. CSS controls how that content looks.",
          )}
        </div>
      `;
}

function renderPlayground() {
    const sizes = {
        h1: 2,
        h2: 1.6,
        h3: 1.3,
        h4: 1.1,
        h5: 0.9,
        h6: 0.8,
    };

    const rows = Object.keys(sizes)
        .map(
            (tag) => `
        <div class="hierarchy-row ${tag === selectedHeading ? "selected" : ""}">
          <span class="hierarchy-tag">&lt;${tag}&gt;</span>
          <span class="hierarchy-sample"
            style="font-size:${Math.max(10, Math.round(baseFontSize * sizes[tag] * 0.48))}px">
            ${tag.toUpperCase()} — A section heading
          </span>
        </div>
      `,
        )
        .join("");

    return `
        <div class="eyebrow">${steps[1].eyebrow}</div>
        <h1 class="page-title">Six levels.<br /><span>One structure.</span></h1>
        <p class="lead">${steps[1].description}</p>

        <div class="card">
          <div class="card-heading">Heading playground</div>
          <p class="card-description">
            Select a heading and adjust its visual size. Experiment freely!
          </p>

          <div class="playground">
            <div class="controls">
              <div>
                <label class="control-label" for="headingSelect">
                  HTML element
                </label>
                <select id="headingSelect">
                  <option value="h1">h1 — Main heading</option>
                  <option value="h2">h2 — Section heading</option>
                  <option value="h3">h3 — Subsection</option>
                  <option value="h4">h4 — Smaller section</option>
                  <option value="h5">h5 — Minor heading</option>
                  <option value="h6">h6 — Lowest level</option>
                </select>
              </div>

              <div>
                <label class="control-label" for="sizeSlider">
                  Base font size
                  <span class="control-value" id="sizeValue">${baseFontSize}px</span>
                </label>
                <input
                  id="sizeSlider"
                  type="range"
                  min="16"
                  max="48"
                  step="1"
                  value="${baseFontSize}"
                />
                <div class="range-labels">
                  <span>Smaller</span><span>Larger</span>
                </div>
              </div>

              <div>
                <label class="control-label" for="headingText">
                  Heading text
                </label>
                <input
                  id="headingText"
                  type="text"
                  maxlength="80"
                  value="Hello, world!"
                  placeholder="Type your heading"
                />
              </div>
            </div>

            <div class="preview">
              <div class="preview-top">
                <span class="preview-label">Live preview</span>
                <span class="preview-pill" id="previewTag">&lt;h1&gt;</span>
              </div>
              <div class="live-heading" id="liveHeading">Hello, world!</div>
              <p class="preview-copy">
                This is a visual preview of your selected heading.
              </p>
            </div>
          </div>

          <div class="hierarchy-list" aria-label="Heading size comparison">
            ${rows}
          </div>

          ${highlight(
              "Try this",
              "Change h1 to h3, then h6. Notice the default visual sizes. Next, change the slider to see how CSS can alter the appearance.",
          )}
        </div>
      `;
}

function renderHierarchy() {
    return `
        <div class="eyebrow">${steps[2].eyebrow}</div>
        <h1 class="page-title">Think in <span>sections,</span><br />not sizes.</h1>
        <p class="lead">${steps[2].description}</p>

        <div class="card">
          <div class="card-heading">A sensible document outline</div>
          <p class="card-description">
            Imagine a page about learning web development.
          </p>

          ${codeWindow(
              `<h1>Learn Web Development</h1>

  <h2>HTML Basics</h2>
    <h3>Headings</h3>
    <h3>Paragraphs</h3>

  <h2>CSS Basics</h2>
    <h3>Colors</h3>
    <h3>Layouts</h3>`,
          )}

          <div style="margin-top:22px;padding:20px;background:#fafaff;border:1px solid #e9eaf2;border-radius:14px">
            <div style="font-size:23px;font-weight:700;margin-bottom:14px">Learn Web Development</div>
            <div style="padding-left:18px;border-left:2px solid #c7cbff">
              <div style="font-size:18px;font-weight:700;margin-bottom:7px">HTML Basics</div>
              <div style="padding-left:15px;color:#69708a;margin-bottom:4px">↳ Headings</div>
              <div style="padding-left:15px;color:#69708a;margin-bottom:13px">↳ Paragraphs</div>
              <div style="font-size:18px;font-weight:700;margin-bottom:7px">CSS Basics</div>
              <div style="padding-left:15px;color:#69708a;margin-bottom:4px">↳ Colors</div>
              <div style="padding-left:15px;color:#69708a">↳ Layouts</div>
            </div>
          </div>

          ${highlight(
              "The key principle",
              "Use headings in a logical order. A heading level represents the importance and nesting of a section—not simply the size you want.",
          )}

          <div style="margin-top:18px;color:#737991;font-size:12px;line-height:1.8">
            <strong style="color:#20243a">Accessibility tip:</strong>
            A clear heading structure helps screen-reader users navigate a page.
            Do not skip levels just to get a particular font size.
          </div>
        </div>
      `;
}

function renderTips() {
    const tips = [
        {
            number: "01",
            title: "Use one clear main heading",
            text: "Usually, your page has one primary h1 describing its main topic.",
        },
        {
            number: "02",
            title: "Nest headings logically",
            text: "Use h2 for major sections and h3 for subsections within them.",
        },
        {
            number: "03",
            title: "Style with CSS",
            text: "Change font-size, font-weight, spacing, and colors with CSS instead of choosing a heading tag for its appearance.",
        },
        {
            number: "04",
            title: "Write useful heading text",
            text: "Headings should clearly describe the content that follows them.",
        },
    ];

    return `
        <div class="eyebrow">${steps[3].eyebrow}</div>
        <h1 class="page-title">Good habits start <span>here.</span></h1>
        <p class="lead">${steps[3].description}</p>

        <div class="card">
          <div class="card-heading">Four habits worth learning</div>
          <p class="card-description">
            These simple rules will help you write more meaningful HTML.
          </p>

          <div style="display:grid;gap:17px">
            ${tips
                .map(
                    (tip) => `
              <div style="display:flex;gap:15px;align-items:flex-start">
                <div style="min-width:40px;height:40px;border-radius:12px;background:#eef0ff;color:#5865e9;display:grid;place-items:center;font-family:'JetBrains Mono',monospace;font-size:12px">
                  ${tip.number}
                </div>
                <div>
                  <strong style="display:block;margin-bottom:4px">${tip.title}</strong>
                  <p style="color:#858ba2;font-size:12px;line-height:1.8">${tip.text}</p>
                </div>
              </div>
            `,
                )
                .join("")}
          </div>

          ${highlight(
              "A common beginner mistake",
              "Do not use h1, h2, or h3 only because their default font sizes look nice. Choose the correct structure first, then style it.",
          )}

          <div style="margin-top:20px">
            <div class="card-heading" style="font-size:15px">Example: structure and style</div>
            ${codeWindow(
                `<h1 class="page-title">
  My portfolio
</h1>

<style>
  .page-title {
    font-size: 3rem;
    color: #5865e9;
  }
</style>`,
            )}
          </div>
        </div>
      `;
}

function renderQuiz() {
    return `
        <div class="eyebrow">${steps[4].eyebrow}</div>
        <h1 class="page-title">Ready for a <span>quick check?</span></h1>
        <p class="lead">${steps[4].description}</p>

        <div class="card">
          <div class="card-heading">Question 01</div>
          <p style="margin-top:12px;font-size:17px;font-weight:600">
            You need a smaller-looking heading. What should you do?
          </p>

          <div class="quiz-options" id="quizOptions">
            <button class="quiz-option" type="button" data-correct="false">
              A. Always change h1 to h5
            </button>
            <button class="quiz-option" type="button" data-correct="true">
              B. Choose the correct heading level, then style it with CSS
            </button>
            <button class="quiz-option" type="button" data-correct="false">
              C. Use a paragraph for every heading
            </button>
          </div>

          <div class="quiz-feedback" id="quizFeedback" role="status" hidden></div>

          <div style="margin-top:24px;padding:17px;border-radius:13px;background:#f5f6ff">
            <strong style="display:block;margin-bottom:5px">What you learned</strong>
            <p style="color:#737991;font-size:12px;line-height:1.8">
              HTML headings go from h1 through h6. They communicate document
              structure, while CSS controls their visual appearance.
            </p>
          </div>
        </div>
      `;
}

/* =========================
       6. UPDATE THE LIVE PREVIEW
    ========================= */

function updatePlayground() {
    const headingSelect = document.getElementById("headingSelect");
    const sizeSlider = document.getElementById("sizeSlider");
    const headingText = document.getElementById("headingText");

    if (!headingSelect || !sizeSlider || !headingText) return;

    selectedHeading = headingSelect.value;
    baseFontSize = Number(sizeSlider.value);

    const ratios = {
        h1: 2,
        h2: 1.6,
        h3: 1.3,
        h4: 1.1,
        h5: 0.9,
        h6: 0.8,
    };

    const liveHeading = document.getElementById("liveHeading");
    const sizeValue = document.getElementById("sizeValue");
    const previewTag = document.getElementById("previewTag");

    liveHeading.textContent = headingText.value || "Your heading";
    liveHeading.style.fontSize = `${Math.round(baseFontSize * ratios[selectedHeading])}px`;

    sizeValue.textContent = `${baseFontSize}px`;
    previewTag.textContent = `<${selectedHeading}>`;

    // Update the hierarchy comparison to highlight the selected element.
    document.querySelectorAll(".hierarchy-row").forEach((row) => {
        row.classList.toggle(
            "selected",
            row.querySelector(".hierarchy-tag").textContent ===
                `<${selectedHeading}>`,
        );
    });
}

/* =========================
       7. CONNECT PLAYGROUND INPUTS
    ========================= */

function connectPlayground() {
    const headingSelect = document.getElementById("headingSelect");
    const sizeSlider = document.getElementById("sizeSlider");
    const headingText = document.getElementById("headingText");

    if (!headingSelect) return;

    headingSelect.value = selectedHeading;

    headingSelect.addEventListener("change", updatePlayground);
    sizeSlider.addEventListener("input", updatePlayground);
    headingText.addEventListener("input", updatePlayground);

    updatePlayground();
}

/* =========================
       8. CONNECT THE QUIZ
    ========================= */

function connectQuiz() {
    const options = document.querySelectorAll(".quiz-option");
    const feedback = document.getElementById("quizFeedback");

    if (!options.length) return;

    options.forEach((option) => {
        option.addEventListener("click", () => {
            // Do not let the learner change the result repeatedly.
            if (quizAnswered) return;

            quizAnswered = true;

            const isCorrect = option.dataset.correct === "true";

            option.classList.add(isCorrect ? "correct" : "incorrect");

            if (!isCorrect) {
                // Highlight the correct answer so the learner can learn from it.
                document
                    .querySelector('[data-correct="true"]')
                    .classList.add("correct");
            }

            feedback.hidden = false;
            feedback.textContent = isCorrect
                ? "Correct! Choose the right HTML meaning first, then use CSS to change its appearance."
                : "Not quite. The correct answer is B. Heading levels describe structure; CSS controls visual size.";

            options.forEach((button) => {
                button.disabled = true;
            });

            nextBtn.textContent = "Finish lesson ✓";
        });
    });
}

/* =========================
       9. RENDER THE CURRENT STEP
    ========================= */

function renderLesson() {
    const step = steps[currentStep];

    const templates = {
        intro: renderIntro,
        playground: renderPlayground,
        hierarchy: renderHierarchy,
        tips: renderTips,
        quiz: renderQuiz,
    };

    lessonContent.innerHTML = templates[step.type]();

    // Highlight the current step in the sidebar.
    document.querySelectorAll(".lesson-link").forEach((button, index) => {
        button.classList.toggle("active", index === currentStep);
        button.setAttribute(
            "aria-current",
            index === currentStep ? "step" : "false",
        );
    });

    // Update the learning progress.
    const progress = Math.round(((currentStep + 1) / steps.length) * 100);

    progressFill.style.width = `${progress}%`;
    progressBar.setAttribute("aria-valuenow", progress);
    progressText.textContent = `Step ${currentStep + 1} of ${steps.length}`;
    progressPercent.textContent = `${progress}% complete`;
    lessonCounter.textContent = `Step ${currentStep + 1} of ${steps.length}`;

    prevBtn.disabled = currentStep === 0;
    nextBtn.textContent =
        currentStep === steps.length - 1
            ? quizAnswered
                ? "Lesson completed ✓"
                : "Finish lesson →"
            : "Next step →";

    // Connect the controls after their HTML has been created.
    connectPlayground();
    connectQuiz();

    // Start the learner at the beginning of the new step.
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =========================
       10. PREVIOUS AND NEXT
    ========================= */

prevBtn.addEventListener("click", () => {
    if (currentStep > 0) {
        currentStep--;
        renderLesson();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        renderLesson();
    } else if (quizAnswered) {
        // Restart the lesson so learners can practice again.
        currentStep = 0;
        quizAnswered = false;
        renderLesson();
    } else {
        // Allow the learner to reach the quiz even before answering.
        connectQuiz();
        document.getElementById("quizOptions")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }
});

/* =========================
       11. START THE APP
    ========================= */

createMenu();
renderLesson();
