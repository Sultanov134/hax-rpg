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
        color-scheme: light dark;
        display: block;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: light-dark(#efedea, #223a2c);
        color: light-dark(#333, #f4f6f9);
        min-height: 100vh;
      }

      .container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        gap: 30px;
        padding: 20px;
        box-sizing: border-box;
        min-height: 100vh;
      }

      @media (max-width: 768px) {
        .container {
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 10px;
          gap: 15px;
        }
      }

      .character-panel, .form-panel {
        flex: 1;
        background: light-dark(#ffffff, #2d2d2d);
        border-radius: 12px;
        box-shadow: 0 8px 16px light-dark(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.5));
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 500px;
        box-sizing: border-box;
      }

      .character-panel {
        overflow: hidden;
      }

      .character-wrapper {
        width: 75%;
        height: 350px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
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
        color: light-dark(#444, #e0e0e0);
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
        background-color: light-dark(#ffffff, #444);
        color: light-dark(#333, #f0f0f0);
        border: 1px solid light-dark(#ccc, #555);
        border-radius: 6px;
        transition: background-color 0.2s ease, transform 0.2s ease;
      }

      .size-controls wired-button:hover {
        background-color: light-dark(#f8f8f8, #555);
        transform: scale(1.05);
      }

      .form-panel h3 {
        font-size: 1.5rem;
        margin-bottom: 20px;
        text-align: center;
        color: light-dark(#444, #e0e0e0);
      }

      .dropdown-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
      }

      .dropdown-container label {
        font-size: 1rem;
        color: light-dark(#666, #aaa);
      }

      wired-combo {
        flex: 1;
        margin-left: 10px;
      }

      wired-checkbox {
        margin-bottom: 10px;
        font-size: 1rem;
        color: light-dark(#444, #ddd);
      }

      wired-button {
        background-color: light-dark(#ffffff, #444);
        color: light-dark(#333, #f0f0f0);
        font-size: 0.9rem;
        border: 1px solid light-dark(#ccc, #555);
        border-radius: 8px;
        transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
      }

      wired-button:hover {
        background-color: light-dark(#f8f8f8, #555);
        border-color: light-dark(#999, #777);
        transform: scale(1.02);
      }

      .button-group {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 5px;
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
    this.characterSize = Math.min(this.characterSize + 20, 500);
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
      return url;
    } catch (error) {
      console.error("Error generating link:", error);
      return "";
    }
    }
  


  shareTheLink() {
    const url = this.generateLink();
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copied to clipboard!");
    }).catch((err) => {
      console.error("Failed to copy link:", err);
      alert("An unexpected error occured while generating the link.");
    })

  }
  
  shareToTwitter() {
    const url = this.generateLink();
    const text = encodeURIComponent("Check out my cool new character!");
    const xUrl = `https://x.com/intent/post?text=${text}&url=${encodeURIComponent(url)}`;
    window.open(xUrl, "_blank");
  }

  shareToReddit() {
    const url = this.generateLink();
    const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent("Check out this cool RPG character I made!")}`;
    window.open(redditUrl, "_blank");
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
        <div class="button-group">
          
          <wired-button @click=${() => this.shareTheLink()}>
            Copy to clipboard
          </wired-button>

          <wired-button @click=${this.shareToTwitter}>
            Share on X
          </wired-button>

          <wired-button @click=${this.shareToLinkedIn}>
            Share on LinkedIn
          </wired-button>

          <wired-button @click=${this.shareToReddit}>
            Share on Reddit
          </wired-button>
          </div>
        </div>
      </div>
    `;
  }
}


customElements.define('rpg-me', RpgMe);
