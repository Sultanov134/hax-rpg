import { LitElement, html, css } from 'lit';
import '@haxtheweb/rpg-character/rpg-character.js';
import 'wired-elements/lib/wired-slider.js';
import 'wired-elements/lib/wired-checkbox.js';
import 'wired-elements/lib/wired-button.js';

class HaxRpg extends LitElement {
  static get properties() {
    return {
    seed: { type: String },
    accessories: { type: String },
    base: { type: String },
    face: { type: String },
    faceitem: { type: String },
    hair: { type: String },
    pants: { type: String },
    shirt: { type: String },
    skin: { type: String },
    hatcolor: { type: String },
    onFire: { type: Boolean },
    walking: { type: Boolean },
    circle: { type: Boolean },
  };
}

  constructor() {
    super();
    // Initialize all attributes
    this.accessories = "0";
    this.base = "1";
    this.face = "0";
    this.faceitem = "0";
    this.hair = "0";
    this.pants = "0";
    this.shirt = "0";
    this.skin = "0";
    this.hatcolor = "0";
    this.onFire = false;
    this.walking = false;
    this.circle = false;
    this.seed = this.generateSeed(); // Generate the initial seed
  }

  static styles (){ 
    return css`
    .container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 100vh;
      gap: 30px;
    }

    .character-panel {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      padding: 20px;
      border: 2px solid #ccc;
      border-radius: 10px;
      background-color: #f9f9f9;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }

    .form-panel {
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 20px;
      padding: 20px;
      border: 2px solid #ccc;
      border-radius: 10px;
      background-color: #f9f9f9;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }

    .slider-container {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .slider-label {
      flex: 0 0 120px;
      text-align: right;
      font-weight: bold;
    }

  `;
  }

  // Generate the seed dynamically
  generateSeed() {
    return (
      this.accessories +
      this.base +
      "0" + // Leg is always 0
      this.face +
      this.faceitem +
      this.hair +
      this.pants +
      this.shirt +
      this.skin +
      this.hatcolor
    );
  }

  // Update an attribute and regenerate the seed
  updateAttribute(name, value) {
    this[name] = value;
    this.seed = this.generateSeed(); // Regenerate the seed
  }

  renderSlider(label, name, min, max, step) {
    return html`
      <div class="slider-container">
        <div class="slider-label">${label}:</div>
        <wired-slider
          min=${min}
          max=${max}
          step=${step}
          .value=${this[name]}
          @input=${(e) => this.updateAttribute(name, e.target.value)}
        ></wired-slider>
      </div>
    `;
  }

  render() {
    return html`
      <div class="container">
        <!-- Character Panel -->
        <div class="character-panel">
          <rpg-character
            .seed=${this.seed}
            .fire=${this.onFire}
            .walking=${this.walking}
            .circle=${this.circle}
          ></rpg-character>
          <p>Seed: ${this.seed}</p>
        </div>

        <!-- Form Panel -->
        <div class="form-panel">
          ${this.renderSlider('Accessories', 'accessories', 0, 9, 1)}
          ${this.renderSlider('Base', 'base', 1, 5, 1)}
          ${this.renderSlider('Face', 'face', 0, 5, 1)}
          ${this.renderSlider('Face Item', 'faceitem', 0, 9, 1)}
          ${this.renderSlider('Hair', 'hair', 0, 9, 1)}
          ${this.renderSlider('Pants', 'pants', 0, 9, 1)}
          ${this.renderSlider('Shirt', 'shirt', 0, 9, 1)}
          ${this.renderSlider('Skin', 'skin', 0, 9, 1)}
          ${this.renderSlider('Hat Color', 'hatcolor', 0, 9, 1)}

          <wired-checkbox
            .checked=${this.onFire}
            @input=${(e) => (this.onFire = e.target.checked)}
          >On Fire?</wired-checkbox>

          <wired-checkbox
            .checked=${this.walking}
            @input=${(e) => (this.walking = e.target.checked)}
          >Walking?</wired-checkbox>

          <wired-checkbox
            .checked=${this.circle}
            @input=${(e) => (this.circle = e.target.checked)}
          >Circle?</wired-checkbox>

          <wired-button @click=${() => this.generateShareableLink()}>
            Share Character
          </wired-button>
        </div>
      </div>
    `;
  }

  generateShareableLink() {
    const params = new URLSearchParams({
      seed: this.seed,
      fire: this.onFire,
      walking: this.walking,
      circle: this.circle,
    });
    const url = `${window.location.origin}?${params.toString()}`;
    navigator.clipboard.writeText(url).then(() => alert('Link copied to clipboard!'));
  }
}

customElements.define('hax-rpg', HaxRpg);
