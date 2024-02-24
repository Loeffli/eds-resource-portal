import { decorateIcons, getMetadata } from '../../scripts/aem.js';

/**
 * loads and decorates the header
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  block.textContent = '';

  const headerMeta = getMetadata('header');
  const headerPath = headerMeta ? new URL(headerMeta).pathname : '/header';
  const resp = await fetch(`${headerPath}.plain.html`);
  if (resp.ok) {
    const html = await resp.text();

    // decorate header DOM
    const header = document.createElement('div');
    header.innerHTML = html;

    //add Adobe Logo infront of Title
    // Create a "image" element:
    const logo = document.createElement("img");
    logo.src = "/images/Adobe-Logo-red-on-white.png";
    logo.src = "/images/aetsch-logo.png";

    logo.id = "header-logo";
    // Insert before h1 title:
    header.firstElementChild.insertBefore(logo, header.firstElementChild.children[0]);

    decorateIcons(header);
    block.append(header);
  }
}
