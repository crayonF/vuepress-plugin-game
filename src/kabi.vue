<template>
  <div class="main">
    <canvas class="zdog-canvas"></canvas>
    <div class="dianji"></div>
  </div>
</template>

<script>
export default {
  name: "xingzhiKabi",
  data() {
    return {
      isSpinning: false,
      TAU: null,
      illo: null,
      body: null,
      face: null,
      eyeGroup: null,
      cheekHolder: null,
      rightArm: null,
      rightFoot: null,
      umbrella: null,
      star: null,
      starPath: null,
      canvas: null,
      pink: "#F8B",
      blush: "#F5A",
      black: "#333",
      shoe: "#D03",
      red: "#E10",
      yellow: "#FD0",
    };
  },
  mounted() {
    this.kabi();
    this.dianji = document.querySelector(".dianji");
    this.dianji.addEventListener("click", () => {
      this.isSpinning = !this.isSpinning;
      this.$emit("showGame");
    });
  },
  methods: {
    kabi() {
      this.TAU = Zdog.TAU;
      this.illo = new Zdog.Illustration({
        element: ".zdog-canvas",
        dragRotate: true,
        resize: "fullscreen",
        onResize: function (width, height) {
          this.zoom = Math.floor(Math.min(width, height) / 250);
        },
      });
      // ----- model ----- //

      this.body = new Zdog.Shape({
        stroke: 22,
        translate: { y: 11 },
        rotate: { x: 0.3, z: 0.1 },
        addTo: this.illo,
        color: this.pink,
      });
      this.face = new Zdog.Anchor({
        translate: { z: 10.5 },
        addTo: this.body,
      });
      [-1, 1].forEach(this.head);

      // mouth
      new Zdog.Shape({
        path: [
          { x: 0, y: 0 },
          {
            bezier: [
              { x: 1.1, y: 0 },
              { x: 1.1, y: 0.2 },
              { x: 1.1, y: 0.5 },
            ],
          },
          {
            bezier: [
              { x: 1.1, y: 1.1 },
              { x: 0.2, y: 1.8 },
              { x: 0, y: 1.8 },
            ],
          },
          {
            bezier: [
              { x: -0.2, y: 1.8 },
              { x: -1.1, y: 1.1 },
              { x: -1.1, y: 0.5 },
            ],
          },
          {
            bezier: [
              { x: -1.1, y: 0.2 },
              { x: -1.1, y: 0 },
              { x: 0, y: 0 },
            ],
          },
        ],
        addTo: this.face,
        translate: { y: 2, z: -0.5 },
        stroke: 1,
        color: this.shoe,
        fill: true,
      });
      this.rightArm = new Zdog.Shape({
        path: [{ y: 0 }, { y: -7 }],
        addTo: this.body,
        translate: { x: -6, y: -4, z: 0 },
        color: this.pink,
        stroke: 7,
      });

      // left arm
      this.rightArm.copy({
        path: [{ x: 0 }, { x: 6 }],
        translate: { x: 6, y: -2, z: 0 },
      });

      // right foot
      this.rightFoot = new Zdog.Shape({
        path: [
          { x: 0, y: -2 },
          {
            arc: [
              { x: 2, y: -2 },
              { x: 2, y: 0 },
            ],
          },
          {
            arc: [
              { x: 2, y: 5 },
              { x: 0, y: 5 },
            ],
          },
          {
            arc: [
              { x: -2, y: 5 },
              { x: -2, y: 0 },
            ],
          },
          {
            arc: [
              { x: -2, y: -2 },
              { x: 0, y: -2 },
            ],
          },
        ],
        addTo: this.body,
        translate: { x: -1, y: 9, z: -9 },
        rotate: { z: 0.2 },
        stroke: 6,
        color: this.shoe,
        fill: true,
        closed: false,
      });

      this.rightFoot.copy({
        translate: { x: 9.5, y: 6, z: -6 },
        rotate: { z: -1.1, y: 0.8 },
      });

      // ----- umbrella ----- //

      // umbrella rod
      this.umbrella = new Zdog.Shape({
        path: [{ y: 0 }, { y: 22 }],
        addTo: this.rightArm,
        translate: { y: -33, z: 2 },
        rotate: { y: 0.5 },
        color: this.yellow,
        stroke: 1,
      });

      // star
      this.starPath = this.starPathWay();
      // star shape
      this.star = new Zdog.Shape({
        path: this.starPath,
        addTo: this.umbrella,
        translate: { y: -4.5 },
        stroke: 2,
        color: this.yellow,
        fill: true,
      });
      // umbrella handle
      new Zdog.Shape({
        path: [
          { z: 0, y: 0 },
          { z: 0, y: 1 },
          {
            arc: [
              { z: 0, y: 4 },
              { z: 3, y: 4 },
            ],
          },
          {
            arc: [
              { z: 6, y: 4 },
              { z: 6, y: 1 },
            ],
          },
        ],
        addTo: this.umbrella,
        translate: { y: 23 },
        stroke: 2,
        color: "#37F",
        closed: false,
      });
      // umbrella shield panels
      this.umbrellaPanels();
      // floater stars
      this.floaterStars();
      this.animate();
    },
    head(xSide) {
      this.eyeGroup = new Zdog.Group({
        addTo: this.face,
        translate: { x: 2.4 * xSide, y: -2 },
        rotate: { x: -0.1 },
      });
      // eye
      new Zdog.Ellipse({
        width: 1.4,
        height: 5.5,
        addTo: this.eyeGroup,
        stroke: 1,
        color: this.black,
        fill: true,
      });
      // eye highlight
      new Zdog.Ellipse({
        width: 1,
        height: 2,
        addTo: this.eyeGroup,
        translate: { y: -1.5, z: 0.5 },
        stroke: 0.5,
        color: "#FFF",
        fill: true,
      });

      // cheek holder
      this.cheekHolder = new Zdog.Anchor({
        addTo: this.body,
        rotate: { y: 0.6 * xSide },
      });

      new Zdog.Ellipse({
        width: 2.5,
        height: 1,
        translate: { y: 1, z: 10.5 },
        addTo: this.cheekHolder,
        color: this.blush,
        stroke: 1,
      });
    },
    starPathWay() {
      var path = [];
      var starRadiusA = 3;
      var starRadiusB = 1.7;
      for (var i = 0; i < 10; i++) {
        var radius = i % 2 ? starRadiusA : starRadiusB;
        var angle = (this.TAU * i) / 10 + this.TAU / 4;
        var point = {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
        };
        path.push(point);
      }
      return path;
    },
    umbrellaPanels() {
      var umbPanelX = 14 * Math.sin(this.TAU / 24);
      var umbPanelZ = 14 * Math.cos(this.TAU / 24);
      for (var i = 0; i < 12; i++) {
        var colorSide = Math.floor(i / 2) % 2;
        new Zdog.Shape({
          path: [
            { x: 0, y: 0, z: 0 },
            {
              arc: [
                { x: -umbPanelX, y: 0, z: umbPanelZ },
                { x: -umbPanelX, y: 14, z: umbPanelZ },
              ],
            },
            { x: umbPanelX, y: 14, z: umbPanelZ },
            {
              arc: [
                { x: umbPanelX, y: 0, z: umbPanelZ },
                { x: 0, y: 0, z: 0 },
              ],
            },
          ],
          addTo: this.umbrella,
          rotate: { y: (this.TAU / 12) * i },
          stroke: 1,
          color: colorSide ? this.red : "white",
          fill: true,
        });
      }
    },
    floaterStars() {
      for (var i = 0; i < 6; i++) {
        var starHolder = new Zdog.Anchor({
          addTo: this.umbrella,
          translate: { y: 10 },
          rotate: { y: (this.TAU / 6) * i + this.TAU / 24 },
        });
        this.star.copy({
          addTo: starHolder,
          translate: { z: 28 },
        });
      }
    },
    animate() {
      this.illo.rotate.y += this.isSpinning ? -0.03 : 0;
      this.illo.updateRenderGraph();
      requestAnimationFrame(this.animate);
    },
  },
};
</script>

<style scoped>
canvas {
  position: fixed;
  top: -30%;
  right: -40%;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.dianji {
  width: 240px;
  height: 280px;
  position: fixed;
  top: 60px;
  right: 30px;
  cursor: pointer;
}
</style>
