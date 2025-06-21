// Quantum Temperature Converter - Advanced Cyberpunk JavaScript
class QuantumTemperatureConverter {
  constructor() {
    this.conversionHistory = []
    this.currentTheme = "cyber-blue"
    this.quantumLevel = 2
    this.isDarkDimension = false
    this.conversionCount = 0
    this.scene = null
    this.camera = null
    this.renderer = null
    this.quantumField = null

    this.init()
  }

  init() {
    this.setupEventListeners()
    this.showQuantumLoader()
    this.initAOS()
    this.loadQuantumSettings()
    this.setupQuantumInput()

    // Initialize Three.js quantum field
    setTimeout(() => {
      this.initQuantumField()
    }, 100)
  }

  showQuantumLoader() {
    const loader = document.getElementById("quantum-loader")
    const progress = document.querySelector(".hex-progress")

    // Animate quantum loading
    const gsap = window.gsap
    if (typeof gsap !== "undefined") {
      gsap.to(progress, {
        rotation: 720,
        duration: 2.5,
        ease: "power2.inOut",
      })
    }

    // Hide loader and show interface
    setTimeout(() => {
      if (typeof gsap !== "undefined") {
        gsap.to(loader, {
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            loader.style.display = "none"
            this.activateQuantumInterface()
          },
        })
      } else {
        loader.style.display = "none"
        this.activateQuantumInterface()
      }
    }, 2500)
  }

  activateQuantumInterface() {
    const gsap = window.gsap
    if (typeof gsap !== "undefined") {
      const tl = gsap.timeline()

      tl.from(".quantum-header", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
      })
        .from(
          ".input-quantum-field",
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.5",
        )
        .from(
          ".temperature-sphere-container",
          {
            x: 100,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.6",
        )
        .from(
          ".result-hex",
          {
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.4",
        )
    }

    // Start quantum particle effects
    this.startQuantumParticles()
  }

  initAOS() {
    const AOS = window.AOS
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 1000,
        easing: "ease-out-cubic",
        once: true,
        offset: 100,
      })
    }
  }

  createQuantumField() {
    const THREE = window.THREE
    if (typeof THREE === "undefined") return

    try {
      // Create quantum particles with reduced intensity
      const particleCount = 300 // Reduced from 1000
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(particleCount * 3)
      const colors = new Float32Array(particleCount * 3)
      const sizes = new Float32Array(particleCount)

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100
        positions[i * 3 + 2] = (Math.random() - 0.5) * 50

        colors[i * 3] = Math.random() * 0.3 + 0.2 // Reduced brightness
        colors[i * 3 + 1] = Math.random() * 0.3 + 0.2
        colors[i * 3 + 2] = Math.random() * 0.5 + 0.5

        sizes[i] = Math.random() * 2 + 0.5 // Smaller particles
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
        },
        vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (200.0 / -mvPosition.z) * (0.5 + sin(time + position.x * 0.01) * 0.3);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
        fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float r = distance(gl_PointCoord, vec2(0.5, 0.5));
          if (r > 0.5) discard;
          gl_FragColor = vec4(vColor, 0.3 - r * 0.6); // Reduced opacity
        }
      `,
        transparent: true,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
      })

      this.quantumField = new THREE.Points(geometry, material)
      this.scene.add(this.quantumField)
    } catch (error) {
      console.log("Quantum field creation failed:", error)
    }
  }

  initQuantumField() {
    const THREE = window.THREE
    if (typeof THREE === "undefined") {
      console.log("Three.js not loaded, skipping quantum field")
      return
    }

    try {
      const canvas = document.getElementById("quantum-canvas")

      // Scene setup
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setPixelRatio(window.devicePixelRatio)

      // Create quantum field
      this.createQuantumField()

      // Position camera
      this.camera.position.z = 10

      // Start animation loop
      this.animateQuantumField()

      // Handle resize
      window.addEventListener("resize", () => this.onWindowResize())
    } catch (error) {
      console.log("Quantum field initialization failed:", error)
    }
  }

  animateQuantumField() {
    if (!this.renderer || !this.scene || !this.camera) return

    requestAnimationFrame(() => this.animateQuantumField())

    if (this.quantumField) {
      this.quantumField.rotation.x += 0.0005 // Slower rotation
      this.quantumField.rotation.y += 0.001

      // Update shader time with slower animation
      if (this.quantumField.material.uniforms) {
        this.quantumField.material.uniforms.time.value += 0.02 // Slower time progression
      }

      // Move particles slowly to avoid text interference
      const positions = this.quantumField.geometry.attributes.position.array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(Date.now() * 0.0005 + positions[i]) * 0.005 // Slower movement
      }
      this.quantumField.geometry.attributes.position.needsUpdate = true
    }

    this.renderer.render(this.scene, this.camera)
  }

  onWindowResize() {
    if (!this.camera || !this.renderer) return

    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  setupEventListeners() {
    // Control hub
    document.querySelector(".hub-trigger").addEventListener("click", () => this.toggleControlHub())
    document.querySelector(".close-hub").addEventListener("click", () => this.closeControlHub())

    // Theme matrix
    document.querySelectorAll(".theme-hex").forEach((hex) => {
      hex.addEventListener("click", (e) => this.changeQuantumTheme(e.target.dataset.theme))
    })

    // Quantum level
    document.getElementById("quantum-level").addEventListener("input", (e) => {
      this.quantumLevel = Number.parseInt(e.target.value)
      this.updateQuantumLevel()
    })

    // Dimension toggle
    document.getElementById("dimension-switch").addEventListener("change", (e) => {
      this.toggleDimension(e.target.checked)
    })

    // Export matrix
    document.querySelectorAll(".export-hex").forEach((hex) => {
      hex.addEventListener("click", (e) => this.exportQuantumData(e.target.dataset.format))
    })

    // Clear data stream
    document.getElementById("clear-stream").addEventListener("click", () => this.clearDataStream())

    // Temperature input
    document.getElementById("temp-input").addEventListener("input", () => this.handleQuantumConversion())
    document.getElementById("from-unit").addEventListener("change", () => this.handleQuantumConversion())

    // Result hex clicks
    document.querySelectorAll(".result-hex").forEach((hex) => {
      hex.addEventListener("click", () => this.activateResultHex(hex))
    })

    // Easter egg - sphere clicks
    let clickCount = 0
    const sphere = document.querySelector(".temperature-sphere")
    if (sphere) {
      sphere.addEventListener("click", () => {
        clickCount++
        if (clickCount >= 10) {
          this.triggerQuantumEasterEgg()
          clickCount = 0
        }
      })
    }
  }

  setupQuantumInput() {
    const input = document.getElementById("temp-input")

    // Add quantum scanner effect on focus
    input.addEventListener("focus", (e) => {
      this.activateQuantumScanner(e.target)
    })

    // Add quantum particles on input
    input.addEventListener("input", () => {
      this.createQuantumParticles()
    })
  }

  activateQuantumScanner(element) {
    const scanner = element.parentElement.querySelector(".input-scanner")
    const gsap = window.gsap

    if (typeof gsap !== "undefined" && scanner) {
      gsap.fromTo(
        scanner,
        { left: "-100%", opacity: 0 },
        { left: "100%", opacity: 0.5, duration: 0.8, ease: "power2.out" },
      )
    }
  }

  createQuantumParticles() {
    const container = document.getElementById("quantum-particles")

    for (let i = 0; i < 2; i++) {
      // Reduced from 5 to 2
      const particle = document.createElement("div")
      particle.className = "quantum-particle"
      particle.style.left = Math.random() * window.innerWidth + "px"
      particle.style.top = Math.random() * window.innerHeight + "px"
      particle.style.animationDelay = Math.random() * 2 + "s"
      particle.style.opacity = "0.3" // Reduced opacity
      container.appendChild(particle)

      setTimeout(() => particle.remove(), 4000)
    }
  }

  startQuantumParticles() {
    setInterval(() => {
      if (this.quantumLevel >= 2) {
        this.createQuantumParticles()
      }
    }, 3000)
  }

  handleQuantumConversion() {
    const input = document.getElementById("temp-input")
    const fromUnit = document.getElementById("from-unit").value
    const value = Number.parseFloat(input.value)

    if (isNaN(value)) {
      this.resetQuantumResults()
      return
    }

    // Convert to all units
    const results = this.convertTemperature(value, fromUnit)
    this.updateQuantumResults(results)
    this.updateTemperatureSphere(value, fromUnit)
    this.addToDataStream(value, fromUnit, results)
    this.updateQuantumBackground(value, fromUnit)

    // Increment conversion count
    this.conversionCount++
    if (this.conversionCount === 100) {
      this.triggerQuantumCelebration()
      this.showHoloNotification("🎉 QUANTUM MILESTONE: 100 CONVERSIONS ACHIEVED!", "success")
    }

    // Animate quantum results
    this.animateQuantumResults()
  }

  convertTemperature(value, fromUnit) {
    // Convert to Celsius first
    let celsius

    switch (fromUnit) {
      case "celsius":
        celsius = value
        break
      case "fahrenheit":
        celsius = ((value - 32) * 5) / 9
        break
      case "kelvin":
        celsius = value - 273.15
        break
      case "rankine":
        celsius = ((value - 491.67) * 5) / 9
        break
      case "reaumur":
        celsius = (value * 5) / 4
        break
      case "newton":
        celsius = (value * 100) / 33
        break
      case "delisle":
        celsius = 100 - (value * 2) / 3
        break
      default:
        celsius = value
    }

    // Convert from Celsius to all other units
    return {
      celsius: celsius,
      fahrenheit: (celsius * 9) / 5 + 32,
      kelvin: celsius + 273.15,
      rankine: ((celsius + 273.15) * 9) / 5,
      reaumur: (celsius * 4) / 5,
      newton: (celsius * 33) / 100,
      delisle: ((100 - celsius) * 3) / 2,
    }
  }

  updateQuantumResults(results) {
    Object.keys(results).forEach((unit) => {
      const element = document.getElementById(`result-${unit}`)
      if (element) {
        const formattedValue = results[unit].toFixed(2)

        // Animate quantum number change
        const gsap = window.gsap
        if (typeof gsap !== "undefined") {
          gsap.to(element, {
            innerHTML: formattedValue,
            duration: 0.6,
            ease: "power2.out",
            onUpdate: function () {
              element.innerHTML = (Math.round(this.progress() * formattedValue * 100) / 100).toFixed(2)
            },
          })
        } else {
          element.innerHTML = formattedValue
        }
      }
    })
  }

  updateTemperatureSphere(value, fromUnit) {
    const coreTemp = document.getElementById("core-temp")
    const sphereCore = document.querySelector(".sphere-core")
    const results = this.convertTemperature(value, fromUnit)
    const celsius = results.celsius

    // Update core temperature display
    coreTemp.textContent = `${Math.round(celsius)}°`

    // Update sphere color based on temperature
    const color = this.getQuantumTemperatureColor(celsius)
    const gsap = window.gsap

    if (typeof gsap !== "undefined") {
      gsap.to(sphereCore, {
        background: `radial-gradient(circle, ${color.core}, ${color.edge})`,
        duration: 0.8,
        ease: "power2.out",
      })
    } else {
      sphereCore.style.background = `radial-gradient(circle, ${color.core}, ${color.edge})`
    }

    // Extreme temperature effects
    if (celsius > 1000 || celsius < -100) {
      this.triggerExtremeQuantumEffect(celsius > 1000 ? "plasma" : "absolute-zero")
    }
  }

  getQuantumTemperatureColor(celsius) {
    if (celsius < -50) {
      return { core: "#00bcd4", edge: "#0097a7" } // Quantum ice
    } else if (celsius < 0) {
      return { core: "#2196f3", edge: "#1976d2" } // Cryo blue
    } else if (celsius < 25) {
      return { core: "#4caf50", edge: "#388e3c" } // Bio green
    } else if (celsius < 50) {
      return { core: "#ff9800", edge: "#f57c00" } // Thermal orange
    } else if (celsius < 100) {
      return { core: "#f44336", edge: "#d32f2f" } // Heat red
    } else {
      return { core: "#e91e63", edge: "#ad1457" } // Plasma pink
    }
  }

  triggerExtremeQuantumEffect(type) {
    const container = document.getElementById("energy-effects")

    for (let i = 0; i < 15; i++) {
      const burst = document.createElement("div")
      burst.className = "energy-burst"
      burst.style.left = Math.random() * window.innerWidth + "px"
      burst.style.top = Math.random() * window.innerHeight + "px"
      burst.style.background = type === "plasma" ? "#ff4757" : "#00d2d3"
      container.appendChild(burst)

      setTimeout(() => burst.remove(), 2000)
    }

    this.showHoloNotification(type === "plasma" ? "⚡ PLASMA STATE DETECTED!" : "❄️ ABSOLUTE ZERO APPROACHING!", "info")
  }

  updateQuantumBackground(value, fromUnit) {
    const results = this.convertTemperature(value, fromUnit)
    const celsius = results.celsius
    const body = document.body

    // Create quantum temperature-based effects
    let gradient
    if (celsius < -50) {
      gradient = "radial-gradient(ellipse at center, #001122 0%, #000011 100%)" // Deep freeze
    } else if (celsius < 0) {
      gradient = "radial-gradient(ellipse at center, #002244 0%, #001122 100%)" // Cold
    } else if (celsius < 25) {
      gradient = "radial-gradient(ellipse at center, #112200 0%, #001100 100%)" // Cool
    } else if (celsius < 50) {
      gradient = "radial-gradient(ellipse at center, #221100 0%, #110800 100%)" // Warm
    } else {
      gradient = "radial-gradient(ellipse at center, #220011 0%, #110005 100%)" // Hot
    }

    const gsap = window.gsap
    if (typeof gsap !== "undefined") {
      gsap.to(body, {
        background: gradient,
        duration: 1.2,
        ease: "power2.out",
      })
    } else {
      body.style.background = gradient
    }
  }

  addToDataStream(value, fromUnit, results) {
    const streamItem = {
      timestamp: new Date().toLocaleString(),
      input: `${value}° ${this.getUnitSymbol(fromUnit)}`,
      results: results,
    }

    this.conversionHistory.unshift(streamItem)

    // Keep only last 50 conversions
    if (this.conversionHistory.length > 50) {
      this.conversionHistory = this.conversionHistory.slice(0, 50)
    }

    this.updateDataStreamDisplay()
    this.saveQuantumSettings()
  }

  getUnitSymbol(unit) {
    const symbols = {
      celsius: "C",
      fahrenheit: "F",
      kelvin: "K",
      rankine: "R",
      reaumur: "Ré",
      newton: "N",
      delisle: "De",
    }
    return symbols[unit] || unit
  }

  updateDataStreamDisplay() {
    const dataStream = document.getElementById("data-stream")
    const clearBtn = document.getElementById("clear-stream")

    if (this.conversionHistory.length === 0) {
      dataStream.innerHTML = `
        <div class="no-data">
          <i class="fas fa-satellite-dish"></i>
          <p>NO QUANTUM DATA DETECTED</p>
          <span>Begin temperature analysis to generate data stream</span>
        </div>
      `
      clearBtn.style.display = "none"
    } else {
      dataStream.innerHTML = this.conversionHistory
        .map(
          (item) => `
            <div class="stream-item">
              <div class="stream-data">
                <div class="stream-input">${item.input}</div>
                <div class="stream-timestamp">${item.timestamp}</div>
              </div>
              <div class="stream-results">
                ${Object.entries(item.results)
                  .slice(0, 3)
                  .map(([unit, value]) => `${value.toFixed(1)}° ${this.getUnitSymbol(unit)}`)
                  .join(" | ")}
              </div>
            </div>
          `,
        )
        .join("")
      clearBtn.style.display = "block"
    }
  }

  animateQuantumResults() {
    const hexes = document.querySelectorAll(".result-hex")

    const gsap = window.gsap
    if (typeof gsap !== "undefined") {
      gsap.fromTo(
        hexes,
        {
          scale: 0.95,
          opacity: 0.8,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "back.out(1.7)",
        },
      )
    }
  }

  activateResultHex(hex) {
    const gsap = window.gsap
    if (typeof gsap !== "undefined") {
      gsap.to(hex, {
        scale: 1.15,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      })
    }

    // Copy value to clipboard
    const value = hex.querySelector(".unit-value").textContent
    const unit = hex.querySelector(".unit-name").textContent

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(`${value}° ${unit}`)
        .then(() => {
          this.showHoloNotification(`QUANTUM DATA COPIED: ${value}° ${unit}`, "success")
        })
        .catch(() => {
          this.showHoloNotification(`${value}° ${unit}`, "info")
        })
    } else {
      this.showHoloNotification(`${value}° ${unit}`, "info")
    }
  }

  resetQuantumResults() {
    const resultElements = document.querySelectorAll(".unit-value")
    resultElements.forEach((element) => {
      const gsap = window.gsap
      if (typeof gsap !== "undefined") {
        gsap.to(element, {
          innerHTML: "0.00",
          duration: 0.4,
        })
      } else {
        element.innerHTML = "0.00"
      }
    })

    // Reset sphere
    const coreTemp = document.getElementById("core-temp")
    const sphereCore = document.querySelector(".sphere-core")
    coreTemp.textContent = "0°"

    const gsap = window.gsap
    if (typeof gsap !== "undefined") {
      gsap.to(sphereCore, {
        background: "radial-gradient(circle, var(--primary-neon), var(--secondary-neon))",
        duration: 0.5,
      })
    }
  }

  toggleControlHub() {
    const panel = document.querySelector(".hub-panel")
    const trigger = document.querySelector(".hub-trigger")

    panel.classList.toggle("active")

    const gsap = window.gsap
    if (typeof gsap !== "undefined") {
      gsap.to(trigger, {
        rotation: panel.classList.contains("active") ? 180 : 0,
        duration: 0.4,
        ease: "back.out(1.7)",
      })
    }
  }

  closeControlHub() {
    const panel = document.querySelector(".hub-panel")
    const trigger = document.querySelector(".hub-trigger")

    panel.classList.remove("active")

    const gsap = window.gsap
    if (typeof gsap !== "undefined") {
      gsap.to(trigger, {
        rotation: 0,
        duration: 0.4,
        ease: "back.out(1.7)",
      })
    }
  }

  changeQuantumTheme(theme) {
    this.currentTheme = theme
    document.body.setAttribute("data-theme", theme)

    // Update active theme hex
    document.querySelectorAll(".theme-hex").forEach((hex) => {
      hex.classList.remove("active")
    })
    document.querySelector(`[data-theme="${theme}"]`).classList.add("active")

    // Animate theme change
    const gsap = window.gsap
    if (typeof gsap !== "undefined") {
      gsap.to(document.body, {
        scale: 0.98,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      })
    }

    this.saveQuantumSettings()
    this.showHoloNotification(`QUANTUM THEME ACTIVATED: ${theme.replace("-", " ").toUpperCase()}`, "info")
  }

  updateQuantumLevel() {
    // Adjust quantum complexity based on level
    const gsap = window.gsap
    if (typeof gsap !== "undefined") {
      switch (this.quantumLevel) {
        case 1:
          gsap.globalTimeline.timeScale(0.7)
          break
        case 2:
          gsap.globalTimeline.timeScale(1)
          break
        case 3:
          gsap.globalTimeline.timeScale(1.3)
          this.enhanceQuantumField()
          break
      }
    }

    this.saveQuantumSettings()
    this.showHoloNotification(
      `QUANTUM LEVEL SET TO: ${["BASIC", "ADVANCED", "QUANTUM"][this.quantumLevel - 1]}`,
      "info",
    )
  }

  enhanceQuantumField() {
    if (this.quantumField && this.quantumLevel === 3 && typeof window.THREE !== "undefined") {
      try {
        const positions = this.quantumField.geometry.attributes.position.array

        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += (Math.random() - 0.5) * 0.2
          positions[i + 1] += (Math.random() - 0.5) * 0.2
          positions[i + 2] += (Math.random() - 0.5) * 0.2
        }

        this.quantumField.geometry.attributes.position.needsUpdate = true
      } catch (error) {
        console.log("Quantum field enhancement failed:", error)
      }
    }
  }

  toggleDimension(isDark) {
    this.isDarkDimension = isDark
    document.body.setAttribute("data-dimension", isDark ? "dark" : "light")

    // Animate dimension shift
    const gsap = window.gsap
    if (typeof gsap !== "undefined") {
      const tl = gsap.timeline()
      tl.to(document.body, {
        filter: "brightness(0.1)",
        duration: 0.4,
      }).to(document.body, {
        filter: "brightness(1)",
        duration: 0.4,
      })
    }

    this.saveQuantumSettings()
    this.showHoloNotification(`DIMENSION SHIFTED TO: ${isDark ? "DARK" : "LIGHT"} REALM`, "info")
  }

  exportQuantumData(format) {
    if (this.conversionHistory.length === 0) {
      this.showHoloNotification("NO QUANTUM DATA TO EXPORT", "error")
      return
    }

    let content = ""
    let filename = `quantum_temperature_data.${format}`
    let mimeType = "text/plain"

    switch (format) {
      case "csv":
        content = "Timestamp,Input,Celsius,Fahrenheit,Kelvin\n"
        content += this.conversionHistory
          .map(
            (item) =>
              `"${item.timestamp}","${item.input}",${item.results.celsius.toFixed(2)},${item.results.fahrenheit.toFixed(2)},${item.results.kelvin.toFixed(2)}`,
          )
          .join("\n")
        mimeType = "text/csv"
        break

      case "json":
        content = JSON.stringify(
          {
            exportDate: new Date().toISOString(),
            quantumLevel: this.quantumLevel,
            theme: this.currentTheme,
            totalConversions: this.conversionCount,
            data: this.conversionHistory,
          },
          null,
          2,
        )
        mimeType = "application/json"
        break

      case "pdf":
        content = `
          <html>
          <head>
            <title>Quantum Temperature Analysis Report</title>
            <style>
              body { font-family: 'Courier New', monospace; background: #000011; color: #00f5ff; }
              .header { text-align: center; margin-bottom: 30px; }
              .data-item { margin-bottom: 20px; padding: 15px; border: 1px solid #00f5ff; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>QUANTUM TEMPERATURE ANALYSIS REPORT</h1>
              <p>Generated: ${new Date().toLocaleString()}</p>
              <p>Quantum Level: ${this.quantumLevel} | Theme: ${this.currentTheme}</p>
            </div>
            ${this.conversionHistory
              .map(
                (item) => `
                <div class="data-item">
                  <strong>TIMESTAMP:</strong> ${item.timestamp}<br>
                  <strong>INPUT:</strong> ${item.input}<br>
                  <strong>QUANTUM RESULTS:</strong> ${Object.entries(item.results)
                    .map(([unit, value]) => `${value.toFixed(2)}° ${this.getUnitSymbol(unit)}`)
                    .join(" | ")}
                </div>
              `,
              )
              .join("")}
          </body>
          </html>
        `
        mimeType = "text/html"
        filename = "quantum_temperature_report.html"
        break
    }

    // Create and download file
    try {
      const blob = new Blob([content], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      this.showHoloNotification(`QUANTUM DATA EXPORTED AS ${format.toUpperCase()}`, "success")
      this.triggerQuantumDownloadEffect()
    } catch (error) {
      this.showHoloNotification("QUANTUM EXPORT FAILED", "error")
    }
  }

  triggerQuantumDownloadEffect() {
    const downloadIcon = document.createElement("div")
    downloadIcon.innerHTML = '<i class="fas fa-download"></i>'
    downloadIcon.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 5rem;
      color: var(--primary-neon);
      z-index: 10000;
      pointer-events: none;
      text-shadow: 0 0 30px var(--primary-neon);
    `
    document.body.appendChild(downloadIcon)

    const gsap = window.gsap
    if (typeof gsap !== "undefined") {
      gsap.fromTo(
        downloadIcon,
        {
          scale: 0,
          rotation: -360,
          opacity: 0,
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          onComplete: () => {
            gsap.to(downloadIcon, {
              scale: 0,
              y: -200,
              opacity: 0,
              duration: 0.8,
              delay: 0.8,
              onComplete: () => downloadIcon.remove(),
            })
          },
        },
      )
    } else {
      setTimeout(() => downloadIcon.remove(), 2000)
    }
  }

  clearDataStream() {
    if (this.conversionHistory.length === 0) return

    const streamItems = document.querySelectorAll(".stream-item")

    const gsap = window.gsap
    if (typeof gsap !== "undefined") {
      gsap.to(streamItems, {
        x: 200,
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        onComplete: () => {
          this.conversionHistory = []
          this.updateDataStreamDisplay()
          this.saveQuantumSettings()
          this.showHoloNotification("QUANTUM DATA STREAM PURGED", "info")
        },
      })
    } else {
      this.conversionHistory = []
      this.updateDataStreamDisplay()
      this.saveQuantumSettings()
      this.showHoloNotification("QUANTUM DATA STREAM PURGED", "info")
    }
  }

  triggerQuantumCelebration() {
    const container = document.getElementById("energy-effects")
    const colors = ["#00f5ff", "#ff00ff", "#00ff41", "#ff4500", "#ffffff"]

    for (let i = 0; i < 100; i++) {
      const burst = document.createElement("div")
      burst.className = "energy-burst"
      burst.style.left = Math.random() * window.innerWidth + "px"
      burst.style.top = Math.random() * window.innerHeight + "px"
      burst.style.background = colors[Math.floor(Math.random() * colors.length)]
      burst.style.animationDelay = Math.random() * 2 + "s"
      burst.style.animationDuration = Math.random() * 2 + 3 + "s"
      container.appendChild(burst)

      setTimeout(() => burst.remove(), 5000)
    }
  }

  triggerQuantumEasterEgg() {
    const sphere = document.querySelector(".temperature-sphere")

    const gsap = window.gsap
    if (typeof gsap !== "undefined") {
      gsap.to(sphere, {
        rotationY: 1080,
        scale: 1.5,
        duration: 3,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(sphere, {
            rotationY: 0,
            scale: 1,
            duration: 1.5,
            ease: "back.out(1.7)",
          })
        },
      })
    }

    this.triggerQuantumCelebration()
    this.showHoloNotification("🌌 QUANTUM EASTER EGG ACTIVATED! DIMENSIONAL RIFT OPENED!", "success")
  }

  showHoloNotification(message, type = "info") {
    const container = document.getElementById("holo-notifications")
    const notification = document.createElement("div")
    notification.className = `holo-notification ${type}`
    notification.textContent = message

    container.appendChild(notification)

    // Auto remove after 4 seconds
    setTimeout(() => {
      const gsap = window.gsap
      if (typeof gsap !== "undefined") {
        gsap.to(notification, {
          x: -200,
          opacity: 0,
          duration: 0.4,
          onComplete: () => notification.remove(),
        })
      } else {
        notification.remove()
      }
    }, 4000)
  }

  saveQuantumSettings() {
    try {
      const settings = {
        theme: this.currentTheme,
        quantumLevel: this.quantumLevel,
        isDarkDimension: this.isDarkDimension,
        conversionHistory: this.conversionHistory,
        conversionCount: this.conversionCount,
      }

      localStorage.setItem("quantumTemperatureSettings", JSON.stringify(settings))
    } catch (error) {
      console.log("Failed to save quantum settings:", error)
    }
  }

  loadQuantumSettings() {
    try {
      const saved = localStorage.getItem("quantumTemperatureSettings")
      if (saved) {
        const settings = JSON.parse(saved)

        this.currentTheme = settings.theme || "cyber-blue"
        this.quantumLevel = settings.quantumLevel || 2
        this.isDarkDimension = settings.isDarkDimension || false
        this.conversionHistory = settings.conversionHistory || []
        this.conversionCount = settings.conversionCount || 0

        // Apply loaded settings
        this.changeQuantumTheme(this.currentTheme)
        document.getElementById("quantum-level").value = this.quantumLevel
        document.getElementById("dimension-switch").checked = this.isDarkDimension

        if (this.isDarkDimension) {
          document.body.setAttribute("data-dimension", "dark")
        }

        this.updateDataStreamDisplay()
      }
    } catch (error) {
      console.log("Failed to load quantum settings:", error)
    }
  }
}

// Initialize the Quantum Temperature Converter
document.addEventListener("DOMContentLoaded", () => {
  new QuantumTemperatureConverter()
})

// Add dynamic quantum styles
const quantumStyle = document.createElement("style")
quantumStyle.textContent = `
  @keyframes quantumPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
  }
  
  @keyframes dimensionShift {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`
document.head.appendChild(quantumStyle)
