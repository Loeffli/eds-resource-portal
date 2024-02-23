import { addAnchorLink } from '../../scripts/scripts.js';

function autoLink(string) {
  const pattern = /(^|[\s\n]|<[A-Za-z]*\/?>)((?:https?):\/\/[-A-Z0-9+\u0026\u2019@#/%?=()~_|!:,.;]*[-A-Z0-9+\u0026@#/%=~()_|])/gi;
  return string.replace(pattern, '$1<a href="$2">$2</a>');
}

export default async function decorateFaq($block) {
  const source = new URL($block.querySelector('a').href).pathname;
  const resp = await fetch(source);
  const json = await resp.json();
  $block.innerText = '';
  const $tileWrapper = document.createElement('div');
  $tileWrapper.classList.add('tiles-wrapper');

  console.log(json);


  let text = "";
  for (const x in row) {
    text += x + ", ";
  }
  alert(text);



  json.data.forEach((row, i) => {
    const $tile = document.createElement('div');
    $tile.classList.add('resource-tile');
    $tile.id = `q${(i + 1)}`;

    //title
    const $title = document.createElement('h1');
    $title.classList.add('resource-tile-title');
    $title.innerText = row.Title;

    //description
    const $description = document.createElement('div');
    $description.classList.add('resource-tile-description');
    $description.innerText = row.Description;

    //Tags
    const $tags = document.createElement('div');
    $tags.classList.add('resource-tile-tags');
    $tags.innerText = "Tags: " + row.Tags;

    //Audience
    const $audience = document.createElement('div');
    $audience.classList.add('resource-tile-audience');
    $audience.innerText = "Audience: " + row.Audience;
    
    //Source
    const $source = document.createElement('div');
    $source.classList.add('resource-tile-source');
    $source.innerText = row.Source;

    //LastVerificationDate
    const $date = document.createElement('div');
    $date.classList.add('resource-tile-date');
    $date.innerText = "verified: " + row.LastVerification;
   
    //open resource button
    const $button = document.createElement('button');
    $button.setAttribute("class", "resource-tile-button");
    $button.setAttribute("onclick", "window.open('" +row.URL+ "');");
    $button.innerText = "Open";

    $tile.append($title, $description, $tags, $audience, $source, $date, $button);

    $tileWrapper.append($tile);
  });
  $block.append($tileWrapper);

  const selected = document.getElementById(window.location.hash.slice(1));
  if (selected) {
    selected.scrollIntoView();
  }
}
