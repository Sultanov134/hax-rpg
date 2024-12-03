import { LitElement, html, css } from 'lit';
import './rpg-character.js';
import 'wired-elements/lib/wired-slider.js';
import 'wired-elements/lib/wired-checkbox.js';
import 'wired-elements/lib/wired-button.js';

class HaxRpg extends LitElement {
  static properties = {
    seed: { type: String },
    onFire: { type: Boolean },
    walking: { type: Boolean, reflect: true },
    circle: { type: Boolean },
  };

  constructor() {
    super();
    // Default seed: 10 characters, with "Leg" fixed to 0
    this.seed = '1000000000';
    this.onFire = false;
    this.walking = false;
    this.circle = false;
  }

  static styles = css`
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

    .character {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 400px;
    }

    rpg-character {
      height: 100%;
      width: auto;
      display: block;
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


  updateCharacterPart(name, value) {
    const indexMap = {
      accessories: 0,
      base: 1,
      face: 3,
      faceitem: 4,
      hair: 5,
      pants: 6,
      shirt: 7,
      skin: 8,
      hatcolor: 9,
    };

    const position = indexMap[name];
    const updatedSeed =
      this.seed.substring(0, position) +
      value.toString() +
      this.seed.substring(position + 1);

    this.seed = updatedSeed; // Update the seed
  }

  renderSlider(label, name, min, max, step) {
    const indexMap = {
      accessories: 0,
      base: 1,
      face: 3,
      faceitem: 4,
      hair: 5,
      pants: 6,
      shirt: 7,
      skin: 8,
      hatcolor: 9,
    };
    const position = indexMap[name];
    const value = parseInt(this.seed[position], 10);

    return html`
      <div class="slider-container">
        <div class="slider-label">${label}:</div>
        <wired-slider
          name=${name}
          min=${min}
          max=${max}
          step=${step}
          .value=${value}
          @input=${(e) => {
            const newValue = parseInt(e.target.value, 10);
            this.updateCharacterPart(name, newValue);
          }}
        ></wired-slider>
      </div>
    `;
  }

  render() {
    return html`
      <div class="container">
        <div class="character-panel">
          <div class="character">
            <rpg-character
              .seed=${this.seed}
              .fire=${this.onFire}
              .walking=${this.walking}
              .circle=${this.circle}
            ></rpg-character>
          </div>
          <p>Seed: ${this.seed}</p>
        </div>

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
          <wired-slider class="testing-slider" value=40>testing</wired-slider>

          <wired-checkbox
            name="onFire"
            .checked=${this.onFire}
            @input=${(e) => (this.onFire = e.target.checked)} >On Fire?</wired-checkbox>

          <wired-checkbox
            name="walking"
            .checked=${this.walking}
            @input=${(e) => (this.walking = e.target.checked)}>Walking?</wired-checkbox>

          <wired-checkbox
            name="circle"
            .checked=${this.circle}
            @input=${(e) => (this.circle = e.target.checked)}>Circle?</wired-checkbox>

          <wired-button @click=${() => this.generateShareableLink()}>Share Character</wired-button>
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
