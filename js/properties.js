const selectElement = document.getElementById("property-select");
const labelElement = document.getElementById("property-filter-label");

if (selectElement && labelElement) {
  selectElement.addEventListener("focus", () => {
    labelElement.textContent = "Select a Country";
  });

  selectElement.addEventListener("change", () => {
    const selectedValue = selectElement.value;
    labelElement.textContent = `You selected: ${
      selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)
    }`;
  });
}

class DualThumbSlider {
  constructor(sliderId, config) {
    this.slider = document.getElementById(sliderId);
    if (!this.slider) {
      console.error(`Slider with ID "${sliderId}" not found`);
      return;
    }

    this.config = {
      min: config.min || 0,
      max: config.max || 100,
      minValue: config.minValue || config.min || 0,
      maxValue: config.maxValue || config.max || 100,
      step: config.step || 1,
      minDisplay: config.minDisplay,
      maxDisplay: config.maxDisplay,
      suffix: config.suffix || "",
      prefix: config.prefix || "",
      isPrice: config.isPrice || false,
    };

    this.track = this.slider.querySelector(".slider-track");
    this.range = this.slider.querySelector(".slider-range");
    this.minThumb = this.slider.querySelector('[data-thumb="min"]');
    this.maxThumb = this.slider.querySelector('[data-thumb="max"]');

    // Create display elements if they don't exist
    this.minDisplayEl = document.getElementById(this.config.minDisplay);
    this.maxDisplayEl = document.getElementById(this.config.maxDisplay);

    if (!this.minDisplayEl) {
      this.minDisplayEl = this.createDisplayElement("min");
    }
    if (!this.maxDisplayEl) {
      this.maxDisplayEl = this.createDisplayElement("max");
    }

    this.isDragging = false;
    this.activeThumb = null;

    if (this.track && this.range && this.minThumb && this.maxThumb) {
      this.init();
    } else {
      console.error(`Missing slider elements for ${sliderId}:`, {
        track: !!this.track,
        range: !!this.range,
        minThumb: !!this.minThumb,
        maxThumb: !!this.maxThumb,
      });
    }
  }

  createDisplayElement(type) {
    const display = document.createElement("div");
    display.className = "slider-display";
    display.id = this.config[type + "Display"];
    display.style.position = "absolute";
    display.style.top = "-30px";
    display.style.background = "#543ad7";
    display.style.color = "white";
    display.style.padding = "4px 8px";
    display.style.borderRadius = "4px";
    display.style.fontSize = "12px";
    display.style.transform = "translateX(-50%)";
    display.style.whiteSpace = "nowrap";
    this.slider.appendChild(display);
    return display;
  }

  init() {
    this.updateSlider();
    this.bindEvents();
  }

  bindEvents() {
    // Mouse events
    this.minThumb.addEventListener("mousedown", (e) =>
      this.startDrag(e, "min")
    );
    this.maxThumb.addEventListener("mousedown", (e) =>
      this.startDrag(e, "max")
    );
    document.addEventListener("mousemove", (e) => this.drag(e));
    document.addEventListener("mouseup", () => this.endDrag());

    // Touch events for mobile
    this.minThumb.addEventListener("touchstart", (e) =>
      this.startDrag(e, "min")
    );
    this.maxThumb.addEventListener("touchstart", (e) =>
      this.startDrag(e, "max")
    );
    document.addEventListener("touchmove", (e) => this.drag(e));
    document.addEventListener("touchend", () => this.endDrag());

    // Click on track to move nearest thumb
    this.track.addEventListener("click", (e) => this.trackClick(e));
  }

  startDrag(e, thumb) {
    e.preventDefault();
    this.isDragging = true;
    this.activeThumb = thumb;

    if (thumb === "min") {
      this.minThumb.classList.add("active");
    } else {
      this.maxThumb.classList.add("active");
    }
  }

