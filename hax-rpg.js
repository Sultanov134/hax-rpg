import { LitElement, html, css } from "lit";
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
    const urlParams = new URLSearchParams(window.location.search);
    this.seed = urlParams.get("seed") || "0000000000";
    this.hat = urlParams.get("hat") || "none";
    this.onFire = urlParams.get("fire") === "true";
    this.walking = urlParams.get("walking") === "true";
    this.circle = urlParams.get("circle") === "true";
    const seedArray = this.seed.split("").map((char) => char || "0");
    this.accessories = seedArray[0] || "0";
    this.base = seedArray[1] || "1";
    this.face = seedArray[3] || "0";
    this.faceitem = seedArray[4] || "0";
    this.hair = seedArray[5] || "0";
    this.pants = seedArray[6] || "0";
    this.shirt = seedArray[7] || "0";
    this.skin = seedArray[8] || "0";
    this.hatcolor = seedArray[9] || "0";
    this.characterSize = 300;
  }

  static get styles () { 
    return css`
 :host {
      display: block;
      font-family: Arial, sans-serif;
    }

    .container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
      padding: 16px;
      gap: 16px;
    }
    wired-item {
      opacity: 1;
    }

    .character-panel {
      flex: 1 1 60%;
      max-width: 600px;
      padding: 16px;
      border: 2px solid #ccc;
      border-radius: 10px;
      background-color: #f9f9f9;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .character-panel rpg-character {
    
      margin-bottom: 16px;
    }

    .zoom-buttons {
      display: flex;
      gap: 16px;
    }

    .form-panel {
      flex: 1 1 35%;
      padding: 16px;
      border: 2px solid #ccc;
      border-radius: 10px;
      background-color: #f9f9f9;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    @media (max-width: 768px) {
      .container {
        flex-direction: column;
        align-items: stretch;
      }

      .character-panel,
      .form-panel {
        flex: 1 1 100%;
        max-width: none;
      }
    }
  `;
  }

 
  

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
        seedArray[2] = "0"; // Ensure leg is always 0
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
            (option) => html`<wired-item value=${option}>${option}</wired-item>`
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

  generateLink() {
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
        alert("Link copied to clipboard!");
      });
    } catch (error) {
      console.error("Error generating shareable link:", error);
    }
  }

  render() {
    return html`
      <div class="container">
        <div class="character-panel">
          <rpg-character
            literalseed
            .seed=${this.seed}
            .hat=${this.hat}
            .fire=${this.onFire}
            .walking=${this.walking}
            .circle=${this.circle}
          ></rpg-character>
          <p>Seed: ${this.seed}</p>
        </div>
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
            @change=${(e) => (this.onFire = e.target.checked)}
          >
            On Fire?
          </wired-checkbox>

          <wired-checkbox
            .checked=${this.walking}
            @change=${(e) => (this.walking = e.target.checked)}
          >
            Walking?
          </wired-checkbox>

          <wired-checkbox
            .checked=${this.circle}
            @change=${(e) => (this.circle = e.target.checked)}
          >
            Circle?
          </wired-checkbox>

          <wired-button @click=${() => this.generateLink()}>
            Share Character
          </wired-button>
        </div>
      </div>
    `;
  }
}


customElements.define('hax-rpg', HaxRpg);
