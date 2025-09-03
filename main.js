function getTimeSegmentElements(segmentElement) {
  const segmentDisplay = segmentElement.querySelector(".segment-display");

  return {
    segmentDisplayTop: segmentDisplay.querySelector(".segment-display__top"),
    segmentDisplayBottom: segmentDisplay.querySelector(".segment-display__bottom"),
    segmentOverlay: segmentDisplay.querySelector(".segment-overlay"),
    segmentOverlayTop: segmentDisplay.querySelector(".segment-overlay__top"),
    segmentOverlayBottom: segmentDisplay.querySelector(".segment-overlay__bottom"),
  };
}

function updateSegmentValues(displayElement, overlayElement, value) {
  displayElement.textContent = value;
  overlayElement.textContent = value;
}

function updateTimeSegment(segmentElement, timeValue) {
  const {
    segmentDisplayTop,
    segmentDisplayBottom,
    segmentOverlay,
    segmentOverlayTop,
    segmentOverlayBottom,
  } = getTimeSegmentElements(segmentElement);

  if (parseInt(segmentDisplayTop.textContent, 10) === timeValue) return;

  // Trigger animation
  segmentOverlay.classList.add("flip");

  updateSegmentValues(segmentDisplayTop, segmentOverlayBottom, timeValue);

  function finishAnimation() {
    segmentOverlay.classList.remove("flip");
    updateSegmentValues(segmentDisplayBottom, segmentOverlayTop, timeValue);
    this.removeEventListener("animationend", finishAnimation);
  }

  segmentOverlay.addEventListener("animationend", finishAnimation);
}

function updateTimeSection(sectionID, timeValue) {
  const firstDigit = Math.floor(timeValue / 10) || 0;
  const secondDigit = timeValue % 10 || 0;

  const sectionElement = document.getElementById(sectionID);
  const timeSegments = sectionElement.querySelectorAll(".time-segment");

  updateTimeSegment(timeSegments[0], firstDigit);
  updateTimeSegment(timeSegments[1], secondDigit);
}

function getTimeBits() {
  const now = new Date();
  return {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
  };
}

function updateAllSegments() {
  const { hours, minutes, seconds } = getTimeBits();
  updateTimeSection("hours", hours);
  updateTimeSection("minutes", minutes);
  updateTimeSection("seconds", seconds);
}

// Update every second
const countdownTimer = setInterval(updateAllSegments, 1000);

// Fullscreen toggle
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen?.();
  }
}

// Keyboard shortcut
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") toggleFullScreen();
});

// Initial update
updateAllSegments();
