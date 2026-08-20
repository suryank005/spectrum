/**
 * IONITIX - Interactive IoT Sensor Mesh Particle Network Canvas
 * Simulates wireless sensor network, data packet routing, and responsive cursor physics.
 */

class IoTMeshNetwork {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.nodes = [];
    this.packets = [];
    this.ripples = [];
    
    this.mouse = {
      x: -1000,
      y: -1000,
      radius: 180,
      active: false
    };

    this.config = {
      nodeCount: window.innerWidth < 768 ? 40 : 85,
      maxDistance: window.innerWidth < 768 ? 110 : 150,
      nodeColor: 'rgba(255, 110, 130, ',
      secondaryNodeColor: 'rgba(240, 180, 190, ',
      emeraldNodeColor: 'rgba(255, 225, 100, ',
      lineColor: 'rgba(255, 120, 140, ',
      packetSpeed: 0.015
    };

    this.init();
  }

  init() {
    this.resize();
    this.createNodes();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);

    this.config.nodeCount = this.width < 768 ? 40 : 85;
    this.config.maxDistance = this.width < 768 ? 110 : 150;
  }

  createNodes() {
    this.nodes = [];
    for (let i = 0; i < this.config.nodeCount; i++) {
      const type = Math.random() > 0.75 ? 'router' : Math.random() > 0.4 ? 'sensor' : 'gateway';
      this.nodes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: type === 'gateway' ? 4.5 : type === 'router' ? 3.5 : 2.5,
        baseAlpha: Math.random() * 0.3 + 0.7,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseVal: Math.random() * Math.PI,
        type: type,
        connections: []
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createNodes();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.active = false;
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });

    window.addEventListener('click', (e) => {
      this.triggerRipple(e.clientX, e.clientY);
    });

    // Mobile touch support
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
        this.mouse.active = true;
      }
    }, { passive: true });
  }

  triggerRipple(x, y) {
    this.ripples.push({
      x,
      y,
      radius: 0,
      maxRadius: 280,
      alpha: 0.8
    });

    // Spawn a burst of packets from closest nodes
    this.nodes.forEach(node => {
      const dx = node.x - x;
      const dy = node.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        node.pulseVal = 0; // immediate flash
      }
    });
  }

  spawnPacket(nodeA, nodeB) {
    if (this.packets.length > 35) return;
    this.packets.push({
      from: nodeA,
      to: nodeB,
      progress: 0,
      speed: this.config.packetSpeed + Math.random() * 0.01,
      color: Math.random() > 0.5 ? '#FF7088' : '#FFD860'
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Update and draw ripples
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      const r = this.ripples[i];
      r.radius += 5;
      r.alpha -= 0.018;

      if (r.alpha <= 0 || r.radius >= r.maxRadius) {
        this.ripples.splice(i, 1);
        continue;
      }

      this.ctx.beginPath();
      this.ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(255, 120, 140, ${r.alpha})`;
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();
    }

    // 2. Update and draw nodes
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];

      // Movement
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off walls
      if (node.x < 0 || node.x > this.width) node.vx *= -1;
      if (node.y < 0 || node.y > this.height) node.vy *= -1;

      // Mouse influence: Gentle repulsion so particles never clump into a single point
      if (this.mouse.active) {
        const dx = node.x - this.mouse.x;
        const dy = node.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouse.radius && dist > 0) {
          // Push outward smoothly away from the cursor
          const force = (1 - dist / this.mouse.radius) * 1.5;
          const nx = dx / dist;
          const ny = dy / dist;

          node.x += nx * force;
          node.y += ny * force;
        }
      }

      // Pulse animation
      node.pulseVal += node.pulseSpeed;
      const currentAlpha = node.baseAlpha + Math.sin(node.pulseVal) * 0.3;

      // Draw Node
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

      let color = this.config.nodeColor;
      if (node.type === 'gateway') color = this.config.secondaryNodeColor;
      if (node.type === 'router') color = this.config.emeraldNodeColor;

      this.ctx.fillStyle = `${color}${Math.max(0.15, currentAlpha)})`;
      this.ctx.fill();

      // Halo for gateway nodes
      if (node.type === 'gateway') {
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, node.radius * 2.2, 0, Math.PI * 2);
        this.ctx.strokeStyle = `rgba(240, 180, 190, ${Math.max(0.2, currentAlpha * 0.6)})`;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
      }
    }

    // 3. Draw connections between nodes
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const nA = this.nodes[i];
        const nB = this.nodes[j];

        const dx = nA.x - nB.x;
        const dy = nA.y - nB.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.config.maxDistance) {
          const alpha = (1 - dist / this.config.maxDistance) * 0.65;
          this.ctx.beginPath();
          this.ctx.moveTo(nA.x, nA.y);
          this.ctx.lineTo(nB.x, nB.y);
          this.ctx.strokeStyle = `${this.config.lineColor}${alpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();

          // Random packet generation on close nodes
          if (Math.random() < 0.001) {
            this.spawnPacket(nA, nB);
          }
        }
      }
    }

    // 4. Update and draw moving data packets
    for (let i = this.packets.length - 1; i >= 0; i--) {
      const p = this.packets[i];
      p.progress += p.speed;

      if (p.progress >= 1) {
        this.packets.splice(i, 1);
        continue;
      }

      const px = p.from.x + (p.to.x - p.from.x) * p.progress;
      const py = p.from.y + (p.to.y - p.from.y) * p.progress;

      this.ctx.beginPath();
      this.ctx.arc(px, py, 2, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.fill();
      this.ctx.shadowBlur = 0; // reset
    }

    requestAnimationFrame(() => this.animate());
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('iot-mesh-canvas')) {
    window.IoTMesh = new IoTMeshNetwork('iot-mesh-canvas');
  }
});
