import { LitElement, html, css } from "lit";
import { DDDSuper} from '@haxtheweb/d-d-d/d-d-d.js';
import 'wired-elements/lib/wired-combo.js';
import 'wired-elements/lib/wired-item.js';
import 'wired-elements/lib/wired-checkbox.js';
import 'wired-elements/lib/wired-button.js';
import "@haxtheweb/rpg-character/rpg-character.js";


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
      hat: { type: String },
      onFire: { type: Boolean },
      walking: { type: Boolean },
      circle: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.seed = "0000000000"; // Default seed
    this.accessories = "0";
    this.base = "1";
    this.face = "0";
    this.faceitem = "0";
    this.hair = "0";
    this.pants = "0";
    this.shirt = "0";
    this.skin = "0";
    this.hatcolor = "0";
    this.hat = "none";
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
    .character-panel,
    .form-panel {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      border: 2px solid #ccc;
      border-radius: 10px;
      background-color: #f9f9f9;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }
    .dropdown-container {
      margin-bottom: 16px;
    }
    wired-combo {
      width: 100%;
    }
  `;

  _getSeedIndex(key) {
    const mapping = {
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
    return mapping[key] ?? -1;
  }

  _updateSeed(key, value) {
    if (this[key] !== value) {
      this[key] = value;
      const seedArray = this.seed.padEnd(10, "0").split("");
      const index = this._getSeedIndex(key);
      if (index >= 0) {
        seedArray[index] = value.toString();
        const newSeed = seedArray.join("");
        if (this.seed !== newSeed) {
          this.seed = newSeed;
          console.log(`Updated key: ${key}, value: ${value}, new seed: ${this.seed}`);
        }
      } else {
        console.error(`Invalid key "${key}"`);
      }
    }
  }
  
  renderDropdown(label, key, options) {
    return html`
      <div class="dropdown-container">
        <label>${label}:</label>
        <wired-combo
          .selected=${this[key]}
          @selected=${(e) => this._updateSeed(key, e.detail.selected)}
        >
          ${options.map(
            (option) =>
              html`<wired-item value=${option}>${option}</wired-item>`
          )}
        </wired-combo>
      </div>
    `;
  }

  renderHatDropdown() {
    const hats = [
      "none",
      "bunny",
      "coffee",
      "construction",
      "cowboy",
      "education",
      "knight",
      "ninja",
      "party",
      "pirate",
      "watermelon",
    ];
    return html`
      <div class="dropdown-container">
        <label>Hat:</label>
        <wired-combo
          .selected=${this.hat}
          @selected=${(e) => (this.hat = e.detail.selected)}
        >
          ${hats.map(
            (hat) => html`<wired-item value=${hat}>${hat}</wired-item>`
          )}
        </wired-combo>
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
            .hat=${this.hat}
            .fire=${this.onFire}
            .walking=${this.walking}
            .circle=${this.circle}
          ></rpg-character>
          <p>Seed: ${this.seed}</p>
        </div>

        <!-- Form Panel -->
        <div class="form-panel">
          ${this.renderDropdown('Accessories', 'accessories', Array.from({ length: 10 }, (_, i) => i))}
          ${this.renderDropdown('Base', 'base', Array.from({ length: 5 }, (_, i) => i + 1))}
          ${this.renderDropdown('Face', 'face', Array.from({ length: 6 }, (_, i) => i))}
          ${this.renderDropdown('Face Item', 'faceitem', Array.from({ length: 10 }, (_, i) => i))}
          ${this.renderDropdown('Hair', 'hair', Array.from({ length: 10 }, (_, i) => i))}
          ${this.renderDropdown('Pants', 'pants', Array.from({ length: 10 }, (_, i) => i))}
          ${this.renderDropdown('Shirt', 'shirt', Array.from({ length: 10 }, (_, i) => i))}
          ${this.renderDropdown('Skin', 'skin', Array.from({ length: 10 }, (_, i) => i))}
          ${this.renderDropdown('Hat Color', 'hatcolor', Array.from({ length: 10 }, (_, i) => i))}
          ${this.renderHatDropdown()}

          <wired-checkbox
            .checked=${this.onFire}
            @input=${(e) => (this.onFire = e.target.checked)}
          >
            On Fire?
          </wired-checkbox>

          <wired-checkbox
            .checked=${this.walking}
            @input=${(e) => (this.walking = e.target.checked)}
          >
            Walking?
          </wired-checkbox>

          <wired-checkbox
            .checked=${this.circle}
            @input=${(e) => (this.circle = e.target.checked)}
          >
            Circle?
          </wired-checkbox>

          <wired-button @click=${() => this.generateShareableLink()}>
            Share Character
          </wired-button>
        </div>
      </div>
    `;
  }

  generateShareableLink() {
    try {
      const params = new URLSearchParams({
        seed: this.seed,
        hat: this.hat,
        fire: this.onFire,
        walking: this.walking,
        circle: this.circle,
      });
      const url = `${window.location.origin}?${params.toString()}`;
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
      });
    } catch (error) {
      console.error('Error generating shareable link:', error);
    }
  }
}

customElements.define('hax-rpg', HaxRpg);