  drag(e) {
    if (!this.isDragging || !this.activeThumb) return;

    e.preventDefault();

    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const rect = this.track.getBoundingClientRect();
    const percent = Math.max(
      0,
      Math.min(1, (clientX - rect.left) / rect.width)
    );
    const value =
      Math.round(
        (percent * (this.config.max - this.config.min) + this.config.min) /
          this.config.step
      ) * this.config.step;

    if (this.activeThumb === "min") {
      this.config.minValue = Math.min(
        value,
        this.config.maxValue - this.config.step
      );
    } else {
      this.config.maxValue = Math.max(
        value,
        this.config.minValue + this.config.step
      );
    }

    this.updateSlider();
  }

  endDrag() {
    this.isDragging = false;
    this.activeThumb = null;
    this.minThumb.classList.remove("active");
    this.maxThumb.classList.remove("active");
  }

  trackClick(e) {
    if (this.isDragging) return;

    const rect = this.track.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const value =
      Math.round(
        (percent * (this.config.max - this.config.min) + this.config.min) /
          this.config.step
      ) * this.config.step;

    // Move the nearest thumb
    const minDistance = Math.abs(value - this.config.minValue);
    const maxDistance = Math.abs(value - this.config.maxValue);

    if (minDistance < maxDistance) {
      this.config.minValue = Math.min(
        value,
        this.config.maxValue - this.config.step
      );
    } else {
      this.config.maxValue = Math.max(
        value,
        this.config.minValue + this.config.step
      );
    }

    this.updateSlider();
  }

  updateSlider() {
    const minPercent =
      ((this.config.minValue - this.config.min) /
        (this.config.max - this.config.min)) *
      100;
    const maxPercent =
      ((this.config.maxValue - this.config.min) /
        (this.config.max - this.config.min)) *
      100;

    // Update thumb positions
    this.minThumb.style.left = minPercent + "%";
    this.maxThumb.style.left = maxPercent + "%";

    // Update range bar
    this.range.style.left = minPercent + "%";
    this.range.style.width = maxPercent - minPercent + "%";

    // Update display positions and values
    this.minDisplayEl.style.left = minPercent + "%";
    this.maxDisplayEl.style.left = maxPercent + "%";

    // Update display values
    if (this.config.isPrice) {
      this.minDisplayEl.textContent = `${
        this.config.prefix
      }${this.config.minValue.toLocaleString()}`;
      this.maxDisplayEl.textContent = `${
        this.config.prefix
      }${this.config.maxValue.toLocaleString()}`;
    } else {
      this.minDisplayEl.textContent = `${this.config.minValue}${this.config.suffix}`;
      this.maxDisplayEl.textContent = `${this.config.maxValue}${this.config.suffix}`;
    }
  }

  getValues() {
    return {
      min: this.config.minValue,
      max: this.config.maxValue,
    };
  }
}

let sqftSlider, priceSlider;

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing sliders...");

  // Initialize sliders with error handling
  try {
    sqftSlider = new DualThumbSlider("sqft-slider", {
      min: 200,
      max: 1500,
      minValue: 400,
      maxValue: 900,
      step: 50,
      minDisplay: "sqft-min",
      maxDisplay: "sqft-max",
      suffix: " sqft",
    });
    console.log("Square feet slider initialized");
  } catch (error) {
    console.error("Error initializing sqft slider:", error);
  }

  try {
    priceSlider = new DualThumbSlider("price-slider", {
      min: 1000,
      max: 50000,
      minValue: 5000,
      maxValue: 15000,
      step: 1000,
      minDisplay: "price-min",
      maxDisplay: "price-max",
      prefix: "$",
      isPrice: true,
    });
    console.log("Price slider initialized");
  } catch (error) {
    console.error("Error initializing price slider:", error);
  }

  // Handle floating filter button
  const filterBtn = document.querySelector(".floating-filter-btn");
  const filterForm = document.getElementById("propertySidebarForm");
  const overlay = document.getElementById("filterOverlay");

  console.log("Filter elements:", {
    filterBtn: !!filterBtn,
    filterForm: !!filterForm,
    overlay: !!overlay,
  });

  if (filterBtn && filterForm && overlay) {
    filterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Filter button clicked!");

      filterForm.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    overlay.addEventListener("click", () => {
      filterForm.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  }
});
