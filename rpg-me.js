import { LitElement, html, css } from "lit";
import 'wired-elements/lib/wired-combo.js';
import 'wired-elements/lib/wired-item.js';
import 'wired-elements/lib/wired-checkbox.js';
import 'wired-elements/lib/wired-button.js';
import "@haxtheweb/rpg-character/rpg-character.js";
import {DDDSuper} from "@haxtheweb/d-d-d/d-d-d.js";

export class RpgMe extends DDDSuper(LitElement) {
  static get tag() {
    return "rpg-me"
  }
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
      characterSize: { type: String},
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

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f4f6f9;
        color: #333;
        min-height: 100vh;
      }
  
      .container {
        display: flex;
        flex-direction: row;
        justify-content: center; /* Horizontally center */
        align-items: center; /* Vertically center */
        gap: 30px;
        padding: 20px;
        box-sizing: border-box;
        min-height: 100vh; /* Ensure container takes up full screen height */
      }
  
      @media (max-width: 768px) {
        .container {
          flex-direction: column; /* Stack containers vertically on small screens */
          justify-content: center;
          align-items: center;
          padding: 10px;
        }
      }
  
      .character-panel {
        flex: 1;
        background: white;
        border-radius: 12px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 400px;
        margin-right: 10px;
        overflow: hidden; /* Prevent overflow */
        position: relative;
      }
  
      .character-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        position: relative;
      }
  
      .character-panel rpg-character {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
  
      .character-panel .seed-text {
        font-size: 1.2rem;
        font-weight: bold;
        color: #444;
        margin-top: 10px;
        text-align: center;
      }
  
      .size-controls {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 10px;
      }
  
      .size-controls wired-button {
        font-size: 1rem;
        padding: 5px 10px;
        background-color: white;
        color: #333;
        border: 1px solid #ccc;
        border-radius: 6px;
        transition: background-color 0.2s ease, transform 0.2s ease;
      }
  
      .size-controls wired-button:hover {
        background-color: #f8f8f8;
        transform: scale(1.05);
      }
  
      .form-panel {
        flex: 1;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        padding: 20px;
      }
  
      .form-panel h3 {
        font-size: 1.5rem;
        margin-bottom: 20px;
        text-align: center;
        color: #444;
      }
  
      .dropdown-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
      }
  
      .dropdown-container label {
        font-size: 1rem;
        color: #666;
      }
  
      wired-combo {
        flex: 1;
        margin-left: 10px;
      }
  
      wired-checkbox {
        margin-bottom: 10px;
        font-size: 1rem;
      }
  
      wired-button {
        background-color: white;
        color: #333;
        font-size: 0.9rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 8px 12px;
        text-align: center;
        box-shadow: none;
        transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
      }
  
      wired-button:hover {
        background-color: #f8f8f8;
        border-color: #999;
        transform: scale(1.02);
      }
  
      .button-group {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
        margin-top: 20px;
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

  increaseSize() {
    this.characterSize = Math.min(this.characterSize + 20, 400);
  }

  decreaseSize() {
    this.characterSize = Math.max(this.characterSize - 20, 100);
  }

  _updateSeed(key, value) {
    if (this[key] !== value) {
      this[key] = value;
      const seedArray = this.seed.padEnd(10, "0").split("");
      const index = this._getSeedIndex(key);
      if (index >= 0) {
        seedArray[index] = value.toString();
        seedArray[2] = "0"; 
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
      }).catch((err) => {
        console.error("Failed to copy link:", err);
        alert(`Could not copy the link. Here it is: ${url}`);
      });
    } catch (error) {
      console.error("Error generating shareable link:", error);
      alert("An unexpected error occurred while generating the link.");
    }
  }
  

  shareToTwitter() {
    const url = this.generateLink();
    const text = encodeURIComponent("Check out my cool new character!");
    const xUrl = `https://x.com/intent/post?text=${text}&url=${encodeURIComponent(url)}`;
    window.open(xUrl, "_blank");
  }

  shareToLinkedIn() {
    const url = this.generateLink();
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, "_blank");
  }

  render() {
    return html`
      <div class="container">
      <div class="character-panel">
        <div class="character-wrapper">
          <rpg-character
            literalseed
            .seed=${this.seed}
            .hat=${this.hat}
            .fire=${this.onFire}
            .walking=${this.walking}
            .circle=${this.circle}
            style="transform: scale(${this.characterSize / 300}); transform-origin: center;"
          ></rpg-character>
        </div>
        <div class="seed-text">Seed: ${this.seed}</div>
        <div class="size-controls">
          <wired-button @click=${this.decreaseSize}>-</wired-button>
          <wired-button @click=${this.increaseSize}>+</wired-button>
        </div>
      </div>


        <div class="form-panel">
          ${this.renderDropdown('Accessories', 'accessories', Array.from({ length: 10 }, (_, i) => i))}
          ${this.renderDropdown('Base', 'base', Array.from({ length: 10 }, (_, i) => i))}
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
        <div style="display: flex; gap: 10px; justify-content: center; margin-top: 10px">
          
          <wired-button @click=${() => this.generateLink()}>
            Share Character
          </wired-button>

          <wired-button @click=${this.shareToTwitter}>
            Share on X
          </wired-button>

          <wired-button @click=${this.shareToLinkedIn}>
            Share on LinkedIn
          </wired-button>
          </div>
        </div>
      </div>
    `;
  }
}


customElements.define('rpg-me', RpgMe);
